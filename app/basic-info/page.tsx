import { Header } from "@/components/header"
import { BasicInfoSection } from "@/components/basic-info-section"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata = {
  title: "情報公開 | KCP地球市民日本語学校",
  description: "KCP地球市民日本語学校の基本情報および情報公開ページです。",
}

export default function BasicInfoPage() {
  return (
    <>
      <Header />
      <main>
        <div className="pt-24">
          <BasicInfoSection />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
