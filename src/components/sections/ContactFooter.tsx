import { ContactForm } from "@/components/sections/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contact, nav } from "@/content/profile";
import { container, sectionPadding } from "@/lib/layout";

/*
  Page ka aakhri section. Do column:

    baayen (7)  — sawaal, ek line, aur form
    daayen (5)  — seedhe raaste: email, phone, location, GitHub, LinkedIn

  Dono ek saath isliye hain ki do tarah ke log aate hain: recruiter ko email
  address chahiye, founder ya engineer ko likhna hota hai. Ek ko doosre ka
  raasta nahi rokna chahiye.

  Do column `lg` se shuru hote hain, `md` se nahi — 768px pe daayen column
  sirf 260px ka bachta tha aur email beech se toot ke do line mein aata tha.
*/
export function ContactFooter() {
  return (
    <footer id="contact" className="border-line bg-paper-2 border-t">
      <div className={`${container} ${sectionPadding}`}>
        {/* Number nahi — footer index ka hissa nahi, page ka aakhir hai */}
        <SectionHeading>Contact</SectionHeading>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div data-anim="rise" className="lg:col-span-7">
            {/* Sawaal, suchna nahi. "Get in touch" reader se kuch nahi
                maangta; is sawaal ke baad wo apne aap jawab sochne lagta hai. */}
            <h3 className="font-heading text-3xl leading-[1.08] sm:text-4xl lg:text-5xl">
              {contact.heading}
            </h3>

            <p className="text-lead mt-5 max-w-[46ch]">{contact.line}</p>

            <ContactForm />
          </div>

          <div className="lg:col-span-5">
            {/* 1px `line`, 2px `ink` nahi: ye section nahi kholta, sirf list
                shuru karta hai. (DECISIONS.md section 5) */}
            <span data-rule className="bg-line block h-px" />

            <dl data-anim-group>
              {contact.channels.map((channel) => (
                <div
                  key={channel.label}
                  data-anim="row"
                  className="border-line flex items-baseline gap-4 border-b py-4"
                >
                  <dt className="text-label text-ink-soft w-20 shrink-0 font-mono uppercase">
                    {channel.label}
                  </dt>

                  <dd className="min-w-0 flex-1">
                    {/* Location ka koi href nahi hai, isliye wo plain text hai */}
                    {channel.href === null ? (
                      <span className="text-[15px]">{channel.value}</span>
                    ) : (
                      <a
                        href={channel.href}
                        target={channel.external ? "_blank" : undefined}
                        rel={channel.external ? "noreferrer" : undefined}
                        className="hover:text-accent -my-1 flex items-baseline gap-3 py-1 text-[15px] transition-colors"
                      >
                        <span className="break-all">{channel.value}</span>
                        {channel.external && (
                          <span aria-hidden="true" className="ml-auto shrink-0">
                            ↗
                          </span>
                        )}
                      </a>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="text-ink-soft mt-5 text-sm">{contact.availability}</p>
          </div>
        </div>

        <div className="border-line mt-12 flex items-center justify-between border-t pt-8">
          <p className="text-label text-ink-soft font-mono uppercase">
            {nav.name}
          </p>

          {/* Single page hai aur contact sabse neeche. Yahan pahunch ke reader
              ke paas wapas jaane ka koi rasta nahi tha — header screen se
              bahar ja chuka hota hai. */}
          <a
            href="#top"
            className="text-label text-ink-soft hover:text-accent -my-2 py-2 font-mono uppercase transition-colors"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
