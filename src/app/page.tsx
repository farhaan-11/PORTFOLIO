import { SiteHeader } from "@/components/layout/SiteHeader";
import { About } from "@/components/sections/About";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { Hero } from "@/components/sections/Hero";
import { Stack } from "@/components/sections/Stack";
import { WorkIndex } from "@/components/sections/WorkIndex";
import { SiteMotion } from "@/components/ui/SiteMotion";

/*
  Section ka order hi page ki kahani hai:
  daava (Hero) → banda kaun hai (About) → kaam (Work) → tools (Stack) → email

  About sabse neeche nahi, Hero ke turant baad hai: Hero ek daava karta hai,
  aur reader ka agla sawaal product ka nahi hota — "ye banaya kisne" hota hai.
  Neeche pada About zyadatar log padhte hi nahi.

  Ask panel band hai aur abhi use nahi kiya ja raha. Usey wapas laane ka
  tareeka DECISIONS.md section 10 mein likha hai.
*/
export default function Home() {
  return (
    <>
      <SiteHeader />

      <main>
        <Hero />
        <About />
        <WorkIndex />
        <Stack />
      </main>

      <ContactFooter />

      {/* Kuch dikhata nahi — Lenis aur saari scroll animation yahin se chalti hai */}
      <SiteMotion />
    </>
  );
}
