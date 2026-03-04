"use client"

import { useEffect, useRef, useState } from "react"
import { Play } from "lucide-react"
import { useTranslation } from "react-i18next"

const testimonialImages = [
  "https://weavus-group.com/kcp/wp-content/uploads/2025/07/31e0362326d434d6dbc1d2390aa01eff.jpg",
  "https://weavus-group.com/kcp/wp-content/uploads/2025/11/EJU.jpg",
  "https://weavus-group.com/kcp/wp-content/uploads/2025/11/c6d0b891872831f84c0c747a5da2a261.jpg",
]

const hasVideo = [true, false, true]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const { t } = useTranslation()

  const testimonials = t("testimonials.items", { returnObjects: true }) as { 
    name: string; 
    country: string; 
    university: string; 
    quote: string 
  }[]

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

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-muted">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-sm font-medium text-primary mb-3">{t("testimonials.label")}</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            {t("testimonials.title")}
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
            {t("testimonials.description1")}
            <br />
            {t("testimonials.description2")}
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${
                  isVisible ? `animate-fade-in-up animation-delay-${(index + 1) * 100}` : "opacity-0"
                }`}
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={testimonialImages[index]}
                    alt={testimonial.name}
                    className="w-full h-full object-cover img-zoom"
                  />
                  {hasVideo[index] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="w-6 h-6 text-primary ml-1" fill="currentColor" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                    {testimonial.country}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-sm font-bold text-foreground">{testimonial.name}</p>
                      <p className="text-xs text-primary">{testimonial.university}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {[0, 1, 2].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`carousel-dot ${currentSlide === index ? "active" : ""}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-8 ${isVisible ? "animate-fade-in-up animation-delay-400" : "opacity-0"}`}>
          <button className="inline-flex items-center gap-2 px-8 py-3 border-2 border-foreground text-foreground text-sm font-medium rounded-full hover:bg-foreground hover:text-white transition-all duration-200">
            {t("testimonials.cta")}
          </button>
        </div>
      </div>
    </section>
  )
}
