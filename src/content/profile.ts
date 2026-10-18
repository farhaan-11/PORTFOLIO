// Site ke saare words yahin rehte hain. Component files mein koi string nahi.
// Faislon ki wajah DECISIONS.md section 7 mein hai.

const nameFirst = "Farhan";
const nameLast = "Ansari";

export const nav = {
  nameFirst,
  nameLast,
  name: `${nameFirst} ${nameLast}`,

  links: [
    { label: "Work", href: "#work" },
    { label: "Background", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],

  // Phone pe upar wali teen link chhup jati hain, isliye wahan ek hi shortcut.
  contactShortcut: { label: "Get in touch", href: "#contact" },
};

export const hero = {
  label: "Full-stack engineer",

  headline: "The model was the easy part.",

  // Teen tukde, kyunki beech wala phrase highlight hota hai.
  summaryStart:
    "I built ZUNO — a tutor for Bihar Board Class 10. It answers only from the board's syllabus. Anything outside it gets an honest ",
  summaryHighlight: "“that's not in your syllabus”",
  summaryEnd: " — not a guess.",
};

// Page pe kahin nahi dikhte — sirf Ask panel ke knowledge base ke liye.
export const metrics = [
  {
    value: "0 → 5",
    label: "chunks retrieved on 10/10 Hinglish queries",
    project: "ZUNO",
  },
  {
    value: "200+",
    label: "daily users on a logistics platform",
    project: "Gautam Solar",
  },
  {
    value: "25+",
    label: "modules shipped across sales, dispatch and delivery",
    project: "Gautam Solar",
  },
  {
    value: "40%",
    label: "faster search API",
    project: "RentalWave",
  },
];

// "Four" ki ginti neeche wali list se aati hai. Entry add/hatao to ye line
// bhi badalni padegi.
export const workIntro =
  "Four products, four different problems: retrieval, payments, logistics, search.";

type LeadImage = {
  src: string;
  alt: string;
  caption: string;
  // width/height dono zaroori hain — next/image inhi se jagah pehle se
  // reserve karta hai, warna photo load hote waqt page uchhalta hai.
  width: number;
  height: number;
};

export type WorkEntry = {
  title: string;
  tagline: string;
  // Sirf lead row ke liye. Baaki rows mein null.
  keywordLine: string | null;
  context: string;
  period: string;
  link: string | null;
  linkLabel: string | null;
  caseStudy: string | null;
  stack: string[];
  stats: { label: string; value: string }[] | null;
  image: LeadImage | null;
  // Row mein dikhne wali chhoti line.
  indexLine: string;
  // Ask panel ke knowledge base ki poori line — page pe nahi dikhti.
  description: string;
};

// List ka order hi number banta hai (pehla = 01), isliye number store nahi kiya.
export const work: WorkEntry[] = [
  {
    title: "ZUNO",
    tagline: "An AI tutor for Bihar Board Class 10",
    keywordLine: "Retrieval-augmented · Science syllabus · 16 chapters",
    context: "Independent",
    period: "Aug 2025 — present",
    link: "https://learnzuno.in",
    linkLabel: "learnzuno.in",
    caseStudy: "/work/zuno",
    stack: [
      "React",
      "Node.js",
      "LangChain.js",
      "MongoDB Atlas Vector Search",
      "AWS EC2",
    ],
    stats: [
      { label: "Chapters indexed", value: "16" },
      { label: "Intents sorted first", value: "9" },
    ],
    image: {
      src: "/images/zuno-answer.png",
      alt: "ZUNO's chat: a Class 10 question typed in Hinglish, answered in the same Hinglish",
      caption: "A student's Hinglish question, answered in the same Hinglish",
      width: 1410,
      height: 460,
    },
    indexLine:
      "It answers only from the indexed chapters, and says so when the answer isn't in them instead of inventing one. The classifier decides whether a question needs the syllabus at all, so a greeting never touches vector search.",
    description:
      "It answers only from 16 indexed Science chapters, and says so when the answer isn't in them instead of inventing one. A 9-intent classifier decides whether a question needs the syllabus at all, so a greeting never touches vector search.",
  },
  {
    title: "Wallet and withdrawals",
    tagline: "Gaming platform, INR and USD",
    keywordLine: null,
    context: "Rollix (Contract)",
    period: "May 2025 — Aug 2025",
    link: null,
    linkLabel: null,
    caseStudy: null,
    stack: ["React", "Node.js", "Razorpay"],
    stats: null,
    image: null,
    indexLine:
      "Sole developer on payments: Razorpay checkout, INR/USD deposits, and withdrawals through multi-step admin approval with fee deduction and payout APIs.",
    description:
      "As the sole developer on payments: Razorpay checkout, a deposit API and INR/USD conversion on the backend, connected to the wallet UI. The withdrawal flow runs through multi-step admin approval with fee deduction and payout APIs, and the same status shows in both the admin and user views.",
  },
  {
    title: "Logistics platform",
    tagline: "Solar manufacturer, sales to delivery",
    keywordLine: null,
    context: "Gautam Solar",
    period: "Jul 2024 — May 2025",
    link: null,
    linkLabel: null,
    caseStudy: null,
    stack: ["React", "Node.js", "MySQL", "JWT + RBAC"],
    stats: null,
    image: null,
    indexLine:
      "25+ modules from sales to delivery for 200+ people a day, replacing paper dispatch — GPS tracking with route-deviation alerts and three role-based dashboards.",
    description:
      "Replaced a paper-based dispatch process — 25+ modules across sales, dispatch and delivery, used by 200+ people a day. Live GPS tracking with route-deviation alerts, and three role-based dashboards where each role only ever sees its own rows.",
  },
  {
    title: "RentalWave",
    tagline: "Rental & PG marketplace",
    keywordLine: null,
    context: "Personal project",
    period: "2024 — present",
    link: "https://rental-wave.vercel.app",
    linkLabel: "rental-wave.vercel.app",
    caseStudy: null,
    stack: ["React", "Node.js", "MongoDB", "Redis"],
    stats: null,
    image: null,
    indexLine:
      "Six or more optional filters folded into one MongoDB query; indexing, pagination and Redis caching cut search response time by 40%.",
    description:
      "A marketplace for rentals and PG listings. Its search folds six or more optional filters into a single MongoDB query instead of a chain of conditionals that grows with every new filter, and indexing, pagination and Redis caching cut the search API response time by 40%.",
  },
];

// Page pe kahin nahi dikhta — sirf Ask panel ke knowledge base ke liye.
export const experience = [
  {
    role: "Independent Developer",
    company: "ZUNO",
    period: "Aug 2025 — present",
  },
  {
    role: "Full Stack Developer",
    company: "Rollix (Contract)",
    period: "May 2025 — Aug 2025",
  },
  {
    role: "Full Stack Developer",
    company: "Gautam Solar",
    period: "Jul 2024 — May 2025",
  },
];

// Jaan-boojh ke chhoti list. Kuch add karne se pehle DECISIONS.md section 7.
export const stack = [
  {
    group: "Languages",
    items: ["JavaScript", "TypeScript"],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "Redux Toolkit", "Tailwind CSS"],
  },
  {
    group: "Backend",
    items: [
      "Node.js",
      "Express",
      "REST APIs",
      "SSE",
      "WebSockets",
      "JWT / OAuth 2.0 / RBAC",
      "Razorpay",
    ],
  },
  {
    group: "Data",
    items: ["MongoDB Atlas", "MySQL", "Redis"],
  },
  {
    group: "GenAI",
    items: [
      "LangChain.js",
      "RAG",
      "Atlas Vector Search",
      "Embeddings",
      "OpenAI",
      "Gemini",
    ],
  },
  {
    group: "Cloud & DevOps",
    items: [
      "AWS (EC2, S3, IAM, Route 53)",
      "Nginx",
      "Docker",
      "GitHub Actions CI/CD",
      "Vercel",
      "Render",
    ],
  },
  {
    // Alag group isliye ki inhe baaki ke barabar rakhna jhooth hota.
    group: "Learning now",
    items: ["Python", "FastAPI"],
  },
];

