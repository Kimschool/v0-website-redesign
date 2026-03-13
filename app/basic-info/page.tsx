import { Header } from "@/components/header"
import { BasicInfoSection } from "@/components/basic-info-section"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata = {
  title: "Information Disclosure - KCP Global Citizen Japanese Language School",
  description: "Basic information and public disclosure page for KCP Global Citizen Japanese Language School.",
}

export default function BasicInfoPage() {
  return (
    <>
      <Header />
      <main>
        <div className="pt-24">
          <BasicInfoSection />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
