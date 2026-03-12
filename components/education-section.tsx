"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { ArrowRight } from "lucide-react"

export function EducationSection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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
    <section ref={sectionRef} id="education" className="bg-white">
      {/* Page Banner */}
      <div className="relative h-[250px] md:h-[300px] w-full overflow-hidden">
        <Image
          src="/images/original_from_customer/トップ背景/02_教育内容（手元にフォーカス）.jpg"
          alt="教育内容"
          fill
          className="object-cover object-[center_15%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">{t("educationPage.bannerTitle")}</h1>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">{t("educationPage.philosophyTitle")}</h2>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">{t("educationPage.courseIntroTitle")}</h2>

            {/* 進学準備教育 */}
            <div className="mb-12">
              <h3 className="text-lg font-bold mb-6 text-gray-900">
                {t("educationPage.prepCourseTitle")}
              </h3>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden rounded-lg">
                    <Image
                      src="/images/original_from_customer/コース紹介.jpg"
                      alt="進学準備教育コース"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      {t("educationPage.prepCourseDesc1")}
                    </p>
                    <p>
                      {t("educationPage.prepCourseDesc2")}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-3">{t("educationPage.prepCourseNoteTitle")}</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {t("educationPage.prepCourseNoteDesc")}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-4">{t("educationPage.prepCourseLevelTitle")}</h4>
                    <div className="space-y-3 text-gray-700 leading-relaxed text-sm">
                      <p>{t("educationPage.prepCourseLevelDesc1")}</p>
                      <p>{t("educationPage.prepCourseLevelDesc2")}</p>
                      <p>{t("educationPage.prepCourseLevelDesc3")}</p>
                      <p>{t("educationPage.prepCourseLevelDesc4")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 進学高度日本語 */}
            <div className="mb-12">
              <h3 className="text-lg font-bold mb-6 text-gray-900">
                {t("educationPage.advancedCourseTitle")}
              </h3>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden rounded-lg">
                    <Image
                      src="/images/original_from_customer/コース紹介_2.jpg"
                      alt="進学高度日本語コース"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {t("educationPage.advancedCourseDesc")}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-4">{t("educationPage.advancedCourseLevelTitle")}</h4>
                  <div className="space-y-3 text-gray-700 leading-relaxed text-sm">
                    <p>{t("educationPage.advancedCourseLevelDesc1")}</p>
                    <p>{t("educationPage.advancedCourseLevelDesc2")}</p>
                    <p>{t("educationPage.advancedCourseLevelDesc3")}</p>
                    <p>{t("educationPage.advancedCourseLevelDesc4")}</p>
                  </div>
                </div>
              </div>

              {/* レベル別到達目標 */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4">{t("educationPage.cefrLevelTitle")}</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-3 text-left font-bold">{t("educationPage.cefrHeader")}</th>
                        <th className="border border-gray-300 p-3 text-left font-bold">{t("educationPage.kcpHeader")}</th>
                        <th className="border border-gray-300 p-3 text-left font-bold">{t("educationPage.goalHeader")}</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr>
                        <td className="border border-gray-300 p-3">🟢A1</td>
                        <td className="border border-gray-300 p-3">Lv.1</td>
                        <td className="border border-gray-300 p-3">{t("educationPage.cefrA1Goal")}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">🟢A2</td>
                        <td className="border border-gray-300 p-3">Lv.2</td>
                        <td className="border border-gray-300 p-3">{t("educationPage.cefrA2Goal")}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">🟡B1</td>
                        <td className="border border-gray-300 p-3">Lv.3<br />Lv.4</td>
                        <td className="border border-gray-300 p-3">
                          <p>{t("educationPage.cefrB1Goal1")}</p><p className="mt-2">{t("educationPage.cefrB1Goal2")}</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">🟠B2</td>
                        <td className="border border-gray-300 p-3">Lv.5<br />Lv.6</td>
                        <td className="border border-gray-300 p-3">
                          <p>{t("educationPage.cefrB2Goal1")}</p><p className="mt-2">{t("educationPage.cefrB2Goal2")}</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">🟣B2</td>
                        <td className="border border-gray-300 p-3">Lv.7<br />Lv.8</td>
                        <td className="border border-gray-300 p-3">
                          <p>{t("educationPage.cefrB2AdvGoal1")}</p><p className="mt-2">{t("educationPage.cefrB2AdvGoal2")}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-16" />

          {/* 授業内容 */}
          <div className="mb-16" id="course2">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">{t("educationPage.classContentTitle")}</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="space-y-2 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold text-gray-900">◆ {t(`educationPage.classContent.${i}.title`)}</h4>
                  <p className="text-gray-700 leading-relaxed text-sm">{t(`educationPage.classContent.${i}.content`)}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {[3, 4, 5].map((i) => (
                <div key={i} className="space-y-2 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold text-gray-900">◆ {t(`educationPage.classContent.${i}.title`)}</h4>
                  <p className="text-gray-700 leading-relaxed text-sm">{t(`educationPage.classContent.${i}.content`)}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {[6, 7, 8].map((i) => (
                <div key={i} className="space-y-2 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold text-gray-900">◆ {t(`educationPage.classContent.${i}.title`)}</h4>
                  <p className="text-gray-700 leading-relaxed text-sm">{t(`educationPage.classContent.${i}.content`)}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[9, 10, 11].map((i) => (
                <div key={i} className="space-y-2 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold text-gray-900">◆ {t(`educationPage.classContent.${i}.title`)}</h4>
                  <p className="text-gray-700 leading-relaxed text-sm">{t(`educationPage.classContent.${i}.content`)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-16" />

          {/* 特別クラス・進路サポート */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">{t("educationPage.specialClassTitle")}</h2>

            <p className="text-gray-700 mb-8 font-semibold">{t("educationPage.specialClassIntro")}</p>

            <div className="space-y-8">
              {/* 日本語強化クラス */}
              <div>
                <pre className="mb-2"><span className="font-bold">{t("educationPage.jpReinforcementTitle")}</span>{t("educationPage.jpReinforcementLevel")}</pre>
                <p className="text-gray-700 leading-relaxed">
                  {t("educationPage.jpReinforcementDesc")}
                </p>
              </div>

              {/* 日本語プラス */}
              <div>
                <pre className="mb-4"><span className="font-bold">{t("educationPage.jpPlusTitle")}</span>{t("educationPage.jpPlusLevel")}</pre>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">{t("educationPage.timetableTitle")}</h2>

            <p className="text-gray-700 mb-4 font-semibold">{t("educationPage.timetableNote")}</p>

            <p className="text-sm text-gray-600 mb-6 flex flex-wrap gap-4">
              <span><span className="inline-block w-4 h-4 bg-[#0085b2] mr-1 align-middle"></span> {t("educationPage.timetableLegend.kanji")}</span>
              <span><span className="inline-block w-4 h-4 bg-yellow-400 mr-1 align-middle"></span> {t("educationPage.timetableLegend.listening")}</span>
              <span><span className="inline-block w-4 h-4 bg-green-400 mr-1 align-middle"></span> {t("educationPage.timetableLegend.comprehensive")}</span>
              <span><span className="inline-block w-4 h-4 bg-purple-400 mr-1 align-middle"></span> {t("educationPage.timetableLegend.reading")}</span>
              <span><span className="inline-block w-4 h-4 bg-red-400 mr-1 align-middle"></span> {t("educationPage.timetableLegend.essay")}</span>
              <span><span className="inline-block w-4 h-4 bg-orange-400 mr-1 align-middle"></span> {t("educationPage.timetableLegend.prepElective")}</span>
            </p>

            {/* 初級クラス */}
            <div className="mb-8">
              <div className="overflow-x-auto">
                <table className="w-full table-fixed border-collapse text-sm">
                  <colgroup>
                    <col className="w-24" />
                    <col className="flex-1" />
                    <col className="flex-1" />
                    <col className="flex-1" />
                    <col className="flex-1" />
                    <col className="flex-1" />
                  </colgroup>
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 font-bold text-left h-12">{t("educationPage.beginnerClass")}</th>
                      <th className="border border-gray-300 p-3 font-bold text-center h-12">{t("educationPage.dayMon")}</th>
                      <th className="border border-gray-300 p-3 font-bold text-center h-12">{t("educationPage.dayTue")}</th>
                      <th className="border border-gray-300 p-3 font-bold text-center h-12">{t("educationPage.dayWed")}</th>
                      <th className="border border-gray-300 p-3 font-bold text-center h-12">{t("educationPage.dayThu")}</th>
                      <th className="border border-gray-300 p-3 font-bold text-center h-12">{t("educationPage.dayFri")}</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold text-left h-12">{t("educationPage.beginnerTimeSlots.0")}</td>
                      <td className="border border-gray-300 p-3 bg-[#0085b2]/10 text-center h-12">{t("educationPage.timetableBeginnerCells.0.0")}</td>
                      <td className="border border-gray-300 p-3 bg-yellow-100 text-center h-12">{t("educationPage.timetableBeginnerCells.0.1")}</td>
                      <td className="border border-gray-300 p-3 bg-[#0085b2]/10 text-center h-12">{t("educationPage.timetableBeginnerCells.0.2")}</td>
                      <td className="border border-gray-300 p-3 bg-yellow-100 text-center h-12">{t("educationPage.timetableBeginnerCells.0.3")}</td>
                      <td className="border border-gray-300 p-3 bg-[#0085b2]/10 text-center h-12">{t("educationPage.timetableBeginnerCells.0.4")}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold text-left h-12">{t("educationPage.beginnerTimeSlots.1")}</td>
                      <td className="border border-gray-300 p-3 bg-green-100 text-center h-12">{t("educationPage.timetableBeginnerCells.1.0")}</td>
                      <td className="border border-gray-300 p-3 bg-green-100 text-center h-12">{t("educationPage.timetableBeginnerCells.1.1")}</td>
                      <td className="border border-gray-300 p-3 bg-green-100 text-center h-12">{t("educationPage.timetableBeginnerCells.1.2")}</td>
                      <td className="border border-gray-300 p-3 bg-green-100 text-center h-12">{t("educationPage.timetableBeginnerCells.1.3")}</td>
                      <td className="border border-gray-300 p-3 bg-green-100 text-center h-12">{t("educationPage.timetableBeginnerCells.1.4")}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold text-left h-12">{t("educationPage.beginnerTimeSlots.2")}</td>
                      <td className="border border-gray-300 p-3 bg-green-100 text-center h-12">{t("educationPage.timetableBeginnerCells.2.0")}</td>
                      <td className="border border-gray-300 p-3 bg-green-100 text-center h-12">{t("educationPage.timetableBeginnerCells.2.1")}</td>
                      <td className="border border-gray-300 p-3 bg-green-100 text-center h-12">{t("educationPage.timetableBeginnerCells.2.2")}</td>
                      <td className="border border-gray-300 p-3 bg-green-100 text-center h-12">{t("educationPage.timetableBeginnerCells.2.3")}</td>
                      <td className="border border-gray-300 p-3 bg-green-100 text-center h-12">{t("educationPage.timetableBeginnerCells.2.4")}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold text-left h-12">{t("educationPage.beginnerTimeSlots.3")}</td>
                      <td className="border border-gray-300 p-3 bg-green-100 text-center h-12">{t("educationPage.timetableBeginnerCells.3.0")}</td>
                      <td className="border border-gray-300 p-3 bg-green-100 text-center h-12">{t("educationPage.timetableBeginnerCells.3.1")}</td>
                      <td className="border border-gray-300 p-3 bg-green-100 text-center h-12">{t("educationPage.timetableBeginnerCells.3.2")}</td>
                      <td className="border border-gray-300 p-3 bg-green-100 text-center h-12">{t("educationPage.timetableBeginnerCells.3.3")}</td>
                      <td className="border border-gray-300 p-3 bg-orange-100 text-center h-12">{t("educationPage.timetableBeginnerCells.3.4")}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold text-left h-12">{t("educationPage.beginnerTimeSlots.4")}</td>
                      <td className="border border-gray-300 p-3 bg-orange-100 text-center h-12">{t("educationPage.timetableBeginnerCells.4.0")}</td>
                      <td className="border border-gray-300 p-3 text-center h-12">{t("educationPage.timetableBeginnerCells.4.1")}</td>
                      <td className="border border-gray-300 p-3 bg-orange-100 text-center h-12">{t("educationPage.timetableBeginnerCells.4.2")}</td>
                      <td className="border border-gray-300 p-3 text-center h-12">{t("educationPage.timetableBeginnerCells.4.3")}</td>
                      <td className="border border-gray-300 p-3 bg-orange-100 text-center h-12">{t("educationPage.timetableBeginnerCells.4.4")}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 中級クラス */}
            <div className="mb-8">
              <div className="overflow-x-auto">
                <table className="w-full table-fixed border-collapse text-sm">
                  <colgroup>
                    <col className="w-24" />
                    <col className="flex-1" />
                    <col className="flex-1" />
                    <col className="flex-1" />
                    <col className="flex-1" />
                    <col className="flex-1" />
                  </colgroup>
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 font-bold text-left h-12">{t("educationPage.intermediateClass")}</th>
                      <th className="border border-gray-300 p-3 font-bold text-center h-12">{t("educationPage.dayMon")}</th>
                      <th className="border border-gray-300 p-3 font-bold text-center h-12">{t("educationPage.dayTue")}</th>
                      <th className="border border-gray-300 p-3 font-bold text-center h-12">{t("educationPage.dayWed")}</th>
                      <th className="border border-gray-300 p-3 font-bold text-center h-12">{t("educationPage.dayThu")}</th>
                      <th className="border border-gray-300 p-3 font-bold text-center h-12">{t("educationPage.dayFri")}</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold text-left h-12">{t("educationPage.intermediateTimeSlots.0")}</td>
                      <td className="border border-gray-300 p-3 bg-[#0085b2]/10 text-center h-12">{t("educationPage.timetableIntermediateCells.0.0")}</td>
                      <td className="border border-gray-300 p-3 bg-yellow-100 text-center h-12">{t("educationPage.timetableIntermediateCells.0.1")}</td>
                      <td className="border border-gray-300 p-3 bg-[#0085b2]/10 text-center h-12">{t("educationPage.timetableIntermediateCells.0.2")}</td>
                      <td className="border border-gray-300 p-3 bg-[#0085b2]/10 text-center h-12">{t("educationPage.timetableIntermediateCells.0.3")}</td>
                      <td className="border border-gray-300 p-3 bg-[#0085b2]/10 text-center h-12">{t("educationPage.timetableIntermediateCells.0.4")}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold text-left h-12">{t("educationPage.intermediateTimeSlots.1")}</td>
                      <td className="border border-gray-300 p-3 bg-yellow-100 text-center h-12">{t("educationPage.timetableIntermediateCells.1.0")}</td>
                      <td className="border border-gray-300 p-3 bg-green-100 text-center h-12">{t("educationPage.timetableIntermediateCells.1.1")}</td>
                      <td className="border border-gray-300 p-3 bg-purple-100 text-center h-12">{t("educationPage.timetableIntermediateCells.1.2")}</td>
                      <td className="border border-gray-300 p-3 bg-green-100 text-center h-12">{t("educationPage.timetableIntermediateCells.1.3")}</td>
                      <td className="border border-gray-300 p-3 bg-yellow-100 text-center h-12">{t("educationPage.timetableIntermediateCells.1.4")}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold text-left h-12">{t("educationPage.intermediateTimeSlots.2")}</td>
                      <td className="border border-gray-300 p-3 bg-red-100 text-center h-12">{t("educationPage.timetableIntermediateCells.2.0")}</td>
                      <td className="border border-gray-300 p-3 bg-green-100 text-center h-12">{t("educationPage.timetableIntermediateCells.2.1")}</td>
                      <td className="border border-gray-300 p-3 bg-green-100 text-center h-12">{t("educationPage.timetableIntermediateCells.2.2")}</td>
                      <td className="border border-gray-300 p-3 bg-green-100 text-center h-12">{t("educationPage.timetableIntermediateCells.2.3")}</td>
                      <td className="border border-gray-300 p-3 bg-purple-100 text-center h-12">{t("educationPage.timetableIntermediateCells.2.4")}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold text-left h-12">{t("educationPage.intermediateTimeSlots.3")}</td>
                      <td className="border border-gray-300 p-3 bg-red-100 text-center h-12">{t("educationPage.timetableIntermediateCells.3.0")}</td>
                      <td className="border border-gray-300 p-3 bg-orange-100 text-center h-12">{t("educationPage.timetableIntermediateCells.3.1")}</td>
                      <td className="border border-gray-300 p-3 bg-orange-100 text-center h-12">{t("educationPage.timetableIntermediateCells.3.2")}</td>
                      <td className="border border-gray-300 p-3 bg-sky-100 text-center h-12">{t("educationPage.timetableIntermediateCells.3.3")}</td>
                      <td className="border border-gray-300 p-3 bg-purple-100 text-center h-12">{t("educationPage.timetableIntermediateCells.3.4")}</td>
                    </tr>
                  </tbody>
                </table>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">{t("educationPage.admissionScheduleTitle")}</h2>

            {/* 1年目 */}
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-4 text-gray-800">{t("educationPage.year1Title")}</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm bg-white">
                  <thead>
                    <tr className="bg-[#0085b2]/10">
                      <th className="border border-gray-300 p-3 font-bold text-left">{t("educationPage.scheduleCategory")}</th>
                      <th className="border border-gray-300 p-3 font-bold text-left">{t("educationPage.scheduleUni")}</th>
                      <th className="border border-gray-300 p-3 font-bold text-left">{t("educationPage.scheduleGrad")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">{t("educationPage.year1Period")}</td>
                      <td className="border border-gray-300 p-3 text-gray-700 whitespace-pre-line">
                        {t("educationPage.year1Uni")}
                      </td>
                      <td className="border border-gray-300 p-3 text-gray-700 whitespace-pre-line">
                        {t("educationPage.year1Grad")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2年目 前半 */}
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-4 text-gray-800">{t("educationPage.year2FirstTitle")}</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm bg-white">
                  <thead>
                    <tr className="bg-green-100">
                      <th className="border border-gray-300 p-3 font-bold text-left">{t("educationPage.scheduleCategory")}</th>
                      <th className="border border-gray-300 p-3 font-bold text-left">{t("educationPage.scheduleUni")}</th>
                      <th className="border border-gray-300 p-3 font-bold text-left">{t("educationPage.scheduleGrad")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">{t("educationPage.year2FirstPeriod")}</td>
                      <td className="border border-gray-300 p-3 text-gray-700 whitespace-pre-line">
                        {t("educationPage.year2FirstUni")}
                      </td>
                      <td className="border border-gray-300 p-3 text-gray-700 whitespace-pre-line">
                        {t("educationPage.year2FirstGrad")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2年目 後半 */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">{t("educationPage.year2SecondTitle")}</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm bg-white">
                  <thead>
                    <tr className="bg-purple-100">
                      <th className="border border-gray-300 p-3 font-bold text-left">{t("educationPage.scheduleCategory")}</th>
                      <th className="border border-gray-300 p-3 font-bold text-left">{t("educationPage.scheduleUni")}</th>
                      <th className="border border-gray-300 p-3 font-bold text-left">{t("educationPage.scheduleGrad")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">{t("educationPage.year2SecondPeriod")}</td>
                      <td className="border border-gray-300 p-3 text-gray-700 whitespace-pre-line">
                        {t("educationPage.year2SecondUni")}
                      </td>
                      <td className="border border-gray-300 p-3 text-gray-700 whitespace-pre-line">
                        {t("educationPage.year2SecondGrad")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-16" />
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">{t("educationPage.recommendationTitle")}</h2>

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
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">{t("educationPage.recentResultsTitle")}</h2>

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
