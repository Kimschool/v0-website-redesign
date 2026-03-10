"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

const scheduleItems = [
  {
    month: "入学式",
    description: "入学式",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2025/07/ffda5a2791a8f8bb0124fe176c06c924-scaled.jpg",
    fullWidth: true
  },
  {
    month: "4月",
    description: "お花見",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2025/07/22717db41feca533263134125f8f0633.jpg"
  },
  {
    month: "5月",
    description: "端午の節句、中間試験、課外授業",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2025/11/de8141bf959b20d35dc3dbad61c2d58f-edited-1-scaled.jpg"
  },
  {
    month: "6月",
    description: "防犯講習、大学‧大学院進学フェア、第一回EJU、期末試験",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/6月大学進学フェア-3-scaled.png"
  },
  {
    month: "7月",
    description: "七夕、第一回JLPT、課外授業",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/7月コトバデー-1-scaled.jpg"
  },
  {
    month: "8月",
    description: "中間試験、夏休み、専門学校進学フェア",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/8月専門学校進学フェア-rotated.jpeg"
  },
  {
    month: "9月",
    description: "避難訓練、期末試験",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/9月______.jpg"
  },
  {
    month: "10月",
    description: "健康診断、課外授業",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/10月バーベキュー-scaled.jpg"
  },
  {
    month: "11月",
    description: "第二回EJU、中間試験",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/11月.jpg"
  },
  {
    month: "12月",
    description: "第二回JLPT、期末試験",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/12月-scaled.jpg"
  },
  {
    month: "1月",
    description: "成人を祝う会",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/1月課外授業（成人を祝う会に、課外授業を追記してください-scaled-e1772175060300.jpg"
  },
  {
    month: "2月",
    description: "節分、中間試験、卒業認定試験",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/2月節分-e1772175488544.jpg"
  },
  {
    month: "3月",
    description: "ひな祭り、卒業式、期末試験",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/3月卒業式-1-scaled.jpg"
  }
]

const clubActivities = [
  {
    name: "演劇部",
    description: "KCPオリジナル劇で、日本語の表現力をアップ!",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/演劇部.jpg"
  },
  {
    name: "琴クラブ",
    description: "伝統楽器を学びながら、音楽を楽しみましょう。",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/琴クラブ.jpg"
  },
  {
    name: "新聞部",
    description: "取材から記事作成‧デザインまで協力し合って作成します。",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/新聞部-1-scaled.jpg"
  },
  {
    name: "マンガ‧アニメクラブ",
    description: "好きな作品を日本語で熱く語り合いましょう。",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/%E3%83%9E%E3%83%B3%E3%82%AC%E3%83%BB%E3%82%A2%E3%83%8B%E3%83%A1%E3%82%AF%E3%83%A9%E3%83%96-1-scaled.jpg"
  },
  {
    name: "茶道部",
    description: "お茶の点て方をお稽古し、日本文化とマナーを学びます。",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/茶道クラブ-1-scaled.jpg"
  },
  {
    name: "読書会‧読書クラブ",
    description: "中上級‧初級に分かれて、レベルにあった本を楽しみます。",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/読書クラブ_2-1-scaled.jpg"
  }
]

const stationTabs = [
  {
    id: "marunouchi",
    name: "東京メトロ丸ノ内線",
    logo: "https://weavus-group.com/kcp/wp-content/uploads/2025/11/Logo_of_Tokyo_Metro_Marunouchi_Line.svg_.png",
    stations: [
      {
        name: "新宿御苑前駅",
        code: "M10",
        access: "2番出口より徒歩5分"
      },
      {
        name: "四谷３丁目駅",
        code: "M11",
        access: "2番出口より徒歩12分"
      }
    ]
  },
  {
    id: "fukutoshin",
    name: "東京メトロ副都心線",
    logo: "https://weavus-group.com/kcp/wp-content/uploads/2025/11/Logo_of_Tokyo_Metro_Fukutoshin_Line.svg_.png",
    stations: [
      {
        name: "新宿3丁目駅",
        code: "F13",
        access: "C4出口より徒歩13分"
      }
    ]
  },
  {
    id: "shinjuku",
    name: "都営新宿線",
    logo: "https://weavus-group.com/kcp/wp-content/uploads/2025/11/Toei_Shinjuku_line_symbol.svg_.png",
    stations: [
      {
        name: "新宿3丁目駅",
        code: "S02",
        access: "C4出口より徒歩13分"
      },
      {
        name: "曙橋駅",
        code: "S03",
        access: "C4出口より徒歩11分"
      }
    ]
  }
]

