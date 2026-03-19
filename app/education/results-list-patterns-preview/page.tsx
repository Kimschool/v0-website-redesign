"use client"

import Link from "next/link"
import { useState } from "react"

const preview = {
  "2024": {
    大学: {
      国公立: ["東北大学", "東京農工大学", "茨城大学", "山口大学"],
      私立: ["立教大学", "明治大学", "中央大学", "法政大学", "青山学院大学", "立命館大学"],
      音楽美術: ["武蔵野音楽大学", "多摩美術大学", "日本大学", "女子美術大学"],
    },
    大学院: {
      国公立: ["東京大学", "東京外国語大学", "東京藝術大学", "東京海洋大学"],
      私立: ["早稲田大学", "慶応義塾大学", "上智大学", "明治大学"],
      音楽美術: ["武蔵野美術大学", "多摩美術大学", "洗足学園音楽大学"],
    },
  },
  "2023": {
    大学: {
      国公立: ["東京工業大学", "一橋大学", "京都大学", "九州大学"],
      私立: ["早稲田大学", "立教大学", "明治大学", "法政大学", "東洋大学"],
      音楽美術: ["武蔵野美術大学", "多摩美術大学", "女子美術大学"],
    },
    大学院: {
      国公立: ["東京大学", "筑波大学", "広島大学"],
      私立: ["慶応義塾大学", "上智大学", "立命館大学"],
      音楽美術: ["東京造形大学", "京都芸術大学"],
    },
  },
  "2022": {
    大学: {
      国公立: ["京都大学", "大阪大学", "東京工業大学"],
      私立: ["早稲田大学", "上智大学", "東京理科大学", "同志社大学"],
      音楽美術: ["多摩美術大学", "武蔵野美術大学", "京都芸術大学"],
    },
    大学院: {
      国公立: ["東京大学", "名古屋大学", "北海道大学"],
      私立: ["慶應義塾大学", "明治大学", "法政大学"],
      音楽美術: ["武蔵野美術大学", "多摩美術大学"],
    },
  },
}

function PageHeader() {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">進学実績一覧 大学リスト 패턴 3종 (NEW)</h1>
        <p className="text-sm text-gray-600 mt-1">연도별 표시 흐름에 맞춘 3개 패턴입니다. 번호를 주시면 `results` 페이지에 적용할게요.</p>
      </div>
      <Link
        href="/education/results"
        className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
      >
        결과 페이지로 돌아가기
      </Link>
    </div>
  )
}

function PatternTitle({ index, title, desc }: { index: string; title: string; desc: string }) {
  return (
    <div className="mb-4">
      <p className="text-xs font-semibold tracking-wide text-[#0085b2]">PATTERN {index}</p>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-1">{title}</h2>
      <p className="text-sm text-gray-600 mt-1">{desc}</p>
    </div>
  )
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700">
      <span className="text-gray-500">{label}</span> <span className="text-gray-900">{value}</span>
    </div>
  )
}

function UniItem({ name }: { name: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 hover:bg-gray-50 transition">
      <span className="font-medium">{name}</span>
    </div>
  )
}

function getYearStats(year: (typeof preview)[keyof typeof preview]) {
  const uniTotal = year.大学.国公立.length + year.大学.私立.length + year.大学.音楽美術.length
  const gradTotal = year.大学院.国公立.length + year.大学院.私立.length + year.大学院.音楽美術.length
  return {
    uniTotal,
    gradTotal,
    total: uniTotal + gradTotal,
  }
}

function YearHeaderBar({ yearKey }: { yearKey: keyof typeof preview }) {
  const stats = getYearStats(preview[yearKey])
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-baseline gap-2">
        <p className="text-lg md:text-xl font-bold text-gray-900">{yearKey}年度</p>
        <p className="text-sm text-gray-500">進学実績</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <StatPill label="TOTAL" value={`${stats.total}校`} />
        <StatPill label="大学" value={`${stats.uniTotal}校`} />
        <StatPill label="大学院" value={`${stats.gradTotal}校`} />
      </div>
    </div>
  )
}

