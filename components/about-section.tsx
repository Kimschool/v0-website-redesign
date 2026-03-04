"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useTranslation } from "react-i18next"

const featureImages = [
  "https://weavus-group.com/kcp/wp-content/uploads/2025/11/EJU.jpg",
  "https://weavus-group.com/kcp/wp-content/uploads/2025/07/31e0362326d434d6dbc1d2390aa01eff.jpg",
  "https://weavus-group.com/kcp/wp-content/uploads/2025/11/2aaf315dd8c8254983b5ed098691efcd-rotated.jpg",
  "https://weavus-group.com/kcp/wp-content/uploads/2025/11/1f9820d2152d8e9bcc962b8600ef019d.jpg",
  "https://weavus-group.com/kcp/wp-content/uploads/2025/11/c6d0b891872831f84c0c747a5da2a261.jpg",
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useTranslation()

  const features = t("about.features", { returnObjects: true }) as { title: string; description: string }[]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-sm font-medium text-primary mb-3">{t("about.label")}</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            {t("about.title1")}
            <br />
            {t("about.title2")}
          </h2>
          <p className="mt-6 text-base text-muted-foreground max-w-2xl mx-auto">
            {t("about.description1")}
            <br />
            {t("about.description2")}
          </p>
        </div>

        {/* Feature cards grid - 5 columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer ${
                isVisible ? `animate-fade-in-up animation-delay-${(index + 1) * 100}` : "opacity-0"
              }`}
            >
              <img
                src={featureImages[index]}
                alt={feature.title}
                className="absolute inset-0 w-full h-full object-cover img-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-sm font-bold text-white mb-1">{feature.title}</h3>
                <p className="text-xs text-white/70">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className={`text-center mt-12 ${isVisible ? "animate-fade-in-up animation-delay-600" : "opacity-0"}`}>
          <Link
            href="#about-detail"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-foreground text-foreground text-sm font-medium rounded-full hover:bg-foreground hover:text-white transition-all duration-200"
          >
            {t("about.cta")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
