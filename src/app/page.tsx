import { SiteHeader } from "@/components/layout/SiteHeader";
import { About } from "@/components/sections/About";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { Hero } from "@/components/sections/Hero";
import { Stack } from "@/components/sections/Stack";
import { WorkIndex } from "@/components/sections/WorkIndex";
import { SiteMotion } from "@/components/ui/SiteMotion";

// Section ka order hi page ki kahani hai:
// daava (hero) → banda kaun hai (about) → kaam → tools → email
//
// "Where I've worked" wala alag section hata diya gaya hai. Usme teen rows thi,
// jinme se do (ZUNO, Gautam Solar) upar work index mein pehle se thi — isliye
// wo dohraav padhta tha, aur Rollix jo sirf wahan tha, bina kisi jaankari ke
// pada rehta tha. Ab chaaron kaam ek hi index mein hain, har row apni mono
// line mein khud batati hai ki wo job thi ya apna kaam.
//
// About sabse neeche nahi, Hero ke turant baad hai. Hero ek daava karta hai,
// aur reader ka agla sawaal product ka nahi hota — "ye banaya kisne" hota hai.
// Neeche pada About zyadatar log padhte hi nahi.

/*
  ─────────────────────────────────────────────────────────────
  ASK PANEL ABHI BAND HAI — 16 Oct 2026
  ─────────────────────────────────────────────────────────────

  Kuch bhi delete nahi hua. Panel ka poora code jahan tha wahin hai:

    src/components/sections/AskPanel.tsx   — panel ka UI
    src/app/api/ask/route.ts               — API (usme bhi ek band-switch hai)
    src/lib/ask-knowledge.ts               — system prompt + knowledge base
    src/lib/ask-fallback.ts                — pehle se likha jawab dhoondhna
    src/lib/ask-limits.ts                  — rate limit, daily cap, cache
    src/content/ask.ts                     — panel ke words + pehle se likhe jawab

  Kyun band kiya:

  Live jawab ek khula kharcha hai aur uski suraksha abhi poori nahi hai —
  /api/ask pe koi origin check nahi hai (curl se seedha hit ho jata hai), aur
  150 live jawab/din ka cap memory mein hai, jo serverless pe har restart pe
  reset ho jata hai. Portfolio live karne ke liye panel zaroori nahi hai.
  Aadhi suraksha wala panel live karne se behtar hai ki wo abhi band rahe.

  WAPAS CHALU KARNE KE LIYE — do jagah, do line:

    1. is file mein: neeche ka `AskPanel` import aur <AskPanel /> uncomment karo
    2. src/app/api/ask/route.ts mein: `ASK_PANEL_BAND` ko false kar do

  Panel ki jagah bhi yaad rakhni hai — wo <Stack /> ke BAAD aur ContactFooter
  se PEHLE tha. Pehle rakhne se wo ek gimmick lagta: reader ko pehle padhne
  do, phir sawaal poochhne ka mann hota hai.

  Ek cheez jo wapas laate waqt dekhni hogi: panel ki SectionHeading "04" thi,
  aur abhi page pe 01-02-03 hi hain (About, Selected work, Stack). Panel wapas
  Stack ke baad aayega to 04 apne aap sahi baith jayega — order na badla jaye.
*/
// import { AskPanel } from "@/components/sections/AskPanel";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main>
        <Hero />
        <About />
        <WorkIndex />
        <Stack />
        {/* <AskPanel /> — band hai, upar wala comment padho */}
      </main>

      <ContactFooter />

      {/* Kuch dikhata nahi — Lenis aur saari scroll animation yahin se chalti hai */}
      <SiteMotion />
    </>
  );
}
