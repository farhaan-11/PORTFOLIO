import { SectionHeading } from "@/components/ui/SectionHeading";
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
      <SectionHeading number="03">Stack</SectionHeading>

      <dl data-anim-group>
        {stack.map((group) => (
          <div
            key={group.group}
            data-anim="row"
            className="border-line flex flex-col gap-2 border-b py-6 sm:flex-row sm:gap-8"
          >
            <dt className="text-label text-ink-soft font-mono uppercase sm:w-40 sm:shrink-0 sm:pt-1.5">
              {group.group}
            </dt>

            {/*
              "Learning now" wali row accent mein hai, baaki ink mein.

              Ye saat rows batati hain ki aaj kya aata hai; ek row batati hai
              ki kal kya aayega. Rang ka kaam yahi hai — ek cheez ko baaki se
              alag karna, har cheez ko sajana nahi. Isi liye poore page pe
              accent sirf teen jagah hai: section number, link, aur ye row.
            */}
            <dd
              className={
                group.group === "Learning now"
                  ? "text-accent text-[1.0625rem]"
                  : "text-ink text-[1.0625rem]"
              }
            >
              {group.items.join(" · ")}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
