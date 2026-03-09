import { Header } from "@/components/header"
import { TopAdmission } from "@/components/top-admission"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata = {
  title: "入学案内 - KCP日本語学校",
  description: "KCP日本語学校への入学方法や手続きについて",
}

export default function AdmissionPage() {
  return (
    <>
      <Header />
      <main>
        <TopAdmission />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
