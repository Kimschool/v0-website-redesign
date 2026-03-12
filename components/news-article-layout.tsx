"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, RefreshCw } from "lucide-react"

interface RelatedNews {
  title: string
  href: string
  date: string
}

interface NewsArticleLayoutProps {
  category?: string
  title: string
  publishedDate: string
  updatedDate?: string
  children: React.ReactNode
  relatedNews?: RelatedNews[]
}

export function NewsArticleLayout({
  category = "お知らせ",
  title,
  publishedDate,
  updatedDate,
  children,
  relatedNews = [],
}: NewsArticleLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-24 pb-16">
        <article className="mx-auto max-w-3xl px-6">
          {/* Header area */}
          <div className="mb-8">
            {/* Back link */}
            <Link
              href="/#news"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#0085b2] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              トップページに戻る
            </Link>

            {/* Category badge + dates */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-[#0085b2] text-white text-xs font-bold px-3 py-1 rounded-sm">
                {category}
              </span>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {publishedDate}
                </span>
                {updatedDate && (
                  <span className="inline-flex items-center gap-1">
                    <RefreshCw className="w-3.5 h-3.5" />
                    最終更新: {updatedDate}
                  </span>
                )}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              {title}
            </h1>
          </div>

          {/* Divider */}
          <hr className="border-gray-200 mb-8" />

          {/* Body */}
          <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700">
            {children}
          </div>

          {/* Divider */}
          <hr className="border-gray-200 mt-12 mb-8" />

          {/* Footer navigation */}
          <div className="space-y-6">
            {/* Related news */}
            {relatedNews.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-gray-900 mb-3">その他のお知らせ</h2>
                <ul className="space-y-2">
                  {relatedNews.map((news, index) => (
                    <li key={index}>
                      <Link
                        href={news.href}
                        className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#0085b2] transition-colors group"
                      >
                        <time className="text-gray-400 whitespace-nowrap">{news.date}</time>
                        <span className="group-hover:underline">{news.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  )
}
