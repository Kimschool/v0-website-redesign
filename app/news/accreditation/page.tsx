import Image from "next/image"
import { Header } from "@/components/header"
import { NewsArticleLayout } from "@/components/news-article-layout"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata = {
  title: "認定日本語教育機関に認定されました | KCP地球市民日本語学校",
  description: "KCP地球市民日本語学校が「認定日本語教育機関」に認定されました。",
}

export default function AccreditationNewsPage() {
  return (
    <>
      <Header />
      <main>
        <NewsArticleLayout
          title="KCP地球市民日本語学校が「認定日本語教育機関」に認定されました！"
          publishedDate="2025年11月4日"
          updatedDate="2026年2月7日"
          relatedNews={[
            {
              title: "2026年長期休みのスケジュール",
              href: "/news/schedule-2026",
              date: "2026.01.13",
            },
          ]}
        >
          <p>
            2025年10月31日、KCP地球市民日本語学校は「日本語教育機関認定法」に基づき、文部科学省より
            <strong>認定日本語教育機関</strong>として認定されました。
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 my-8 not-prose flex flex-col items-center gap-6">
            <Image
              src="/images/original_from_customer/8つの窓/08_認定日本語教育機関に認定.jpg"
              alt="認定日本語教育機関（留学）認定マーク"
              width={240}
              height={240}
              className="object-contain"
            />
            <p className="text-center text-gray-700">
              <span className="text-sm text-gray-500">認定番号</span>
              <br />
              <span className="text-lg font-bold text-gray-900">20251130049</span>
            </p>
          </div>

          <p>
            この認定は、本校の教育プログラムが政府の品質基準を満たしていることの証明です。
          </p>

          <p>
            KCP地球市民日本語学校は「<strong>ともにまなび、ともに生きる</strong>」の理念のもと、
            学習者中心の指導と安心安全な教育環境の提供に努めてまいります。
            今後とも変わらぬご支援を賜りますようお願い申し上げます。
          </p>
        </NewsArticleLayout>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
