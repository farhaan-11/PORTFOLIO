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
  //
  // Pehle yahan "only from what's written on this site" tha. Ab knowledge base
  // mein resume ki wo cheezein bhi hain jo page pe jaan-boojh ke nahi rakhi gayi
  // (PHP, Postman, 35% load time...). Line us sach ke saath badal di gayi —
  // galat line rakh ke panel ko sach bolne se rokna ulta nuksaan hota.
  intro:
    "Answers come only from Farhan's own material — this site and his resume. When something isn't in either, it says so instead of making it up — the same rule ZUNO runs on.",

  // "you" se "he": panel Farhan ban kar nahi bolta, is page ki taraf se
  // bolta hai (dekho ask-knowledge.ts ka system prompt).
  placeholder: "What is ZUNO, in plain words?",

  // Chhe sawaal, teen nahi — kyunki zyadatar reader kuch type karte hi nahi.
  // Khaali box ke saamne dimaag khaali ho jata hai. Jitne sawaal click karne
  // layak honge, utne hi log panel chalu karenge. Chheh se zyada bhi nahi:
  // aath-das link ek deewar ban jate hain aur phir koi ek bhi click nahi hota.
  //
  // Balance: sirf DO sawaal ZUNO ke hain, chaar bande ke.
  // Pehle teeno ZUNO ke the, aur teeno uske andar ka kaam poochte the —
  // Hinglish retrieval, refusal, kya badalta. Jo reader technical nahi hai
  // (HR, recruiter — yahi zyadatar aate hain), uske paas click karne ko
  // kuch tha hi nahi, aur jo tha wo samajh bhi nahi aata.
  //
  // ZUNO ke do sawaal ab sabse buniyadi hain: "ye hai kya" aur "jhooth kyun
  // nahi bolta". Doosra hi poore page ka daava hai — wahi ek cheez hai jo
  // ZUNO ko baaki tutor apps se alag karti hai.
  //
  // Chheh ke chheh pehle se likhe jawabon se match karte hain (fallbackAnswers
  // neeche). Isliye API band ho ya key na ho, tab bhi har click pe ek asli
  // jawab milta hai — "pata nahi" nahi.
  suggestions: [
    "What is ZUNO, in plain words?",
    "What stops ZUNO from making up an answer?",
    "What did he build at Rollix?",
    "Where has he worked, and for how long?",
    // "stack" shabd jaan-boojh ke hai — fallback matching keyword pe chalti
    // hai, aur "what does he use day to day?" kisi keyword se nahi milta.
    "What is in his stack day to day?",
    "What roles is he open to?",
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
  Resume mein hai, page pe nahi.

  Page ki stack list jaan-boojh ke chhoti hai — jo cheez har developer ke paas
  hai (HTML5, Postman, Git) usse koi alag nahi dikhta. Par recruiter resume
  padh ke panel se poochh sakta hai: "Does he know PHP?" Us waqt panel ka
  "ye page pe nahi hai" kehna ek jhooth jaisa padhta hai — cheez aati hai,
  bas page pe likhi nahi hai.

  Isliye ye cheezein sirf knowledge base mein jaati hain, page pe kahin nahi.
  Har line resume ya resume-decisions-log se hai — yahan koi nayi baat nahi gadhi gayi.

  Kuch bhi add karne se pehle: `Resumes/Farhan_Ansari_Full_Stack_Developer.pdf`
  aur `Resumes/resume-decisions-log.md` mein confirm karo. Yaad se mat likho.
*/
export const resumeOnlyFacts = [
  "PHP: used it over two years ago, now rusty. Node.js is primary. No Laravel.",
  "Frontend tools not listed on the site: HTML5, CSS3, Material UI, Vite, React Router.",
  "Other tools not listed on the site: Postman for API testing, Git, Mongoose, MERN stack.",
  "Groq is a fallback LLM provider alongside Gemini. OpenAI is primary.",
  "All projects are mobile-responsive — media queries, Flexbox, Grid, Tailwind.",
  "At Gautam Solar he also cut dashboard load time by 35% (measured in Chrome DevTools, before and after) with route-level code splitting, lazy loading, React.memo and useCallback.",
  "At Gautam Solar he also designed the MySQL schema and REST APIs for a new HR onboarding backend — employee documents, attendance and payroll.",
  "RentalWave also has Google OAuth and password login on access/refresh tokens, and multi-image listings uploaded to Cloudinary.",
  "His degrees are in electronics, not computer science.",
];

/*
  Jo nahi aata.

  Ye section panel ka sabse zaroori hissa hai. Poora page is daave pe khada hai
  ki ZUNO guess nahi karta — to panel ka khud guess karna poore page ko jhootha
  kar dega. "Ye mujhe nahi aata" kehna yahan kamzori nahi, wahi sabse bada proof hai.

  Teeno resume-decisions-log mein LOCKED hain. In par kabhi "thoda aata hai"
  jaisa jawab nahi aana chahiye.
*/
export const knownGaps = [
  "Figma and design-to-code: he has not worked with it.",
  "Webhooks, including Razorpay payment-verification callbacks: he has not handled them anywhere, Rollix included.",
  "Laravel: no experience at all.",
];

/*
  Pehle se likhe jawab.

  Matching bahut simple hai: sawaal mein se koi bhi keyword mil gaya to
  wahi jawab. Pehla match jeet jata hai, isliye order matter karta hai —
  khaas (hinglish, refusal) pehle, aam (stack, contact) baad mein.

  Yahan regex nahi hai jaan-boojh ke: includes() se kaam ho raha hai,
  aur ek fresher ise padh ke samajh jayega.

  Ye jawab pehle first person mein the ("I kept it"). Ab third person mein hain,
  kyunki live jawab bhi third person mein aate hain (dekho ask-knowledge.ts ka
  system prompt). Ek hi panel mein do awaazein — kabhi "I", kabhi "he" —
  tooti hui cheez lagti hai, chahe label alag ho.
*/
export const fallbackAnswers = [
  {
    // Sabse pehle, aur jaan-boojh ke poore phrase: sirf "zuno" keyword rakhte
    // to ZUNO ka naam lene wala har sawaal yahi jawab khinch leta.
    keywords: [
      "what is zuno",
      "what does zuno",
      "explain zuno",
      "plain words",
      "tell me about zuno",
      "what zuno",
    ],
    answer:
      "ZUNO is a study tutor for Bihar Board Class 10 students, live at learnzuno.in. A student asks a question in Hindi, English or a mix of the two, and the answer comes back only from the 16 Science chapters of their own syllabus that have been loaded into it. Anything outside that syllabus gets a clear 'this is not in your material' instead of an answer. He has built all of it alone since August 2025 — the app, the search, the servers and the deploys.",
  },
  {
    keywords: [
      "refus",
      "not in material",
      "insufficient",
      "hallucinat",
      "wrong answer",
      "making up",
      "make up",
      "made up",
      "invent",
      "grounded",
      "out of scope",
    ],
    answer:
      "Refusing is built into the system, not asked for in an instruction. Before answering, ZUNO searches the loaded chapters; if nothing close comes back, the question goes down a separate path whose only possible reply is that the material does not cover it. The path that has chapters is never offered a way to refuse, and the path with nothing is never offered a way to answer, so neither can pick the wrong one. A fixed set of test questions keeps it honest: 18 syllabus questions find material, 2 outside questions find none.",
  },
  {
    keywords: ["hinglish", "retriev", "vector", "chunk", "embedding", "search"],
    answer:
      "Students type Hindi in English letters, and the search understood neither language — all 10 real student questions he tested came back with nothing. The fix was already half-built: an earlier step was translating each question into English and then throwing that translation away, so he kept it and searched with it instead. Those same 10 questions went from 0 results to 5 each. An unrelated control question still returned nothing, which matters — it shows the fix found the right material rather than loosening the filter.",
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
      "Every question costs two AI calls and never more. The first call works out what kind of question it is and whether the syllabus is needed at all, so a greeting never reaches the search. If it is a study question, the system searches the loaded chapters and keeps only the closest matches. The second call writes the answer from those matches alone, and the text appears on screen as it is written. The full walkthrough is on the ZUNO case study page.",
  },
  {
    keywords: ["cost", "cheap", "price", "token", "bill", "expensive"],
    answer:
      "Two AI calls per question, and two gates that keep the expensive paths shut: a greeting never reaches the search, and the syllabus list is attached only on the turns that mention it. The search was also returning 50 full documents, each carrying the raw number arrays used for matching; dropping that one field took a single step from 132KB and 872ms to 3.5KB and 310ms. A question costs roughly $0.001 to $0.002 — a figure worked out from the pricing and the settings, not read off a bill.",
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
      "A whole school shares one internet address, so any limit counted per address treats forty students as one person and locks out the class. He changed the limiter on the question route to count per student instead. The site-wide limiter still counts by address — he knows it will break on the first real classroom, it is written down in his backlog, and he says the honest mistake was fixing one place the day he understood the cause instead of both.",
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
      "The answer arrives as structured data, so nothing can be shown until it is complete — and that broke three ways: a long answer was cut mid-sentence and showed an error to a student who had just read the whole thing, one bad piece killed the entire stream, and closing the tab left the AI call running and billing. He now reads the answer as it arrives, skips a bad piece instead of failing, and cancels the call the moment the tab closes, with a hard 60-second limit. He never measured what that saved in billing and will not invent a number, and the cut-off case is still open in his backlog.",
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
      "Three things, all found by auditing his own code. First, the site-wide rate limiter still carries the bug he had already fixed on the question route — one cause, two places, and he fixed one. Second, he built three layers of caching before building a single counter to prove they helped; when he finally measured, one layer had never once been used, because the same turn that wrote it also deleted it. Measurement ships with the feature next time, not after it. Third, he would save a set of real test questions first — he spent a week guessing before he had 20 he could re-run in seconds.",
  },
  {
    keywords: ["rollix", "payment", "wallet", "razorpay", "withdraw", "payout"],
    answer:
      "At Rollix, a gaming platform, he was the only developer on payments for four months. He built the wallet — Razorpay checkout, the deposit API, and conversion between rupees and dollars — and connected it to the wallet screen. He also built the withdrawal side: a multi-step admin approval before any payout, the fee deduction, the payout APIs, and the same status visible to both the admin and the user.",
  },
  {
    keywords: ["stack", "tech", "tool", "language", "framework", "python"],
    answer:
      "JavaScript and TypeScript, with React and Next.js on the screen side and Node.js and Express behind it. MongoDB, MySQL and Redis for data. For AI work: LangChain.js, retrieval over Atlas Vector Search, embeddings, OpenAI and Gemini. For running it: AWS, Nginx, Docker, GitHub Actions, Vercel and Render. Python and FastAPI sit in a separate 'learning now' group, because ZUNO's search layer is being rebuilt in them right now and listing them with the rest would overstate it.",
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
      "how long",
    ],
    answer:
      "Three roles. Gautam Solar, July 2024 to May 2025 — the logistics platform for a solar manufacturer, 25+ modules, 200+ people using it every day. Rollix on contract, May to August 2025 — sole developer on the wallet and withdrawal flow for a gaming platform. ZUNO since August 2025, built on his own. His degrees are in electronics, not computer science.",
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
    // 17 Oct 2026: daayra chauda hua. Pehle yahan sirf "full-stack and frontend
    // roles where AI is part of the product" tha — wo About ke naye "Open to"
    // block se alag baat bolne laga tha, aur panel ka page se alag bolna sabse
    // bura failure hai. "AI engineer nahi" wali line yahan hi rehni chahiye:
    // panel se log yahi sawaal seedha poochte hain.
    answer:
      "Open to full-stack roles, and to backend or frontend roles on their own. AI being part of the product is a plus, not a requirement — and he is not looking for 'AI engineer' roles, because he builds products around models, he does not train them. Based in Hyderabad, and open to relocation. Email is farhanraza2239@gmail.com, which is also in the contact section at the bottom of this page with a copy button.",
  },
];

// Jab koi keyword match na ho. Ye jawab jaan-boojh ke "pata nahi" bolta hai
// aur reader ko sahi jagah bhejta hai — wahi cheez jo ZUNO khud karta hai.
export const fallbackNotFound =
  "That is not something this page covers. The closest places to look are the ZUNO case study at /work/zuno, which has the architecture and the four hard decisions, and the sections above this one. For anything else, email farhanraza2239@gmail.com — that reaches him directly.";
