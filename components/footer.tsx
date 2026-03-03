import Link from "next/link"
import { Facebook, Instagram, Globe, MapPin, Phone, Mail } from "lucide-react"

const links = [
  { label: "KCP日本語教師養成講座", href: "#" },
  { label: "KCP US", href: "#" },
  { label: "KCP中国", href: "#" },
  { label: "KCP韓国", href: "#" },
  { label: "校長ブログ", href: "#" },
  { label: "情報公開", href: "#" },
]

const socialLinks = [
  { icon: Globe, label: "Website", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main footer content */}
      <div className="bg-primary py-20">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* School info */}
            <div className="lg:col-span-1">
              <p className="text-xs tracking-[0.3em] uppercase text-[#faf9f7]/60 font-light mb-3">
                学校法人KCP学園
              </p>
              <h3 className="text-2xl font-medium tracking-wider text-[#faf9f7] mb-8">
                KCP地球市民日本語学校
              </h3>
              <p className="text-sm font-light text-[#faf9f7]/80 leading-loose tracking-wide">
                日本語教育を通じて世界をつなぐ。<br />
                ともにまなび、ともに生きる。
              </p>
            </div>

            {/* Contact info */}
            <div className="lg:col-span-1">
              <h4 className="text-sm font-medium tracking-[0.2em] uppercase text-[#faf9f7] mb-8">
                Contact
              </h4>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#faf9f7]/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-light text-[#faf9f7]/90 leading-relaxed tracking-wide">
                      〒169-0074<br />
                      東京都新宿区北新宿3-27-1
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#faf9f7]/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-accent" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-light text-[#faf9f7]/90 tracking-wide">
                    03-3367-6789
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#faf9f7]/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-accent" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-light text-[#faf9f7]/90 tracking-wide">
                    info@kcp.ac.jp
                  </p>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="lg:col-span-1">
              <h4 className="text-sm font-medium tracking-[0.2em] uppercase text-[#faf9f7] mb-8">
                Links
              </h4>
              <nav className="flex flex-col gap-4" aria-label="Footer navigation">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm font-light text-[#faf9f7]/70 hover:text-accent transition-colors duration-300 tracking-wide"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#151d29] py-8">
        <div className="mx-auto max-w-7xl px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link 
                  key={social.label}
                  href={social.href} 
                  aria-label={social.label} 
                  className="w-10 h-10 rounded-full bg-[#faf9f7]/5 flex items-center justify-center text-[#faf9f7]/60 hover:bg-accent hover:text-[#faf9f7] transition-all duration-300"
                >
                  <social.icon className="h-4 w-4" strokeWidth={1.5} />
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-xs font-light text-[#faf9f7]/50 tracking-wider">
              Copyright {"\u00A9"} 2025 KCP地球市民日本語学校. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
