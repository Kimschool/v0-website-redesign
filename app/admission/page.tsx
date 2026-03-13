import { Header } from "@/components/header"
import { AdmissionSection } from "@/components/admission-section"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata = {
  title: "Admission - KCP Global Citizen Japanese Language School",
  description: "Admission procedures for KCP are handled through overseas partner offices in your country or region.",
}

export default function AdmissionPage() {
  return (
    <>
      <Header />
      <main>
        <div className="pt-24">
          <AdmissionSection />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
