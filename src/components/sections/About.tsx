import { SectionHeading } from "@/components/ui/SectionHeading";
import { about, aboutAvailability } from "@/content/profile";
import { container, sectionPadding } from "@/lib/layout";

/*
  About — page ki ek hi jagah jahan reader Farhan ko sunta hai, uske kaam ko nahi.
  Isliye yahan koi number, koi stack list, koi link nahi.

  Aakhri line baaki teen se alag hai: teen paragraph batate hain ki ye banda kya
  hai, aakhri line batati hai ki ab kya chahiye. Isliye wo hairline ke neeche hai
  aur thodi bhaari.

  Yahan accent jaan-boojh ke nahi diya — section number ke alawa, jo har
  section ko milta hai. Do wajah: is section mein click karne layak kuch nahi
  hai, aur poora vaakya accent mein ho to log usey link samajh ke click karne
  lagte hain. Accent ka poora rule globals.css mein likha hai.
*/
export function About() {
  return (
    <section id="about" className={`${container} ${sectionPadding}`}>
      <SectionHeading number="01">About</SectionHeading>

      <div data-anim="rise" className="mt-8 max-w-[62ch] space-y-5">
        {about.map((paragraph) => (
          <p key={paragraph} className="text-lead">
            {paragraph}
          </p>
        ))}
      </div>

      <p
        data-anim="rise"
        className="border-line text-lead mt-8 max-w-[62ch] border-t pt-6 font-medium"
      >
        {aboutAvailability}
      </p>
    </section>
  );
}
