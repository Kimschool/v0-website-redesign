"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Music } from "lucide-react"
import {
  YouTubeEmbed,
  KCP_SCHOOL_SONG_YOUTUBE_ID,
  KCP_CHEERING_SONG_YOUTUBE_ID,
} from "@/components/youtube-embed"

const songYoutubeIds = [KCP_SCHOOL_SONG_YOUTUBE_ID, KCP_CHEERING_SONG_YOUTUBE_ID] as const

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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />
      
      <div className="mx-auto max-w-7xl px-6 relative">
        {/* Section heading */}
        <div className={`text-center mb-14 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          {/* Section badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Music className="w-4 h-4" />
            SONGS
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight font-serif">
            {t("songs.title")}
          </h2>
        </div>

        {/* Video players */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {songs.map((song, index) => (
            <div
              key={song.title}
              className={`${
                isVisible ? `animate-fade-in-up animation-delay-${(index + 1) * 200}` : "opacity-0"
              }`}
            >
              <div className="rounded-2xl overflow-hidden bg-foreground/5 shadow-xl border border-border/50">
                <YouTubeEmbed videoId={songYoutubeIds[index]} title={song.title} />
              </div>
              <div className="mt-5 text-center">
                <p className="text-xs text-muted-foreground font-medium mb-1 uppercase tracking-wider">{song.subtitle}</p>
                <h3 className="text-lg font-bold text-foreground font-serif">{song.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
