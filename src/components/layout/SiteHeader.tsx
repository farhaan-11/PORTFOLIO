import Link from "next/link";
import { contact, nav } from "@/content/profile";


export function SiteHeader({ nested = false }: { nested?: boolean }) {
  const linkPrefix = nested ? "/" : "";

  return (
    <header className="border-line border-b">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 md:px-8">
        
        {nested ? (
        
          <Link
            href="/"
            className="font-heading hover:text-cobalt text-base font-medium tracking-tight transition-colors"
          >
            ← {nav.name}
          </Link>
        ) : (
          <span className="font-heading text-base font-medium tracking-tight">
            {nav.name}
          </span>
        )}

       
        <nav className="hidden gap-7 sm:flex">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={`${linkPrefix}${link.href}`}
              className="text-label text-ink-soft hover:text-cobalt font-mono uppercase transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

       
        <a
          href={`mailto:${contact.email}`}
          className="text-label text-ink-soft hover:text-cobalt -mr-2 px-2 py-4 font-mono uppercase transition-colors sm:hidden"
        >
          Email
        </a>
      </div>
    </header>
  );
}
