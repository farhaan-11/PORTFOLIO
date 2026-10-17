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

      /*
        Font aane ka intezaar — ye optional nahi hai.

        SplitText heading ko LINES mein todta hai, aur line kahan tootegi ye
        wo usi waqt ke font se naapta hai. Font abhi aaya nahi to naap
        fallback (Georgia) se hota hai, jiske akshar chaude hain — aur jo
        line break us waqt bana, wo hamesha ke liye jam jata hai, kyunki
        ek baar div ban gaye to text dobara beh nahi sakta.

        Isi wajah se hero ki headline kabhi-kabhi ek-ek shabd ki chhe
        alag line mein toot jaati thi.
      */
      await document.fonts.ready;

      if (cancelled) return;

      const context = gsap.context(() => {
        /*
          HERO — akshar dar akshar.

          SplitText headline ko lines AUR chars dono mein todta hai. Mask
          lines pe hai, aur akshar usi mask ke neeche se upar aate hain —
          fade nahi. Yahi ek move poore page ka tone set karta hai.

          Pehle poori line ek saath uthti thi. Letter-by-letter 17 Oct 2026
          ko Farhan ne choose kiya, chaar versions live dekhne ke baad.
        */
        const headline = document.querySelector<HTMLElement>(
          '[data-anim="hero-headline"]',
        );

        /*
          Teeno hero tween alag-alag hain, ek timeline mein nahi.

          Pehle ye ek timeline thi. Par headline ka split ab font aane ke
          baad hota hai, yaani baad mein — aur tab tak timeline chal ke
          khatam ho chuki hoti thi. Us khatam hui timeline mein tween jodne
          se wo kabhi chalta hi nahi tha, aur headline mask ke peeche
          chhupi reh jaati thi. Poori headline gayab.

          Delay se wahi tarteeb banti hai, bina kisi ke intezaar ke:
            0.00s  label
            0.30s  headline
            0.70s  lead
        */
        gsap.from('[data-anim="hero-label"]', {
          y: 10,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        });

        if (headline) {
          /*
            autoSplit: window resize hone pe SplitText lines dobara naapta
            hai. Iske bina ek baar bana break hamesha ke liye rehta hai —
            phone ko ghumao ya window chhoti karo, headline wahi purane
            break pe atki rehti hai.

            Animation sirf pehli baar chalti hai. Dobara split hone pe nayi
            line ke div bilkul saaf bante hain, yaani apni normal jagah pe
            dikhte hain — isliye yahan content ke chhupe reh jaane ka
            koi khatra nahi hai.
          */
          let introAdded = false;

          /*
            type "lines,chars": todta chars mein hai (har akshar alag uthta
            hai) par mask LINES pe hai, chars pe nahi. Agar mask har akshar
            pe hota to 'y' aur 'p' ki poonch (descender) kat jaati — har
            akshar ka apna dabba uski poonch se chhota hota hai.

            Lines ka mask ye kaam saaf karta hai: akshar line ke mask ke
            neeche se upar aate hain, aur poonch kahin nahi katti.
          */
          SplitText.create(headline, {
            type: "lines,chars",
            mask: "lines",
            autoSplit: true,
            onSplit: (split) => {
              if (introAdded) return;
              introAdded = true;

              /*
                Letter by letter. Timing jaan-boojh ke kasi hui hai:

                stagger 0.018s — 24 akshar × 0.018 = sirf 0.43s mein saare
                akshar chal padte hain. 0.05s rakha hota to headline poori
                hone mein 1.5s lagte aur reader daava padhne se pehle hi
                intezaar karta.

                duration 0.6s (0.95 nahi) — har akshar ka safar chhota hai,
                isliye use utna waqt chahiye hi nahi; lamba rakhne se akshar
                aalsi lagte hain.
              */
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

        gsap.from('[data-anim="hero-lead"]', {
          y: 14,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.7,
        });

        /*
          HERO ka phrase — highlighter aur likhai, ek hi harkat.

          Do tween saath chalte hain: highlight ki chaudai 0 se 100% hoti hai,
          aur usi raftaar se akshar ek-ek karke dikhte hain. Aankh ko lagta hai
          ki marker aage chal raha hai aur uske peeche se shabd nikal rahe hain.

          Dono ki raftaar barabar rakhi gayi hai: 29 akshar × 0.012s = 0.35s,
          plus har akshar ka apna 0.25s — yaani dono lagbhag 0.6s mein poore.
          Agar stagger bada kar diya to marker shabdon se aage nikal jayega aur
          jod toot jayega.

          delay 1.05s: lead 0.7s pe aana shuru karti hai aur ~1.4s pe thamti
          hai. Phrase usi beech aata hai — jaan-boojh ke. Poori lead ke rukne
          ka intezaar karte to padhne wala ek baithe hue vaakya mein ek khaali
          jagah dekhta, aur wo animation nahi, bug lagta hai.

          Yahan clip-path nahi hai: phone pe ye phrase do line mein toot sakta
          hai, aur clip ek hi chaukor kaatata hai — doosri line adhoori reh
          jati. Akshar inline hain, isliye wo line ke saath khud beh jate hain.
        */
        const phrase = document.querySelector<HTMLElement>(
          '[data-anim="hero-phrase"]',
        );

        if (phrase) {
          gsap.from(phrase, {
            backgroundSize: "0% 100%",
            duration: 0.6,
            ease: "power2.inOut",
            delay: 1.05,
          });

          /*
            type "words,chars", sirf "chars" nahi.

            Sirf chars se har akshar apna alag inline-block dabba ban jata hai,
            aur line kisi bhi DO AKSHARON ke beech se toot sakti hai - phone pe
            "syllabus" bilkul beech se toot ke "syllabu" aur "s" ban gaya tha.

            Words jodne se har shabd ek dabba ban jata hai aur akshar us dabbe
            ke andar rehte hain, isliye shabd sabut rehta hai aur line sirf
            shabdon ke beech se tootti hai - jaise normal text mein hoti hai.
          */
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
