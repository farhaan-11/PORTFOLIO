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
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
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

// Homepage pe ab ye numbers kahin nahi dikhte — metric strip hata di gayi hai.
// Ye list sirf Ask panel ke knowledge base ke liye bachi hai (ask-knowledge.ts).
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

// Work index — homepage ka ab ek hi bada section.
// List ka order hi number banta hai (pehla = 01), isliye number yahan store nahi kiya.
//
// Ismein ab jobs bhi hain aur ek personal project bhi. Pehle do alag section the
// (Selected work + Where I've worked) aur usme ZUNO aur Gautam Solar dono jagah
// aate the — isliye doosra section dohraav lagta tha, aur Rollix jo sirf wahan
// tha, bina kisi jaankari ke pada rehta tha. Ab ek hi list hai.
//
// `context` field usi wajah se aayi: har row khud batati hai ki ye job thi
// (company ka naam) ya apna kaam (Independent / Personal project).
export const work = [
  {
    title: "ZUNO",
    // Tagline mein "Hindi-medium students" nahi likha — wo baat hero mein
    // aur About mein pehle se hai. About wala version sabse mazboot hai
    // ("I studied that way too"), isliye wahi rehne diya aur yahan se hataya.
    tagline: "RAG study tutor, Bihar Board Class 10",
    // Company ki jagah "Independent" — ZUNO kisi employer ke liye nahi bana.
    // Ye side project nahi lagta kyunki usi row mein live link aur 14 mahine
    // ka period hai; side project ke paas ye dono nahi hote.
    context: "Independent",
    period: "Aug 2025 — present",
    // Link check kiya gaya: 200 in ~0.4s, backend health bhi jaga hua.
    // Dobara dawa karne se pehle phir se check karna — Render free tier sleep karta hai.
    link: "https://learnzuno.in",
    linkLabel: "learnzuno.in",
    // Case study ka link filhaal band hai — page `/work/zuno` par maujood hai,
    // par usey homepage se dikhana baad mein tay hoga.
    caseStudy: null,
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
    // Rollix ka kaam ek module tha, uska koi product naam nahi hai. Isliye
    // title wahi do kaam hain jo resume ke do bullets mein likhe hain —
    // naya naam gadhna resume se farak paida karta, aur interview mein wahi
    // farak sawaal ban jata hai.
    title: "Wallet and withdrawals",
    tagline: "Gaming platform, INR and USD",
    context: "Rollix (Contract)",
    period: "May 2025 — Aug 2025",
    // Private product hai — na live link, na case study.
    link: null,
    linkLabel: null,
    caseStudy: null,
    stack: ["React", "Node.js", "Razorpay"],
    // Har shabd resume se hai. "sole developer on payments" waise ka waisa
    // rakha hai — resume-decisions-log kehta hai ki kabhi sirf "sole developer"
    // nahi likhna, kyunki poore platform pe team thi.
    //
    // "real-time" jaan-boojh ke nahi hai: wo resume se unverified maan ke
    // nikala gaya tha, aur yahan wapas laane ka matlab purana jhagda wapas laana.
    description:
      "As the sole developer on payments: Razorpay checkout, a deposit API and INR/USD conversion on the backend, connected to the wallet UI. The withdrawal flow runs through multi-step admin approval with fee deduction and payout APIs, and the same status shows in both the admin and user views.",
  },
  {
    title: "Logistics platform",
    // Pehle yahan "Gautam Solar" tha. Company ab `context` mein hai, to ye
    // slot bata raha hai ki platform kiske liye tha aur kitna bada tha.
    tagline: "Solar manufacturer, sales to delivery",
    context: "Gautam Solar",
    period: "Jul 2024 — May 2025",
    // Internal company product hai, public link nahi hai. Isliye description ko
    // thoda zyada kaam karna padta hai — reader khud jaake dekh nahi sakta.
    link: null,
    linkLabel: null,
    caseStudy: null,
    stack: ["React", "Node.js", "MySQL", "JWT + RBAC"],
    // 200+ users aur 25+ modules yahan wapas aaye hain: metric strip hata di
    // gayi thi, aur uske saath ye numbers poore page se gayab ho gaye the.
    // Prose mein number strip jitna nahi chamakta, par gayab number se behtar hai.
    description:
      "Replaced a paper-based dispatch process — 25+ modules across sales, dispatch and delivery, used by 200+ people a day. Live GPS tracking with route-deviation alerts, and three role-based dashboards where each role only ever sees its own rows.",
  },
  {
    title: "RentalWave",
    tagline: "Rental & PG marketplace",
    // Ye koi job nahi thi, isliye company ki jagah saaf likha hai.
    context: "Personal project",
    // "present" sach hai — is pe dobara kaam shuru ho chuka hai (Oct 2026).
    period: "2024 — present",
    // Frontend Vercel pe, backend Render pe. Link check kiya: 200 in ~0.8s.
    // Backend so jaye to page khulega par search chalega nahi — dawa karne se
    // pehle sirf page nahi, ek asli search bhi check karna.
    link: "https://rental-wave.vercel.app",
    linkLabel: "rental-wave.vercel.app",
    caseStudy: null,
    stack: ["React", "Node.js", "MongoDB", "Redis"],
    // 40% ke saath "kaise" bhi likha hai. Akela number ek daava hai;
    // indexing/pagination/Redis ke saath wo kiya hua kaam ban jata hai.
    description:
      "A marketplace for rentals and PG listings. Its search folds six or more optional filters into a single MongoDB query instead of a chain of conditionals that grows with every new filter, and indexing, pagination and Redis caching cut the search API response time by 40%.",
  },
];

