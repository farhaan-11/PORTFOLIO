import { SiteHeader } from "@/components/layout/SiteHeader";
import { About } from "@/components/sections/About";
import { AskPanel } from "@/components/sections/AskPanel";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Stack } from "@/components/sections/Stack";
import { WorkIndex } from "@/components/sections/WorkIndex";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// Section ka order hi page ki kahani hai:
// daava (hero) → banda kaun hai (about) → kaam → naukri ka record → tools
// → kured lo (ask) → email
//
// About sabse neeche nahi, Hero ke turant baad hai. Hero ek daava karta hai,
// aur reader ka agla sawaal product ka nahi hota — "ye banaya kisne" hota hai.
// Neeche pada About zyadatar log padhte hi nahi.
//
// Ask panel About ke BAAD hai, Contact se pehle. Pehle rakhne se woh ek
// gimmick lagta — reader ko pehle padhne do, phir sawaal poochne ka mann hota hai.
export default function Home() {
  return (
    <>
      <SiteHeader />

      <main>
        <Hero />
        <About />
        <WorkIndex />
        <Experience />
        <Stack />
        <AskPanel />
      </main>

      <ContactFooter />

      {/* Kuch dikhata nahi — sirf scroll pe fade-up chalu karta hai */}
      <ScrollReveal />
    </>
  );
}
