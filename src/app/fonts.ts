// Teeno font ek hi jagah. next/font inhe build ke time download karke khud
// host kar leta hai — browser Google ke server pe jaata hi nahi.
//
// Naam globals.css mein diye jaate hain. Wajah DECISIONS.md section 2 mein.
import {
  IBM_Plex_Mono,
  Instrument_Sans,
  Instrument_Serif,
} from "next/font/google";

// RULE: iska sirf ek weight hai (400). Isliye kisi bhi heading pe
// font-semibold ya font-medium nahi lagana — browser us weight ko khud mota
// banata hai aur letters bhadde ho jate hain.
export const headingFont = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const bodyFont = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

// Variable font nahi hai, isliye weight khud batana padta hai.
export const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});
