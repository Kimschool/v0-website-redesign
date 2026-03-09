import { Header } from "@/components/header"
import { TopEducation } from "@/components/top-education"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata = {
  title: "教育内容 - KCP日本語学校",
  description: "KCP日本語学校の教育プログラムについて",
}

export default function EducationPage() {
  return (
    <>
      <Header />
      <main>
        <TopEducation />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
