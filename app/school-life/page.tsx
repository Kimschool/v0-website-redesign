import { Header } from "@/components/header"
import { SchoolLifePageContent } from "@/components/school-life-page-content"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata = {
  title: "学校生活 | KCP地球市民日本語学校",
  description: "KCPでの生活は、教室の中だけにとどまりません。年間を通じてのイベントやクラブ活動、多国籍の仲間とともに過ごす日々をご紹介します。",
}

export default function SchoolLifePage() {
  return (
    <>
      <Header />
      <main>
        <div className="pt-24">
          <SchoolLifePageContent />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
