import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { work, workIntro } from "@/content/profile";
import { container, sectionPadding } from "@/lib/layout";

/*
  Work index — homepage ka sabse bada section.

  Har entry ek row hai, card nahi. Teen ek jaise rounded cards sabse aam
  portfolio shakal hai; hairline se bani rows list jaisi padhti hain,
  aur list mein aankh upar se neeche tez chalti hai.

  Number list ke order se banta hai (pehla = 01), content file mein likha nahi hai —
  warna entry upar-neeche karne pe number galat ho jate.

  Ab is list mein jobs bhi hain. Har row ki mono line pehle sirf tareekh dikhati
  thi; ab wo "kahan · kab" dikhati hai (Rollix (Contract) · May 2025 — Aug 2025).
  Isi wajah se alag "Where I've worked" section ki zaroorat khatam ho gayi.

  ──────────────────────────────────────────────────────────────────────────
  17 Oct 2026 — chaaron rows barabar thi, ab nahi hain.

  Pehle chaaron rows ek hi shakal ki thi: title, tagline, meta, aur daayen
  62ch ka paragraph. Problem ye thi ki ZUNO 14 mahine ka kaam hai aur baaki
  teen uske barabar nahi hain — par list mein wo chaaron ek hi awaaz mein
  padhte the. Jo list sab kuch barabar dikhati hai, wo reader ko ye nahi
  batati ki pehle kya dekhna hai.

  Ab do shakal hain:

    01  LEAD ROW (ZUNO) — bada serif naam, neeche italic line (kya hai),
        uske neeche mono line (kis cheez pe bana hai), beech mein prose,
        daayen numbers ka rail, aur niche poori chaudai ka photo slot.

    02-04  INDEX ROWS — number aur naam ek hi line mein, ek line kaam ki,
        aur daayen stack ke saath link ya "Private product".

  Teen column 4/5/3 pe baantay gaye hain. Number aur naam baayen, padhne wali
  line beech mein, aur sab "data" (numbers, stack, link) daayen kinare pe —
  broadsheet newspaper bilkul yahi karte hain.
*/

/*
  Row ki chhoti mono linein. Teen jagah se zyada dohrati hain, isliye yahan
  ek baar likhi hain.

  text-label (12px, uppercase, 0.08em) jaan-boojh ke use NAHI kiya: is
  section ki mono linein lambi hain (ZUNO ke stack mein paanch cheezein),
  aur uppercase unhe itna chauda kar deta tha ki wo do line mein toot jati
  thi aur cheekhti hui lagti thi. Uppercase label wahin theek hai jahan do
  shabd hon — SectionHeading mein.
*/
const monoSmall = "font-mono text-xs tracking-[0.01em] text-ink-soft";

/*
  Wahi mono line, par row ke hover pe gehri ho jati hai.

  Sirf number aur "kahan · kab" wali line pe lagti hai — yaani jo row ki
  pehchaan hai. Stack aur caption hover pe waise hi rehte hain: agar row ka
  poora text ek saath gehra ho jaye to hover "yahan ho" batana band kar deta
  hai aur page bas jhilmilata hai.
*/
const monoSmallHover = `${monoSmall} transition-colors duration-300 group-hover:text-ink`;

/*
  Daayen kinare ka rail — uske upar ek hairline.

  Row ke hover pe ye hairline bhi gehri hoti hai. Isi se poori row ek cheez
  lagti hai: neeche ki border, meta line aur ye rail teeno ek saath jawab dete hain.
*/
const railTop =
  "border-line group-hover:border-ink border-t pt-3 transition-colors duration-300";

/*
  Bahar jaane wala link. Hover pe teer thoda aage sarakta hai (3px) —
  utna hi jitna "ye le jayega" kehne ke liye kaafi hai.

  Ye apna `group/link` rakhta hai, row ke `group` se alag: teer sirf tab
  sarakna chahiye jab mouse link pe ho, poori row pe nahi.
*/
function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      // -my-2 py-2: phone pe tap karne ki jagah badhane ke liye, dikhne mein
      // line apni hi jagah pe rehti hai.
      className="group/link text-accent -my-2 inline-block py-2 font-mono text-xs tracking-[0.01em] underline underline-offset-4"
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

