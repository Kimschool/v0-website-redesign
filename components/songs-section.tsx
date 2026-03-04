"use client"

import { useEffect, useRef, useState } from "react"
import { Music } from "lucide-react"
import Image from "next/image"

export function SongsSection() {
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
    <section ref={sectionRef} className="py-32 lg:py-44 bg-secondary">
      <div className="mx-auto max-w-7xl px-8">
        {/* Section heading */}
        <div className={`text-center mb-20 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-xs tracking-[0.4em] uppercase text-accent font-medium mb-5">Songs</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-wider text-balance">
            {"KCP校歌と応援歌"}
          </h2>
          <div className="mt-10 elegant-divider w-20 mx-auto" />
        </div>

        {/* Two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* School Song */}
          <div className={`group bg-card border border-border overflow-hidden hover:border-accent hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 rounded-xl hover-lift ${
            isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"
          }`}>
            <div className="px-8 pt-8 pb-6">
              <h3 className="text-xl font-medium text-foreground tracking-wider">
                {"校歌「今ここに」"}
              </h3>
            </div>
            {/* School Song Image */}
            <div className="aspect-[16/10] relative overflow-hidden">
              <Image
                src="/images/school-song.jpg"
                alt="校歌「今ここに」"
                fill
                className="object-cover img-zoom"
              />
              <div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/10 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-card/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Music className="w-8 h-8 text-accent" strokeWidth={1.5} />
                </div>
              </div>
            </div>
            <div className="px-8 py-6">
              <p className="text-base font-light text-muted-foreground text-center tracking-wide">
                {"「今ここに」"}
              </p>
            </div>
          </div>

          {/* Cheering Song */}
          <div className={`group bg-card border border-border overflow-hidden hover:border-accent hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 rounded-xl hover-lift ${
            isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"
          }`}>
            <div className="px-8 pt-8 pb-6">
              <h3 className="text-xl font-medium text-foreground tracking-wider">
                {"応援歌「そらとほしと」"}
              </h3>
            </div>
            {/* Cheering Song Image */}
            <div className="aspect-[16/10] relative overflow-hidden">
              <Image
                src="/images/cheering-song.jpg"
                alt="応援歌「そらとほしと」"
                fill
                className="object-cover img-zoom"
              />
              <div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/10 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-card/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Music className="w-8 h-8 text-accent" strokeWidth={1.5} />
                </div>
              </div>
            </div>
            <div className="px-8 py-6">
              <p className="text-base font-light text-muted-foreground text-center tracking-wide">
                {"「そらとほしと」"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
