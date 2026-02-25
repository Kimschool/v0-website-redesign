"use client"

import { useEffect, useState } from "react"
import { ChevronUp } from "lucide-react"

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" })

  if (!visible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  )
}
