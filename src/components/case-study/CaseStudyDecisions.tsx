import { decisions } from "@/content/zuno";
import { container, sectionPadding } from "@/lib/layout";

/*
  Chaar decisions. Page ka sabse lamba section hai, aur hona bhi chahiye —
  senior engineer isi section ke liye page kholta hai.

  Har decision ki ek hi shakal hai: Problem → What I did → Result.
  Teen labels mono mein, baayen taraf. Yahi ledger shape poore site pe hai,
  isliye lamba section hone ke baad bhi ye naya page jaisa nahi lagta.

  Result row jaan-boojh ke ink (gehra) rakha hai aur baaki ink-soft —
  reader skim karte hue bhi result padh leta hai.
*/
export function CaseStudyDecisions() {
  return (
    <section className={`${container} ${sectionPadding}`}>
      <h2 className="text-label text-ink-soft font-mono uppercase">
        Four decisions
      </h2>

      <div className="border-line mt-8 border-t">
        {decisions.map((decision, index) => (
          <article
            key={decision.title}
            data-reveal
            className="border-line border-b py-8"
          >
            <span className="text-label text-accent font-mono tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3 className="font-heading text-title mt-3 max-w-[40ch]">
              {decision.title}
            </h3>

            <dl className="mt-8">
              <Row label="Problem" text={decision.problem} />
              <Row label="What I did" text={decision.action} />
              {/* Result sabse zaroori line hai, isliye gehre ink mein */}
              <Row label="Result" text={decision.result} strong />
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

/*
  Ek row. Teeno rows ki shakal bilkul ek hai, isliye ye chhota component
  isi file mein hai — teen jagah same markup likhne se bachne ke liye,
  alag file banane ki zaroorat nahi kyunki iska use sirf yahin hai.
*/
function Row({
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
