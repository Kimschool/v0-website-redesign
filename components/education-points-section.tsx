"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, GraduationCap, BookOpen, Trophy } from "lucide-react"

const admissionHighlights = [
  {
    category: "国公立大学/大学院",
    subtitle: "主な合格先",
    color: "#0085b2",
    icon: GraduationCap,
    schools: ["東京大学", "京都大学", "大阪大学", "一橋大学", "東京工業大学"],
  },
  {
    category: "私立大学/大学院",
    subtitle: "主な合格先",
    color: "#0cc0df",
    icon: BookOpen,
    schools: ["早稲田大学", "慶應義塾大学", "上智大学", "明治大学", "青山学院大学"],
  },
  {
    category: "芸術系・音楽系",
    subtitle: "大学/大学院 主な合格先",
    color: "#22d3ee",
    icon: Trophy,
    schools: ["東京藝術大学", "多摩美術大学", "武蔵野美術大学", "京都市立芸術大学", "愛知県立芸術大学"],
  },
]

export function EducationPointsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-muted/50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      
      <div className="mx-auto max-w-7xl px-6 relative">
        {/* Section heading */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          {/* Section badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            EDUCATION
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-serif">
            教育内容
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            目標達成のための充実したカリキュラムと手厚いサポート
          </p>
        </div>

        {/* POINT 1 */}
        <div className={`mb-20 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-bold text-white bg-gradient-to-r from-primary to-primary/80 px-4 py-2 rounded-full shadow-lg shadow-primary/20">POINT 1</span>
            <h3 className="text-2xl md:text-3xl font-bold font-serif">コース紹介</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="aspect-[16/10] relative rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src={`/images/original_from_customer/${encodeURIComponent('トップページ「コース紹介」')}.jpg`}
                alt="コース紹介"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="lg:pl-4">
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                KCPでは、学生一人ひとりの目標に合わせた多様なコースを用意しています。
                大学進学、大学院進学、専門学校進学、就職など、それぞれの進路に最適なカリキュラムで学べます。
              </p>
              <Link href="/education#course1" className="group inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                詳細を見る <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* POINT 2 */}
        <div className={`mb-20 ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-bold text-white bg-gradient-to-r from-primary to-primary/80 px-4 py-2 rounded-full shadow-lg shadow-primary/20">POINT 2</span>
            <h3 className="text-2xl md:text-3xl font-bold font-serif">授業内容</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="lg:order-2 aspect-[16/10] relative rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src={`/images/original_from_customer/${encodeURIComponent('トップページ「授業内容」')}.jpg`}
                alt="授業内容"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="lg:order-1 lg:pr-4">
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                経験豊富な教師陣による質の高い授業。EJU対策、JLPT対策はもちろん、
                実践的なコミュニケーション能力を重視した授業を展開しています。
              </p>
              <Link href="/education#course2" className="group inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                詳細を見る <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* POINT 3 - 進学実績ハイライト */}
        <div className={`${isVisible ? "animate-fade-in-up animation-delay-400" : "opacity-0"}`}>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-bold text-white bg-gradient-to-r from-primary to-primary/80 px-4 py-2 rounded-full shadow-lg shadow-primary/20">POINT 3</span>
            <h3 className="text-2xl md:text-3xl font-bold font-serif">進学実績</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed text-lg max-w-3xl mb-10">
            KCPの卒業生は、国公立大学、難関私立大学、芸術系・音楽系大学など、国内有数の大学・大学院へ多数進学しています。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {admissionHighlights.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={item.category}
                  className={`relative rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col h-full border border-border/50 card-glow overflow-hidden group ${
                    isVisible ? `animate-fade-in-up animation-delay-${(index + 5) * 100}` : "opacity-0"
                  }`}
                >
                  {/* Top accent bar */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
                    style={{ backgroundColor: item.color }}
                  />
                  
                  <div className="flex items-start gap-4 mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: item.color }} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-foreground">
                        {item.category}
                      </h4>
                      <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mb-4 flex-1">
                    {item.schools.map((name) => (
                      <li key={name} className="flex items-center gap-2 text-sm text-foreground">
                        <span 
                          className="w-1.5 h-1.5 rounded-full shrink-0" 
                          style={{ backgroundColor: item.color }} 
                        />
                        {name}
                      </li>
                    ))}
                  </ul>
                  
                  <p className="text-xs text-muted-foreground pt-4 border-t border-border/50">
                    上記は代表的な合格先の一部です
                  </p>
                </div>
              )
            })}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/education#course3"
              className="group inline-flex items-center gap-3 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold text-base px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              進学実績をもっと見る
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
