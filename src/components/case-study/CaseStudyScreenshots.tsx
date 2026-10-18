import Image from "next/image";
import { screenshots } from "@/content/zuno";
import { container, sectionPadding } from "@/lib/layout";

/*
  Teen screenshots, ek hi size mein, ek ke neeche ek. Teesra ("Refusal")
  sabse zaroori hai — wo poore page ke daave ka saboot hai.

  Jab tak content file mein src null hai, yahan ek khaali frame aur caption
  dikhta hai. Do fayde: page aaj bhi poora padha ja sakta hai, aur toota hua
  image icon kabhi nahi dikhta (wo sabse sasta failure hai).
*/
export function CaseStudyScreenshots() {
  /*
    Jab tak ek bhi screenshot nahi aaya, poora section hi nahi dikhta.

    Pehle yahan teen khaali frame "Screenshot coming" likh ke dikhte the. Wo
    ek adhoora page hone ka ailaan tha — aur page ka asli daava imaandari ka
    hai, isliye wo sabse mehnga placeholder tha. Ek bhi screenshot aate hi
    section wapas aa jata hai, aur jiska src null hai uski jagah frame dikhta
    hai (toota hua image icon kabhi nahi).
  */
  const hasAnyScreenshot = screenshots.some((shot) => shot.src !== null);

  if (!hasAnyScreenshot) {
    return null;
  }

  return (
    <section className={`${container} ${sectionPadding}`}>
      <h2 className="text-label text-ink-soft font-mono uppercase">
        What it looks like
      </h2>

      <div data-anim-group className="mt-8 space-y-12">
        {screenshots.map((shot) => (
          <figure key={shot.label} data-anim="row">
            <p className="text-label text-accent font-mono uppercase">
              {shot.label}
            </p>

            <div className="border-line bg-paper-2 relative mt-4 aspect-16/10 border">
              {shot.src ? (
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  /*
                    Container ki asli width, taaki Next sahi size ki image
                    bheje. Hisaab: 1216 container - 80 padding = 1136 content.
                    Pehle 896px likha tha (purane max-w-5xl ka naap) aur isse
                    desktop pe screenshot dhundhla dikhta tha.
                  */
                  sizes="(min-width: 1216px) 1136px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 48px)"
                  // contain, cover nahi — asli aspect ratio pata nahi hai, aur
                  // cover se phone ka tall screenshot kinare se kat jata hai.
                  className="object-contain"
                />
              ) : (
                <span className="text-label text-ink-soft absolute inset-0 flex items-center justify-center p-6 text-center font-mono uppercase">
                  Screenshot coming
                </span>
              )}
            </div>

            <figcaption className="text-ink-soft mt-4 max-w-[62ch]">
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
