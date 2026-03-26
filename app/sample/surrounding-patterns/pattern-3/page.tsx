"use client"

import { useTranslation } from "react-i18next"
import { getSurroundingSlides } from "@/lib/surrounding-environment"
import { SurroundingShowcaseEditorial } from "@/components/surrounding-environment-showcases"
import { SampleSurroundingPatternNav } from "@/components/sample-surrounding-pattern-nav"

export default function SampleSurroundingPattern3Page() {
  const { t } = useTranslation()
  const slides = getSurroundingSlides(t)

  return (
    <main className="min-h-screen bg-[#f4f6f8] py-10 px-4 md:py-14">
      <article className="mx-auto max-w-6xl">
        <p className="text-sm text-[#0085b2]">/sample/surrounding-patterns/pattern-3</p>
        <h1 className="mt-1 font-serif text-2xl font-bold text-gray-900 md:text-3xl">
          周辺環境 — パターン3（エディトリアル）
        </h1>
        <SampleSurroundingPatternNav current={3} />
        <SurroundingShowcaseEditorial slides={slides} title={t("schoolLifePage.surroundingTitle")} className="rounded-2xl" />
      </article>
    </main>
  )
}
