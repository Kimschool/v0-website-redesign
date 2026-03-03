"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

const features = [
  {
    title: "EJU・日本語科目で最高得点者を輩出",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2025/11/EJU.jpg",
  },
  {
    title: "多国籍の学生が集うKCPで\nグローバルに考える視点を養う",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2025/07/31e0362326d434d6dbc1d2390aa01eff.jpg",
  },
  {
    title: "日本をより深く知るための\n楽しいプログラムも満載",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2025/11/2aaf315dd8c8254983b5ed098691efcd-rotated.jpg",
  },
  {
    title: "経験豊かなベテラン教師が\nきめ細かい指導",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2025/11/1f9820d2152d8e9bcc962b8600ef019d.jpg",
  },
  {
    title: "アメリカの大学の単位認定\nプログラムもあり",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2025/11/c6d0b891872831f84c0c747a5da2a261.jpg",
  },
  {
    title: "公共性の高い教育機関として\n公的に認知",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2025/07/f3680d56ae6dfb979b5be7961e73155c.jpg",
  },
  {
    title: "充実した教育設備",
    image: "https://weavus-group.com/kcp/wp-content/uploads/2025/07/1c279b72c09a930d753cc9f263d78c88.jpg",
  },
]

export function AboutSection() {
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
    <section ref={sectionRef} id="about" className="py-32 lg:py-44 bg-background">
      <div className="mx-auto max-w-7xl px-8">
        {/* Section heading */}
        <div className={`text-center mb-24 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-xs tracking-[0.4em] uppercase text-accent font-medium mb-5">About KCP</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-wider leading-relaxed">
            {"日本語だけじゃない"}
            <br />
            {"「進む力」を育てる"}
          </h2>
          <p className="mt-8 text-base font-light text-muted-foreground max-w-2xl mx-auto leading-loose tracking-wide">
            {"KCPには、世界中から集まっている「次の学び」と、それを支える豊かな環境がある。"}
          </p>
          <div className="mt-10 elegant-divider w-20 mx-auto" />
        </div>

        {/* Feature slider - left scrolling */}
        <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
          <div className="about-slider-track flex w-max gap-8">
            {[...features, ...features].map((feature, index) => (
              <div key={`${feature.title}-${index}`} className="w-[380px] shrink-0 group">
                {index % 2 === 0 ? (
                  <>
                    <div className="aspect-[3/4] bg-muted relative overflow-hidden rounded-2xl shadow-lg">
                      <img
                        src={feature.image}
                        alt={feature.title.replace(/\n/g, " ")}
                        loading="lazy"
                        className="w-full h-full object-cover img-zoom"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a2332]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="mt-8 text-center">
                      <p className="text-base font-light text-foreground leading-relaxed whitespace-pre-line tracking-wide">
                        {feature.title}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-8 text-center">
                      <p className="text-base font-light text-foreground leading-relaxed whitespace-pre-line tracking-wide">
                        {feature.title}
                      </p>
                    </div>
                    <div className="aspect-[3/4] bg-muted relative overflow-hidden rounded-2xl shadow-lg">
                      <img
                        src={feature.image}
                        alt={feature.title.replace(/\n/g, " ")}
                        loading="lazy"
                        className="w-full h-full object-cover img-zoom"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a2332]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className={`text-center mt-20 ${isVisible ? "animate-fade-in-up animation-delay-300" : "opacity-0"}`}>
          <Link
            href="#about-detail"
            className="inline-flex items-center gap-3 px-12 py-4 border border-foreground text-foreground text-sm tracking-[0.2em] hover:bg-foreground hover:text-background transition-all duration-300 hover-lift rounded-sm"
          >
            {"KCPとは"}
          </Link>
        </div>
      </div>
    </section>
  )
}