type AboutBlock = {
  label: string;
  text: string;
};

// `story` padha jata hai, `side` jaana jata hai, `closing` section ki maang hai.
export const about: {
  lede: string;
  story: AboutBlock[];
  side: AboutBlock[];
  closing: {
    label: string;
    text: string;
    href: string;
    linkLabel: string;
  };
} = {
  lede: "I build full-stack applications — the kind that has to keep running after I ship it.",

  story: [
    {
      label: "Now",
      text: "ZUNO is a study tutor for Bihar Board Class 10 Hindi-medium students — I went through that system myself. Mine alone since August 2025: retrieval, auth, deploy.",
    },
    {
      label: "The hard part",
      text: "Not the model. Students type Hinglish. Ten real Hinglish questions returned zero passages; the same ten in English returned five each. My own score filter was killing all fifty candidates. That was retrieval work, not AI work.",
    },
  ],

  side: [
    {
      label: "Before",
      text: "Logistics dashboards at Gautam Solar, then payments at Rollix. Both ends of both — the screens people worked in, and the APIs underneath them.",
    },
    {
      label: "In progress",
      text: "Moving ZUNO's retrieval out of Node into a Python service of its own — FastAPI on its own port, an internal key between them. Python because the reranker runs on raw vector scores, and a service of its own because one app is becoming several.",
    },
  ],

  closing: {
    label: "Open to",
    text: "Full-stack roles, and backend or frontend on their own. AI being part of the product is a plus.",
    href: "#contact",
    linkLabel: "Get in touch",
  },
};

