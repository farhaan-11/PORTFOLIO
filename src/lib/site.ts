/*
  Site ka asli URL, ek hi jagah.

  Ye teen cheezon ko chahiye: OG image ka absolute path, robots.txt, aur
  sitemap.xml. Teeno ko relative URL se kaam nahi chalta — Facebook,
  LinkedIn aur Google ko poora address chahiye hota hai.

  Teen jagah se aata hai, isi order mein:

    1. NEXT_PUBLIC_SITE_URL  — asli domain. Vercel ke dashboard mein set karna
       hai (Settings → Environment Variables). Jab apna domain lag jaye to
       sirf yahi ek value badalni hai.
    2. VERCEL_PROJECT_PRODUCTION_URL — Vercel khud deta hai (jaise
       farhan-portfolio.vercel.app). Isi wajah se pehle deploy pe bhi OG image
       aur sitemap sahi kaam karte hain, kuch set karne se pehle hi.
    3. localhost — sirf dev ke liye.
*/
function readSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  return "http://localhost:3000";
}

// Aakhir ka slash hata dete hain, taaki `${siteUrl}/work/zuno` mein kabhi
// do slash na aayein.
export const siteUrl = readSiteUrl().replace(/\/$/, "");
