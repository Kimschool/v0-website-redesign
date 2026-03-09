import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { NewsTickerSection } from "@/components/news-ticker-section"
import { CarouselSection } from "@/components/carousel-section"
import { SellingPointsSection } from "@/components/selling-points-section"
import { SchoolLifeCardsSection } from "@/components/school-life-cards-section"
import { SongsSection } from "@/components/songs-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <NewsTickerSection />
        <CarouselSection />
        <SellingPointsSection />
        <SchoolLifeCardsSection />
        <SongsSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
