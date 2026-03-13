import { Header } from "@/components/header"
import { ResultsPageContent } from "@/components/results-page-content"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata = {
  title: "Academic Results and Alumni Voices - KCP Global Citizen Japanese Language School",
  description: "Academic achievements and testimonials from graduates of KCP Global Citizen Japanese Language School.",
}

export default function ResultsPage() {
  return (
    <>
      <Header />
      <main>
        <div className="pt-24">
          <ResultsPageContent />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
