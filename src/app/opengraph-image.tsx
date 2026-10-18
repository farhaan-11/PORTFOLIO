import { readFile } from "node:fs/promises";
import { ImageResponse } from "next/og";
import { contact, hero, nav } from "@/content/profile";

/*
  Jab koi WhatsApp, LinkedIn ya Twitter pe is site ka link bhejta hai, wahan
  ye tasveer dikhti hai. Iske bina sirf ek nanga URL dikhta hai — aur
  recruiter ko bheja gaya nanga link khola hi nahi jata.

  Tasveer runtime pe banti hai, koi PNG file repo mein nahi. Fayda: naam,
  headline aur email profile.ts se aate hain, isliye content badalne pe ye
  apne aap badal jati hai. Alag PNG hota to wo chupchaap purana ho jata.

  1200x630 — WhatsApp se LinkedIn tak, sab yahi maangte hain.
*/
export const alt = `${nav.name} — ${hero.label}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/*
  Font file padhne ka tareeka.

  `fetch(new URL(...))` NAHI chalta — Node ka fetch `file://` URL support
  nahi karta aur "not implemented... yet..." de ke poora route 500 kar deta
  hai. Yahan ye galti ek baar ho chuki hai.

  `readFile` file:// URL seedha le leta hai, aur `import.meta.url` wala path
  bundler bhi padh leta hai — isliye font deploy ke saath chala jata hai.
  `process.cwd()` wala path local pe chalta hai par Vercel pe nahi, kyunki
  wahan source files nahi jatin.

  Font na mile to `null` wapas jata hai aur tasveer default font mein banti
  hai. Ye jaan-boojh ke hai: OG image ka theek na dikhna chalega, par uska
  500 dena matlab link bhejne pe koi preview hi nahi — aur wahi sabse bura hai.
*/
async function readSerifFont() {
  try {
    return await readFile(
      new URL("./_og/InstrumentSerif-Regular.ttf", import.meta.url),
    );
  } catch (error) {
    console.error(
      "[og] font nahi mila, default font se bana rahe hain:",
      error,
    );
    return null;
  }
}

export default async function OpengraphImage() {
  const serif = await readSerifFont();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f8f8f5",
        padding: "72px 80px",
      }}
    >
      <div
        style={{
          fontSize: 22,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#6c6c70",
        }}
      >
        {hero.label}
      </div>

      {/* Wahi 2px ink rule jo site pe har section kholti hai */}
      <div
        style={{
          height: 3,
          backgroundColor: "#16161a",
          marginTop: 22,
        }}
      />

      <div
        style={{
          fontFamily: "Instrument Serif",
          fontSize: 108,
          lineHeight: 1.05,
          color: "#16161a",
          marginTop: 48,
        }}
      >
        {nav.name}
      </div>

      <div
        style={{
          fontFamily: "Instrument Serif",
          fontSize: 48,
          lineHeight: 1.2,
          color: "#0e6e4f",
          marginTop: 20,
        }}
      >
        {hero.headline}
      </div>

      {/* marginTop auto — ye line neeche ki farsh pe chipak jati hai */}
      <div
        style={{
          display: "flex",
          fontSize: 24,
          color: "#6c6c70",
          marginTop: "auto",
        }}
      >
        {contact.location} · {contact.email}
      </div>
    </div>,
    {
      ...size,
      fonts: serif
        ? [{ name: "Instrument Serif", data: serif, style: "normal" }]
        : [],
    },
  );
}
