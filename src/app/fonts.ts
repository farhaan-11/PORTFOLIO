// Teeno font ek hi jagah. next/font inhe build ke time download karke
// khud host kar leta hai - browser Google ke server pe jaata hi nahi.
// Isse page fast load hota hai aur visitor ki privacy bhi bachti hai.
import { Archivo, IBM_Plex_Mono, Source_Sans_3 } from "next/font/google";

// Headings - Archivo
export const headingFont = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

// Body text - Source Sans 3
export const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

// Labels aur numbers - IBM Plex Mono
// Ye variable font nahi hai, isliye weight khud batana padta hai.
export const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});
