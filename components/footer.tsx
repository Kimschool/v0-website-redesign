import Link from "next/link"
import { Facebook, Instagram, Globe } from "lucide-react"

const quickLinks = [
  { label: "KCPについて", href: "#about" },
  { label: "コース紹介", href: "#education" },
  { label: "入学案内", href: "#admission" },
  { label: "学校生活", href: "#school-life" },
  { label: "お問い合わせ", href: "#contact" },
]

const relatedLinks = [
  { label: "KCP日本語教師養成講座", href: "#" },
  { label: "KCP US", href: "#" },
  { label: "KCP中国", href: "#" },
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
    <footer className="bg-white border-t border-border">
      {/* Main footer content */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* School info */}
            <div className="lg:col-span-1">
              <p className="text-xs text-muted-foreground font-medium mb-2">
                {"学校法人KCP学園"}
              </p>
              <h3 className="text-lg font-bold text-foreground mb-4">
                {"KCP地球市民日本語学校"}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {"〒169-0074"}
                <br />
                {"東京都新宿区北新宿3-27-1"}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {"TEL: 03-3367-6789"}
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-sm font-bold text-foreground mb-4">
                {"メニュー"}
              </h4>
              <nav className="flex flex-col gap-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Related links */}
            <div>
              <h4 className="text-sm font-bold text-foreground mb-4">
                {"関連リンク"}
              </h4>
              <nav className="flex flex-col gap-3">
                {relatedLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-sm font-bold text-foreground mb-4">
                {"フォローする"}
              </h4>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <Link 
                    key={social.label}
                    href={social.href} 
                    aria-label={social.label} 
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-200"
                  >
                    <social.icon className="h-4 w-4" strokeWidth={1.5} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border py-6">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              {"Copyright"} {"\u00A9"} {"2025 KCP地球市民日本語学校. All rights reserved."}
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                {"プライバシーポリシー"}
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                {"利用規約"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
