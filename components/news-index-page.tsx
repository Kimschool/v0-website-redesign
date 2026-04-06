"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Calendar, ChevronRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { NEWS_INDEX_ITEMS, type NewsIndexItem } from "@/lib/news-articles"
import { fetchNewsFeedFromApi, getNewsApiUrl, type NewsFeedItem } from "@/lib/news-feed"

type NewsCardEntry = {
  key: string
  href: string
  date: string
  imageSrc?: string | null
  title: string
  excerpt: string
  imageAlt: string
}

function ArticleTexts(item: NewsIndexItem, t: (k: string) => string) {
  const title = t(`newsPage.articles.${item.id}.title`)
  const excerpt = t(`newsPage.articles.${item.id}.excerpt`)
  const imageAlt = t(`newsPage.articles.${item.id}.imageAlt`)
  return { title, excerpt, imageAlt }
}

function NewsCardList({ entries }: { entries: NewsCardEntry[] }) {
  const { t } = useTranslation()
  return (
    <div className="space-y-8">
      {entries.map((item) => (
        <article
          key={item.key}
          className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg hover:border-[#0085b2]/25"
        >
          <div className="grid md:grid-cols-[minmax(0,280px)_1fr] gap-0">
            <Link
              href={item.href}
              className="relative flex min-h-[220px] w-full items-center justify-center bg-gradient-to-br from-[#0085b2]/10 to-[#0cc0df]/10 px-5 py-6 sm:px-6 sm:py-7 md:min-h-[300px] md:px-2 md:py-2"
            >
              {item.imageSrc ? (
                <div className="relative h-[200px] w-full sm:h-[220px] md:h-[260px]">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 280px"
                    className="object-contain object-center"
                  />
                </div>
              ) : (
                <div className="flex h-40 w-full items-center justify-center md:h-48">
                  <Calendar className="h-16 w-16 text-[#0085b2]/40" strokeWidth={1.25} />
                </div>
              )}
            </Link>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <time className="text-xs font-semibold tracking-wider text-[#0085b2] mb-2">
                {item.date}
              </time>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-3">
                <Link href={item.href} className="hover:text-[#0085b2] transition-colors">
                  {item.title}
                </Link>
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-5">
                {item.excerpt}
              </p>
              <Link
                href={item.href}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0085b2] hover:gap-3 transition-all"
              >
                {t("newsPage.readMore")}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export function NewsIndexPageClient() {
  const { t } = useTranslation()
  const [apiFeed, setApiFeed] = useState<NewsFeedItem[] | undefined>(undefined)

  useEffect(() => {
    if (!getNewsApiUrl()) {
      setApiFeed(undefined)
      return
    }
    const ac = new AbortController()
    fetchNewsFeedFromApi(ac.signal).then((r) => {
      setApiFeed(r && r.length > 0 ? r : undefined)
    })
    return () => ac.abort()
  }, [])

  const entries: NewsCardEntry[] = useMemo(() => {
    if (apiFeed && apiFeed.length > 0) {
      return apiFeed.map((item) => ({
        key: item.id,
        href: item.href,
        date: item.date,
        imageSrc: item.imageSrc,
        title: item.title,
        excerpt: item.excerpt || "",
        imageAlt: item.title,
      }))
    }
    return NEWS_INDEX_ITEMS.map((item) => {
      const tx = ArticleTexts(item, t)
      return {
        key: item.id,
        href: item.href,
        date: item.date,
        imageSrc: item.imageSrc,
        title: tx.title,
        excerpt: tx.excerpt,
        imageAlt: tx.imageAlt,
      }
    })
  }, [apiFeed, t])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="pt-24 pb-20 px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#0085b2] mb-2">NEWS</p>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
                {t("newsPage.title")}
              </h1>
              <p className="mt-3 text-gray-600 text-sm md:text-base max-w-2xl">
                {t("newsPage.description")}
              </p>
            </div>

            <NewsCardList entries={entries} />
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
