"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  ChevronDown,
  GraduationCap,
  ListChecks,
  Map,
  Route,
  School,
  Target,
} from "lucide-react"

type TimetableTone =
  | "kanji"
  | "listening"
  | "comprehensive"
  | "reading"
  | "essay"
  | "prepElective"
  | "neutral"

/** 項目一覧：全角「（」または半角「(」の直前で改行し、括弧以降を2行目にする */
function splitClassContentNavTitle(title: string): { main: string; paren?: string } {
  const iWide = title.indexOf("（")
  const iAscii = title.indexOf("(")
  let i = -1
  if (iWide >= 0 && (iAscii < 0 || iWide <= iAscii)) i = iWide
  else if (iAscii >= 0) i = iAscii
  if (i <= 0) return { main: title }
  const main = title.slice(0, i).trimEnd()
  const paren = title.slice(i).trim()
  if (!main) return { main: title }
  return { main, paren }
}

/** 「Lv.3 / Lv.4」形式の kcp 文言を、到達目標の各行に対応するラベル配列に分解する */
function parseKcpLevelLabels(kcp: string): string[] {
  return kcp.split(/\s*\/\s*/).map((s) => s.trim()).filter(Boolean)
}

/** 合格スケジュール：上から下へ実力が深まるイメージで水色が段階的に濃くなる */
const admissionScheduleHeaderBands = [
  "bg-sky-50",
  "bg-sky-100",
  "bg-sky-200",
] as const

const admissionSchedulePeriodPills = [
  "border-sky-200/80 bg-white/85 text-sky-950 shadow-sm",
  "border-sky-300/75 bg-white/80 text-sky-950 shadow-sm",
  "border-sky-400/70 bg-white/75 text-sky-950 shadow-sm",
] as const

