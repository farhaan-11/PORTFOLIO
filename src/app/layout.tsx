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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const fontVariables = `${headingFont.variable} ${bodyFont.variable} ${monoFont.variable}`;

  return (
    <html lang="en" className={fontVariables}>
      <body className="bg-paper text-ink font-body antialiased">
       
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
