import type { Metadata, Viewport } from "next";
import { bodyFont, headingFont, monoFont } from "./fonts";
import "./globals.css";

// Browser tab ka title, aur Google/LinkedIn ko dikhne wali description.
// Asli words Phase 2 mein final honge - abhi dhancha ban raha hai.
export const metadata: Metadata = {
  title: {
    default: "Farhan Ansari — Software Engineer",
    // Andar ke pages ka title: "ZUNO · Farhan Ansari"
    template: "%s · Farhan Ansari",
  },
  description:
    "Software engineer building AI products that answer from real material instead of guessing.",
};

export const viewport: Viewport = {
  // Site sirf light hai. Ye line browser ko bata deti hai, warna
  // dark mode wale phone input aur scrollbar kaale kar dete hain.
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Teeno font ke CSS variables <html> pe lagte hain,
  // taaki poore page mein kahin bhi use ho sakein.
  const fontVariables = `${headingFont.variable} ${bodyFont.variable} ${monoFont.variable}`;

  return (
    <html lang="en" className={fontVariables}>
      <body className="bg-paper text-ink font-body antialiased">
        {/*
          Ye ek line <html> pe "js" class lagati hai, page paint hone se pehle.
          Scroll reveal ka chhupane wala CSS sirf is class ke andar hai —
          matlab JS fail hua to kuch chhupta hi nahi, poora content dikhta hai.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
