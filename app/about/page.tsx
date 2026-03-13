import { Header } from "@/components/header"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata = {
  title: "About KCP - KCP Global Citizen Japanese Language School",
  description: "Learn about KCP Global Citizen Japanese Language School, our philosophy, history, and support system.",
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <div className="pt-24">
          <AboutSection />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
