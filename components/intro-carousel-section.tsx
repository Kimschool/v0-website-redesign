"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { ChevronLeft, ChevronRight } from "lucide-react"

/** Slide order maps to features.featureTexts indices (same meaning as former hardcoded captions) */
const CAROUSEL_SLIDES = [
  { image: "/images/weavus/EJU.jpg", featureTextIndex: 0 },
  { image: "/images/weavus/31e0362326d434d6dbc1d2390aa01eff.jpg", featureTextIndex: 2 },
  { image: "/images/weavus/2aaf315dd8c8254983b5ed098691efcd-rotated.jpg", featureTextIndex: 4 },
  { image: "/images/weavus/1f9820d2152d8e9bcc962b8600ef019d.jpg", featureTextIndex: 1 },
  { image: "/images/weavus/c6d0b891872831f84c0c747a5da2a261.jpg", featureTextIndex: 6 },
  { image: "/images/weavus/f3680d56ae6dfb979b5be7961e73155c.jpg", featureTextIndex: 5 },
  { image: "/images/weavus/1c279b72c09a930d753cc9f263d78c88.jpg", featureTextIndex: 3 },
] as const

export function IntroCarouselSection() {
  const { t, i18n } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const carouselItems = useMemo(
    () =>
      CAROUSEL_SLIDES.map((slide) => ({
        image: slide.image,
        caption: t(`features.featureTexts.${slide.featureTextIndex}`),
      })),
    [t, i18n.language]
  )

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    )
  }, [carouselItems.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    )
  }, [carouselItems.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-relaxed">
            {(() => {
              const title = t("features.title")
              const i = title.indexOf("「")
              if (i <= 0) return title
              return (
                <>
                  {title.slice(0, i)}
                  <br />
                  {title.slice(i)}
                </>
              )
            })()}
          </h2>
        </div>

        {/* Description */}
        <div className="text-center mb-12">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            {t("features.description")}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mb-12">
          {/* Main Carousel Container */}
          <div className="relative overflow-hidden rounded-xl shadow-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {carouselItems.map((item, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 relative"
                >
                  <div className="relative w-full h-64 md:h-80 lg:h-96">
                    <Image
                      src={item.image}
                      alt={item.caption}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    {/* Caption Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <p className="text-white text-lg md:text-xl lg:text-2xl font-semibold text-center">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => {
                prevSlide()
                setIsAutoPlaying(false)
                setTimeout(() => setIsAutoPlaying(true), 5000)
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={() => {
                nextSlide()
                setIsAutoPlaying(false)
                setTimeout(() => setIsAutoPlaying(true), 5000)
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                    ? "bg-blue-600 w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/about"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            {t("nav.about")}
          </Link>
        </div>
      </div>
    </section>
  )
}
