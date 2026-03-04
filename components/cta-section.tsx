"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, FileText, HelpCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="admission" className="relative py-0 overflow-hidden">
      {/* Background - Image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/advancement.jpg"
          alt="入学案内"
          fill
          className="object-cover"
        />
        {/* Gradient overlay for depth and readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/80 to-primary/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-8 py-32 lg:py-44">
        {/* Section header */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-xs tracking-[0.4em] uppercase text-accent font-medium mb-5">Get Started</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-[#faf9f7] tracking-wider text-balance">
            {"KCPで学びを始めよう"}
          </h2>
          <div className="mt-10 elegant-divider w-20 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Admission Guide */}
          <Link
            href="#admission-detail"
            className={`group flex items-start gap-7 p-10 bg-card/98 backdrop-blur-md border border-border/50 hover:border-accent hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 rounded-xl hover-lift ${
              isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"
            }`}
          >
            <div className="shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-[#faf9f7] transition-all duration-300">
              <FileText className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-medium text-foreground tracking-wider">
                {"入学案内"}
              </h3>
              <p className="mt-4 text-base font-light text-muted-foreground leading-loose tracking-wide">
                {"入学手続きに関する詳細情報を確認いただけます。ご不明な点は、いつでもご相談ください。"}
              </p>
              <div className="mt-6 flex items-center gap-2 text-accent text-sm font-medium tracking-wide">
                <span>{"詳しく見る"}</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>
          </Link>

          {/* Contact */}
          <Link
            href="#contact"
            className={`group flex items-start gap-7 p-10 bg-card/98 backdrop-blur-md border border-border/50 hover:border-accent hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 rounded-xl hover-lift ${
              isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"
            }`}
          >
            <div className="shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-[#faf9f7] transition-all duration-300">
              <HelpCircle className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-medium text-foreground tracking-wider">
                {"お問い合わせ"}
              </h3>
              <p className="mt-4 text-base font-light text-muted-foreground leading-loose tracking-wide">
                {"証明書の発行、その他のお問い合わせ、よくある質問はこちらをクリックしてください。"}
              </p>
              <div className="mt-6 flex items-center gap-2 text-accent text-sm font-medium tracking-wide">
                <span>{"お問い合わせ"}</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
