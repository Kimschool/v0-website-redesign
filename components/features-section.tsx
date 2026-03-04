"use client"

import { useEffect, useRef, useState } from "react"
import { 
  GraduationCap, 
  Users, 
  Globe, 
  Building2, 
  Calendar, 
  Award,
  BookOpen,
  HeartHandshake
} from "lucide-react"
import Link from "next/link"
import { useTranslation } from "react-i18next"

const featureIcons = [
  GraduationCap,
  Users,
  Globe,
  Building2,
  Calendar,
  Award,
  BookOpen,
  HeartHandshake,
]

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useTranslation()

  const features = t("features.items", { returnObjects: true }) as { title: string; description: string }[]

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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-sm font-medium text-primary mb-3">{t("features.label")}</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            {t("features.title")}
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
            {t("features.description")}
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = featureIcons[index]
            return (
              <div
                key={feature.title}
                className={`group text-center p-6 rounded-xl border border-border hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover-lift ${
                  isVisible ? `animate-fade-in-up animation-delay-${Math.min((index + 1) * 100, 600)}` : "opacity-0"
                }`}
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <IconComponent className="w-6 h-6 text-primary group-hover:text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className={`text-center mt-12 ${isVisible ? "animate-fade-in-up animation-delay-600" : "opacity-0"}`}>
          <Link
            href="#features-detail"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-foreground text-foreground text-sm font-medium rounded-full hover:bg-foreground hover:text-white transition-all duration-200"
          >
            {t("features.cta")}
          </Link>
        </div>
      </div>
    </section>
  )
}
