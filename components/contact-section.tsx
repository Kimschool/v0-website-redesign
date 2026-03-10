"use client"

import { useEffect, useRef, useState } from "react"
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
  const { t } = useTranslation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
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
    console.log("Form submitted:", formData)
    // Add form submission logic here
    alert("お問い合わせありがとうございます。確認させていただきます。")
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
  }

  return (
    <section ref={sectionRef} id="contact" className="py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-4xl px-6">
        {/* Section heading */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            お問い合わせ
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            証明書発行をご希望される卒業生・修了生の皆様は、下記の申込み用紙をご利用ください。
            <br />
            その他のお問い合わせは、近隣の事務所またはお電話でお問い合わせください。
          </p>
        </div>

        {/* Contact Information Card */}
        <div className={`mb-16 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-8 ${isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"}`}>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">学校法人ウィーアス</h3>
              <p className="text-lg font-semibold text-gray-800 mb-4">KCP地球市民日本語学校</p>
              <div className="space-y-3 text-gray-700">
                <div>
                  <p className="font-semibold text-gray-800">電話</p>
                  <p className="text-base">+81-3-6825-3388</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">メール</p>
                  <p className="text-base">info@kcp.ac.jp</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">営業時間</h3>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">月～金:</span> 9:00～18:00</p>
                <p><span className="font-semibold">土:</span> 10:00～17:00</p>
                <p><span className="font-semibold">日・祝:</span> 定休日</p>
                <p className="text-sm text-gray-600 mt-4">
                  ※日本時間での営業時間です
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Notice Box */}
        <div className={`mb-12 p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
          <h3 className="font-semibold text-gray-900 mb-3">申込み用紙のご利用方法</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• 遠方にお住まいで学校へのご来校が困難な方は、下記の用紙で先にお申し込みください。</li>
            <li>• 受付後、こちらからご連絡いたします。</li>
            <li>• 発行までは通常3営業日要します。緊急の場合はお知らせください。</li>
          </ul>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className={`bg-white rounded-xl p-8 border border-gray-200 shadow-lg ${isVisible ? "animate-fade-in-up animation-delay-300" : "opacity-0"}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Name (Hiragana/Romaji) */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-2">
                性名（ひらがな・ローマ字）
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=""
              />
            </div>

            {/* Name (Kanji) */}
            <div>
              <label htmlFor="nameKanji" className="block text-sm font-semibold text-gray-800 mb-2">
                性名（漢字）
              </label>
              <input
                type="text"
                id="nameKanji"
                name="nameKanji"
                value={formData.nameKanji}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=""
              />
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-semibold text-gray-800 mb-2">
                性別
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">選択してください</option>
                <option value="male">男性</option>
                <option value="female">女性</option>
                <option value="other">その他</option>
              </select>
            </div>

            {/* Nationality */}
            <div>
              <label htmlFor="nationality" className="block text-sm font-semibold text-gray-800 mb-2">
                国籍
              </label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=""
              />
            </div>

            {/* Birth Date */}
            <div>
              <label htmlFor="birthDate" className="block text-sm font-semibold text-gray-800 mb-2">
                生年月日
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Student ID */}
            <div>
              <label htmlFor="studentId" className="block text-sm font-semibold text-gray-800 mb-2">
                学籍番号（わかる場合）
              </label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=""
              />
            </div>

            {/* Current Address */}
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-semibold text-gray-800 mb-2">
                現住所
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=""
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-2">
                電話番号
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=""
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=""
              />
            </div>

            {/* Certificate Type */}
            <div>
              <label htmlFor="certificateType" className="block text-sm font-semibold text-gray-800 mb-2">
                発行受けたい証明書の種類
              </label>
              <select
                id="certificateType"
                name="certificateType"
                value={formData.certificateType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">選択してください</option>
                <option value="graduate">卒業証明書</option>
                <option value="completion">修了証明書</option>
                <option value="attendance">在学証明書</option>
                <option value="other">その他</option>
              </select>
            </div>

            {/* Purpose */}
            <div>
              <label htmlFor="purpose" className="block text-sm font-semibold text-gray-800 mb-2">
                申請の目的
              </label>
              <input
                type="text"
                id="purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=""
              />
            </div>

            {/* Submission Place */}
            <div>
              <label htmlFor="submissionPlace" className="block text-sm font-semibold text-gray-800 mb-2">
                提出先
              </label>
              <input
                type="text"
                id="submissionPlace"
                name="submissionPlace"
                value={formData.submissionPlace}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=""
              />
            </div>

            {/* Receive Method */}
            <div>
              <label htmlFor="receiveMethod" className="block text-sm font-semibold text-gray-800 mb-2">
                受け取り方法
              </label>
              <select
                id="receiveMethod"
                name="receiveMethod"
                value={formData.receiveMethod}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">選択してください</option>
                <option value="mail">郵送</option>
                <option value="pickup">本人がお受け取り</option>
                <option value="proxy">代理人がお受け取り</option>
              </select>
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label htmlFor="notes" className="block text-sm font-semibold text-gray-800 mb-2">
                備考
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=""
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-12 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors duration-200"
            >
              送信する
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
