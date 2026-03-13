import { Header } from "@/components/header"
import { EducationSection } from "@/components/education-section"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata = {
  title: "Education - KCP Global Citizen Japanese Language School",
  description: "High-quality Japanese language education for students from around the world, supporting their dreams through solid language skills and personalized career guidance.",
}

export default function EducationPage() {
  return (
    <>
      <Header />
      <main>
        <div className="pt-24">
          <EducationSection />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
