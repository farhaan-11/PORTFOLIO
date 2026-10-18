import { intro } from "@/content/zuno";
import { container, sectionPadding } from "@/lib/layout";

/*
  Case study ka pehla screen. Homepage ke hero jaisi hi shakal: mono label,
  badi headline, do line, phir ledger rows.

  Wahi shape dobara isliye ki reader ko lage ki ye usi site ka andar ka page
  hai — naye page pe naya layout "do alag templates" jaisa lagta hai.
*/
export function CaseStudyIntro() {
  return (
    <section data-anim-beat className={`${container} ${sectionPadding}`}>
      <div data-beat="lead">
        <p className="text-label text-ink-soft font-mono uppercase">
          {intro.label}
        </p>

        <h1 className="font-heading text-display mt-6 max-w-[18ch]">
          {intro.title}
        </h1>

        <p className="text-ink-soft mt-3 text-lg">{intro.tagline}</p>
      </div>

      {/* 62ch pe roka hua — lambi line padhne mein aankh kho jati hai */}
      <div data-beat="rest" className="mt-8 max-w-[62ch] space-y-5">
        {intro.summary.map((paragraph) => (
          <p key={paragraph} className="text-lead">
            {paragraph}
          </p>
        ))}
      </div>

      <a
        data-beat="rest"
        href={intro.link}
        target="_blank"
        rel="noreferrer"
        className="text-label text-accent mt-8 inline-block font-mono underline underline-offset-4"
      >
        {intro.linkLabel} ↗
      </a>

      {/* Role, period, stack, scale — chaaron ek saath, taaki recruiter 10
          second mein scope samajh le aur phir prose padhe */}
      <dl data-beat="rest" className="border-line mt-12 border-t">
        {intro.meta.map((row) => (
          <div
            key={row.label}
            className="border-line flex flex-col gap-1 border-b py-4 sm:flex-row sm:gap-8"
          >
            <dt className="text-label text-ink-soft font-mono uppercase sm:w-28 sm:shrink-0 sm:pt-1">
              {row.label}
            </dt>
            <dd>{row.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
