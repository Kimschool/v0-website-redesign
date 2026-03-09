"use client"

import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-white">
      {/* Header Slider */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://weavus-group.com/kcp/wp-content/uploads/2025/10/Gemini_Generated_Image_gvy5fhgvy5fhgvy5.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-noto-sans-jp">
            <span className="inline-block animate-fade-in">と</span>
            <span className="inline-block animate-fade-in" style={{ animationDelay: "0.1s" }}>も</span>
            <span className="inline-block animate-fade-in" style={{ animationDelay: "0.2s" }}>に</span>
            <span className="inline-block animate-fade-in" style={{ animationDelay: "0.3s" }}>ま</span>
            <span className="inline-block animate-fade-in" style={{ animationDelay: "0.4s" }}>な</span>
            <span className="inline-block animate-fade-in" style={{ animationDelay: "0.5s" }}>び</span>
            <span className="inline-block animate-fade-in mx-2" style={{ animationDelay: "0.6s" }}></span>
            <br />
            <span className="inline-block animate-fade-in" style={{ animationDelay: "0.7s" }}>と</span>
            <span className="inline-block animate-fade-in" style={{ animationDelay: "0.8s" }}>も</span>
            <span className="inline-block animate-fade-in" style={{ animationDelay: "0.9s" }}>に</span>
            <span className="inline-block animate-fade-in" style={{ animationDelay: "1s" }}>生</span>
            <span className="inline-block animate-fade-in" style={{ animationDelay: "1.1s" }}>き</span>
            <span className="inline-block animate-fade-in" style={{ animationDelay: "1.2s" }}>る</span>
          </h2>
        </div>
      </div>
    </section>
  )
}
