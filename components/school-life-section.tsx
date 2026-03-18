"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { Calendar, Users, Building2, ArrowRight } from "lucide-react"

const cards = [
  {
    titleKey: "年間スケジュール",
    description: "四季折々のイベントと充実した学校行事",
    image: `/images/original_from_customer/${encodeURIComponent('年間スケジュール')}/${encodeURIComponent('7月コトバデー')}.jpg`,
    href: "/school-life#schedule",
    icon: Calendar,
  },
  {
    titleKey: "クラブ活動",
    description: "仲間と共に成長する課外活動",
    image: `/images/original_from_customer/${encodeURIComponent('クラブ活動')}/${encodeURIComponent('演劇部')}.jpg`,
    href: "/school-life#clubs",
    icon: Users,
  },
  {
    titleKey: "施設案内",
    description: "最新設備と快適な学習環境",
    image: `/images/original_from_customer/${encodeURIComponent('施設案内')}/${encodeURIComponent('01_校舍全景')}.jpg`,
    href: "/school-life#facilities",
    icon: Building2,
  },
]

export function SchoolLifeSection() {
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
    <section ref={sectionRef} id="school-life" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="mx-auto max-w-7xl px-6 relative">
        {/* Section heading */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          {/* Section badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            SCHOOL LIFE
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight font-serif">
            {t("schoolLife.title1")}{t("schoolLife.title2")}
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            学びだけでなく、仲間との絆を深める充実した学校生活
          </p>
        </div>

        {/* 3-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {cards.map((card, index) => {
            const Icon = card.icon
            return (
              <Link
                key={card.titleKey}
                href={card.href}
                className={`group block overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 card-glow ${
                  isVisible ? `animate-fade-in-up animation-delay-${(index + 1) * 200}` : "opacity-0"
                }`}
              >
                {/* Title (top text box) */}
                <div className="px-6 pt-6 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors font-serif leading-snug">
                      {card.titleKey}
                    </h3>
                    {/* Icon badge */}
                    <div className="w-11 h-11 shrink-0 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm transform transition-all duration-300 group-hover:scale-105 group-hover:rotate-2">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="aspect-[4/3] relative overflow-hidden mx-6 rounded-2xl">
                  <Image
                    src={card.image}
                    alt={card.titleKey}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Description + CTA (bottom text box) */}
                <div className="p-6 pt-5">
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {card.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                    <span>詳細を見る</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
