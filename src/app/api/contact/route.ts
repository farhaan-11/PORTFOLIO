import nodemailer from "nodemailer";

import { contact } from "@/content/profile";
import { contactFieldLimits } from "@/lib/contact-fields";
import {
  countSentMessage,
  isContactVisitorWithinLimit,
  isContactWithinDailyBudget,
  readVisitorId,
} from "@/lib/contact-limits";

/*
  `export const runtime` yahan JAAN-BOOJH KE nahi hai: next.config.ts mein
  cacheComponents on hai, aur uske saath Next runtime export allow hi nahi
  karta (build fail ho jata hai). Zaroorat bhi nahi — us setting ke saath
  route handler hamesha nodejs pe chalta hai, aur nodemailer ko wahi chahiye
  (wo Node ke `net`/`tls` sockets pe chalta hai, jo Edge mein hote hi nahi).

  Matlab: Edge pe bhejne ki koshish mat karna, mail chupchaap band ho jayega.
*/

/*
  Gmail ka SMTP handshake 2-5 second le sakta hai (Vercel ke thande function
  pe thoda zyada). Vercel ka default 15 second hai, aur usme handshake kabhi
  beech mein kat jata hai — visitor ko "couldn't send it" dikhta hai jabki
  kuch toota nahi tha. 30 second dene se wo race khatam ho jati hai.
*/
export const maxDuration = 30;

function jsonResponse(body: object, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
    },
  });
}

// Naam aur email ek hi line mein hone chahiye. Newline hata dena zaroori hai:
// uske bina koi mail ke header mein apni line jod sakta hai.
function cleanSingleLine(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/[\r\n\t]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Message mein newline chalti hai (wahi to likha hua text hai), sirf \r hatate hain.
function cleanMessage(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\r/g, "").trim();
}

// Browser ka maxLength aur shakal ki jaanch sirf UI hai — curl se koi bhi
// usse bada ya galat data bhej sakta hai, isliye server pe dobara jaanch.
function looksLikeEmail(value: string) {
  const parts = value.split("@");

  if (parts.length !== 2) {
    return false;
  }

  const beforeAt = parts[0];
  const afterAt = parts[1];

  return (
    beforeAt.length > 0 && afterAt.includes(".") && !afterAt.startsWith(".")
  );
}

async function sendMail(name: string, email: string, message: string) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    throw new Error(
      "GMAIL_USER ya GMAIL_APP_PASSWORD .env.local mein nahi hai",
    );
  }

  const mailer = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailAppPassword },
  });

  const toAddress = process.env.CONTACT_TO_EMAIL || contact.email;

  await mailer.sendMail({
    from: `"${name} (portfolio)" <${gmailUser}>`,
    to: toAddress,
    // replyTo visitor ka asli email hai — inbox se seedha Reply dabane pe
    // mail usi tak jaata hai.
    replyTo: `"${name}" <${email}>`,
    subject: `Portfolio — ${name}`,
    text: `${message}\n\n---\nFrom: ${name} <${email}>`,
  });

  console.log("[contact] mail sent to", toAddress);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return jsonResponse({ error: "bad-request" }, 400);
  }

  const name = cleanSingleLine(body.name);
  const email = cleanSingleLine(body.email);
  const message = cleanMessage(body.message);
  const company = cleanSingleLine(body.company);

  // Honeypot bhari hui hai, yaani ye bot hai. `ok` bheja jata hai, error nahi —
  // bot ko pata nahi chalna chahiye ki wo pakda gaya. Mail nahi jaata.
  if (company !== "") {
    return jsonResponse({ ok: true }, 200);
  }

  if (name === "" || email === "" || message === "") {
    return jsonResponse({ error: "empty" }, 400);
  }

  if (
    name.length > contactFieldLimits.maxNameLength ||
    email.length > contactFieldLimits.maxEmailLength ||
    message.length > contactFieldLimits.maxMessageLength
  ) {
    return jsonResponse({ error: "too-long" }, 400);
  }

  if (!looksLikeEmail(email)) {
    return jsonResponse({ error: "bad-email" }, 400);
  }

  const visitorId = readVisitorId(request);

  if (!isContactVisitorWithinLimit(visitorId)) {
    return jsonResponse({ error: "visitor-limit" }, 429);
  }

  if (!isContactWithinDailyBudget()) {
    return jsonResponse({ error: "daily-limit" }, 429);
  }

  try {
    await sendMail(name, email, message);
  } catch (error) {
    // Visitor ko ek saaf line milti hai, par terminal mein asli wajah likhni
    // zaroori hai — warna galat password aur Gmail ka block ek jaise dikhte hain.
    console.error("[contact] mail failed:", error);
    return jsonResponse({ error: "send-failed" }, 502);
  }

  // Ginti mail jaane ke BAAD. Pehle check ke saath hoti thi, to fail hone par
  // bhi visitor ka quota kat jaata tha. (DECISIONS.md section 9)
  countSentMessage(visitorId);

  return jsonResponse({ ok: true }, 200);
}
