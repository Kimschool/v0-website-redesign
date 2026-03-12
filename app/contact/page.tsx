import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata = {
  title: "お問い合わせ | KCP地球市民日本語学校",
  description: "KCP地球市民日本語学校へのお問い合わせ。入学案内、資料請求、その他ご質問がございましたら、こちらからお気軽にお問い合わせください。"
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24">
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
