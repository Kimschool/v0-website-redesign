"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { ArrowRight, ChevronDown } from "lucide-react"

function TypewriterText({ text, delay = 0, hideCursor = false }: { text: string; delay?: number; hideCursor?: boolean }) {
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
      <span
        className={`inline-block w-[3px] h-[1em] bg-white ml-1 align-middle ${
          showCursor && !hideCursor ? (isComplete ? "animate-blink" : "animate-blink-fast") : ""
        }`}
        style={{
          verticalAlign: "baseline",
          marginBottom: "0.1em",
          opacity: showCursor && !hideCursor ? 1 : 0,   // ← 보일 때만 색/애니메이션, 안 보일 땐 투명
        }}
      />
    </span>
  )
}

export function HeroSection() {
  const { t } = useTranslation()
  const [isLoaded, setIsLoaded] = useState(false)
  const [secondLineStarted, setSecondLineStarted] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const title1 = t("hero.title1")
  const title2 = t("hero.title2")

  useEffect(() => {
    const baseDelay = 500
    const charInterval = 120
    const extraDelay = 600
    const secondLineDelay = baseDelay + title1.length * charInterval + extraDelay

    const timer = setTimeout(() => {
      setSecondLineStarted(true)
    }, secondLineDelay)

    return () => clearTimeout(timer)
  }, [title1])

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax effect */}
      <div className="absolute inset-0">
        <Image 
          src="/images/original_from_customer/TOP基本画像.jpg" 
          alt="Hero background" 
          fill 
          className={`object-cover transition-transform duration-[1.5s] ${isLoaded ? "scale-100" : "scale-110"}`}
          priority 
        />
        {/* Multi-layer gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-20 max-w-5xl mx-auto">
        {/* Main title with serif font */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-wide font-serif">
          <span className="block drop-shadow-lg">
            <TypewriterText text={title1} delay={500} hideCursor={secondLineStarted} />
          </span>
          <span className="block mt-3 drop-shadow-lg">
            <TypewriterText text={title2} delay={500 + title1.length * 120 + 600} />
          </span>
        </h1>

        {/* Subtitle */}
        <p className={`mt-8 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {t("hero.subtitle") || "日本語教育を通じて世界をつなぐ"}
        </p>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 transition-all duration-700 delay-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <Link
            href="/admission"
            className="group flex items-center gap-3 bg-white text-primary font-bold text-base px-8 py-4 rounded-full shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:-translate-y-1 shimmer"
          >
            {t("nav.admission") || "入学案内"}
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/about"
            className="group flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold text-base px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300"
          >
            {t("about.label") || "KCPについて"}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <button 
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer group"
        aria-label="Scroll down"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-scroll-indicator" />
      </button>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
