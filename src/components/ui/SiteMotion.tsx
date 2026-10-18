"use client";

import { useEffect } from "react";

/*
  Poore site ki scroll animation ek hi jagah. Sections sirf data-attribute
  lagate hain, animation ka code yahan hai.

  RULE: content ko chhupane ka kaam sirf GSAP karta hai (gsap.from / fromTo).
  CSS mein kabhi `opacity: 0` nahi — JS ruka to content hamesha ke liye
  gayab ho jata hai. Ye galti do baar ho chuki hai.

  Baaki saare faisle DECISIONS.md section 6 mein hain.
*/
export function SiteMotion() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    // Import beech mein ruk jaye tab bhi cleanup chalna chahiye.
    let cancelled = false;
    let cleanup = () => {};

    async function startAnimations() {
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

      const lenis = new Lenis({ duration: 1.05, smoothWheel: true });

      lenis.on("scroll", ScrollTrigger.update);

      function sendFrameToLenis(time: number) {
        lenis.raf(time * 1000);
      }

      gsap.ticker.add(sendFrameToLenis);
      // GSAP tab frame chhod deta hai jab tab background mein ho — Lenis ke
      // saath isse scroll atakta hai.
      gsap.ticker.lagSmoothing(0);

      // Nav ke anchor link Lenis se chalte hain, warna native jump smooth
      // scroll ke beech jhatka deta hai.
      function scrollToAnchor(event: MouseEvent) {
        const link = (event.target as HTMLElement).closest("a");
        if (!link) return;

        const href = link.getAttribute("href");
        if (!href || !href.startsWith("#")) return;

        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -32 });
      }

      document.addEventListener("click", scrollToAnchor);

      /*
        Font ka intezaar optional nahi hai. SplitText heading ko lines mein
        todta hai aur line break usi waqt ke font se naapta hai — font na aaya
        ho to naap fallback (Georgia) se hota hai aur wo break hamesha ke liye
        jam jata hai. Isi se headline ek-ek shabd ki chhe line mein toot jaati thi.
      */
      await document.fonts.ready;

      if (cancelled) return;

      // Hero ke chaar tween alag-alag hain, ek timeline mein nahi. Headline ka
      // split font aane ke BAAD hota hai, aur ek khatam hui timeline mein
      // tween jodne se wo kabhi chalta nahi — headline mask ke peeche chhupi
      // reh jaati thi. Delay se tarteeb banti hai, bina kisi ke intezaar ke.
      function animateHeroLabel() {
        gsap.from('[data-anim="hero-label"]', {
          y: 10,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        });
      }

      function animateHeroHeadline() {
        const headline = document.querySelector<HTMLElement>(
          '[data-anim="hero-headline"]',
        );

        if (!headline) return;

        // autoSplit resize pe lines dobara naapta hai, par animation sirf
        // pehli baar chalni chahiye. Dobara split hone pe nayi line ke div
        // saaf bante hain, isliye content chhupne ka khatra nahi.
        let hasPlayedIntro = false;

        // Todta chars mein hai par mask LINES pe hai — mask chars pe hota to
        // 'y' aur 'p' ki poonch kat jaati.
        SplitText.create(headline, {
          type: "lines,chars",
          mask: "lines",
          autoSplit: true,
          onSplit: (split) => {
            if (hasPlayedIntro) return;
            hasPlayedIntro = true;

            return gsap.from(split.chars, {
              yPercent: 115,
              duration: 0.6,
              ease: "power4.out",
              stagger: 0.018,
              delay: 0.3,
            });
          },
        });
      }

      function animateHeroLead() {
        gsap.from('[data-anim="hero-lead"]', {
          y: 14,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.7,
        });
      }

      // Highlighter aur likhai ek hi harkat hai: highlight ki chaudai 0 se
      // 100% hoti hai aur usi raftaar se akshar dikhte hain, isliye lagta hai
      // marker aage chal raha hai aur uske peeche se shabd nikal rahe hain.
      function animateHeroPhrase() {
        const phrase = document.querySelector<HTMLElement>(
          '[data-anim="hero-phrase"]',
        );

        if (!phrase) return;

        gsap.from(phrase, {
          backgroundSize: "0% 100%",
          duration: 0.6,
          ease: "power2.inOut",
          delay: 1.05,
        });

        // "words,chars", sirf "chars" nahi — warna line kisi bhi do aksharon
        // ke beech se toot sakti hai ("syllabus" → "syllabu" + "s").
        SplitText.create(phrase, {
          type: "words,chars",
          onSplit: (split) =>
            gsap.from(split.chars, {
              opacity: 0,
              duration: 0.25,
              ease: "none",
              stagger: 0.012,
              delay: 1.1,
            }),
        });
      }

      // Har hairline baayen se daayen khud khinchti hai — isse structure hi
      // animation ban jata hai, content ke upar sajavat nahi.
      function animateRules() {
        gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((rule) => {
          gsap.from(rule, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.9,
            ease: "power3.inOut",
            scrollTrigger: { trigger: rule, start: "top 92%", once: true },
          });
        });
      }

      // Ek band — heading aur uska content ek saath uthte hain.
      function animateRisingBands() {
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
      }

      /*
        Ek section, ek trigger, do kadam.

        Upar wala `rise` har band ko uska APNA trigger deta hai, isliye do band
        ke beech ka faasla scroll ki raftaar pe nirbhar karta hai. Jahan
        tarteeb khud matlab rakhti hai — pehle daava, phir saboot — wahan ye
        faasla tay hona chahiye. Isliye ek timeline: lead pehle, rest 0.18s baad.
      */
      function animateBeatSections() {
        gsap.utils.toArray<HTMLElement>("[data-anim-beat]").forEach((beat) => {
          const lead = beat.querySelector<HTMLElement>('[data-beat="lead"]');
          const rest = beat.querySelectorAll<HTMLElement>('[data-beat="rest"]');

          if (!lead || rest.length === 0) return;

          const timeline = gsap.timeline({
            scrollTrigger: { trigger: beat, start: "top 88%", once: true },
          });

          timeline.from(lead, {
            y: 18,
            opacity: 0,
            duration: 0.65,
            ease: "power3.out",
          });

          timeline.from(
            rest,
            { y: 18, opacity: 0, duration: 0.65, ease: "power3.out" },
            0.18,
          );
        });
      }

      // Rows fade nahi hoti, wipe hoti hain — apne upar wale kinare se
      // khulti hain, jaise list upar se neeche likhi ja rahi ho.
      function animateRowGroups() {
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
      }

      // Header ke neeche 1px ki line. Sajavat nahi: lambe single page pe
      // reader ko pata chalta hai ki wo kahan hai aur kitna bacha hai.
      function animateScrollProgress() {
        const progress = document.querySelector<HTMLElement>("[data-progress]");

        if (!progress) return;

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

      const context = gsap.context(() => {
        animateHeroLabel();
        animateHeroHeadline();
        animateHeroLead();
        animateHeroPhrase();
        animateRules();
        animateRisingBands();
        animateBeatSections();
        animateRowGroups();
        animateScrollProgress();
      });

      cleanup = () => {
        document.removeEventListener("click", scrollToAnchor);
        gsap.ticker.remove(sendFrameToLenis);
        lenis.destroy();
        context.revert();
      };
    }

    startAnimations();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return null;
}
