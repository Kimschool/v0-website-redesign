/**
 * お知らせ一覧（PHP API / 静的フォールバック）
 */
import { NEWS_INDEX_ITEMS, type NewsArticleId } from "@/lib/news-articles"

export type NewsFeedItem = {
  id: string
  title: string
  excerpt: string
  href: string
  date: string
  isNew: boolean
  imageSrc: string | null
}

/** メインバー用の固定コピー（API 未設定時） */
export const NEWS_BAR_BY_ID: Record<
  NewsArticleId,
  { title: string; isNew: boolean }
> = {
  schedule2026: {
    title: "2026年長期休みのスケジュール",
    isNew: true,
  },
  accreditation: {
    title: "KCP地球市民日本語学校が「認定日本語教育機関」に認定されました！",
    isNew: false,
  },
}

export function getStaticNewsFeedItems(): NewsFeedItem[] {
  return NEWS_INDEX_ITEMS.map((item) => ({
    id: item.id,
    date: item.date,
    href: item.href,
    title: NEWS_BAR_BY_ID[item.id].title,
    excerpt: "",
    isNew: NEWS_BAR_BY_ID[item.id].isNew,
    imageSrc: item.imageSrc ?? null,
  }))
}

export function getNewsApiUrl(): string | null {
  const u = process.env.NEXT_PUBLIC_NEWS_API_URL?.trim()
  return u || null
}

/** クライアント・サーバー両方で利用可 */
export async function fetchNewsFeedFromApi(signal?: AbortSignal): Promise<NewsFeedItem[] | null> {
  const url = getNewsApiUrl()
  if (!url) return null
  try {
    const res = await fetch(url, { signal, cache: "no-store" })
    if (!res.ok) return null
    const data: unknown = await res.json()
    if (!data || typeof data !== "object" || !("items" in data)) return null
    const items = (data as { items: unknown }).items
    if (!Array.isArray(items) || items.length === 0) return null
    const out: NewsFeedItem[] = []
    for (const row of items) {
      if (!row || typeof row !== "object") continue
      const r = row as Record<string, unknown>
      const title = typeof r.title === "string" ? r.title : ""
      const href = typeof r.href === "string" ? r.href : ""
      const date = typeof r.date === "string" ? r.date : ""
      if (!title || !href || !date) continue
      const excerpt = typeof r.excerpt === "string" ? r.excerpt : ""
      const id = typeof r.id === "string" ? r.id : String(r.id ?? href)
      const isNew = Boolean(r.isNew)
      const imageSrc =
        typeof r.imageSrc === "string" && r.imageSrc.length > 0 ? r.imageSrc : null
      out.push({ id, title, excerpt, href, date, isNew, imageSrc })
    }
    return out.length > 0 ? out : null
  } catch {
    return null
  }
}
