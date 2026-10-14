"use client";

import { useState } from "react";

/*
  Email copy karne ka button.

  Contact form jaan-boojh ke nahi banaya: form bharne mein mehnat lagti hai
  aur recruiter aksar apne hi email se baat karna chahta hai.
  Yahan email screen pe likha hai — button sirf ek shortcut hai.
*/
export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      // Do second baad wapas "Copy" — warna reader ko lagta hai button atak gaya
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Purane browser mein ya bina https ke clipboard kaam nahi karta.
      // Aise mein kuch nahi hota — email bagal mein likha hi hua hai,
      // reader use select karke copy kar sakta hai.
    }
  }

  return (
    <button
      type="button"
      onClick={copyEmail}
      className="text-label text-ink-soft border-line hover:text-cobalt hover:border-cobalt cursor-pointer rounded-none border px-3 py-2 font-mono uppercase transition-colors"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
