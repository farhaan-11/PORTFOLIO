import { about } from "@/content/profile";
import { container, sectionPadding } from "@/lib/layout";

/*
  About — poore page ki ek jagah jahan reader Farhan ko sunta hai, uske kaam ko nahi.
  Isliye yahan koi number, koi stack, koi link nahi. Sirf teen paragraph.
*/
export function About() {
  return (
    <section id="about" className={`${container} ${sectionPadding}`}>
      <h2 className="text-label text-ink-soft font-mono uppercase">About</h2>

      <div className="mt-10 max-w-[62ch] space-y-6">
        {about.map((paragraph) => (
          <p key={paragraph} data-reveal className="text-lead">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
