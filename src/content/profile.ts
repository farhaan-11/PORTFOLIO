// Site ke saare words yahin rehte hain.
// Koi bhi line badalni ho to sirf ye file kholni hai — component files nahi.

// Nav bar ke words. Links page ke sections pe jump karte hain — aur ye
// sections aage ke steps mein banenge, isliye tab tak click karne pe
// kuch nahi hoga. Ye galti nahi hai, order aisa hi hai.
export const nav = {
  name: "Farhan Ansari",

  // Sirf teen link. Nav sitemap nahi, escape hatch hai — Stack aur
  // Experience beech page mein hain, wahan reader scroll karke pahunchta hai.
  links: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
};

export const hero = {
  // Headline ke upar chhoti mono label. Parichay yahan hai, headline mein nahi,
  // taaki headline sirf ek kaam kare.
  label: "Full-stack engineer",

  headline: "The model was the easy part.",

  // Headline ek daava hai. Ye line usey turant prove karti hai.
  //
  // Yahan bug stories jaan-boojh ke nahi hain. ZUNO ka sabse strong part
  // product hai: jawab sirf Bihar Board ke syllabus se aata hai, aur jo
  // us syllabus mein nahi hai uspe wo saaf mana kar deta hai — guess nahi karta.
  //
  // Subject ka naam bhi jaan-boojh ke nahi hai. Abhi sirf Science hai,
  // aage aur subject aayenge — tab ye line waisi ki waisi chalegi.
  //
  // Teen tukde isliye hain ki beech wala phrase cobalt mein highlight hota hai.
  // Ek hi string hoti to component ko usme se phrase dhoondhna padta.
  summaryStart:
    "I built ZUNO — a tutor for Bihar Board Class 10. It answers only from the board's syllabus. Anything outside it gets an honest ",
  summaryHighlight: "“that's not in your syllabus”",
  summaryEnd: " — not a guess.",
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
    // Tagline mein "Hindi-medium students" nahi likha — wo baat hero mein
    // aur About mein pehle se hai. About wala version sabse mazboot hai
    // ("I studied that way too"), isliye wahi rehne diya aur yahan se hataya.
    tagline: "RAG study tutor, Bihar Board Class 10",
    period: "Aug 2025 — present",
    // Link check kiya gaya: 200 in ~0.4s, backend health bhi jaga hua.
    // Dobara dawa karne se pehle phir se check karna — Render free tier sleep karta hai.
    link: "https://learnzuno.in",
    linkLabel: "learnzuno.in",
    // Case study page. Site ke andar ka page hai, isliye isko naye tab mein
    // nahi kholna — reader ko yahin rakhna hai.
    caseStudy: "/work/zuno",
    // Paanch hi cheezein. Lambi stack line padhi nahi jati —
    // har ek yahan alag parat dikhati hai: frontend, backend, AI, database, deploy.
    stack: [
      "React",
      "Node.js",
      "LangChain.js",
      "MongoDB Atlas Vector Search",
      "AWS EC2",
    ],
    // Yahan sirf wo baatein hain jo page pe kahin aur nahi hain.
    // Classifier wali line ZUNO ko ek system dikhati hai, sirf ek idea nahi.
    description:
      "It answers only from 16 indexed Science chapters, and says so when the answer isn't in them instead of inventing one. A 9-intent classifier decides whether a question needs the syllabus at all, so a greeting never touches vector search.",
  },
  {
    title: "Logistics platform",
    tagline: "Gautam Solar",
    period: "Jul 2024 — May 2025",
    // Internal company product hai, public link nahi hai. Isliye description ko
    // thoda zyada kaam karna padta hai — reader khud jaake dekh nahi sakta.
    link: null,
    linkLabel: null,
    // Sirf ZUNO ka case study page hai. Baaki dono ke liye ek-ek paragraph
    // kaafi hai — teen aadhe-adhoore case study se ek poora behtar hai.
    caseStudy: null,
    stack: ["React", "Node.js", "MySQL", "JWT + RBAC"],
    // Ismein 200+ users aur 25+ modules jaan-boojh ke nahi likhe —
    // dono pehle se metric strip mein hain, isi page pe thoda upar.
    description:
      "Replaced a paper-based dispatch process for a solar manufacturer. Live GPS tracking with route-deviation alerts, and three role-based dashboards where each role only ever sees its own rows.",
  },
  {
    title: "RentalWave",
    tagline: "Rental & PG marketplace",
    // Sirf saal. Pehle "May 2024 — present" tha, par ab is pe kaam nahi ho raha —
    // aur "present" likhna chhota jhooth hai jo poore page ka bharosa girata hai.
    period: "2024",
    // Frontend Vercel pe, backend Render pe. Link check kiya: 200 in ~0.8s.
    // Backend so jaye to page khulega par search chalega nahi — dawa karne se
    // pehle sirf page nahi, ek asli search bhi check karna.
    link: "https://rental-wave.vercel.app",
    linkLabel: "rental-wave.vercel.app",
    caseStudy: null,
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

// Contact — page ka aakhri section.
// Koi contact form nahi: form bharne mein mehnat lagti hai, aur recruiter
// aksar apne email se baat karna chahta hai. Email text + copy button kaafi hai.
export const contact = {
  email: "farhanraza2239@gmail.com",

  // Location sabse pehle dhoondhi jati hai. Isko chhupane se recruiter
  // maan leta hai ki kuch gadbad hai — isliye saaf likha hai.
  location: "Hyderabad, India",
  relocation: "Open to relocation",

  links: [
    { label: "GitHub", href: "https://github.com/farhaan-11" },
    { label: "LinkedIn", href: "https://linkedin.com/in/farhan04" },
    // Ye file abhi public/ mein nahi hai — Phase 3 mein daalni padegi,
    // warna link 404 dega.
    { label: "Resume (PDF)", href: "/resume.pdf" },
  ],
};