// Homepage pe ab ye rows kahin nahi dikhte — "Where I've worked" section
// hata diya gaya hai, kyunki uski teen mein se do rows upar work index mein
// pehle se thi aur teesri (Rollix) ab wahan apni poori row rakhti hai.
//
// Ye list sirf Ask panel ke knowledge base ke liye bachi hai (ask-knowledge.ts):
// koi "where has he worked" poochhe to role-company-tareekh ka saaf jawab
// milta rahe. Bilkul wahi tareeka jo upar `metrics` ke saath apnaya gaya hai.
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

// Stack — jaan-boojh ke chhoti list hai (resume mein ~45 cheezein hain, yahan aadhi).
// Lamba stack list junior ka signal hai: jo cheez har developer ke paas hai
// (HTML5, CSS3, Git, Postman, MERN) usse tum alag nahi dikhte, bas list bhaari hoti hai.
// Kuch bhi add karne se pehle poochho: "kya iska na hona chaunkane wali baat hoti?"
// Agar nahi, to woh is list mein nahi aata.
//
// Doosra sawaal, utna hi zaroori: "iska proof kahan hai?" Har naam ya to page ki
// kisi row mein hai, ya repo mein verify ho chuka hai — comments mein likha hai kahan.
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
      // WebSockets ZUNO mein nahi hai (wahan SSE hai) — ye ek alag chat
      // application se aata hai. Ye list kaam ki nahi, skill ki hai;
      // har naam ka flagship project mein hona zaroori nahi.
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
      // Gemini pehle embeddings ke liye use hua tha, phir OpenAI pe shift
      // hua — aaj ye fallback hai. Isliye dono naam yahan hain.
      //
      // "Prompt engineering" yahan se hataya gaya: wo har resume pe hai,
      // isliye kuch batata nahi. Upar ke chaar naam wahi kaam dikha dete hain.
      "Gemini",
    ],
  },
  {
    // Teeno infra claims 15 Oct 2026 ko ZUNO repo mein verify kiye gaye:
    // Nginx — frontend/nginx.conf (frontend container Nginx se serve hota hai)
    // Docker — backend/Dockerfile, frontend/Dockerfile, docker-compose.yml
    // CI/CD — .github/workflows/ci.yml + deploy-ec2.yml (main pe push → EC2 deploy)
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
// Teen paragraph, teen alag kaam: kya hoon → kya banaya → pehle kya kiya.
// Koi personal kahani nahi, koi "I care deeply about..." nahi — wo har
// portfolio mein hai, isliye wo kuch batata hi nahi.
export const about = [
  // Doosra hissa character line hai. Wo kisi se tulna nahi karta
  // ("course se nahi seekha" jaisa) — tulna karte hi reader ke dimaag mein
  // wahi shak aa jata hai jo kisi ne uthaya hi nahi tha.
  "I build full-stack applications in React and Node.js — software that has to keep running after I ship it.",

  // Python yahan hai, pehle paragraph mein nahi: Stack section Python ko
  // "Learning now" mein rakhta hai, aur ek hi page do alag baatein nahi keh sakta.
  "Since August 2025 I've been building ZUNO on my own — the retrieval pipeline, a 9-intent classifier, auth and sessions on Redis, rate limiting, and a GitHub Actions deploy to EC2. Its retrieval layer is moving to Python now.",

  // Gautam Solar aur Rollix ko apna paragraph: pehle ye ZUNO wale paragraph
  // ki poonch the aur dikhte hi nahi the.
  "Before that: logistics at Gautam Solar — dashboards for 200+ daily users, and the dispatch and delivery modules. Then Rollix, where I was the only developer on payments — Razorpay checkout, deposit API, INR/USD conversion.",
];

// Ye biography nahi hai — ye maang hai. Isliye alag rakha hai, aur component
// ise hairline ke neeche thoda bhaari font mein dikhata hai.
// Rollix ka duration jaan-boojh ke kahin nahi likha: resume "May–Aug 2025"
// kehta hai, isliye jab tak wo saaf na ho, number dena galat hoga.
export const aboutAvailability =
  "Open to full-stack and frontend roles where AI is part of the product. Based in Hyderabad.";

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
