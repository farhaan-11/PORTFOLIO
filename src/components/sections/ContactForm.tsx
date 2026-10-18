"use client";

import { type SubmitEvent, useState } from "react";
import { contactForm } from "@/content/profile";
import { contactFieldLimits } from "@/lib/contact-fields";

/*
  Teen field se zyada kuch nahi poocha jata. Field ke box nahi hain, sirf
  neeche ek line — box wala form page pe chipka hua widget lagta hai.

  Form ka apna koi "sent" jhooth nahi hai: jab tak server haan nahi kehta,
  success line dikhti hi nahi. (DECISIONS.md section 9)
*/

type FormStatus = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "border-line focus:border-accent mt-2 w-full border-0 border-b bg-transparent py-2 outline-none transition-colors";

const labelClass = "text-label text-ink-soft font-mono uppercase";

// Poora email validation regex se nahi ho sakta (aur jo karte hain wo asli
// address reject kar dete hain). Yahan sirf shakal dekhi ja rahi hai.
function looksLikeEmail(value: string) {
  return value.includes("@") && value.includes(".");
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Honeypot. Ye field screen pe dikhti hi nahi, isliye asli insaan ise kabhi
  // nahi bharta — bot har field bhar deta hai.
  const [company, setCompany] = useState("");

  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorText, setErrorText] = useState("");

  function showError(text: string) {
    setStatus("error");
    setErrorText(text);
  }

  async function sendMessage(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
      showError(contactForm.errorEmpty);
      return;
    }

    if (!looksLikeEmail(email)) {
      showError(contactForm.errorEmail);
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });

      if (response.status === 429) {
        showError(contactForm.errorLimit);
        return;
      }

      if (!response.ok) {
        showError(contactForm.errorServer);
        return;
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      // Internet chala gaya, ya request beech mein kat gayi.
      showError(contactForm.errorServer);
    }
  }

  return (
    <form onSubmit={sendMessage} className="mt-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            {contactForm.nameLabel}
          </label>
          <input
            id="contact-name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={contactFieldLimits.maxNameLength}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClass}>
            {contactForm.emailLabel}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            maxLength={contactFieldLimits.maxEmailLength}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="contact-message" className={labelClass}>
          {contactForm.messageLabel}
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          maxLength={contactFieldLimits.maxMessageLength}
          rows={4}
          placeholder={contactForm.messagePlaceholder}
          className={`${fieldClass} placeholder:text-ink-soft/60 resize-y`}
        />
      </div>

      {/*
        Honeypot. `hidden` nahi, `sr-only` jaisa bhi nahi — screen reader ise
        padh sakta hai isliye label saaf likha hai aur autocomplete band hai.
        tabIndex -1 se keyboard wala banda ispe galti se nahi pahunchta.
      */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="contact-company">Company (leave this empty)</label>
        <input
          id="contact-company"
          name="company"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="text-label text-ink border-ink hover:text-accent hover:border-accent mt-5 cursor-pointer border-b pt-3 pb-2 font-mono uppercase transition-colors disabled:cursor-default disabled:opacity-50"
      >
        {status === "sending"
          ? contactForm.submitSending
          : contactForm.submitIdle}
      </button>

      {/*
        Jawab button ke neeche, usi jagah — reader ne abhi jo dabaya hai,
        jawab wahin milna chahiye.

        data-enter (CSS animation) use hota hai, GSAP nahi: ye element JS se
        baad mein banta hai, aur scroll-trigger usey kabhi nahi pakad sakta.
      */}
      {status === "sent" && (
        <p
          data-enter="1"
          className="text-label text-accent mt-5 font-mono uppercase"
        >
          {contactForm.success}
        </p>
      )}

      {status === "error" && (
        <p data-enter="1" className="text-ink-soft mt-5 text-sm">
          {errorText}
        </p>
      )}
    </form>
  );
}
