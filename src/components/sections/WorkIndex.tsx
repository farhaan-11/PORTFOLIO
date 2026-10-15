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

  Ab is list mein jobs bhi hain. Har row ki mono line pehle sirf tareekh dikhati
  thi; ab wo "kahan · kab" dikhati hai (ROLLIX (CONTRACT) · MAY 2025 — AUG 2025).
  Isi wajah se alag "Where I've worked" section ki zaroorat khatam ho gayi.
*/
export function WorkIndex() {
  return (
    <section id="work" className={`${container} ${sectionPadding}`}>
      <h2 className="text-label text-ink-soft font-mono uppercase">
        Selected work
      </h2>

      {/* Ye line khud khinchti hai (SiteMotion), isliye border ki jagah asli element hai */}
      <span data-rule className="bg-line mt-8 block h-px" />

      <div data-anim-group>
        {work.map((project, index) => (
          <article
            key={project.title}
            data-anim="row"
            className="group border-line hover:bg-paper-2 border-b py-8 transition-colors md:-mx-5 md:grid md:grid-cols-12 md:gap-10 md:px-5"
          >
            <div className="md:col-span-4">
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
                  index === 0 ? "text-3xl" : "text-title",
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

              <p className="text-ink-soft mt-1">{project.tagline}</p>

              {/*
                Company aur tareekh ek hi mono line mein. Company ko alag line
                dene se row chaar line ki ho jati aur list ghani lagne lagti —
                aur yahan hero kaam hai, employer nahi.
              */}
              <p className="text-label text-ink-soft mt-2 font-mono uppercase">
                {project.context} · {project.period}
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
                    className="text-label text-accent font-mono underline underline-offset-4"
                  >
                    Read the case study →
                  </Link>
                )}

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-label text-accent font-mono underline underline-offset-4"
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
