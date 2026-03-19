'use client'

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { School, User, ArrowRight } from "lucide-react"
import { useTranslation } from "react-i18next"

export function AboutSection() {
  const { t } = useTranslation()

  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([])

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

  const history = [
    {
      year: t("aboutPage.history.0.year"),
      title: t("aboutPage.history.0.title"),
      description: ""
    },
    {
      year: t("aboutPage.history.1.year"),
      title: t("aboutPage.history.1.title"),
      description: t("aboutPage.history.1.description")
    },
    {
      year: t("aboutPage.history.2.year"),
      title: t("aboutPage.history.2.title"),
      description: ""
    },
    {
      year: t("aboutPage.history.3.year"),
      title: t("aboutPage.history.3.title"),
      description: ""
    },
    {
      year: t("aboutPage.history.4.year"),
      title: t("aboutPage.history.4.title"),
      description: ""
    },
    {
      year: t("aboutPage.history.5.year"),
      title: t("aboutPage.history.5.title"),
      description: ""
    },
    {
      year: t("aboutPage.history.6.year"),
      title: t("aboutPage.history.6.title"),
      description: t("aboutPage.history.6.description")
    },
    {
      year: t("aboutPage.history.7.year"),
      title: t("aboutPage.history.7.title"),
      description: ""
    },
    {
      year: t("aboutPage.history.8.year"),
      title: t("aboutPage.history.8.title"),
      description: ""
    },
    {
      year: t("aboutPage.history.9.year"),
      title: t("aboutPage.history.9.title"),
      description: t("aboutPage.history.9.description")
    },
    {
      year: t("aboutPage.history.10.year"),
      title: t("aboutPage.history.10.title"),
      description: t("aboutPage.history.10.description")
    },
  ]

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    timelineRefs.current.forEach((ref, index) => {
      if (!ref) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set(prev).add(index))
          }
        },
        { threshold: 0.1 }
      )
      observer.observe(ref)
      observers.push(observer)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <section ref={sectionRef} id="about" className="bg-background">
      {/* Page Banner - aligned with other sections */}
      <div className="relative h-[350px] md:h-[400px] w-full overflow-hidden">
        <Image
          src={`/images/original_from_customer/${encodeURIComponent('トップ背景')}/${encodeURIComponent('01_KCPとは（拡大して周りの建物があまり見えないように）')}.jpg`}
          alt={t("aboutPage.bannerTitle")}
          fill
          className="object-cover object-[center_35%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 flex items-center justify-center pt-16 px-4">
          <div className={`text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              {t("aboutPage.bannerTitle")}
            </h1>
            <div className="w-20 h-1 bg-white/80 mx-auto mt-6 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Philosophy Section - Bold typographic approach */}
      <div className="relative bg-white">
        <div className="container mx-auto px-4 md:px-6 py-24 md:py-32">
          <div className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            {/* Large Philosophy Statement */}
            <div className="max-w-6xl mx-auto mb-20">
              <div className="mb-16">
                <div className="relative max-w-4xl mx-auto aspect-[583/336]">
                  <Image
                    src="/images/about-kcp-values.png"
                    alt={t("aboutPage.bannerTitle")}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Student Photos - Asymmetric Grid */}
      <div className="bg-[#f8fafb] py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-12 gap-4 md:gap-6 max-w-7xl mx-auto">
            {/* Large Image */}
            <div className="col-span-12 md:col-span-7 relative group">
              <div className="aspect-[4/5] md:aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={`/images/original_from_customer/${encodeURIComponent('予備')}/K.jpg`}
                  alt="Student image 1"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
            
            {/* Stacked Images */}
            <div className="col-span-12 md:col-span-5 flex flex-col gap-4 md:gap-6">
              <div className="relative group flex-1">
                <div className="aspect-square md:aspect-auto md:h-full rounded-2xl overflow-hidden">
                  <Image
                    src={`/images/original_from_customer/${encodeURIComponent('予備')}/${encodeURIComponent('学生2【予備】')}.jpg`}
                    alt="Student image 2"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
              <div className="relative group flex-1">
                <div className="aspect-square md:aspect-auto md:h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/images/original_from_customer/818e60bf0c192652f5fe869245e46afb-1-scaled.jpg"
                    alt="Student image 3"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Principal Section - Magazine Style */}
      <div className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-16">
              <span className="text-[#0085b2] text-sm tracking-[0.2em] uppercase font-medium">Message</span>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-[#0085b2]/30 to-transparent" />
            </div>

            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
              {/* Principal Photo */}
              <div className="relative">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <Image
                    src={`/images/original_from_customer/${encodeURIComponent('校長先生')}.jpg`}
                    alt={t("aboutPage.principalTitle")}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Info Card */}
                <div className="absolute -bottom-8 -right-4 md:-right-8 bg-white rounded-xl shadow-xl p-6 max-w-xs border border-gray-100">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0085b2]/10 flex items-center justify-center">
                        <School className="w-5 h-5 text-[#0085b2]" />
                      </div>
                      <span className="text-sm text-gray-700">{t("aboutPage.schoolFoundation")}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0085b2]/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-[#0085b2]" />
                      </div>
                      <span className="text-sm text-gray-700 font-medium">{t("aboutPage.principalName")}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Principal Message */}
              <div className="md:pt-12">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                  {t("aboutPage.principalTitle")}
                </h2>
                <div className="space-y-6 text-gray-600 text-base md:text-lg leading-relaxed">
                  <p>{t("aboutPage.principalMessage1")}</p>
                  <p>{t("aboutPage.principalMessage2")}</p>
                  <p>{t("aboutPage.principalMessage3")}</p>
                  <p>{t("aboutPage.principalMessage4")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* History Section - Modern Timeline */}
      <div className="bg-[#0a1628] text-white py-24 md:py-32 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-20">
              <span className="inline-block text-[#0cc0df] text-sm tracking-[0.3em] uppercase mb-4">Our Journey</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">{t("aboutPage.historyTitle")}</h2>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Center Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#0085b2] via-[#0cc0df] to-[#0085b2]" />

              <div className="space-y-8 md:space-y-12">
                {history.map((item, index) => {
                  const isItemVisible = visibleItems.has(index)
                  const isEven = index % 2 === 0
                  
                  return (
                    <div
                      key={index}
                      ref={el => { timelineRefs.current[index] = el }}
                      className={`relative flex items-start gap-8 transition-all duration-1000 
                        ${isItemVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                        ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}
                      `}
                      style={{ transitionDelay: isItemVisible ? `${index * 100}ms` : "0ms" }}
                    >
                      {/* Content */}
                      <div className={`flex-1 pl-12 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                          <span className="text-3xl md:text-4xl font-bold text-[#0cc0df] block mb-2">{item.year}</span>
                          <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{item.title}</h3>
                          {item.description && (
                            <p className="text-white/60 text-sm">{item.description}</p>
                          )}
                        </div>
                      </div>

                      {/* Dot */}
                      <div className="absolute left-4 md:left-1/2 top-6 w-4 h-4 -translate-x-1/2 rounded-full bg-[#0cc0df] shadow-lg shadow-[#0cc0df]/50 z-10" />

                      {/* Hidden spacer for desktop */}
                      <div className="hidden md:block flex-1" />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Section - Full Width Image */}
      <div className="relative">
        {/* Staff Photo Background */}
        <div className="relative min-h-[85vh] md:h-[70vh]">
          <Image
            src={`/images/original_from_customer/${encodeURIComponent('KCPとは「集合写真」')}.jpg`}
            alt={t("aboutPage.staffPhoto")}
            fill
            className="object-cover"
          />
          {/* Stronger overlay on mobile for better readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50 md:from-black/80 md:via-black/40 md:to-black/20" />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-3xl">
                <span className="inline-block text-[#0cc0df] text-sm tracking-[0.2em] uppercase mb-4">Support System</span>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                  {t("aboutPage.supportTitle")}
                </h2>
                <div className="space-y-4 text-white text-sm md:text-lg leading-relaxed">
                  <p>{t("aboutPage.supportMessage1")}</p>
                  <p>{t("aboutPage.supportMessage2")}</p>
                </div>
                <p className="text-white/70 text-xs md:text-sm mt-6 md:mt-8 flex items-center gap-2">
                  <span className="w-8 h-[1px] bg-white/40" />
                  {t("aboutPage.staffPhoto")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
