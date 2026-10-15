// Teeno font ek hi jagah. next/font inhe build ke time download karke
// khud host kar leta hai - browser Google ke server pe jaata hi nahi.
// Isse page fast load hota hai aur visitor ki privacy bhi bachti hai.
import {
  IBM_Plex_Mono,
  Instrument_Sans,
  Instrument_Serif,
} from "next/font/google";

// Headings - Instrument Serif.
//
// Archivo se badla gaya. Wajah: Archivo ek saaf grotesque hai jo har
// doosre portfolio pe milta hai. Ye serif patla aur chauda hai, isliye
// bahut bade size pe bhi chillata nahi — aur headline ko weight deta hai
// jo is page ke content (numbers, seedhe daave) ko suit karta hai.
//
// Iska sirf ek weight hai (400). Isliye kisi bhi heading pe font-semibold
// ya font-medium nahi lagana — browser us weight ko khud mota banata hai
// aur letters bhadde ho jate hain.
export const headingFont = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

// Body text - Instrument Sans.
//
// Serif heading ke neeche ek neutral sans chahiye tha. Ye usi family ka
// saathi hai (Instrument Serif + Instrument Sans ek hi studio se), isliye
// dono ek saath design kiye hue lagte hain, jod ke lagaye hue nahi.
export const bodyFont = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

// Labels aur numbers - IBM Plex Mono. Ye wahi hai jo pehle tha:
// mono labels is design ki pehchaan hain, unhe badalne ki zaroorat nahi thi.
// Ye variable font nahi hai, isliye weight khud batana padta hai.
export const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});
