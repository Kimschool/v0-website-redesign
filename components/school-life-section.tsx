"use client"

import { useEffect, useRef, useState } from "react"
import { Calendar, Users, Building2, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const items = [
  { icon: Calendar, label: "年間スケジュール", href: "#schedule" },
  { icon: Users, label: "クラブ活動", href: "#clubs" },
  { icon: Building2, label: "施設案内", href: "#facilities" },
  { icon: MapPin, label: "アクセス・周辺環境", href: "#access" },
]

export function SchoolLifeSection() {
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
    <section ref={sectionRef} id="school-life" className="relative py-32 lg:py-44 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/school-life.jpg"
          alt="学校生活"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#faf9f7]/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-8">
        {/* Section heading */}
        <div className={`text-center mb-20 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-xs tracking-[0.4em] uppercase text-accent font-medium mb-5">Campus Life</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-wider text-balance">
            {"学び、つながり、成長する毎日"}
          </h2>
          <p className="mt-6 text-base font-light text-muted-foreground max-w-lg mx-auto leading-loose tracking-wide">
            {"学ぶことも、楽しむことも、全力で過ごせるキャンパスライフがここにある。"}
          </p>
          <div className="mt-10 elegant-divider w-20 mx-auto" />
        </div>

        {/* Icon grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={`group flex flex-col items-center gap-5 p-10 bg-card border border-border hover:border-accent hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 rounded-xl hover-lift ${
                isVisible ? `animate-fade-in-up animation-delay-${(index + 1) * 100}` : "opacity-0"
              }`}
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-[#faf9f7] transition-all duration-300">
                <item.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <span className="text-sm font-light text-foreground text-center leading-relaxed tracking-wide">
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-20 ${isVisible ? "animate-fade-in-up animation-delay-500" : "opacity-0"}`}>
          <Link
            href="#school-life-detail"
            className="inline-flex items-center gap-2 px-12 py-4 border border-foreground text-foreground text-sm tracking-[0.2em] hover:bg-foreground hover:text-background transition-all duration-300 hover-lift rounded-sm"
          >
            {"学校生活"}
          </Link>
        </div>
      </div>
    </section>
  )
}
