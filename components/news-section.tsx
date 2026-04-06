"use client"

import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { Bell, ArrowRight, ChevronDown, ChevronUp } from "lucide-react"
import {
  fetchNewsFeedFromApi,
  getNewsApiUrl,
  getStaticNewsFeedItems,
  type NewsFeedItem,
} from "@/lib/news-feed"

export function NewsSection() {
  const { t, i18n } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [feedItems, setFeedItems] = useState<NewsFeedItem[] | null>(null)

  // Some home-page news titles are hardcoded in Japanese; map to Chinese when locale is zh.
  const newsTitleZhByHref: Record<string, string> = {
    "/news/accreditation": "KCP地球市民日语学校获认定为「认定日语教育机构」！",
    "/news/schedule-2026": "2026年长期休假日程",
  }

  const isZh = i18n.resolvedLanguage === "zh"

  useEffect(() => {
    if (!getNewsApiUrl()) {
      setFeedItems(getStaticNewsFeedItems())
      return
    }
    const ac = new AbortController()
    fetchNewsFeedFromApi(ac.signal).then((api) => {
      setFeedItems(api ?? getStaticNewsFeedItems())
    })
    return () => ac.abort()
  }, [])

  const displayNews = useMemo(() => {
    const base = feedItems ?? getStaticNewsFeedItems()
    return [...base].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)
  }, [feedItems])

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (displayNews.length <= 1) return
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % displayNews.length)
        setIsTransitioning(false)
      }, 300)
    }, 5000)
  }, [displayNews.length])

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
    if (expanded || displayNews.length <= 1) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    startAutoplay()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [expanded, displayNews.length, startAutoplay])

  return (
    <section ref={sectionRef} className="bg-gradient-to-r from-primary/5 via-background to-accent/5 border-b border-border/50">
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`flex flex-col ${isVisible ? "animate-fade-in" : "opacity-0"}`}
        >
          <div className="flex flex-wrap items-center gap-3 py-5 md:flex-nowrap md:gap-0">
            {/* Label with icon */}
            <div className="flex-shrink-0 flex items-center gap-2 bg-gradient-to-r from-primary to-primary/90 text-white text-sm font-bold px-5 py-2.5 rounded-full md:mr-6 shadow-lg shadow-primary/20">
              <Bell className="w-4 h-4 shrink-0" aria-hidden />
              <span>{t("nav.news")}</span>
            </div>

            {!expanded && (
              <>
                <div className="flex-1 min-w-0 overflow-hidden h-[44px] relative">
                  {displayNews.map((item, index) => (
                    <div
                      key={item.id + item.href + item.date}
                      className={`absolute inset-0 flex items-center gap-3 sm:gap-4 transition-all duration-300 ease-in-out ${
                        index === activeIndex
                          ? isTransitioning
                            ? "opacity-0 -translate-y-full"
                            : "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-full"
                      }`}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <time className="text-sm text-muted-foreground whitespace-nowrap font-medium">
                          {item.date}
                        </time>
                        {item.isNew && (
                          <span className="text-[10px] font-bold text-white bg-accent px-2 py-0.5 rounded-full badge-pulse">
                            {isZh ? "新" : "NEW"}
                          </span>
                        )}
                      </div>
                      <Link
                        href={item.href}
                        className="group flex min-w-0 flex-1 items-center gap-2 text-sm md:text-base text-foreground hover:text-primary transition-colors font-medium"
                      >
                        <span className="truncate">
                          {isZh ? newsTitleZhByHref[item.href] ?? item.title : item.title}
                        </span>
                        <ArrowRight className="w-4 h-4 shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </div>
                  ))}
                </div>

                {displayNews.length > 1 && (
                  <div className="flex-shrink-0 flex items-center gap-2 ml-auto md:ml-4">
                    {displayNews.map((_, index) => (
                      <button
                        key={index}
                        type="button"
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
              </>
            )}

            {expanded && <div className="hidden flex-1 md:block" aria-hidden />}

            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/90 px-3 py-2 text-xs font-semibold text-foreground shadow-sm transition hover:border-primary/40 hover:bg-primary/5 hover:text-primary md:ml-3"
              aria-expanded={expanded}
              aria-controls="news-bar-expanded-list"
            >
              {expanded ? (
                <>
                  <span>{t("newsBar.collapseList")}</span>
                  <ChevronUp className="h-4 w-4 shrink-0" aria-hidden />
                </>
              ) : (
                <>
                  <span>{t("newsBar.expandList")}</span>
                  <ChevronDown className="h-4 w-4 shrink-0" aria-hidden />
                </>
              )}
            </button>
          </div>

          {expanded && (
            <div
              id="news-bar-expanded-list"
              className="border-t border-border/50 pb-5 pt-1 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <ul className="space-y-2">
                {displayNews.map((item) => (
                  <li key={item.id + item.href + item.date}>
                    <Link
                      href={item.href}
                      className="group flex flex-wrap items-center gap-3 rounded-xl border border-border/60 bg-background/90 px-4 py-3 transition hover:border-primary/35 hover:bg-primary/[0.06] hover:shadow-sm"
                    >
                      <time className="text-sm text-muted-foreground font-medium tabular-nums shrink-0">
                        {item.date}
                      </time>
                      {item.isNew && (
                        <span className="text-[10px] font-bold text-white bg-accent px-2 py-0.5 rounded-full">
                          {isZh ? "新" : "NEW"}
                        </span>
                      )}
                      <span className="min-w-0 flex-1 text-sm font-medium text-foreground group-hover:text-primary md:text-base">
                        {isZh ? newsTitleZhByHref[item.href] ?? item.title : item.title}
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
