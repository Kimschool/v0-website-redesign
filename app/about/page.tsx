import { Header } from "@/components/header"
import { TopAbout } from "@/components/top-about"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata = {
  title: "KCPとは - KCP日本語学校",
  description: "KCP日本語学校についての詳細情報",
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <TopAbout />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
