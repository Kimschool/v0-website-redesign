"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MessageCircle, X } from "lucide-react"
import { useTranslation } from "react-i18next"

type ApplicationDocumentLanguageKey = "en-ja" | "zh" | "ko" | "vi" | "zh-tw"

type ApplicationDocumentLanguage = {
  key: ApplicationDocumentLanguageKey
  label: string
  previewPdfPath: string
  originalFilePath: string
  originalFileLabel: string
}

type PamphletLanguageKey = "ja" | "zh" | "ko"

type PamphletLanguage = {
  key: PamphletLanguageKey
  label: string
  pdfPath: string
}

export function AdmissionSection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false)
  const [selectedApplicationLanguageKey, setSelectedApplicationLanguageKey] =
    useState<ApplicationDocumentLanguageKey>("en-ja")
  const [isPamphletModalOpen, setIsPamphletModalOpen] = useState(false)
  const [selectedPamphletLanguageKey, setSelectedPamphletLanguageKey] =
    useState<PamphletLanguageKey>("ja")

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

  const applicationDocumentLanguages: ApplicationDocumentLanguage[] = useMemo(
    () => [
      {
        key: "en-ja",
        label: "English",
        previewPdfPath: "/documents/application/Application-EnglishJapanese.pdf",
        originalFilePath: "/documents/application/Application-EnglishJapanese.xlsx",
        originalFileLabel: "Excel (.xlsx)",
      },
      {
        key: "zh",
        label: "中文",
        previewPdfPath: "/documents/application/Application-Chinese.pdf",
        originalFilePath: "/documents/application/中国履歴書などのセット.xlsx",
        originalFileLabel: "Excel (.xlsx)",
      },
      {
        key: "ko",
        label: "한국어",
        previewPdfPath: "/documents/application/Application-Korean.pdf",
        originalFilePath: "/documents/application/KCP長期韓国語版願書セット.xlsx",
        originalFileLabel: "Excel (.xlsx)",
      },
      {
        key: "vi",
        label: "Tiếng Việt",
        previewPdfPath: "/documents/application/Application-Vietnamese.pdf",
        originalFilePath: "/documents/application/application-Vietnam Japanese.doc",
        originalFileLabel: "Word (.doc)",
      },
      {
        key: "zh-tw",
        label: "中文（台灣）",
        previewPdfPath: "/documents/application/Application-Taiwan.pdf",
        originalFilePath: "/documents/application/FORMTAIWAN-new.doc",
        originalFileLabel: "Word (.doc)",
      },
    ],
    []
  )

  const selectedApplicationLanguage = useMemo(() => {
    return (
      applicationDocumentLanguages.find(
        (language) => language.key === selectedApplicationLanguageKey
      ) ?? applicationDocumentLanguages[0]
    )
  }, [applicationDocumentLanguages, selectedApplicationLanguageKey])

  const pamphletLanguages: PamphletLanguage[] = useMemo(
    () => [
      {
        key: "ja",
        label: "日本語",
        pdfPath: "http://weavus.main.jp/temp/KCPパンフレット_JP.pdf",
      },
      {
        key: "zh",
        label: "中文",
        pdfPath: "http://weavus.main.jp/temp/KCPパンフレット_CN.pdf",
      },
      {
        key: "ko",
        label: "한국어",
        pdfPath: "http://weavus.main.jp/temp/KCPパンフレット_KR.pdf",
      },
    ],
    []
  )

  const selectedPamphletLanguage = useMemo(() => {
    return (
      pamphletLanguages.find(
        (language) => language.key === selectedPamphletLanguageKey
      ) ?? pamphletLanguages[0]
    )
  }, [pamphletLanguages, selectedPamphletLanguageKey])

  useEffect(() => {
    const isAnyModalOpen = isApplicationModalOpen || isPamphletModalOpen
    if (!isAnyModalOpen) return

    const scrollY = window.scrollY
    const originalOverflow = document.body.style.overflow
    const originalPosition = document.body.style.position
    const originalTop = document.body.style.top
    const originalWidth = document.body.style.width

    document.body.style.overflow = "hidden"
    document.body.style.position = "fixed"
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = "100%"

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.position = originalPosition
      document.body.style.top = originalTop
      document.body.style.width = originalWidth
      window.scrollTo(0, scrollY)
    }
  }, [isApplicationModalOpen, isPamphletModalOpen])

  useEffect(() => {
    if (!isApplicationModalOpen && !isPamphletModalOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsApplicationModalOpen(false)
        setIsPamphletModalOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isApplicationModalOpen, isPamphletModalOpen])

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
          <Link href="/contact#overseas-offices" className="block group mb-20">
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
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    {t("admissionPage.contactDescription")}
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
                  <button
                    type="button"
                    onClick={() => setIsApplicationModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0085b2] hover:bg-[#006794] text-white text-sm font-semibold px-6 py-2.5 transition-colors shadow-md shadow-[#0085b2]/30"
                  >
                    {t("admissionPage.applicationBtn")}
                    <ArrowRight className="w-4 h-4" />
                  </button>
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
                  <button
                    type="button"
                    onClick={() => setIsPamphletModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-6 py-2.5 transition-colors shadow-md shadow-emerald-500/30"
                  >
                    {t("admissionPage.pamphletBtn")}
                    <ArrowRight className="w-4 h-4" />
                  </button>
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
                  {[0, 1, 2, 3].map((i) => (
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
                <h3 className="text-lg font-bold text-gray-900">
                  {t("admissionPage.scholarship1Title")}
                </h3>
              </div>

              <div className="rounded-2xl bg-white shadow-sm border border-emerald-500/20 p-5">
                <h3 className="text-lg font-bold text-gray-900">
                  {t("admissionPage.scholarship2Title")}
                </h3>
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

      {isApplicationModalOpen ? (
        <div
          className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain p-4"
          role="dialog"
          aria-modal="true"
          aria-label={t("admissionPage.applicationTitle")}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close"
            onClick={() => setIsApplicationModalOpen(false)}
          />

          <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl mx-auto my-auto">
            <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-5 py-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-[#0085b2]">
                  {t("admissionPage.documentsTitle")}
                </p>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-gray-900">
                  {t("admissionPage.applicationTitle")}
                </h3>
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                onClick={() => setIsApplicationModalOpen(false)}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-5 py-4">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {applicationDocumentLanguages.map((language) => {
                  const isSelected =
                    language.key === selectedApplicationLanguageKey
                  return (
                    <button
                      key={language.key}
                      type="button"
                      onClick={() =>
                        setSelectedApplicationLanguageKey(language.key)
                      }
                      className={[
                        "rounded-full px-4 py-2 text-sm font-semibold border transition-colors",
                        isSelected
                          ? "bg-[#0085b2] border-[#0085b2] text-white"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50",
                      ].join(" ")}
                    >
                      {language.label}
                    </button>
                  )
                })}
              </div>

              <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 overflow-hidden">
                  <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-gray-200 bg-white">
                    <p className="text-sm font-semibold text-gray-900">
                      PDF {t("admissionPage.applicationBtn")}
                    </p>
                    <a
                      href={selectedApplicationLanguage.previewPdfPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#0085b2] hover:underline"
                    >
                      {t("admissionPage.docOpenInNewTab")}
                    </a>
                  </div>

                  <div className="h-[60vh] min-h-[420px]">
                    <iframe
                      title={`${t("admissionPage.applicationTitle")} - ${selectedApplicationLanguage.label}`}
                      src={selectedApplicationLanguage.previewPdfPath}
                      className="h-full w-full"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-[#0085b2]/15 bg-white p-5 h-fit">
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold">
                      {t("admissionPage.docSelectedLanguage")}
                    </span>{" "}
                    {selectedApplicationLanguage.label}
                  </p>
                  <p className="text-sm text-gray-700 mb-5">
                    <span className="font-semibold">
                      {t("admissionPage.docOriginalFormat")}
                    </span>{" "}
                    {selectedApplicationLanguage.originalFileLabel}
                  </p>

                  <a
                    href={selectedApplicationLanguage.originalFilePath}
                    download
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0085b2] hover:bg-[#006794] text-white text-sm font-semibold px-4 py-3 transition-colors shadow-md shadow-[#0085b2]/20"
                  >
                    {t("admissionPage.docDownloadOriginalTemplate")}
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                    {t("admissionPage.docApplicationPdfHint")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {isPamphletModalOpen ? (
        <div
          className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain p-4"
          role="dialog"
          aria-modal="true"
          aria-label={t("admissionPage.pamphletTitle")}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close"
            onClick={() => setIsPamphletModalOpen(false)}
          />

          <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl mx-auto my-auto">
            <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-5 py-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-emerald-600">
                  {t("admissionPage.documentsTitle")}
                </p>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-gray-900">
                  {t("admissionPage.pamphletTitle")}
                </h3>
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                onClick={() => setIsPamphletModalOpen(false)}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-5 py-4">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {pamphletLanguages.map((language) => {
                  const isSelected = language.key === selectedPamphletLanguageKey
                  return (
                    <button
                      key={language.key}
                      type="button"
                      onClick={() => setSelectedPamphletLanguageKey(language.key)}
                      className={[
                        "rounded-full px-4 py-2 text-sm font-semibold border transition-colors",
                        isSelected
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50",
                      ].join(" ")}
                    >
                      {language.label}
                    </button>
                  )
                })}
              </div>

              <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 overflow-hidden">
                  <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-gray-200 bg-white">
                    <p className="text-sm font-semibold text-gray-900">
                      PDF {t("admissionPage.pamphletBtn")}
                    </p>
                    <a
                      href={selectedPamphletLanguage.pdfPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-emerald-700 hover:underline"
                    >
                      {t("admissionPage.docOpenInNewTab")}
                    </a>
                  </div>

                  <div className="h-[60vh] min-h-[420px]">
                    <iframe
                      title={`${t("admissionPage.pamphletTitle")} - ${selectedPamphletLanguage.label}`}
                      src={selectedPamphletLanguage.pdfPath}
                      className="h-full w-full"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-500/15 bg-white p-5 h-fit">
                  <p className="text-sm text-gray-700 mb-5">
                    <span className="font-semibold">
                      {t("admissionPage.docSelectedLanguage")}
                    </span>{" "}
                    {selectedPamphletLanguage.label}
                  </p>

                  <a
                    href={selectedPamphletLanguage.pdfPath}
                    download
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-3 transition-colors shadow-md shadow-emerald-600/20"
                  >
                    {t("admissionPage.docDownloadPdf")}
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                    {t("admissionPage.docPamphletHint")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
