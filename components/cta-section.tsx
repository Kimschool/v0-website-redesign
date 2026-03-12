"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, FileText, HelpCircle } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "react-i18next"

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="admission" className="py-24 lg:py-32 bg-gradient-cyan">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section header */}
        <div className={`text-center mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-sm font-medium text-white/60 mb-3">{t("cta.label")}</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
            {t("cta.title")}
          </h2>
          <p className="mt-4 text-base text-white/80 max-w-xl mx-auto">
            {t("cta.description")}
          </p>
        </div>

        {/* CTA cards */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
          {/* Admission Guide */}
          <Link
            href="#admission-detail"
            className="group flex items-center gap-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift"
          >
            <div className="shrink-0 w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
              <FileText className="h-7 w-7 text-primary group-hover:text-white" strokeWidth={1.5} />
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

          {/* Contact */}
          <Link
            href="#contact"
            className="group flex items-center gap-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift"
          >
            <div className="shrink-0 w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
              <HelpCircle className="h-7 w-7 text-primary group-hover:text-white" strokeWidth={1.5} />
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
    </section>
  )
}
