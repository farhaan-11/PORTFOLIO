// ZUNO case study (/work/zuno) ke saare words yahin rehte hain.
//
// RULE: is page ka har number ZUNO repo ki ZUNO_VERIFIED_FACTS.md se verify
// hua hai. Naya number add karne se pehle wahi file padho. Jo cheez measured
// nahi hai, uske saath likha hai ki wo measured nahi hai.

export const intro = {
  label: "Case study",
  title: "ZUNO",
  tagline: "A Science tutor for Bihar Board Class 10",

  // Pehli line kaam batati hai, doosri batati hai ki is page pe aage kya hai.
  summary: [
    "ZUNO answers Class 10 Science questions from 16 indexed chapters and nothing else. When a question isn't in them, it says so by name instead of writing a paragraph that sounds right.",
    "That one promise is where almost all of the engineering went. Below is the path a single question takes, the four decisions that were hard, and the parts I still haven't fixed.",
  ],

  link: "https://learnzuno.in",
  linkLabel: "learnzuno.in",

  meta: [
    {
      label: "Role",
      text: "Sole engineer — product, backend, frontend, deployment",
    },
    { label: "Period", text: "Aug 2025 — present" },
    {
      label: "Stack",
      text: "React · Node.js · LangChain.js · MongoDB Atlas Vector Search · Redis · AWS EC2",
    },
    {
      label: "Scale",
      text: "16 chapters · 629 chunks · 3072-dim embeddings · 9 classifier intents",
    },
  ],
};

// Alag-alag koi bhi constraint mushkil nahi hai; chaaron ek saath hone se
// kaam mushkil banta hai.
export const constraints = [
  {
    label: "The query",
    title: "Students type Hinglish",
    text: 'They read the textbook in English and think in Hindi, so a real question looks like "paudhe apna khna kaise bnate hai". The indexed chapters are English. Hinglish tokens can never term-match English text.',
  },
  {
    label: "The answer",
    title: "A confident wrong answer is worse than no answer",
    text: "This is exam preparation. A fluent invented paragraph gets memorised and written in a board exam. So refusing has to be a real state in the system, not a line of instruction inside a prompt.",
  },
  {
    label: "The cost",
    title: "A student can't pay per question",
    text: "Every turn is capped at two LLM calls. Embeddings and retrieval results are cached, and the curriculum list is only sent on the turns that actually reference it.",
  },
  {
    label: "The traffic",
    title: "A whole classroom arrives from one IP",
    text: "Students sit behind a school NAT or a phone carrier's CGNAT. Anything keyed on raw IP treats forty students as one, and breaks at exactly the moment it starts being used.",
  },
];

// Ek turn ka poora raasta, 7 step. Naam aur order repo ke step1..step7 files
// se liye gaye hain. `short` se upar ek nazar ka path banta hai.
export const pipeline = [
  {
    short: "validate",
    modelCall: false,
    name: "Validate",
    detail: "No model call yet",
    text: "Question, study mode and chapter id are checked first, so a malformed request never reaches anything that costs money.",
  },
  {
    short: "session",
    modelCall: false,
    name: "Load session",
    detail: "MongoDB",
    text: "Session, chat history and the student's chapter state are loaded, or created on the first turn.",
  },
  {
    short: "context",
    modelCall: false,
    name: "Build context",
    detail: "Language detect",
    text: "Language is detected, and memory plus recent history are formatted into the shape the model expects.",
  },
  {
    short: "classify + translate",
    modelCall: true,
    name: "Classify and translate",
    detail: "1st LLM call · 9 intents",
    text: "One call decides three things at once: which of 9 intents this is, whether the syllabus is needed at all, and — if the question is Hinglish — the English search query the rest of the turn will use.",
  },
  {
    short: "vector search",
    modelCall: false,
    name: "Retrieve",
    detail: "Atlas $vectorSearch · 629 chunks",
    text: "Runs only if the previous step asked for it. Candidates come back from Atlas and then face score floors: 0.65 final, 0.70 vector, 0.62 with a term match. A candidate that clears none of them is dropped, even if it was the best one available.",
  },
  {
    short: "answer",
    modelCall: true,
    name: "Generate",
    detail: "2nd LLM call · strict JSON",
    text: 'The prompt depends on what retrieval returned. The with-chunks prompt has no "insufficient context" option; the no-chunks prompt has nothing else. The answer comes back as JSON that code validates before anyone sees it.',
  },
  {
    short: "save + stream",
    modelCall: false,
    name: "Save and stream",
    detail: "SSE",
    text: "The turn is written to MongoDB and streamed to the browser, parsed as it arrives so the answer builds up instead of appearing all at once.",
  },
];

// Page ka asli daava: ek turn bina jawab ke bhi khatam ho sakta hai, aur teen
// jagah wo khatam hota hai.
export const exits = [
  {
    label: "Out of scope",
    text: "The classifier is handed the exact list of indexed topics and must return OUT_OF_CONTEXT for anything else. Gravitation isn't in the Class 10 index, so it is refused by name rather than answered from general knowledge.",
  },
  {
    label: "Nothing cleared",
    text: "Retrieval returned no chunk above the floors. The turn is routed to a prompt whose only possible status is insufficient_context — there is no other output it can produce.",
  },
  {
    label: "Reverse check",
    text: "If the classifier says greeting or out-of-context but a top-1 vector probe scores above 0.70, the intent is upgraded and the turn goes to retrieval anyway. It fails open: an error in the probe never blocks a student.",
  },
];

