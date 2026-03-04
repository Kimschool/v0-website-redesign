"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const courses = [
  {
    id: 1,
    title: "コース紹介",
    subtitle: "Course Introduction",
    description: "初級から上級まで、レベルに合わせた最適なコースをご用意しています。",
    image: "/images/course-intro.jpg",
    link: "#courses",
  },
  {
    id: 2,
    title: "授業内容",
    subtitle: "Curriculum",
    description: "実践的な日本語能力を身につける、充実したカリキュラム。",
    image: "/images/lesson-content.jpg",
    link: "#classes",
  },
  {
    id: 3,
    title: "進学実績",
    subtitle: "Achievements",
    description: "東大、早稲田、慶應など、有名大学への進学実績多数。",
    image: "/images/advancement.jpg",
    link: "#results",
  },
]

export function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="education" className="py-24 lg:py-32 bg-muted">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-sm font-medium text-primary mb-3">{"Education"}</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            {"教育内容とサポート体制"}
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
            {"KCPでは、質の高い教育と充実したサポート体制であなたの夢を応援します。"}
          </p>
        </div>

        {/* Course cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <Link
              key={course.id}
              href={course.link}
              className={`group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover-lift ${
                isVisible ? `animate-fade-in-up animation-delay-${(index + 1) * 100}` : "opacity-0"
              }`}
            >
              {/* Image */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover img-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-xs text-white/70 font-medium mb-1">{course.subtitle}</p>
                  <h3 className="text-xl font-bold text-white">{course.title}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {course.description}
                </p>
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                  <span>{"詳しく見る"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
