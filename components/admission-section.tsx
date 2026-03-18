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

          {/* Step Flow */}
          <div className={`mb-20 ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="inline-block w-1.5 h-8 rounded-full bg-[#0085b2]" />
              {t("admissionPage.flowTitle")}
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                t("admissionPage.flowSteps.0"),
                t("admissionPage.flowSteps.1"),
                t("admissionPage.flowSteps.2"),
                t("admissionPage.flowSteps.3"),
              ].map((label, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow border border-[#0085b2]/10 px-5 py-6 flex flex-col gap-2"
                >
                  <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#0085b2]">
                    STEP {index + 1}
                  </span>
                  <p className="text-sm md:text-base text-gray-800 leading-relaxed">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <Link href="/contact" className="block group mb-20">
            <div className="relative rounded-2xl bg-gradient-to-br from-[#0085b2]/10 via-[#f0ffff] to-[#0cc0df]/5 border border-[#0085b2]/20 cursor-pointer overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-[#0085b2]/60">
              {/* Background accents */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#0085b2]/15 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-32 bg-[#0cc0df]/10 rounded-t-full blur-3xl" />

              {/* Content */}
              <div className="relative z-10 px-8 md:px-12 py-8 md:py-10 flex flex-col md:flex-row gap-8 md:items-center">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur px-3 py-1 rounded-full border border-[#0085b2]/20 mb-4">
                    <MessageCircle className="w-4 h-4 text-[#0085b2]" />
                    <span className="text-xs font-semibold text-[#0085b2] tracking-[0.16em]">
                      {t("admissionPage.contactBadge")}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    {t("admissionPage.contactTitle")}
                  </h2>
                  <p className="text-sm md:text-base text-gray-700 mb-4 leading-relaxed">
                    {t("admissionPage.contactDescription")}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-[#0085b2]/15 shadow-sm">
                      <p className="text-xs font-semibold text-gray-500 mb-1">
                        {t("admissionPage.contactEmail")}
                      </p>
                      <p className="text-gray-900 font-medium text-sm">info@kcp.ac.jp</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-[#0085b2]/15 shadow-sm">
                      <p className="text-xs font-semibold text-gray-500 mb-1">
                        {t("admissionPage.contactHours")}
                      </p>
                      <p className="text-gray-900 font-medium text-sm">
                        {t("admissionPage.contactHoursValue")}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-gray-600">
                    {t("admissionPage.contactCta")}
                  </p>
                </div>

                <div className="md:w-40 flex md:flex-col items-end justify-between md:items-center gap-4">
                  <div className="hidden md:block h-16 w-px bg-gradient-to-b from-transparent via-[#0085b2]/40 to-transparent" />
                  <div className="inline-flex items-center gap-3 rounded-full bg-[#0085b2] text-white px-5 py-3 text-sm font-semibold shadow-lg shadow-[#0085b2]/30 group-hover:bg-[#006794] group-hover:translate-x-1 transition-all">
                    <span>{t("admissionPage.contactButton")}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Application Documents */}
          <div className="mb-20">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="inline-block w-1.5 h-8 rounded-full bg-[#0085b2]" />
              {t("admissionPage.documentsTitle")}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Application Form */}
              <div className="rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow border border-[#0085b2]/10 p-6 md:p-7 flex flex-col h-full">
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">
                  {t("admissionPage.applicationTitle")}
                </h3>
                <p className="text-sm md:text-base text-gray-700 mb-4 leading-relaxed">
                  {t("admissionPage.applicationDesc")}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">{t("admissionPage.applicationLangs")}</span>
                  <br />
                  {t("admissionPage.applicationLangsValue")}
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-full bg-[#0085b2]/5 text-[#0085b2] px-3 py-1 text-xs font-semibold">
                    PDF / Form
                  </span>
                  <a
                    href="https://weavus-group.com/kcp/%e9%a1%98%e6%9b%b8%e3%82%bb%e3%83%83%e3%83%88/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0085b2] hover:bg-[#006794] text-white text-sm font-semibold px-6 py-2.5 transition-colors shadow-md shadow-[#0085b2]/30"
                  >
                    {t("admissionPage.applicationBtn")}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Pamphlet */}
              <div className="rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow border border-emerald-500/15 p-6 md:p-7 flex flex-col h-full">
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">
                  {t("admissionPage.pamphletTitle")}
                </h3>
                <p className="text-sm md:text-base text-gray-700 mb-4 leading-relaxed">
                  {t("admissionPage.pamphletDesc")}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">{t("admissionPage.pamphletFormat")}</span>
                  <br />
                  {t("admissionPage.pamphletFormatValue")}
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-full bg-emerald-500/5 text-emerald-600 px-3 py-1 text-xs font-semibold">
                    PDF / Brochure
                  </span>
                  <a
                    href="https://weavus-group.com/kcp/wp-content/uploads/2026/02/KCP%E3%83%91%E3%83%B3%E3%83%95%E3%83%AC%E3%83%83%E3%83%88%E7%A2%BA%E5%AE%9A%E7%89%88.pdf"
                    download
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-6 py-2.5 transition-colors shadow-md shadow-emerald-500/30"
                  >
                    {t("admissionPage.pamphletBtn")}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-16" />

          {/* Pre-Placement Test */}
          <div className="mb-20">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="inline-block w-1.5 h-8 rounded-full bg-[#0085b2]" />
              {t("admissionPage.placementTitle")}
            </h2>

            <div className="rounded-2xl bg-white shadow-md border border-[#0085b2]/10 p-7 md:p-8">
              <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                {t("admissionPage.placementDesc")}
              </p>

              <div className="space-y-3 mb-6">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/80 shadow-sm border border-[#0085b2]/10"
                  >
                    <span className="mt-1 text-[#0085b2] font-bold text-lg">✓</span>
                    <p className="text-sm md:text-base text-gray-700">
                      {t(`admissionPage.placementCheck${i + 1}` as const)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl bg-[#fff7e6] border border-[#facc6b] p-4">
                <p className="text-xs font-semibold text-[#a16207] mb-1">NOTE</p>
                <p className="text-sm text-gray-800">
                  {t("admissionPage.placementNote")}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-16" />

          {/* Learning Management System */}
          <div className="mb-20">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="inline-block w-1.5 h-8 rounded-full bg-[#0085b2]" />
              {t("admissionPage.lmsTitle")}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 text-sm md:text-base text-gray-700 leading-relaxed">
                <p>{t("admissionPage.lmsDesc1")}</p>
                <p>{t("admissionPage.lmsDesc2")}</p>
                <p>{t("admissionPage.lmsDesc3")}</p>
                <p className="font-semibold text-[#0085b2]">
                  {t("admissionPage.lmsNote")}
                </p>
              </div>
              <div className="rounded-2xl bg-[#f0ffff] p-6 md:p-7 border border-[#0085b2]/20 shadow-sm">
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">
                  {t("admissionPage.lmsFeatureTitle")}
                </h3>
                <ul className="space-y-3 text-gray-700 text-sm">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-0.5 inline-block w-1.5 h-1.5 rounded-full bg-[#0085b2]" />
                      <span>{t(`admissionPage.lmsFeatures.${i}` as const)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-16" />

          {/* Scholarship */}
          <div className="mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="inline-block w-1.5 h-8 rounded-full bg-[#0085b2]" />
              {t("admissionPage.scholarshipTitle")}
            </h2>

            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
              {t("admissionPage.scholarshipDesc")}
            </p>

            <div className="space-y-4">
              <div className="rounded-2xl bg-white shadow-sm border border-[#0085b2]/15 p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {t("admissionPage.scholarship1Title")}
                </h3>
                <p className="text-sm md:text-base text-gray-700">
                  {t("admissionPage.scholarship1Desc")}
                </p>
              </div>

              <div className="rounded-2xl bg-white shadow-sm border border-emerald-500/20 p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {t("admissionPage.scholarship2Title")}
                </h3>
                <p className="text-sm md:text-base text-gray-700">
                  {t("admissionPage.scholarship2Desc")}
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-[#fff7e6] border border-[#facc6b] p-5">
              <p className="text-xs font-semibold text-[#a16207] mb-1">NOTE</p>
              <p className="text-sm text-gray-800">
                {t("admissionPage.scholarshipNote")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
