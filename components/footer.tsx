"use client"

import Link from "next/link"
import { Facebook, Instagram, Globe } from "lucide-react"
import { useTranslation } from "react-i18next"

const quickLinkHrefs = ["#about", "#education", "#admission", "#school-life", "#contact"]
const relatedLinkHrefs = ["#", "#", "#", "#", "#"]

const socialLinks = [
  { icon: Globe, label: "Website", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
]

export function Footer() {
  const { t } = useTranslation()

  const quickLinks = t("footer.quickLinks", { returnObjects: true }) as { label: string }[]
  const relatedLinks = t("footer.related", { returnObjects: true }) as { label: string }[]

  return (
    <div className="w-full">
      <div className="elementor-element elementor-element-aac8410 e-flex e-con-boxed e-con e-parent" data-id="aac8410" data-element_type="container">
        <div className="e-con-inner">
          <div className="elementor-element elementor-element-c103459 elementor-widget elementor-widget-text-editor" data-id="c103459" data-element_type="widget" data-widget_type="text-editor.default">
            <div className="elementor-widget-container"> <h1><strong>関連リンク</strong></h1>
            </div>
          </div>
        </div>
      </div>
      <div className="elementor-element elementor-element-958eaf1 e-flex e-con-boxed e-con e-parent" data-id="958eaf1" data-element_type="container"> <div className="e-con-inner">
        <div className="elementor-element elementor-element-bb99857 elementor-widget elementor-widget-text-editor" data-id="bb99857" data-element_type="widget" data-widget_type="text-editor.default">
          <div className="elementor-widget-container">
            <p><a href="https://weavus-group.com/kcp/apply/">入学案内</a>
              <a href="https://weavus-group.com/kcp/service/">学校生活</a>
              <a href="https://weavus-group.com/kcp/contact/">お問い合わせ</a></p> </div> </div> </div> </div>
      <footer className="bg-white border-t border-border">
        {/* Main footer content */}
        <div className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* School info */}
              <div className="lg:col-span-1">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  {t("logoTop")}
                </p>
                <h3 className="text-lg font-bold text-foreground mb-4">
                  {t("logoBottom")}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("footer.address.postalCode")}
                  <br />
                  {t("footer.address.address")}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {t("footer.address.tel")}
                </p>
              </div>

              {/* Quick links */}
              <div>
                <h4 className="text-sm font-bold text-foreground mb-4">
                  {t("footer.menu")}
                </h4>
                <nav className="flex flex-col gap-3">
                  {quickLinks.map((link, index) => (
                    <Link
                      key={link.label}
                      href={quickLinkHrefs[index]}
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
                  {t("footer.relatedLinks")}
                </h4>
                <nav className="flex flex-col gap-3">
                  {relatedLinks.map((link, index) => (
                    <Link
                      key={link.label}
                      href={relatedLinkHrefs[index]}
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
                  {t("footer.follow")}
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
                {t("footer.copyright")}
              </p>
              <div className="flex items-center gap-6">
                <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.privacy")}
                </Link>
                <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  {t("footer.terms")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      )
}
