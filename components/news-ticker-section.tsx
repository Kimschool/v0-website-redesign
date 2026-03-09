'use client'

import { useTranslation } from '@/lib/i18n'

export function NewsTickerSection() {
  const t = useTranslation()

  const news = [
    {
      date: "2026.01.13",
      title: "2026年長期休みのスケジュール",
      link: "#"
    },
    {
      date: "2025.11.04",
      title: "KCP地球市民日本語学校が「認定日本語教育機関」に認定されました！",
      link: "#"
    }
  ]

  return (
    <section className="bg-white py-6 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-6 overflow-x-auto">
          <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">NEWS</span>
          <div className="flex gap-8 overflow-x-auto pb-2">
            {news.map((item, index) => (
              <a 
                key={index}
                href={item.link}
                className="flex items-center gap-4 whitespace-nowrap hover:text-blue-600 transition-colors"
              >
                <span className="text-sm text-gray-500">{item.date}</span>
                <span className="text-sm text-gray-800">{item.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
