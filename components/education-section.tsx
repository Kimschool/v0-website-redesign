"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"

export function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="education" className="bg-background">
      {/* Section heading */}
      <div className={`py-28 lg:py-36 text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
        <p className="text-xs tracking-[0.4em] uppercase text-accent font-medium mb-5">Education</p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-wider text-balance">
          {"教育内容とサポート体制"}
        </h2>
        <p className="mt-6 text-base font-light text-muted-foreground max-w-lg mx-auto leading-loose tracking-wide">
          {"教育方針的なスローガンを入れるが、文章は未定"}
        </p>
        <div className="mt-10 elegant-divider w-20 mx-auto" />
      </div>

      {/* POINT 1 - Full width image with left-aligned text */}
      <div className="relative min-h-[540px] lg:min-h-[640px] overflow-hidden group">
        {/* Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/course-intro.jpg"
            alt="コース紹介"
            fill
            className="object-cover img-zoom"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a2332]/70 via-[#1a2332]/40 to-transparent" />
        </div>
        {/* Content - left side */}
        <div className="relative z-10 mx-auto max-w-7xl px-8 py-20 lg:py-32 flex items-center min-h-[540px] lg:min-h-[640px]">
          <div className="max-w-lg">
            {/* Point badge */}
            <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-[#faf9f7] mb-8 shadow-xl">
              <span className="text-[9px] tracking-[0.2em] uppercase text-primary font-medium">
                POINT
              </span>
              <span className="text-2xl font-semibold text-primary leading-none">1</span>
            </div>
            <h3 className="text-3xl lg:text-4xl font-medium text-[#faf9f7] tracking-wider mb-5 leading-snug">
              {"コース紹介1"}
            </h3>
            <p className="text-base font-light text-[#faf9f7]/90 leading-loose tracking-wide mb-10">
              {"コース紹介2"}
            </p>
            <Link
              href="#courses"
              className="inline-flex items-center gap-3 px-10 py-4 border border-[#faf9f7]/60 text-[#faf9f7] text-sm tracking-[0.15em] hover:bg-[#faf9f7] hover:text-primary transition-all duration-300 rounded-sm"
            >
              {"コース紹介"}
            </Link>
          </div>
        </div>
      </div>

      {/* POINT 2 - Full width with image background */}
      <div className="relative min-h-[540px] lg:min-h-[640px] overflow-hidden group">
        {/* Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/lesson-content.jpg"
            alt="授業内容"
            fill
            className="object-cover img-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#1a2332]/70 via-[#1a2332]/40 to-transparent" />
        </div>
        {/* Content - right side */}
        <div className="relative z-10 mx-auto max-w-7xl px-8 py-20 lg:py-32 flex items-center justify-end min-h-[540px] lg:min-h-[640px]">
          <div className="max-w-lg text-right">
            {/* Point badge */}
            <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-[#faf9f7] mb-8 ml-auto shadow-xl">
              <span className="text-[9px] tracking-[0.2em] uppercase text-primary font-medium">
                POINT
              </span>
              <span className="text-2xl font-semibold text-primary leading-none">2</span>
            </div>
            <h3 className="text-3xl lg:text-4xl font-medium text-[#faf9f7] tracking-wider mb-5 leading-snug">
              {"授業内容1"}
            </h3>
            <p className="text-base font-light text-[#faf9f7]/90 leading-loose tracking-wide mb-10">
              {"授業内容2"}
            </p>
            <Link
              href="#classes"
              className="inline-flex items-center gap-3 px-10 py-4 border border-[#faf9f7]/60 text-[#faf9f7] text-sm tracking-[0.15em] hover:bg-[#faf9f7] hover:text-primary transition-all duration-300 rounded-sm"
            >
              {"授業内容"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
