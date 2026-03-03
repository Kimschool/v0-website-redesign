"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

export function AchievementSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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
    <section ref={sectionRef} className="py-32 lg:py-44 bg-primary text-[#faf9f7]">
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left side - text content */}
          <div className={isVisible ? "animate-fade-in-up" : "opacity-0"}>
            {/* Point badge */}
            <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-[#faf9f7] mb-10 shadow-xl">
              <span className="text-[9px] tracking-[0.2em] uppercase text-primary font-medium">
                POINT
              </span>
              <span className="text-2xl font-semibold text-primary leading-none">3</span>
            </div>
            <h3 className="text-3xl lg:text-4xl font-medium text-[#faf9f7] tracking-wider mb-5 leading-snug">
              {"進学実績1"}
            </h3>
            <p className="text-base font-light text-[#faf9f7]/90 leading-loose tracking-wide mb-12">
              {"進学実績2"}
            </p>
            <Link
              href="#results"
              className="inline-flex items-center gap-3 px-10 py-4 border border-[#faf9f7]/60 text-[#faf9f7] text-sm tracking-[0.15em] hover:bg-[#faf9f7] hover:text-primary transition-all duration-300 rounded-sm"
            >
              {"進学実績"}
            </Link>
          </div>

          {/* Right side - Donut chart */}
          <div className={`flex flex-col items-center ${isVisible ? "animate-scale-in animation-delay-200" : "opacity-0"}`}>
            <div className="relative w-72 h-72 lg:w-80 lg:h-80">
              <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                {/* Background circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#faf9f7"
                  strokeWidth="28"
                  opacity="0.08"
                />
                {/* 進学 50% - green */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#5b8a72"
                  strokeWidth="28"
                  strokeDasharray="219.91 219.91"
                  strokeDashoffset="0"
                  className="drop-shadow-lg"
                />
                {/* その他 40% - warm gold */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#c9a96e"
                  strokeWidth="28"
                  strokeDasharray="175.93 263.89"
                  strokeDashoffset="-219.91"
                  className="drop-shadow-lg"
                />
                {/* 就職 10% - coral */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#d4726a"
                  strokeWidth="28"
                  strokeDasharray="43.98 395.84"
                  strokeDashoffset="-395.84"
                  className="drop-shadow-lg"
                />
              </svg>
              {/* Center label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-light text-[#faf9f7]/80 tracking-[0.15em]">{"進学実績"}</span>
              </div>
              {/* Percentage labels */}
              <div className="absolute top-4 right-6 text-sm font-semibold text-[#faf9f7] tracking-wide">50%</div>
              <div className="absolute top-4 left-6 text-sm font-semibold text-[#faf9f7] tracking-wide">40%</div>
              <div className="absolute bottom-10 left-10 text-sm font-semibold text-[#faf9f7] tracking-wide">10%</div>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-8 mt-10">
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-sm bg-[#5b8a72] shadow-md" />
                <span className="text-sm font-light text-[#faf9f7]/90 tracking-wide">{"進学"}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-sm bg-[#c9a96e] shadow-md" />
                <span className="text-sm font-light text-[#faf9f7]/90 tracking-wide">{"その他"}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-sm bg-[#d4726a] shadow-md" />
                <span className="text-sm font-light text-[#faf9f7]/90 tracking-wide">{"就職"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
