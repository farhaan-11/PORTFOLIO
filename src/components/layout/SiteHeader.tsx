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
        {/*
          Wordmark 18px se 23px. 18px pe ye 12px mono links ke saamne naam
          nahi, ek aur label lagta tha. Surname ink-soft mein hai - isse
          pehla naam pehle padha jata hai bina koi naya rang laaye
          (accent sirf section number, link aur hero ke phrase ka hai).
        */}
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
            {nav.nameFirst} <span className="text-ink-soft">{nav.nameLast}</span>
          </span>
        )}

        <div className="flex items-center gap-3.5 sm:gap-7">
          <nav className="hidden gap-7 sm:flex">
            {/*
              Hover = "roll". Shabd do baar likha hai, ek doosre ke neeche.
              Bahar ka dabba overflow-hidden hai aur theek ek line ooncha
              (h-[1.3em] + leading-[1.3]), isliye sirf pehla shabd dikhta hai.
              Hover pe andar wala wrapper aadha upar khisakta hai: aadha =
              theek ek line, kyunki andar do hi line hain. Isi wajah se koi
              fix pixel nahi hai - font-size badlo to bhi roll sahi rahega.

              Upar se ek roshni (sheen) baayein se daayein guzarti hai.

              Doosri copy aria-hidden hai, warna screen reader naam do baar
              bolta. Motion band ho to na roll chalta hai na roshni - tab
              sirf rang badalta hai (motion-reduce:*).

              py-4 / -my-4 bahar wale <a> pe hai, andar ke dabbe pe nahi:
              overflow-hidden us padding ko kaat deta aur click ka area sirf
              13px ki ek patli line reh jata.
            */}
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={`${linkPrefix}${link.href}`}
                className="text-ink-soft motion-reduce:hover:text-accent group -my-4 py-4 font-mono text-[13px] tracking-[0.02em] transition-colors"
              >
                <span className="relative inline-block h-[1.3em] overflow-hidden leading-[1.3] align-bottom">
                  <span className="block transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1/2 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                    <span className="block">{link.label}</span>
                    <span className="text-accent block" aria-hidden="true">
                      {link.label}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -translate-x-[110%] bg-[linear-gradient(100deg,transparent_20%,rgba(255,255,255,0.95)_50%,transparent_80%)] transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[110%] motion-reduce:hidden"
                  />
                </span>
              </a>
            ))}
          </nav>

          {/*
            Phone pe nav ki teen link chhupi hoti hain, isliye yahan ek hi
            shortcut rehta hai - contact section tak. Resume ke bagal mein,
            kyunki phone pe yahi do kaam hote hain.

            Roll wala hover yahan jaan-boojh ke nahi hai: phone pe hover hota
            hi nahi, aur ek chhote link pe teen nested span bekaar hain.
          */}
          <a
            href={`${linkPrefix}${nav.contactShortcut.href}`}
            className="text-ink-soft hover:text-accent -my-4 py-4 font-mono text-[12.5px] tracking-[0.02em] transition-colors sm:hidden"
          >
            {nav.contactShortcut.label}
          </a>

          {/*
            Resume sirf tab dikhta hai jab profile.ts ka switch on ho —
            tooti hui resume link 404 deti hai aur recruiter wapas nahi aata.

            Pehle iske chaaron taraf border thi. Poore header mein wahi ek
            dabba tha, isliye aankh baar-baar wahin jaati thi — jabki resume
            teen cheezon mein se ek hi cheez hai. Ab uski jagah ek patli khadi
            line hai: utna hi alag dikhta hai, bina chillaye. ↗ batata hai ki
            ye page ka jump nahi, bahar khulne wali file hai.

            Line phone pe chhupi rehti hai, kyunki wahan nav links hi nahi
            hote — sirf Email aur Resume, aur unke beech line ka koi kaam nahi.
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
                <span className="relative inline-block h-[1.3em] overflow-hidden leading-[1.3] align-bottom">
                  <span className="block transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1/2 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                    <span className="block">Resume ↗</span>
                    <span className="text-accent block" aria-hidden="true">
                      Resume ↗
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -translate-x-[110%] bg-[linear-gradient(100deg,transparent_20%,rgba(255,255,255,0.95)_50%,transparent_80%)] transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[110%] motion-reduce:hidden"
                  />
                </span>
              </a>
            </>
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
