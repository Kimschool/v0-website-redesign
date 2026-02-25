import { Calendar, Users, Building2, MapPin } from "lucide-react"
import Link from "next/link"

const items = [
  { icon: Calendar, label: "年間スケジュール", href: "#schedule" },
  { icon: Users, label: "クラブ活動", href: "#clubs" },
  { icon: Building2, label: "施設案内", href: "#facilities" },
  { icon: MapPin, label: "アクセス・周辺環境", href: "#access" },
]

export function SchoolLifeSection() {
  return (
    <section id="school-life" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-accent font-medium mb-4">Campus Life</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-wide text-balance">
            {"学び、つながり、成長する毎日"}
          </h2>
          <p className="mt-4 text-sm font-light text-muted-foreground max-w-lg mx-auto leading-relaxed">
            {"学ぶことも、楽しむことも、全力で過ごせるキャンパスライフがここにある。"}
          </p>
          <div className="mt-6 w-12 h-px bg-accent mx-auto" />
        </div>

        {/* Icon grid */}
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex flex-col items-center gap-4 p-8 bg-card border border-border hover:border-accent transition-all"
            >
              <div className="w-12 h-12 flex items-center justify-center text-accent">
                <item.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <span className="text-sm font-light text-foreground text-center leading-snug">
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link
            href="#school-life-detail"
            className="inline-flex items-center gap-2 px-10 py-3.5 border border-foreground text-foreground text-sm tracking-widest hover:bg-foreground hover:text-background transition-colors"
          >
            {"学校生活"}
          </Link>
        </div>
      </div>
    </section>
  )
}
