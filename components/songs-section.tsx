"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

const songVideos = [
  "",
  "",
]

export function SongsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useTranslation()

  const songs = t("songs.items", { returnObjects: true }) as { title: string; subtitle: string }[]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0 }
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            {t("songs.title")}
          </h2>
        </div>

        {/* Video players */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {songs.map((song, index) => (
            <div
              key={song.title}
              className={`${
                isVisible ? `animate-fade-in-up animation-delay-${(index + 1) * 200}` : "opacity-0"
              }`}
            >
              <div className="rounded-xl overflow-hidden bg-black shadow-lg">
                <video
                  controls
                  preload="metadata"
                  className="w-full aspect-video"
                  poster=""
                >
                  {songVideos[index] && (
                    <source src={songVideos[index]} type="video/mp4" />
                  )}
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground font-medium mb-1">{song.subtitle}</p>
                <h3 className="text-lg font-bold text-foreground">{song.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
