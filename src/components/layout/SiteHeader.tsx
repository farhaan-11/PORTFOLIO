import { contact, nav } from "@/content/profile";

/*
  Page ka sabse upar wala patla bar: naam left, links right, neeche ek hairline.

  Sticky jaan-boojh ke nahi rakha — woh phone pe 60px hamesha kha leta hai,
  aur uske neeche content padhne ke liye backdrop blur lagana padta hai.
  Wahi "template se uthaya hua" feel deta hai.
*/
export function SiteHeader() {
  return (
    <header className="border-line border-b">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 md:px-8">
        {/* Logo nahi, naam. Ye homepage hai — isliye link nahi, sirf text. */}
        <span className="font-heading text-base font-medium tracking-tight">
          {nav.name}
        </span>

        {/* Desktop pe teeno jump links */}
        <nav className="hidden gap-7 sm:flex">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-label text-ink-soft hover:text-cobalt font-mono uppercase transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/*
          Phone pe hamburger ke bajaye ek hi kaam ka link.
          Teen anchor links ke liye menu kholna-band karna faltu hai —
          aur phone pe log scroll karte hain, menu kholte nahi.

          py-4 jagah ke liye nahi hai: bina iske link sirf 12px uncha hota
          hai aur ungli se miss ho jata hai. Ab 44px ka hai.
          -mr-2 isliye taaki padding badhne ke baad bhi text screen ke
          kinare se utni hi doori pe rahe jitni naam baayen taraf hai.
        */}
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