const facilityItems = [
  {
    title: "全景",
    caption: "安全で快適な学習環境を提供する地上7階、地下1階の校舎。",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/01_校舍全景-1024x655.jpg"
  },
  {
    title: "校庭",
    caption: "明るい広いスペースで世界中の友達と交流。",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/02_校庭-1-1024x655.jpg"
  },
  {
    title: "駐輪場",
    caption: "自転車通学の人はこちらに駐輪できます。",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/03_駐輪場-2-1024x655.jpg"
  },
  {
    title: "BF1美術室",
    caption: "美術系進学者のための設備を完備。",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/04_BF1美術室-1-1024x655.jpg"
  },
  {
    title: "1F職員室",
    caption: "面談や学習などのサポートにも利用。学生たちが困ったときは、いつでも相談や質問に来られるようにしています。",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/05_1F職員室-1-1024x655.jpg"
  },
  {
    title: "2Fラウンジ",
    caption: "自動販売機や電子レンジ付き、休み時間に一休憩。",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/06_2Fラウンジ-1-1024x655.jpg"
  },
  {
    title: "2F図書室",
    caption: "約5000冊の蔵書があり、自習スペースは最大100席。聴解用教材・パソコンも貸し出しています。",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/07_2F図書室-1-1024x655.jpg"
  },
  {
    title: "教室",
    caption: "防音と音響に配慮した語学に適した教室。",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/08_教室明るく調整してください）-1-1024x655.jpg"
  },
  {
    title: "教室",
    caption: "防音と音響に配慮した語学に適した教室。",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/09_教室2-1-1024x655.jpg"
  },
  {
    title: "6F講堂",
    caption: "式典や進学説明会など多様な目的に利用。",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/10_6F講堂-1-1024x655.jpg"
  },
  {
    title: "7F和室",
    caption: "茶道・琴などのクラブ活動に使用。",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/11_7F和室-1024x655.jpg"
  },
  {
    title: "日本庭園",
    caption: "1年12ヶ月の草花が植えられた庭園。お茶会では園芸クラブが丹精した花々を、床の間に生けます。",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/12_日本庭園-1024x655.jpg"
  }
]

const surroundingEnvironment = [
  {
    title: "新宿御苑前駅（最寄り駅）",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2025/12/Shinjuku-gyoemmae-station-Exit1-1-2048x1536.jpg"
  },
  {
    title: "花園病院",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2025/12/rich2s6257899_05-1.jpg"
  },
  {
    title: "郵便局",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2025/12/unnamed.jpg"
  },
  {
    title: "四谷区民センター",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2025/12/NRFaHRT38eoY60XESAAPgjV5AOK9ybxJKDsJO9EW-1.jpg"
  },
  {
    title: "富久クロス",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2025/12/Tomihisa_Cross_Comfort_Tower-1-2048x1536.jpg"
  }
]

