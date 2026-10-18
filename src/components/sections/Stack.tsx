import { SectionHeading } from "@/components/ui/SectionHeading";
import { stack } from "@/content/profile";
import { container, sectionPadding } from "@/lib/layout";

/*
  Wahi ledger shakal jo poore site pe hai: mono label baayen, cheezein daayen.

  Tech logos ki wall nahi banayi — logo se sirf ye pata chalta hai ki naam
  suna hai, kitna aata hai ye nahi.

  Har row ek jaisi hai, "Learning now" wali bhi. Pehle wo accent mein thi, aur
  accent "yahan dekho" ka rang hai — usey page ki sabse kamzor row pe lagana
  ulta kaam karta hai. Farak row ke label se hi saaf hai.
*/
export function Stack() {
  return (
    <section className={`${container} ${sectionPadding}`}>
      <SectionHeading number="03">Stack</SectionHeading>

      <dl data-anim-group>
        {stack.map((group) => (
          <div
            key={group.group}
            data-anim="row"
            className="border-line flex flex-col gap-2 border-b py-5 sm:flex-row sm:gap-8"
          >
            <dt className="text-label text-ink-soft font-mono uppercase sm:w-40 sm:shrink-0 sm:pt-1.5">
              {group.group}
            </dt>

            {/* Ek line mein, dot se juda — list banane se jagah zyada jati hai */}
            <dd className="text-ink text-[1.0625rem]">
              {group.items.join(" · ")}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
