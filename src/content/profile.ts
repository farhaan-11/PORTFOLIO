// Site ke saare words yahin rehte hain.
// Koi bhi line badalni ho to sirf ye file kholni hai — component files nahi.

export const hero = {
  // Headline ke upar chhoti mono label. Parichay yahan hai, headline mein nahi,
  // taaki headline sirf ek kaam kare.
  label: "Full-stack engineer",

  headline: "The model was the easy part.",

  // Headline ek daava hai. Ye line usey turant prove karti hai —
  // teen alag ilaake: retrieval, caching, traffic.
  summary:
    "On ZUNO — a Science tutor for Hindi-medium students — the real work was Hinglish queries that returned nothing, a cache that could serve wrong answers for 30 days after one outage, and a rate limiter that broke the moment a whole classroom logged in.",

  // Dono ka shape ek jaisa hai, isliye ek list hai — design inhe ek saath render karega.
  status: [
    {
      label: "Right now",
      text: "Rebuilding ZUNO's retrieval layer in Python and FastAPI.",
    },
    {
      label: "Open to",
      // "AI engineer" jaan-boojh ke nahi likha — Farhan model train ya fine-tune
      // nahi karta, aur hero mein jo jhooth hai wahi interview ka pehla sawaal banta hai.
      text: "Full-stack roles where AI is part of the product.",
    },
  ],
};

// Hero ke neeche ki metric strip. Chaar numbers, teen alag projects se.
// Har number ke saath project ka naam zaroori hai — warna reader maan lega
// ki sab ek hi project ke hain, aur phir teeno claims kamzor ho jate hain.
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

// Work index — homepage ka sabse bada section.
// List ka order hi number banta hai (pehla = 01), isliye number yahan store nahi kiya.
export const work = [
  {
    title: "ZUNO",
    tagline: "AI tutor for Hindi-medium students",
    period: "Aug 2025 — present",
    // Link check kiya gaya: 200 in ~0.4s, backend health bhi jaga hua.
    // Dobara dawa karne se pehle phir se check karna — Render free tier sleep karta hai.
    link: "https://learnzuno.in",
    linkLabel: "learnzuno.in",
    // Paanch hi cheezein. Lambi stack line padhi nahi jati —
    // har ek yahan alag parat dikhati hai: frontend, backend, AI, database, deploy.
    stack: [
      "React",
      "Node.js",
      "LangChain.js",
      "MongoDB Atlas Vector Search",
      "AWS EC2",
    ],
    // Ek hi hook, teen nahi. Hero ne jo teen problems ginayi hain unhe yahan
    // dobara nahi likha — warna page repeat lagta hai.
    description:
      "A study tutor for Bihar Board Class 10 Science, built for students who think in Hindi but whose textbook is in English. It answers only from 16 indexed chapters — and when the answer isn't in them, it says so instead of inventing one.",
  },
  {
    title: "Logistics platform",
    tagline: "Gautam Solar",
    period: "Jul 2024 — May 2025",
    // Internal company product hai, public link nahi hai. Isliye description ko
    // thoda zyada kaam karna padta hai — reader khud jaake dekh nahi sakta.
    link: null,
    linkLabel: null,
    stack: ["React", "Node.js", "MySQL", "JWT + RBAC"],
    // Ismein 200+ users aur 25+ modules jaan-boojh ke nahi likhe —
    // dono pehle se metric strip mein hain, isi page pe thoda upar.
    description:
      "Replaced a paper-based dispatch process for a solar manufacturer. Live GPS tracking with route-deviation alerts, and three role-based dashboards where each role only ever sees its own rows.",
  },
  {
    title: "RentalWave",
    tagline: "Rental & PG marketplace",
    period: "May 2024 — present",
    // Frontend Vercel pe, backend Render pe. Link check kiya: 200 in ~0.8s.
    // Backend so jaye to page khulega par search chalega nahi — dawa karne se
    // pehle sirf page nahi, ek asli search bhi check karna.
    link: "https://rental-wave.vercel.app",
    linkLabel: "rental-wave.vercel.app",
    stack: ["React", "Node.js", "MongoDB", "Redis"],
    // "40% faster" yahan nahi — wo metric strip mein hai.
    description:
      "A marketplace for rentals and PG listings. Its search folds six or more optional filters into a single MongoDB query, instead of a chain of conditionals that grows every time a filter is added.",
  },
];

// Experience — ek ledger, showcase nahi.
// Section ka heading "Where I've worked" rahega, "Experience" nahi — kyunki
// "Selected work" aur "Experience" sunne mein ek jaise lagte hain.
//
// Yahan KABHI description ya bullet add nahi karni. Work section prose hai,
// ye sirf role-company-tareekh hai. Dono ki shakal alag rehni chahiye —
// wahi ek cheez hai jo inhe repeat lagne se bachati hai.
export const experience = [
  {
    role: "Independent Developer",
    company: "ZUNO",
    period: "Aug 2025 — present",
  },
  {
    role: "Full Stack Developer",
    // "(Contract)" rakha hai kyunki ye 3 mahine ka tenure bina kuch likhe
    // samjha deta hai — warna job-hopping jaisa dikhta.
    company: "Rollix (Contract)",
    period: "May 2025 — Aug 2025",
  },
  {
    role: "Full Stack Developer",
    company: "Gautam Solar",
    period: "Jul 2024 — May 2025",
  },
];

// Stack — jaan-boojh ke chhoti list hai (~26 cheezein, resume mein ~45 hain).
// Lamba stack list junior ka signal hai: jo cheez har developer ke paas hai
// (HTML5, CSS3, Git, Postman) usse tum alag nahi dikhte, bas list bhaari hoti hai.
// Kuch bhi add karne se pehle poochho: "kya iska na hona chaunkane wali baat hoti?"
// Agar nahi, to woh is list mein nahi aata.
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
      "Prompt engineering",
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
      "GitHub Actions",
      "Vercel",
      "Render",
    ],
  },
  {
    // Alag group isliye ki inhe baaki ke barabar rakhna jhooth hota —
    // ye abhi seekhe ja rahe hain. Imaandari yahan kamzori nahi dikhti;
    // ye dikhata hai ki Farhan apni seema jaanta hai, aur ruka nahi hai.
    // Jab ZUNO ka Python version chal jaye, tab inhe Languages/Backend mein le jaana.
    group: "Learning now",
    items: ["Python", "FastAPI"],
  },
];

// About — poore page ki ek jagah jahan reader Farhan ko sunta hai, uske kaam ko nahi.
// Isme koi tareekh ya "last month" nahi likhna — content purana pad jata hai
// aur usey update karne koi wapas nahi aata.
export const about = [
  "I didn't study computer science. My degrees are in electronics — I learned to build software by building things people had no choice but to use: a dispatch floor that ran on paper until it didn't, a wallet that moved real money, and ZUNO.",

  // Ye line page ki sabse mazboot line hai, aur isko koi copy nahi kar sakta —
  // Farhan khud Hindi-medium se hai. Isko kabhi general mat banana
  // ("most tools ignore this gap" jaisa) — tabhi ye asar karti hai jab zaati ho.
  "ZUNO is for students who read their textbook in English and think in Hindi. I know that gap because I studied that way too.",

  // Ye skill nahi, aadat hai — aur hiring manager skill se zyada aadat pe daav lagata hai.
  // Saboot: ZUNO repo ki ZUNO_VERIFIED_FACTS.md.
  "One habit I'd bring to a team: I check my own claims before I make them. I audited ZUNO against its own code and removed nine things from my resume that I couldn't prove.",
];
