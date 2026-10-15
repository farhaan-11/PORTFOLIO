import { stack } from "@/content/profile";
import { container, sectionPadding } from "@/lib/layout";

/*
  Stack — wahi ledger shakal jo hero ke status rows mein hai:
  mono label baayen, cheezein daayen.

  Tech logos ki wall nahi banayi: logo se sirf ye pata chalta hai ki naam
  suna hai, kitna aata hai ye nahi. Aur logo wall har doosre portfolio pe hai.
*/
export function Stack() {
  return (
    <section className={`${container} ${sectionPadding}`}>
      <h2 className="text-label text-ink-soft font-mono uppercase">Stack</h2>

      <span data-rule className="bg-line mt-8 block h-px" />

      <dl data-anim-group>
        {stack.map((group) => (
          <div
            key={group.group}
            data-anim="row"
            className="border-line flex flex-col gap-2 border-b py-5 sm:flex-row sm:gap-8"
          >
            <dt className="text-label text-ink-soft font-mono uppercase sm:w-40 sm:shrink-0 sm:pt-1">
              {group.group}
            </dt>
            <dd className="text-ink">{group.items.join(" · ")}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
