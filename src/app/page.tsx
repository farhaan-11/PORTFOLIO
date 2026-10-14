import { SiteHeader } from "@/components/layout/SiteHeader";
import { About } from "@/components/sections/About";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { MetricStrip } from "@/components/sections/MetricStrip";
import { Stack } from "@/components/sections/Stack";
import { WorkIndex } from "@/components/sections/WorkIndex";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// Section ka order hi page ki kahani hai:
// daava (hero) → saboot (numbers) → kaam → naukri ka record → tools → banda → email
export default function Home() {
  return (
    <>
      <SiteHeader />

      <main>
        <Hero />
        <MetricStrip />
        <WorkIndex />
        <Experience />
        <Stack />
        <About />
      </main>

      <ContactFooter />

      {/* Kuch dikhata nahi — sirf scroll pe fade-up chalu karta hai */}
      <ScrollReveal />
    </>
  );
}
