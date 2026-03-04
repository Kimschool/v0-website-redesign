import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ReasonsSection } from "@/components/reasons-section"
import { FeaturesSection } from "@/components/features-section"
import { EducationSection } from "@/components/education-section"
import { TestimonialsSection } from "@/components/testimonials-section"
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
        <AboutSection />
        <ReasonsSection />
        <FeaturesSection />
        <EducationSection />
        <TestimonialsSection />
        <SchoolLifeSection />
        <SongsSection />
        <CTASection />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
