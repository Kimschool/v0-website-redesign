import { Header } from "@/components/header"
import { NewsArticleLayout } from "@/components/news-article-layout"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata = {
  title: "2026 Holiday Schedule - KCP Global Citizen Japanese Language School",
  description: "Announcement of the 2026 long vacation schedule for KCP Global Citizen Japanese Language School.",
}

const scheduleData = [
  { name: "春休み", period: "3月27日〜4月6日", note: "※4月29日は振替授業日" },
  { name: "ゴールデンウィーク", period: "5月1日〜5月6日" },
  { name: "夏休み", period: "6月20日〜7月5日" },
  { name: "お盆", period: "8月15日〜23日" },
  { name: "シルバーウィーク", period: "9月19日〜23日" },
  { name: "秋休み", period: "9月26日〜10月7日" },
  { name: "冬休み", period: "12月22日〜2027年1月11日" },
]

export default function Schedule2026NewsPage() {
  return (
    <>
      <Header />
      <main>
        <NewsArticleLayout
          title="2026年長期休みのスケジュール"
          publishedDate="2026年1月13日"
          updatedDate="2026年2月7日"
          relatedNews={[
            {
              title: "認定日本語教育機関に認定されました",
              href: "/news/accreditation",
              date: "2025.11.04",
            },
          ]}
        >
          <p>2026年度の長期休みスケジュールをお知らせいたします。</p>

          {/* Schedule table */}
          <div className="not-prose my-6">
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#0085b2] text-white">
                    <th className="text-left text-sm font-bold px-4 py-3">休暇</th>
                    <th className="text-left text-sm font-bold px-4 py-3">期間</th>
                    <th className="text-left text-sm font-bold px-4 py-3 hidden sm:table-cell">備考</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleData.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {item.period}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 hidden sm:table-cell">
                        {item.note || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile note display */}
            <div className="sm:hidden mt-3">
              <p className="text-xs text-gray-500">※4月29日は振替授業日</p>
            </div>
          </div>
        </NewsArticleLayout>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
