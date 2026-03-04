"use client"

import { useEffect, useRef, useState } from "react"
import { 
  GraduationCap, 
  Users, 
  Globe, 
  Building2, 
  Calendar, 
  Award,
  BookOpen,
  HeartHandshake
} from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: GraduationCap,
    title: "進学サポート体制",
    description: "大学・大学院進学を徹底サポート",
  },
  {
    icon: Users,
    title: "少人数制クラス",
    description: "きめ細かい指導が可能",
  },
  {
    icon: Globe,
    title: "多国籍環境",
    description: "世界中の仲間と学ぶ",
  },
  {
    icon: Building2,
    title: "充実した施設",
    description: "最新設備の学習環境",
  },
  {
    icon: Calendar,
    title: "豊富な課外活動",
    description: "日本文化を体験",
  },
  {
    icon: Award,
    title: "高い合格実績",
    description: "有名大学への進学実績多数",
  },
  {
    icon: BookOpen,
    title: "オリジナル教材",
    description: "効率的な学習カリキュラム",
  },
  {
    icon: HeartHandshake,
    title: "生活サポート",
    description: "住居・ビザなど全面支援",
  },
]

export function FeaturesSection() {
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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-sm font-medium text-primary mb-3">{"Features"}</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            {"高機能なシステムで管理もラクラク"}
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
            {"理由1、理由2、理由3、理由4を入れて説明。KCPが「ユーザー」にとって何がいいのかを説明します。"}
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group text-center p-6 rounded-xl border border-border hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover-lift ${
                isVisible ? `animate-fade-in-up animation-delay-${Math.min((index + 1) * 100, 600)}` : "opacity-0"
              }`}
            >
              <div className="w-14 h-14 mx-auto rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-primary group-hover:text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-12 ${isVisible ? "animate-fade-in-up animation-delay-600" : "opacity-0"}`}>
          <Link
            href="#features-detail"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-foreground text-foreground text-sm font-medium rounded-full hover:bg-foreground hover:text-white transition-all duration-200"
          >
            {"詳しく見る"}
          </Link>
        </div>
      </div>
    </section>
  )
}
