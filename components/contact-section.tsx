"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useTranslation } from "react-i18next"

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    nameKanji: "",
    gender: "",
    nationality: "",
    birthDate: "",
    studentId: "",
    address: "",
    phone: "",
    email: "",
    certificateType: "",
    purpose: "",
    submissionPlace: "",
    receiveMethod: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const { t } = useTranslation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || t("contactPage.submitError"))
      }
      setSubmitStatus({ type: "success", message: t("contactPage.submitSuccess") })
      setFormData({
        name: "",
        nameKanji: "",
        gender: "",
        nationality: "",
        birthDate: "",
        studentId: "",
        address: "",
        phone: "",
        email: "",
        certificateType: "",
        purpose: "",
        submissionPlace: "",
        receiveMethod: "",
        notes: "",
      })
    } catch (err) {
      setSubmitStatus({ type: "error", message: err instanceof Error ? err.message : t("contactPage.submitError") })
    } finally {
      setIsSubmitting(false)
    }
  }

  const overseasOffices = [
    {
      name: t("contactPage.offices.0.name"),
      details: [
        { label: t("contactPage.offices.0.details.0.label"), value: "KCP International USA PO Box 28028　Bellingham, WA 98228-0028" },
        { label: t("contactPage.offices.0.details.1.label"), value: "360-647-0072" },
      ]
    },
    {
      name: t("contactPage.offices.1.name"),
      details: [
        { label: t("contactPage.offices.1.details.0.label"), value: "天津市东丽区嘉春园17号楼1704" },
        { label: t("contactPage.offices.1.details.1.label"), value: "15802246626" },
      ]
    },
    {
      name: t("contactPage.offices.2.name"),
      details: [
        { label: t("contactPage.offices.2.details.0.label"), value: "台中市北区興進路256号5F-5" },
        { label: t("contactPage.offices.2.details.1.label"), value: "+886-4-22345622" },
      ]
    },
    {
      name: t("contactPage.offices.3.name"),
      details: [
        { label: t("contactPage.offices.3.details.0.label"), value: "서울시 종로구 종로 19 (종로1가 24) 르메이에르종로타운 B동 1832호" },
        { label: t("contactPage.offices.3.details.1.label"), value: "02-735-4422" },
      ]
    },
    {
      name: t("contactPage.offices.4.name"),
      details: [
        { label: t("contactPage.offices.4.details.0.label"), value: "BMJ EDUCATION CENTRE SDN. BHD. (Bridge of Malaysia & Japan Education Centre)" },
        { label: t("contactPage.offices.4.details.1.label"), value: "No.41-01, Jalan Setia 3/5, Taman Setia Indah, 81100 Johor Bahru, Johor, Malaysia" },
        { label: t("contactPage.offices.4.details.2.label"), value: "+6012-751 6025" },
        { label: t("contactPage.offices.4.details.3.label"), value: "information@bmj.com.my", isEmail: true },
      ]
    }
  ]

  const faqItems = [
    {
      question: t("contactPage.faqItems.0.question"),
      answer: t("contactPage.faqItems.0.answer")
    },
    {
      question: t("contactPage.faqItems.1.question"),
      answer: t("contactPage.faqItems.1.answer")
    },
    {
      question: t("contactPage.faqItems.2.question"),
      answer: t("contactPage.faqItems.2.answer")
    },
    {
      question: t("contactPage.faqItems.3.question"),
      answer: t("contactPage.faqItems.3.answer")
    },
    {
      question: t("contactPage.faqItems.4.question"),
      answer: t("contactPage.faqItems.4.answer")
    },
    {
      question: t("contactPage.faqItems.5.question"),
      answer: t("contactPage.faqItems.5.answer")
    }
  ]

  return (
    <section ref={sectionRef} id="contact" className="bg-white">
      {/* Page Banner - Extended to cover navigation area */}
      <div className="relative h-[350px] md:h-[400px] w-full overflow-hidden">
        <Image
          src={`/images/original_from_customer/${encodeURIComponent('トップ背景')}/${encodeURIComponent('05_お問い合わせ')}.jpg`}
          alt="お問い合わせ"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 flex items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">{t("contactPage.bannerTitle")}</h1>
            <div className="w-20 h-1 bg-white/80 mx-auto mt-6 rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-6 py-20">
        {/* Form Header - Premium Design */}
        <div className={`mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-[#0085b2] font-semibold mb-4">卒業生・修了生対象</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-serif">証明書発行申請フォーム</h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p className="text-base md:text-lg">
                遠隔地にお住まいで、直接ご来校して証明書を申し込むのが難しい方は、<br className="hidden md:inline" />
                まず以下のフォームからお申込みください。
              </p>
            </div>

            <div className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 bg-amber-50 border border-amber-200 rounded-full">
              <span className="text-amber-600 text-sm">※</span>
              <span className="text-sm text-amber-800">発行までには通常3営業日かかります。急ぎの場合はお知らせください。</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-12" />
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className={`bg-gray-50/50 rounded-2xl p-10 md:p-12 border border-gray-200/50 shadow-xl shadow-black/5 backdrop-blur-sm ${isVisible ? "animate-fade-in-up animation-delay-300" : "opacity-0"}`}>
          {submitStatus && (
            <div className={`mb-8 p-4 rounded-xl text-sm font-medium ${submitStatus.type === "success" ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-700"}`}>
              {submitStatus.message}
            </div>
          )}

          {/* Section 1: Personal Information */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-1.5 h-8 bg-[#0085b2] rounded-full" />
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-[#0085b2] font-semibold mb-0.5">01</p>
                <h3 className="text-xl font-bold text-gray-900">{t("contactPage.formSections.personal") || "申請者情報"}</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name (Kanji) */}
              <div>
                <label htmlFor="nameKanji" className="block text-sm font-medium text-gray-700 mb-2.5">
                  {t("contactPage.formLabels.nameKanji")} <span className="text-[#0085b2] font-bold"></span>
                </label>
                <input
                  type="text"
                  id="nameKanji"
                  name="nameKanji"
                  value={formData.nameKanji}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0085b2] focus:shadow-lg focus:shadow-[#0085b2]/10 transition-all duration-200"
                />
              </div>

              {/* Name (English) */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2.5">
                  {t("contactPage.formLabels.name")} <span className="text-[#0085b2] font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0085b2] focus:shadow-lg focus:shadow-[#0085b2]/10 transition-all duration-200"
                />
              </div>

              {/* Gender */}
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2.5">
                  {t("contactPage.formLabels.gender")} <span className="text-[#0085b2] font-bold">*</span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0085b2] focus:shadow-lg focus:shadow-[#0085b2]/10 transition-all duration-200"
                >
                  <option value="">{t("contactPage.genderOptions.selectDefault")}</option>
                  <option value="male">{t("contactPage.genderOptions.male")}</option>
                  <option value="female">{t("contactPage.genderOptions.female")}</option>
                  <option value="other">{t("contactPage.genderOptions.other")}</option>
                </select>
              </div>

              {/* Nationality */}
              <div>
                <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-2.5">
                  {t("contactPage.formLabels.nationality")} <span className="text-[#0085b2] font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0085b2] focus:shadow-lg focus:shadow-[#0085b2]/10 transition-all duration-200"
                />
              </div>

              {/* Birth Date */}
              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2.5">
                  {t("contactPage.formLabels.birthDate")} <span className="text-[#0085b2] font-bold">*</span>
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0085b2] focus:shadow-lg focus:shadow-[#0085b2]/10 transition-all duration-200"
                />
              </div>

              {/* Student ID */}
              <div>
                <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-2.5">
                  {t("contactPage.formLabels.studentId")} <span className="text-[#0085b2] font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0085b2] focus:shadow-lg focus:shadow-[#0085b2]/10 transition-all duration-200"
                />
              </div>

              {/* Current Address */}
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2.5">
                  {t("contactPage.formLabels.address")} <span className="text-[#0085b2] font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0085b2] focus:shadow-lg focus:shadow-[#0085b2]/10 transition-all duration-200"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2.5">
                  {t("contactPage.formLabels.phone")} <span className="text-[#0085b2] font-bold">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0085b2] focus:shadow-lg focus:shadow-[#0085b2]/10 transition-all duration-200"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2.5">
                  {t("contactPage.formLabels.email")} <span className="text-[#0085b2] font-bold">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0085b2] focus:shadow-lg focus:shadow-[#0085b2]/10 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-10" />

          {/* Section 2: Certificate Information */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-1.5 h-8 bg-[#0085b2] rounded-full" />
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-[#0085b2] font-semibold mb-0.5">02</p>
                <h3 className="text-xl font-bold text-gray-900">{t("contactPage.formSections.certificate") || "証明書情報"}</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Certificate Type */}
              <div className="md:col-span-2">
                <label htmlFor="certificateType" className="block text-sm font-medium text-gray-700 mb-2.5">
                  {t("contactPage.formLabels.certificateType")} <span className="text-[#0085b2] font-bold">*</span>
                </label>
                <select
                  id="certificateType"
                  name="certificateType"
                  value={formData.certificateType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0085b2] focus:shadow-lg focus:shadow-[#0085b2]/10 transition-all duration-200"
                >
                  <option value="">{t?.("contactPage.certificateOptions.selectDefault") || "選択してください"}</option>
                  <option value="attendance">{t?.("contactPage.certificateOptions.attendance") || "出席・成績証明書"}</option>
                  <option value="graduation">{t?.("contactPage.certificateOptions.graduation") || "卒業証明書・修了証明書"}</option>
                  <option value="withdrawal">{t?.("contactPage.certificateOptions.withdrawal") || "退学証明書"}</option>
                </select>
              </div>

              {/* Purpose */}
              <div>
                <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2.5">
                  {t("contactPage.formLabels.purpose")} <span className="text-[#0085b2] font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0085b2] focus:shadow-lg focus:shadow-[#0085b2]/10 transition-all duration-200"
                />
              </div>

              {/* Submission Place */}
              <div>
                <label htmlFor="submissionPlace" className="block text-sm font-medium text-gray-700 mb-2.5">
                  {t("contactPage.formLabels.submissionPlace")} <span className="text-[#0085b2] font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="submissionPlace"
                  name="submissionPlace"
                  value={formData.submissionPlace}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0085b2] focus:shadow-lg focus:shadow-[#0085b2]/10 transition-all duration-200"
                />
              </div>

              {/* Receive Method */}
              <div>
                <label htmlFor="receiveMethod" className="block text-sm font-medium text-gray-700 mb-2.5">
                  {t("contactPage.formLabels.receiveMethod")} <span className="text-[#0085b2] font-bold">*</span>
                </label>
                <select
                  id="receiveMethod"
                  name="receiveMethod"
                  value={formData.receiveMethod}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0085b2] focus:shadow-lg focus:shadow-[#0085b2]/10 transition-all duration-200"
                >
                  <option value="">{t("contactPage.receiveOptions.selectDefault")}</option>
                  <option value="mail">{t("contactPage.receiveOptions.mail")}</option>
                  <option value="pickup">{t("contactPage.receiveOptions.pickup")}</option>
                  <option value="proxy">{t("contactPage.receiveOptions.proxy")}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-10" />

          {/* Section 3: Additional Information */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-1.5 h-8 bg-[#0085b2] rounded-full" />
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-[#0085b2] font-semibold mb-0.5">03</p>
                <h3 className="text-xl font-bold text-gray-900">{t("contactPage.formSections.additional") || "備考・その他"}</h3>
              </div>
            </div>
            <div>
              {/* Notes */}
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2.5">
                {t("contactPage.formLabels.notes")}
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0085b2] focus:shadow-lg focus:shadow-[#0085b2]/10 transition-all duration-200 resize-none"
              />
            </div>

          </div>

          {/* Submit Button */}
          <div className="flex flex-col items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative px-14 py-4 bg-[#0085b2] text-white font-semibold tracking-widest uppercase text-sm rounded-full hover:bg-[#006794] hover:shadow-xl hover:shadow-[#0085b2]/30 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0"
            >
              {isSubmitting ? t("contactPage.submittingBtn") : t("contactPage.submitBtn")}
            </button>
            <p className="text-xs text-gray-500 tracking-wide">* {t("contactPage.formLabels.email")} {t("contactPage.formLabels.certificateType")} {t("contactPage.formLabels.notes")} は必須項目です</p>
          </div>
        </form>

        {/* Overseas Offices Section */}
        <div className={`mb-16 py-10 ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">{t("contactPage.overseasTitle")}</h3>
          <div className="space-y-3">
            {overseasOffices.map((office, index) => (
              <details key={index} className="group border border-gray-200 rounded-xl overflow-hidden hover:border-[#0085b2] transition-all duration-200">
                <summary className="flex cursor-pointer items-center justify-between bg-gradient-to-r from-gray-50 to-[#0085b2]/5 px-6 py-4 font-semibold text-gray-800 hover:bg-[#0085b2]/10 transition">
                  <span>{office.name}</span>
                  <span className="text-sm text-[#0085b2] group-open:rotate-180 transition-transform duration-300">▼</span>
                </summary>

                <div className="px-6 py-5 bg-white space-y-4 border-t border-gray-100">
                  {office.details.map((detail, idx) => (
                    <div key={idx} className="flex flex-col">
                      <p className="text-xs text-gray-500 font-medium mb-1">{detail.label}</p>
                      {detail.isLink ? (
                        <a
                          href={detail.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0085b2] hover:text-[#006794] hover:underline break-all text-sm"
                        >
                          {detail.value}
                        </a>
                      ) : detail.isEmail ? (
                        <a
                          href={`mailto:${detail.value}`}
                          className="text-[#0085b2] hover:text-[#006794] hover:underline text-sm"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="text-gray-700 text-sm">{detail.value}</p>
                      )}
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className={`mb-16 ${isVisible ? "animate-fade-in-up animation-delay-300" : "opacity-0"}`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-8">{t("contactPage.faqTitle")}</h3>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details key={index} className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200">
                <summary className="flex cursor-pointer items-center gap-4 bg-gradient-to-r from-[#0085b2]/5 to-[#0085b2]/10 px-6 py-5 hover:bg-[#0085b2]/15 transition">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0085b2] text-white flex items-center justify-center font-bold text-sm">Q</span>
                  <span className="flex-1 text-base font-semibold text-gray-800">{item.question}</span>
                  <span className="text-sm text-[#0085b2] group-open:rotate-180 transition-transform duration-300">▼</span>
                </summary>

                <div className="flex gap-4 px-6 py-5 bg-white border-t border-gray-100">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#006794] text-white flex items-center justify-center font-bold text-sm">A</span>
                  <p className="flex-1 text-gray-700 leading-relaxed text-sm">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* School Info Card - Moved to bottom */}
        <div className={`${isVisible ? "animate-fade-in-up animation-delay-400" : "opacity-0"}`}>
          <div className="bg-gradient-to-br from-[#0085b2]/5 to-[#0085b2]/10 rounded-2xl p-8 md:p-10 border border-[#0085b2]/20 max-w-xl mx-auto">
            <h3 className="text-sm font-semibold text-[#0085b2] tracking-widest uppercase mb-6">学校法人KCP学園</h3>

            <div className="space-y-5">
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">学校名</p>
                <p className="text-xl font-bold text-gray-900">KCP地球市民日本語学校</p>
              </div>

              <div className="pt-5 border-t border-[#0085b2]/20 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">電話</p>
                  <p className="text-sm text-gray-900 font-medium">+81-3-6825-3388</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">メール</p>
                  <a href="mailto:info@kcp.ac.jp" className="text-sm text-[#0085b2] hover:underline font-medium">info@kcp.ac.jp</a>
                </div>
              </div>

              <div className="pt-5 border-t border-[#0085b2]/20">
                <p className="text-xs text-gray-500 font-medium mb-3">営業時間</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-900">
                  <p><span className="font-semibold">月～金:</span> 9:00～18:00</p>
                  <p><span className="font-semibold">土:</span> 10:00～17:00</p>
                  <p><span className="font-semibold">日・祝:</span> 定休日</p>
                </div>
                <p className="text-xs text-gray-500 italic mt-4">※日本時間での営業時間です</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
