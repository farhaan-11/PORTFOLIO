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
            // py-6 se py-5: row ka gap 48px se 40px. Wahi wajah jo WorkIndex
            // mein hai — section ka gap (160px) row ke gap se saaf bada
            // dikhna chahiye, warna naya section shuru hona mehsoos nahi hota.
            className="border-line flex flex-col gap-2 border-b py-5 sm:flex-row sm:gap-8"
          >
            <dt className="text-label text-ink-soft font-mono uppercase sm:w-40 sm:shrink-0 sm:pt-1.5">
              {group.group}
            </dt>

            {/*
              Har row ek jaisi hai — "Learning now" wali bhi.

              Pehle "Learning now" wali row accent mein thi, aur usme ek
              soch ki galti thi: accent is page pe "yahan dekho" ka rang hai,
              aur wo rang page ki sabse kamzor row pe laga hua tha. Jo cheez
              abhi aati nahi, usey poore page mein sabse zyada highlight
              karna ulta kaam karta hai.

              Farak ab bhi saaf hai — row ka label hi "LEARNING NOW" kehta
              hai. Jo baat shabdon se ho jati ho, uske liye rang kharch nahi
              karna. Accent ka poora rule globals.css mein likha hai.

              Pehle yahan ek ternary tha jo dono haalat mein ek hi size deta
              tha; ab dono branch ek jaise hain, isliye ternary hata diya.
            */}
            <dd className="text-ink text-[1.0625rem]">
              {group.items.join(" · ")}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
