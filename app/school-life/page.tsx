import { Header } from "@/components/header"
import { SchoolLifePageContent } from "@/components/school-life-page-content"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata = {
  title: "School Life - KCP Global Citizen Japanese Language School",
  description: "Life at KCP extends beyond the classroom. Discover our events, club activities, and daily life with multinational peers.",
}

export default function SchoolLifePage() {
  return (
    <>
      <Header />
      <main>
        <div className="pt-24">
          <SchoolLifePageContent />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
