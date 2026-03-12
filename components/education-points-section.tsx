"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const chartData = [
  { name: "進学", value: 50, color: "#41962e" },
  { name: "就職", value: 40, color: "#db728e" },
  { name: "その他", value: 10, color: "#dd9933" },
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

        {/* POINT 3 - with donut chart */}
        <div className={`${isVisible ? "animate-fade-in-up animation-delay-400" : "opacity-0"}`}>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-bold text-white bg-[#0085b2] px-4 py-1 rounded">POINT 3</span>
            <h3 className="text-2xl md:text-3xl font-bold">進学実績</h3>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-muted-foreground leading-relaxed text-center max-w-2xl mb-8">
              KCPの卒業生は、有名大学・大学院への進学をはじめ、様々な分野で活躍しています。
            </p>
            <Link href="/education#course3" className="inline-flex items-center gap-2 text-primary font-medium hover:underline mb-6">
              詳細を見る <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="w-full max-w-md">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    animationBegin={isVisible ? 0 : 99999}
                    animationDuration={1500}
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
                      const RADIAN = Math.PI / 180
                      const radius = innerRadius + (outerRadius - innerRadius) * 0.5
                      const x = cx + radius * Math.cos(-midAngle * RADIAN)
                      const y = cy + radius * Math.sin(-midAngle * RADIAN)
                      return (
                        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight="bold">
                          {value}%
                        </text>
                      )
                    }}
                    labelLine={false}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  {/* Center label */}
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fontSize={16} fontWeight="bold" fill="#333">
                    進学実績
                  </text>
                </PieChart>
              </ResponsiveContainer>
              {/* Legend */}
              <div className="flex justify-center gap-6 mt-4">
                {chartData.map((entry) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: entry.color }} />
                    <span className="text-sm text-muted-foreground">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
