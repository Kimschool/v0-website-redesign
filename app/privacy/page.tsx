import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { PrivacyPolicySection } from "@/components/privacy-policy-section"

export const metadata = {
  title: "プライバシーポリシー | KCP地球市民日本語学校",
  description:
    "KCP地球市民日本語学校のウェブサイトにおける個人情報の取扱いについて定めたプライバシーポリシーです。",
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        <PrivacyPolicySection />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
