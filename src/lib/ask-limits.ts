/*
  Ask panel ki teen suraksha: per-visitor limit, global daily cap, aur cache.

  Sab kuch memory mein hai — koi Redis, koi database nahi. Kyun:
  ye ek portfolio hai, isliye yahan Redis laana poore site mein ek aur
  cheez hai jo toot sakti hai, bina kisi fayde ke.

  Iski seema saaf-saaf: server restart hone pe sab reset ho jata hai, aur
  Vercel pe ek se zyada instance chale to har instance apna hisaab rakhta hai.
  Matlab asli limit thodi dheeli hai. Bill se bachane wala kaam global daily
  cap karta hai, per-visitor limit nahi — isliye cap ko hi tight rakha hai.
*/

// Ek visitor ek ghante mein kitne sawaal pooch sakta hai.
// 6 isliye ki ek asli recruiter 2-3 se zyada nahi poochta, aur 6 ke baad
// jo bacha hai wo visitor nahi, koi script hai.
const QUESTIONS_PER_VISITOR = 6;
const VISITOR_WINDOW_MS = 60 * 60 * 1000;

// Poore site pe ek din mein kitne live jawab ban sakte hain.
// Ye wo ek line hai jo ₹2000 ka bill rokti hai: isse aage sab fallback.
const LIVE_ANSWERS_PER_DAY = 150;
const DAY_MS = 24 * 60 * 60 * 1000;

// Cache mein kitne jawab rakhne hain. Zyada rakhne ka matlab hai
// memory bharte rehna — aur sawaal ki variety itni nahi hoti.
const MAX_CACHE_ENTRIES = 60;

type VisitorRecord = {
  count: number;
  windowStartedAt: number;
};

const visitors = new Map<string, VisitorRecord>();
const answerCache = new Map<string, string>();

let liveAnswersToday = 0;
let dayStartedAt = Date.now();

/*
  Visitor ki pehchaan.

  ZUNO mein yahi cheez tooti thi: ek school ke NAT ke peeche chalees
  students ek hi IP se aate hain, aur raw IP pe limit lagane se chaalison
  ka ek hi quota ban jata hai.

  Yahan raw IP jaan-boojh ke use kiya ja raha hai, kyunki is site pe login
  nahi hai — pehchaan ka koi doosra zariya nahi. Isliye limit udaar rakhi hai
  (6/ghanta) aur asli bachaav global cap pe chhoda hai. Trade-off saaf hai:
  ek office se do log aayein to woh ek hi quota baantenge.
*/
export function readVisitorId(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    // Is header mein kai IP comma se aa sakti hain. Pehli asli client ki hoti hai.
    return forwardedFor.split(",")[0].trim();
  }

  // Local dev mein ye header nahi hota. Sab ek hi bucket mein — theek hai.
  return "unknown";
}

// true = aur sawaal pooch sakta hai. false = iska quota khatam.
export function isVisitorWithinLimit(visitorId: string) {
  const now = Date.now();
  const record = visitors.get(visitorId);

  if (!record || now - record.windowStartedAt > VISITOR_WINDOW_MS) {
    visitors.set(visitorId, { count: 1, windowStartedAt: now });
    return true;
  }

  if (record.count >= QUESTIONS_PER_VISITOR) {
    return false;
  }

  record.count = record.count + 1;
  return true;
}

// true = aaj ka global budget bacha hua hai.
export function isWithinDailyBudget() {
  const now = Date.now();

  if (now - dayStartedAt > DAY_MS) {
    dayStartedAt = now;
    liveAnswersToday = 0;
  }

  return liveAnswersToday < LIVE_ANSWERS_PER_DAY;
}

export function countLiveAnswer() {
  liveAnswersToday = liveAnswersToday + 1;
}

/*
  Cache.

  Key normalise ki jati hai taaki "What is ZUNO?" aur "what is zuno"
  do alag sawaal na ginein. Isse recruiter ke wahi teen suggested sawaal
  pehle visitor ke baad muft ho jate hain.
*/
function cacheKey(question: string) {
  return question.toLowerCase().replace(/\s+/g, " ").trim();
}

export function readCachedAnswer(question: string) {
  return answerCache.get(cacheKey(question));
}

export function writeCachedAnswer(question: string, answer: string) {
  // Bharne pe poora khaali kar dena sabse simple strategy hai.
  // LRU banane ka koi matlab nahi — 60 entry pe woh extra code sirf
  // padhne wale ka waqt kharch karta hai.
  if (answerCache.size >= MAX_CACHE_ENTRIES) {
    answerCache.clear();
  }

  answerCache.set(cacheKey(question), answer);
}
