// Ask panel ke saare words yahin rehte hain.
//
// Do cheezein yahan hain:
// 1. Panel pe dikhne wale words (heading, placeholder, suggested questions)
// 2. Pehle se likhe hue jawab — jo tab dikhte hain jab API kaam na kare
//
// Point 2 sabse zaroori hai. Agar API down ho, key na ho, ya limit lag jaye,
// to reader ko error ya khaali spinner NAHI dikhega — usey ek asli jawab
// milega, bas honestly label kiya hua ki ye pehle se likha hua hai.
// Ye jawab ZUNO ke verified facts se aaye hain, isliye sab sach hain.

export const askPanel = {
  label: "Ask",

  heading: "Ask this page a question.",

  // Reader ko pehle hi bata do ki ye kya hai aur kya nahi hai.
  // "AI assistant" nahi likha — wo har doosri site pe likha hai aur kuch nahi batata.
  intro:
    "Answers come only from what's written on this site. When something isn't here, it says so instead of making it up — the same rule ZUNO runs on.",

  placeholder: "How did you fix retrieval for Hinglish queries?",

  // Teen sawaal. Teeno jaan-boojh ke wo hain jinke jawab mein numbers hain —
  // reader ko ek click mein site ka sabse mazboot content milta hai.
  suggestions: [
    "How did you fix retrieval for Hinglish queries?",
    "How does ZUNO refuse a question it cannot answer?",
    "What would you change about ZUNO?",
  ],

  // Button aur state ke words
  submitLabel: "Ask",
  loadingLabel: "Thinking",

  // Jawab ke upar chhota mono label — reader ko pata rehna chahiye ki
  // jawab abhi bana hai ya pehle se likha hua hai. Ye imaandari hi
  // poore panel ko bharosemand banati hai.
  sourceLabels: {
    live: "Answered live",
    cached: "Answered live · from cache",
    fallback: "Pre-written answer",
  },

  // Question kitna lamba ho sakta hai. Isse aage likhne ka matlab hai
  // ki reader sawaal nahi, paragraph bhej raha hai — aur wo token kharch karta hai.
  maxQuestionLength: 300,
};

