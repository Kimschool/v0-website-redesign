"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { ArrowRight, GraduationCap, BookOpen, Trophy } from "lucide-react"

type Highlight = {
  category: string
  subtitle: string
  schools: string[]
}

const HIGHLIGHT_ICONS = [GraduationCap, BookOpen, Trophy] as const
const HIGHLIGHT_COLORS = ["#0085b2", "#0cc0df", "#22d3ee"] as const

export function EducationPointsSection() {
  const { t, i18n } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const admissionHighlights = useMemo(() => {
    const raw = t("educationPointsSection.highlights", { returnObjects: true })
    if (!Array.isArray(raw)) return [] as Highlight[]
    return raw as Highlight[]
  }, [t, i18n.language])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-muted/50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />

      <div className="mx-auto max-w-7xl px-6 relative">
        {/* Section heading */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            {t("educationPointsSection.label")}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-serif">
            {t("educationPointsSection.title")}
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("educationPointsSection.subtitle")}
          </p>
        </div>

        {/* POINT 1 */}
        <div className={`mb-20 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-bold text-white bg-gradient-to-r from-primary to-primary/80 px-4 py-2 rounded-full shadow-lg shadow-primary/20">
              {t("educationPointsSection.point1")}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold font-serif">{t("educationPointsSection.courseIntroTitle")}</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="aspect-[16/10] relative rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src={`/images/original_from_customer/${encodeURIComponent('トップページ「コース紹介」')}.jpg`}
                alt={t("educationPointsSection.altCourseImage")}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="lg:pl-4">
              <p className="text-muted-foreground leading-relaxed text-lg mb-6 whitespace-pre-line">
                {t("educationPointsSection.courseIntroBody")}
              </p>
              <Link href="/education#course1" className="group inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                {t("educationPointsSection.viewDetails")}{" "}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* POINT 2 */}
        <div className={`mb-20 ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-bold text-white bg-gradient-to-r from-primary to-primary/80 px-4 py-2 rounded-full shadow-lg shadow-primary/20">
              {t("educationPointsSection.point2")}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold font-serif">{t("educationPointsSection.lessonContentTitle")}</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="lg:order-2 aspect-[16/10] relative rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src={`/images/original_from_customer/${encodeURIComponent('トップページ「授業内容」')}.jpg`}
                alt={t("educationPointsSection.altLessonImage")}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="lg:order-1 lg:pr-4">
              <p className="text-muted-foreground leading-relaxed text-lg mb-6 whitespace-pre-line">
                {t("educationPointsSection.lessonContentBody")}
              </p>
              <Link href="/education#course2" className="group inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                {t("educationPointsSection.viewDetails")}{" "}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* POINT 3 */}
        <div className={`${isVisible ? "animate-fade-in-up animation-delay-400" : "opacity-0"}`}>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-bold text-white bg-gradient-to-r from-primary to-primary/80 px-4 py-2 rounded-full shadow-lg shadow-primary/20">
              {t("educationPointsSection.point3")}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold font-serif">{t("educationPointsSection.resultsTitle")}</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed text-lg max-w-3xl mb-10 whitespace-pre-line">
            {t("educationPointsSection.resultsBody")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {admissionHighlights.map((item, index) => {
              const Icon = HIGHLIGHT_ICONS[index] ?? GraduationCap
              const color = HIGHLIGHT_COLORS[index] ?? "#0085b2"
              return (
                <div
                  key={`${item.category}-${index}`}
                  className={`relative rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col h-full border border-border/50 card-glow overflow-hidden group ${
                    isVisible ? `animate-fade-in-up animation-delay-${(index + 5) * 100}` : "opacity-0"
                  }`}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
                    style={{ backgroundColor: color }}
                  />

                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color }} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-foreground">{item.category}</h4>
                      <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4 flex-1">
                    {item.schools.map((name) => (
                      <li key={name} className="flex items-center gap-2 text-sm text-foreground">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                        {name}
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs text-muted-foreground pt-4 border-t border-border/50">
                    {t("educationPointsSection.representativeNote")}
                  </p>
                </div>
              )
            })}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/education#course3"
              className="group inline-flex items-center gap-3 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold text-base px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {t("educationPointsSection.viewMoreResults")}
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
