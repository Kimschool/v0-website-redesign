"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [isVisible, target, duration])

  return <span ref={countRef}>{count.toLocaleString()}</span>
}

export function HeroSection() {
  const partners = [
    "大手IT企業", "上場メーカー", "グローバル商社", "有名大学", "研究機関"
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image src="/images/main.png" alt="Hero background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-20 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-wide text-balance">
          {"さあ、始めよう。あなたの"}
          <span className="text-cyan-300">{"スクール"}</span>
          {"。"}
        </h1>
        
        <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto">
          {"日本語教育を通じて、夢への第一歩を踏み出そう"}
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#admission"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/30"
          >
            {"まずは資料請求"}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="#about"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-medium rounded-full border border-white/30 hover:bg-white/20 transition-all duration-200"
          >
            {"KCPを知る"}
          </Link>
        </div>

        {/* Stats counter */}
        <div className="mt-16 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <p className="text-sm text-white/70 mb-2">{"累計卒業生"}</p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-5xl md:text-6xl font-bold text-white">
              <AnimatedCounter target={783987} duration={2500} />
            </span>
            <span className="text-2xl text-white/80">{"人"}</span>
            <span className="text-lg text-cyan-300 ml-2">+</span>
          </div>
          <p className="mt-4 text-sm text-white/60">
            {"全世界からの留学生をサポートしてきました"}
          </p>
        </div>

        {/* Partner logos placeholder */}
        <div className="mt-12">
          <p className="text-xs text-white/50 mb-4 tracking-wider">{"PARTNERS"}</p>
          <div className="flex items-center justify-center flex-wrap gap-8">
            {partners.map((partner, index) => (
              <span key={index} className="text-sm text-white/40 font-medium">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-white/50 tracking-widest">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  )
}
