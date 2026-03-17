"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useTranslation } from "react-i18next"

export function BasicInfoSection() {
  const { t } = useTranslation()

  const basicInfo = [
    { label: t("basicInfoPage.infoItems.0.label"), value: t("basicInfoPage.infoItems.0.value") },
    { label: t("basicInfoPage.infoItems.1.label"), value: t("basicInfoPage.infoItems.1.value") },
    { label: t("basicInfoPage.infoItems.2.label"), value: t("basicInfoPage.infoItems.2.value") },
    { label: t("basicInfoPage.infoItems.3.label"), value: t("basicInfoPage.infoItems.3.value") },
    { label: t("basicInfoPage.infoItems.4.label"), value: t("basicInfoPage.infoItems.4.value") },
    { label: t("basicInfoPage.infoItems.5.label"), value: t("basicInfoPage.infoItems.5.value") },
    { label: t("basicInfoPage.infoItems.6.label"), value: t("basicInfoPage.infoItems.6.value") },
    { label: t("basicInfoPage.infoItems.7.label"), value: t("basicInfoPage.infoItems.7.value") },
    { label: t("basicInfoPage.infoItems.8.label"), value: t("basicInfoPage.infoItems.8.value") },
    { label: t("basicInfoPage.infoItems.9.label"), value: t("basicInfoPage.infoItems.9.value") },
    { label: t("basicInfoPage.infoItems.10.label"), value: t("basicInfoPage.infoItems.10.value") },
    { label: t("basicInfoPage.infoItems.11.label"), value: t("basicInfoPage.infoItems.11.value") },
  ]

  const disclosureItems = [
    {
      category: t("basicInfoPage.disclosureCategories.0.category"),
      items: [
        t("basicInfoPage.disclosureCategories.0.items.0"),
        t("basicInfoPage.disclosureCategories.0.items.1"),
        t("basicInfoPage.disclosureCategories.0.items.2"),
        t("basicInfoPage.disclosureCategories.0.items.3"),
      ]
    },
    {
      category: t("basicInfoPage.disclosureCategories.1.category"),
      items: [
        t("basicInfoPage.disclosureCategories.1.items.0"),
        t("basicInfoPage.disclosureCategories.1.items.1"),
        t("basicInfoPage.disclosureCategories.1.items.2"),
        t("basicInfoPage.disclosureCategories.1.items.3"),
      ]
    },
    {
      category: t("basicInfoPage.disclosureCategories.2.category"),
      items: [
        t("basicInfoPage.disclosureCategories.2.items.0"),
        t("basicInfoPage.disclosureCategories.2.items.1"),
        t("basicInfoPage.disclosureCategories.2.items.2"),
        t("basicInfoPage.disclosureCategories.2.items.3"),
      ]
    },
    {
      category: t("basicInfoPage.disclosureCategories.3.category"),
      items: [
        t("basicInfoPage.disclosureCategories.3.items.0"),
        t("basicInfoPage.disclosureCategories.3.items.1"),
        t("basicInfoPage.disclosureCategories.3.items.2"),
        t("basicInfoPage.disclosureCategories.3.items.3"),
      ]
    },
    {
      category: t("basicInfoPage.disclosureCategories.4.category"),
      items: [
        t("basicInfoPage.disclosureCategories.4.items.0"),
        t("basicInfoPage.disclosureCategories.4.items.1"),
        t("basicInfoPage.disclosureCategories.4.items.2"),
        t("basicInfoPage.disclosureCategories.4.items.3"),
      ]
    }
  ]
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
    <section ref={sectionRef} className="bg-white">
      {/* Page Banner - Extended to cover navigation area */}
      <div className="relative h-[350px] md:h-[400px] w-full overflow-hidden">
        <Image
          src={`/images/original_from_customer/${encodeURIComponent('トップ背景')}/${encodeURIComponent('01_KCPとは（拡大して周りの建物があまり見えないように）')}.jpg`}
          alt="情報公開"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 flex items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">{t("basicInfoPage.bannerTitle")}</h1>
            <div className="w-20 h-1 bg-white/80 mx-auto mt-6 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-5xl py-16">
        {/* Introduction */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="w-12 h-1 bg-[#0085b2] mx-auto mb-6 rounded-full" />
          <p className="text-lg text-gray-600">
            {t("basicInfoPage.subtitle")}
          </p>
          <div className="elegant-divider mt-8" />
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-300 mb-16" />

        {/* Basic Info Table */}
        <div className={`mb-20 ${isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"}`}>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{t("basicInfoPage.basicInfoTitle")}</h2>

          <div className="flex justify-center mb-8">
            <div className="relative w-48 h-48">
              <Image
                src={`/images/original_from_customer/${encodeURIComponent('認定マーク（留学）')}/${encodeURIComponent('認定マーク（留学）')}/${encodeURIComponent('logo_01色')}.png`}
                alt="認定日本語教育機関マーク"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg overflow-hidden">
            {basicInfo.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-3 md:grid-cols-4 ${index !== basicInfo.length - 1 ? "border-b border-gray-300" : ""}`}
              >
                <div className="col-span-1 bg-[#f0ffff] px-6 py-4 font-semibold text-gray-800 border-r border-gray-300">
                  {item.label}
                </div>
                <div className="col-span-2 md:col-span-3 px-6 py-4 text-gray-700">
                  {item.value === "info@kcp.ac.jp" ? (
                    <a href={`mailto:${item.value}`} className="text-[#0085b2] hover:underline">
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-300 mb-16" />

        {/* Information Disclosure */}
        <div className={`mb-20 ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{t("basicInfoPage.disclosureTitle")}</h2>

          <div className="space-y-6">
            {disclosureItems.map((section, index) => (
              <div key={index} className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-[#0085b2] to-[#006794] px-6 py-4">
                  <h3 className="text-lg font-bold text-white">{section.category}</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700">
                        <span className="text-[#0085b2] mt-1">●</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-gray-500 text-center">
            {t("basicInfoPage.disclosureNote")}
          </p>
        </div>
      </div>
    </section>
  )
}
