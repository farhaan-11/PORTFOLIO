import type { Metadata, Viewport } from "next";
import { bodyFont, headingFont, monoFont } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Farhan Ansari — Software Engineer",

    template: "%s · Farhan Ansari",
  },
  description:
    "Software engineer building AI products that answer from real material instead of guessing.",
};

export const viewport: Viewport = {
  colorScheme: "light",
};

/*
  Pehle yahan ek chhota script tha jo <html> pe "js" class lagata tha —
  purana CSS reveal usi class ke bharose content chhupata tha.

  Ab wo system nahi raha (animation GSAP karta hai, SiteMotion.tsx), aur
  wo script ek asli problem bhi thi: server ka HTML aur browser ka HTML
  alag ho jate the, jisse React har page load pe hydration mismatch ki
  error deta tha. Script hat gayi, error bhi.
*/
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
