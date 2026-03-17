"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useTranslation } from "react-i18next"
import Autoplay from "embla-carousel-autoplay"
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"

export function SchoolLifePageContent() {
  const [activeTab, setActiveTab] = useState("marunouchi")
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { t, i18n } = useTranslation()

  const scheduleItems = [
    { month: t("schoolLifePage.scheduleItems.0.month"), description: t("schoolLifePage.scheduleItems.0.description"), image: "/images/original_from_customer/nyuugakusiki.jpg", fullWidth: true },
    { month: t("schoolLifePage.scheduleItems.1.month"), description: t("schoolLifePage.scheduleItems.1.description"), image: `/images/original_from_customer/${encodeURIComponent('年間スケジュール')}/${encodeURIComponent('4月お花見')}.jpg` },
    { month: t("schoolLifePage.scheduleItems.2.month"), description: t("schoolLifePage.scheduleItems.2.description"), image: `/images/original_from_customer/${encodeURIComponent('年間スケジュール')}/${encodeURIComponent('5月端午の節句')}.JPG` },
    { month: t("schoolLifePage.scheduleItems.3.month"), description: t("schoolLifePage.scheduleItems.3.description"), image: `/images/original_from_customer/${encodeURIComponent('予備')}/${encodeURIComponent('授業風景')}.jpg` },
    { month: t("schoolLifePage.scheduleItems.4.month"), description: t("schoolLifePage.scheduleItems.4.description"), image: `/images/original_from_customer/${encodeURIComponent('年間スケジュール')}/${encodeURIComponent('7月コトバデー')}.jpg` },
    { month: t("schoolLifePage.scheduleItems.5.month"), description: t("schoolLifePage.scheduleItems.5.description"), image: `/images/original_from_customer/${encodeURIComponent('年間スケジュール')}/${encodeURIComponent('8月専門学校進学フェア')}.jpeg` },
    { month: t("schoolLifePage.scheduleItems.6.month"), description: t("schoolLifePage.scheduleItems.6.description"), image: `/images/original_from_customer/${encodeURIComponent('年間スケジュール')}/${encodeURIComponent('9月')}.jpg` },
    { month: t("schoolLifePage.scheduleItems.7.month"), description: t("schoolLifePage.scheduleItems.7.description"), image: `/images/original_from_customer/${encodeURIComponent('年間スケジュール')}/${encodeURIComponent('10月バーベキュー')}.JPG` },
    { month: t("schoolLifePage.scheduleItems.8.month"), description: t("schoolLifePage.scheduleItems.8.description"), image: `/images/original_from_customer/${encodeURIComponent('年間スケジュール')}/${encodeURIComponent('11月')}.jpg` },
    { month: t("schoolLifePage.scheduleItems.9.month"), description: t("schoolLifePage.scheduleItems.9.description"), image: `/images/original_from_customer/${encodeURIComponent('年間スケジュール')}/${encodeURIComponent('12月')}.JPG` },
    { month: t("schoolLifePage.scheduleItems.10.month"), description: t("schoolLifePage.scheduleItems.10.description"), image: `/images/original_from_customer/${encodeURIComponent('年間スケジュール')}/${encodeURIComponent('1月課外授業（成人を祝う会に、課外授業を追記してください')}.JPG` },
    { month: t("schoolLifePage.scheduleItems.11.month"), description: t("schoolLifePage.scheduleItems.11.description"), image: `/images/original_from_customer/${encodeURIComponent('年間スケジュール')}/${encodeURIComponent('2月節分')}.jpg` },
    { month: t("schoolLifePage.scheduleItems.12.month"), description: t("schoolLifePage.scheduleItems.12.description"), image: `/images/original_from_customer/${encodeURIComponent('年間スケジュール')}/${encodeURIComponent('3月卒業式')}.JPG` },
  ]

  const clubActivities = [
    { name: t("schoolLifePage.clubItems.0.name"), description: t("schoolLifePage.clubItems.0.description"), image: `/images/original_from_customer/${encodeURIComponent('クラブ活動')}/${encodeURIComponent('演劇部')}.jpg` },
    { name: t("schoolLifePage.clubItems.1.name"), description: t("schoolLifePage.clubItems.1.description"), image: `/images/original_from_customer/${encodeURIComponent('クラブ活動')}/${encodeURIComponent('琴クラブ')}.jpg` },
    { name: t("schoolLifePage.clubItems.2.name"), description: t("schoolLifePage.clubItems.2.description"), image: `/images/original_from_customer/${encodeURIComponent('クラブ活動')}/${encodeURIComponent('新聞部')}.jpg` },
    { name: t("schoolLifePage.clubItems.3.name"), description: t("schoolLifePage.clubItems.3.description"), image: `/images/original_from_customer/${encodeURIComponent('クラブ活動')}/${encodeURIComponent('マンガ・アニメクラブ')}.jpg` },
    { name: t("schoolLifePage.clubItems.4.name"), description: t("schoolLifePage.clubItems.4.description"), image: `/images/original_from_customer/${encodeURIComponent('クラブ活動')}/${encodeURIComponent('茶道クラブ')}.JPG` },
    { name: t("schoolLifePage.clubItems.5.name"), description: t("schoolLifePage.clubItems.5.description"), image: `/images/original_from_customer/${encodeURIComponent('クラブ活動')}/${encodeURIComponent('読書クラブ')}.jpg` },
  ]

  const stationTabs = [
    {
      id: "marunouchi",
      name: t("schoolLifePage.stationTabs.0.name"),
      color: "#e60012",
      image: "/images/original_from_customer/metro/Logo_of_Tokyo_Metro_Marunouchi_Line.svg.png",
      stations: [
        { name: t("schoolLifePage.stationTabs.0.stations.0.name"), code: "M10", access: t("schoolLifePage.stationTabs.0.stations.0.access") },
        { name: t("schoolLifePage.stationTabs.0.stations.1.name"), code: "M11", access: t("schoolLifePage.stationTabs.0.stations.1.access") },
      ]
    },
    {
      id: "fukutoshin",
      name: t("schoolLifePage.stationTabs.1.name"),
      color: "#bb641d",
      image: "/images/original_from_customer/metro/Logo_of_Tokyo_Metro_Fukutoshin_Line.svg.png",
      stations: [
        { name: t("schoolLifePage.stationTabs.1.stations.0.name"), code: "F13", access: t("schoolLifePage.stationTabs.1.stations.0.access") },
      ]
    },
    {
      id: "shinjuku",
      name: t("schoolLifePage.stationTabs.2.name"),
      color: "#b0bf1e",
      image: "/images/original_from_customer/metro/Toei_Shinjuku_line_symbol.svg.png",
      stations: [
        { name: t("schoolLifePage.stationTabs.2.stations.0.name"), code: "S02", access: t("schoolLifePage.stationTabs.2.stations.0.access") },
        { name: t("schoolLifePage.stationTabs.2.stations.1.name"), code: "S03", access: t("schoolLifePage.stationTabs.2.stations.1.access") },
      ]
    }
  ]

  const facilityItems = [
    { title: t("schoolLifePage.facilityItems.0.title"), caption: t("schoolLifePage.facilityItems.0.caption"), image: `/images/original_from_customer/${encodeURIComponent('施設案内')}/${encodeURIComponent('01_校舍全景')}.jpg` },
    { title: t("schoolLifePage.facilityItems.1.title"), caption: t("schoolLifePage.facilityItems.1.caption"), image: `/images/original_from_customer/${encodeURIComponent('施設案内')}/${encodeURIComponent('02_校庭')}.jpg` },
    { title: t("schoolLifePage.facilityItems.2.title"), caption: t("schoolLifePage.facilityItems.2.caption"), image: `/images/original_from_customer/${encodeURIComponent('施設案内')}/${encodeURIComponent('03_駐輪場')}.jpg` },
    { title: t("schoolLifePage.facilityItems.3.title"), caption: t("schoolLifePage.facilityItems.3.caption"), image: `/images/original_from_customer/${encodeURIComponent('施設案内')}/${encodeURIComponent('04_BF1美術室')}.jpg` },
    { title: t("schoolLifePage.facilityItems.4.title"), caption: t("schoolLifePage.facilityItems.4.caption"), image: `/images/original_from_customer/${encodeURIComponent('施設案内')}/${encodeURIComponent('05_1F職員室')}.jpg` },
    { title: t("schoolLifePage.facilityItems.5.title"), caption: t("schoolLifePage.facilityItems.5.caption"), image: `/images/original_from_customer/${encodeURIComponent('施設案内')}/${encodeURIComponent('06_2Fラウンジ')}.jpg` },
    { title: t("schoolLifePage.facilityItems.6.title"), caption: t("schoolLifePage.facilityItems.6.caption"), image: `/images/original_from_customer/${encodeURIComponent('施設案内')}/${encodeURIComponent('07_2F図書室')}.jpg` },
    { title: t("schoolLifePage.facilityItems.7.title"), caption: t("schoolLifePage.facilityItems.7.caption"), image: `/images/original_from_customer/${encodeURIComponent('施設案内')}/${encodeURIComponent('08_教室(明るく調整してください）')}.jpg` },
    { title: t("schoolLifePage.facilityItems.8.title"), caption: t("schoolLifePage.facilityItems.8.caption"), image: `/images/original_from_customer/${encodeURIComponent('施設案内')}/${encodeURIComponent('09_教室2')}.jpg` },
    { title: t("schoolLifePage.facilityItems.9.title"), caption: t("schoolLifePage.facilityItems.9.caption"), image: `/images/original_from_customer/${encodeURIComponent('施設案内')}/${encodeURIComponent('10_6F講堂')}.jpg` },
    { title: t("schoolLifePage.facilityItems.10.title"), caption: t("schoolLifePage.facilityItems.10.caption"), image: `/images/original_from_customer/${encodeURIComponent('施設案内')}/${encodeURIComponent('11_7F和室')}.jpg` },
    { title: t("schoolLifePage.facilityItems.11.title"), caption: t("schoolLifePage.facilityItems.11.caption"), image: `/images/original_from_customer/${encodeURIComponent('施設案内')}/${encodeURIComponent('12_日本庭園')}.jpg` },
  ]

  const surroundingEnvironment = [
    { title: t("schoolLifePage.surroundingItems.0.title"), image: "/images/original_from_customer/Shinjuku-gyoemmae-station-Exit1-1-scaled.jpg" },
    { title: t("schoolLifePage.surroundingItems.1.title"), image: "/images/original_from_customer/rich2s6257899_05-1.jpg" },
    { title: t("schoolLifePage.surroundingItems.2.title"), image: "/images/original_from_customer/unnamed.jpg" },
    { title: t("schoolLifePage.surroundingItems.3.title"), image: "/images/original_from_customer/NRFaHRT38eoY60XESAAPgjV5AOK9ybxJKDsJO9EW-1.jpg" },
    { title: t("schoolLifePage.surroundingItems.4.title"), image: "/images/original_from_customer/Tomihisa_Cross_Comfort_Tower-1-scaled.jpg" },
    { title: t("schoolLifePage.surroundingItems.5.title"), image: "/images/original_from_customer/Shinjuku_Gyoen_National_Garden_-_sakura_3.jpg" },
  ]

  const [surroundingApi, setSurroundingApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!surroundingApi) return
    const onSelect = () => {
      const autoplay = surroundingApi.plugins().autoplay
      if (autoplay) autoplay.reset()
    }
    surroundingApi.on("select", onSelect)
    return () => { surroundingApi.off("select", onSelect) }
  }, [surroundingApi])

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
          src="/images/original_from_customer/トップ背景/03_学校生活.jpg"
          alt="学校生活"
          fill
          className="object-cover object-[center_30%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 flex items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">{t("schoolLifePage.bannerTitle")}</h1>
            <div className="w-20 h-1 bg-white/80 mx-auto mt-6 rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 max-w-6xl py-16">
{/* Introduction Text – Pattern 2 */}
<div
  className={`text-center mb-16 transition-all duration-700 ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
  }`}
