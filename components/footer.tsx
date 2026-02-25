import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"

const links = [
  { label: "KCP日本語教師養成講座", href: "#" },
  { label: "KCP US", href: "#" },
  { label: "KCP中国", href: "#" },
  { label: "KCP韓国", href: "#" },
  { label: "校長ブログ", href: "#" },
  { label: "情報公開", href: "#" },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* School name bar */}
      <div className="bg-[#1a2332] py-4">
        <p className="text-center text-sm font-medium tracking-widest text-[#faf9f7]">
          {"KCP地球市民日本語学校"}
        </p>
      </div>

      {/* Footer content */}
      <div className="bg-[#faf9f7] text-foreground">
        <div className="mx-auto max-w-7xl px-6 py-10">
          {/* Social icons */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <Link href="#" aria-label="KCP Website" className="text-muted-foreground hover:text-accent transition-colors">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </Link>
            <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-accent transition-colors">
              <Facebook className="h-5 w-5" strokeWidth={1.5} />
            </Link>
            <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-accent transition-colors">
              <Instagram className="h-5 w-5" strokeWidth={1.5} />
            </Link>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-border mb-8" />

          {/* Navigation links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-8" aria-label="Footer navigation">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs font-light text-muted-foreground hover:text-accent transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-center text-xs font-light text-muted-foreground tracking-wide">
            {"Copyright \u00A9 2025"}
          </p>
        </div>
      </div>
    </footer>
  )
}
