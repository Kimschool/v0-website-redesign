import { Header } from "@/components/header"
import { ResultsPageContent } from "@/components/results-page-content"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata = {
  title: "進学実績・卒業生の声 - KCP地球市民日本語学校",
  description: "KCP地球市民日本語学校の進学実績一覧と卒業生の声をご紹介します。",
}

export default function ResultsPage() {
  return (
    <>
      <Header />
      <main>
        <div className="pt-24">
          <ResultsPageContent />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
