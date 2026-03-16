"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { t } = useTranslation()

  const featureItems = [
    { src: "/images/original_from_customer/8つの窓/01_EJU.jpg", text: t("features.featureTexts.0"), objectPosition: "center bottom", objectFit: "cover" as const },
    { src: "/images/original_from_customer/8つの窓/02_先生.jpg", text: t("features.featureTexts.1"), objectPosition: "center", objectFit: "cover" as const },
    { src: "/images/original_from_customer/8つの窓/03_多国籍.jpg", text: t("features.featureTexts.2"), objectPosition: "center", objectFit: "cover" as const },
    { src: "/images/original_from_customer/8つの窓/04_設備.jpg", text: t("features.featureTexts.3"), objectPosition: "center", objectFit: "cover" as const },
    { src: "/images/original_from_customer/8つの窓/05_文化プログラム.jpg", text: t("features.featureTexts.4"), objectPosition: "center 15%", objectFit: "cover" as const },
    { src: "/images/original_from_customer/8つの窓/06_公共性.jpg", text: t("features.featureTexts.5"), objectPosition: "center", objectFit: "cover" as const },
    { src: "/images/original_from_customer/8つの窓/07_アメリカ.jpg", text: t("features.featureTexts.6"), objectPosition: "center", objectFit: "cover" as const },
    { src: "/images/original_from_customer/8つの窓/08_認定日本語教育機関に認定.jpg", text: t("features.featureTexts.7"), objectPosition: "top", objectFit: "cover" as const },
  ]

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

  const handleArrowClick = (direction: "left" | "right") => {
    const track = trackRef.current
    if (!track) return

    track.style.animationPlayState = "paused"

    const cardWidth = window.innerWidth >= 768 ? 380 : 320
    const scrollAmount = cardWidth + 16
    const currentTransform = getComputedStyle(track).transform
    const matrix = new DOMMatrix(currentTransform)
    const currentX = matrix.m41

    const newX = direction === "left" ? currentX + scrollAmount : currentX - scrollAmount
    track.style.animation = "none"
    track.style.transform = `translateX(${newX}px)`

    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current)
    }

    resumeTimerRef.current = setTimeout(() => {
      if (track) {
        track.style.animation = ""
        track.style.transform = ""
      }
    }, 3000)
  }

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="mx-auto max-w-7xl px-6 relative">
        {/* Section heading */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          {/* Section badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            FEATURES
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight font-serif">
            {t("features.title")}
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("features.description")}
          </p>
        </div>

        {/* Features infinite scroll carousel */}
        <div className={`relative group/carousel ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
          {/* Left arrow */}
          <button
            onClick={() => handleArrowClick("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 bg-white/95 hover:bg-white shadow-xl rounded-full flex items-center justify-center transition-all duration-300 -translate-x-1/2 opacity-0 group-hover/carousel:opacity-100 hover:scale-110 border border-border/50"
            aria-label="前へ"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </button>

          {/* Right arrow */}
          <button
            onClick={() => handleArrowClick("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 bg-white/95 hover:bg-white shadow-xl rounded-full flex items-center justify-center transition-all duration-300 translate-x-1/2 opacity-0 group-hover/carousel:opacity-100 hover:scale-110 border border-border/50"
            aria-label="次へ"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </button>

          {/* Infinite scroll container */}
          <div className="overflow-hidden rounded-2xl">
            <div
              ref={trackRef}
              className="features-slider-track flex gap-5 w-max"
            >
              {[...featureItems, ...featureItems].map((item, index) => (
                <div
                  key={index}
                  className="group relative flex-shrink-0 w-[320px] md:w-[380px] overflow-hidden rounded-2xl cursor-pointer card-glow"
                >
                  <div className="aspect-[480/306] relative overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.text}
                      fill
                      sizes="(max-width: 768px) 320px, 380px"
                      loading={index < 4 ? "eager" : "lazy"}
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.15]"
                      style={{ objectPosition: item.objectPosition }}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                    {/* Title overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5">
                      <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                        <h3 className="text-base md:text-lg font-bold text-white drop-shadow-lg leading-snug">
                          {item.text}
                        </h3>
                        <div className="flex items-center gap-1 mt-2 text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span>詳細を見る</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className={`text-center mt-14 ${isVisible ? "animate-fade-in-up animation-delay-400" : "opacity-0"}`}>
          <Link
            href="/about"
            className="group inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white font-bold text-base px-8 py-4 rounded-full shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1 shimmer"
          >
            {t("about.label")}
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
