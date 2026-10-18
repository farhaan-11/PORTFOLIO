import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { WorkEntry } from "@/content/profile";
import { work, workIntro } from "@/content/profile";
import { container, sectionPadding } from "@/lib/layout";

/*
  Homepage ka sabse bada section. Har entry ek row hai, card nahi.

  Do shakal hain, aur yahi is section ka poora matlab hai:

    01     LEAD ROW (ZUNO) — bada serif naam, italic line, mono keyword line,
           beech mein prose, daayen numbers ka rail, neeche poori chaudai ka photo
    02-04  INDEX ROWS — number aur naam ek hi line mein, ek line kaam ki,
           daayen stack ke saath link ya "Private product"

  Baaki saare faisle DECISIONS.md section 8 mein hain.
*/

/*
  Row ki chhoti mono linein.

  text-label (uppercase) jaan-boojh ke use NAHI kiya: is section ki mono
  linein lambi hain (ZUNO ke stack mein paanch cheezein), aur uppercase unhe
  itna chauda kar deta tha ki wo do line mein toot jati thi.
*/
const metaLine = "font-mono text-xs tracking-[0.01em] text-ink-soft";

/*
  Wahi line, par row ke hover pe gehri ho jati hai. Sirf number aur
  "kahan · kab" pe lagti hai — yaani jo row ki pehchaan hai. Poora text ek
  saath gehra ho jaye to hover "yahan ho" batana band kar deta hai aur page
  bas jhilmilata hai.
*/
const metaLineWithHover = `${metaLine} transition-colors duration-300 group-hover:text-ink`;

// Daayen kinare ka rail. Hover pe iski hairline bhi gehri hoti hai, isi se
// poori row ek cheez lagti hai.
const railClass =
  "border-line group-hover:border-ink border-t pt-3 transition-colors duration-300";

const monoLinkClass =
  "-my-2 inline-block py-2 font-mono text-xs tracking-[0.01em] underline underline-offset-4";

