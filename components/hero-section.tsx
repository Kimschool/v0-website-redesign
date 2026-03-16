"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { ArrowRight, ChevronDown } from "lucide-react"

function TypewriterText({ 
  text, 
  delay = 0,
  onComplete,
  showCursorProp = false 
}: { 
  text: string; 
  delay?: number;
  onComplete?: () => void;
  showCursorProp?: boolean;
}) {
  const [displayedText, setDisplayedText] = useState("")
  const [hasStarted, setHasStarted] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    setDisplayedText("")
    setHasStarted(false)
    setIsTyping(false)

    const startTimer = setTimeout(() => {
      setHasStarted(true)
      setIsTyping(true)
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
        setIsTyping(false)
        clearInterval(typingInterval)
        onComplete?.()
      }
    }, 120)

    return () => clearInterval(typingInterval)
  }, [text, hasStarted, onComplete])

  return (
    <span className="inline">
      {/* Pre-render invisible text to prevent layout shift */}
      <span className="relative">
        <span className="invisible">{text}</span>
        <span className="absolute inset-0">{displayedText}</span>
      </span>
      <span
        className={`inline-block w-[3px] h-[0.85em] bg-white ml-1 align-middle transition-opacity duration-300 ${
          isTyping ? "animate-blink-fast" : "animate-blink"
        }`}
        style={{ 
          verticalAlign: "baseline", 
          marginBottom: "0.15em",
          opacity: showCursorProp ? 1 : 0
        }}
      />
    </span>
  )
}

export function HeroSection() {
  const { t } = useTranslation()
  const [isLoaded, setIsLoaded] = useState(false)
  const [line1Complete, setLine1Complete] = useState(false)
  const [line2Complete, setLine2Complete] = useState(false)
  const [showLine1Cursor, setShowLine1Cursor] = useState(true)
  const [showLine2Cursor, setShowLine2Cursor] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const title1 = t("hero.title1")
  const title2 = t("hero.title2")

  // When line 1 completes, hide its cursor and show line 2 cursor
  const handleLine1Complete = () => {
    setLine1Complete(true)
    setShowLine1Cursor(false)
    setShowLine2Cursor(true)
  }

  // When line 2 completes, fade out its cursor
  const handleLine2Complete = () => {
    setLine2Complete(true)
    // Keep cursor visible briefly, then fade out
    setTimeout(() => {
      setShowLine2Cursor(false)
    }, 800)
  }

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
        {/* Subtitle badge */}
        <div className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="text-sm font-medium text-white/90">KCP地球市民日本語学校</span>
        </div>

        {/* Main title with serif font */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-wide font-serif">
          <span className="block drop-shadow-lg">
            <TypewriterText 
              text={title1} 
              delay={500} 
              onComplete={handleLine1Complete}
              showCursorProp={showLine1Cursor && !line1Complete}
            />
          </span>
          <span className="block mt-3 drop-shadow-lg">
            <TypewriterText 
              text={title2} 
              delay={500 + title1.length * 120 + 300} 
              onComplete={handleLine2Complete}
              showCursorProp={showLine2Cursor}
            />
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
