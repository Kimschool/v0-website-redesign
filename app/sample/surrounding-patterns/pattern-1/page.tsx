"use client"

import { useTranslation } from "react-i18next"
import { getSurroundingSlides } from "@/lib/surrounding-environment"
import { SurroundingShowcaseHero } from "@/components/surrounding-environment-showcases"
import { SampleSurroundingPatternNav } from "@/components/sample-surrounding-pattern-nav"

export default function SampleSurroundingPattern1Page() {
  const { t } = useTranslation()
  const slides = getSurroundingSlides(t)

  return (
    <main className="min-h-screen bg-[#f4f6f8] py-10 px-4 md:py-14">
      <article className="mx-auto max-w-6xl">
        <p className="text-sm text-[#0085b2]">/sample/surrounding-patterns/pattern-1</p>
        <h1 className="mt-1 font-serif text-2xl font-bold text-gray-900 md:text-3xl">
          周辺環境 — パターン1（大判ヒーロー）
        </h1>
        <SampleSurroundingPatternNav current={1} />
        <SurroundingShowcaseHero slides={slides} title={t("schoolLifePage.surroundingTitle")} />
      </article>
    </main>
  )
}
