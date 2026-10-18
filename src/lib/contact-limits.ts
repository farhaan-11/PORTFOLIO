import { readVisitorId } from "@/lib/ask-limits";

const MESSAGES_PER_VISITOR = 3;
const VISITOR_WINDOW_MS = 60 * 60 * 1000;

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

export function isContactVisitorWithinLimit(visitorId: string) {
  const now = Date.now();
  const record = visitors.get(visitorId);

  if (!record) {
    return true;
  }

  if (now - record.windowStartedAt > VISITOR_WINDOW_MS) {
    return true;
  }

  return record.count < MESSAGES_PER_VISITOR;
}

export function isContactWithinDailyBudget() {
  const now = Date.now();

  if (now - dayStartedAt > DAY_MS) {
    dayStartedAt = now;
    messagesToday = 0;
  }

  return messagesToday < MESSAGES_PER_DAY;
}

// Ye sirf tab chalta hai jab mail sach mein chala gaya ho — warna fail hone
// par bhi visitor ka quota kat jata hai. (DECISIONS.md section 9)
export function countSentMessage(visitorId: string) {
  const now = Date.now();
  const record = visitors.get(visitorId);

  if (!record || now - record.windowStartedAt > VISITOR_WINDOW_MS) {
    visitors.set(visitorId, { count: 1, windowStartedAt: now });
  } else {
    record.count = record.count + 1;
  }

  messagesToday = messagesToday + 1;
}
