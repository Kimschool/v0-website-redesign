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

  const overseasOffices = [
    {
      name: "アメリカ事務所",
      details: [
        { label: "住所", value: "KCP International USA PO Box 28028　Bellingham, WA 98228-0028" },
        { label: "電話", value: "360-647-0072" },
        { label: "ウェブサイト", value: "https://www.kcpinternational.com/", isLink: true }
      ]
    },
    {
      name: "中国事務所",
      details: [
        { label: "住所", value: "天津市东丽区嘉春园17号楼1704" },
        { label: "電話", value: "15802246626" },
        { label: "メール", value: "1163052333@qq.com", isEmail: true }
      ]
    },
    {
      name: "台湾事務所",
      details: [
        { label: "住所", value: "台中市北区興進路256号5F-5" },
        { label: "電話", value: "+886-4-22345622" },
        { label: "メール", value: "taiwan@kcp.ac.jp", isEmail: true }
      ]
    },
    {
      name: "韓国事務所",
      details: [
        { label: "住所", value: "서울시 종로구 종로 19 (종로1가 24) 르메이에르종로타운 B동 1832호" },
        { label: "電話", value: "02-735-4422" },
        { label: "メール", value: "kcp@kcpkorea.com", isEmail: true }
      ]
    },
    {
      name: "マレーシア事務所",
      details: [
        { label: "機関名", value: "BMJ EDUCATION CENTRE SDN. BHD. (Bridge of Malaysia & Japan Education Centre)" },
        { label: "住所", value: "No.41-01, Jalan Setia 3/5, Taman Setia Indah, 81100 Johor Bahru, Johor, Malaysia" },
        { label: "電話", value: "+6012-751 6025" },
        { label: "メール", value: "information@bmj.com.my", isEmail: true },
        { label: "Facebook", value: "www.facebook.com/www.bmj.com.my", isLink: true }
      ]
    }
  ]

  const faqItems = [
    {
      question: "入学手続きはどこから始めればいいですか。",
      answer: "KCPでは、基本的に海外の提携事務所を通じて出願を受け付けています。日本での長期ビザ（日本国内で有効なビザ）をお持ちの方は、直接ご来校ください。職員がご説明いたします。"
    },
    {
      question: "日本語が初めてでも入学できますか。",
      answer: "留学ビザの申請には、日本語の学習時間は最低150時間（A1またはN5程度以上）の学習歴が必要です。1月入学を希望の方はA2またはN4合格相当が必要で、300時間の学習歴が必要です。"
    },
    {
      question: "クラス分けはどう行いますか。",
      answer: "入学前にプレメーンテストを行います。その結果によって午前（中上級）クラスか、午後（初級）クラスが決まりますので、必ず指定日に受けてください。クラス分けに異議がある場合、メールでお知らせした日にちまでにお申し出ください。但し午前・午後クラスの希望はできません。"
    },
    {
      question: "進級の時期や評価方法を教えてください。",
      answer: "KCPでは3か月ごとの学期になります。中間試験と期末試験、日ごろの小テストの平均点で進級できるかどうか判断します。"
    },
    {
      question: "自転車で通学できますか。",
      answer: "はい、学校には駐輪場がありますので自転車通学は可能です。まずは1階受付で手続きをしてください（卒業まで一括1000円かかります）。車・バイク・キックボードなどは停められませんので、ご了承ください。"
    },
    {
      question: "クレジットカードやアプリ決済は学校で使えますか。",
      answer: "いいえ、現金のみになります。学期開始前にあらかじめ日本円を用意することを強くお勧めします。クレジットカードやアプリ決済はできません。授業料などは銀行振り込みになります。教科書や各種証明書などは現金になります。"
    }
  ]

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
                {"発行受けたい証明書の種類"}
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

        {/* Overseas Offices Section */}
        <div className={`mb-16 ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">海外事務所</h3>
          <div className="space-y-3">
            {overseasOffices.map((office, index) => (
              <details key={index} className="group border border-gray-300 rounded-lg overflow-hidden hover:border-blue-400 transition">
                <summary className="flex cursor-pointer items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 font-semibold text-gray-800 hover:bg-blue-100 transition">
                  <span>{office.name}</span>
                  <span className="text-xl font-bold text-blue-500 group-open:rotate-180 transition-transform duration-300">▼</span>
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
                          className="text-blue-500 hover:text-blue-700 hover:underline break-all"
                        >
                          {detail.value}
                        </a>
                      ) : detail.isEmail ? (
                        <a
                          href={`mailto:${detail.value}`}
                          className="text-blue-500 hover:text-blue-700 hover:underline"
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
          <h3 className="text-2xl font-bold text-gray-900 mb-8">よくある質問</h3>
          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <details key={index} className="group border border-gray-300 rounded-lg overflow-hidden hover:border-blue-400 transition">
                <summary className="flex cursor-pointer items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 font-semibold text-gray-800 hover:bg-blue-100 transition">
                  <span>{item.question}</span>
                  <span className="text-xl font-bold text-blue-500 group-open:rotate-180 transition-transform duration-300">▼</span>
                </summary>

                <div className="px-6 py-4 bg-white border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
