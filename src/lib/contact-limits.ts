import { readVisitorId } from "@/lib/ask-limits";

/*
  Contact form ki do seema: per-visitor aur poore din ki.

  Wahi tareeka jo Ask panel mein hai — sab memory mein, koi Redis nahi.
  Seema bhi wahi hai: server restart pe hisaab reset ho jata hai, aur Vercel
  pe do instance chale to har ek apna hisaab rakhta hai. Ek portfolio ke
  contact form ke liye ye kaafi hai; iske aage ka bachaav honeypot karta hai.

  Visitor ki pehchaan Ask panel se hi aa rahi hai (readVisitorId) — ek hi
  kaam ke do alag tareeke rakhne ka koi matlab nahi.
*/

// Ek visitor ek ghante mein kitne message bhej sakta hai.
// 3 isliye ki ek asli banda ek hi message likhta hai; doosra tab likhta hai
// jab pehle mein kuch chhoot gaya ho. Teen ke baad jo bacha hai wo script hai.
const MESSAGES_PER_VISITOR = 3;
const VISITOR_WINDOW_MS = 60 * 60 * 1000;

// Poore site se ek din mein kitne mail ja sakte hain. Ye inbox bachata hai:
// koi script nikal bhi jaye to ek din mein itne se zyada mail nahi aayenge.
const MESSAGES_PER_DAY = 40;
const DAY_MS = 24 * 60 * 60 * 1000;

type VisitorRecord = {
  count: number;
  windowStartedAt: number;
};

const visitors = new Map<string, VisitorRecord>();

let messagesToday = 0;
let dayStartedAt = Date.now();

export { readVisitorId };

// true = ye visitor aur message bhej sakta hai.
export function isContactVisitorWithinLimit(visitorId: string) {
  const now = Date.now();
  const record = visitors.get(visitorId);

  if (!record || now - record.windowStartedAt > VISITOR_WINDOW_MS) {
    visitors.set(visitorId, { count: 1, windowStartedAt: now });
    return true;
  }

  if (record.count >= MESSAGES_PER_VISITOR) {
    return false;
  }

  record.count = record.count + 1;
  return true;
}

// true = aaj ka budget bacha hua hai.
export function isContactWithinDailyBudget() {
  const now = Date.now();

  if (now - dayStartedAt > DAY_MS) {
    dayStartedAt = now;
    messagesToday = 0;
  }

  return messagesToday < MESSAGES_PER_DAY;
}

export function countSentMessage() {
  messagesToday = messagesToday + 1;
}