export function EducationSection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeCourseTab, setActiveCourseTab] = useState<"prep" | "advanced">(
    "prep"
  )
  const [activeKcpLevel, setActiveKcpLevel] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>(3)
  const [activeClassContentId, setActiveClassContentId] = useState<number>(0)
  const [activeSpecialSupportId, setActiveSpecialSupportId] = useState<
    "jpplus" | "guidance"
  >("jpplus")

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

  const timetableToneStyles = useMemo<Record<TimetableTone, string>>(
    () => ({
      kanji: "bg-gray-100 text-gray-900 ring-1 ring-gray-200",
      listening: "bg-gray-100 text-gray-900 ring-1 ring-gray-200",
      comprehensive: "bg-gray-100 text-gray-900 ring-1 ring-gray-200",
      reading: "bg-gray-100 text-gray-900 ring-1 ring-gray-200",
      essay: "bg-gray-100 text-gray-900 ring-1 ring-gray-200",
      prepElective: "bg-gray-100 text-gray-900 ring-1 ring-gray-200",
      neutral: "bg-gray-100 text-gray-900 ring-1 ring-gray-200",
    }),
    []
  )

  const timetableDays = useMemo(
    () => [
      { key: "mon", label: t("educationPage.dayMon") },
      { key: "tue", label: t("educationPage.dayTue") },
      { key: "wed", label: t("educationPage.dayWed") },
      { key: "thu", label: t("educationPage.dayThu") },
      { key: "fri", label: t("educationPage.dayFri") },
    ],
    [t]
  )

  const beginnerTimeSlots = useMemo(
    () => [
      t("educationPage.beginnerTimeSlots.0"),
      t("educationPage.beginnerTimeSlots.1"),
      t("educationPage.beginnerTimeSlots.2"),
      t("educationPage.beginnerTimeSlots.3"),
      t("educationPage.beginnerTimeSlots.4"),
    ],
    [t]
  )

  const intermediateTimeSlots = useMemo(
    () => [
      t("educationPage.intermediateTimeSlots.0"),
      t("educationPage.intermediateTimeSlots.1"),
      t("educationPage.intermediateTimeSlots.2"),
      t("educationPage.intermediateTimeSlots.3"),
    ],
    [t]
  )

  const prepCoursePillLabels = useMemo(() => {
    const raw = t("educationPage.prepCoursePillLabels", { returnObjects: true })
    return Array.isArray(raw) ? (raw as string[]) : []
  }, [t])

  const advancedCoursePillLabels = useMemo(() => {
    const raw = t("educationPage.advancedCoursePillLabels", { returnObjects: true })
    return Array.isArray(raw) ? (raw as string[]) : []
  }, [t])

  const beginnerTones: TimetableTone[][] = useMemo(
    () => [
      ["kanji", "listening", "kanji", "listening", "kanji"],
      ["comprehensive", "comprehensive", "comprehensive", "comprehensive", "comprehensive"],
      ["comprehensive", "comprehensive", "comprehensive", "comprehensive", "comprehensive"],
      ["comprehensive", "comprehensive", "comprehensive", "comprehensive", "prepElective"],
      ["prepElective", "neutral", "prepElective", "neutral", "prepElective"],
    ],
    []
  )

  const intermediateTones: TimetableTone[][] = useMemo(
    () => [
      ["kanji", "listening", "kanji", "kanji", "kanji"],
      ["listening", "comprehensive", "reading", "comprehensive", "listening"],
      ["essay", "comprehensive", "comprehensive", "comprehensive", "reading"],
      ["essay", "prepElective", "prepElective", "neutral", "reading"],
    ],
    []
  )

  const cefrRows = useMemo(
    () => [
      {
        level: 1 as const,
        step: 1 as const,
        cefr: "🟢A1",
        kcp: "Lv.1",
        goal: t("educationPage.cefrA1Goal"),
      },
      {
        level: 2 as const,
        step: 2 as const,
        cefr: "🟢A2",
        kcp: "Lv.2",
        goal: t("educationPage.cefrA2Goal"),
      },
      {
        level: 3 as const,
        step: 3 as const,
        cefr: "🟡B1",
        kcp: "Lv.3",
        goal: t("educationPage.cefrB1Goal1"),
      },
      {
        level: 4 as const,
        step: 3 as const,
        cefr: "🟡B1",
        kcp: "Lv.4",
        goal: t("educationPage.cefrB1Goal2"),
      },
      {
        level: 5 as const,
        step: 4 as const,
        cefr: "🟠B2",
        kcp: "Lv.5",
        goal: t("educationPage.cefrB2Goal1"),
      },
      {
        level: 6 as const,
        step: 4 as const,
        cefr: "🟠B2",
        kcp: "Lv.6",
        goal: t("educationPage.cefrB2Goal2"),
      },
      {
        level: 7 as const,
        step: 5 as const,
        cefr: "🟣B2",
        kcp: "Lv.7",
        goal: t("educationPage.cefrB2AdvGoal1"),
      },
      {
        level: 8 as const,
        step: 5 as const,
        cefr: "🟣B2",
        kcp: "Lv.8",
        goal: t("educationPage.cefrB2AdvGoal2"),
      },
    ],
    [t]
  )

  const activeCefrRow = useMemo(() => {
    return cefrRows.find((row) => row.level === activeKcpLevel) ?? cefrRows[0]
  }, [activeKcpLevel, cefrRows])

  const classContentItems = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        title: t(`educationPage.classContent.${i}.title` as const),
        content: t(`educationPage.classContent.${i}.content` as const),
      })),
    [t]
  )

  const activeClassContentItem = useMemo(() => {
    return (
      classContentItems.find((item) => item.id === activeClassContentId) ??
      classContentItems[0]
    )
  }, [activeClassContentId, classContentItems])

  const jpPlusExamItems = useMemo(
    () => [
      { label: t("educationPage.ejuLabel"), desc: t("educationPage.ejuDesc") },
      { label: t("educationPage.mathLabel"), desc: t("educationPage.mathDesc") },
      {
        label: t("educationPage.scienceLabel"),
        desc: t("educationPage.scienceDesc"),
      },
      {
        label: t("educationPage.socialLabel"),
        desc: t("educationPage.socialDesc"),
      },
      { label: t("educationPage.jlptLabel"), desc: t("educationPage.jlptDesc") },
      { label: t("educationPage.toeicLabel"), desc: t("educationPage.toeicDesc") },
    ],
    [t]
  )

  const specialSupportBlocks = useMemo(
    () => [
      {
        id: "jpplus" as const,
        icon: Target,
        eyebrow: "EXAM PREP",
        title: `${t("educationPage.jpPlusTitle")}${t("educationPage.jpPlusLevel")}`,
        content: (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              {jpPlusExamItems.map((x) => (
                <div
                  key={x.label}
                  className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                >
                  <p className="text-sm font-bold text-gray-900">{x.label}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {x.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        id: "guidance" as const,
        icon: Map,
        eyebrow: "SUPPORT",
        title: t("educationPage.careerPathSupportNavTitle"),
        content: (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <GraduationCap className="h-5 w-5 text-[#0085b2]" />
                <h4 className="font-bold text-gray-900">
                  {t("educationPage.uniGuidanceTitle")}
                </h4>
              </div>
              <div className="text-gray-700 leading-relaxed space-y-2 text-sm">
                <p>
                  <strong>{t("educationPage.uniHRLabel")}</strong>
                  {t("educationPage.uniHRDesc")}
                </p>
                <p>
                  <strong>{t("educationPage.gradHRLabel")}</strong>
                  {t("educationPage.gradHRDesc")}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="h-5 w-5 text-[#0085b2]" />
                <h4 className="font-bold text-gray-900">
                  {t("educationPage.artGuidanceTitle")}
                </h4>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">
                {t("educationPage.artGuidanceDesc")}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <ListChecks className="h-5 w-5 text-[#0085b2]" />
                <h4 className="font-bold text-gray-900">
                  {t("educationPage.individualTitle")}
                </h4>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">
                {t("educationPage.individualDesc")}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Target className="h-5 w-5 text-[#0085b2]" />
                <h4 className="font-bold text-gray-900">
                  {t("educationPage.jobSupportTitle")}
                </h4>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">
                {t("educationPage.jobSupportDesc")}
              </p>
            </div>
          </div>
        ),
      },
    ],
    [jpPlusExamItems, t]
  )

  const activeSpecialSupportBlock = useMemo(() => {
    return (
      specialSupportBlocks.find((b) => b.id === activeSpecialSupportId) ??
      specialSupportBlocks[0]
    )
  }, [activeSpecialSupportId, specialSupportBlocks])

  const publicUniversityList = useMemo(
    () => [
      "東京大学","京都大学","大阪大学","名古屋大学","東北大学","九州大学","北海道大学","一橋大学","東京工業大学","筑波大学","神戸大学","横浜国立大学","千葉大学","東京外国語大学","東京学芸大学","東京都立大学","広島大学","金沢大学","電気通信大学","熊本大学","長崎大学","山口大学","埼玉大学","信州大学","群馬大学","茨城大学","弘前大学","富山大学","山梨大学","宇都宮大学","滋賀大学","上越教育大学","兵庫県立大学","兵庫教育大学","横浜市立大学","大阪公立大学","広島市立大学","名古屋市立大学",
    ],
    []
  )

  const privateUniversityList = useMemo(
    () => [
      "早稲田大学","慶應義塾大学","上智大学","明治大学","青山学院大学","立教大学","中央大学","法政大学","立命館大学","関西学院大学","同志社大学","関西大学","東京理科大学","芝浦工業大学","学習院大学","明治学院大学","日本大学","専修大学","東洋大学","駒澤大学","神奈川大学","工学院大学","東京農業大学","東京電機大学","東京工科大学","東京都市大学","帝京大学","国士舘大学","昭和女子大学","武蔵野大学","文教大学","二松学舎大学","拓殖大学","大東文化大学","東海大学","城西大学","国際医療福祉大学","産業医科大学",
    ],
    []
  )

  const artUniversityList = useMemo(
    () => [
      "東京藝術大学","多摩美術大学","女子美術大学","武蔵野美術大学","東京造形大学","京都芸術大学","京都精華大学","京都市立芸術大学","名古屋芸術大学","名古屋造形大学","大阪芸術大学","愛知県立芸術大学","神戸芸術工科大学","東北芸術工科大学","秋田公立美術大学","成安造形大学","横浜美術大学","金沢美術工芸大学","武蔵野音楽大学","洗足学園音楽大学","昭和音楽大学","東邦音楽大学","尚美学園大学","文化学園大学","東京工芸大学","日本映画大学",
    ],
    []
  )

  function TimetableBadge({
    text,
    tone,
  }: {
    text: string
    tone: TimetableTone
  }) {
    const value = text?.trim()
    if (!value) {
      return <span className="text-gray-300">—</span>
    }
    return (
      <span
        className={[
          "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold leading-none",
          timetableToneStyles[tone],
        ].join(" ")}
      >
        {value}
      </span>
    )
  }

  return (
    <section ref={sectionRef} id="education" className="bg-white">
      {/* Page Banner - Extended to cover navigation area */}
      <div className="relative h-[350px] md:h-[400px] w-full overflow-hidden">
        <Image
          src={`/images/original_from_customer/${encodeURIComponent('トップ背景')}/${encodeURIComponent('02_教育内容（手元にフォーカス）')}.jpg`}
          alt={t("nav.education")}
          fill
          className="object-cover object-[center_68%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 flex items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">{t("educationPage.bannerTitle")}</h1>
            <div className="w-20 h-1 bg-white/80 mx-auto mt-6 rounded-full"></div>
          </div>
        </div>
      </div>

      <PageBreadcrumb items={[{ label: t("nav.education") }]} />

      {/* Content Section */}
      <div className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Page Title */}
          <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="w-12 h-1 bg-[#0085b2] mx-auto mb-6 rounded-full" />
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              {t("educationPage.intro1")}
              <br />
              {t("educationPage.intro2")}
            </p>
            <div className="elegant-divider mt-8" />
          </div>

          {/* 教育理念・教育方針 */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="inline-block w-1.5 h-8 rounded-full bg-[#0085b2]" />
              {t("educationPage.philosophyTitle")}
            </h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                {t("educationPage.philosophyText1")}
              </p>
              <p>
                {t("educationPage.philosophyText2")}
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-16" />

          {/* コース紹介 */}
          <div className="mb-16" id="course1">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="inline-block w-1.5 h-8 rounded-full bg-[#0085b2]" />
              {t("educationPage.courseIntroTitle")}
            </h2>

            {/* Tabs — セグメント型で「タブ」と分かるUI */}
            <div className="mb-8">
              <div
                role="tablist"
                aria-label={t("educationPage.courseIntroTitle")}
                className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-stretch rounded-2xl border border-gray-200 bg-gray-100/90 p-1.5 shadow-inner"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCourseTab === "prep"}
                  aria-controls="course-tabpanel-prep"
                  id="course-tab-prep"
                  onClick={() => setActiveCourseTab("prep")}
                  className={[
                    "min-h-[48px] flex-1 rounded-xl px-4 py-3 text-left text-sm font-semibold leading-snug transition-all duration-200 md:text-base md:px-5",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0085b2] focus-visible:ring-offset-2",
                    activeCourseTab === "prep"
                      ? "bg-white text-[#0085b2] shadow-md shadow-[#0085b2]/10 ring-2 ring-[#0085b2]/25"
                      : "border border-transparent bg-transparent text-gray-600 hover:border-gray-200 hover:bg-white/80 hover:text-gray-900",
                  ].join(" ")}
                >
                  {t("educationPage.prepCourseTitle")}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCourseTab === "advanced"}
                  aria-controls="course-tabpanel-advanced"
                  id="course-tab-advanced"
                  onClick={() => setActiveCourseTab("advanced")}
                  className={[
                    "min-h-[48px] flex-1 rounded-xl px-4 py-3 text-left text-sm font-semibold leading-snug transition-all duration-200 md:text-base md:px-5",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0085b2] focus-visible:ring-offset-2",
                    activeCourseTab === "advanced"
                      ? "bg-white text-[#0085b2] shadow-md shadow-[#0085b2]/10 ring-2 ring-[#0085b2]/25"
                      : "border border-transparent bg-transparent text-gray-600 hover:border-gray-200 hover:bg-white/80 hover:text-gray-900",
                  ].join(" ")}
                >
                  {t("educationPage.advancedCourseTitle")}
                </button>
              </div>
            </div>

            {/* Tab panels */}
            {activeCourseTab === "prep" ? (
              <div
                role="tabpanel"
                id="course-tabpanel-prep"
                aria-labelledby="course-tab-prep"
                className="mb-12"
              >
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold tracking-[0.18em] text-gray-500 mr-1">
                    {t("educationPage.coursePillsEyebrow")}
                  </span>
                  {prepCoursePillLabels.map((label, idx) => (
                    <span
                      key={`prep-pill-${idx}`}
                      className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm"
                    >
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#0085b2]" />
                      {label}
                    </span>
                  ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-10">
                  <div>
                    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-sm border border-gray-200 bg-gray-50">
                      <Image
                        src={`/images/original_from_customer/${encodeURIComponent("コース紹介")}.jpg`}
                        alt={t("educationPage.prepCourseImageAlt")}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex items-center rounded-full bg-[#0085b2]/10 text-[#006d94] px-3 py-1 text-xs font-semibold tracking-[0.18em]">
                          POINT 01
                        </span>
                        <div className="h-px flex-1 bg-gray-200" />
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {t("educationPage.prepCourseDesc1")}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex items-center rounded-full bg-[#0085b2]/10 text-[#006d94] px-3 py-1 text-xs font-semibold tracking-[0.18em]">
                          POINT 02
                        </span>
                        <div className="h-px flex-1 bg-gray-200" />
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {t("educationPage.prepCourseDesc2")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                  <h4 className="font-bold text-gray-900 mb-4">
                    {t("educationPage.prepCourseLevelTitle")}
                  </h4>
                  <div className="space-y-3 text-gray-700 leading-relaxed text-sm">
                    <p>{t("educationPage.prepCourseLevelDesc1")}</p>
                    <p>{t("educationPage.prepCourseLevelDesc2")}</p>
                    <p>{t("educationPage.prepCourseLevelDesc3")}</p>
                    <p>{t("educationPage.prepCourseLevelDesc4")}</p>
                  </div>
                  <aside
                    className="mt-6 border-t border-gray-100 pt-4"
                    aria-label={t("educationPage.prepCourseNoteTitle")}
                  >
                    <p className="text-[10px] leading-snug font-semibold text-gray-600 sm:text-[13px]">
                      {t("educationPage.prepCourseNoteTitle")}
                    </p>
                    <p className="mt-1.5 text-[10px] leading-relaxed text-gray-500 sm:text-[13px]">
                      {t("educationPage.prepCourseNoteDesc")}
                    </p>
                  </aside>
                </div>
              </div>
            ) : null}

            {activeCourseTab === "advanced" ? (
              <div
                role="tabpanel"
                id="course-tabpanel-advanced"
                aria-labelledby="course-tab-advanced"
                className="mb-12"
              >
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold tracking-[0.18em] text-gray-500 mr-1">
                    {t("educationPage.coursePillsEyebrow")}
                  </span>
                  {advancedCoursePillLabels.map((label, idx) => (
                    <span
                      key={`advanced-pill-${idx}`}
                      className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm"
                    >
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#0085b2]" />
                      {label}
                    </span>
                  ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-10">
                  <div>
                    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-sm border border-gray-200 bg-gray-50">
                      <Image
                        src={`/images/original_from_customer/${encodeURIComponent("コース紹介_2")}.jpg`}
                        alt={t("educationPage.advancedCourseImageAlt")}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center rounded-full bg-[#0085b2]/10 text-[#006d94] px-3 py-1 text-xs font-semibold tracking-[0.18em]">
                        OVERVIEW
                      </span>
                      <div className="h-px flex-1 bg-gray-200" />
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {t("educationPage.advancedCourseDesc")}
                    </p>
                  </div>
                </div>

                {/* Moved to bottom */}
                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                  <h4 className="font-bold text-gray-900 mb-4">
                    {t("educationPage.advancedCourseLevelTitle")}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700 leading-relaxed">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                      >
                        {t(`educationPage.advancedCourseLevelDesc${i + 1}` as const)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {/* Common section (not inside tabs) */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">
                {t("educationPage.cefrLevelTitle")}
              </h4>
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
                <div className="text-xs font-semibold tracking-[0.18em] text-gray-500 mb-3">
                  KCP LEVEL
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-5">
                  {Array.from({ length: 8 }).map((_, idx) => {
                    const level = idx + 1
                    const isActive = level === activeKcpLevel
                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setActiveKcpLevel(level as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8)}
                        className={[
                          "rounded-xl border px-2 py-3 text-center text-xs font-semibold transition",
                          isActive
                            ? "border-[#0085b2] bg-[#0085b2]/10 text-[#006d94]"
                            : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100",
                        ].join(" ")}
                        aria-label={`Lv.${level}`}
                      >
                        Lv.{level}
                      </button>
                    )
                  })}
                </div>

                <div className="grid md:grid-cols-[220px_1fr] gap-5">
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <div className="text-sm font-bold text-gray-900">
                      {activeCefrRow.cefr}
                    </div>
                    <div className="mt-1 text-xs font-semibold text-gray-600">
                      {activeCefrRow.kcp}
                    </div>
                    <div className="mt-4 text-xs font-semibold text-gray-500">
                      STEP {activeCefrRow.step}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-white p-4">
                    <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                      <div>
                        <div className="text-sm font-bold text-gray-900 mb-1.5">
                          {activeCefrRow.kcp}
                        </div>
                        <p>{activeCefrRow.goal}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-16" />

          {/* 授業内容 */}
          <div className="mb-16" id="course2">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="inline-block w-1.5 h-8 rounded-full bg-[#0085b2]" />
              {t("educationPage.classContentTitle")}
            </h2>

            <div className="grid lg:grid-cols-[340px_1fr] gap-6">
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col min-h-0">
                <div className="shrink-0 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900 border-b border-gray-100">
                  項目一覧
                </div>
                {/* 約3件分の高さまで表示し、以降はスクロール */}
                <div className="max-h-[13.5rem] sm:max-h-[15rem] overflow-y-auto overscroll-y-contain divide-y divide-gray-100 [scrollbar-gutter:stable]">
                  {classContentItems.map((item) => {
                    const isActive = item.id === activeClassContentId
                    const { main, paren } = splitClassContentNavTitle(item.title)
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveClassContentId(item.id)}
                        className={[
                          "w-full px-4 py-3 text-left flex items-start justify-between gap-3 hover:bg-gray-50 transition",
                          isActive ? "bg-[#0085b2]/5" : "bg-white",
                        ].join(" ")}
                      >
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-gray-500 mb-1">
                            {String(item.id + 1).padStart(2, "0")}
                          </div>
                          <div className="font-semibold text-gray-900 leading-snug break-words">
                            <span className="block">{main}</span>
                            {paren ? (
                              <span className="block mt-0.5">{paren}</span>
                            ) : null}
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 shrink-0 mt-1" />
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm">
                    {String(activeClassContentItem.id + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs font-semibold tracking-[0.18em] text-gray-400">
                    DETAIL
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">
                  {activeClassContentItem.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {activeClassContentItem.content}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-16" />

          {/* 特別クラス・進路サポート */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="inline-block w-1.5 h-8 rounded-full bg-[#0085b2]" />
              {t("educationPage.specialClassTitle")}
            </h2>

            <p className="text-gray-700 mb-8 font-semibold whitespace-pre-line">
              {t("educationPage.specialClassIntro")}
            </p>

            <div className="grid lg:grid-cols-[340px_1fr] gap-6">
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900">
                  {t("educationPage.specialClassNavHeading")}
                </div>
                <div className="divide-y divide-gray-100">
                  {specialSupportBlocks.map((b, idx) => {
                    const isActive = b.id === activeSpecialSupportId
                    const Icon = b.icon
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setActiveSpecialSupportId(b.id)}
                        className={[
                          "w-full px-4 py-3 text-left flex items-center justify-between gap-3 hover:bg-gray-50 transition",
                          isActive ? "bg-[#0085b2]/5" : "bg-white",
                        ].join(" ")}
                      >
                        <div className="min-w-0 flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center shrink-0">
                            <Icon className="h-4 w-4 text-[#0085b2]" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-gray-500 mb-0.5">
                              {String(idx + 1).padStart(2, "0")}
                            </div>
                            <div className="font-semibold text-gray-900 truncate">
                              {b.title}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 shrink-0" />
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm">
                    {activeSpecialSupportBlock?.eyebrow ?? "DETAIL"}
                  </span>
                  <span className="text-xs font-semibold tracking-[0.18em] text-gray-400">
                    DETAIL
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">
                  {activeSpecialSupportBlock?.title}
                </h3>
                <div className="text-sm">{activeSpecialSupportBlock?.content}</div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-16" />

          {/* 時間割例 */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="inline-block w-1.5 h-8 rounded-full bg-[#0085b2]" />
              {t("educationPage.timetableTitle")}
            </h2>

            <p className="text-gray-700 mb-4 font-semibold">{t("educationPage.timetableNote")}</p>

            {/* 初級クラス */}
            <div className="mb-8">
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <div className="min-w-[860px] rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">
                          {t("educationPage.beginnerClass")}
                        </th>
                        {timetableDays.map((day) => (
                          <th
                            key={day.key}
                            className="px-4 py-3 text-center font-semibold text-gray-900"
                          >
                            {day.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700">
                      {beginnerTimeSlots.map((slot, rowIndex) => (
                        <tr key={slot} className="odd:bg-white even:bg-gray-50/40">
                          <td className="px-4 py-3 font-semibold text-gray-900">{slot}</td>
                          {timetableDays.map((day, colIndex) => (
                            <td key={day.key} className="px-4 py-3 text-center">
                              <TimetableBadge
                                text={t(`educationPage.timetableBeginnerCells.${rowIndex}.${colIndex}` as const)}
                                tone={beginnerTones[rowIndex][colIndex]}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden">
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="inline-block w-1 h-6 rounded-full bg-[#0085b2]" />
                  {t("educationPage.beginnerClass")}
                </h3>
                <div className="grid gap-4">
                {timetableDays.map((day, colIndex) => (
                  <div key={day.key} className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 font-semibold text-gray-900">{day.label}</div>
                    <div className="divide-y divide-gray-100">
                      {beginnerTimeSlots.map((slot, rowIndex) => (
                        <div key={slot} className="px-4 py-3 flex items-start justify-between gap-3">
                          <span className="text-xs font-semibold text-gray-600 shrink-0">{slot}</span>
                          <div className="text-right">
                            <TimetableBadge
                              text={t(`educationPage.timetableBeginnerCells.${rowIndex}.${colIndex}` as const)}
                              tone={beginnerTones[rowIndex][colIndex]}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-500">
                <p>{t("educationPage.timetableFootnote1")}</p>
              </div>
            </div>

            {/* 中級クラス */}
            <div className="mb-8">
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <div className="min-w-[860px] rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">
                          {t("educationPage.intermediateClass")}
                        </th>
                        {timetableDays.map((day) => (
                          <th
                            key={day.key}
                            className="px-4 py-3 text-center font-semibold text-gray-900"
                          >
                            {day.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700">
                      {intermediateTimeSlots.map((slot, rowIndex) => (
                        <tr key={slot} className="odd:bg-white even:bg-gray-50/40">
                          <td className="px-4 py-3 font-semibold text-gray-900">{slot}</td>
                          {timetableDays.map((day, colIndex) => (
                            <td key={day.key} className="px-4 py-3 text-center">
                              <TimetableBadge
                                text={t(`educationPage.timetableIntermediateCells.${rowIndex}.${colIndex}` as const)}
                                tone={intermediateTones[rowIndex][colIndex]}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden">
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="inline-block w-1 h-6 rounded-full bg-[#0085b2]" />
                  {t("educationPage.intermediateClass")}
                </h3>
                <div className="grid gap-4">
                {timetableDays.map((day, colIndex) => (
                  <div key={day.key} className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 font-semibold text-gray-900">{day.label}</div>
                    <div className="divide-y divide-gray-100">
                      {intermediateTimeSlots.map((slot, rowIndex) => (
                        <div key={slot} className="px-4 py-3 flex items-start justify-between gap-3">
                          <span className="text-xs font-semibold text-gray-600 shrink-0">{slot}</span>
                          <div className="text-right">
                            <TimetableBadge
                              text={t(`educationPage.timetableIntermediateCells.${rowIndex}.${colIndex}` as const)}
                              tone={intermediateTones[rowIndex][colIndex]}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-500">
                <p>{t("educationPage.timetableFootnote2")}</p>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-16" />

          {/* 合格までのスケジュール */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="inline-block w-1.5 h-8 rounded-full bg-[#0085b2]" />
              {t("educationPage.admissionScheduleTitle")}
            </h2>

            <div className="relative">
              <div className="pointer-events-none hidden md:block absolute left-[26px] top-6 bottom-6 z-0 w-px bg-gray-200" />
              <div className="relative z-10 space-y-6">
                {[
                  {
                    id: "year1",
                    title: t("educationPage.year1Title"),
                    period: t("educationPage.year1Period"),
                    uni: t("educationPage.year1Uni"),
                    grad: t("educationPage.year1Grad"),
                    accent: "blue" as const,
                    Icon: CalendarClock,
                  },
                  {
                    id: "year2first",
                    title: t("educationPage.year2FirstTitle"),
                    period: t("educationPage.year2FirstPeriod"),
                    uni: t("educationPage.year2FirstUni"),
                    grad: t("educationPage.year2FirstGrad"),
                    accent: "emerald" as const,
                    Icon: Route,
                  },
                  {
                    id: "year2second",
                    title: t("educationPage.year2SecondTitle"),
                    period: t("educationPage.year2SecondPeriod"),
                    uni: t("educationPage.year2SecondUni"),
                    grad: t("educationPage.year2SecondGrad"),
                    accent: "violet" as const,
                    Icon: GraduationCap,
                  },
                ].map((stage, idx) => {
                  const dotColor =
                    stage.accent === "blue"
                      ? "bg-[#0085b2]"
                      : stage.accent === "emerald"
                        ? "bg-emerald-600"
                        : "bg-violet-600"
                  return (
                    <div key={stage.id} className="flex items-start gap-4">
                      <div className="relative z-10 shrink-0 pt-2">
                        <div className="h-14 w-14 rounded-2xl border border-gray-200 bg-white shadow-sm flex items-center justify-center">
                          <stage.Icon className="h-6 w-6 text-[#0085b2]" />
                        </div>
                      </div>

                      <div className="relative z-10 min-w-0 flex-1 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <div
                          className={[
                            "border-b border-sky-300/25 px-6 pt-6 pb-4",
                            admissionScheduleHeaderBands[idx],
                          ].join(" ")}
                        >
                          <div className="space-y-2.5">
                            <div className="flex items-center gap-3">
                              <span
                                className={["h-2.5 w-2.5 shrink-0 rounded-full", dotColor].join(
                                  " "
                                )}
                              />
                              <h3 className="font-serif text-xl font-bold text-gray-900">
                                {stage.title}
                              </h3>
                            </div>
                            <span
                              className={[
                                "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold md:text-sm",
                                admissionSchedulePeriodPills[idx],
                              ].join(" ")}
                            >
                              {stage.period}
                            </span>
                          </div>
                        </div>

                        <div className="px-6 pb-6 pt-5">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <School className="h-4 w-4 text-gray-500" />
                              <p className="text-sm font-bold text-gray-900">
                                {t("educationPage.scheduleUni")}
                              </p>
                            </div>
                            <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                              {stage.uni}
                            </p>
                          </div>
                          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <GraduationCap className="h-4 w-4 text-gray-500" />
                              <p className="text-sm font-bold text-gray-900">
                                {t("educationPage.scheduleGrad")}
                              </p>
                            </div>
                            <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                              {stage.grad}
                            </p>
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-16" />
          <div id="course3" className="mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="inline-block w-1.5 h-8 rounded-full bg-[#0085b2]" />
              {t("educationPage.recommendationTitle")} / {t("educationPage.recentResultsTitle")}
            </h2>

            <div className="text-gray-700 mb-8 space-y-2 leading-relaxed">
              <p className="font-semibold text-gray-900">
                {t("educationPage.advancementCalloutLine1")}
              </p>
              <p>{t("educationPage.advancementCalloutLine2")}</p>
            </div>

            <div className="space-y-4">
              <details className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0 pr-2">
                    <p className="text-base font-bold text-gray-900">
                      {t("educationPage.recommendationTitle")}
                    </p>
                    <p className="text-sm text-gray-600 mt-1.5 leading-snug">
                      {t("educationPage.recommendationDesc")}
                    </p>
                  </div>
                  <ChevronDown className="h-5 w-5 shrink-0 text-gray-500" />
                </summary>
                <div className="px-5 pb-5">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      "法政大学",
                      "東洋大学",
                      "芝浦工業大学",
                      "関西学院大学",
                      "拓殖大学",
                      "昭和女子大学",
                      "尚美学園大学",
                      "フェリス女学院大学",
                      "東京工芸大学",
                      "武蔵野大学",
                      "帝京大学",
                      "駒沢女子大学",
                      "東京情報大学",
                      "横浜商科大学",
                      "明海大学",
                      "文化学園大学",
                      "多摩大学",
                      "関西国際大学",
                    ].map((uni) => (
                      <div key={uni} className="rounded-lg bg-gray-50 border border-gray-200 px-3 py-2 text-sm text-gray-800">
                        {uni}
                      </div>
                    ))}
                    {/* 空きマス側に「等」を配置（最後の大学名にくっつけない） */}
                    <div className="rounded-lg bg-gray-50 border px-3 py-2 text-sm text-gray-800 md:col-start-3 md:col-span-1">
                      等
                    </div>
                  </div>
                  <div className="mt-4 bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                    <p className="text-sm text-gray-700">{t("educationPage.recommendationNote")}</p>
                  </div>
                </div>
              </details>

              <details className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-base font-bold text-gray-900">{t("educationPage.publicUniSummaryTitle")}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {t("educationPage.resultsAccordionBadgeNationalPublic")}
                    </p>
                  </div>
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </summary>
                <div className="px-5 pb-5">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {publicUniversityList.map((u) => (
                      <div key={u} className="rounded-lg bg-gray-50 border border-gray-200 px-3 py-2 text-sm text-gray-800">
                        {u}
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-400 italic text-sm mt-2">{t("educationPage.etcLabel")}</p>
                </div>
              </details>

              <details className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-base font-bold text-gray-900">{t("educationPage.privateUniSummaryTitle")}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {t("educationPage.resultsAccordionBadgePrivate")}
                    </p>
                  </div>
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </summary>
                <div className="px-5 pb-5">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {privateUniversityList.map((u) => (
                      <div key={u} className="rounded-lg bg-gray-50 border border-gray-200 px-3 py-2 text-sm text-gray-800">
                        {u}
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-400 italic text-sm mt-2">{t("educationPage.etcLabel")}</p>
                </div>
              </details>

              <details className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-base font-bold text-gray-900">{t("educationPage.artMusicUniSummaryTitle")}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {t("educationPage.resultsAccordionBadgeArtMusic")}
                    </p>
                  </div>
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </summary>
                <div className="px-5 pb-5">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {artUniversityList.map((u) => (
                      <div key={u} className="rounded-lg bg-gray-50 border border-gray-200 px-3 py-2 text-sm text-gray-800">
                        {u}
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-400 italic text-sm mt-2">{t("educationPage.etcLabel")}</p>
                </div>
              </details>
            </div>
          </div>

          {/* 進学実績・卒業生の声へのリンク */}
          <div className="mt-12 mb-16 text-center">
            <Link
              href="/education/results"
              className="group inline-flex items-center gap-3 bg-[#0085b2] hover:bg-[#006d94] text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              {t("educationPage.viewDetailedResults")}
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
