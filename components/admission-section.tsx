"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, FileText, Download, TestTube, GraduationCap } from "lucide-react"
import { useTranslation } from "react-i18next"

export function AdmissionSection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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
    <section ref={sectionRef} id="admission" className="bg-white">
      {/* Page Banner */}
      <div className="relative h-[350px] md:h-[400px] w-full overflow-hidden">
        <Image
          src={`/images/original_from_customer/${encodeURIComponent('トップ背景')}/${encodeURIComponent('04_入学案内')}.jpg`}
          alt="入学案内"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 flex items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">{t("admissionPage.bannerTitle")}</h1>
            <div className="w-20 h-1 bg-white/80 mx-auto mt-6 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Header with Intro */}
          <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <p className="text-xs tracking-[0.3em] uppercase text-[#0085b2] font-semibold mb-4">入学案内</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-serif">{t("admissionPage.intro")}</h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t("admissionPage.introNote")}
            </p>
          </div>

          {/* Main Cards Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 ${isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"}`}>
            {/* Application Form Card */}
            <a href="https://weavus-group.com/kcp/%e9%a1%98%e6%9b%b8%e3%82%bb%e3%83%83%e3%83%88/" target="_blank" rel="noopener noreferrer" className="group">
              <div className="h-full bg-white border-l-4 border-[#0085b2] rounded-xl shadow-md hover:shadow-xl hover:border-l-8 transition-all duration-300 p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#0085b2]/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#0085b2]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{t("admissionPage.applicationTitle")}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {t("admissionPage.applicationDesc")}
                </p>
                <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">{t("admissionPage.applicationLangsValue")}</span>
                  <ArrowRight className="w-5 h-5 text-[#0085b2] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>

            {/* Pamphlet Card */}
            <a href="https://weavus-group.com/kcp/wp-content/uploads/2026/02/KCP%E3%83%91%E3%83%B3%E3%83%95%E3%83%AC%E3%83%83%E3%83%88%E7%A2%BA%E5%AE%9A%E7%89%88.pdf" download className="group">
              <div className="h-full bg-white border-l-4 border-[#0085b2] rounded-xl shadow-md hover:shadow-xl hover:border-l-8 transition-all duration-300 p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#0085b2]/10 flex items-center justify-center">
                    <Download className="w-6 h-6 text-[#0085b2]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{t("admissionPage.pamphletTitle")}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {t("admissionPage.pamphletDesc")}
                </p>
                <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">{t("admissionPage.pamphletFormatValue")}</span>
                  <ArrowRight className="w-5 h-5 text-[#0085b2] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>

            {/* Pre-Placement Test Card */}
            <div className="group">
              <div className="h-full bg-white border-l-4 border-[#0085b2] rounded-xl shadow-md hover:shadow-xl hover:border-l-8 transition-all duration-300 p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#0085b2]/10 flex items-center justify-center">
                    <TestTube className="w-6 h-6 text-[#0085b2]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{t("admissionPage.placementTitle")}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {t("admissionPage.placementDesc")}
                </p>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 font-medium">{t("admissionPage.placementNote")}</p>
                </div>
              </div>
            </div>

            {/* Scholarship Card */}
            <div className="group">
              <div className="h-full bg-white border-l-4 border-[#0085b2] rounded-xl shadow-md hover:shadow-xl hover:border-l-8 transition-all duration-300 p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#0085b2]/10 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-[#0085b2]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{t("admissionPage.scholarshipTitle")}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {t("admissionPage.scholarshipDesc")}
                </p>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 font-medium">{t("admissionPage.scholarshipNote")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Sections */}
          <div className="space-y-10">
            {/* Learning Management System */}
            <div className={`${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-1 h-8 bg-[#0085b2] rounded-full"></span>
                {t("admissionPage.lmsTitle")}
              </h3>
              <div className="bg-gradient-to-r from-[#0085b2]/3 to-transparent border border-[#0085b2]/20 rounded-xl p-8">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {t("admissionPage.lmsDesc1")}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-[#0085b2] font-bold flex-shrink-0">•</span>
                      <span className="text-gray-700 text-sm">{t(`admissionPage.lmsFeatures.${i}`)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <Link href="/contact" className="group block">
              <div className={`bg-gradient-to-br from-[#0085b2]/10 to-transparent border-2 border-[#0085b2]/30 rounded-xl p-10 hover:shadow-lg hover:border-[#0085b2] transition-all duration-300 ${isVisible ? "animate-fade-in-up animation-delay-300" : "opacity-0"}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{t("admissionPage.contactTitle")}</h3>
                    <p className="text-gray-600">{t("admissionPage.contactCta")}</p>
                  </div>
                  <div className="p-3 bg-[#0085b2] rounded-lg group-hover:bg-[#006794] group-hover:translate-x-1 transition-all duration-300">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
