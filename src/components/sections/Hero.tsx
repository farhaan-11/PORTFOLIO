import { hero } from "@/content/profile";
import { container, sectionPadding } from "@/lib/layout";

/*
  Hero. Sab kuch left-aligned — centered hero hi sabse aam portfolio shakal hai.

  min-h-screen jaan-boojh ke nahi: chhote laptop pe woh heading ko kinare pe
  chipka deta hai, aur phone pe address bar ki wajah se height hilti rehti hai.
  Natural padding se hero ke neeche metric strip thodi jhaankti hai — isse
  reader ko pata chalta hai ki neeche aur bhi kuch hai.
*/
export function Hero() {
  return (
    <section className={`${container} ${sectionPadding}`}>
      <p data-reveal className="text-label text-ink-soft font-mono uppercase">
        {hero.label}
      </p>

      <h1
        data-reveal
        className="font-heading text-display mt-6 max-w-3xl font-semibold"
      >
        {hero.headline}
      </h1>

      {/*
        max-w-[62ch]: ye line teen clause ki lambi line hai. Poori width pe
        ek line 130 character ki ho jati hai aur aankh wapas aate hue kho jati hai.
      */}
      <p data-reveal className="text-lead text-ink-soft mt-6 max-w-[62ch]">
        {hero.summary}
      </p>

      {/*
        Status rows ledger shakal mein: mono label baayen, text daayen.
        Yahi shape aage Experience aur Stack mein dobara aata hai —
        isi repeat se page designed lagta hai, naye colors se nahi.
      */}
      <dl data-reveal className="border-line mt-12 border-t pt-6">
        {hero.status.map((row) => (
          <div
            key={row.label}
            className="flex flex-col gap-1 py-2 sm:flex-row sm:gap-8"
          >
            <dt className="text-label text-ink-soft font-mono uppercase sm:w-28 sm:shrink-0 sm:pt-1">
              {row.label}
            </dt>
            <dd>{row.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
