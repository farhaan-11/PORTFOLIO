import { nextTime } from "@/content/zuno";
import { container, sectionPadding } from "@/lib/layout";

/*
  "What I'd change next time" — is poore page ka sabse valuable section.

  Yahan koi number, koi stack, koi link nahi. Sirf prose, bade size mein,
  homepage ke About jaisi hi shakal — kyunki ye bhi wahi cheez hai:
  ek jagah jahan reader kaam ko nahi, banda ko sunta hai.

  Teen baatein, aur teeno abhi tak tooti hui hain. Isko kabhi "lessons learned"
  jaisi safe list mat banana — jo cheez abhi theek nahi hui, usey theek
  likhne se poora page jhootha ho jata hai.
*/
export function CaseStudyNextTime() {
  return (
    <section className={`${container} ${sectionPadding}`}>
      <h2 className="text-label text-ink-soft font-mono uppercase">
        What I&apos;d change next time
      </h2>

      <div className="mt-8 max-w-[62ch] space-y-5">
        {nextTime.map((paragraph) => (
          <p key={paragraph} data-reveal className="text-lead">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
