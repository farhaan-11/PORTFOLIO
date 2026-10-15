import { constraints } from "@/content/zuno";
import { container, sectionPadding } from "@/lib/layout";

/*
  Problem section — chaar constraints.

  Rows, cards nahi. Chaar rounded cards wahi shakal hai jo har portfolio pe hai;
  aur card mein chaaron barabar lagte hain, jabki yahan baat ye hai ki chaaron
  ek saath hain — isliye list hi theek hai.

  Heading "The problem" nahi, "What made it hard" hai: problem to har project
  mein hoti hai, mushkil kya thi — ye padhne layak cheez hai.
*/
export function CaseStudyConstraints() {
  return (
    <section className={`${container} ${sectionPadding}`}>
      <h2 className="text-label text-ink-soft font-mono uppercase">
        What made it hard
      </h2>

      <div className="border-line mt-8 border-t">
        {constraints.map((constraint) => (
          <div
            key={constraint.title}
            data-reveal
            className="border-line border-b py-8 md:grid md:grid-cols-12 md:gap-10"
          >
            <div className="md:col-span-4">
              <p className="text-label text-accent font-mono uppercase">
                {constraint.label}
              </p>
              <h3 className="font-heading mt-3 text-xl">{constraint.title}</h3>
            </div>

            <p className="text-ink-soft mt-3 max-w-[62ch] md:col-span-8 md:mt-0">
              {constraint.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
