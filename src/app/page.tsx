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
// daava (hero) → saboot (numbers) → kaam → naukri ka record → tools → banda
// → kured lo (ask) → email
//
// Ask panel About ke BAAD hai, Contact se pehle. Pehle rakhne se woh ek
// gimmick lagta — reader ko pehle padhne do, phir sawaal poochne ka mann hota hai.
export default function Home() {
  return (
    <>
      <SiteHeader />

      <main>
        <Hero />
        <WorkIndex />
        <Experience />
        <Stack />
        <About />
        <AskPanel />
      </main>

      <ContactFooter />

      {/* Kuch dikhata nahi — sirf scroll pe fade-up chalu karta hai */}
      <ScrollReveal />
    </>
  );
}
