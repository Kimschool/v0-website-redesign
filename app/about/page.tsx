import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { AboutContent } from "@/components/about-content"

export const metadata = {
  title: "KCPとは - KCP日本語学校",
  description: "KCP日本語学校についての詳細情報",
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutContent />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
