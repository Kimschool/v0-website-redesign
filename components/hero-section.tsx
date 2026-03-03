"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Clock } from "lucide-react"

export function HeroSection() {
  const fullText = "ともにまなび ともに生きる"
  const [typedText, setTypedText] = useState("")
  const newsItems = [
    { date: "2026.01.13", text: "2026年長期休みのスケジュール" },
    { date: "2025.12.20", text: "冬季集中コース募集開始のお知らせ" },
    { date: "2025.11.04", text: "認定日本語教育機関に認定されました" },
  ]
  const [newsIndex, setNewsIndex] = useState(0)

  useEffect(() => {
    let index = 0

    const timer = window.setInterval(() => {
      index += 1
      setTypedText(fullText.slice(0, index))

      if (index >= fullText.length) {
        window.clearInterval(timer)
      }
    }, 100)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % newsItems.length)
    }, 3500)

    return () => window.clearInterval(timer)
  }, [newsItems.length])

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0" aria-label="Hero background image">
        <Image src="/images/main.png" alt="Hero background" fill className="object-cover" priority />
      </div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a2332]/30 via-transparent to-[#1a2332]/40" />
      <div className="absolute inset-0 bg-[#1a2332]/15" />

      {/* Content */}
      <div className="relative z-10 text-center px-8">
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-[#faf9f7] tracking-[0.15em] leading-tight text-balance drop-shadow-2xl">
          {typedText}
          <span className="animate-pulse">|</span>
        </h1>
        <div className="mt-12 elegant-divider w-32 mx-auto" />
        <p className="mt-8 text-lg md:text-xl font-light text-[#faf9f7]/90 tracking-widest animate-fade-in animation-delay-500">
          KCP地球市民日本語学校
        </p>
      </div>

      {/* News ticker at bottom */}
      <div className="absolute bottom-8 left-1/2 z-20 w-[min(85%,860px)] -translate-x-1/2">
        <div className="rounded-2xl bg-card/98 shadow-2xl shadow-primary/10 backdrop-blur-md border border-border/50">
          <div className="px-8 py-5 flex items-center gap-6">
            <div className="flex items-center gap-3 text-muted-foreground shrink-0">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <Clock className="h-4 w-4 text-accent" />
              </div>
              <div className="h-6 overflow-hidden">
                <div
                  className="transition-transform duration-700 ease-out"
                  style={{ transform: `translateY(-${newsIndex * 24}px)` }}
                >
                  {newsItems.map((item) => (
                    <p key={`date-${item.date}-${item.text}`} className="h-6 text-sm leading-6 tracking-wider font-medium">
                      {item.date}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="h-6 overflow-hidden min-w-0 flex-1">
              <div
                className="transition-transform duration-700 ease-out"
                style={{ transform: `translateY(-${newsIndex * 24}px)` }}
              >
                {newsItems.map((item) => (
                  <p
                    key={`text-${item.date}-${item.text}`}
                    className="h-6 text-sm md:text-base font-light text-foreground leading-6 truncate tracking-wide"
                  >
                    {item.text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
