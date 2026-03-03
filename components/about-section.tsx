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

        {/* Feature slider - left scrolling */}
        <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
          <div className="about-slider-track flex w-max gap-6">
            {[...features, ...features].map((feature, index) => (
              <div key={`${feature.title}-${index}`} className="w-[360px] shrink-0 group">
                {index % 2 === 0 ? (
                  <>
                    <div className="aspect-[3/4] bg-muted relative overflow-hidden rounded-3xl">
                      <img
                        src={feature.image}
                        alt={feature.title.replace(/\n/g, " ")}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-[#1a2332]/5 group-hover:bg-[#1a2332]/10 transition-colors" />
                    </div>
                    <div className="mt-6 text-center">
                      <p className="text-sm md:text-base font-light text-foreground leading-relaxed whitespace-pre-line">
                        {feature.title}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-6 text-center">
                      <p className="text-sm md:text-base font-light text-foreground leading-relaxed whitespace-pre-line">
                        {feature.title}
                      </p>
                    </div>
                    <div className="aspect-[3/4] bg-muted relative overflow-hidden rounded-3xl">
                      <img
                        src={feature.image}
                        alt={feature.title.replace(/\n/g, " ")}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-[#1a2332]/5 group-hover:bg-[#1a2332]/10 transition-colors" />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
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
