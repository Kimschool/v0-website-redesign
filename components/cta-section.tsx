import { ArrowRight, FileText, HelpCircle } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section id="admission" className="relative py-0 overflow-hidden">
      {/* Background - image collage placeholder */}
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6" aria-label="CTA background images">
        <div className="bg-[#2a3a4a]" />
        <div className="bg-[#3a4a5a]" />
        <div className="bg-[#4a5a6a]" />
        <div className="bg-[#3a4a5a] hidden md:block" />
        <div className="bg-[#2a3a4a] hidden lg:block" />
        <div className="bg-[#4a5a6a] hidden lg:block" />
      </div>
      <div className="absolute inset-0 bg-[#1a2332]/30" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Admission Guide */}
          <Link
            href="#admission-detail"
            className="group flex items-start gap-6 p-8 bg-card/95 backdrop-blur-sm border border-border hover:border-accent transition-all"
          >
            <div className="shrink-0 w-14 h-14 flex items-center justify-center rounded-full border border-accent text-accent">
              <FileText className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-foreground tracking-wide">
                {"入学案内"}
              </h3>
              <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed">
                {"入学手続きに関する詳細情報を確認いただけます。ご不明な点は、いつでもご相談ください。"}
              </p>
              <div className="mt-4 flex items-center gap-2 text-accent text-sm font-light">
                <span>{"詳しく見る"}</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Contact */}
          <Link
            href="#contact"
            className="group flex items-start gap-6 p-8 bg-card/95 backdrop-blur-sm border border-border hover:border-accent transition-all"
          >
            <div className="shrink-0 w-14 h-14 flex items-center justify-center rounded-full border border-accent text-accent">
              <HelpCircle className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-foreground tracking-wide">
                {"お問い合わせ"}
              </h3>
              <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed">
                {"証明書の発行、その他のお問い合わせ、よくある質問はこちらをクリックしてください。"}
              </p>
              <div className="mt-4 flex items-center gap-2 text-accent text-sm font-light">
                <span>{"お問い合わせ"}</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
