import type { Metadata, Viewport } from "next";
import { bodyFont, headingFont, monoFont } from "./fonts";
import "./globals.css";

// "AI engineer" jaan-boojh ke nahi likha — Farhan models ke aas-paas product
// banata hai, models train nahi karta. (DECISIONS.md section 7)
export const metadata: Metadata = {
  title: {
    default: "Farhan Ansari — Full-stack engineer",
    template: "%s · Farhan Ansari",
  },
  description:
    "Full-stack engineer in Hyderabad, India. I build products that have to keep running after I ship them — most recently ZUNO, a tutor that answers only from a Class 10 syllabus.",
};

export const viewport: Viewport = {
  colorScheme: "light",
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
