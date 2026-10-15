import { hero } from "@/content/profile";
import { container, heroPadding } from "@/lib/layout";

/*
  Hero. Sab kuch left-aligned — centered hero hi sabse aam portfolio shakal hai.

  min-h-screen jaan-boojh ke nahi: chhote laptop pe woh heading ko kinare pe
  chipka deta hai, aur phone pe address bar ki wajah se height hilti rehti hai.
  Natural padding se hero ke neeche metric strip thodi jhaankti hai — isse
  reader ko pata chalta hai ki neeche aur bhi kuch hai.
*/
export function Hero() {
  return (
    <section className={`${container} ${heroPadding}`}>
      <p
        data-anim="hero-label"
        className="text-label text-ink-soft font-mono uppercase"
      >
        {hero.label}
      </p>

      <h1
        data-anim="hero-headline"
        className="font-heading text-display mt-6 max-w-[18ch]"
      >
        {hero.headline}
      </h1>

      {/*
        max-w-[62ch]: ye line teen clause ki lambi line hai. Poori width pe
        ek line 130 character ki ho jati hai aur aankh wapas aate hue kho jati hai.
      */}
      <p
        data-anim="hero-lead"
        className="text-lead text-ink-soft mt-6 max-w-[62ch]"
      >
        {hero.summaryStart}
        {/*
          Refusal wala phrase hi poore product ka daava hai, isliye sirf
          yahi highlight hota hai. <strong> use kiya, <span> nahi —
          ye zor screen reader ko bhi sunai dena chahiye.
        */}
        <strong className="font-heading text-accent decoration-accent/40 text-[1.08em] italic underline underline-offset-[6px]">
          {hero.summaryHighlight}
        </strong>
        {hero.summaryEnd}
      </p>
    </section>
  );
}
