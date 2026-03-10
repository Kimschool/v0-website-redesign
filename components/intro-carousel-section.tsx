"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const carouselItems = [
  {
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/eju-top-score.jpg",
    caption: "EJU・日本語科目で最高得点者を輩出",
  },
  {
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/multinational-students.jpg",
    caption: "多国籍の学生が集うKCPでグローバルに考える視点を養う",
  },
  {
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/fun-programs.jpg",
    caption: "日本をより深く知るための楽しいプログラムも満載",
  },
  {
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/veteran-teachers.jpg",
    caption: "経験豊かなベテラン教師がきめ細かい指導",
  },
  {
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/us-university-credits.jpg",
    caption: "アメリカの大学の単位認定プログラムもあり",
  },
  {
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/public-recognition.jpg",
    caption: "公共性の高い教育機関として公的に認知",
  },
  {
    image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/facilities.jpg",
    caption: "充実した教育設備",
  },
]

export function IntroCarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    )
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    )
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-relaxed">
            日本語だけじゃない
            <br />
            「進む力」を育てる
          </h2>
        </div>

        {/* Description */}
        <div className="text-center mb-12">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            KCPには、世界中から集まっている「本気の学び」と、それを支える確かな指導がある。
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mb-12">
          {/* Main Carousel Container */}
          <div className="relative overflow-hidden rounded-xl shadow-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {carouselItems.map((item, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 relative"
                >
                  <div className="relative w-full h-64 md:h-80 lg:h-96">
                    <Image
                      src={item.image}
                      alt={item.caption}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    {/* Caption Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <p className="text-white text-lg md:text-xl lg:text-2xl font-semibold text-center">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => {
                prevSlide()
                setIsAutoPlaying(false)
                setTimeout(() => setIsAutoPlaying(true), 5000)
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={() => {
                nextSlide()
                setIsAutoPlaying(false)
                setTimeout(() => setIsAutoPlaying(true), 5000)
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-blue-600 w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/about"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            KCPとは
          </Link>
        </div>
      </div>
    </section>
  )
}
