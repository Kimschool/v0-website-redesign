"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

// 年度別進学実績テーブルコンポーネント
function YearResultsTable({ year }: { year: string }) {
  const data: Record<string, { 国公立: string[]; 私立: string[]; 音楽美術?: string[] }> = {
    "2024": {
      国公立: ["東北大学", "東京農工大学", "茨城大学", "山口大学"],
      私立: [
        "立教大学", "明治大学", "中央大学", "法政大学", "青山学院大学", "立命館大学", "関西学院大学",
        "東京理科大学", "東京薬科大学", "明治薬科大学", "東洋大学", "帝京大学", "東海大学",
        "湘南工科大学", "東京工芸大学", "国士館大学", "昭和女子大学", "二松学舎大学", "文教大学",
        "武蔵野大学", "中央学院大学", "龍谷大学", "大阪観光大学", "東京国際大学", "関西国際大学",
        "多摩大学", "西武文理大学", "高千穂大学", "創価大学", "城西大学", "千葉科学大学",
        "ものつくり大学"
      ],
      音楽美術: [
        "武蔵野音楽大学", "多摩美術大学", "日本大学", "女子美術大学", "洗足学園音楽大学",
        "昭和音楽大学", "京都精華大学", "京都芸術大学", "文化学園大学", "尚美学園大学",
        "開志専門職大学"
      ]
    },
    "2023": {
      国公立: [
        "東京工業大学", "一橋大学", "京都大学", "九州大学", "名古屋大学", "筑波大学",
        "東京学芸大学", "神戸大学", "東京外国語大学", "千葉大学", "東京藝術大学",
        "宇都宮大学", "群馬大学", "長崎大学", "山口大学"
      ],
      私立: [
        "早稲田大学", "東京医科歯科大学", "東京理科大学", "立教大学", "明治大学", "法政大学",
        "青山学院大学", "立命館大学", "関西学院大学", "龍谷大学", "東京農業大学", "東洋大学",
        "日本大学", "専修大学", "駒澤大学", "東海大学", "帝京大学", "大東文化大学", "拓殖大学",
        "二松学舎大学", "神奈川大学", "東京電機大学", "東京工科大学", "武蔵野美術大学",
        "多摩美術大学", "女子美術大学", "金沢美術工芸大学", "京都芸術大学", "京都精華大学",
        "大阪芸術大学", "名古屋芸術大学", "名古屋造形大学", "昭和音楽大学", "洗足学園音楽大学",
        "文化学園大学", "桜美林大学", "山梨学院大学", "大手前大学", "嘉悦大学", "千葉科学大学",
        "城西大学", "国際大学", "ハリウッド大学院大学"
      ]
    }
  }

  const yearData = data[year]

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 text-white font-bold text-lg">
        {year}年度 進学実績
      </div>
      <div className="p-6 space-y-6">
        {yearData && (
          <>
            <div>
              <h4 className="font-bold text-blue-900 mb-4">【国公立大学/大学院】</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {yearData.国公立.map((uni, idx) => (
                  <div key={idx} className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center hover:bg-blue-100 transition">
                    <p className="text-gray-800 font-semibold text-sm">{uni}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-purple-900 mb-4">【私立大学/大学院】</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {yearData.私立.map((uni, idx) => (
                  <div key={idx} className="p-3 bg-purple-50 rounded-lg border border-purple-200 text-center hover:bg-purple-100 transition">
                    <p className="text-gray-800 font-semibold text-sm">{uni}</p>
                  </div>
                ))}
              </div>
            </div>

            {yearData.音楽美術 && (
              <div>
                <h4 className="font-bold text-red-900 mb-4">【音楽系/美術系大学】</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {yearData.音楽美術.map((uni, idx) => (
                    <div key={idx} className="p-3 bg-red-50 rounded-lg border border-red-200 text-center hover:bg-red-100 transition">
                      <p className="text-gray-800 font-semibold text-sm">{uni}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// 2022-2019年の折りたたみコンポーネント
function ToggleableYearResults() {
  const [expandedYears, setExpandedYears] = useState<Record<string, boolean>>({
    "2022": false,
    "2021": false,
    "2020": false,
    "2019": false,
  })

  const toggleYear = (year: string) => {
    setExpandedYears(prev => ({
      ...prev,
      [year]: !prev[year]
    }))
  }

  const pastYears: Record<string, { 国公立: string[]; 私立: string[] }> = {
    "2022": {
      国公立: [
        "京都大学", "大阪大学", "東京工業大学", "北海道大学", "名古屋大学", "九州大学", "神戸大学",
        "横浜市立大学", "兵庫県立大学", "東京学芸大学", "埼玉大学", "茨城大学", "山梨大学",
        "長崎大学", "室蘭工業大学", "上越教育大学"
      ],
      私立: [
        "早稲田大学", "上智大学", "東京理科大学", "同志社大学", "明治大学", "立教大学", "青山学院大学",
        "中央大学", "法政大学", "立命館大学", "関西学院大学", "関西大学", "明治学院大学", "順天堂大学",
        "学習院大学", "武蔵野大学", "東洋大学", "日本大学", "東海大学", "帝京大学", "神奈川大学工学院",
        "中京大学", "東京工芸大学", "東京造形大学", "武蔵野美術大学", "多摩美術大学", "女子美術大学",
        "洗足学園音楽大学", "京都芸術大学", "京都精華大学", "神戸芸術工科大学", "東北芸術工科大学",
        "名古屋造形大学", "静岡文化芸術大学", "宝塚大学", "拓殖大学", "城西大学", "東京国際大学",
        "埼玉工業大学", "文化学園大学", "文化ファッション大学院大学", "京都情報大学", "大阪観光大学",
        "法政大学専門職大学院"
      ]
    },
    "2021": {
      国公立: [
        "京都大学", "東京工業大学", "北海道大学", "名古屋大学", "筑波大学", "お茶の水大学",
        "横浜国立大学", "広島大学", "東京都立大学", "千葉大学", "滋賀大学", "埼玉大学",
        "兵庫教育大学", "上越教育大学", "近畿大学", "京都市立芸術大学", "愛知県立芸術大学",
        "広島市立大学"
      ],
      私立: [
        "慶應義塾大学", "早稲田大学", "上智大学", "東京理科大学", "同志社大学", "明治大学", "立命館大学",
        "青山学院大学", "中央大学", "法政大学", "関西学院大学", "関西大学", "立命館アジア太平洋大学",
        "西南学院大学", "学習院大学", "明治学院大学", "東京女子大学", "昭和女子大学", "武蔵野大学",
        "芝浦工業大学", "東京農業大学", "東京電機大学", "工学院大学", "長岡技術科学大学", "産業医科大学",
        "専修大学", "東洋大学", "日本大学", "東海大学", "帝京大学", "神奈川工科大学", "二松学舎大学",
        "国士舘大学", "亜細亜大学", "拓殖大学", "大東文化大学", "昭和薬科大学", "多摩美術大学",
        "武蔵野美術大学", "東京造形大学", "京都芸術大学", "京都精華大学", "大阪芸術大学", "神戸芸術工科大学",
        "成安造形大学", "静岡文化芸術大学", "倉敷芸術科学大学", "横浜美術大学", "洗足学園音楽大学",
        "武蔵野音楽大学", "日本映画大学", "東京工芸大学", "文化学園大学", "文化ファッション大学院大学",
        "京都ノートルダム女子大学", "学習院女子大学", "駒沢女子大学", "麻布大学", "熊本学園大学",
        "大阪経済法科大学", "明海大学", "横浜商科大学", "埼玉工業大学", "日本工業大学", "北海道科学大学",
        "山梨学院大学", "愛知産業大学", "筑波学院大学", "新潟産業大学", "至誠館大学", "千葉科学大学",
        "日本経済大学", "宝塚大学", "テンプル大学ジャパンキャンパス", "青山学院大学専門職大学院",
        "法政大学専門職大学院", "明治大学専門職大学院", "池坊短期大学"
      ]
    },
    "2020": {
      国公立: [
        "東京大学", "京都大学", "東京工業大学", "一橋大学", "大阪大学", "名古屋大学", "九州大学",
        "北海道大学", "神戸大学", "筑波大学", "東京外国語大学", "横浜国立大学", "広島大学",
        "金沢大学", "電気通信大学", "東京藝術大学", "熊本大学", "信州大学", "埼玉大学",
        "東京学芸大学", "首都大学東京", "富山大学", "山梨大学", "茨城大学", "弘前大学",
        "京都市立芸術大学"
      ],
      私立: [
        "慶應義塾大学", "早稲田大学", "上智大学", "東京理科大学", "明治大学", "立命館大学", "中央大学",
        "法政大学", "学習院大学", "青山学院大学", "名古屋工業大学", "北陸先端科学技術大学", "日本女子大学",
        "東京都市大学", "東京農業大学", "東京電機大学", "武蔵野美術大学", "多摩美術大学", "女子美術大学",
        "日本大学", "東洋大学", "駒澤大学", "獨協大学", "明治学院大学", "国際医療福祉大学", "武蔵野大学",
        "東海大学", "工学院大学", "都留文科大学", "神奈川大学", "大東文化大学", "帝京大学", "淑徳大学",
        "東京造形大学", "尚美学園大学", "神戸芸術工科大学", "名古屋芸術大学", "日本工業大学", "桜美林大学",
        "立正大学", "文化学園大学", "文化ファッション大学院大学", "東邦音楽大学", "大阪体育大学",
        "千葉科学大学", "京都情報大学", "山梨学院大学", "国士舘大学", "松陰大学", "武蔵野学院大学",
        "東京福祉大学", "埼玉工業大学", "第一工業大学", "事業創造大学", "デジタルハリウッド大学院"
      ]
    },
    "2019": {
      国公立: [
        "東京大学", "一橋大学", "東京工業大学", "大阪大学", "北海道大学", "九州大学", "神戸大学",
        "筑波大学", "千葉大学", "広島大学", "東京藝術大学", "埼玉大学", "信州大学", "群馬大学",
        "富山大学", "愛知県立芸術大学", "秋田公立美術大学"
      ],
      私立: [
        "東京大学医科歯科大学", "慶應義塾大学", "早稲田大学", "上智大学", "東京理科大学", "明治大学",
        "立教大学", "同志社大学", "中央大学", "法政大学", "関西学院大学", "関西大学", "立命館アジア太平洋大学",
        "西南学院大学", "学習院大学", "青山学院大学", "芝浦工業大学", "小樽商科大学", "日本女子大学",
        "東京農業大学", "東京海洋大学", "京都産業大学", "中京大学", "成蹊大学", "武蔵野美術大学",
        "多摩美術大学", "女子美術大学", "京都造形芸術大学", "名古屋美術大学", "神戸芸術工科大学",
        "京都精華大学", "専修大学", "東洋大学", "駒澤大学", "日本大学", "明治学院大学", "東京経済大学",
        "文教大学", "フェリス女学院大学", "昭和女子大学", "工学院大学", "東京工科大学", "武蔵野大学",
        "拓殖大学", "大東文化大学", "帝京大学", "城西大学", "麻布大学", "東洋学園大学", "横浜商科大学",
        "山口東京理科大学", "京都情報大学", "尚美学園大学", "文化学園大学", "文化女子大学", "東京造形大学",
        "東京工芸大学", "東邦音楽大学", "日本映画大学", "明海大学", "国士舘大学", "札幌学院大学",
        "松陰大学", "平成帝京科学大学", "東京福祉大学", "日本経済大学", "宝塚大学", "城西短期大学",
        "産業技術大学院大学", "慶応ビジネススクール", "北陸先端技術大学院"
      ]
    }
  }

  const yearOrder = ["2022", "2021", "2020", "2019"]

  return (
    <div className="space-y-4">
      {yearOrder.map((year) => (
        <div key={year} className="border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleYear(year)}
            className="w-full bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 px-6 py-4 text-white font-bold text-lg flex items-center justify-between transition"
          >
            <span>{year}年度 進学実績</span>
            <span className={`transform transition-transform ${expandedYears[year] ? "rotate-180" : ""}`}>
              ▼
            </span>
          </button>

          {expandedYears[year] && (
            <div className="p-6 bg-gray-50 space-y-6">
              <div>
                <h5 className="font-bold text-blue-900 mb-3">【国公立大学/大学院】</h5>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {pastYears[year].国公立.map((uni, idx) => (
                    <div key={idx} className="p-2 bg-white rounded-lg border border-blue-300 text-center hover:bg-blue-50 transition">
                      <p className="text-gray-800 font-semibold text-xs md:text-sm">{uni}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-bold text-purple-900 mb-3">【私立大学/大学院】</h5>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {pastYears[year].私立.map((uni, idx) => (
                    <div key={idx} className="p-2 bg-white rounded-lg border border-purple-300 text-center hover:bg-purple-50 transition">
                      <p className="text-gray-800 font-semibold text-xs md:text-sm">{uni}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="education" className="bg-white">
      {/* Page Header */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden">
        <Image
          src="/images/education-header.jpg"
          alt="教育内容"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">教育内容</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-2xl font-semibold mb-8 text-gray-700 leading-relaxed">
              世界から集う若者に、質の高い日本語教育を。確かな日本語力ときめ細かな進路指導で夢の実現を支えていきます。
            </h2>
            <div className="w-full h-px bg-gray-300" />
          </div>

          {/* 進学実績 */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">進学実績</h2>

            <div className="space-y-4">
              <YearResultsTable year="2024" />
              <YearResultsTable year="2023" />
              <ToggleableYearResults />
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mt-8">
              <p className="text-gray-700 text-sm leading-relaxed text-center">
                <strong>多くの卒業生が難関大学・専門学校への進学を実現。</strong><br />
                KCPは確かな進学実績と、指定校推薦枠を通じて、学びの先の未来を支えています。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
