import Image from "next/image"
import { Clock } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0" aria-label="Hero background image">
        <Image src="/images/main.png" alt="Hero background" fill className="object-cover" priority />
      </div>

      {/* Center overlay */}
      <div className="absolute inset-0 bg-[#1a2332]/20" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-[#faf9f7] tracking-wider leading-tight text-balance drop-shadow-lg">
          {"ともにまなび ともに生きる"}
        </h1>
        <div className="mt-8 w-20 h-px bg-accent mx-auto" />
      </div>

      {/* News ticker at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-3.5 flex items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground shrink-0">
            <Clock className="h-3.5 w-3.5" />
            <span className="text-xs tracking-wide">2025.11.04</span>
          </div>
          <p className="text-sm font-light text-foreground truncate">
            {"KCP地球市民日本語学校が「認定日本語教育機関」に認定さ..."}
          </p>
        </div>
      </div>
    </section>
  )
}
