import { ContactForm } from "@/components/sections/ContactForm";
import { contact, nav } from "@/content/profile";
import { container, sectionPadding } from "@/lib/layout";

/*
  Page ka aakhri section. Do column:

    baayen (7)  — sawaal, ek line, aur form
    daayen (5)  — seedhe raaste: email, phone, location, GitHub, LinkedIn

  Donon ek saath isliye hain ki do tarah ke log aate hain. Recruiter ko
  email address chahiye — wo copy karke apne ATS mein daalta hai. Founder
  ya engineer ko likhna hota hai — uske liye form hai. Ek ko doosre ka
  raasta nahi rokna chahiye.

  Daayen column ki rows wahi hairline shakal hain jo Stack section mein hai.
  Poore page pe ek hi tarah ki list dikhti hai — design "system" isi
  dohraav se lagta hai, har section ke apne rang se nahi.
*/
export function ContactFooter() {
  return (
    <footer id="contact" className="border-line bg-paper-2 border-t">
      <div className={`${container} ${sectionPadding}`}>
        <h2 className="text-label text-ink-soft font-mono uppercase">
          Contact
        </h2>

        <div className="mt-8 grid gap-12 md:grid-cols-12 md:gap-16">
          <div data-anim="rise" className="md:col-span-7">
            {/*
              Sawaal, suchna nahi. "Get in touch" reader se kuch nahi maangta;
              "What are you building?" ke baad wo apne aap jawab sochne lagta hai.
            */}
            <h3 className="font-heading text-3xl leading-[1.08] md:text-5xl">
              {contact.heading}
            </h3>

            <p className="text-lead mt-5 max-w-[46ch]">{contact.line}</p>

            <ContactForm />
          </div>

          <div className="md:col-span-5">
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
                    {/*
                      Location ka koi href nahi hai, isliye wo plain text hai.
                      Baaki sab click karne layak hain — phone pe tel: link
                      seedha dialer kholta hai.
                    */}
                    {channel.href === null ? (
                      <span className="text-[15px]">{channel.value}</span>
                    ) : (
                      <a
                        href={channel.href}
                        target={channel.external ? "_blank" : undefined}
                        rel={channel.external ? "noreferrer" : undefined}
                        className="hover:text-accent flex items-baseline gap-3 text-[15px] transition-colors"
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

          {/*
            Single page hai aur contact sabse neeche. Yahan pahunch ke reader
            ke paas wapas jaane ka koi rasta nahi tha — header screen se
            bahar ja chuka hota hai.
          */}
          <a
            href="#top"
            className="text-label text-ink-soft hover:text-accent font-mono uppercase transition-colors"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
