import { Header } from "@/components/header"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata = {
  title: "KCPとは | KCP地球市民日本語学校",
  description: "KCP地球市民日本語学校について、学校の理念や沿革、サポート体制をご紹介します。",
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutSection />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
