'use client'

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { School, User } from "lucide-react"
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
    <section ref={sectionRef} id="about" className="bg-white">
      {/* Hero Banner - Extended to cover navigation area */}
      <div className="relative w-full h-[350px] md:h-[400px] overflow-hidden">
        <Image
          src="/images/original_from_customer/トップ背景/01_KCPとは（拡大して周りの建物があまり見えないように）.jpg"
          alt="KCPとは"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 flex items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">{t("aboutPage.bannerTitle")}</h1>
            <div className="w-20 h-1 bg-white/80 mx-auto mt-6 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-20">
        {/* KCP 철학 섹션 */}
        <div className={`mb-20 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="text-center mb-16">
            {/* K C P Philosophy Image */}
            <div className="mb-12 flex justify-center">
              <div className="w-full max-w-2xl">
                <Image
                  src="/images/kcp-philosophy.png"
                  alt="KCP Philosophy - Knowledge, Coexistence, Peace"
                  width={600}
                  height={300}
                  className="w-full h-auto"
                  priority={false}
                />
              </div>
            </div>

            {/* 철학 설명 */}
            <div className="max-w-3xl mx-auto mb-12 text-gray-700 space-y-5 text-base md:text-lg leading-relaxed md:leading-loose">
              <p>
                {t("aboutPage.philosophy1")}
              </p>
              <p>
                {t("aboutPage.philosophy2")}
              </p>
              <p>
                {t("aboutPage.philosophy3")}
              </p>
            </div>

            {/* 学生写真 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <img
                  src="/images/original_from_customer/予備/K.jpg"
                  alt="Student 1"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <img
                  src="/images/original_from_customer/予備/学生2【予備】.jpg"
                  alt="Student 2"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <img
                  src="/images/original_from_customer/818e60bf0c192652f5fe869245e46afb-1-scaled.jpg"
                  alt="Student 3"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="border-b-2 border-gray-300 mb-12"></div>
          </div>
        </div>

        {/* 학교장 인사말 */}
        <div className={`mb-20 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t("aboutPage.principalTitle")}
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            {/* 학교장 이미지 및 정보 */}
            <div className="space-y-6">
              <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src="/images/original_from_customer/校長先生.jpg"
                  alt="学校長"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <School className="w-5 h-5 text-[#0085b2]" />
                  <span className="text-lg">{t("aboutPage.schoolFoundation")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <School className="w-5 h-5 text-[#0085b2]" />
                  <span className="text-lg">{t("aboutPage.schoolName")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-[#0085b2]" />
                  <span className="text-lg">{t("aboutPage.principalName")}</span>
                </div>
              </div>
            </div>

            {/* 학교장 인사말 텍스트 */}
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                {t("aboutPage.principalMessage1")}
              </p>
              <p>
                {t("aboutPage.principalMessage2")}
              </p>
              <p>
                {t("aboutPage.principalMessage3")}
              </p>
              <p>
                {t("aboutPage.principalMessage4")}
              </p>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-200 my-16"></div>

        {/* 연혁 */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t("aboutPage.historyTitle")}
          </h2>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* 縦線 */}
              <div className="absolute left-2 md:left-[120px] h-full w-0.5 bg-[#0085b2]/20"></div>

              <div className="space-y-6">
                {history.map((item, index) => {
                  const isItemVisible = visibleItems.has(index)
                  return (
                    <div
                      key={index}
                      ref={el => { timelineRefs.current[index] = el }}
                      className={`group relative flex items-start transition-all duration-1000 ease-out cursor-default
                        hover:bg-[#0085b2]/5 rounded-lg p-2 -m-2
                        ${isItemVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}`}
                      style={{ transitionDelay: isItemVisible ? `${index * 100}ms` : "0ms" }}
                    >
                      {/* 年（デスクトップ） */}
                      <div className="hidden md:block w-[100px] pr-4 text-right shrink-0">
                        <span className="text-xl font-bold text-[#0085b2] transition-transform duration-300 inline-block group-hover:scale-110 origin-right">{item.year}</span>
                      </div>

                      {/* ドット */}
                      <div className={`absolute left-2 md:relative md:left-auto shrink-0 w-4 h-4 mt-1 rounded-full border-2 border-white shadow-sm transition-all duration-500 ${
                        isItemVisible ? "bg-[#0085b2] scale-125 shadow-md shadow-[#0085b2]/30" : "bg-[#0085b2]/30 scale-75"
                      }`}></div>

                      {/* コンテンツ */}
                      <div className="pl-8 md:pl-4">
                        <span className="md:hidden text-lg font-bold text-[#0085b2] block mb-1 transition-transform duration-300 inline-block group-hover:scale-105 origin-left">{item.year}</span>
                        <h3 className="font-semibold text-gray-800 transition-transform duration-300 group-hover:scale-105 origin-left">{item.title}</h3>
                        {item.description && (
                          <p className="text-gray-600 mt-1 text-sm">{item.description}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-200 my-16"></div>

        {/* 안심의 서포트 체제 */}
        <div className={`${isVisible ? "animate-fade-in-up animation-delay-400" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t("aboutPage.supportTitle")}
          </h2>

          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                {t("aboutPage.supportMessage1")}
              </p>
              <p>
                {t("aboutPage.supportMessage2")}
              </p>
            </div>

            {/* 교직원 단체 사진 */}
            <div className="mt-10">
              <div className="aspect-[21/9] md:aspect-[21/9] aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/images/original_from_customer/KCPとは「集合写真」.jpg"
                  alt="KCP地球市民日本語学校の教職員"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-500 mt-4 font-medium">{t("aboutPage.staffPhoto")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
