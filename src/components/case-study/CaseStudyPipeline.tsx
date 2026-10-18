import { exits, pipeline } from "@/content/zuno";
import { container, sectionPadding } from "@/lib/layout";

/*
  Ek turn ka poora raasta.

  Ye SVG nahi hai, jaan-boojh ke: SVG diagram phone pe ya chhota ho jata hai
  ya side mein scroll hone lagta hai, aur uska text select bhi nahi hota.
  Yahan diagram do hisson mein hai —

    1. upar ek line ka path, mono text mein, arrows ke saath (phone pe wrap)
    2. neeche 7 numbered rows, har step kya karta hai

  Do model call accent mein hain. Isse ek dekhne mein pata chal jata hai ki
  paisa kahan kharch hota hai.
*/
export function CaseStudyPipeline() {
  return (
    <section className={`${container} ${sectionPadding}`}>
      <h2 className="text-label text-ink-soft font-mono uppercase">
        One turn, end to end
      </h2>

      {/* flex-wrap isliye ki phone pe ye apne aap toot jaye */}
      <div
        data-anim="rise"
        className="border-line bg-paper-2 mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border p-5"
      >
        {pipeline.map((step, index) => (
          <span key={step.short} className="flex items-center gap-3">
            {/* Pehle step se pehle arrow nahi lagta */}
            {index > 0 && <span className="text-line">→</span>}

            <span
              className={`text-label font-mono uppercase ${
                step.modelCall ? "text-accent" : "text-ink-soft"
              }`}
            >
              {step.short}
            </span>
          </span>
        ))}
      </div>

      {/* Legend rang ka naam nahi leti. Pehle "Blue" likha tha aur accent
          cobalt se green ho gaya — line jhooth bolne lagi thi. */}
      <p className="text-label text-ink-soft mt-3 font-mono uppercase">
        <span className="text-accent">Highlighted</span> = the two model calls
      </p>

      {/* ol isliye ki order khud ek information hai */}
      <ol data-anim-group className="border-line mt-12 border-t">
        {pipeline.map((step, index) => (
          <li
            key={step.short}
            data-anim="row"
            className="border-line border-b py-7 md:grid md:grid-cols-12 md:gap-10"
          >
            <div className="flex gap-4 md:col-span-4">
              <span className="text-label text-accent font-mono tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <h3 className="font-heading text-lg">{step.name}</h3>
                <p className="text-label text-ink-soft mt-2 font-mono uppercase">
                  {step.detail}
                </p>
              </div>
            </div>

            {/* pl-9 phone pe text ko number ke neeche nahi, uske aage rakhta hai */}
            <p className="text-ink-soft mt-3 max-w-[62ch] pl-9 md:col-span-8 md:mt-0 md:pl-0">
              {step.text}
            </p>
          </li>
        ))}
      </ol>

      {/* Page ka asli daava: upar wala raasta sirf ek kahani hai — baat ye hai
          ki turn bina jawab ke bhi khatam ho sakta hai, aur teen jagah hota hai */}
      <div
        data-anim="rise"
        className="border-line bg-paper-2 mt-12 border p-6 md:p-8"
      >
        <h3 className="font-heading text-xl">
          Where a turn ends without an answer
        </h3>

        <dl className="mt-6">
          {exits.map((exit) => (
            <div
              key={exit.label}
              className="border-line flex flex-col gap-1 border-t py-4 sm:flex-row sm:gap-8"
            >
              <dt className="text-label text-accent font-mono uppercase sm:w-36 sm:shrink-0 sm:pt-1">
                {exit.label}
              </dt>
              <dd className="text-ink-soft max-w-[62ch]">{exit.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
