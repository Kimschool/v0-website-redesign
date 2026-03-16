"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Link from "next/link"
import { Bell, ArrowRight } from "lucide-react"

const newsItems = [
  {
    date: "2026.01.06",
    title: "認定日本語教育機関に認定されました",
    href: "/news/accreditation",
    isNew: true,
  },
  {
    date: "2025.12.25",
    title: "2026年度予定表を公開しました",
    href: "/news/schedule-2026",
    isNew: false,
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
    <section ref={sectionRef} className="bg-gradient-to-r from-primary/5 via-background to-accent/5 border-b border-border/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className={`flex items-center gap-0 py-5 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          {/* Label with icon */}
          <div className="flex-shrink-0 flex items-center gap-2 bg-gradient-to-r from-primary to-primary/90 text-white text-sm font-bold px-5 py-2.5 rounded-full mr-6 shadow-lg shadow-primary/20">
            <Bell className="w-4 h-4" />
            <span>お知らせ</span>
          </div>

          {/* Vertical ticker - single item visible */}
          <div className="flex-1 overflow-hidden h-[44px] relative">
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
                <div className="flex items-center gap-3">
                  <time className="text-sm text-muted-foreground whitespace-nowrap font-medium">{item.date}</time>
                  {item.isNew && (
                    <span className="text-[10px] font-bold text-white bg-accent px-2 py-0.5 rounded-full badge-pulse">NEW</span>
                  )}
                </div>
                <Link
                  href={item.href}
                  className="group flex items-center gap-2 text-sm md:text-base text-foreground hover:text-primary transition-colors font-medium"
                >
                  <span className="truncate">{item.title}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              </div>
            ))}
          </div>

          {/* Dots indicator */}
          {newsItems.length > 1 && (
            <div className="flex-shrink-0 flex items-center gap-2 ml-4">
              {newsItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index)
                    startAutoplay()
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? "bg-primary w-6" 
                      : "bg-border hover:bg-primary/30 w-2"
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