>
  <div className="w-12 h-1 bg-[#0085b2] mx-auto mb-6 rounded-full" />
  <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
    {t("schoolLifePage.intro")}
  </p>
  <div className="elegant-divider mt-8" />
</div>

        {/* Annual Schedule Section */}
        <div className={`mb-20 ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {t("schoolLifePage.scheduleTitle")}
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
            <strong>*</strong> {t("schoolLifePage.scheduleNote")}
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-300 mb-16" />

        {/* Club Activities Section */}
        <div className="mb-20">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {t("schoolLifePage.clubTitle")}
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
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {t("schoolLifePage.facilityTitle")}
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
                  <h3 className="font-serif text-lg font-bold text-gray-900 mb-2">
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
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {t("schoolLifePage.accessTitle")}
          </h2>

          <p className="text-center text-gray-700 mb-8">
            <strong>{t("schoolLifePage.accessDesc1")}</strong><br />
            <strong>{t("schoolLifePage.accessDesc2")}</strong>
          </p>

          {/* Map - Baidu for Chinese users, Google for others */}
          <div className="w-full h-[450px] bg-gray-100 rounded-lg overflow-hidden mb-8">
            {i18n.language === "zh" ? (
              <iframe
                src="https://map.baidu.com/?newmap=1&reqflag=pcmap&biz=1&from=webmap&da_from=webmap&qt=s&c=12955284.05,4224430.25&z=18"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="KCP地球市民日本語学校 所在地 (百度地图)"
              />
            ) : (
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
            )}
          </div>

          <div className="text-center text-gray-700 mb-12">
            <p>{t("schoolLifePage.schoolAddress")}</p>
            <p>〒160-0022　東京都新宿区新宿1-29-12</p>
            <p>{t("schoolLifePage.schoolContact")}<a href="mailto:info@kcp.ac.jp" className="text-[#0085b2] hover:underline">info@kcp.ac.jp</a></p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-300 mb-16" />

        {/* Nearest Station Section */}
        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {t("schoolLifePage.stationTitle")}
          </h2>

          {/* Tabs */}
          <div>
            {/* Tab Buttons */}
            <div className="flex flex-wrap justify-center gap-3 border-b border-gray-300 pb-4 mb-8">
              {stationTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-semibold text-sm md:text-base border-b-2 transition-all ${activeTab === tab.id
                      ? "text-[#0085b2] border-[#0085b2]"
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
                <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto mb-8">
                  {/* Line Logo + Name */}
                  <div className="flex items-center gap-4">
                    <Image
                      src={tab.image}
                      alt={tab.name}
                      width={56}
                      height={56}
                      className="object-contain"
                    />
                    <span className="text-xl font-bold text-gray-900">{tab.name}</span>
                  </div>

                  {/* Station Cards */}
                  <div className={`grid gap-4 w-full ${tab.stations.length === 1 ? "grid-cols-1 max-w-md mx-auto" : "grid-cols-1 md:grid-cols-2"}`}>
                    {tab.stations.map((station, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl p-6 border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow text-center"
                      >
                        <span
                          className="inline-block px-4 py-1.5 rounded-full text-white text-sm font-bold mb-3"
                          style={{ backgroundColor: tab.color }}
                        >
                          {station.code}
                        </span>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">
                          {station.name}
                        </h4>
                        <p className="text-gray-600">
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
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {t("schoolLifePage.surroundingTitle")}
          </h2>

          <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]}
            setApi={setSurroundingApi}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {surroundingEnvironment.map((item, index) => (
                <CarouselItem key={index} className="basis-full md:basis-1/2">
                  <div
                    className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow group"
                    style={{ aspectRatio: "16/9" }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <h3 className="text-white font-bold text-lg p-4 w-full">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-300 mb-16" />

        {/* Video Section (temporarily disabled to avoid missing mp4 requests) */}
        {/*
        <div className="mb-20">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {t("schoolLifePage.songsTitle")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="flex flex-col">
              <h3 className="font-serif text-lg font-bold text-gray-900 mb-4 text-center">
                {t("schoolLifePage.schoolSongTitle")}
              </h3>
              <video
                controls
                preload="none"
                className="w-full aspect-video rounded-lg shadow-lg mb-4"
                playsInline
              >
                <source
                  src="/images/original_from_customer/校歌字幕.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <p className="text-center text-gray-600 font-medium">{t("schoolLifePage.schoolSongCaption")}</p>
            </div>

            <div className="flex flex-col">
              <h3 className="font-serif text-lg font-bold text-gray-900 mb-4 text-center">
                {t("schoolLifePage.cheeringSongTitle")}
              </h3>
              <video
                controls
                preload="none"
                className="w-full aspect-video rounded-lg shadow-lg mb-4"
                playsInline
              >
                <source
                  src="/images/original_from_customer/応援歌字幕明るいバージョン.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <p className="text-center text-gray-600 font-medium">{t("schoolLifePage.cheeringSongCaption")}</p>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-gray-300 mb-16" />
        */}
      </div>
    </section>
  )
}
