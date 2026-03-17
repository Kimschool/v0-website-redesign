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
        }
      },
      { threshold: 0 }
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
        { label: t("contactPage.offices.0.details.2.label"), value: "https://www.kcpinternational.com/", isLink: true }
      ]
    },
    {
      name: t("contactPage.offices.1.name"),
      details: [
        { label: t("contactPage.offices.1.details.0.label"), value: "天津市东丽区嘉春园17号楼1704" },
        { label: t("contactPage.offices.1.details.1.label"), value: "15802246626" },
        { label: t("contactPage.offices.1.details.2.label"), value: "1163052333@qq.com", isEmail: true }
      ]
    },
    {
      name: t("contactPage.offices.2.name"),
      details: [
        { label: t("contactPage.offices.2.details.0.label"), value: "台中市北区興進路256号5F-5" },
        { label: t("contactPage.offices.2.details.1.label"), value: "+886-4-22345622" },
        { label: t("contactPage.offices.2.details.2.label"), value: "taiwan@kcp.ac.jp", isEmail: true }
      ]
    },
    {
      name: t("contactPage.offices.3.name"),
      details: [
        { label: t("contactPage.offices.3.details.0.label"), value: "서울시 종로구 종로 19 (종로1가 24) 르메이에르종로타운 B동 1832호" },
        { label: t("contactPage.offices.3.details.1.label"), value: "02-735-4422" },
        { label: t("contactPage.offices.3.details.2.label"), value: "kcp@kcpkorea.com", isEmail: true }
      ]
    },
    {
      name: t("contactPage.offices.4.name"),
      details: [
        { label: t("contactPage.offices.4.details.0.label"), value: "BMJ EDUCATION CENTRE SDN. BHD. (Bridge of Malaysia & Japan Education Centre)" },
        { label: t("contactPage.offices.4.details.1.label"), value: "No.41-01, Jalan Setia 3/5, Taman Setia Indah, 81100 Johor Bahru, Johor, Malaysia" },
        { label: t("contactPage.offices.4.details.2.label"), value: "+6012-751 6025" },
        { label: t("contactPage.offices.4.details.3.label"), value: "information@bmj.com.my", isEmail: true },
        { label: "Facebook", value: "www.facebook.com/www.bmj.com.my", isLink: true }
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
        {/* Section heading */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="w-12 h-1 bg-[#0085b2] mx-auto mb-6 rounded-full" />
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            {t("contactPage.intro")}
          </p>
          <div className="elegant-divider mt-8" />
        </div>
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
                <h3 className="text-xl font-bold text-gray-900">{t("contactPage.formSections.personal")}</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name (Kanji) */}
              <div>
                <label htmlFor="nameKanji" className="block text-sm font-medium text-gray-700 mb-2.5">
                  {t("contactPage.formLabels.nameKanji")} <span className="text-[#0085b2] font-bold">*</span>
                </label>
                <input
                  type="text"
                  id="nameKanji"
                  name="nameKanji"
                  value={formData.nameKanji}
                  onChange={handleChange}
                  required
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
                  {t("contactPage.formLabels.gender")}
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
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
                  {t("contactPage.formLabels.nationality")}
                </label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0085b2] focus:shadow-lg focus:shadow-[#0085b2]/10 transition-all duration-200"
                />
              </div>

              {/* Birth Date */}
              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2.5">
                  {t("contactPage.formLabels.birthDate")}
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0085b2] focus:shadow-lg focus:shadow-[#0085b2]/10 transition-all duration-200"
                />
              </div>

              {/* Student ID */}
              <div>
                <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-2.5">
                  {t("contactPage.formLabels.studentId")}
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
                  {t("contactPage.formLabels.address")}
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0085b2] focus:shadow-lg focus:shadow-[#0085b2]/10 transition-all duration-200"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2.5">
                  {t("contactPage.formLabels.phone")}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
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
                <h3 className="text-xl font-bold text-gray-900">{t("contactPage.formSections.certificate")}</h3>
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
                  <option value="">{t("contactPage.certificateOptions.selectDefault")}</option>
                  <option value="attendance">{t("contactPage.certificateOptions.attendance")}</option>
                  <option value="graduation">{t("contactPage.certificateOptions.graduation")}</option>
                  <option value="withdrawal">{t("contactPage.certificateOptions.withdrawal")}</option>
                </select>
              </div>

              {/* Purpose */}
              <div>
                <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2.5">
                  {t("contactPage.formLabels.purpose")}
                </label>
                <input
                  type="text"
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0085b2] focus:shadow-lg focus:shadow-[#0085b2]/10 transition-all duration-200"
                />
              </div>

              {/* Submission Place */}
              <div>
                <label htmlFor="submissionPlace" className="block text-sm font-medium text-gray-700 mb-2.5">
                  {t("contactPage.formLabels.submissionPlace")}
                </label>
                <input
                  type="text"
                  id="submissionPlace"
                  name="submissionPlace"
                  value={formData.submissionPlace}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#0085b2] focus:shadow-lg focus:shadow-[#0085b2]/10 transition-all duration-200"
                />
              </div>

              {/* Receive Method */}
              <div>
                <label htmlFor="receiveMethod" className="block text-sm font-medium text-gray-700 mb-2.5">
                  {t("contactPage.formLabels.receiveMethod")}
                </label>
                <select
                  id="receiveMethod"
                  name="receiveMethod"
                  value={formData.receiveMethod}
                  onChange={handleChange}
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
                <h3 className="text-xl font-bold text-gray-900">{t("contactPage.formSections.additional")}</h3>
              </div>
            </div>
            <div>
              {/* Notes */}
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2.5">
                {t("contactPage.formLabels.notes")} <span className="text-[#0085b2] font-bold">*</span>
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                required
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

        {/* Divider */}
        <div className="w-full h-px bg-gray-300 mb-16" />

        {/* Contact Information Card */}
        <div className={`mb-16 bg-[#f0ffff] border-l-4 border-[#0085b2] rounded-lg p-8 ${isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"}`}>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t("contactPage.contactInfo.orgName")}</h3>
              <p className="text-lg font-semibold text-gray-800 mb-4">{t("contactPage.contactInfo.schoolName")}</p>
              <div className="space-y-3 text-gray-700">
                <div>
                  <p className="font-semibold text-gray-800">{t("contactPage.contactInfo.telLabel")}</p>
                  <p className="text-base">+81-3-6825-3388</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{t("contactPage.contactInfo.emailLabel")}</p>
                  <p className="text-base">info@kcp.ac.jp</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">{t("contactPage.contactInfo.hoursTitle")}</h3>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">{t("contactPage.contactInfo.weekday")}</span> 9:00～18:00</p>
                <p><span className="font-semibold">{t("contactPage.contactInfo.saturday")}</span> 10:00～17:00</p>
                <p><span className="font-semibold">{t("contactPage.contactInfo.sundayHoliday")}</span> {t("contactPage.contactInfo.sundayHolidayHours")}</p>
                <p className="text-sm text-gray-600 mt-4">
                  {t("contactPage.contactInfo.hoursNote")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Notice Box */}
        <div className={`mb-12 p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
          <h3 className="font-semibold text-gray-900 mb-3">{t("contactPage.noticeTitle")}</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• {t("contactPage.noticeItems.0")}</li>
            <li>• {t("contactPage.noticeItems.1")}</li>
            <li>• {t("contactPage.noticeItems.2")}</li>
          </ul>
        </div>

        {/* Overseas Offices Section */}
        <div className={`mb-16 ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">{t("contactPage.overseasTitle")}</h3>
          <div className="space-y-3">
            {overseasOffices.map((office, index) => (
              <details key={index} className="group border border-gray-300 rounded-lg overflow-hidden hover:border-[#0085b2] transition">
                <summary className="flex cursor-pointer items-center justify-between bg-gradient-to-r from-[#f0ffff] to-[#0085b2]/10 px-6 py-4 font-semibold text-gray-800 hover:bg-[#0085b2]/10 transition">
                  <span>{office.name}</span>
                  <span className="text-xl font-bold text-[#0085b2] group-open:rotate-180 transition-transform duration-300">▼</span>
                </summary>

                <div className="px-6 py-4 bg-white space-y-3 border-t border-gray-200">
                  {office.details.map((detail, idx) => (
                    <div key={idx} className="flex flex-col">
                      <p className="text-sm font-semibold text-gray-600 mb-1">{detail.label}</p>
                      {detail.isLink ? (
                        <a
                          href={detail.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0085b2] hover:text-[#006794] hover:underline break-all"
                        >
                          {detail.value}
                        </a>
                      ) : detail.isEmail ? (
                        <a
                          href={`mailto:${detail.value}`}
                          className="text-[#0085b2] hover:text-[#006794] hover:underline"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="text-gray-700">{detail.value}</p>
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
              <details key={index} className="group border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <summary className="flex cursor-pointer items-center gap-4 bg-[#0085b2]/10 px-6 py-5 hover:bg-[#0085b2]/15 transition">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0085b2] text-white flex items-center justify-center font-bold text-sm">Q</span>
                  <span className="flex-1 text-base font-bold text-[#0085b2]">{item.question}</span>
                  <span className="text-lg font-bold text-[#0085b2] group-open:rotate-180 transition-transform duration-300">▼</span>
                </summary>

                <div className="flex gap-4 px-6 py-5 bg-white border-t border-gray-100">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#006794] text-white flex items-center justify-center font-bold text-sm">A</span>
                  <p className="flex-1 text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