export function SchoolLifePageContent() {
  const [activeTab, setActiveTab] = useState("marunouchi")
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Page Header */}
        <div className={`text-center mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">学校生活</h1>
        </div>

        {/* Introduction Text */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"}`}>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            KCPでの生活は、教室の中だけにとどまりません。年間を通じてのイベントやクラブ活動一多国籍の仲間とともに過ごす日々の中
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-300 mb-16" />

        {/* Annual Schedule Section */}
        <div className={`mb-20 ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            年間スケジュール
          </h2>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-300 border border-gray-300">
            {scheduleItems.map((item, index) => (
              <div
                key={index}
                className={`relative bg-white overflow-hidden cursor-pointer group ${item.fullWidth ? "md:col-span-2 h-[400px]" : "h-[300px]"
                  }`}
              >
                <Image
                  src={item.image}
                  alt={item.month}
                  fill
                  className="object-cover transition-transform duration-400 ease-out group-hover:scale-105"
                  unoptimized
                />

                {/* Top overlay - month */}
                <div className="absolute top-0 left-0 w-full bg-gray-100/85 text-center py-4 px-4 opacity-0 -translate-y-5 transition-all duration-400 ease-out group-hover:opacity-100 group-hover:translate-y-0 z-10">
                  <span className="text-2xl font-bold text-gray-900">{item.month}</span>
                </div>

                {/* Bottom overlay - description */}
                <div className="absolute bottom-0 left-0 w-full bg-gray-100/85 text-center py-4 px-4 opacity-0 translate-y-5 transition-all duration-400 ease-out group-hover:opacity-100 group-hover:translate-y-0 z-10">
                  <span className="text-sm text-gray-700">{item.description}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <p className="mt-8 text-center text-gray-600">
            <strong>*</strong> 課外授業は、BBQや運動会、コトバデー、バス旅行、小旅行などがあり、学期によって異なります。
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-300 mb-16" />

        {/* Club Activities Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            クラブ活動
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-300 border border-gray-300">
            {clubActivities.map((club, index) => (
              <div
                key={index}
                className="relative bg-white overflow-hidden cursor-pointer group h-[300px]"
              >
                <Image
                  src={club.image}
                  alt={club.name}
                  fill
                  className="object-cover transition-transform duration-400 ease-out group-hover:scale-105"
                  unoptimized
                />

                {/* Top overlay - name */}
                <div className="absolute top-0 left-0 w-full bg-gray-100/85 text-center py-4 px-4 opacity-0 -translate-y-5 transition-all duration-400 ease-out group-hover:opacity-100 group-hover:translate-y-0 z-10">
                  <span className="text-2xl font-bold text-gray-900">{club.name}</span>
                </div>

                {/* Bottom overlay - description */}
                <div className="absolute bottom-0 left-0 w-full bg-gray-100/85 text-center py-4 px-4 opacity-0 translate-y-5 transition-all duration-400 ease-out group-hover:opacity-100 group-hover:translate-y-0 z-10">
                  <span className="text-sm text-gray-700">{club.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-300 mb-16" />

        {/* Facility Guide Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            施設案内
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilityItems.map((facility, index) => (
              <div key={index} className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                {/* Image Container */}
                <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Text Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {facility.title}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {facility.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-300 mb-16" />

        {/* Access Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            アクセス‧周辺環境
          </h2>

          <p className="text-center text-gray-700 mb-8">
            <strong>新宿御苑前駅から徒歩3分、通学や買い物にも便利です。</strong><br />
            <strong>周辺にはコンビニや飲食店だけでなく、新宿御苑や新宿の繁華街も近く、都心生活を満喫できます。</strong>
          </p>

          {/* Google Map */}
          <div className="w-full h-[450px] bg-gray-100 rounded-lg overflow-hidden mb-8">
            <iframe
              src="https://www.google.com/maps?q=東京都新宿区新宿1-29-12&z=18&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="KCP地球市民日本語学校 所在地"
            />
          </div>

          <div className="text-center text-gray-700 mb-12">
            <p>学校法人KCP学園 KCP地球市民日本語学校</p>
            <p>〒160-0022　東京都新宿区新宿1-29-12</p>
            <p>連絡先：03-3356-2359 / Fax: 03-3356-2559 / Email：<a href="mailto:info@kcp.ac.jp">info@kcp.ac.jp</a></p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-300 mb-16" />

        {/* Nearest Station Section */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            最寄り駅
          </h2>

          {/* Tabs */}
          <div className="space-y-8">
            {/* Tab Buttons */}
            <div className="flex flex-wrap justify-center gap-3 border-b border-gray-300 pb-4">
              {stationTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-semibold text-sm md:text-base border-b-2 transition-all ${activeTab === tab.id
                      ? "text-blue-600 border-blue-600"
                      : "text-gray-600 border-transparent hover:text-gray-900"
                    }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Tab Content - Station Cards */}
            {stationTabs.map((tab) => (
              <div
                key={tab.id}
                className={`${activeTab === tab.id ? "block" : "hidden"}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  {/* Line Logo */}
                  <div className="flex justify-center md:justify-start">
                    <div className="w-40 h-40 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 flex items-center justify-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <Image
                        src={tab.logo}
                        alt={tab.name}
                        width={140}
                        height={140}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Station Information */}
                  <div className="space-y-4">
                    {tab.stations.map((station, idx) => (
                      <div
                        key={idx}
                        className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-5 border border-blue-200 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-lg font-bold text-gray-900">
                            {station.name}
                          </h4>
                          <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {station.code}
                          </span>
                        </div>
                        <p className="text-gray-700 font-medium">
                          {station.access}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-300 mb-16" />

        {/* Surrounding Environment Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            周辺環境
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {surroundingEnvironment.map((item, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow group"
                style={{ aspectRatio: "16/9" }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <h3 className="text-white font-bold text-lg p-4 w-full">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-300 mb-16" />

        {/* Video Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            応援歌
          </h2>

          <div className="max-w-4xl mx-auto">
            <video
              controls
              preload="none"
              className="w-full aspect-video rounded-lg shadow-lg"
              playsInline
            >
              <source
                src="https://weavus-group.com/kcp/wp-content/uploads/2025/08/応援歌字幕明るいバージョン.webm"
                type="video/webm"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-300 mb-16" />
      </div>
    </section>
  )
}
