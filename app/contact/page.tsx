import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata = {
  title: "Contact - KCP Global Citizen Japanese Language School",
  description: "Contact KCP Global Citizen Japanese Language School for admission inquiries, brochure requests, and other questions."
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24">
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
