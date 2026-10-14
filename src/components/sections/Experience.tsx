import { experience } from "@/content/profile";
import { container, sectionPadding } from "@/lib/layout";

/*
  Experience ek ledger hai, showcase nahi.

  Heading "Where I've worked" hai, "Experience" nahi — "Selected work" aur
  "Experience" sunne mein ek jaise lagte hain aur reader ko lagta hai
  ki wahi cheez dobara aa gayi.

  Yahan kabhi description ya bullet mat add karna. Work section prose hai,
  ye sirf role-company-tareekh hai. Dono ki shakal alag rehni chahiye —
  wahi inhe repeat lagne se bachata hai.
*/
export function Experience() {
  return (
    <section className={`${container} ${sectionPadding}`}>
      <h2 className="text-label text-ink-soft font-mono uppercase">
        Where I&apos;ve worked
      </h2>

      <div className="border-line mt-10 border-t">
        {experience.map((job) => (
          <div
            key={`${job.company}-${job.period}`}
            data-reveal
            className="border-line flex flex-col gap-1 border-b py-6 md:flex-row md:items-baseline md:justify-between md:gap-8"
          >
            <p className="font-heading font-medium">
              {job.role}
              {/* Company halki hai taaki role pehle padha jaye */}
              <span className="text-ink-soft font-body font-normal">
                {" "}
                · {job.company}
              </span>
            </p>

            <p className="text-label text-ink-soft font-mono uppercase md:shrink-0">
              {job.period}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
