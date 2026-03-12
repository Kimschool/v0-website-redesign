"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "react-i18next"

const cards = [
  {
    titleKey: "年間スケジュール",
    image: "/images/original_from_customer/年間スケジュール/7月コトバデー.jpg",
    href: "/school-life#schedule",
  },
  {
    titleKey: "クラブ活動",
    image: "/images/original_from_customer/クラブ活動/演劇部.jpg",
    href: "/school-life#clubs",
  },
  {
    titleKey: "施設案内",
    image: "/images/original_from_customer/施設案内/01_校舍全景.jpg",
    href: "/school-life#facilities",
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
    <section ref={sectionRef} id="school-life" className="py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            {t("schoolLife.title1")}{t("schoolLife.title2")}
          </h2>
        </div>

        {/* 3-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <Link
              key={card.titleKey}
              href={card.href}
              className={`group block overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 ${
                isVisible ? `animate-fade-in-up animation-delay-${(index + 1) * 200}` : "opacity-0"
              }`}
            >
              {/* Image */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.titleKey}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.2]"
                />
              </div>
              {/* Title + Link */}
              <div className="p-6 text-center">
                <h3 className="text-lg font-bold text-foreground mb-2">{card.titleKey}</h3>
                <span className="text-sm text-primary font-medium">
                  詳細を見る →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
