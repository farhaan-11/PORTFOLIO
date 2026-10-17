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
      {/*
        Label ke aage ek 28px ki hairline - newspaper ka "kicker" isi tarah
        baithta hai. Pehle ye label headline ke upar bina kisi rishte ke tairta
        tha; line use headline ke saath jod deti hai.

        Rang ink-soft se ink kiya aur weight 500 - taaki ye headline se pehle
        padha jaye. Tarteeb yahi honi chahiye: pehle banda kaun hai, phir
        uska daava. (Weight wali paabandi sirf serif heading pe hai, mono pe
        nahi - mono ke paas 400 aur 500 dono hain.)
      */}
      <p
        data-anim="hero-label"
        className="text-ink sm:text-label flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.08em] uppercase sm:gap-3"
      >
        <span aria-hidden="true" className="bg-ink block h-px w-[22px] sm:w-7" />
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
        className="text-hero-lead text-ink-soft mt-7 max-w-[54ch]"
      >
        {hero.summaryStart}
        {/*
          Refusal wala phrase hi poore product ka daava hai, isliye sirf
          yahi highlight hota hai. <strong> use kiya, <span> nahi —
          ye zor screen reader ko bhi sunai dena chahiye.
        */}
        {/*
          Highlighter. Rang background-image se aata hai (bg-linear-to-r ke
          dono stop ek hi rang ke hain), background-color se nahi - sirf image
          ki hi chaudai animate ho sakti hai. Isi se SiteMotion ise baayein se
          daayein phirata hai.

          box-decoration-break: clone - phone pe ye phrase do line mein toot
          sakta hai; iske bina highlight dono line pe ek lamba chaukor ban
          jata hai, do alag nishan nahi.

          Underline hata diya: ek hi phrase pe teen signal (green text,
          underline, wash) zyada the, aur highlighter ki zubaan mein underline
          hota hi nahi.
        */}
        <strong
          data-anim="hero-phrase"
          className="font-heading text-accent from-accent/12 to-accent/12 -mx-1 bg-linear-to-r bg-[length:100%_100%] bg-no-repeat px-1 text-[1.08em] italic [-webkit-box-decoration-break:clone] [box-decoration-break:clone]"
        >
          {hero.summaryHighlight}
        </strong>
        {hero.summaryEnd}
      </p>
    </section>
  );
}
