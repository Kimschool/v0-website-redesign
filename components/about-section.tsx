'use client'

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ExternalLink, School, User } from "lucide-react"
import { useTranslation } from "react-i18next"

/** KCP philosophy caption: gray brackets, teal English, navy serif subline */
function KcpBracketCaption({ word, sub }: { word: string; sub: string }) {
  const bracketClass =
    "select-none text-[#d1d5db] font-serif text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none flex items-stretch"
  return (
    <div className="mt-5 md:mt-7 flex items-stretch justify-center gap-0">
      <span aria-hidden className={`${bracketClass} pr-0.5`}>
        [
      </span>
      <div className="flex flex-col items-center justify-center px-1 sm:px-1.5 min-w-0 py-0.5">
        <span className="font-sans text-[0.62rem] sm:text-xs md:text-sm font-medium text-[#0088b3] tracking-wide text-center leading-tight max-w-[7.5rem] sm:max-w-none">
          {word}
        </span>
        <span className="font-serif text-[2.625rem] md:text-[2rem] font-semibold text-[#1d3557] text-center leading-snug">
          {sub}
        </span>
      </div>
      <span aria-hidden className={`${bracketClass} pl-0.5`}>
        ]
      </span>
    </div>
  )
}

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
        {/* 写真の左70%のみ表示（右30%の別建物をカット）— 幅100/0.7で左寄せし親でクリップ */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute inset-y-0 left-0 h-full w-[142.857%] min-w-0">
            <Image
              src={`/images/original_from_customer/${encodeURIComponent('トップ背景')}/${encodeURIComponent('01_KCPとは（拡大して周りの建物があまり見えないように）')}.jpg`}
              alt={t("aboutPage.bannerTitle")}
              fill
              className="object-cover object-left"
              sizes="100vw"
              priority
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 flex items-center justify-center pt-16 px-4">
          <div className={`text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              {t("aboutPage.bannerTitle")}
            </h1>
            <div className="w-20 h-1 bg-white/80 mx-auto mt-6 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Philosophy — tagline, KCP letters, intro copy (타이틀: Noto Serif JP / 컬러: #1d3557 · #0088b3 · #d1d5db) */}
      <div className="relative bg-white">
        <div className="container mx-auto px-4 md:px-6 py-24 md:py-16">
          <div className={`max-w-5xl mx-auto text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <p className="font-serif text-[2.25rem] md:text-[2.5rem] leading-tight text-[#1d3557] tracking-wide mb-16 md:mb-5 font-medium">
              {t("aboutPage.philosophyTagline")}
            </p>

            <div className="inline-grid grid-cols-3 justify-items-center gap-0.5 sm:gap-2 md:gap-[0.85rem] lg:gap-[3.15rem] mb-16 md:mb-20 mx-auto">
              {(
                [
                  { letter: "K", word: t("aboutPage.kcpKnowledgeWord"), sub: t("aboutPage.kcpKnowledgeSub") },
                  { letter: "C", word: t("aboutPage.kcpCoexistenceWord"), sub: t("aboutPage.kcpCoexistenceSub") },
                  { letter: "P", word: t("aboutPage.kcpPeaceWord"), sub: t("aboutPage.kcpPeaceSub") },
                ] as const
              ).map(({ letter, word, sub }) => (
                <div key={letter} className="flex flex-col items-center min-w-0">
                  <span className="font-serif text-[clamp(5.5rem,24vw,13rem)] leading-none text-[#0088b3]">
                    {letter}
                  </span>
                  <KcpBracketCaption word={word} sub={sub} />
                </div>
              ))}
            </div>

            <div className="text-center font-sans text-[#1d3557] text-base md:text-lg leading-relaxed space-y-5 max-w-3xl mx-auto">
              <p>{t("aboutPage.philosophy1")}</p>
              <p>{t("aboutPage.philosophy2")}</p>
              <p>{t("aboutPage.philosophy3")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Student photos — three portrait tiles */}
      <div className="bg-white py-16 md:py-5 overflow-hidden border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
            {[
              `/images/original_from_customer/${encodeURIComponent("予備")}/K.jpg`,
              `/images/original_from_customer/${encodeURIComponent("予備")}/${encodeURIComponent("学生2【予備】")}.jpg`,
              "/images/original_from_customer/818e60bf0c192652f5fe869245e46afb-1-scaled.jpg",
            ].map((src, i) => (
              <div key={src} className="relative group">
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                  <Image
                    src={src}
                    alt={`${t("aboutPage.studentGalleryAlt")} ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white pt-20">
        <div className="container mx-auto px-4 md:px-6">
          <hr className="mx-auto max-w-6xl border-0 border-t border-gray-200" />
        </div>
      </div>

      {/* Principal — centered title, photo + profile / body */}
      <div className="bg-white py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12 md:mb-16">
              {t("aboutPage.principalTitle")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-14 items-start">
              <aside className="w-full max-w-xl mx-auto md:max-w-none md:mx-0">
                <div className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-md border border-gray-100 mb-8">
                  <Image
                    src={`/images/original_from_customer/${encodeURIComponent("校長先生")}.jpg`}
                    alt={t("aboutPage.principalTitle")}
                    fill
                    className="object-cover object-[center_28%]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="space-y-4 text-sm md:text-base text-gray-800">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0085b2]/10">
                      <School className="h-4 w-4 text-[#0085b2]" aria-hidden />
                    </span>
                    <span className="leading-snug pt-1">{t("aboutPage.schoolFoundation")}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0085b2]/10">
                      <School className="h-4 w-4 text-[#0085b2]" aria-hidden />
                    </span>
                    <span className="leading-snug pt-1">{t("aboutPage.schoolName")}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0085b2]/10">
                      <User className="h-4 w-4 text-[#0085b2]" aria-hidden />
                    </span>
                    <span className="leading-snug pt-1 font-medium">{t("aboutPage.principalName")}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0085b2]/10">
                      <ExternalLink className="h-4 w-4 text-[#0085b2]" aria-hidden />
                    </span>
                    <a
                      href="https://www.kcp.ac.jp/blog/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="leading-snug pt-1 font-medium text-[#0085b2] hover:underline"
                    >
                      {t("aboutPage.principalBlog")}
                    </a>
                  </div>
                </div>
              </aside>

              <div className="w-full space-y-6 text-gray-600 text-base md:text-lg leading-relaxed md:min-w-0">
                <p>{t("aboutPage.principalMessage1")}</p>
                <p>{t("aboutPage.principalMessage2")}</p>
                <p>{t("aboutPage.principalMessage3")}</p>
                <p>{t("aboutPage.principalMessage4")}</p>
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
                          <h3 className="text-lg md:text-xs font-semibold text-white mb-2">{item.title}</h3>
                          {item.description && (
                            <p className="text-white/60 text-xs">{item.description}</p>
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