/*
  Bahar jaane wala link. Hover pe teer 3px aage sarakta hai — utna hi jitna
  "ye le jayega" kehne ke liye kaafi hai.

  Iska apna `group/link` hai, row ke `group` se alag: teer sirf tab sarakna
  chahiye jab mouse link pe ho, poori row pe nahi.
*/
function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group/link text-accent ${monoLinkClass}`}
    >
      {label}{" "}
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-200 group-hover/link:translate-x-[3px]"
      >
        ↗
      </span>
    </a>
  );
}

// Project ka naam. Hover pe accent sirf tab jab title sach mein click hota ho
// — warna reader click karta hai aur kuch nahi hota.
function ProjectTitle({ project }: { project: WorkEntry }) {
  if (!project.caseStudy) {
    return <>{project.title}</>;
  }

  return (
    <Link
      href={project.caseStudy}
      className="group-hover:text-accent transition-colors"
    >
      {project.title}
    </Link>
  );
}

/*
  Lead row ka numbers ka rail. Numbers ko structure banana hai, prose nahi —
  prose mein number padha nahi jata, rail mein wo ek nazar mein ginti ban jata hai.

  Phone pe label aur number ek hi line ke do kinare pe (flex), desktop pe
  number label ke neeche (md:block). Ek hi markup dono shakal deta hai.
*/
function StatsRail({ stats }: { stats: { label: string; value: string }[] }) {
  return (
    <div className="grid gap-3 md:content-start md:gap-[1.125rem]">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`${railClass} flex items-baseline justify-between gap-3 md:block`}
        >
          <span className={metaLine}>{stat.label}</span>
          <span className="font-heading block text-[1.5rem] leading-none md:mt-1.5 md:text-[2rem]">
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
}

/*
  Index rows ka daayan rail: stack ki ek line, aur neeche link.

  Jahan link nahi hai wahan "Private product" likha hai. Pehle wahan khaali
  jagah thi aur reader ke mann mein sawaal reh jata tha ki link kyun nahi hai.
  ink-faint mein hai, ink-soft nahi — taaki wo stack ke barabar na padhe.
*/
function StackAndLink({ project }: { project: WorkEntry }) {
  return (
    <div className={railClass}>
      <p className={`${metaLine} leading-relaxed`}>
        {project.stack.join(" · ")}
      </p>

      {project.link && project.linkLabel ? (
        <p className="mt-2.5">
          <ExternalLink href={project.link} label={project.linkLabel} />
        </p>
      ) : (
        <p className="text-ink-faint mt-2.5 font-mono text-xs tracking-[0.01em]">
          Private product
        </p>
      )}
    </div>
  );
}

/*
  Lead row ka photo, poori chaudai mein.

  ZUNO ke baare mein jo likha hai wo sab daava hai; ek screenshot usey turant
  sach kar deta hai, aur reader ko learnzuno.in kholna bhi nahi padta.
*/
function LeadPhoto({ image }: { image: NonNullable<WorkEntry["image"]> }) {
  return (
    <figure className="mt-7">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        // 768px se upar container 1136px tak hi jata hai (layout.ts)
        sizes="(min-width: 768px) 1136px, 100vw"
        className="border-line h-auto w-full border"
      />
      <figcaption className={`${metaLine} mt-2.5`}>{image.caption}</figcaption>
    </figure>
  );
}

/*
  Lead row ki farsh: baayen stack, daayen link.

  Index rows mein ye dono daayen rail mein hain, par lead row ka rail numbers
  ne le liya hai. Case study pehle, live link baad mein: jo reader yahan tak
  padh chuka hai usey aage padhna hai, app chalani nahi.
*/
function LeadFooter({ project }: { project: WorkEntry }) {
  return (
    <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
      <p className={metaLine}>{project.stack.join(" · ")}</p>

      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
        {project.caseStudy && (
          <Link
            href={project.caseStudy}
            className={`text-accent ${monoLinkClass}`}
          >
            Read the case study →
          </Link>
        )}

        {project.link && project.linkLabel && (
          <ExternalLink href={project.link} label={project.linkLabel} />
        )}
      </div>
    </div>
  );
}

export function WorkIndex() {
  return (
    <section id="work" className={`${container} ${sectionPadding}`}>
      <SectionHeading number="02">Selected work</SectionHeading>

      {/*
        Ye wo kaam karti hai jo rows alag-alag nahi kar sakti: poori list ki
        shakal ek nazar mein de deti hai. 50ch pe rakhi hai — isse lambi line
        lead jaisi nahi, paragraph jaisi padhne lagti hai.
      */}
      <p className="text-lead mt-6 max-w-[50ch]">{workIntro}</p>

      <div data-anim-group>
        {work.map((project, index) => {
          // List ka order hi ye tay karta hai, content file mein koi flag nahi.
          const isLead = index === 0;
          const number = String(index + 1).padStart(2, "0");

          return (
            <article
              key={project.title}
              data-anim="row"
              // Hover pe background nahi badalta, neeche wali hairline gehri
              // hoti hai. Paper patch se row card jaisi lagne lagti thi.
              className="group border-line hover:border-ink border-b py-8 transition-colors duration-300"
            >
              <div className="md:grid md:grid-cols-12 md:gap-10">
                <div className="md:col-span-4">
                  {isLead ? (
                    <>
                      <span className={`${metaLineWithHover} tabular-nums`}>
                        {number}
                      </span>

                      <h3 className="font-heading text-headline mt-3">
                        <ProjectTitle project={project} />
                      </h3>

                      {/*
                        Italic serif — ZUNO kya hai, ek saans mein. Serif
                        isliye ki ye title ki hi family hai: naam aur ye line
                        ek hi awaaz mein padhte hain. 21px title (44px) aur
                        prose (18px) ko jodta hai.
                      */}
                      <p className="font-heading mt-2.5 text-[1.3125rem] leading-snug italic">
                        {project.tagline}
                      </p>

                      {/*
                        Upar wali line insaan ke liye hai, ye engineer ke liye.
                        Isi bantware se "retrieval-augmented" jaisa keyword
                        page pe bach jata hai, par human line bhaari nahi hoti.
                      */}
                      {project.keywordLine && (
                        <p className={`${metaLine} mt-2.5`}>
                          {project.keywordLine}
                        </p>
                      )}
                    </>
                  ) : (
                    // Number aur naam ek hi line mein — isse row do line
                    // chhoti ho jati hai aur chaar rows ek list jaisi padhti hain.
                    <div className="flex items-baseline gap-3.5">
                      <span className={`${metaLineWithHover} tabular-nums`}>
                        {number}
                      </span>
                      <h3 className="font-heading text-index-title">
                        <ProjectTitle project={project} />
                      </h3>
                    </div>
                  )}

                  {/*
                    Company aur tareekh ek hi line mein — company ko alag line
                    dene se row chaar line ki ho jati aur list ghani lagti.

                    Index rows mein ye line naam ke neeche se shuru hoti hai,
                    number ke neeche se nahi: number ki column khaali rehti
                    hai aur chaaron rows ka baayan kinara ek seedhi line banta hai.
                  */}
                  <p
                    className={`${metaLineWithHover} mt-2.5 ${
                      isLead ? "" : "md:pl-[1.75rem]"
                    }`}
                  >
                    {project.context} · {project.period}
                  </p>
                </div>

                {/* Lead row mein do vaakya aur text-lead pe, index rows mein
                    ek vaakya aur normal body size pe — wahi hierarchy jo
                    title ke size mein hai. */}
                <div className="mt-5 md:col-span-5 md:mt-0">
                  <p
                    className={
                      isLead ? "text-lead max-w-[46ch]" : "max-w-[52ch]"
                    }
                  >
                    {project.indexLine}
                  </p>
                </div>

                <div className="mt-6 md:col-span-3 md:mt-0">
                  {project.stats ? (
                    <StatsRail stats={project.stats} />
                  ) : (
                    <StackAndLink project={project} />
                  )}
                </div>
              </div>

              {project.image && <LeadPhoto image={project.image} />}

              {isLead && <LeadFooter project={project} />}
            </article>
          );
        })}
      </div>
    </section>
  );
}
