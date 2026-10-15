import nodemailer from "nodemailer";

import { contact } from "@/content/profile";
import { contactFieldLimits } from "@/lib/contact-fields";
import {
  countSentMessage,
  isContactVisitorWithinLimit,
  isContactWithinDailyBudget,
  readVisitorId,
} from "@/lib/contact-limits";

function jsonResponse(body: object, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
    },
  });
}

function cleanSingleLine(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/[\r\n\t]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanMessage(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\r/g, "").trim();
}

function looksLikeEmail(value: string) {
  const parts = value.split("@");

  if (parts.length !== 2) {
    return false;
  }

  const before = parts[0];
  const after = parts[1];

  return before.length > 0 && after.includes(".") && !after.startsWith(".");
}

async function sendMail(name: string, email: string, message: string) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    throw new Error("GMAIL_USER ya GMAIL_APP_PASSWORD .env.local mein nahi hai");
  }

  const mailer = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailAppPassword },
  });

  const toAddress = process.env.CONTACT_TO_EMAIL || contact.email;

  await mailer.sendMail({
    from: `"${name} (portfolio)" <${gmailUser}>`,
    to: toAddress,
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
    console.error("[contact] mail failed:", error);
    return jsonResponse({ error: "send-failed" }, 502);
  }

  countSentMessage(visitorId);

  return jsonResponse({ ok: true }, 200);
}
