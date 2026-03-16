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
  const [recipientEmail, setRecipientEmail] = useState("")
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
    if (!recipientEmail) {
      setSubmitStatus({ type: "error", message: t("contactPage.submitErrorEmail") })
      return
    }
    setIsSubmitting(true)
    setSubmitStatus(null)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recipientEmail }),
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
      {/* Page Banner */}
      <div className="relative h-[250px] md:h-[300px] w-full overflow-hidden">
        <Image
          src="/images/original_from_customer/トップ背景/05_お問い合わせ.jpg"
          alt="お問い合わせ"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">{t("contactPage.bannerTitle")}</h1>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        {/* Section heading */}
        <div className={`text-center mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t("contactPage.intro")}
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className={`bg-card rounded-2xl border-2 border-border overflow-hidden ${isVisible ? "animate-fade-in-up animation-delay-300" : "opacity-0"}`}>
          {/* Test recipient email block */}
          <div className="p-5 bg-amber-50 border-b-2 border-amber-200">
            <label htmlFor="recipientEmail" className="block text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
              {t("contactPage.testEmailLabel")}
            </label>
            <input
              type="email"
              id="recipientEmail"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-foreground transition-all"
              placeholder="test@example.com"
            />
            <p className="mt-2 text-xs text-amber-700">{t("contactPage.testEmailNote")}</p>
          </div>

          {submitStatus && (
            <div className={`mx-6 mt-6 p-4 rounded-lg ${submitStatus.type === "success" ? "bg-emerald-50 border-2 border-emerald-300 text-emerald-800" : "bg-red-50 border-2 border-red-300 text-red-800"}`}>
              {submitStatus.message}
            </div>
          )}

          {/* STEP 1: Personal Information */}
          <div className="p-6 md:p-8 border-b border-border">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-6">
              STEP 1: {t("contactPage.formLabels.personalInfo") || "Personal Information"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name (Kanji) */}
              <div className="space-y-2">
                <label htmlFor="nameKanji" className="block text-sm font-semibold text-foreground uppercase tracking-wide">
                  {t("contactPage.formLabels.nameKanji")}
                </label>
                <input
                  type="text"
                  id="nameKanji"
                  name="nameKanji"
                  value={formData.nameKanji}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground transition-all"
                />
              </div>

              {/* Name (English) */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-semibold text-foreground uppercase tracking-wide">
                  {t("contactPage.formLabels.name")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground transition-all"
                />
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label htmlFor="gender" className="block text-sm font-semibold text-foreground uppercase tracking-wide">
                  {t("contactPage.formLabels.gender")} <span className="text-red-500">*</span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground transition-all appearance-none cursor-pointer"
                >
                  <option value="">{t("contactPage.genderOptions.selectDefault")}</option>
                  <option value="male">{t("contactPage.genderOptions.male")}</option>
                  <option value="female">{t("contactPage.genderOptions.female")}</option>
                  <option value="other">{t("contactPage.genderOptions.other")}</option>
                </select>
              </div>

              {/* Nationality */}
              <div className="space-y-2">
                <label htmlFor="nationality" className="block text-sm font-semibold text-foreground uppercase tracking-wide">
                  {t("contactPage.formLabels.nationality")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground transition-all"
                />
              </div>

              {/* Birth Date */}
              <div className="space-y-2">
                <label htmlFor="birthDate" className="block text-sm font-semibold text-foreground uppercase tracking-wide">
                  {t("contactPage.formLabels.birthDate")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground transition-all"
                />
              </div>

              {/* Student ID */}
              <div className="space-y-2">
                <label htmlFor="studentId" className="block text-sm font-semibold text-foreground uppercase tracking-wide">
                  {t("contactPage.formLabels.studentId")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground transition-all"
                />
              </div>

              {/* Current Address */}
              <div className="md:col-span-2 space-y-2">
                <label htmlFor="address" className="block text-sm font-semibold text-foreground uppercase tracking-wide">
                  {t("contactPage.formLabels.address")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground transition-all"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-semibold text-foreground uppercase tracking-wide">
                  {t("contactPage.formLabels.phone")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-foreground uppercase tracking-wide">
                  {t("contactPage.formLabels.email")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground transition-all"
                />
              </div>
            </div>
          </div>

          {/* STEP 2: Certificate Information */}
          <div className="p-6 md:p-8 border-b border-border bg-muted/30">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-6">
              STEP 2: {t("contactPage.formLabels.certificateInfo") || "Certificate Information"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Certificate Type */}
              <div className="space-y-2">
                <label htmlFor="certificateType" className="block text-sm font-semibold text-foreground uppercase tracking-wide">
                  {t("contactPage.formLabels.certificateType")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="certificateType"
                  name="certificateType"
                  value={formData.certificateType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground transition-all"
                />
              </div>

              {/* Purpose */}
              <div className="space-y-2">
                <label htmlFor="purpose" className="block text-sm font-semibold text-foreground uppercase tracking-wide">
                  {t("contactPage.formLabels.purpose")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground transition-all"
                />
              </div>

              {/* Submission Place */}
              <div className="space-y-2">
                <label htmlFor="submissionPlace" className="block text-sm font-semibold text-foreground uppercase tracking-wide">
                  {t("contactPage.formLabels.submissionPlace")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="submissionPlace"
                  name="submissionPlace"
                  value={formData.submissionPlace}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground transition-all"
                />
              </div>

              {/* Receive Method */}
              <div className="space-y-2">
                <label htmlFor="receiveMethod" className="block text-sm font-semibold text-foreground uppercase tracking-wide">
                  {t("contactPage.formLabels.receiveMethod")} <span className="text-red-500">*</span>
                </label>
                <select
                  id="receiveMethod"
                  name="receiveMethod"
                  value={formData.receiveMethod}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground transition-all appearance-none cursor-pointer"
                >
                  <option value="">{t("contactPage.receiveOptions.selectDefault")}</option>
                  <option value="mail">{t("contactPage.receiveOptions.mail")}</option>
                  <option value="pickup">{t("contactPage.receiveOptions.pickup")}</option>
                  <option value="proxy">{t("contactPage.receiveOptions.proxy")}</option>
                </select>
              </div>

              {/* Notes */}
              <div className="md:col-span-2 space-y-2">
                <label htmlFor="notes" className="block text-sm font-semibold text-foreground uppercase tracking-wide">
                  {t("contactPage.formLabels.notes")}
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="p-6 md:p-8 bg-card">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto md:min-w-[200px] mx-auto flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-wider rounded-lg hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t("contactPage.submittingBtn") : t("contactPage.submitBtn")}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="my-16" />

        {/* Contact Information Card */}
        <div className={`mb-12 bg-card border-2 border-border rounded-2xl overflow-hidden ${isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"}`}>
          <div className="grid md:grid-cols-2">
            <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-border">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">{t("contactPage.contactInfo.orgName")}</h3>
              <p className="text-lg font-semibold text-foreground mb-6">{t("contactPage.contactInfo.schoolName")}</p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t("contactPage.contactInfo.telLabel")}</p>
                    <p className="text-foreground font-medium">+81-3-6825-3388</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t("contactPage.contactInfo.emailLabel")}</p>
                    <p className="text-foreground font-medium">info@kcp.ac.jp</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8 bg-muted/30">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">{t("contactPage.contactInfo.hoursTitle")}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm font-medium text-muted-foreground">{t("contactPage.contactInfo.weekday")}</span>
                  <span className="text-sm font-semibold text-foreground">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm font-medium text-muted-foreground">{t("contactPage.contactInfo.saturday")}</span>
                  <span className="text-sm font-semibold text-foreground">10:00 - 17:00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-muted-foreground">{t("contactPage.contactInfo.sundayHoliday")}</span>
                  <span className="text-sm font-semibold text-foreground">{t("contactPage.contactInfo.sundayHolidayHours")}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
                  {t("contactPage.contactInfo.hoursNote")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Notice Box */}
        <div className={`mb-12 p-6 bg-amber-50 border-2 border-amber-200 rounded-xl ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
          <h3 className="font-bold text-amber-800 uppercase tracking-wider text-sm mb-3">{t("contactPage.noticeTitle")}</h3>
          <ul className="text-sm text-amber-700 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1">&#9679;</span>
              {t("contactPage.noticeItems.0")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1">&#9679;</span>
              {t("contactPage.noticeItems.1")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1">&#9679;</span>
              {t("contactPage.noticeItems.2")}
            </li>
          </ul>
        </div>

        {/* Overseas Offices Section */}
        <div className={`mb-16 ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-6">{t("contactPage.overseasTitle")}</h3>
          <div className="space-y-3">
            {overseasOffices.map((office, index) => (
              <details key={index} className="group border-2 border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all">
                <summary className="flex cursor-pointer items-center justify-between bg-muted/30 px-6 py-4 font-semibold text-foreground hover:bg-muted/50 transition">
                  <span>{office.name}</span>
                  <svg className="w-5 h-5 text-primary group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>

                <div className="px-6 py-5 bg-card space-y-3 border-t-2 border-border">
                  {office.details.map((detail, idx) => (
                    <div key={idx} className="flex flex-col">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">{detail.label}</p>
                      {detail.isLink ? (
                        <a
                          href={detail.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 hover:underline break-all transition-colors"
                        >
                          {detail.value}
                        </a>
                      ) : detail.isEmail ? (
                        <a
                          href={`mailto:${detail.value}`}
                          className="text-primary hover:text-primary/80 hover:underline transition-colors"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="text-foreground">{detail.value}</p>
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
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-8">{t("contactPage.faqTitle")}</h3>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details key={index} className="group border-2 border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all">
                <summary className="flex cursor-pointer items-center gap-4 bg-muted/30 px-6 py-5 hover:bg-muted/50 transition">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">Q</span>
                  <span className="flex-1 text-base font-semibold text-foreground">{item.question}</span>
                  <svg className="w-5 h-5 text-primary group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>

                <div className="flex gap-4 px-6 py-5 bg-card border-t-2 border-border">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">A</span>
                  <p className="flex-1 text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
