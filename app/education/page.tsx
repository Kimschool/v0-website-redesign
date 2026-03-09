import { Header } from "@/components/header"
import { TopEducation } from "@/components/top-education"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata = {
  title: "教育内容 - KCP地球市民日本語学校",
  description: "世界から集う若者に、質の高い日本語教育を。確かな日本語力ときめ細かな進路指導で夢の実現を支えていきます。",
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
