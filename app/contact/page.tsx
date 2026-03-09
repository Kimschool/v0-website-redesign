import { Header } from "@/components/header"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata = {
  title: "お問い合わせ - KCP日本語学校",
  description: "KCP日本語学校へのお問い合わせ",
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
