"use client";

import { useEffect } from "react";

/*
  Poore site ki animation ek hi jagah.

  Teen bade faisle, teeno wajah ke saath:

  1. GSAP + Lenis, Framer Motion nahi.
     Yahan ka kaam scroll ki choreography hai — line mask, rule draw, row
     wipe — React state ka nahi. GSAP ye sab React ko dobara render karwaye
     bina karta hai, aur Lenis scroll ko wo "bhaari" feel deta hai jo
     native wheel se nahi aata. Framer Motion tab behtar hota jab layout
     ya shared-element transition chahiye hote.

  2. Library hydration ke BAAD load hoti hai (dynamic import).
     Isse pehla page HTML halka rehta hai; animation ka ~40KB tab aata hai
     jab page padhne layak ho chuka hota hai.

  3. Content ko CHHUPANE ka kaam ab CSS nahi, GSAP karta hai.
     Pehle CSS `opacity: 0` lagati thi aur JS use wapas laata tha — JS ruka
     to content hamesha ke liye gayab. Ab gsap.from()/fromTo() hi chhupata
     hai, yaani jab tak animation chalne wali nahi hai tab tak content
     normal dikhta hai. Ye is page ka sabse bada failure mode tha.

  Jisne phone/laptop mein motion band kiya hua hai (motion sickness wali
  setting), uske liye niche kuch chalta hi nahi — na Lenis, na koi reveal.
*/
export function SiteMotion() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    // Cleanup ke liye — ye tab bhi chalna chahiye jab import beech mein ruk jaye
    let cleanup = () => {};
    let cancelled = false;

    async function start() {
      const [gsapModule, scrollTriggerModule, splitTextModule, lenisModule] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("gsap/SplitText"),
          import("lenis"),
        ]);

      if (cancelled) return;

      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      const SplitText = splitTextModule.SplitText;
      const Lenis = lenisModule.default;

      gsap.registerPlugin(ScrollTrigger, SplitText);

      /*
        Lenis — smooth scroll.

        duration 1.05: isse zyada rakha to scroll "rubber" lagta hai aur
        reader ko lagta hai page uske control mein nahi hai.
        touch pe band hai: phone ka apna scroll pehle se achha hai, aur
        usey badalna hamesha bura lagta hai.
      */
      const lenis = new Lenis({ duration: 1.05, smoothWheel: true });

      lenis.on("scroll", ScrollTrigger.update);

      function raf(time: number) {
        lenis.raf(time * 1000);
      }

      gsap.ticker.add(raf);
      // GSAP tab frame "chhod" deta hai jab tab background mein ho —
      // Lenis ke saath isse scroll atakta hai, isliye band.
      gsap.ticker.lagSmoothing(0);

      // Nav ke anchor link ab Lenis se chalenge, warna wo native jump
      // karte hain aur smooth scroll ke beech jhatka lagta hai.
      function onAnchorClick(event: MouseEvent) {
        const link = (event.target as HTMLElement).closest("a");
        if (!link) return;

        const href = link.getAttribute("href");
        if (!href || !href.startsWith("#")) return;

        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -32 });
      }

      document.addEventListener("click", onAnchorClick);

      const context = gsap.context(() => {
        /*
          HERO — line by line.

          SplitText headline ko lines mein todta hai aur har line ko ek
          mask ke peeche rakhta hai (mask: "lines"). Line us mask ke neeche
          se upar aati hai — fade nahi. Yahi ek move poore page ka tone
          set karta hai.
        */
        const headline = document.querySelector<HTMLElement>(
          '[data-anim="hero-headline"]',
        );

        const intro = gsap.timeline();

        intro.from('[data-anim="hero-label"]', {
          y: 10,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        });

        if (headline) {
          const split = new SplitText(headline, {
            type: "lines",
            mask: "lines",
          });

          intro.from(
            split.lines,
            {
              yPercent: 115,
              duration: 0.95,
              ease: "power4.out",
              stagger: 0.08,
            },
            "-=0.2",
          );
        }

        intro.from(
          '[data-anim="hero-lead"]',
          { y: 14, opacity: 0, duration: 0.7, ease: "power3.out" },
          "-=0.55",
        );

        /*
          HAIRLINE — har rule baayen se daayen banti hai.
          Page ki linein khud khinchti hui dikhti hain; ye structure ko
          animation banata hai, content ke upar sajavat nahi.
        */
        gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((rule) => {
          gsap.from(rule, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.9,
            ease: "power3.inOut",
            scrollTrigger: { trigger: rule, start: "top 92%", once: true },
          });
        });

        // BAND — heading aur uska content ek saath, alag-alag nahi
        gsap.utils
          .toArray<HTMLElement>('[data-anim="rise"]')
          .forEach((band) => {
            gsap.from(band, {
              y: 18,
              opacity: 0,
              duration: 0.65,
              ease: "power3.out",
              scrollTrigger: { trigger: band, start: "top 88%", once: true },
            });
          });

        /*
          ROWS — fade nahi, wipe.
          Row apne hi upar wale kinare se khulti hai (clip-path), jaise
          list upar se neeche likhi ja rahi ho.
        */
        gsap.utils
          .toArray<HTMLElement>("[data-anim-group]")
          .forEach((group) => {
            const rows = group.querySelectorAll('[data-anim="row"]');
            if (rows.length === 0) return;

            gsap.fromTo(
              rows,
              { clipPath: "inset(0% 0% 100% 0%)", y: 18, opacity: 0 },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.09,
                scrollTrigger: { trigger: group, start: "top 82%", once: true },
              },
            );
          });

        // SCROLL PROGRESS — header ke neeche 1px ki line.
        // Ye sajavat nahi: lambe single page pe reader ko pata chalta hai
        // ki wo kahan hai aur kitna bacha hai.
        const progress = document.querySelector<HTMLElement>("[data-progress]");

        if (progress) {
          gsap.fromTo(
            progress,
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: "left center",
              ease: "none",
              scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
            },
          );
        }
      });

      cleanup = () => {
        document.removeEventListener("click", onAnchorClick);
        gsap.ticker.remove(raf);
        lenis.destroy();
        context.revert();
      };
    }

    start();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return null;
}
