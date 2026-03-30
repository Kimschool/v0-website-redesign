"use client"

import Link from "next/link"
import { useTranslation } from "react-i18next"
import { ArrowLeft } from "lucide-react"

type PrivacySection = { title: string; text: string }

type PrivacyPageData = {
  title: string
  lastUpdated: string
  lead: string
  sections: PrivacySection[]
}

export function PrivacyPolicySection() {
  const { t } = useTranslation()
  const data = t("privacyPage", { returnObjects: true }) as PrivacyPageData

  if (!data?.sections?.length) {
    return null
  }

  return (
    <section className="min-h-screen bg-background pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {t("privacyPage.backHome")}
        </Link>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          {data.title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{data.lastUpdated}</p>
        <p className="mt-8 text-base text-foreground leading-relaxed">{data.lead}</p>

        <div className="mt-12 space-y-10">
          {data.sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-lg font-bold text-foreground border-b border-border/60 pb-2 mb-4">
                {section.title}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                {section.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