/*
  Pehle se likhe jawab.

  Matching bahut simple hai: sawaal mein se koi bhi keyword mil gaya to
  wahi jawab. Pehla match jeet jata hai, isliye order matter karta hai —
  khaas (hinglish, refusal) pehle, aam (stack, contact) baad mein.

  Yahan regex nahi hai jaan-boojh ke: includes() se kaam ho raha hai,
  aur ek fresher ise padh ke samajh jayega.
*/
export const fallbackAnswers = [
  {
    keywords: ["hinglish", "retriev", "vector", "chunk", "embedding", "search"],
    answer:
      "Ten out of ten real student queries returned zero chunks. Raw Hinglish scored 0.59–0.69 against a 0.70 vector floor, and Hinglish tokens can never term-match English chunk text. The fix was already in the system: the classifier was computing an English version of the question and throwing it away, so I kept it and routed retrieval, the safety probe and the glossary through that one English query. Measured, 0 chunks on 10/10 became 5 chunks on 10/10, while the negative control stayed below threshold. What I deliberately did not do was lower the threshold — 8 of the 10 scored below 0.65, so a lower bar would have let in cross-topic noise and still returned nothing useful.",
  },
  {
    keywords: [
      "refus",
      "not in material",
      "insufficient",
      "hallucinat",
      "wrong answer",
      "made up",
      "invent",
      "grounded",
      "out of scope",
    ],
    answer:
      "Refusing is a state in the system, not a sentence in a prompt. It lives in four independent places: the classifier carries the exact list of indexed topics and must return OUT_OF_CONTEXT for anything else; a turn that retrieved nothing is routed to a separate prompt whose only possible status is insufficient_context; the with-chunks prompt is given no refusal option at all, so it cannot claim emptiness while holding five correct chunks; and the status comes back inside a strict JSON contract that code validates and overrides when the model returns something impossible. A re-runnable golden set keeps it honest — 18/18 in-curriculum queries return 1–5 chunks, and 2/2 out-of-curriculum controls return 0.",
  },
  {
    keywords: ["cost", "cheap", "price", "token", "bill", "expensive", "money"],
    answer:
      "Every turn is capped at two LLM calls, and two gates keep the expensive paths closed. The first LLM call decides whether the syllabus is needed at all, so a greeting never reaches vector search. A ~450-token curriculum block sits behind a six-branch check, so it goes out only on turns that reference it. The retriever also used to pull 50 candidates with their full 3072-float embedding field — excluding that field at the projection took one link from 132KB / 872ms down to 3.5KB / 310ms, meaning ~562ms of the original was pure payload transfer. A turn costs roughly $0.001–0.002, and I will say plainly that this is derived from config and model pricing, not read off a billing log.",
  },
  {
    keywords: [
      "rate limit",
      "classroom",
      "nat",
      "cgnat",
      "abuse",
      "traffic",
      "scale",
    ],
    answer:
      "Students sit behind a school NAT or a carrier's CGNAT, so anything keyed on raw IP treats forty students as one and breaks at exactly the moment it starts being used. I keyed the /ask limiter on identity once I understood that. The global limiter still has the same raw-IP bug — it is in my backlog, I know it will break the first real classroom, and I should have fixed both the day I found the cause instead of one.",
  },
  {
    keywords: [
      "stream",
      "abort",
      "cancel",
      "sse",
      "json pars",
      "truncat",
      "timeout",
    ],
    answer:
      "ZUNO streams a JSON object, so nothing can render until it parses — and it broke in three separate ways: a token cap truncated the JSON mid-string so a student who had watched a whole answer got an error, one malformed frame killed the entire stream, and closing the tab left the model call running and billing. The fixes were incremental partial-JSON parsing throttled to 33ms so React is not re-rendered once per token, a try/catch per frame so a bad frame is skipped instead of fatal, an explicit error when the reader ends without an end event, and a single AbortController threaded from the browser through the server's connection-close handler into every provider call, sharing one path with a hard 60-second timeout. I never measured the billing this saved and will not invent a number. The truncation case is still open in my backlog.",
  },
  {
    keywords: [
      "change",
      "differently",
      "regret",
      "mistake",
      "again",
      "weakness",
      "improve",
      "cache",
    ],
    answer:
      "Three things, from auditing the project against its own code. First, the global rate limiter still has the raw-IP bug I already fixed on /ask — I should have fixed both the day I found the cause. Second, I built three cache layers before I built a single hit counter, and when I audited I could not prove any of them were helping; one, the chapter-progress cache, had a 0% hit rate on the hot path because the same turn that writes it also deletes it. Next time the instrumentation ships with the cache, not after it. Third, I would write the golden retrieval dump first — I spent a week guessing at Hinglish before I had a re-runnable set of 20 queries with their scores saved, and after that a retrieval change took minutes to check.",
  },
  {
    keywords: [
      "architect",
      "pipeline",
      "how does zuno work",
      "how it works",
      "classifier",
      "intent",
    ],
    answer:
      "A single turn runs seven steps: validate the request, load session and chapter state from MongoDB, build context and detect language, then one LLM call that decides three things at once — which of 9 intents this is, whether the syllabus is needed at all, and the English search query if the question was Hinglish. Retrieval runs only if that call asked for it, pulling candidates from Atlas Vector Search across 629 chunks and dropping anything that fails the score floors. Then a second LLM call generates a strict JSON answer whose prompt depends on what retrieval returned, and the turn is saved and streamed over SSE. Two LLM calls per turn, never more. The full walkthrough is on the ZUNO case study page.",
  },
  {
    keywords: ["stack", "tech", "tool", "language", "framework", "python"],
    answer:
      "JavaScript and TypeScript, React and Next.js on the front, Node.js and Express behind it with REST, SSE and WebSockets. MongoDB Atlas, MySQL and Redis for data. For GenAI: LangChain.js, RAG, Atlas Vector Search, embeddings, OpenAI and Gemini. AWS (EC2, S3, IAM, Route 53), Nginx, Docker, GitHub Actions, Vercel and Render for deployment. Python and FastAPI are listed separately as 'learning now', because putting them next to the rest would be a lie — ZUNO's retrieval layer is being rebuilt in them right now.",
  },
  {
    keywords: [
      "experience",
      "worked",
      "job",
      "company",
      "background",
      "degree",
      "college",
      "who are you",
    ],
    answer:
      "Independent developer on ZUNO since Aug 2025, full-stack developer at Rollix on contract from May to Aug 2025, and full-stack developer at Gautam Solar from Jul 2024 to May 2025, where the logistics platform reached 200+ daily users across 25+ modules. No computer science degree — the degrees are in electronics. I learned to build software by building things people had no choice but to use: a dispatch floor that ran on paper until it did not, a wallet that moved real money, and ZUNO.",
  },
  {
    keywords: [
      "hire",
      "contact",
      "email",
      "available",
      "role",
      "relocat",
      "location",
      "notice",
      "open to",
    ],
    answer:
      "Open to full-stack roles where AI is part of the product — not 'AI engineer' roles, because I do not train or fine-tune models and the hero of a portfolio is a bad place to lie. Based in Hyderabad, India, and open to relocation. Email is farhanraza2239@gmail.com, and it is in the contact section at the bottom of this page with a copy button.",
  },
];

// Jab koi keyword match na ho. Ye jawab jaan-boojh ke "pata nahi" bolta hai
// aur reader ko sahi jagah bhejta hai — wahi cheez jo ZUNO khud karta hai.
export const fallbackNotFound =
  "That is not something this page covers. The closest places to look are the ZUNO case study at /work/zuno, which has the architecture and the four hard decisions, and the sections above this one. For anything else, email farhanraza2239@gmail.com — that reaches me directly.";
