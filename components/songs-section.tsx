"use client"

import { useEffect, useRef, useState } from "react"
import { Play } from "lucide-react"
import Image from "next/image"

const songs = [
  {
    id: 1,
    title: "校歌「今ここに」",
    subtitle: "School Song",
    image: "/images/school-song.jpg",
  },
  {
    id: 2,
    title: "応援歌「そらとほしと」",
    subtitle: "Cheering Song",
    image: "/images/cheering-song.jpg",
  },
]

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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-muted">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <div className={`text-center mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-sm font-medium text-primary mb-3">{"Songs"}</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            {"KCP校歌と応援歌"}
          </h2>
        </div>

        {/* Song cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {songs.map((song, index) => (
            <div
              key={song.id}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                isVisible ? `animate-fade-in-up animation-delay-${(index + 1) * 100}` : "opacity-0"
              }`}
            >
              {/* Image */}
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={song.image}
                  alt={song.title}
                  fill
                  className="object-cover img-zoom"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs text-white/70 font-medium mb-1">{song.subtitle}</p>
                  <h3 className="text-xl font-bold text-white">{song.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
