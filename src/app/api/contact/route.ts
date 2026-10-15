import { contact } from "@/content/profile";
import { contactFieldLimits } from "@/lib/contact-fields";
import {
  countSentMessage,
  isContactVisitorWithinLimit,
  isContactWithinDailyBudget,
  readVisitorId,
} from "@/lib/contact-limits";

/*
  Contact form ka mail bhejne wala route.

  Resend ka SDK jaan-boojh ke install nahi kiya: uska kaam ek fetch call
  jitna hai, aur har nayi dependency ek aur cheez hai jo update maangti hai
  aur toot sakti hai. Niche wala fetch poora kaam kar deta hai.

  Teen cheezein check hoti hain mail bhejne se pehle:
    1. honeypot khaali hai ya nahi (bot pakadne ke liye)
    2. field bhare hue aur seema ke andar hain ya nahi
    3. is visitor aur aaj ke din ka budget bacha hai ya nahi

  Key na ho to route 503 deta hai aur form "address pe likh do" wali line
  dikhata hai — chup-chaap "sent" dikhana sabse bura hota, kyunki reader
  jawab ka intezaar karta rehta aur mail kahin jata hi nahi.
*/

const RESEND_ENDPOINT = "https://api.resend.com/emails";

// Resend apne verified domain se hi bhejne deta hai. Jab tak domain verify
// nahi hota, unka test address chalta hai — mail aata hai, bas "from" unka
// hota hai. Domain jud jaye to .env.local mein CONTACT_FROM_EMAIL bhar dena.
const DEFAULT_FROM = "Portfolio <onboarding@resend.dev>";

function jsonResponse(body: object, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
    },
  });
}

function readField(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let name = "";
  let email = "";
  let message = "";
  let company = "";

  try {
    const body = (await request.json()) as Record<string, unknown>;
    name = readField(body.name);
    email = readField(body.email);
    message = readField(body.message);
    company = readField(body.company);
  } catch {
    return jsonResponse({ error: "bad-request" }, 400);
  }

  /*
    Honeypot bhara hua hai — ye bot hai.

    Isey 200 dena jaan-boojh ke hai: error dene se bot ko pata chal jata hai
    ki kaun si field usey pakad rahi hai, aur agli baar wo usey chhod deta
    hai. 200 pe wo samajhta hai ki kaam ho gaya aur wapas nahi aata.
  */
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

  const visitorId = readVisitorId(request);

  if (!isContactVisitorWithinLimit(visitorId)) {
    return jsonResponse({ error: "visitor-limit" }, 429);
  }

  if (!isContactWithinDailyBudget()) {
    return jsonResponse({ error: "daily-limit" }, 429);
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY missing — message not sent");
    return jsonResponse({ error: "not-configured" }, 503);
  }

  const toAddress = process.env.CONTACT_TO_EMAIL || contact.email;
  const fromAddress = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [toAddress],
        // Reply dabate hi seedha bhejne wale ko jawab jaye — warna har baar
        // address copy karna padta hai.
        reply_to: email,
        subject: `Portfolio — ${name}`,
        text: `${message}\n\n---\nFrom: ${name} <${email}>`,
      }),
    });

    if (!response.ok) {
      // Poora jawab log karna zaroori hai: Resend wajah batata hai
      // (domain verify nahi hai, key galat hai, address block hai).
      const detail = await response.text();
      console.error("[contact] Resend refused:", response.status, detail);
      return jsonResponse({ error: "send-failed" }, 502);
    }
  } catch (error) {
    console.error("[contact] Resend unreachable:", error);
    return jsonResponse({ error: "send-failed" }, 502);
  }

  countSentMessage();

  return jsonResponse({ ok: true }, 200);
}
