"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Check } from "lucide-react"
import { useTranslation } from "react-i18next"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PdfCanvasViewerLazy } from "@/components/pdf-canvas-viewer-lazy"

const GAKUSOKU_PDF_URL = "/documents/gakusoku.pdf"

const SELF_EVAL_PDF_HREFS = [
  "https://weavus-group.com/kcp/wp-content/uploads/2025/11/evaluation20251029.pdf",
  "https://weavus-group.com/kcp/wp-content/uploads/2025/11/evaluation20241028.pdf",
  "https://weavus-group.com/kcp/wp-content/uploads/2025/11/kateishuryo-japanese20250526.pdf",
] as const

type InfoItem = { label: string; value: string; href?: string }

export function BasicInfoSection() {
  const { t } = useTranslation()

  const infoItems = t("basicInfoPage.infoItems", { returnObjects: true }) as InfoItem[]
  const selfEvalLabels = t("basicInfoPage.selfEvalLinks", { returnObjects: true }) as string[]

  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [gakusokuOpen, setGakusokuOpen] = useState(false)

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

  const renderValue = (item: InfoItem) => {
    if (item.href) {
      return (
        <a
          href={item.href}
          className="text-[#0E4A94] hover:opacity-70 hover:underline transition-opacity"
          {...(item.href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {item.value}
        </a>
      )
    }
    return <span className="text-gray-800">{item.value}</span>
  }

  return (
    <section ref={sectionRef} className="bg-white">
      <div className="relative h-[350px] md:h-[400px] w-full overflow-hidden">
        <Image
          src={`/images/original_from_customer/${encodeURIComponent("トップ背景")}/${encodeURIComponent("01_KCPとは（拡大して周りの建物があまり見えないように）")}.jpg`}
          alt={t("basicInfoPage.bannerTitle")}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 flex items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              {t("basicInfoPage.bannerTitle")}
            </h1>
            <div className="w-20 h-1 bg-white/80 mx-auto mt-6 rounded-full" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-4xl py-12 md:py-16">
        <p
          className={`text-center text-gray-600 mb-12 md:mb-16 text-base md:text-lg ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          {t("basicInfoPage.subtitle")}
        </p>

        {/* 基本情報 */}
        <div className={`mb-14 md:mb-20 ${isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0085b2] mb-8 md:mb-10">
            {t("basicInfoPage.basicInfoTitle")}
          </h2>

          <div className="overflow-x-auto rounded-sm border border-gray-200">
            <table className="w-full border-collapse text-[15px] leading-relaxed border-t-2 border-t-gray-800 border-b border-b-gray-200">
              <tbody>
                {infoItems.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200 last:border-b-0">
                    <th
                      scope="row"
                      className="w-[32%] min-w-[7.5rem] align-middle bg-[#f8f9fa] px-4 py-4 md:px-5 text-left font-semibold text-gray-900 whitespace-nowrap border-r border-gray-200"
                    >
                      {item.label}
                    </th>
                    <td className="align-middle px-4 py-4 md:px-5 text-gray-800">{renderValue(item)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <hr className="border-gray-200 mb-14 md:mb-20" />

        {/* 学則 */}
        <div className={`mb-14 md:mb-20 ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0085b2] mb-6 md:mb-8">
            {t("basicInfoPage.regulationsTitle")}
          </h2>
          <ul className="space-y-3">
            <li>
              <Dialog open={gakusokuOpen} onOpenChange={setGakusokuOpen}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-[#0085b2] hover:text-[#006794] hover:underline text-left"
                  >
                    <Check className="h-5 w-5 shrink-0 text-[#0085b2]" aria-hidden />
                    <span>{t("basicInfoPage.regulationsLinkLabel")}</span>
                  </button>
                </DialogTrigger>
                <DialogContent
                  className="flex max-h-[min(90vh,900px)] w-[calc(100%-1.5rem)] max-w-4xl flex-col gap-0 overflow-hidden p-0 sm:max-w-4xl"
                  showCloseButton
                >
                  <DialogHeader className="shrink-0 border-b border-border px-5 py-4 pr-12 text-left">
                    <DialogTitle className="text-base font-semibold text-foreground">
                      {t("basicInfoPage.regulationsLinkLabel")}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4 md:px-4">
                    {gakusokuOpen ? (
                      <PdfCanvasViewerLazy pdfUrl={GAKUSOKU_PDF_URL} />
                    ) : null}
                  </div>
                </DialogContent>
              </Dialog>
            </li>
          </ul>
        </div>

        <hr className="border-gray-200 mb-14 md:mb-20" />

        {/* 自己点検・評価の結果 */}
        <div className={`${isVisible ? "animate-fade-in-up animation-delay-300" : "opacity-0"}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0085b2] mb-6 md:mb-8">
            {t("basicInfoPage.selfEvalTitle")}
          </h2>
          <ul className="space-y-3">
            {selfEvalLabels.map((label, index) => (
              <li key={index}>
                <a
                  href={SELF_EVAL_PDF_HREFS[index]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#0085b2] hover:text-[#006794] hover:underline"
                >
                  <Check className="h-5 w-5 shrink-0 text-[#0085b2]" aria-hidden />
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
