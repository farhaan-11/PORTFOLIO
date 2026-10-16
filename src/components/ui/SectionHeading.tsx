/*
  Har section ka ek hi sar.

  Pehle har section ki shuruaat ek 12px ki halki mono line thi — "ABOUT",
  "SELECTED WORK", "STACK". Teeno ek jaisi, teeno halki, aur unke neeche
  kuch nahi. Lambe page pe aankh ko pata hi nahi chalta tha ki naya hissa
  shuru hua; poora page ek hi awaaz mein padha jata tha.

  Ab teen cheezein ek saath hoti hain:

    01 — SELECTED WORK
    ──────────────────────────────────────  (poori chaudai ki hairline)

  Number accent mein hai. Ye poore page ka ek hi aisa rang hai jo dohrata
  hai, aur isi dohraav se page "index" lagta hai — jo iske design ka naam
  hi hai. Ek-ek jagah alag rang lagane se ye kabhi nahi aata.

  Hairline khud khinchti hai (data-rule, SiteMotion) — isliye ye border
  nahi, asli element hai.

  number optional hai: footer ko number nahi milta. Wo index ka hissa nahi,
  page ka aakhir hai.
*/
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
        {number && (
          <span className="text-accent tabular-nums">{number}</span>
        )}
        <span className="text-ink-soft">{children}</span>
      </h2>

      <span data-rule className="bg-line mt-5 block h-px" />
    </div>
  );
}
