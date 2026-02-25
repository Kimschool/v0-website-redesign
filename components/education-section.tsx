import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function EducationSection() {
  return (
    <section id="education" className="bg-background">
      {/* Section heading */}
      <div className="py-20 lg:py-24 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">Education</p>
        <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-wide text-balance">
          {"教育内容とサポート体制"}
        </h2>
        <p className="mt-4 text-sm font-light text-muted-foreground max-w-lg mx-auto leading-relaxed">
          {"教育方針的なスローガンを入れるが、文章は未定"}
        </p>
        <div className="mt-6 w-12 h-px bg-accent mx-auto" />
      </div>

      {/* POINT 1 - Full width image with left-aligned text */}
      <div className="relative min-h-[480px] lg:min-h-[560px] overflow-hidden">
        {/* Image placeholder - full width */}
        <div className="absolute inset-0 bg-[#3a4a5a]">
          <div className="absolute inset-0 bg-[#1a2332]/40" />
        </div>
        {/* Content - left side */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:py-24 flex items-center min-h-[480px] lg:min-h-[560px]">
          <div className="max-w-md">
            {/* Point badge */}
            <div className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-foreground mb-6">
              <span className="text-[9px] tracking-widest uppercase text-[#faf9f7] font-medium">
                POINT
              </span>
              <span className="text-xl font-medium text-[#faf9f7] leading-none">1</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-medium text-[#faf9f7] tracking-wide mb-3">
              {"コース紹介1"}
            </h3>
            <p className="text-sm font-light text-[#faf9f7]/80 leading-relaxed mb-8">
              {"コース紹介2"}
            </p>
            <Link
              href="#courses"
              className="inline-flex items-center gap-3 px-8 py-3 border border-[#faf9f7]/50 text-[#faf9f7] text-sm tracking-wider hover:bg-[#faf9f7]/10 transition-all"
            >
              {"コース紹介"}
            </Link>
          </div>
        </div>
      </div>

      {/* POINT 2 - Full width image with right-aligned text */}
      <div className="relative min-h-[480px] lg:min-h-[560px] overflow-hidden">
        {/* Image placeholder */}
        <div className="absolute inset-0 bg-[#4a5a6a]">
          <div className="absolute inset-0 bg-[#1a2332]/40" />
        </div>
        {/* Content - right side */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:py-24 flex items-center justify-end min-h-[480px] lg:min-h-[560px]">
          <div className="max-w-md text-right">
            {/* Point badge */}
            <div className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-foreground mb-6 ml-auto">
              <span className="text-[9px] tracking-widest uppercase text-[#faf9f7] font-medium">
                POINT
              </span>
              <span className="text-xl font-medium text-[#faf9f7] leading-none">2</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-medium text-[#faf9f7] tracking-wide mb-3">
              {"授業内容1"}
            </h3>
            <p className="text-sm font-light text-[#faf9f7]/80 leading-relaxed mb-8">
              {"授業内容2"}
            </p>
            <Link
              href="#classes"
              className="inline-flex items-center gap-3 px-8 py-3 border border-[#faf9f7]/50 text-[#faf9f7] text-sm tracking-wider hover:bg-[#faf9f7]/10 transition-all"
            >
              {"授業内容"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
