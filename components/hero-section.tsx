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
    }, 120)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % newsItems.length)
    }, 2800)

    return () => window.clearInterval(timer)
  }, [newsItems.length])

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0" aria-label="Hero background image">
        <Image src="/images/main.png" alt="Hero background" fill className="object-cover" priority />
      </div>

      {/* Center overlay */}
      <div className="absolute inset-0 bg-[#1a2332]/20" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-[#faf9f7] tracking-wider leading-tight text-balance drop-shadow-lg">
          {typedText}
        </h1>
        <div className="mt-8 w-20 h-px bg-accent mx-auto" />
      </div>

      {/* News ticker at bottom */}
      <div className="absolute bottom-5 left-1/2 z-20 w-[min(72%,780px)] -translate-x-1/2 rounded-[999px] bg-card/95 shadow-lg backdrop-blur-sm">
        <div className="px-8 py-4 flex items-center gap-5">
          <div className="flex items-center gap-2 text-muted-foreground shrink-0">
            <Clock className="h-4 w-4" />
            <div className="h-6 overflow-hidden">
              <div
                className="transition-transform duration-500 ease-in-out"
                style={{ transform: `translateY(-${newsIndex * 24}px)` }}
              >
                {newsItems.map((item) => (
                  <p key={`date-${item.date}-${item.text}`} className="h-6 text-sm leading-6 tracking-wide">
                    {item.date}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="h-6 overflow-hidden min-w-0 flex-1">
            <div
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: `translateY(-${newsIndex * 24}px)` }}
            >
              {newsItems.map((item) => (
                <p
                  key={`text-${item.date}-${item.text}`}
                  className="h-6 text-sm md:text-base font-light text-foreground leading-6 truncate"
                >
                  {item.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
