import { about, aboutAvailability } from "@/content/profile";
import { container, sectionPadding } from "@/lib/layout";

/*
  About — page ki ek hi jagah jahan reader Farhan ko sunta hai, uske kaam ko nahi.
  Isliye yahan koi number, koi stack list, koi link nahi.

  Aakhri line baaki teen se alag hai: teen paragraph batate hain ki ye banda kya
  hai, aakhri line batati hai ki ab kya chahiye. Isliye wo hairline ke neeche hai
  aur thodi bhaari.

  Yahan cobalt jaan-boojh ke nahi diya. Poore page pe wo rang sirf hero ke ek
  phrase pe hai — do jagah hote hi dono kamzor ho jate. Aur poora vaakya cobalt
  mein ho to log use link samajh ke click karne lagte hain.
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

      <p
        data-reveal
        className="border-line text-lead mt-10 max-w-[62ch] border-t pt-6 font-medium"
      >
        {aboutAvailability}
      </p>
    </section>
  );
}
