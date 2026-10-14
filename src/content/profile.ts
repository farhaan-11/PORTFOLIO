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
];
