import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { EducationSection } from "@/components/education-section"
import { SchoolLifeSection } from "@/components/school-life-section"
import { SongsSection } from "@/components/songs-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <EducationSection />
        <SchoolLifeSection />
        <SongsSection />
        <CTASection />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
