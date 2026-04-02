"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { ExternalLink, Music, Play } from "lucide-react"
import {
  YouTubeEmbed,
  KCP_SCHOOL_SONG_YOUTUBE_ID,
  KCP_CHEERING_SONG_YOUTUBE_ID,
} from "@/components/youtube-embed"

const songYoutubeIds = [KCP_SCHOOL_SONG_YOUTUBE_ID, KCP_CHEERING_SONG_YOUTUBE_ID] as const

const YOUTUBE_WATCH_URLS = [
  `https://www.youtube.com/watch?v=${KCP_SCHOOL_SONG_YOUTUBE_ID}`,
  `https://www.youtube.com/watch?v=${KCP_CHEERING_SONG_YOUTUBE_ID}`,
] as const

/** Weibo / t.cn (same order as songs.items): school song, cheering song */
const SONG_WEIBO_URLS = [
  "https://t.cn/AXIKkQ37",
  "https://weibo.com/tv/show/1034:5282938309509185?from=old_pc_videoshow",
] as const

/** Poster frame for zh layout (same assets as school-life page) */
const SONG_PREVIEW_VIDEO_SRC = [
  "/images/original_from_customer/校歌字幕.mp4",
  "/images/original_from_customer/応援歌字幕明るいバージョン.mp4",
] as const

export function SongsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [weiboOpen, setWeiboOpen] = useState<Record<number, boolean>>({})
  const { t, i18n } = useTranslation()

  const lang = i18n.resolvedLanguage ?? ""
  const isZh = lang.startsWith("zh")
  const isJa = lang === "ja"

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
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />

      <div className="mx-auto max-w-7xl px-6 relative">
        <div className={`text-center mb-14 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Music className="w-4 h-4" />
            {isZh ? "歌曲" : "SONGS"}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight font-serif">
            {t("songs.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {songs.map((song, index) => {
            const animation = isVisible ? `animate-fade-in-up animation-delay-${(index + 1) * 200}` : "opacity-0"

            if (isZh) {
              const open = weiboOpen[index]
              const url = SONG_WEIBO_URLS[index]
              return (
                <div key={song.title} className={animation}>
                  <div className="rounded-2xl overflow-hidden border border-border/50 bg-black/5 shadow-xl">
                    {open ? (
                      <div className="relative aspect-video w-full bg-black">
                        <iframe
                          src={url}
                          title={song.title}
                          className="absolute inset-0 h-full w-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setWeiboOpen((prev) => ({ ...prev, [index]: true }))}
                        className="group relative aspect-video w-full overflow-hidden bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        aria-label={`${song.title} — ${t("songs.showVideo")}`}
                      >
                        <video
                          className="absolute inset-0 h-full w-full object-cover pointer-events-none scale-[1.02]"
                          muted
                          playsInline
                          preload="metadata"
                          src={`${SONG_PREVIEW_VIDEO_SRC[index]}#t=0.001`}
                          aria-hidden
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/40 transition-opacity group-hover:via-black/35 group-hover:to-black/50"
                          aria-hidden
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4">
                          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-[#0085b2] shadow-lg transition-transform group-hover:scale-110 group-active:scale-95">
                            <Play className="h-8 w-8 ml-1" fill="currentColor" aria-hidden />
                          </span>
                          <span className="text-center text-sm font-semibold text-white drop-shadow-md">
                            {t("songs.showVideo")}
                          </span>
                        </div>
                      </button>
                    )}
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-border/50 bg-muted/20 px-3 py-2">
                      {open ? (
                        <button
                          type="button"
                          onClick={() => setWeiboOpen((prev) => ({ ...prev, [index]: false }))}
                          className="text-xs font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
                        >
                          {t("songs.hideVideo")}
                        </button>
                      ) : null}
                      <a
                        href={YOUTUBE_WATCH_URLS[index]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-primary underline-offset-2 hover:underline"
                      >
                        <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        {t("songs.youtubeWatch")}
                      </a>
                    </div>
                  </div>
                  <div className="mt-5 text-center">
                    <p className="text-xs text-muted-foreground font-medium mb-1 uppercase tracking-wider">{song.subtitle}</p>
                    <h3 className="text-lg font-bold text-foreground font-serif">{song.title}</h3>
                  </div>
                </div>
              )
            }

            return (
              <div key={song.title} className={animation}>
                <div className="rounded-2xl overflow-hidden border border-border/50 bg-black/5 shadow-xl">
                  <YouTubeEmbed
                    videoId={songYoutubeIds[index]}
                    title={song.title}
                    playAriaLabel={`${song.title} — ${t("songs.showVideo")}`}
                    className="rounded-none shadow-none ring-0"
                  />
                  {!isJa ? (
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-border/50 bg-muted/20 px-3 py-2">
                      <a
                        href={SONG_WEIBO_URLS[index]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-primary underline-offset-2 hover:underline"
                      >
                        <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        {t("songs.alternateWatch")}
                      </a>
                    </div>
                  ) : null}
                </div>
                <div className="mt-5 text-center">
                  <p className="text-xs text-muted-foreground font-medium mb-1 uppercase tracking-wider">{song.subtitle}</p>
                  <h3 className="text-lg font-bold text-foreground font-serif">{song.title}</h3>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
