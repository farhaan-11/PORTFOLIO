import Link from "next/link";
import { work } from "@/content/profile";
import { container, sectionPadding } from "@/lib/layout";

/*
  Work index — homepage ka sabse bada section.

  Har entry ek row hai, card nahi. Teen ek jaise rounded cards sabse aam
  portfolio shakal hai; hairline se bani rows list jaisi padhti hain,
  aur list mein aankh upar se neeche tez chalti hai.

  Number list ke order se banta hai (pehla = 01), content file mein likha nahi hai —
  warna entry upar-neeche karne pe number galat ho jate.
*/
export function WorkIndex() {
  return (
    <section id="work" className={`${container} ${sectionPadding}`}>
      <h2 className="text-label text-ink-soft font-mono uppercase">
        Selected work
      </h2>

      <div className="border-line mt-10 border-t">
        {work.map((project, index) => (
          <article
            key={project.title}
            data-reveal
            className="group border-line border-b py-10 md:grid md:grid-cols-12 md:gap-10"
          >
            <div className="md:col-span-4">
              <span className="text-label text-cobalt font-mono">
                {/* 1 ko "01" banata hai */}
                {String(index + 1).padStart(2, "0")}
              </span>

              {/*
                Pehli entry (ZUNO) ka title thoda bada hai. Ye 14 mahine ka kaam
                hai aur page ka sabse bada daava — baaki dono uske barabar nahi hain.
              */}
              <h3
                className={
                  index === 0
                    ? "font-heading group-hover:text-cobalt mt-3 text-3xl font-semibold transition-colors"
                    : "font-heading text-title group-hover:text-cobalt mt-3 font-semibold transition-colors"
                }
              >
                {/*
                  Jiska case study page hai, uska title bhi click hota hai.
                  Title hover pe cobalt hota hai — agar wo click na hota to
                  reader ko dhoka lagta.
                */}
                {project.caseStudy ? (
                  <Link href={project.caseStudy}>{project.title}</Link>
                ) : (
                  project.title
                )}
              </h3>

              <p className="text-ink-soft mt-1">{project.tagline}</p>
              <p className="text-label text-ink-soft mt-2 font-mono uppercase">
                {project.period}
              </p>
            </div>

            <div className="mt-6 md:col-span-8 md:mt-0">
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
                    className="text-label text-cobalt font-mono underline underline-offset-4"
                  >
                    Read the case study →
                  </Link>
                )}

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-label text-cobalt font-mono underline underline-offset-4"
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
