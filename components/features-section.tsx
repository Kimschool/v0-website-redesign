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

  const doubledItems = [...featureItems, ...featureItems]

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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            {t("features.title")}
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
            {t("features.description")}
          </p>
        </div>

        {/* Features infinite scroll carousel */}
        <div className={`relative group/carousel ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
          {/* Left arrow */}
          <button
            onClick={() => handleArrowClick("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-300 -translate-x-1/2 opacity-0 group-hover/carousel:opacity-100 hover:scale-110"
            aria-label="前へ"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
          </button>

          {/* Right arrow */}
          <button
            onClick={() => handleArrowClick("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-300 translate-x-1/2 opacity-0 group-hover/carousel:opacity-100 hover:scale-110"
            aria-label="次へ"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
          </button>

          {/* Infinite scroll container */}
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="features-slider-track flex gap-4 w-max"
            >
              {doubledItems.map((item, index) => (
                <div
                  key={index}
                  className="group relative flex-shrink-0 w-[320px] md:w-[380px] overflow-hidden rounded-lg cursor-pointer"
                >
                  <div className="aspect-[480/306] relative overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.text}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.2]"
                      style={{ objectPosition: item.objectPosition }}
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                    {/* Title overlay */}
                    <div className="absolute inset-0 flex items-end p-4">
                      <h3 className="text-sm md:text-base font-bold text-white drop-shadow-lg">
                        {item.text}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className={`text-center mt-12 ${isVisible ? "animate-fade-in-up animation-delay-400" : "opacity-0"}`}>
          <Link
            href="/about"
            className="group inline-flex items-center gap-3 bg-[#0085b2] hover:bg-[#006d94] text-white font-bold text-base px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            {t("about.label")}
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
