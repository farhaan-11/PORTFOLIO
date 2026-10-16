import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { work } from "@/content/profile";
import { container, sectionPadding } from "@/lib/layout";

/*
  Work index — homepage ka sabse bada section.

  Har entry ek row hai, card nahi. Teen ek jaise rounded cards sabse aam
  portfolio shakal hai; hairline se bani rows list jaisi padhti hain,
  aur list mein aankh upar se neeche tez chalti hai.

  Number list ke order se banta hai (pehla = 01), content file mein likha nahi hai —
  warna entry upar-neeche karne pe number galat ho jate.

  Ab is list mein jobs bhi hain. Har row ki mono line pehle sirf tareekh dikhati
  thi; ab wo "kahan · kab" dikhati hai (ROLLIX (CONTRACT) · MAY 2025 — AUG 2025).
  Isi wajah se alag "Where I've worked" section ki zaroorat khatam ho gayi.
*/
export function WorkIndex() {
  return (
    <section id="work" className={`${container} ${sectionPadding}`}>
      <SectionHeading number="02">Selected work</SectionHeading>

      <div data-anim-group>
        {work.map((project, index) => (
          // py-10 se py-8: row ka gap 80px se 64px.
          //
          // Ye row ko ghana karne ke liye nahi hai — section ke gap se farak
          // banane ke liye hai. Section gap 160px hai, to 64px row gap ke
          // saamne wo 2.5x bada padta hai, aur aankh ko saaf pata chalta hai
          // ki kahan ek list khatam hui aur kahan naya hissa shuru. 80px pe
          // wo farak sirf 1.6x tha, aur seema dikhti hi nahi thi.
          //
          // Ek aur fayda: kasi hui rows zyada "list" lagti hain, aur isi se
          // page "Index" jaisa padhta hai — jo is design ka naam hai.
          //
          // py-8 hi farsh hai. Isse neeche jaane pe daayen column ka 62ch
          // wala description block upar-neeche se chipakne lagta hai.
          <article
            key={project.title}
            data-anim="row"
            className="group border-line hover:bg-paper-2 border-b py-8 transition-colors md:-mx-5 md:grid md:grid-cols-12 md:gap-10 md:px-5"
          >
            <div className="md:col-span-5">
              <span className="text-label text-accent font-mono">
                {/* 1 ko "01" banata hai */}
                {String(index + 1).padStart(2, "0")}
              </span>

              {/*
                Pehli entry (ZUNO) ka title thoda bada hai. Ye 14 mahine ka kaam
                hai aur page ka sabse bada daava — baaki dono uske barabar nahi hain.
              */}
              {/*
                Hover pe accent sirf tab jab title sach mein click hota ho,
                yaani jab case study page ho. Warna reader title pe click
                karta hai aur kuch nahi hota — aur chhota dhoka bhi page ka
                bharosa girata hai.
              */}
              <h3
                className={[
                  "font-heading mt-3",
                  // Pehli entry ka title thoda bada: ye page ka sabse bada daava hai.
                  index === 0 ? "text-headline" : "text-title",
                  project.caseStudy
                    ? "group-hover:text-accent transition-colors"
                    : "",
                ].join(" ")}
              >
                {project.caseStudy ? (
                  <Link href={project.caseStudy}>{project.title}</Link>
                ) : (
                  project.title
                )}
              </h3>

              <p className="text-ink-soft mt-2 text-[1.0625rem]">
                {project.tagline}
              </p>

              {/*
                Company aur tareekh ek hi mono line mein. Company ko alag line
                dene se row chaar line ki ho jati aur list ghani lagne lagti —
                aur yahan hero kaam hai, employer nahi.
              */}
              <p className="text-label text-ink-soft mt-2 font-mono uppercase">
                {project.context} · {project.period}
              </p>
            </div>

            <div className="mt-6 md:col-span-7 md:mt-0">
              <p className="max-w-[62ch]">{project.description}</p>

              {/* Stack ek hi line mein, dot se juda — list banane se jagah ziyada jati hai */}
              <p className="text-label text-ink-soft mt-5 font-mono uppercase">
                {project.stack.join(" · ")}
              </p>

              {/*
                Do tarah ke link: case study (site ke andar) aur live site (bahar).
                Case study pehle hai — jo reader is row tak padh chuka hai,
                usey aage padhna hai, app chalani nahi.

                Gautam Solar internal product hai, uska live link null hai.
              */}
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                {project.caseStudy && (
                  <Link
                    href={project.caseStudy}
                    className="text-label text-accent -my-2 inline-block py-2 font-mono underline underline-offset-4"
                  >
                    Read the case study →
                  </Link>
                )}

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-label text-accent -my-2 inline-block py-2 font-mono underline underline-offset-4"
                  >
                    {project.linkLabel} ↗
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
