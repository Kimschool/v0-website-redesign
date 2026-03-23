/**
 * NEWS index + article routes. Add entries here when publishing new posts.
 * `sortKey` descending = newest first in the list.
 */
export type NewsArticleId = "schedule2026" | "accreditation"

export type NewsIndexItem = {
  id: NewsArticleId
  href: `/news/${string}`
  /** Short date for display */
  date: string
  sortKey: number
  imageSrc?: string
}

const rawItems: NewsIndexItem[] = [
  {
    id: "schedule2026",
    href: "/news/schedule-2026",
    date: "2026.01.13",
    sortKey: 20260113,
  },
  {
    id: "accreditation",
    href: "/news/accreditation",
    date: "2025.11.04",
    sortKey: 20251104,
    imageSrc:
      "/images/original_from_customer/8つの窓/08_認定日本語教育機関に認定.jpg",
  },
]

export const NEWS_INDEX_ITEMS: NewsIndexItem[] = [...rawItems].sort(
  (a, b) => b.sortKey - a.sortKey
)
