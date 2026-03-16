"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
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
      {/* Page Banner - Extended to cover navigation area */}
      <div className="relative h-[350px] md:h-[400px] w-full overflow-hidden">
        <Image
          src="/images/original_from_customer/トップ背景/04_入学案内.jpg"
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
        <div className="max-w-5xl mx-auto">
          {/* Introduction */}
          <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="w-12 h-1 bg-[#0085b2] mx-auto mb-6 rounded-full" />
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              {t("admissionPage.intro")}
            </p>
            <p className="text-sm text-gray-500 mt-4 max-w-3xl mx-auto">
              {t("admissionPage.introNote")}
            </p>
            <div className="elegant-divider mt-8" />
          </div>

          {/* Contact Section */}
          <Link href="/contact" className="block group mb-16">
            <div className="relative bg-gradient-to-br from-[#f0ffff] to-[#0085b2]/10 p-8 md:p-12 rounded-xl border-2 border-[#0085b2]/20 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-[#0085b2] hover:scale-105">
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0085b2]/20 rounded-full opacity-30 -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Header with icon */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-[#0085b2] rounded-lg">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t("admissionPage.contactTitle")}</h2>
                </div>

                {/* Description */}
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  {t("admissionPage.contactDescription")}
                </p>

                {/* Info cards */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-[#0085b2]/30">
                    <p className="text-sm font-semibold text-gray-600 mb-1">{t("admissionPage.contactEmail")}</p>
                    <p className="text-gray-800 font-medium">info@kcp.ac.jp</p>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-[#0085b2]/30">
                    <p className="text-sm font-semibold text-gray-600 mb-1">{t("admissionPage.contactHours")}</p>
                    <p className="text-gray-800 font-medium">{t("admissionPage.contactHoursValue")}</p>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 font-medium">{t("admissionPage.contactCta")}</p>
                  <div className="p-2 bg-[#0085b2] rounded-lg group-hover:bg-[#006794] group-hover:translate-x-1 transition-all duration-300">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Application Documents */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{t("admissionPage.documentsTitle")}</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Application Form */}
              <div className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{t("admissionPage.applicationTitle")}</h3>
                <p className="text-gray-600 mb-4">
                  {t("admissionPage.applicationDesc")}
                </p>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-semibold">{t("admissionPage.applicationLangs")}</span><br />
                    {t("admissionPage.applicationLangsValue")}
                  </p>
                </div>
                <a
                  href="https://weavus-group.com/kcp/%e9%a1%98%e6%9b%b8%e3%82%bb%e3%83%83%e3%83%88/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 w-full bg-[#0085b2] hover:bg-[#006794] text-white font-bold py-3 px-4 rounded-lg transition text-center"
                >
                  {t("admissionPage.applicationBtn")}
                </a>
              </div>

              {/* Pamphlet */}
              <div className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{t("admissionPage.pamphletTitle")}</h3>
                <p className="text-gray-600 mb-4">
                  {t("admissionPage.pamphletDesc")}
                </p>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-semibold">{t("admissionPage.pamphletFormat")}</span><br />
                    {t("admissionPage.pamphletFormatValue")}
                  </p>
                </div>
                <a
                  href="https://weavus-group.com/kcp/wp-content/uploads/2026/02/KCP%E3%83%91%E3%83%B3%E3%83%95%E3%83%AC%E3%83%83%E3%83%88%E7%A2%BA%E5%AE%9A%E7%89%88.pdf"
                  download
                  className="inline-block mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition text-center"
                >
                  {t("admissionPage.pamphletBtn")}
                </a>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-16" />

          {/* Pre-Placement Test */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("admissionPage.placementTitle")}</h2>

            <div className="bg-gray-50 p-8 rounded-lg border border-gray-300">
              <p className="text-gray-700 leading-relaxed mb-6">
                {t("admissionPage.placementDesc")}
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex gap-4">
                  <div className="text-[#0085b2] font-bold text-xl">✓</div>
                  <div className="text-gray-700">
                    {t("admissionPage.placementCheck1")}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-[#0085b2] font-bold text-xl">✓</div>
                  <div className="text-gray-700">
                    {t("admissionPage.placementCheck2")}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-[#0085b2] font-bold text-xl">✓</div>
                  <div className="text-gray-700">
                    {t("admissionPage.placementCheck3")}
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 bg-[#0085b2]/10 border-l-4 border-[#0085b2] p-4 rounded">
                {t("admissionPage.placementNote")}
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-16" />

          {/* Learning Management System */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("admissionPage.lmsTitle")}</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  {t("admissionPage.lmsDesc1")}
                </p>
                <p>
                  {t("admissionPage.lmsDesc2")}
                </p>
                <p>
                  {t("admissionPage.lmsDesc3")}
                </p>
                <p className="font-semibold text-[#0085b2]">
                  {t("admissionPage.lmsNote")}
                </p>
              </div>
              <div className="bg-[#f0ffff] p-6 rounded-lg border border-[#0085b2]/20">
                <h3 className="font-bold text-gray-800 mb-4">{t("admissionPage.lmsFeatureTitle")}</h3>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li className="flex gap-2">
                    <span className="text-[#0085b2] font-bold">•</span>
                    <span>{t("admissionPage.lmsFeatures.0")}</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#0085b2] font-bold">•</span>
                    <span>{t("admissionPage.lmsFeatures.1")}</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#0085b2] font-bold">•</span>
                    <span>{t("admissionPage.lmsFeatures.2")}</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#0085b2] font-bold">•</span>
                    <span>{t("admissionPage.lmsFeatures.3")}</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#0085b2] font-bold">•</span>
                    <span>{t("admissionPage.lmsFeatures.4")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-16" />

          {/* Scholarship */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("admissionPage.scholarshipTitle")}</h2>

            <p className="text-gray-700 leading-relaxed mb-8">
              {t("admissionPage.scholarshipDesc")}
            </p>

            <div className="space-y-6">
              {/* Scholarship 1 */}
              <div className="border-l-4 border-[#0085b2] pl-6 py-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {t("admissionPage.scholarship1Title")}
                </h3>
                <p className="text-gray-600">
                  {t("admissionPage.scholarship1Desc")}
                </p>
              </div>

              {/* Scholarship 2 */}
              <div className="border-l-4 border-green-500 pl-6 py-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {t("admissionPage.scholarship2Title")}
                </h3>
                <p className="text-gray-600">
                  {t("admissionPage.scholarship2Desc")}
                </p>
              </div>
            </div>

            <div className="mt-8 bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <p className="text-gray-700">
                <strong className="text-gray-800">※</strong> {t("admissionPage.scholarshipNote")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
