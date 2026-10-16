"use client";

import { useRef, useState } from "react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { askPanel } from "@/content/ask";
import { findFallbackAnswer } from "@/lib/ask-fallback";
import { container, sectionPadding } from "@/lib/layout";

/*
  Ask panel.

  Design ke do faisle, jo poore panel ki shakal tay karte hain:

  1. Ye koi floating chat bubble nahi hai. Bubble har doosri site pe neeche
     daayen kone mein baithi hoti hai, aur usey log ad samajh ke band kar dete hain.
     Ye page ka ek section hai — reader sab padh chuka hai, ab woh kured sakta hai.

  2. Chat ki shakal nahi hai: koi avatar nahi, koi message bubble nahi, history nahi.
     Ek sawaal, ek jawab. Panel ka kaam baat karna nahi hai — panel ka kaam ye
     dikhana hai ki jo cheez ZUNO karta hai, wahi is page pe chal rahi hai.
*/
export function AskPanel() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sourceLabel, setSourceLabel] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Pichhli request, taaki naya sawaal poochte waqt usey band kar sakein.
  // Warna do jawab ek saath ek hi box mein likhte hain.
  const currentRequest = useRef<AbortController | null>(null);

  async function askQuestion(askedQuestion: string) {
    const trimmedQuestion = askedQuestion.trim();
    if (trimmedQuestion.length === 0) return;

    currentRequest.current?.abort();
    const requestController = new AbortController();
    currentRequest.current = requestController;

    setQuestion(trimmedQuestion);
    setAnswer("");
    setSourceLabel("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question: trimmedQuestion }),
        signal: requestController.signal,
      });

      // Server batata hai ki jawab live bana hai, cache se aaya hai,
      // ya pehle se likha hua hai. Reader ko ye pata hona chahiye.
      const source = response.headers.get("x-ask-source");
      if (source === "cached") setSourceLabel(askPanel.sourceLabels.cached);
      else if (source === "fallback")
        setSourceLabel(askPanel.sourceLabels.fallback);
      else setSourceLabel(askPanel.sourceLabels.live);

      // Stream padhne ka raasta na mile to poora text ek baar mein le lo.
      if (!response.body) {
        setAnswer(await response.text());
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const piece = decoder.decode(value, { stream: true });
        setAnswer((previousAnswer) => previousAnswer + piece);
      }
    } catch (error) {
      // Naya sawaal poochne pe purani request abort hoti hai — woh galti nahi hai.
      if (error instanceof DOMException && error.name === "AbortError") return;

      /*
        Yahan pahunchne ka matlab hai ki API bilkul nahi mila — internet
        gaya, ya server hi down hai. Isliye pehle se likhe jawab client pe
        bhi rakhe hue hain.

        Haan, isse bundle mein kuch KB text aata hai. Trade-off jaan-boojh ke
        liya gaya: reader ko error dikhane se ek asli jawab dena behtar hai.
      */
      setSourceLabel(askPanel.sourceLabels.fallback);
      setAnswer(findFallbackAnswer(trimmedQuestion));
    } finally {
      if (currentRequest.current === requestController) {
        setIsLoading(false);
      }
    }
  }

  return (
    <section id="ask" className={`${container} ${sectionPadding}`}>
      <SectionHeading number="04">{askPanel.label}</SectionHeading>

      <p data-anim="rise" className="font-heading text-title mt-8 max-w-2xl">
        {askPanel.heading}
      </p>

      <p className="text-ink-soft mt-4 max-w-[62ch]">{askPanel.intro}</p>

      <form
        className="border-line mt-8 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-end sm:gap-6"
        onSubmit={(event) => {
          event.preventDefault();
          askQuestion(question);
        }}
      >
        {/* Label screen pe nahi dikhta, par screen reader ke liye zaroori hai */}
        <label htmlFor="ask-question" className="sr-only">
          {askPanel.heading}
        </label>

        {/*
          Sirf neeche ki line — poora box nahi. Box form jaisa lagta hai,
          aur ek line editorial page mein ghul jati hai.
        */}
        <input
          id="ask-question"
          name="question"
          type="text"
          autoComplete="off"
          maxLength={askPanel.maxQuestionLength}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder={askPanel.placeholder}
          className="text-ink border-line placeholder:text-ink-soft/60 focus:border-accent w-full border-b bg-transparent py-2 transition-colors outline-none"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="text-label text-ink-soft border-line hover:text-accent hover:border-accent cursor-pointer border px-4 py-3 font-mono uppercase transition-colors disabled:cursor-default disabled:opacity-50 sm:shrink-0"
        >
          {isLoading ? askPanel.loadingLabel : askPanel.submitLabel}
        </button>
      </form>

      {/*
        Suggested sawaal. Ye panel ka sabse kaam ka hissa hai — koi apne
        aap acha sawaal nahi sochta, aur khaali box ke saamne log kuch nahi likhte.

        Phone pe ek-ek line mein (flex-col). Teen sawaal the tab wrap theek
        tha, par chhe underline wale link ek saath wrap hone pe ye pata hi
        nahi chalta ki ek sawaal kahan khatam hua aur agla kahan shuru.
      */}
      <ul className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
        {askPanel.suggestions.map((suggestion) => (
          <li key={suggestion}>
            <button
              type="button"
              onClick={() => askQuestion(suggestion)}
              className="text-ink-soft hover:text-accent -my-1 cursor-pointer py-1.5 text-left text-sm underline decoration-dotted underline-offset-4 transition-colors"
            >
              {suggestion}
            </button>
          </li>
        ))}
      </ul>

      {/*
        Jawab.

        Yahan data-reveal JAAN-BOOJH KE nahi lagaya. ScrollReveal ka observer
        sirf page load pe maujood elements ko dekhta hai — baad mein bana
        element kabhi reveal nahi hota aur hamesha ke liye opacity 0 pe atak
        jata. Jo element JS se aata hai, usey reveal se door rakhna hai.
      */}
      {(isLoading || answer.length > 0) && (
        <div
          data-enter="1"
          aria-live="polite"
          className="border-line bg-paper-2 mt-8 border-t px-5 py-6 sm:px-6"
        >
          <p className="text-label text-ink-soft font-mono uppercase">
            {sourceLabel || askPanel.loadingLabel}
          </p>

          <p className="text-ink mt-4 max-w-[68ch] whitespace-pre-wrap">
            {answer}
            {/* Patli line jo bata deti hai ki jawab abhi likha ja raha hai */}
            {isLoading && (
              <span className="bg-accent ml-0.5 inline-block h-4 w-1.5 align-middle" />
            )}
          </p>
        </div>
      )}
    </section>
  );
}