function Pattern1() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm">
      <PatternTitle
        index="01"
        title="연도 카드(요약 바) + 섹션 카드"
        desc="연도 단위로 ‘요약 → 상세’를 자연스럽게 내려읽는 패턴. 지금 구조(2024 기본 오픈)와 가장 궁합이 좋음"
      />
      <div className="space-y-4">
        {(Object.keys(preview) as (keyof typeof preview)[]).map((yearKey) => {
          const year = preview[yearKey]
          return (
            <div key={yearKey} className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-4 bg-gradient-to-r from-[#0085b2] to-[#006794] text-white">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-lg font-bold">{yearKey}年度 進学実績</p>
                  <span className="text-sm font-semibold text-white/90">{getYearStats(year).total}校</span>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <YearHeaderBar yearKey={yearKey} />
                <div className="grid lg:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-sm font-bold text-gray-900 mb-3">大学</p>
                    <div className="space-y-3">
                      {[
                        { label: "国公立", items: year.大学.国公立 },
                        { label: "私立", items: year.大学.私立 },
                        { label: "音楽美術", items: year.大学.音楽美術 },
                      ].map((g) => (
                        <div key={g.label}>
                          <div className="flex items-center justify-between gap-3 mb-2">
                            <p className="text-sm font-semibold text-gray-800">{g.label}</p>
                            <span className="text-xs font-semibold text-gray-500">{g.items.length}校</span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {g.items.map((u) => (
                              <UniItem key={u} name={u} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-sm font-bold text-gray-900 mb-3">大学院</p>
                    <div className="space-y-3">
                      {[
                        { label: "国公立", items: year.大学院.国公立 },
                        { label: "私立", items: year.大学院.私立 },
                        { label: "音楽美術", items: year.大学院.音楽美術 },
                      ].map((g) => (
                        <div key={g.label}>
                          <div className="flex items-center justify-between gap-3 mb-2">
                            <p className="text-sm font-semibold text-gray-800">{g.label}</p>
                            <span className="text-xs font-semibold text-gray-500">{g.items.length}校</span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {g.items.map((u) => (
                              <UniItem key={u} name={u} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function Pattern2() {
  const yearKeys = Object.keys(preview) as (keyof typeof preview)[]
  const [activeYear, setActiveYear] = useState<keyof typeof preview>("2024")
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm">
      <PatternTitle
        index="02"
        title="연도 탭 + 2분할 패널"
        desc="상단에서 연도를 확실히 전환하고, 본문은 ‘대학/대학원’ 두 패널로 정돈. 연도별 비교가 직관적"
      />
      <div className="flex flex-wrap gap-2 mb-4">
        {yearKeys.map((y) => (
          <button
            key={y}
            type="button"
            onClick={() => setActiveYear(y)}
            className={[
              "rounded-full px-4 py-2 text-sm font-semibold border transition",
              activeYear === y
                ? "bg-[#0085b2] text-white border-[#0085b2]"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50",
            ].join(" ")}
          >
            {y}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="px-5 py-4 bg-gradient-to-r from-[#0085b2] to-[#006794] text-white">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-base md:text-lg font-bold">{activeYear}年度 進学実績</p>
            <span className="text-sm font-semibold text-white/90">{getYearStats(preview[activeYear]).total}校</span>
          </div>
        </div>
        <div className="p-5">
          <div className="grid lg:grid-cols-2 gap-4">
            {(["大学", "大学院"] as const).map((scope) => {
              const year = preview[activeYear]
              const groups =
                scope === "大学"
                  ? [
                      { label: "国公立", items: year.大学.国公立 },
                      { label: "私立", items: year.大学.私立 },
                      { label: "音楽美術", items: year.大学.音楽美術 },
                    ]
                  : [
                      { label: "国公立", items: year.大学院.国公立 },
                      { label: "私立", items: year.大学院.私立 },
                      { label: "音楽美術", items: year.大学院.音楽美術 },
                    ]

              return (
                <div key={scope} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <p className="text-sm font-bold text-gray-900">{scope}</p>
                    <span className="text-xs font-semibold text-gray-500">
                      {groups.reduce((acc, g) => acc + g.items.length, 0)}校
                    </span>
                  </div>
                  <div className="space-y-3">
                    {groups.map((g) => (
                      <div key={g.label}>
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <p className="text-sm font-semibold text-gray-800">{g.label}</p>
                          <span className="text-xs font-semibold text-gray-500">{g.items.length}校</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {g.items.map((u) => (
                            <UniItem key={u} name={u} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function Pattern3() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm">
      <PatternTitle
        index="03"
        title="연도 타임라인(스택) + 접힘 상세"
        desc="연도 흐름을 시각적으로 ‘쌓아’ 보여주고, 필요할 때만 상세를 펼치는 방식. 페이지가 길어도 정돈감 유지"
      />
      <div className="space-y-3">
        {(Object.keys(preview) as (keyof typeof preview)[])
          .slice()
          .sort((a, b) => Number(b) - Number(a))
          .map((yearKey, idx, all) => {
            const year = preview[yearKey]
            const stats = getYearStats(year)
            return (
              <div key={yearKey} className="relative">
                {idx < all.length - 1 ? (
                  <div className="absolute left-6 top-14 bottom-0 w-px bg-gray-200" />
                ) : null}
                <details className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden group">
                  <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-2xl border border-gray-200 bg-gray-50 flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-900">{String(yearKey).slice(2)}</span>
                      </div>
                      <div>
                        <p className="text-base font-bold text-gray-900">{yearKey}年度</p>
                        <p className="text-xs text-gray-500 mt-1">
                          TOTAL {stats.total}校 · 大学 {stats.uniTotal}校 · 大学院 {stats.gradTotal}校
                        </p>
                      </div>
                    </div>
                    <span className="text-gray-500 transition-transform duration-300 group-open:rotate-180">▼</span>
                  </summary>
                  <div className="px-5 pb-5">
                    <div className="grid lg:grid-cols-2 gap-4">
                      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                        <p className="text-sm font-bold text-gray-900 mb-3">大学</p>
                        <div className="space-y-3">
                          {[
                            { label: "国公立", items: year.大学.国公立 },
                            { label: "私立", items: year.大学.私立 },
                            { label: "音楽美術", items: year.大学.音楽美術 },
                          ].map((g) => (
                            <div key={g.label}>
                              <div className="flex items-center justify-between gap-3 mb-2">
                                <p className="text-sm font-semibold text-gray-800">{g.label}</p>
                                <span className="text-xs font-semibold text-gray-500">{g.items.length}校</span>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {g.items.map((u) => (
                                  <UniItem key={u} name={u} />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                        <p className="text-sm font-bold text-gray-900 mb-3">大学院</p>
                        <div className="space-y-3">
                          {[
                            { label: "国公立", items: year.大学院.国公立 },
                            { label: "私立", items: year.大学院.私立 },
                            { label: "音楽美術", items: year.大学院.音楽美術 },
                          ].map((g) => (
                            <div key={g.label}>
                              <div className="flex items-center justify-between gap-3 mb-2">
                                <p className="text-sm font-semibold text-gray-800">{g.label}</p>
                                <span className="text-xs font-semibold text-gray-500">{g.items.length}校</span>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {g.items.map((u) => (
                                  <UniItem key={u} name={u} />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </details>
              </div>
            )
          })}
      </div>
    </section>
  )
}

export default function ResultsListPatternsPreviewPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 md:px-8 lg:px-16 py-10">
      <div className="max-w-6xl mx-auto">
        <PageHeader />
        <div className="space-y-5">
          <Pattern1 />
          <Pattern2 />
          <Pattern3 />
        </div>
      </div>
    </main>
  )
}

