import Image from "next/image";
import { screenshots } from "@/content/zuno";
import { container, sectionPadding } from "@/lib/layout";

/*
  Teen screenshots. Teesra ("Refusal") sabse zaroori hai — wo poore page
  ke daave ka saboot hai, isliye teeno ek hi size mein hain, ek ke neeche ek.

  Jab tak content file mein src null hai, yahan ek khaali frame aur caption
  dikhta hai. Isse do fayde hain: page aaj bhi poora padha ja sakta hai, aur
  toota hua image icon kabhi nahi dikhta (wo sabse sasta failure hai).

  object-contain isliye ki screenshot ka asli aspect ratio pata nahi hai —
  cover use karne se phone ka tall screenshot kinare se kat jata.
*/
export function CaseStudyScreenshots() {
  return (
    <section className={`${container} ${sectionPadding}`}>
      <h2 className="text-label text-ink-soft font-mono uppercase">
        What it looks like
      </h2>

      <div className="mt-8 space-y-12">
        {screenshots.map((shot) => (
          <figure key={shot.label} data-reveal>
            <p className="text-label text-accent font-mono uppercase">
              {shot.label}
            </p>

            <div className="border-line bg-paper-2 relative mt-4 aspect-[16/10] border">
              {shot.src ? (
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  /*
                    Ye container ki asli width batata hai, taaki Next sahi
                    size ki image bheje. Pehle yahan 896px likha tha — wo
                    purane max-w-5xl container ka naap tha. Container 1216px
                    ka ho chuka hai, isliye desktop pe chhoti image aa rahi
                    thi aur screenshot dhundhla dikhta tha.

                    Hisaab: 1216 container - 80 padding = 1136 content.
                    Usse chhoti screen pe padding 80 (md) ya 48 (phone).
                  */
                  sizes="(min-width: 1216px) 1136px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 48px)"
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
