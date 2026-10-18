import { decisions } from "@/content/zuno";
import { container, sectionPadding } from "@/lib/layout";

/*
  Ek row: label baayen, text daayen. Wahi ledger shape jo poore site pe hai.

  Teeno rows ka markup bilkul ek hai, isliye ye chhota component yahin rehta
  hai — alag file banane ki zaroorat nahi kyunki iska use sirf isi file mein hai.
*/
function DecisionRow({
  label,
  text,
  strong = false,
}: {
  label: string;
  text: string;
  strong?: boolean;
}) {
  return (
    <div className="border-line flex flex-col gap-1 border-t py-5 md:flex-row md:gap-8">
      <dt className="text-label text-ink-soft font-mono uppercase md:w-32 md:shrink-0 md:pt-1">
        {label}
      </dt>
      <dd className={strong ? "max-w-[62ch]" : "text-ink-soft max-w-[62ch]"}>
        {text}
      </dd>
    </div>
  );
}

/*
  Page ka sabse lamba section, aur hona bhi chahiye — senior engineer isi
  section ke liye page kholta hai.

  Har decision ki ek hi shakal hai: Problem → What I did → Result. Result
  gehre ink mein hai aur baaki ink-soft, taaki reader skim karte hue bhi
  result padh le.
*/
export function CaseStudyDecisions() {
  return (
    <section className={`${container} ${sectionPadding}`}>
      <h2 className="text-label text-ink-soft font-mono uppercase">
        Four decisions
      </h2>

      <div data-anim-group className="border-line mt-8 border-t">
        {decisions.map((decision, index) => (
          <article
            key={decision.title}
            data-anim="row"
            className="border-line border-b py-8"
          >
            <span className="text-label text-accent font-mono tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3 className="font-heading text-title mt-3 max-w-[40ch]">
              {decision.title}
            </h3>

            <dl className="mt-8">
              <DecisionRow label="Problem" text={decision.problem} />
              <DecisionRow label="What I did" text={decision.action} />
              <DecisionRow label="Result" text={decision.result} strong />
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
