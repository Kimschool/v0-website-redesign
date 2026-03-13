"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Link from "next/link"

const newsItems = [
  {
    date: "2026.01.06",
    title: "認定日本語教育機関に認定されました",
    href: "/news/accreditation",
  },
  {
    date: "2025.12.25",
    title: "2026年度予定表を公開しました",
    href: "/news/schedule-2026",
  },
]

export function NewsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % newsItems.length)
        setIsTransitioning(false)
      }, 300)
    }, 5000)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (newsItems.length <= 1) return
    startAutoplay()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [startAutoplay])

  return (
    <section ref={sectionRef} className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6">
        <div className={`flex items-center gap-0 py-4 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          {/* Label */}
          <div className="flex-shrink-0 bg-[#0085b2] text-white text-sm font-bold px-5 py-2 rounded-sm mr-6">
            お知らせ
          </div>

          {/* Vertical ticker - single item visible */}
          <div className="flex-1 overflow-hidden h-[40px] relative">
            {newsItems.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex items-center gap-4 transition-all duration-300 ease-in-out ${
                  index === activeIndex
                    ? isTransitioning
                      ? "opacity-0 -translate-y-full"
                      : "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-full"
                }`}
              >
                <time className="text-sm text-muted-foreground whitespace-nowrap">{item.date}</time>
                <Link
                  href={item.href}
                  className="text-sm md:text-base text-gray-900 hover:text-primary transition-colors truncate"
                >
                  {item.title}
                </Link>
              </div>
            ))}
          </div>

          {/* Dots indicator */}
          {newsItems.length > 1 && (
            <div className="flex-shrink-0 flex items-center gap-1.5 ml-4">
              {newsItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index)
                    startAutoplay()
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "bg-[#0085b2] w-4" : "bg-gray-300"
                  }`}
                  aria-label={`News ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