export function WorkIndex() {
  return (
    <section id="work" className={`${container} ${sectionPadding}`}>
      <SectionHeading number="02">Selected work</SectionHeading>

      {/*
        Heading ke neeche ek line. Ye wo kaam karti hai jo rows alag-alag
        nahi kar sakti: poori list ki shakal ek nazar mein de deti hai.
        50ch pe rakhi hai — isse lambi line ek lead jaisi nahi, paragraph
        jaisi padhne lagti hai.
      */}
      <p className="text-lead mt-6 max-w-[50ch]">{workIntro}</p>

      <div data-anim-group>
        {work.map((project, index) => {
          // Pehli entry hi lead hai — wahi rule jo number pe lagta hai.
          // List ka order hi ye tay karta hai, content file mein koi flag nahi.
          const isLead = index === 0;

          // "01", "02" ... — 1 ko do ank ka banata hai.
          const number = String(index + 1).padStart(2, "0");

          return (
            <article
              key={project.title}
              data-anim="row"
              /*
                Hover pe row ka background nahi badalta, uski neeche wali
                hairline gehri hoti hai.

                Pehle `hover:bg-paper-2` tha. Us paper patch se row card
                jaisi lagne lagti thi — aur ye poora design hi cards ke
                khilaf hai. Line gehri karna wahi baat kehta hai bina row ko
                dabba banaye.
              */
              className="group border-line hover:border-ink border-b py-8 transition-colors duration-300"
            >
              <div className="md:grid md:grid-cols-12 md:gap-10">
                <div className="md:col-span-4">
                  {/*
                    Number ink-soft mein hai, accent mein nahi.

                    Pehle accent mein tha, aur wahi poore page ki sabse badi
                    accent wali galti thi: ek hi nazar mein chaar green
                    number aur do green link aa jate the. Jo rang ek screen
                    pe chhe baar aaye, wo kuch nahi kehta.

                    Accent ka poora rule globals.css mein --color-accent ke
                    saath likha hai. Is section mein uska matlab "yahan click
                    hota hai" hai, isliye green sirf link pe bacha hai.
                  */}
                  {isLead ? (
                    <span className={`${monoSmallHover} tabular-nums`}>
                      {number}
                    </span>
                  ) : (
                    // Index rows mein number aur naam ek hi line mein baithte
                    // hain. Isse row do line chhoti ho jati hai, aur chaar
                    // rows ek list jaisi padhti hain — lead row ke neeche
                    // yahi chahiye.
                    <div className="flex items-baseline gap-3.5">
                      <span className={`${monoSmallHover} tabular-nums`}>
                        {number}
                      </span>
                      <h3 className="font-heading text-index-title">
                        {project.caseStudy ? (
                          <Link
                            href={project.caseStudy}
                            className="group-hover:text-accent transition-colors"
                          >
                            {project.title}
                          </Link>
                        ) : (
                          project.title
                        )}
                      </h3>
                    </div>
                  )}

                  {isLead && (
                    <>
                      {/*
                        Hover pe accent sirf tab jab title sach mein click
                        hota ho, yaani jab case study page ho. Warna reader
                        title pe click karta hai aur kuch nahi hota — aur
                        chhota dhoka bhi page ka bharosa girata hai.
                      */}
                      <h3 className="font-heading text-headline mt-3">
                        {project.caseStudy ? (
                          <Link
                            href={project.caseStudy}
                            className="group-hover:text-accent transition-colors"
                          >
                            {project.title}
                          </Link>
                        ) : (
                          project.title
                        )}
                      </h3>

                      {/*
                        Italic serif line — ZUNO kya hai, ek saans mein.

                        Serif italic isliye ki ye title ki hi family hai:
                        naam aur ye line ek hi awaaz mein padhte hain, jaise
                        kitaab ka naam aur uske neeche ka upsheershak. Sans
                        mein hoti to bagal wale paragraph ki pehli line lagti.

                        21px: title 44px hai aur prose 18px — beech ka size
                        dono ko jodta hai. Scale mein 21px ka step nahi hai
                        aur ye site pe ek hi jagah chahiye, isliye yahin.
                      */}
                      <p className="font-heading mt-2.5 text-[1.3125rem] leading-snug italic">
                        {project.tagline}
                      </p>

                      {/*
                        Mono line — kis cheez pe bana hai.

                        Upar wali line insaan ke liye hai, ye engineer ke
                        liye. Isi bantware se "retrieval-augmented" jaisa
                        keyword page pe bach jata hai, par human line uske
                        bojh se bhaari nahi hoti.
                      */}
                      {project.keywordLine && (
                        <p className={`${monoSmall} mt-2.5`}>
                          {project.keywordLine}
                        </p>
                      )}
                    </>
                  )}

                  {/*
                    Company aur tareekh ek hi mono line mein. Company ko alag
                    line dene se row chaar line ki ho jati aur list ghani
                    lagne lagti — aur yahan hero kaam hai, employer nahi.

                    Index rows mein ye line number ke neeche se nahi, naam ke
                    neeche se shuru hoti hai (pl-[1.75rem]) — number ki
                    column khaali rehti hai, aur isi se chaaron rows ka
                    baayan kinara ek seedhi line banta hai.
                  */}
                  <p
                    className={`${monoSmallHover} mt-2.5 ${
                      isLead ? "" : "md:pl-[1.75rem]"
                    }`}
                  >
                    {project.context} · {project.period}
                  </p>
                </div>

                {/*
                  Beech ka column — ek hi line jo kaam batati hai.

                  Lead row mein ye do vaakya ki hai aur text-lead pe, index
                  rows mein ek vaakya aur normal body size pe. Wahi hierarchy
                  jo title ke size mein hai, yahan bhi.
                */}
                <div className="mt-5 md:col-span-5 md:mt-0">
                  <p
                    className={
                      isLead ? "text-lead max-w-[46ch]" : "max-w-[52ch]"
                    }
                  >
                    {project.indexLine}
                  </p>
                </div>

                {/*
                  Daayen column. Lead row mein numbers ka rail, index rows
                  mein stack aur link.
                */}
                <div className="mt-6 md:col-span-3 md:mt-0">
                  {project.stats ? (
                    <div className="grid gap-3 md:content-start md:gap-[1.125rem]">
                      {project.stats.map((stat) => (
                        /*
                          Phone pe label aur number ek hi line ke do kinare
                          pe (flex), desktop pe number label ke neeche
                          (md:block). Ek hi markup dono shakal deta hai —
                          phone ke liye alag block likhne se do jagah
                          badalne padte.
                        */
                        <div
                          key={stat.label}
                          className={`${railTop} flex items-baseline justify-between gap-3 md:block`}
                        >
                          <span className={monoSmall}>{stat.label}</span>
                          <span className="font-heading block text-[1.5rem] leading-none md:mt-1.5 md:text-[2rem]">
                            {stat.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={railTop}>
                      {/* Stack ek hi line mein, dot se juda — list banane se jagah ziyada jati hai */}
                      <p className={`${monoSmall} leading-relaxed`}>
                        {project.stack.join(" · ")}
                      </p>

                      {/*
                        Link, ya uski jagah "Private product".

                        Pehle jahan link nahi tha wahan khaali jagah thi, aur
                        reader ke mann mein sawaal reh jata tha ki is kaam ka
                        link kyun nahi hai. Ab jawab wahin milta hai jahan
                        sawaal uthta hai — ek halki si line, ink-faint mein,
                        taaki wo stack ke barabar na padhe.
                      */}
                      {project.link && project.linkLabel ? (
                        <p className="mt-2.5">
                          <ExternalLink
                            href={project.link}
                            label={project.linkLabel}
                          />
                        </p>
                      ) : (
                        <p className="text-ink-faint mt-2.5 font-mono text-xs tracking-[0.01em]">
                          Private product
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/*
                Lead row ka photo — poori chaudai mein, teen column ke neeche.

                Yahan hone ki wajah: ZUNO ke baare mein jo bhi likha hai, wo
                sab daava hai. Ek screenshot wo daava turant sach kar deta
                hai, aur reader ko learnzuno.in kholna bhi nahi padta.

                Slot khaali ho to kuch render nahi hota aur row poori padhti
                rehti hai — isliye section ko screenshot ka intezaar nahi
                karna pada (profile.ts mein `image: null`).
              */}
              {project.image && (
                <figure className="mt-7">
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    width={project.image.width}
                    height={project.image.height}
                    // Photo container ki poori chaudai leti hai; 768px se
                    // upar container 1136px tak hi jata hai (layout.ts).
                    sizes="(min-width: 768px) 1136px, 100vw"
                    className="border-line h-auto w-full border"
                  />
                  <figcaption className={`${monoSmall} mt-2.5`}>
                    {project.image.caption}
                  </figcaption>
                </figure>
              )}

              {/*
                Lead row ke sabse neeche: baayen stack, daayen live link.

                Index rows mein ye dono daayen rail mein hain, par lead row
                ka rail numbers ne le liya hai. Neeche poori chaudai mein
                dono kinare pe rakhne se row ki ek saaf farsh ban jati hai.
              */}
              {isLead && (
                <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <p className={monoSmall}>{project.stack.join(" · ")}</p>

                  <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                    {/*
                      Case study pehle: jo reader yahan tak padh chuka hai,
                      usey aage padhna hai, app chalani nahi.
                    */}
                    {project.caseStudy && (
                      <Link
                        href={project.caseStudy}
                        className="text-accent -my-2 inline-block py-2 font-mono text-xs tracking-[0.01em] underline underline-offset-4"
                      >
                        Read the case study →
                      </Link>
                    )}

                    {project.link && project.linkLabel && (
                      <ExternalLink
                        href={project.link}
                        label={project.linkLabel}
                      />
                    )}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
