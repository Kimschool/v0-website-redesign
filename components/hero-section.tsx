"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { ArrowRight, ChevronDown } from "lucide-react"

// Cursor component that can be positioned independently
function TypewriterCursor({ 
  visible, 
  isTyping 
}: { 
  visible: boolean; 
  isTyping: boolean;
}) {
  return (
    <span
      className={`inline-block w-[3px] h-[0.85em] bg-white align-middle transition-opacity duration-500 ${
        isTyping ? "animate-blink-fast" : "animate-blink"
      }`}
      style={{ 
        verticalAlign: "baseline", 
        marginBottom: "0.15em",
        opacity: visible ? 1 : 0
      }}
    />
  )
}

export function HeroSection() {
  const { t } = useTranslation()
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Typing state
  const [line1Text, setLine1Text] = useState("")
  const [line2Text, setLine2Text] = useState("")
  const [currentLine, setCurrentLine] = useState(0) // 0: not started, 1: typing line1, 2: typing line2, 3: done
  const [cursorVisible, setCursorVisible] = useState(false)

  const title1 = t("hero.title1")
  const title2 = t("hero.title2")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Main typing animation effect
  useEffect(() => {
    // Reset state
    setLine1Text("")
    setLine2Text("")
    setCurrentLine(0)
    setCursorVisible(false)

    // Start typing after initial delay
    const startTimer = setTimeout(() => {
      setCurrentLine(1)
      setCursorVisible(true)
    }, 500)

    return () => clearTimeout(startTimer)
  }, [title1, title2])

  // Line 1 typing
  useEffect(() => {
    if (currentLine !== 1) return

    let index = 0
    const interval = setInterval(() => {
      if (index < title1.length) {
        setLine1Text(title1.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        // Small pause before moving to line 2
        setTimeout(() => {
          setCurrentLine(2)
        }, 300)
      }
    }, 120)

    return () => clearInterval(interval)
  }, [currentLine, title1])

  // Line 2 typing
  useEffect(() => {
    if (currentLine !== 2) return

    let index = 0
    const interval = setInterval(() => {
      if (index < title2.length) {
        setLine2Text(title2.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        setCurrentLine(3)
        // Fade out cursor after completion
        setTimeout(() => {
          setCursorVisible(false)
        }, 1000)
      }
    }, 120)

    return () => clearInterval(interval)
  }, [currentLine, title2])

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
          {/* Line 1 */}
          <span className="block drop-shadow-lg">
            <span className="relative inline">
              {/* Invisible placeholder for layout stability */}
              <span className="invisible">{title1}</span>
              {/* Actual typed text */}
              <span className="absolute inset-0">{line1Text}</span>
            </span>
            {/* Cursor on line 1 */}
            <TypewriterCursor 
              visible={cursorVisible && currentLine === 1} 
              isTyping={currentLine === 1} 
            />
          </span>
          
          {/* Line 2 */}
          <span className="block mt-3 drop-shadow-lg">
            <span className="relative inline">
              {/* Invisible placeholder for layout stability */}
              <span className="invisible">{title2}</span>
              {/* Actual typed text */}
              <span className="absolute inset-0">{line2Text}</span>
            </span>
            {/* Cursor on line 2 */}
            <TypewriterCursor 
              visible={cursorVisible && currentLine >= 2} 
              isTyping={currentLine === 2} 
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
