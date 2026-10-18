import Link from "next/link";
import { contact, nav } from "@/content/profile";
import { container } from "@/lib/layout";

/*
  Hover pe shabd "roll" karta hai: shabd do baar likha hai, ek doosre ke
  neeche. Bahar ka dabba overflow-hidden hai aur theek ek line ooncha
  (h-[1.3em] + leading-[1.3]), isliye sirf pehla shabd dikhta hai. Hover pe
  andar wala wrapper aadha upar khisakta hai — aadha = theek ek line, kyunki
  andar do hi line hain. Isi wajah se koi fix pixel nahi hai.

  Doosri copy aria-hidden hai, warna screen reader naam do baar bolta.
  Motion band ho to na roll chalta hai na sheen.

  Ye nav links aur Resume dono use karte hain, isliye alag function hai —
  wahi das line ka nested markup do jagah likhna padta tha.
*/
function RollingLabel({ label }: { label: string }) {
  return (
    <span className="relative inline-block h-[1.3em] overflow-hidden align-bottom leading-[1.3]">
      <span className="block transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1/2 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        <span className="block">{label}</span>
        <span className="text-accent block" aria-hidden="true">
          {label}
        </span>
      </span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-[110%] bg-[linear-gradient(100deg,transparent_20%,rgba(255,255,255,0.95)_50%,transparent_80%)] transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[110%] motion-reduce:hidden"
      />
    </span>
  );
}

/*
  Header. Resume yahan hai, footer mein nahi — recruiter sabse pehle resume
  dhoondhta hai. Baaki wajah DECISIONS.md section 8 mein.

  `nested` case study page ke liye hai: wahan wordmark ek "wapas jao" link ban
  jata hai aur section ke link `/` se shuru hote hain, warna wo
  /work/zuno#about pe jaate aur kuch nahi hota.
*/
export function SiteHeader({ nested = false }: { nested?: boolean }) {
  const linkPrefix = nested ? "/" : "";

  // id="top" pe footer ka "Back to top" aata hai.
  return (
    <header id="top" className="border-line relative border-b">
      <div className={`${container} flex h-16 items-center justify-between`}>
        {nested ? (
          <Link
            href="/"
            className="font-heading hover:text-accent group text-[20px] leading-none transition-colors sm:text-[23px]"
          >
            ← {nav.nameFirst}{" "}
            <span className="text-ink-soft group-hover:text-accent transition-colors">
              {nav.nameLast}
            </span>
          </Link>
        ) : (
          <span className="font-heading text-[20px] leading-none sm:text-[23px]">
            {nav.nameFirst}{" "}
            <span className="text-ink-soft">{nav.nameLast}</span>
          </span>
        )}

        <div className="flex items-center gap-3.5 sm:gap-7">
          <nav className="hidden gap-7 sm:flex">
            {nav.links.map((link) => (
              // py-4 / -my-4 bahar ke <a> pe hai, andar ke dabbe pe nahi —
              // overflow-hidden us padding ko kaat deta aur tap karne ki jagah
              // sirf 13px ki ek patli line reh jati.
              <a
                key={link.href}
                href={`${linkPrefix}${link.href}`}
                className="text-ink-soft motion-reduce:hover:text-accent group -my-4 py-4 font-mono text-[13px] tracking-[0.02em] transition-colors"
              >
                <RollingLabel label={link.label} />
              </a>
            ))}
          </nav>

          {/*
            Phone pe nav ki teen link chhupi hoti hain, isliye yahan ek hi
            shortcut. Roll wala hover jaan-boojh ke nahi: phone pe hover hota
            hi nahi, aur ek chhote link pe teen nested span bekaar hain.
          */}
          <a
            href={`${linkPrefix}${nav.contactShortcut.href}`}
            className="text-ink-soft hover:text-accent -my-4 py-4 font-mono text-[12.5px] tracking-[0.02em] transition-colors sm:hidden"
          >
            {nav.contactShortcut.label}
          </a>

          {/*
            Resume sirf tab dikhta hai jab profile.ts ka switch on ho — tooti
            hui resume link 404 deti hai aur recruiter wapas nahi aata.

            Khadi line phone pe chhupi rehti hai, kyunki wahan nav links hi
            nahi hote aur uska koi kaam nahi.
          */}
          {contact.resume.ready && (
            <>
              <span
                aria-hidden="true"
                className="bg-line hidden h-4 w-px sm:block"
              />

              <a
                href={contact.resume.href}
                target="_blank"
                rel="noreferrer"
                className="text-ink motion-reduce:hover:text-accent group -my-4 py-4 font-mono text-[12.5px] tracking-[0.02em] transition-colors sm:text-[13px]"
              >
                <RollingLabel label="Resume ↗" />
              </a>
            </>
          )}
        </div>
      </div>

      {/* Scroll progress — scaleX scroll ke saath badhta hai (SiteMotion) */}
      <span
        data-progress
        aria-hidden="true"
        className="bg-accent absolute inset-x-0 -bottom-px block h-px origin-left"
      />
    </header>
  );
}
