"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useTranslation } from "react-i18next"

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("")
  const [showCursor, setShowCursor] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setDisplayedText("")
    setShowCursor(false)
    setHasStarted(false)
    setIsComplete(false)

    const startTimer = setTimeout(() => {
      setHasStarted(true)
      setShowCursor(true)
    }, delay)

    return () => clearTimeout(startTimer)
  }, [text, delay])

  useEffect(() => {
    if (!hasStarted) return

    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        setIsComplete(true)
        clearInterval(typingInterval)
        setTimeout(() => setShowCursor(false), 1500)
      }
    }, 120)

    return () => clearInterval(typingInterval)
  }, [text, hasStarted])

  return (
    <span className="relative">
      {displayedText}
      {showCursor && (
        <span
          className={`inline-block w-[3px] h-[1em] bg-white ml-1 align-middle ${
            isComplete ? "animate-blink" : "animate-blink-fast"
          }`}
          style={{ verticalAlign: "baseline", marginBottom: "0.1em" }}
        />
      )}
    </span>
  )
}

export function HeroSection() {
  const { t } = useTranslation()

  const title1 = t("hero.title1")
  const title2 = t("hero.title2")

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image src="/images/original_from_customer/TOP基本画像.jpg" alt="Hero background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-20 max-w-5xl mx-auto">
        <h1 className="text-8xl md:text-8xl lg:text-8xl font-bold text-white leading-tight tracking-wide">
          <span className="block">
            <TypewriterText text={title1} delay={500} />
          </span>
          <span className="block mt-2">
            <TypewriterText text={title2} delay={500 + title1.length * 120 + 600} />
          </span>
        </h1>

      </div>

    </section>
  )
}
