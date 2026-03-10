import { Header } from "@/components/header"
import { AdmissionSection } from "@/components/admission-section"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata = {
  title: "入学案内 - KCP地球市民日本語学校",
  description: "KCPへの入学手続きは、お住まいの国・地域の海外提携事務所を通じて行われます。出願からビザ取得、渡日前の準備まで幅広くサポートしていますので、入学をご希望の方は、まずお近くの海外事務所までお問い合わせください。",
}

export default function AdmissionPage() {
  return (
    <>
      <Header />
      <main>
        <AdmissionSection />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
