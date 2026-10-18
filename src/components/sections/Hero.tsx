import { hero } from "@/content/profile";
import { container, heroPadding } from "@/lib/layout";

// Sab kuch left-aligned — centered hero hi sabse aam portfolio shakal hai.
// min-h-screen jaan-boojh ke nahi hai (DECISIONS.md section 4).
export function Hero() {
  return (
    <section className={`${container} ${heroPadding}`}>
      {/*
        Label ke aage ek chhoti hairline — newspaper ka "kicker" isi tarah
        baithta hai. Bina line ke ye label headline ke upar bina kisi rishte
        ke tairta tha.

        Weight 500 isliye ki ye headline se PEHLE padha jaye: pehle banda kaun
        hai, phir uska daava. (Weight ki paabandi sirf serif heading pe hai,
        mono ke paas 400 aur 500 dono asli weights hain.)
      */}
      <p
        data-anim="hero-label"
        className="text-ink sm:text-label flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.08em] uppercase sm:gap-3"
      >
        <span
          aria-hidden="true"
          className="bg-ink block h-px w-[22px] sm:w-7"
        />
        {hero.label}
      </p>

      <h1
        data-anim="hero-headline"
        className="font-heading text-display mt-6 max-w-[18ch]"
      >
        {hero.headline}
      </h1>

      {/* 54ch pe roka hua — poori width pe ek line 130 character ki ho jati
          hai aur aankh wapas aate hue kho jati hai. */}
      <p
        data-anim="hero-lead"
        className="text-hero-lead text-ink-soft mt-7 max-w-[54ch]"
      >
        {hero.summaryStart}

        {/*
          Poore page ka ek asli daava, isliye sirf yahi highlight hota hai.
          <strong> use kiya <span> nahi — ye zor screen reader ko bhi sunai
          dena chahiye.

          Rang background-IMAGE se aata hai (dono gradient stop ek hi rang ke
          hain), background-color se nahi — sirf image ki chaudai animate ho
          sakti hai, aur SiteMotion isey baayen se daayen phirata hai.

          box-decoration-break: clone — phone pe ye phrase do line mein toot
          sakta hai; iske bina highlight dono line pe ek lamba chaukor ban
          jata hai, do alag nishan nahi.
        */}
        <strong
          data-anim="hero-phrase"
          className="font-heading text-accent from-accent/12 to-accent/12 -mx-1 bg-linear-to-r [box-decoration-break:clone] bg-[length:100%_100%] bg-no-repeat px-1 text-[1.08em] italic [-webkit-box-decoration-break:clone]"
        >
          {hero.summaryHighlight}
        </strong>

        {hero.summaryEnd}
      </p>
    </section>
  );
}
