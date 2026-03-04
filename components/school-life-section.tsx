"use client"

import { useEffect, useRef, useState } from "react"
import { Calendar, Users, Building2, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useTranslation } from "react-i18next"

const itemIcons = [Calendar, Users, Building2, MapPin]
const itemLinks = ["#schedule", "#clubs", "#facilities", "#access"]

export function SchoolLifeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useTranslation()

  const items = t("schoolLife.items", { returnObjects: true }) as { label: string }[]

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
    <section ref={sectionRef} id="school-life" className="py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className={`relative ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/school-life.jpg"
                alt={t("schoolLife.label")}
                fill
                className="object-cover"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 max-w-[200px]">
              <p className="text-3xl font-bold text-primary mb-1">50+</p>
              <p className="text-sm text-muted-foreground">{t("schoolLife.eventsCount")}</p>
            </div>
          </div>

          {/* Right - Content */}
          <div className={isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}>
            <p className="text-sm font-medium text-primary mb-3">{t("schoolLife.label")}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
              {t("schoolLife.title1")}
              <br />
              {t("schoolLife.title2")}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {t("schoolLife.description")}
            </p>

            {/* Quick links grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {items.map((item, index) => {
                const IconComponent = itemIcons[index]
                return (
                  <Link
                    key={item.label}
                    href={itemLinks[index]}
                    className={`group flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary hover:bg-secondary transition-all duration-200 ${
                      isVisible ? `animate-fade-in-up animation-delay-${(index + 3) * 100}` : "opacity-0"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors duration-200">
                      <IconComponent className="h-5 w-5 text-primary group-hover:text-white" strokeWidth={1.5} />
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </Link>
                )
              })}
            </div>

            <Link
              href="#school-life-detail"
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-200"
            >
              {t("schoolLife.cta")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