// Har ek: problem → kya kiya → result.
//
// `result` mein jaan-boojh ke likha hai ki kaunsa number measured hai aur
// kaunsa nahi — interview mein "ye kaise measure kiya?" pehla sawaal hota hai.
export const decisions = [
  {
    title: "Hinglish queries retrieved nothing at all",
    problem:
      "Ten out of ten real student queries returned zero chunks. Not a weak match — all 50 candidates cleared the vector floor and then all 50 were dropped by the final filter. Raw Hinglish scored 0.59–0.69 against a 0.70 bar, and Hinglish tokens can't term-match English chunk text.",
    action:
      "The classifier was already computing an English version of the question and throwing it away. I kept it, and routed retrieval, the safety probe and the glossary through that one English query. What I deliberately did not do was lower the threshold: 8 of the 10 scored below 0.65, so a lower bar would have admitted cross-topic noise and still returned nothing useful.",
    result:
      'Measured: 0 chunks on 10/10 became 5 chunks on 10/10. The safety probe went from firing 0/10 to 10/10, while the negative control "Newton ka niyam" stayed below threshold — translating the query did not manufacture false positives.',
  },
  {
    title: 'Making "not in the material" a state, not an instruction',
    problem:
      "A grounded prompt is not enough. The same model that is told to refuse will also claim the material doesn't cover a topic while holding five correct chunks about it, or write a fluent paragraph while holding none.",
    action:
      "The refusal lives in four independent places instead of one sentence: the classifier carries the indexed topic list; a no-chunks turn is routed to a separate prompt whose status is hard-coded; the with-chunks prompt is given no refusal option at all, so it can't claim emptiness while full; and the status comes back inside a strict JSON contract that code validates, and overrides when the model returns something impossible.",
    result:
      "The refusal no longer depends on how the model feels on a given turn. A re-runnable golden set keeps it honest: 18/18 in-curriculum queries return 1–5 chunks, and 2/2 out-of-curriculum controls return 0.",
  },
  {
    title: "A streamed answer with no way to stop it",
    problem:
      "The tutor streams a JSON object, so nothing can be rendered until it parses — while the student sits watching tokens arrive. It broke in three separate ways: a token cap truncated the JSON mid-string, so a student who had just watched a whole answer got an error; one malformed frame killed the entire stream; and closing the tab left the model call running and billing.",
    action:
      "Incremental partial-JSON parsing of the accumulated buffer, throttled to 33ms so React isn't re-rendered once per token. A try/catch per frame, so a bad frame is skipped instead of fatal. An explicit error when the reader ends without an end event. And a single AbortController threaded from the browser through the server's connection-close handler into every provider call, sharing one path with a hard 60-second timeout.",
    result:
      "No number here, and I won't invent one — I never measured the billing this saved. The cancel path I verified end to end by hand. The truncation case is still open in my backlog: when a response stops because it hit the token cap, I don't yet salvage what did arrive.",
  },
  {
    title: "Not paying for the turns that don't need the syllabus",
    problem:
      'Sending every turn through retrieval means every "hi" pays for an embedding call and an Atlas round trip. And the round trip was worse than it looked: the retriever pulled 50 candidate documents with full text and the 3072-float embedding field, roughly 24KB of useless float per document.',
    action:
      "Two gates and one fix. The first LLM call decides whether the syllabus is needed, so retrieval runs only when it is. A ~450-token curriculum block sits behind a six-branch check, so it goes out only on the turns that reference it. And the embedding field is excluded at the projection, so candidates arrive without their vectors.",
    result:
      "Measured on one link: 50 candidates with full text = 132KB / 872ms; scores only = 3.5KB / 310ms. So the search itself is ~310ms and ~562ms of it was pure payload transfer. A turn costs roughly $0.001–0.002 — derived from config and model pricing, not read off a billing log.",
  },
];

// Teen baatein jo abhi tak tooti hui hain. Inhe kabhi "lessons learned" jaisi
// safe list mat banana — jo theek nahi hui usey theek likhne se page jhootha
// ho jata hai.
export const nextTime = [
  "I keyed the /ask rate limiter on identity once I understood that one school's NAT was sharing a single quota between every student behind it. The global limiter still has the same raw-IP bug. It's in my backlog, I know it will break the first real classroom, and I should have fixed both the day I found the cause instead of one.",

  "I built three cache layers before I built a single hit counter. When I audited the project against its own code I couldn't prove any of them were helping — and one, the chapter-progress cache, turned out to have a 0% hit rate on the hot path, because the same turn that writes it also deletes it. Next time the instrumentation ships with the cache, not after it.",

  "And I'd write the golden retrieval dump first. I spent a week guessing at Hinglish before I had a re-runnable set of 20 queries with their scores saved. After that, checking a retrieval change took minutes.",
];

// `src` null ho to page ek khaali frame aur caption dikhata hai — toota hua
// image icon kabhi nahi dikhta. Image public/images/ mein daal ke path likho.
export const screenshots = [
  {
    label: "Interface",
    src: null as string | null,
    alt: "ZUNO's chapter list with the question box below it",
    caption:
      "What a student actually opens: the chapter they're studying, and one box.",
  },
  {
    label: "Streaming",
    src: null as string | null,
    alt: "A ZUNO answer partially rendered while it is still streaming",
    caption:
      "An answer mid-stream. The JSON is parsed as it arrives, so the answer builds instead of appearing all at once.",
  },
  {
    label: "Refusal",
    src: null as string | null,
    alt: "ZUNO telling a student that the indexed material does not cover their question",
    caption:
      "The one that matters. A question the 16 chapters don't cover, refused by name instead of answered.",
  },
];