// Ek hi jagah likhe hain, phir `channels` mein dobara use hote hain — warna
// email ya number badalne pe do jagah badalna padta.
const email = "farhanraza2239@gmail.com";
const phoneDisplay = "+91 73895 71975";
const phoneHref = "tel:+917389571975";
const location = "Hyderabad, India";

export const contact = {
  heading: "What are you building?",

  line: "Tell me in one line, and I'll tell you if I'm the right engineer for it.",

  email,
  location,
  relocation: "Open to relocation",

  availability: "Open to full-time roles · IST · replies in a day",

  // `ready` ek switch hai — isse nav ka Resume button on/off hota hai.
  // Drive pe file update karne ka tareeka DECISIONS.md section 7 mein hai.
  resume: {
    ready: true,
    href: "https://drive.google.com/file/d/1WKcxvlbuip1cXCwCL9cjOY6FzYIPRmlb/view",
    label: "Resume (PDF)",
  },

  // Order ahmiyat ka hai: jis par sabse zyada click hote hain wo sabse upar.
  // `external: true` wale naye tab mein khulte hain.
  channels: [
    {
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      external: false,
    },
    {
      label: "Phone",
      value: phoneDisplay,
      href: phoneHref,
      external: false,
    },
    {
      label: "Location",
      value: location,
      href: null,
      external: false,
    },
    {
      label: "GitHub",
      value: "farhaan-11",
      href: "https://github.com/farhaan-11",
      external: true,
    },
    {
      label: "LinkedIn",
      value: "in/farhan04",
      href: "https://linkedin.com/in/farhan04",
      external: true,
    },
  ],
};

export const contactForm = {
  nameLabel: "Your name",
  emailLabel: "Your email",
  messageLabel: "Message",
  messagePlaceholder: "The role, the team, the stack — one line is enough.",

  submitIdle: "Send message →",
  submitSending: "Sending…",

  success: "Message sent. You'll hear back within a day.",

  // Har galti ke liye alag line — "something went wrong" se reader ko pata
  // nahi chalta ki ab kya kare.
  errorEmpty: "Fill in your name, email and message first.",
  errorEmail: "That email address doesn't look right.",
  errorLimit:
    "That's a few messages already — write to the address above instead.",
  errorServer:
    "Couldn't send it. Write to the address above and it'll reach me.",
};
