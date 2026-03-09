import { Header } from "@/components/header"
import { TopSchoolLife } from "@/components/top-school-life"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata = {
  title: "学校生活 - KCP日本語学校",
  description: "KCP日本語学校での学校生活について",
}

export default function SchoolLifePage() {
  return (
    <>
      <Header />
      <main>
        <TopSchoolLife />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
