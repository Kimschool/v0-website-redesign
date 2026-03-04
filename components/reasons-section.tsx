"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Sparkles, Users, Briefcase } from "lucide-react"
import { useTranslation } from "react-i18next"

const reasonIcons = [Sparkles, Users, Briefcase]
const reasonImages = [
  "https://weavus-group.com/kcp/wp-content/uploads/2025/11/EJU.jpg",
  "https://weavus-group.com/kcp/wp-content/uploads/2025/07/31e0362326d434d6dbc1d2390aa01eff.jpg",
  "https://weavus-group.com/kcp/wp-content/uploads/2025/11/c6d0b891872831f84c0c747a5da2a261.jpg",
]

export function ReasonsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const { t } = useTranslation()

  const reasons = t("reasons.items", { returnObjects: true }) as { title: string; description: string }[]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reasons.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + reasons.length) % reasons.length)
  }

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-gradient-cyan text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <div className={`text-center mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-sm font-medium text-cyan-200 mb-3">{t("reasons.label")}</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {t("reasons.title")}
          </h2>
          <p className="mt-4 text-base text-white/80 max-w-xl mx-auto">
            {t("reasons.description")}
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          <div className={`flex items-center gap-12 ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
            {/* Left - Image */}
            <div className="hidden lg:block w-1/2 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src={reasonImages[currentSlide]}
                  alt={reasons[currentSlide]?.title || ""}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>
            </div>

            {/* Right - Content */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-2xl p-8 lg:p-10 text-foreground shadow-xl">
                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  {(() => {
                    const IconComponent = reasonIcons[currentSlide]
                    return <IconComponent className="w-8 h-8 text-primary" />
                  })()}
                </div>

                <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-snug whitespace-pre-line mb-4">
                  {reasons[currentSlide]?.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {reasons[currentSlide]?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label={t("reasons.prev")}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label={t("reasons.next")}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {reasons.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`carousel-dot ${currentSlide === index ? "active !bg-white" : "!bg-white/30"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
