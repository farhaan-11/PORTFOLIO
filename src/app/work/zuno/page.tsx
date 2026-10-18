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
import { SiteMotion } from "@/components/ui/SiteMotion";
import { container } from "@/lib/layout";

// Title sirf "ZUNO" hai — layout.tsx ka template isme "· Farhan Ansari" jod deta hai.
export const metadata: Metadata = {
  title: "ZUNO",
  description:
    "How ZUNO answers Class 10 Science questions from 16 indexed chapters — and refuses by name when the answer isn't in them.",
  alternates: {
    canonical: "/work/zuno",
  },
};

/*
  Section ka order: kya hai → kya mushkil tha → kaise kaam karta hai →
  chaar mushkil faisle → kya badalta → kaisa dikhta hai.

  `nested` SiteHeader ko batata hai ki ye andar ka page hai — wordmark wapas
  jaane wala link ban jata hai aur section ke link `/` se shuru hote hain.
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

        <div className={`${container} pb-20 md:pb-28`}>
          <Link
            href="/#work"
            className="text-label text-ink-soft hover:text-accent border-line inline-block border-t pt-8 font-mono uppercase transition-colors"
          >
            ← All work
          </Link>
        </div>
      </main>

      <ContactFooter />

      <SiteMotion />
    </>
  );
}
