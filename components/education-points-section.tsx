"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
const admissionHighlights = [
  {
    category: "国公立大学/大学院 主な合格先",
    color: "#0085b2",
    schools: ["東京大学", "京都大学", "大阪大学", "一橋大学", "東京工業大学"],
  },
  {
    category: "私立大学/大学院 主な合格先",
    color: "#db728e",
    schools: ["早稲田大学", "慶應義塾大学", "上智大学", "明治大学", "青山学院大学"],
  },
  {
    category: "芸術系・音楽系大学/大学院 主な合格先",
    color: "#41962e",
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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-[#f2f2f2]">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            教育内容
          </h2>
        </div>

        {/* POINT 1 */}
        <div className={`mb-20 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-bold text-white bg-[#0085b2] px-4 py-1 rounded">POINT 1</span>
            <h3 className="text-2xl md:text-3xl font-bold">コース紹介</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="aspect-[16/10] relative rounded-lg overflow-hidden">
              <Image
                src="/images/original_from_customer/トップページ「コース紹介」.jpg"
                alt="コース紹介"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                KCPでは、学生一人ひとりの目標に合わせた多様なコースを用意しています。
                大学進学、大学院進学、専門学校進学、就職など、それぞれの進路に最適なカリキュラムで学べます。
              </p>
              <Link href="/education#course1" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                詳細を見る <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* POINT 2 */}
        <div className={`mb-20 ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-bold text-white bg-[#0085b2] px-4 py-1 rounded">POINT 2</span>
            <h3 className="text-2xl md:text-3xl font-bold">授業内容</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="md:order-2 aspect-[16/10] relative rounded-lg overflow-hidden">
              <Image
                src="/images/original_from_customer/トップページ「授業内容」.jpg"
                alt="授業内容"
                fill
                className="object-cover"
              />
            </div>
            <div className="md:order-1">
              <p className="text-muted-foreground leading-relaxed mb-4">
                経験豊富な教師陣による質の高い授業。EJU対策、JLPT対策はもちろん、
                実践的なコミュニケーション能力を重視した授業を展開しています。
              </p>
              <Link href="/education#course2" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                詳細を見る <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* POINT 3 - 進学実績ハイライト */}
        <div className={`${isVisible ? "animate-fade-in-up animation-delay-400" : "opacity-0"}`}>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-bold text-white bg-[#0085b2] px-4 py-1 rounded">POINT 3</span>
            <h3 className="text-2xl md:text-3xl font-bold">進学実績</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed max-w-3xl mb-8">
            KCPの卒業生は、国公立大学、難関私立大学、芸術系・音楽系大学など、国内有数の大学・大学院へ多数進学しています。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {admissionHighlights.map((item) => (
              <div
                key={item.category}
                className="rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col h-full border border-gray-100"
              >
                <h4
                  className="text-xs font-semibold tracking-wide text-white inline-flex px-3 py-1 rounded-full mb-4"
                  style={{ backgroundColor: item.color }}
                >
                  {item.category}
                </h4>
                <ul className="space-y-1.5 mb-3 text-sm text-gray-900">
                  {item.schools.map((name) => (
                    <li key={name}>・{name}</li>
                  ))}
                </ul>
                <p className="mt-auto text-xs text-muted-foreground">
                  上記は代表的な合格先の一部です。このほかにも多数の大学・大学院への進学実績があります。
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/education#course3"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              詳細を見る <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
