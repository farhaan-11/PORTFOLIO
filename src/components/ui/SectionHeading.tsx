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

  Ye line 2px hai aur `ink` mein hai, jabki rows ki hairline 1px `line`
  mein hai. 16 Oct 2026 tak dono bilkul ek jaisi thi (1px, `line`), aur
  wahi ek asli problem thi:

  "Yahan naya section shuru hua" wali line, aur "yahan ek row khatam hui"
  wali line, dono ek jaisi dikhti thi. Page pe aisi 10-12 linein hain.
  Jo line har jagah ho, wo seema banana band kar deti hai — aankh ko ek
  lambi ladder dikhti thi, paanch alag hisse nahi.

  Ab page pe do hi weight hain: ek bhaari line section kholti hai, halki
  linein uske andar ki rows baantti hain. Broadsheet newspaper bilkul yahi
  karte hain — section kicker ke neeche mota rule, items ke beech hairline.

  Dhyaan: footer ke daayen column ka divider jaan-boojh ke 1px `line` hai.
  Wo section nahi kholta, sirf list shuru karta hai.

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

      <span data-rule className="bg-ink mt-5 block h-0.5" />
    </div>
  );
}
