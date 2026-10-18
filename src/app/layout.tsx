import type { Metadata, Viewport } from "next";
import { nav } from "@/content/profile";
import { siteUrl } from "@/lib/site";
import { bodyFont, headingFont, monoFont } from "./fonts";
import "./globals.css";

const description =
  "Full-stack engineer in Hyderabad, India. I build products that have to keep running after I ship them — most recently ZUNO, a tutor that answers only from a Class 10 syllabus.";

/*
  "AI engineer" jaan-boojh ke nahi likha — Farhan models ke aas-paas product
  banata hai, models train nahi karta. (DECISIONS.md section 7)

  metadataBase ke bina Next relative OG path ko absolute nahi bana sakta, aur
  LinkedIn/WhatsApp pe tasveer nahi dikhti. Wo URL lib/site.ts se aata hai.

  OG tasveer khud opengraph-image.tsx banata hai — yahan uska path likhna
  nahi padta, Next use file ke naam se khud jod leta hai.
*/
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: `${nav.name} — Full-stack engineer`,
    template: `%s · ${nav.name}`,
  },
  description,

  // Google ko ek hi asli address batata hai, taaki vercel.app wala aur apna
  // domain do alag page na ginein.
  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    siteName: nav.name,
    title: `${nav.name} — Full-stack engineer`,
    description,
    url: "/",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: `${nav.name} — Full-stack engineer`,
    description,
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  // Browser ka address bar bhi page ke paper rang ka ho jata hai — phone pe
  // isse page screen ke andar se shuru hota lagta hai, chipkaya hua nahi.
  themeColor: "#f8f8f5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontVariables = `${headingFont.variable} ${bodyFont.variable} ${monoFont.variable}`;

  return (
    <html lang="en" className={fontVariables}>
      <body className="bg-paper text-ink font-body antialiased">
        {children}
      </body>
    </html>
  );
}
