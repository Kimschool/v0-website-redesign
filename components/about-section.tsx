import Link from "next/link"
import { ArrowRight } from "lucide-react"

const features = [
  {
    title: "多国籍の仲間と喜ぶKCPの\nグローバルなことと出会える学び",
    description: "",
  },
  {
    title: "独自教材やバラエティ豊富な\n選択パラプログラムも提供",
    description: "",
  },
  {
    title: "アメリカな人、来自世界にはこに\nプログラムもあり",
    description: "",
  },
  {
    title: "充実した教育環境",
    description: "",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">About KCP</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-wide leading-relaxed">
            {"日本語だけじゃない"}
            <br />
            {"「進む力」を育てる"}
          </h2>
          <p className="mt-6 text-sm font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {"KCPには、世界中から集まっている「次の学び」と、それを支える豊かな環境がある。"}
          </p>
          <div className="mt-8 w-12 h-px bg-accent mx-auto" />
        </div>

        {/* Feature cards - 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="group">
              {/* Image placeholder */}
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-[#1a2332]/5 group-hover:bg-[#1a2332]/10 transition-colors" />
              </div>
              {/* Text */}
              <div className="mt-4">
                <p className="text-sm font-light text-muted-foreground leading-relaxed whitespace-pre-line">
                  {feature.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-14">
          <Link
            href="#about-detail"
            className="inline-flex items-center gap-3 px-10 py-3.5 border border-foreground text-foreground text-sm tracking-widest hover:bg-foreground hover:text-background transition-all"
          >
            {"KCPとは"}
          </Link>
        </div>
      </div>
    </section>
  )
}
