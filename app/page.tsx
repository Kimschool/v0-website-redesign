// import { LoadingScreen } from "@/components/loading-screen"
import { Header } from "@/components/header"
// import { HeroSection } from "@/components/hero-section"
// import { NewsSection } from "@/components/news-section"
// import { FeaturesSection } from "@/components/features-section"
import { EducationPointsSection } from "@/components/education-points-section"
// import { SchoolLifeSection } from "@/components/school-life-section"
import { SongsSection } from "@/components/songs-section"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function Home() {
  return (
    <>
      
      <Header />
      <main>

        
        
        <EducationPointsSection />
        <SongsSection />
        
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
