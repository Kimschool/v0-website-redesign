"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useTranslation } from "react-i18next"
import { ChevronDown } from "lucide-react"

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
          src="/images/original_from_customer/KV.jpg" 
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
