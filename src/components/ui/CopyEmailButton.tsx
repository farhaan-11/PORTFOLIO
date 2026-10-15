"use client";

import { useState } from "react";

/*
  Email copy karne ka button.

  Contact form jaan-boojh ke nahi banaya: form bharne mein mehnat lagti hai
  aur recruiter aksar apne hi email se baat karna chahta hai.
  Yahan email screen pe likha hai — button sirf ek shortcut hai.
*/
export function CopyEmailButton({ email }: { email: string }) {
  // Teen haal hain (Copy / Copied / fail), isliye boolean ki jagah seedha
  // wahi text rakha hai jo button pe dikhna hai. Ek state, ek jagah.
  const [label, setLabel] = useState("Copy");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setLabel("Copied");
    } catch {
      // Purane browser mein ya bina https ke clipboard kaam nahi karta.
      // Pehle yahan kuch nahi hota tha — button dabta tha aur kuch badalta
      // nahi tha, jo tootay hue button jaisa lagta hai. Ab kam se kam
      // reader ko pata chalta hai ki email khud select karna padega.
      setLabel("Select it above");
    }

    // Do second baad wapas "Copy" — warna reader ko lagta hai button atak gaya
    setTimeout(() => setLabel("Copy"), 2000);
  }

  return (
    <button
      type="button"
      onClick={copyEmail}
      className="text-label text-ink-soft border-line hover:text-accent hover:border-accent cursor-pointer border px-3 py-2 font-mono uppercase transition-colors"
    >
      <span key={label} data-enter="1" className="inline-block">
        {label}
      </span>
    </button>
  );
}
