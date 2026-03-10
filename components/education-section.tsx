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
        "武蔵野音楽大学", "日本映画大学", "東京工芸大学", "文化学園大学", "文化ファッション大学院大学"
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
        "法政大学", "学習院大学", "青山学院大学", "日本女子大学", "東京都市大学", "東京農業大学",
        "東京電機大学", "武蔵野美術大学", "多摩美術大学", "女子美術大学", "日本大学", "東洋大学",
        "駒澤大学", "獨協大学", "明治学院大学", "国際医療福祉大学", "武蔵野大学", "東海大学",
        "工学院大学", "神奈川大学", "大東文化大学", "帝京大学", "東京造形大学", "尚美学園大学",
        "神戸芸術工科大学", "名古屋芸術大学", "日本工業大学", "桜美林大学", "立正大学", "文化学園大学"
      ]
    },
    "2019": {
      国公立: [
        "東京大学", "一橋大学", "東京工業大学", "大阪大学", "北海道大学", "九州大学", "神戸大学",
        "筑波大学", "千葉大学", "広島大学", "東京藝術大学", "埼玉大学", "信州大学", "群馬大学",
        "富山大学", "愛知県立芸術大学", "秋田公立美術大学"
      ],
      私立: [
        "慶應義塾大学", "早稲田大学", "上智大学", "東京理科大学", "明治大学", "立教大学", "同志社大学",
        "中央大学", "法政大学", "関西学院大学", "関西大学", "学習院大学", "青山学院大学", "芝浦工業大学",
        "日本女子大学", "東京農業大学", "武蔵野美術大学", "多摩美術大学", "女子美術大学", "京都精華大学",
        "専修大学", "東洋大学", "駒澤大学", "日本大学", "明治学院大学", "文教大学", "昭和女子大学",
        "工学院大学", "東京工科大学", "武蔵野大学", "拓殖大学", "大東文化大学", "帝京大学", "城西大学"
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

          {/* 教育理念・教育方針 */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">教育理念・教育方針</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                本学の基本理念は、若者が切磋琢磨しながら学び成長し、21世紀を生き抜く力を身につけて世界の平和と繁栄に貢献することにある。そのためには、科学技術が進展する現代において、自主・自立・自尊と、自省・自制・自戒を併せ持つバランスの取れた精神が不可欠であり、これを基盤とし、自文化と異文化を正しく理解し、普遍的な人類観を育む。
              </p>
              <p>
                本学は、生涯にわたって主体的に学び続ける姿勢を重視し、批判力・論理力・明晰性といった学びの基礎力を育成するとともに、大学や企業活動にも通用する高度で実践的な日本語力の養成を教育目標とする。
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-20" />

          {/* コース紹介 */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-gray-900">コース紹介</h2>

            {/* 進学準備教育 */}
            <div className="mb-16">
              <h3 className="text-lg md:text-xl font-bold mb-6 text-gray-800 border-l-4 border-blue-500 pl-4">
                進学準備教育　2年課程 / 1年6か月課程
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                  <Image
                    src="https://weavus-group.com/kcp/wp-content/uploads/2026/02/%E3%82%B3%E3%83%BC%E3%82%B9%E7%B4%B9%E4%BB%8B-1024x683.jpg"
                    alt="進学準備教育"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    本課程は、大学進学に特化した課程です。毎週「進学指導」の時間があり、志望校決定から出願、受験、合格、進学先決定まで計画的に準備していきます。
                  </p>
                  <p>
                    また、通常の日本語の授業に加えて、日本留学試験（EJU）や大学独自試験に備えるための科目もあります。さらに、個別相談、個別指導を通じて手厚く指導していきます。
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                    <p className="text-sm">
                      <strong>※文部科学省認定準備教育課程とは</strong><br />
                      本課程は文部科学省認定の準備教育課程に指定されていますので、自国での初等中等教育の期間が、日本の大学の受験資格である12年に満たない方も、本課程を修了すれば大学入試を受験し、進学することができます。
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-4">レベル別コース概要</h4>
                <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
                  <p>初級においては、通常クラスの日本語授業でコミュニケーション力を養い、進学日本語授業で大学入学試験を見据えた日本語力を養成していきます。</p>
                  <p>初中級以上では、文科系、理科系の進路に応じたEJU対策授業や、各学生が受験する大学独自試験に合わせて、英語から美術まで様々な科目の授業が受けられます。</p>
                  <p>中上級になると、通常クラスにおいて小論文のような論理的な文章の書き方やプレゼンテーションのような、進学後に有用な授業が用意されています。</p>
                  <p>また、留学生入試には必ずあると言っていい面接や口頭試問に関しては、計画的に個別指導をしていきます。</p>
                </div>
              </div>
            </div>

            {/* 進学高度日本語 */}
            <div className="mb-16">
              <h3 className="text-lg md:text-xl font-bold mb-6 text-gray-800 border-l-4 border-green-500 pl-4">
                進学高度日本語（学びと探求）　2年課程 / 1年9か月課程 / 1年6か月課程 / 1年3か月課程
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                  <Image
                    src="https://weavus-group.com/kcp/wp-content/uploads/2026/02/%E3%82%B3%E3%83%BC%E3%82%B9%E7%B4%B9%E4%BB%8B_2-768x512.jpg"
                    alt="進学高度日本語"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    本課程は、高度な日本語を身に付けるための課程です。高度な日本語とは、単に各種日本語試験において好成績を収めるにとどまらず、大学や大学院等で、学習や研究を円滑に遂行していけるだけの情報発信力と情報収集力をも含みます。
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-4">レベル別コース概要</h4>
                <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
                  <p>初級においては、発話力を中心とした日本語コミュニケーション力を身に付けます。</p>
                  <p>初中級以降は、コミュニケーション力に磨きをかけるとともに、読解力や文章表現力など、日本語力を高度化していくのに必要な要素を身に付けていきます。</p>
                  <p>中級、上級へとレベルが上がるとともに、培ってきた日本語力を用いて、日本文化への造詣を深め、日本のみならず地球規模で活躍できる人材へと成長していきます。</p>
                  <p>自分の目標のために必要な日本語力をより一層高められるよう、種々の選択授業も用意されています。進学や就職のための手厚い指導があることは、言うまでもありません。</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-20" />

          {/* 進学実績 */}
          <div className="mb-20">
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

          <div className="w-full h-px bg-gray-300 mb-20" />

          {/* 卒業生の声 */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-gray-900">卒業生の声</h2>

            <div className="space-y-12">
              {/* 卒業生1 - 黄 厦さん */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="grid md:grid-cols-3 gap-0">
                  <div className="relative h-80 md:h-auto md:col-span-1 overflow-hidden">
                    <Image
                      src="https://placehold.co/400x500/e2e8f0/64748b?text=Graduate+Photo"
                      alt="黄 厦さん"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:col-span-2 p-8 bg-white">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">黄 厦さん / 中国出身</h3>
                      <p className="text-gray-700 font-semibold">進学先：東京大学大学院　農学生命科学研究科</p>
                      <p className="text-gray-700 font-semibold">現職：P&Gジャパン</p>
                    </div>
                    <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
                      <p>KCPで過ごした時間は、私にとって日本語学習以上の意味を持つ、大切な経験でした。勉強だけでなく、人としての姿勢や考え方を学べた場所だと感じています。</p>
                      <p>友達と色紙でおせち料理を作ったり、運動会でチーム一丸となって走ったり、ボランティア活動で放課後に子ども食堂を手伝ったり、浴衣の着付け教室に参加したり――その一つひとつが、今でも昨日のことのように思い出されます。</p>
                      <p>KCPは、私にとって堅苦しい学校というより、実家のような場所でした（笑）。</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 卒業生2 - Patrick Grainger さん */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="grid md:grid-cols-3 gap-0">
                  <div className="relative h-80 md:h-auto md:col-span-1 overflow-hidden">
                    <Image
                      src="https://placehold.co/400x500/e2e8f0/64748b?text=Graduate+Photo"
                      alt="Patrick Grainger さん"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:col-span-2 p-8 bg-white">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Patrick Grainger さん / アメリカ出身</h3>
                      <p className="text-gray-700 font-semibold">現職：東京防災救急協会</p>
                    </div>
                    <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
                      <p>大学を卒業した後、さらに日本語の力をしっかりと伸ばしたいと考え、KCP地球市民日本語学校に入学いたしました。現在は、在日外国人を対象とした防災教育の仕事に携わっています。</p>
                      <p>KCPでは、アルバイト先を紹介していただいたことをきっかけに、面接練習や履歴書の作成などを先生方と一緒に進めさせていただきました。そのアルバイト先で最終的に正社員として採用されることになりましたので、私の日本でのキャリアはKCPで始まったと言っても過言ではありません。</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 卒業生3 - Lee Yit Chang さん */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="grid md:grid-cols-3 gap-0">
                  <div className="relative h-80 md:h-auto md:col-span-1 overflow-hidden">
                    <Image
                      src="https://placehold.co/400x500/e2e8f0/64748b?text=Graduate+Photo"
                      alt="Lee Yit Chang さん"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:col-span-2 p-8 bg-white">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Lee Yit Chang さん / マレーシア出身</h3>
                      <p className="text-gray-700 font-semibold">進学先：早稲田大学 文化構想学部文化構想学科</p>
                    </div>
                    <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
                      <p>私が来日した理由は、英語圏とは異なる文化に強い興味があったからです。私はオーストラリアで育ったため、日本の価値観や生活スタイル、言語などに惹かれ、「実際に日本で生活しながら学んでみたい」と思い来日しました。</p>
                      <p>KCPの一番の良さは、先生方がとても親身になってくれるところだと思います。勉強のことだけでなく、悩み事や不安なことも丁寧に聞いてくれて、とても心強かったです。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
