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
