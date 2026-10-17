import { SectionHeading } from "@/components/ui/SectionHeading";
import { about } from "@/content/profile";
import { container, sectionPadding } from "@/lib/layout";


const labelBase = "font-mono leading-none tracking-[0.08em] uppercase text-ink-soft";

export function About() {
  return (
    <section id="about" className={`${container} ${sectionPadding}`}>
     
      <SectionHeading number="01">Background</SectionHeading>

      <div data-anim-beat>
        {/*
          Lede ki max-width 30rem hai, 62ch nahi: 26px pe 62ch ki line 900px ki
          ho jati hai aur ye vaakya ek nazar mein padhne wala hona chahiye,
          paragraph ki tarah nahi.
        */}
        <p data-beat="lead" className="text-statement mt-7 max-w-[30rem] md:mt-9">
          {about.lede}
        </p>

        {/*
          40rem (640px) story ka measure hai aur 19rem (304px) side ka.
          justify-between dono ke beech ki bachi hui jagah baant deta hai, isliye
          side hamesha daayen kinare pe baithti hai — chahe screen 1280 ho ya 1920.
        */}
        <div className="mt-9 md:mt-12 md:grid md:grid-cols-[minmax(0,40rem)_19rem] md:justify-between md:gap-16">
          <div data-beat="rest" className="grid content-start gap-5 md:gap-7">
            {about.story.map((block) => (
              <div
                key={block.label}
                className="border-line border-t pt-4 md:pt-[1.125rem]"
              >
                <p className={`${labelBase} mb-2.5 text-[11px] md:text-label`}>
                  {block.label}
                </p>

                <p className="text-[1.0625rem] leading-[1.52] md:text-[1.125rem] md:leading-[1.6]">
                  {block.text}
                </p>
              </div>
            ))}
          </div>

          {/*
            Phone pe hairline poore group ke upar hai (border-t yahan), desktop pe
            har block ke upar (border-t neeche, md: pe). Isi ek farak se phone ka
            "do awaaz" wala rhythm banta hai.
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
                  className={`${labelBase} mb-1.5 text-[10px] md:mb-2.5 md:text-label`}
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
          max-w-[46ch] text ko do saaf line mein todta hai. Iske bina ek
          center-aligned line 1136px lambi ho jati hai, aur center ka poora
          fayda khatam — aankh ko har line ke shuru mein naya point dhoondhna
          padta hai.
        */}
        <div
          data-beat="rest"
          className="border-line mt-10 border-t pt-7 text-center md:mt-14 md:pt-9"
        >
          {/*
            Teeno cheez ek hi line mein: label, baat, aur link — isi tarteeb se.
            flex-wrap isliye hai ki phone pe ek line mein ye aa hi nahi sakti;
            wahan ye apne aap teen line ban jati hai aur center rehti hai.

            items-baseline, items-center nahi: teeno ka font size alag hai
            (12px mono, 17px sans, 12px mono) aur center karne pe chhote
            label thode uthe hue dikhte hain. Baseline pe teeno ek hi
            zameen pe baithte hain.

            Desktop pe text 17px hai, 18px nahi — 18px pe poori line 1136px
            se nikal jati thi aur wrap ho jati, jo iss badlav ka poora matlab
            hi khatam kar deti.
          */}
          <div className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-3">
            <p className={`${labelBase} text-[10px] md:text-label`}>
              {about.closing.label}
            </p>

            <p className="max-w-[46ch] text-[1.0625rem] leading-[1.5] font-medium md:max-w-none md:leading-[1.55]">
              {about.closing.text}
            </p>

            {/*
              Teer hover pe thoda aage sarakta hai. Ye ek hi harkat hai, isliye
              dikhti hai — do-teen cheezein ek saath hilein to kuch nahi dikhta.
            */}
            <a
              href={about.closing.href}
              className="group text-accent inline-flex items-center gap-1.5 font-mono text-[11px] leading-none tracking-[0.08em] whitespace-nowrap uppercase md:text-label"
            >
              <span className="underline-offset-4 group-hover:underline">
                {about.closing.linkLabel}
              </span>

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
