import Link from "next/link";
import { contact, nav } from "@/content/profile";
import { container } from "@/lib/layout";

/*
  Header.

  Resume ab yahan hai, footer mein nahi. Wajah: recruiter sabse pehle resume
  dhoondhta hai, aur footer tak pahunchne ke liye use poora page scroll karna
  padta tha. Nav har screen pe upar rehta hai — resume ka sabse sahi ghar wahi hai.

  Baaki nav link plain text hain aur resume ke chaaron taraf border hai. Isse
  bina kisi rang ke pata chal jata hai ki ye sirf jump nahi, ek file hai.
*/
export function SiteHeader({ nested = false }: { nested?: boolean }) {
  const linkPrefix = nested ? "/" : "";

  // header pe id="top" hai — contact footer ka "Back to top" link isi pe aata hai
  return (
    <header id="top" className="border-line relative border-b">
      {/*
        Wahi container jo har section use karta hai. Pehle yahan apni alag
        width (max-w-5xl) aur alag padding thi — isse 1024px se badi screen
        pe header ka naam hero ki heading se 190px andar khisak jata tha,
        aur poore page ka left edge do jagah se shuru hota dikhta tha.
      */}
      <div className={`${container} flex h-16 items-center justify-between`}>
        {nested ? (
          <Link
            href="/"
            className="font-heading hover:text-accent text-lg transition-colors"
          >
            ← {nav.name}
          </Link>
        ) : (
          <span className="font-heading text-lg">{nav.name}</span>
        )}

        <div className="flex items-center gap-5 sm:gap-7">
          <nav className="hidden gap-7 sm:flex">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={`${linkPrefix}${link.href}`}
                className="text-label text-ink-soft hover:text-accent -my-4 py-4 font-mono uppercase transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/*
            Phone pe email ka seedha raasta. Resume ke bagal mein rehta hai
            kyunki ye do hi kaam hain jo koi nav se karna chahta hai.
          */}
          <a
            href={`mailto:${contact.email}`}
            className="text-label text-ink-soft hover:text-accent -my-4 py-4 font-mono uppercase transition-colors sm:hidden"
          >
            Email
          </a>

          {/*
            Resume sirf tab dikhta hai jab public/resume.pdf maujood ho.
            Switch profile.ts mein hai — tooti hui resume link 404 deti hai
            aur recruiter wapas nahi aata.
          */}
          {contact.resume.ready && (
            <a
              href={contact.resume.href}
              target="_blank"
              rel="noreferrer"
              className="text-label text-ink border-line hover:border-accent hover:text-accent border px-3 py-1.5 font-mono uppercase transition-colors"
            >
              Resume ↗
            </a>
          )}
        </div>
      </div>

      {/*
        Scroll progress — header ke neeche 1px ki line.
        scaleX scroll ke saath badhta hai (SiteMotion). Lambe single page
        pe reader ko pata chalta hai ki wo kahan hai aur kitna bacha hai.
      */}
      <span
        data-progress
        aria-hidden="true"
        className="bg-accent absolute inset-x-0 -bottom-px block h-px origin-left"
      />
    </header>
  );
}
