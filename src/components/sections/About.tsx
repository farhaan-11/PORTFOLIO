import { SectionHeading } from "@/components/ui/SectionHeading";
import { about } from "@/content/profile";
import { container, sectionPadding } from "@/lib/layout";

const labelClass =
  "font-mono leading-none tracking-[0.08em] uppercase text-ink-soft";

/*
  Background — ek jagah jahan reader kaam ko nahi, bande ko sunta hai.

  Do column: `story` padha jata hai (bada size, baayen), `side` jaana jata hai
  (chhota, daayen). `closing` dono ke NEECHE poori chaudai pe hai, kyunki wo
  jaankari nahi, section ki maang hai. (DECISIONS.md section 7)
*/
export function About() {
  return (
    <section id="about" className={`${container} ${sectionPadding}`}>
      <SectionHeading number="01">Background</SectionHeading>

      {/* data-anim-beat: ek trigger, do kadam — lead pehle, baaki 0.18s baad */}
      <div data-anim-beat>
        {/*
          30rem, 62ch nahi: 26px pe 62ch ki line 900px ki ho jati hai, aur ye
          vaakya ek nazar mein padhne wala hona chahiye.
        */}
        <p
          data-beat="lead"
          className="text-statement mt-7 max-w-[30rem] md:mt-9"
        >
          {about.lede}
        </p>

        {/*
          40rem story ka measure hai aur 19rem side ka. justify-between beech
          ki bachi jagah baant deta hai, isliye side hamesha daayen kinare pe
          baithti hai — chahe screen 1280 ho ya 1920.
        */}
        <div className="mt-9 md:mt-12 md:grid md:grid-cols-[minmax(0,40rem)_19rem] md:justify-between md:gap-16">
          <div data-beat="rest" className="grid content-start gap-5 md:gap-7">
            {about.story.map((block) => (
              <div
                key={block.label}
                className="border-line border-t pt-4 md:pt-[1.125rem]"
              >
                <p className={`${labelClass} md:text-label mb-2.5 text-[11px]`}>
                  {block.label}
                </p>

                <p className="text-[1.0625rem] leading-[1.52] md:text-[1.125rem] md:leading-[1.6]">
                  {block.text}
                </p>
              </div>
            ))}
          </div>

          {/*
            Phone pe hairline poore group ke upar (border-t yahan), desktop pe
            har block ke upar (border-t neeche, md: pe). Isi ek farak se phone
            ka "do awaaz" wala rhythm banta hai.
          */}
          <div
            data-beat="rest"
            className="border-line mt-7 grid content-start gap-3.5 border-t pt-[1.125rem] md:mt-0 md:gap-6 md:border-t-0 md:pt-0"
          >
            {about.side.map((block) => (
              <div
                key={block.label}
                className="md:border-line md:border-t md:pt-[1.125rem]"
              >
                <p
                  className={`${labelClass} md:text-label mb-1.5 text-[10px] md:mb-2.5`}
                >
                  {block.label}
                </p>

                <p className="text-ink-soft text-[0.9375rem] leading-[1.45] md:text-[1rem] md:leading-[1.55]">
                  {block.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/*
          Poore page pe ye akela center-aligned hissa hai. Center tabhi kaam
          karta hai jab wo ek hi baar aaye aur chhota ho — yahan wo "ab yahan
          ruko" ka kaam karta hai aur Contact tak raasta deta hai.
        */}
        <div
          data-beat="rest"
          className="border-line mt-10 border-t pt-7 text-center md:mt-14 md:pt-9"
        >
          {/*
            Teeno cheez ek hi line mein: label, baat, link — isi tarteeb se.
            flex-wrap isliye ki phone pe ye ek line mein aa hi nahi sakti.

            items-baseline, items-center nahi: teeno ka font size alag hai
            (12px mono, 17px sans, 12px mono) aur center karne pe chhote label
            thode uthe hue dikhte hain.
          */}
          <div className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-3">
            <p className={`${labelClass} md:text-label text-[10px]`}>
              {about.closing.label}
            </p>

            {/* 17px, 18px nahi — 18px pe poori line container se nikal ke wrap
                ho jati thi, aur ek hi line mein rakhne ka matlab khatam. */}
            <p className="max-w-[46ch] text-[1.0625rem] leading-[1.5] font-medium md:max-w-none md:leading-[1.55]">
              {about.closing.text}
            </p>

            <a
              href={about.closing.href}
              className="group text-accent md:text-label inline-flex items-center gap-1.5 font-mono text-[11px] leading-none tracking-[0.08em] whitespace-nowrap uppercase"
            >
              <span className="underline-offset-4 group-hover:underline">
                {about.closing.linkLabel}
              </span>

              {/* Hover pe sirf teer sarakta hai — ek hi harkat, isliye dikhti hai */}
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                &rarr;
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
