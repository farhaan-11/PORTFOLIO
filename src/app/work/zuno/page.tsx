import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudyConstraints } from "@/components/case-study/CaseStudyConstraints";
import { CaseStudyDecisions } from "@/components/case-study/CaseStudyDecisions";
import { CaseStudyIntro } from "@/components/case-study/CaseStudyIntro";
import { CaseStudyNextTime } from "@/components/case-study/CaseStudyNextTime";
import { CaseStudyPipeline } from "@/components/case-study/CaseStudyPipeline";
import { CaseStudyScreenshots } from "@/components/case-study/CaseStudyScreenshots";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { container } from "@/lib/layout";

// Root layout ka template isey "ZUNO · Farhan Ansari" bana deta hai.
export const metadata: Metadata = {
  title: "ZUNO",
  description:
    "How ZUNO answers Class 10 Science questions from 16 indexed chapters — and refuses by name when the answer isn't in them.",
};

/*
  /work/zuno — wo page jo senior engineer interview se pehle padhega.

  Section ka order hi is page ki dalil hai:
  kya banaya → kya mushkil tha → system kaise kaam karta hai →
  chaar faisle → kya abhi toota hua hai → kaisa dikhta hai

  "Kya toota hua hai" screenshots se pehle hai, jaan-boojh ke. Screenshot
  dekhne ke baad reader page chhod deta hai, aur ye page ka sabse imaandaar
  hissa hai — isey aakhir mein chhupana nahi hai.
*/
export default function ZunoCaseStudy() {
  return (
    <>
      <SiteHeader nested />

      <main>
        <CaseStudyIntro />
        <CaseStudyConstraints />
        <CaseStudyPipeline />
        <CaseStudyDecisions />
        <CaseStudyNextTime />
        <CaseStudyScreenshots />

        {/*
          Page ke aakhir mein wapas jaane ka raasta. Header ka back link
          sabse upar hai, aur yahan tak padhne ke baad reader scroll
          karke upar nahi jaana chahta.
        */}
        <div className={`${container} pb-20 md:pb-28`}>
          <Link
            href="/#work"
            className="text-label text-ink-soft hover:text-cobalt border-line inline-block border-t pt-8 font-mono uppercase transition-colors"
          >
            ← All work
          </Link>
        </div>
      </main>

      <ContactFooter />

      {/* Kuch dikhata nahi — sirf scroll pe fade-up chalu karta hai */}
      <ScrollReveal />
    </>
  );
}
