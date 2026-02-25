import { ArrowRight } from "lucide-react"
import Link from "next/link"

const points = [
  {
    number: "01",
    title: "コース紹介",
    subtitle: "一人ひとりの目標に合わせた最適なコースをご用意",
    cta: "コース紹介",
    href: "#courses",
  },
  {
    number: "02",
    title: "授業内容",
    subtitle: "実践的な日本語力を育む充実のカリキュラム",
    cta: "授業内容",
    href: "#classes",
  },
  {
    number: "03",
    title: "進学実績",
    subtitle: "有名大学・大学院への高い進学率を誇ります",
    cta: "進学実績",
    href: "#results",
  },
]

export function EducationSection() {
  return (
    <section id="education" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">Education</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-wide text-balance">
            {"教育内容とサポート体制"}
          </h2>
          <p className="mt-4 text-sm font-light text-muted-foreground max-w-lg mx-auto leading-relaxed">
            {"確かな日本語力と豊かな人間性を育む、充実の教育プログラム"}
          </p>
          <div className="mt-6 w-12 h-px bg-accent mx-auto" />
        </div>

        {/* Points grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {points.map((point) => (
            <div key={point.number} className="group relative overflow-hidden">
              {/* Image placeholder */}
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/50 transition-colors" />

                {/* Point badge */}
                <div className="absolute top-6 left-6 flex flex-col items-center justify-center w-14 h-14 rounded-full bg-foreground">
                  <span className="text-[9px] tracking-widest uppercase text-primary-foreground font-medium">
                    POINT
                  </span>
                  <span className="text-lg font-medium text-primary-foreground leading-none">
                    {point.number}
                  </span>
                </div>

                {/* Content over image */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-medium text-primary-foreground tracking-wide">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm font-light text-primary-foreground/80 leading-relaxed">
                    {point.subtitle}
                  </p>
                </div>
              </div>

              {/* CTA button */}
              <Link
                href={point.href}
                className="flex items-center justify-between px-6 py-4 bg-card border border-border group-hover:border-accent transition-colors"
              >
                <span className="text-sm font-light text-foreground">
                  {point.cta}
                </span>
                <ArrowRight className="h-4 w-4 text-accent group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
