// Har section ka ek hi sar: number, naam, aur neeche poori chaudai ki line.
//
// Ye line 2px aur `ink` mein hai, jabki rows ki hairline 1px `line` mein hai.
// Dono ek jaisi hone se "naya section" aur "ek row khatam" ek jaise dikhte the.
// (DECISIONS.md section 5)
//
// `number` optional hai — footer ko number nahi milta, wo index ka hissa nahi.
export function SectionHeading({
  number,
  children,
}: {
  number?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-label flex items-baseline gap-3 font-mono uppercase">
        {number && <span className="text-accent tabular-nums">{number}</span>}
        <span className="text-ink-soft">{children}</span>
      </h2>

      {/* data-rule: ye line baayen se daayen khud khinchti hai (SiteMotion) */}
      <span data-rule className="bg-ink mt-5 block h-0.5" />
    </div>
  );
}
