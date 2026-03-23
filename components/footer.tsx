"use client"

import Link from "next/link"
import Image from "next/image"
import { FileText, HelpCircle, ArrowRight, MapPin, Phone, Mail } from "lucide-react"
import { useTranslation } from "react-i18next"

const quickLinkHrefs = ["/about", "/education", "/admission", "/school-life", "/contact"]
const relatedLinkHrefs = ["https://www.kcpyosei.com/", "https://www.kcpinternational.com/", "https://www.kcpkorea.com/", "https://www.kcp.ac.jp/blog/", "/basic-info"]

const carouselImages = [
  `/images/original_from_customer/${encodeURIComponent('ローリング')}/${encodeURIComponent('コトバデイー1')}.jpg`,
  `/images/original_from_customer/${encodeURIComponent('ローリング')}/${encodeURIComponent('寿司作り')}.JPG`,
  `/images/original_from_customer/${encodeURIComponent('ローリング')}/${encodeURIComponent('新聞部2')}.jpg`,
  `/images/original_from_customer/${encodeURIComponent('ローリング')}/${encodeURIComponent('浴衣販売')}.jpg`,
  `/images/original_from_customer/${encodeURIComponent('ローリング')}/${encodeURIComponent('演劇部2')}.jpg`,
  `/images/original_from_customer/${encodeURIComponent('ローリング')}/${encodeURIComponent('琴2')}.JPG`,
  `/images/original_from_customer/${encodeURIComponent('ローリング')}/${encodeURIComponent('端午の節句1')}.JPG`,
]

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
}

function WeiboIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443zM9.05 17.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.991-.406-1.593.379-.595 1.176-.861 1.793-.583.631.272.826.98.442 1.574zm1.27-1.627c-.141.237-.449.353-.689.253-.236-.09-.313-.361-.177-.586.138-.227.436-.346.672-.24.239.09.315.36.194.573zm.176-2.719c-1.893-.493-4.033.45-4.857 2.118-.836 1.704-.026 3.591 1.886 4.21 1.983.64 4.318-.341 5.132-2.145.8-1.752-.104-3.639-2.161-4.183zM17.934 6.844c-1.469-.404-2.534-.16-3.27.484-.188.164-.109.485.131.533l.054.009c.242.042.672.116.896.326.076.072.067.183-.019.252-.547.445-1.479 1.468-1.076 2.944.021.076-.049.147-.126.134a4.351 4.351 0 00-.575-.052c-2.727-.131-5.357 1.287-6.726 3.545-1.697 2.803-.9 5.992 1.963 7.433 2.955 1.487 6.801.362 8.508-2.592 1.722-2.971.941-6.404-1.76-7.016zm2.693.478c.219-.082.303-.353.17-.547-.879-1.283-2.285-2.088-3.893-2.136-.212-.006-.359.205-.282.405.023.059.056.105.108.139.392.257.73.586.984.977.054.084.134.14.227.161.589.137 1.118.416 1.54.816.089.084.212.112.327.077l.162-.049c.155-.047.294-.13.394-.248.157-.184.229-.384.263-.595zm.95-3.065c-1.549-2.169-4.016-3.309-6.713-3.278-.345.004-.483.426-.192.582.066.035.139.053.213.052.569-.009 1.133.064 1.681.218.328.092.635.228.918.401.085.052.181.077.279.072a8.006 8.006 0 012.464.659c.082.035.175.039.259.012.26-.084.483-.234.649-.438.258-.32.4-.701.442-1.08v-.2z"/>
    </svg>
  )
}

const socialLinks = [
  { icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com/kcpchikyushimin/?locale=ja_JP" },
  { icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/kcp_yosei/" },
  { icon: FacebookIcon, label: "Facebook2", href: "https://www.facebook.com/kcpchikyushimin" },
  { icon: WeiboIcon, label: "Weibo", href: "https://passport.weibo.com/visitor/visitor?entry=miniblog&a=enter&url=https%3A%2F%2Fweibo.com%2Fkcp30&domain=weibo.com" },
]

export function Footer() {
  const { t } = useTranslation()

  const quickLinks = t("footer.quickLinks", { returnObjects: true }) as { label: string }[]
  const relatedLinks = t("footer.related", { returnObjects: true }) as { label: string }[]

  // Double the images for seamless infinite scroll
  const doubledImages = [...carouselImages, ...carouselImages]

  return (
    <footer className="bg-background border-t border-border/50">
      {/* Infinite scrolling image carousel */}
      <div className="overflow-hidden py-8 bg-muted/30">
        <div className="footer-carousel-track flex gap-4">
          {doubledImages.map((src, index) => (
            <div key={index} className="flex-shrink-0 w-52 h-36 relative rounded-xl overflow-hidden group">
              <Image
                src={src}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-primary via-primary/95 to-accent/90 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
        
        <div className="mx-auto max-w-5xl px-6 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight font-serif">
              {t("cta.title")}
            </h2>
            <p className="mt-5 text-lg text-white/80 max-w-xl mx-auto">
              {t("cta.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/admission"
              className="group flex items-center gap-6 p-8 bg-white rounded-2xl shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
                <FileText className="h-7 w-7 text-white" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {t("cta.admission.title")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("cta.admission.description")}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
            </Link>
            <Link
              href="/contact"
              className="group flex items-center gap-6 p-8 bg-white rounded-2xl shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg shadow-accent/30 group-hover:scale-110 transition-transform duration-300">
                <HelpCircle className="h-7 w-7 text-white" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {t("cta.contact.title")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("cta.contact.description")}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer catch */}
      <div className="py-6 bg-primary/5 border-y border-primary/10">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-foreground font-serif">
            {t("logoBottom")}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {t("hero.title1")}
            {t("hero.titleHighlight")}
            {t("hero.title2")}
          </p>
        </div>
      </div>

      {/* Main footer content */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* School info */}
            <div className="lg:col-span-1">
              <p className="text-xs text-muted-foreground font-medium mb-2 uppercase tracking-wider">
                {t("logoTop")}
              </p>
              <h3 className="text-lg font-bold text-foreground mb-6 font-serif">
                {t("logoBottom")}
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                  <p className="leading-relaxed">
                    {t("footer.address.postalCode")}
                    <br />
                    {t("footer.address.address")}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <p>{t("footer.address.tel")}</p>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-sm font-bold text-foreground mb-5 uppercase tracking-wider">
                {t("footer.menu")}
              </h4>
              <nav className="flex flex-col gap-3">
                {quickLinks.map((link, index) => (
                  <Link
                    key={link.label}
                    href={quickLinkHrefs[index]}
                    className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Related links */}
            <div>
              <h4 className="text-sm font-bold text-foreground mb-5 uppercase tracking-wider">
                {t("footer.relatedLinks")}
              </h4>
              <nav className="flex flex-col gap-3">
                {relatedLinks.map((link, index) => {
                  const href = relatedLinkHrefs[index]
                  const isExternal = href.startsWith("http")
                  return (
                    <Link
                      key={link.label}
                      href={href}
                      className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200"
                      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-sm font-bold text-foreground mb-5 uppercase tracking-wider">
                {t("footer.follow")}
              </h4>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
              
              {/* Contact email */}
              <div className="mt-6 pt-6 border-t border-border/50">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  <a href="mailto:info@kcp.ac.jp" className="hover:text-primary transition-colors">
                    info@kcp.ac.jp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/50 py-6 bg-muted/30">
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
              <Link href="/basic-info" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                {t("footer.disclosure")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
