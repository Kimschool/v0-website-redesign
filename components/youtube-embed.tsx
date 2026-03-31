"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"

export const KCP_SCHOOL_SONG_YOUTUBE_ID = "EvPu_-KFGO8"
export const KCP_CHEERING_SONG_YOUTUBE_ID = "H0yjMXTobUU"

/** クリック後に iframe を載せる（YouTube URL は HTML の video タグでは再生できない） */
export function YouTubeEmbed({
  videoId,
  title,
  className,
}: {
  videoId: string
  title: string
  className?: string
}) {
  const [active, setActive] = useState(false)

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-xl ring-1 ring-black/5",
        className
      )}
    >
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full border-0"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group absolute inset-0 z-10 m-0 block h-full w-full cursor-pointer border-0 p-0 text-left outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={`${title}を再生`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- YouTube サムネ */}
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            width={480}
            height={360}
            loading="lazy"
            decoding="async"
          />
          <span
            className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40"
            aria-hidden
          />
          <span
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition group-hover:scale-105 group-hover:bg-red-700"
            aria-hidden
          >
            <Play className="ml-1 h-8 w-8 text-white" fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  )
}
