"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { ArrowRight } from "lucide-react"

type TimetableTone =
  | "kanji"
  | "listening"
  | "comprehensive"
  | "reading"
  | "essay"
  | "prepElective"
  | "neutral"

export function EducationSection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeCourseTab, setActiveCourseTab] = useState<"prep" | "advanced">(
    "prep"
  )
  const [activeCefrStep, setActiveCefrStep] = useState<1 | 2 | 3 | 4 | 5>(3)
  const [activeClassContentId, setActiveClassContentId] = useState<number>(0)

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
        step: 1 as const,
        cefr: "🟢A1",
        kcp: "Lv.1",
        goals: [t("educationPage.cefrA1Goal")],
      },
      {
        step: 2 as const,
        cefr: "🟢A2",
        kcp: "Lv.2",
        goals: [t("educationPage.cefrA2Goal")],
      },
      {
        step: 3 as const,
        cefr: "🟡B1",
        kcp: "Lv.3 / Lv.4",
        goals: [t("educationPage.cefrB1Goal1"), t("educationPage.cefrB1Goal2")],
      },
      {
        step: 4 as const,
        cefr: "🟠B2",
        kcp: "Lv.5 / Lv.6",
        goals: [t("educationPage.cefrB2Goal1"), t("educationPage.cefrB2Goal2")],
      },
      {
        step: 5 as const,
        cefr: "🟣B2",
        kcp: "Lv.7 / Lv.8",
        goals: [
          t("educationPage.cefrB2AdvGoal1"),
          t("educationPage.cefrB2AdvGoal2"),
        ],
      },
    ],
    [t]
  )

  const activeCefrRow = useMemo(() => {
    return cefrRows.find((row) => row.step === activeCefrStep) ?? cefrRows[0]
  }, [activeCefrStep, cefrRows])

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
          alt="教育内容"
          fill
          className="object-cover object-[center_35%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 flex items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">{t("educationPage.bannerTitle")}</h1>
            <div className="w-20 h-1 bg-white/80 mx-auto mt-6 rounded-full"></div>
          </div>
        </div>
      </div>

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

            {/* Tabs */}
            <div className="mb-8">
              <div
                role="tablist"
                aria-label={t("educationPage.courseIntroTitle")}
                className="border-b border-gray-200"
              >
                <div className="flex gap-6">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeCourseTab === "prep"}
                    aria-controls="course-tabpanel-prep"
                    id="course-tab-prep"
                    onClick={() => setActiveCourseTab("prep")}
                    className={[
                      "relative -mb-px px-1 pb-4 text-sm md:text-base font-semibold transition-colors",
                      activeCourseTab === "prep"
                        ? "text-[#0085b2]"
                        : "text-gray-600 hover:text-gray-900",
                    ].join(" ")}
                  >
                    {t("educationPage.prepCourseTitle")}
                    <span
                      className={[
                        "absolute left-0 right-0 -bottom-px h-0.5 rounded-full transition-opacity",
                        activeCourseTab === "prep"
                          ? "bg-[#0085b2] opacity-100"
                          : "bg-transparent opacity-0",
                      ].join(" ")}
                    />
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeCourseTab === "advanced"}
                    aria-controls="course-tabpanel-advanced"
                    id="course-tab-advanced"
                    onClick={() => setActiveCourseTab("advanced")}
                    className={[
                      "relative -mb-px px-1 pb-4 text-sm md:text-base font-semibold transition-colors",
                      activeCourseTab === "advanced"
                        ? "text-[#0085b2]"
                        : "text-gray-600 hover:text-gray-900",
                    ].join(" ")}
                  >
                    進学高度日本語（学びと探求）
                    <span
                      className={[
                        "absolute left-0 right-0 -bottom-px h-0.5 rounded-full transition-opacity",
                        activeCourseTab === "advanced"
                          ? "bg-[#0085b2] opacity-100"
                          : "bg-transparent opacity-0",
                      ].join(" ")}
                    />
                  </button>
                </div>
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
                    COURSE
                  </span>
                  {["2年課程", "1年6か月課程"].map((label) => (
                    <span
                      key={label}
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
                        alt="進学準備教育コース"
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

                {/* Moved to bottom (was right column) */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                    <h4 className="font-bold text-gray-900 mb-3">
                      {t("educationPage.prepCourseNoteTitle")}
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {t("educationPage.prepCourseNoteDesc")}
                    </p>
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
                  </div>
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
                    COURSE
                  </span>
                  {[
                    "2年課程",
                    "1年9か月課程",
                    "1年6か月課程",
                    "1年3か月課程",
                  ].map((label) => (
                    <span
                      key={label}
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
                        alt="進学高度日本語コース"
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
                    const step =
                      level <= 1
                        ? 1
                        : level <= 2
                          ? 2
                          : level <= 4
                            ? 3
                            : level <= 6
                              ? 4
                              : 5
                    const isActive = step === activeCefrStep
                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setActiveCefrStep(step as 1 | 2 | 3 | 4 | 5)}
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
                    <div className="text-sm font-bold text-gray-900 mb-2">
                      {t("educationPage.goalHeader")}
                    </div>
                    <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
                      {activeCefrRow.goals.map((goal, idx) => (
                        <p key={idx}>{goal}</p>
                      ))}
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
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900">
                  項目一覧
                </div>
                <div className="divide-y divide-gray-100">
                  {classContentItems.map((item) => {
                    const isActive = item.id === activeClassContentId
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveClassContentId(item.id)}
                        className={[
                          "w-full px-4 py-3 text-left flex items-center justify-between gap-3 hover:bg-gray-50 transition",
                          isActive ? "bg-[#0085b2]/5" : "bg-white",
                        ].join(" ")}
                      >
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-gray-500 mb-1">
                            {String(item.id + 1).padStart(2, "0")}
                          </div>
                          <div className="font-semibold text-gray-900 truncate">
                            {item.title}
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

            <p className="text-gray-700 mb-8 font-semibold">{t("educationPage.specialClassIntro")}</p>

            <div className="space-y-8">
              {/* 日本語強化クラス */}
              <div>
                <div className="mb-2 text-gray-900">
                  <span className="font-bold">{t("educationPage.jpReinforcementTitle")}</span>
                  <span className="text-gray-700">{t("educationPage.jpReinforcementLevel")}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {t("educationPage.jpReinforcementDesc")}
                </p>
              </div>

              {/* 日本語プラス */}
              <div>
                <div className="mb-4 text-gray-900">
                  <span className="font-bold">{t("educationPage.jpPlusTitle")}</span>
                  <span className="text-gray-700">{t("educationPage.jpPlusLevel")}</span>
                </div>
                <p className="font-semibold text-gray-900 mb-4">{t("educationPage.jpPlusExamTitle")}</p>

                <div className="space-y-3 text-gray-700 leading-relaxed">
                  <div>
                    <p><strong>{t("educationPage.ejuLabel")}</strong>{t("educationPage.ejuDesc")}</p>
                  </div>
                  <div>
                    <p><strong>{t("educationPage.mathLabel")}</strong>{t("educationPage.mathDesc")}</p>
                  </div>
                  <div>
                    <p><strong>{t("educationPage.scienceLabel")}</strong>{t("educationPage.scienceDesc")}</p>
                  </div>
                  <div>
                    <p><strong>{t("educationPage.socialLabel")}</strong>{t("educationPage.socialDesc")}</p>
                  </div>
                  <div>
                    <p><strong>{t("educationPage.jlptLabel")}</strong>{t("educationPage.jlptDesc")}</p>
                  </div>
                  <div>
                    <p><strong>{t("educationPage.toeicLabel")}</strong>{t("educationPage.toeicDesc")}</p>
                  </div>
                </div>
              </div>

              {/* 進路指導グリッド */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">{t("educationPage.uniGuidanceTitle")}</h4>
                  <div className="text-gray-700 leading-relaxed space-y-2 text-sm">
                    <p><strong>{t("educationPage.uniHRLabel")}</strong>{t("educationPage.uniHRDesc")}</p>
                    <p><strong>{t("educationPage.gradHRLabel")}</strong>{t("educationPage.gradHRDesc")}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">{t("educationPage.artGuidanceTitle")}</h4>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {t("educationPage.artGuidanceDesc")}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">{t("educationPage.individualTitle")}</h4>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {t("educationPage.individualDesc")}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">{t("educationPage.jobSupportTitle")}</h4>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {t("educationPage.jobSupportDesc")}
                  </p>
                </div>
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

            <div className="mb-6 flex flex-wrap gap-2">
              <span className={["inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold", timetableToneStyles.kanji].join(" ")}>
                {t("educationPage.timetableLegend.kanji")}
              </span>
              <span className={["inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold", timetableToneStyles.listening].join(" ")}>
                {t("educationPage.timetableLegend.listening")}
              </span>
              <span className={["inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold", timetableToneStyles.comprehensive].join(" ")}>
                {t("educationPage.timetableLegend.comprehensive")}
              </span>
              <span className={["inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold", timetableToneStyles.reading].join(" ")}>
                {t("educationPage.timetableLegend.reading")}
              </span>
              <span className={["inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold", timetableToneStyles.essay].join(" ")}>
                {t("educationPage.timetableLegend.essay")}
              </span>
              <span className={["inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold", timetableToneStyles.prepElective].join(" ")}>
                {t("educationPage.timetableLegend.prepElective")}
              </span>
            </div>

            {/* 初級クラス */}
            <div className="mb-8">
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <div className="min-w-[860px] rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr className="text-left">
                        <th className="px-4 py-3 font-semibold text-gray-900">{t("educationPage.beginnerClass")}</th>
                        {timetableDays.map((day) => (
                          <th key={day.key} className="px-4 py-3 font-semibold text-gray-900">
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
                            <td key={day.key} className="px-4 py-3">
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
              <div className="md:hidden grid gap-4">
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

            {/* 中級クラス */}
            <div className="mb-8">
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <div className="min-w-[860px] rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr className="text-left">
                        <th className="px-4 py-3 font-semibold text-gray-900">{t("educationPage.intermediateClass")}</th>
                        {timetableDays.map((day) => (
                          <th key={day.key} className="px-4 py-3 font-semibold text-gray-900">
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
                            <td key={day.key} className="px-4 py-3">
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
              <div className="md:hidden grid gap-4">
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

            <div className="mt-4 space-y-1 text-xs text-gray-500">
              <p>{t("educationPage.timetableFootnote1")}</p>
              <p>{t("educationPage.timetableFootnote2")}</p>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-16" />

          {/* 合格までのスケジュール */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="inline-block w-1.5 h-8 rounded-full bg-[#0085b2]" />
              {t("educationPage.admissionScheduleTitle")}
            </h2>

            {/* 1年目 */}
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-4 text-gray-800">{t("educationPage.year1Title")}</h3>
              <div className="overflow-x-auto">
                <div className="min-w-[720px] rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <table className="w-full text-sm">
                  <colgroup>
                    <col className="w-1/4" />
                    <col className="w-3/8" />
                    <col className="w-3/8" />
                  </colgroup>
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-left text-gray-900">{t("educationPage.scheduleCategory")}</th>
                      <th className="px-4 py-3 font-semibold text-left text-gray-900">{t("educationPage.scheduleUni")}</th>
                      <th className="px-4 py-3 font-semibold text-left text-gray-900">{t("educationPage.scheduleGrad")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    <tr className="odd:bg-white even:bg-gray-50/40">
                      <td className="px-4 py-3 font-semibold text-gray-900">{t("educationPage.year1Period")}</td>
                      <td className="px-4 py-3 whitespace-pre-line">
                        {t("educationPage.year1Uni")}
                      </td>
                      <td className="px-4 py-3 whitespace-pre-line">
                        {t("educationPage.year1Grad")}
                      </td>
                    </tr>
                  </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* 2年目 前半 */}
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-4 text-gray-800">{t("educationPage.year2FirstTitle")}</h3>
              <div className="overflow-x-auto">
                <div className="min-w-[720px] rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <table className="w-full text-sm">
                  <colgroup>
                    <col className="w-1/4" />
                    <col className="w-3/8" />
                    <col className="w-3/8" />
                  </colgroup>
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-left text-gray-900">{t("educationPage.scheduleCategory")}</th>
                      <th className="px-4 py-3 font-semibold text-left text-gray-900">{t("educationPage.scheduleUni")}</th>
                      <th className="px-4 py-3 font-semibold text-left text-gray-900">{t("educationPage.scheduleGrad")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    <tr className="odd:bg-white even:bg-gray-50/40">
                      <td className="px-4 py-3 font-semibold text-gray-900">{t("educationPage.year2FirstPeriod")}</td>
                      <td className="px-4 py-3 whitespace-pre-line">
                        {t("educationPage.year2FirstUni")}
                      </td>
                      <td className="px-4 py-3 whitespace-pre-line">
                        {t("educationPage.year2FirstGrad")}
                      </td>
                    </tr>
                  </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* 2年目 後半 */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">{t("educationPage.year2SecondTitle")}</h3>
              <div className="overflow-x-auto">
                <div className="min-w-[720px] rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <table className="w-full text-sm">
                  <colgroup>
                    <col className="w-1/4" />
                    <col className="w-3/8" />
                    <col className="w-3/8" />
                  </colgroup>
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-left text-gray-900">{t("educationPage.scheduleCategory")}</th>
                      <th className="px-4 py-3 font-semibold text-left text-gray-900">{t("educationPage.scheduleUni")}</th>
                      <th className="px-4 py-3 font-semibold text-left text-gray-900">{t("educationPage.scheduleGrad")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    <tr className="odd:bg-white even:bg-gray-50/40">
                      <td className="px-4 py-3 font-semibold text-gray-900">{t("educationPage.year2SecondPeriod")}</td>
                      <td className="px-4 py-3 whitespace-pre-line">
                        {t("educationPage.year2SecondUni")}
                      </td>
                      <td className="px-4 py-3 whitespace-pre-line">
                        {t("educationPage.year2SecondGrad")}
                      </td>
                    </tr>
                  </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-16" />
          <div className="mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="inline-block w-1.5 h-8 rounded-full bg-[#0085b2]" />
              {t("educationPage.recommendationTitle")}
            </h2>

            <p className="text-gray-700 mb-8">
              {t("educationPage.recommendationDesc")}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
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
                "関西国際大学"
              ].map((uni, index) => (
                <div key={index} className="p-4 bg-[#f0ffff] rounded-lg text-center text-gray-800 font-semibold border border-[#0085b2]/20 hover:bg-[#0085b2]/10 transition">
                  {uni}
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <p className="text-sm text-gray-700">
                {t("educationPage.recommendationNote")}
              </p>
            </div>
          </div>

          {/* 進学実績 */}
          <div id="course3">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="inline-block w-1.5 h-8 rounded-full bg-[#0085b2]" />
              {t("educationPage.recentResultsTitle")}
            </h2>

            <div className="space-y-8">
              {/* 国公立大学/大学院 */}
              <div className="bg-[#f0ffff] p-8 rounded-lg border border-[#0085b2]/20">
                <h3 className="text-lg font-bold mb-6 text-[#003d52] text-center border-b-2 border-[#0085b2] pb-4">
                  {t("educationPage.publicUniSummaryTitle")}
                </h3>
                <div className="text-gray-700 text-sm leading-loose text-center space-y-2">
                  <p>
                    東京大学、京都大学、大阪大学、名古屋大学、東北大学、九州大学、<br />
                    北海道大学、一橋大学、東京工業大学、筑波大学、神戸大学、<br />
                    横浜国立大学、千葉大学、東京外国語大学、東京学芸大学、<br />
                    東京都立大学、広島大学、金沢大学、電気通信大学、熊本大学、<br />
                    長崎大学、山口大学、埼玉大学、信州大学、群馬大学、<br />
                    茨城大学、弘前大学、富山大学、山梨大学、宇都宮大学、<br />
                    滋賀大学、上越教育大学、兵庫県立大学、兵庫教育大学、<br />
                    横浜市立大学、大阪公立大学、広島市立大学、名古屋市立大学
                  </p>
                  <p className="text-gray-400 italic">{t("educationPage.etcLabel")}</p>
                </div>
              </div>

              {/* 私立大学/大学院 */}
              <div className="bg-purple-50 p-8 rounded-lg border border-purple-200">
                <h3 className="text-lg font-bold mb-6 text-purple-900 text-center border-b-2 border-purple-600 pb-4">
                  {t("educationPage.privateUniSummaryTitle")}
                </h3>
                <div className="text-gray-700 text-sm leading-loose text-center space-y-2">
                  <p>
                    早稲田大学、慶應義塾大学、上智大学、明治大学、青山学院大学、<br />
                    立教大学、中央大学、法政大学、立命館大学、関西学院大学、<br />
                    同志社大学、関西大学、東京理科大学、芝浦工業大学、<br />
                    学習院大学、明治学院大学、日本大学、専修大学、東洋大学、<br />
                    駒澤大学、神奈川大学、工学院大学、東京農業大学、<br />
                    東京電機大学、東京工科大学、東京都市大学、帝京大学、<br />
                    国士舘大学、昭和女子大学、武蔵野大学、文教大学、<br />
                    二松学舎大学、拓殖大学、大東文化大学、東海大学、<br />
                    城西大学、国際医療福祉大学、産業医科大学
                  </p>
                  <p className="text-gray-400 italic">{t("educationPage.etcLabel")}</p>
                </div>
              </div>

              {/* 芸術系・音楽系大学/大学院 */}
              <div className="bg-red-50 p-8 rounded-lg border border-red-200">
                <h3 className="text-lg font-bold mb-6 text-red-900 text-center border-b-2 border-red-600 pb-4">
                  {t("educationPage.artMusicUniSummaryTitle")}
                </h3>
                <div className="text-gray-700 text-sm leading-loose text-center space-y-2">
                  <p>
                    東京藝術大学、多摩美術大学、女子美術大学、武蔵野美術大学、<br />
                    東京造形大学、京都芸術大学、京都精華大学、京都市立芸術大学、<br />
                    名古屋芸術大学、名古屋造形大学、大阪芸術大学、<br />
                    愛知県立芸術大学、神戸芸術工科大学、東北芸術工科大学、<br />
                    秋田公立美術大学、成安造形大学、横浜美術大学、<br />
                    金沢美術工芸大学、武蔵野音楽大学、洗足学園音楽大学、<br />
                    昭和音楽大学、東邦音楽大学、尚美学園大学、文化学園大学、<br />
                    東京工芸大学、日本映画大学
                  </p>
                  <p className="text-gray-400 italic">{t("educationPage.etcLabel")}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#f0ffff] p-6 rounded-lg border border-[#0085b2]/20 mt-8">
              <p className="text-gray-700 text-sm leading-relaxed text-center">
                <strong>多くの卒業生が難関大学・専門学校への進学を実現。</strong><br />
                KCPは確かな進学実績と、指定校推薦枠を通じて、学びの先の未来を支えています。
              </p>
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
