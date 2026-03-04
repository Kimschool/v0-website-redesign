"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Sparkles, Users, Briefcase } from "lucide-react"
import Image from "next/image"

const reasons = [
  {
    id: 1,
    icon: Sparkles,
    title: "あなたの「好き」を大切に、\n今すぐオンラインでスタートできる。",
    description: "KCPでは、オンラインでも対面でも、あなたのペースで学習を進められます。忙しい方も、遠方の方も、どこからでも質の高い日本語教育を受けられます。",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2025/11/EJU.jpg",
  },
  {
    id: 2,
    icon: Users,
    title: "好きなことを「手に職」にする\n使いやすいツールがあなたをサポート",
    description: "最新のeラーニングシステムと、経験豊富な講師陣があなたの学習をサポート。進捗管理から質問対応まで、充実したサポート体制を整えています。",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2025/07/31e0362326d434d6dbc1d2390aa01eff.jpg",
  },
  {
    id: 3,
    icon: Briefcase,
    title: "オンラインの力を最大化\n機能を活かしてサービスの幅が広がる！",
    description: "日本語能力だけでなく、日本でのキャリア形成もサポート。就職支援から進学相談まで、あなたの未来を全力でバックアップします。",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2025/11/c6d0b891872831f84c0c747a5da2a261.jpg",
  },
]

export function ReasonsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reasons.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + reasons.length) % reasons.length)
  }

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-gradient-cyan text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <div className={`text-center mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-sm font-medium text-cyan-200 mb-3">{"Why KCP"}</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {"選ばれる3つの理由"}
          </h2>
          <p className="mt-4 text-base text-white/80 max-w-xl mx-auto">
            {"理由1、理由2、理由3、理由4を入れて説明。KCPが「ユーザー」にとって何がいいのかを説明します。"}
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          <div className={`flex items-center gap-12 ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
            {/* Left - Image */}
            <div className="hidden lg:block w-1/2 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src={reasons[currentSlide].image}
                  alt={reasons[currentSlide].title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>
            </div>

            {/* Right - Content */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-2xl p-8 lg:p-10 text-foreground shadow-xl">
                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  {(() => {
                    const IconComponent = reasons[currentSlide].icon
                    return <IconComponent className="w-8 h-8 text-primary" />
                  })()}
                </div>

                <h3 className="text-xl lg:text-2xl font-bold text-foreground leading-snug whitespace-pre-line mb-4">
                  {reasons[currentSlide].title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {reasons[currentSlide].description}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {reasons.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`carousel-dot ${currentSlide === index ? "active !bg-white" : "!bg-white/30"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
