import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { contact, nav } from "@/content/profile";
import { container, sectionPadding } from "@/lib/layout";

/*
  Page ka aakhri section. Yahan reader ne sab padh liya hai, ab usey
  sirf ek cheez chahiye: email. Isliye email sabse bada element hai.
*/
export function ContactFooter() {
  return (
    <footer id="contact" className="border-line bg-paper-2 border-t">
      <div className={`${container} ${sectionPadding}`}>
        <h2 className="text-label text-ink-soft font-mono uppercase">
          Contact
        </h2>

        <div
          data-reveal
          className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          {/* Email khud ek link hai — click karne pe mail app khulta hai */}
          <a
            href={`mailto:${contact.email}`}
            className="font-heading hover:text-cobalt text-2xl font-medium break-all transition-colors md:text-3xl"
          >
            {contact.email}
          </a>

          <div className="sm:shrink-0">
            <CopyEmailButton email={contact.email} />
          </div>
        </div>

        {/*
          Location chhupana sabse badi galti hoti: recruiter maan leta hai
          ki kuch gadbad hai. Isliye seedha, email ke neeche.
        */}
        <p className="text-ink-soft mt-6">
          {contact.location} · {contact.relocation}
        </p>

        <div className="border-line mt-12 flex flex-col gap-6 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {contact.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-label text-ink-soft hover:text-cobalt font-mono uppercase transition-colors"
                >
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>

          <p className="text-label text-ink-soft font-mono uppercase">
            {nav.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
