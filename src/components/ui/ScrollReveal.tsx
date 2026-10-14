"use client";

import { useEffect } from "react";

/*
  Scroll pe halka fade-up.

  Sabse zaroori baat: content default mein VISIBLE hai.
  Chhupane ka kaam CSS karta hai, aur woh bhi sirf tab jab <html> pe "js"
  class lagi ho — jo ek chhota script layout mein lagata hai.
  JS fail hua to class lagti hi nahi, aur poora page normal dikhta hai.

  Ye observer sirf data-revealed="true" set karta hai. Baaki transition
  globals.css mein hai.
*/
export function ScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");

    // Purane browser mein IntersectionObserver nahi hota — tab sab dikha do.
    if (typeof IntersectionObserver === "undefined") {
      elements.forEach((element) =>
        element.setAttribute("data-revealed", "true"),
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.setAttribute("data-revealed", "true");
          // Ek baar dikh gaya to dobara dekhne ki zaroorat nahi
          observer.unobserve(entry.target);
        });
      },
      // Element ke 10% dikhte hi chalu — poora intezaar karne se late lagta hai
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}
