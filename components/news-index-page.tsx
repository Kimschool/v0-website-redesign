"use client"

import Link from "next/link"
import Image from "next/image"
import { useTranslation } from "react-i18next"
import { Calendar, ChevronRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { NEWS_INDEX_ITEMS, type NewsIndexItem } from "@/lib/news-articles"

function ArticleTexts(item: NewsIndexItem, t: (k: string) => string) {
  const title = t(`newsPage.articles.${item.id}.title`)
  const excerpt = t(`newsPage.articles.${item.id}.excerpt`)
  const imageAlt = t(`newsPage.articles.${item.id}.imageAlt`)
  return { title, excerpt, imageAlt }
}

function NewsCardList({ items }: { items: NewsIndexItem[] }) {
  const { t } = useTranslation()
  return (
    <div className="space-y-8">
      {items.map((item) => {
        const { title, excerpt, imageAlt } = ArticleTexts(item, t)
        return (
          <article
            key={item.id}
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
                      alt={imageAlt}
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
                    {title}
                  </Link>
                </h2>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-5">
                  {excerpt}
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
        )
      })}
    </div>
  )
}

export function NewsIndexPageClient() {
  const { t } = useTranslation()
  const items = NEWS_INDEX_ITEMS

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

            <NewsCardList items={items} />
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
