'use client'

import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

export function FooterContactSection() {
  const images = [
    "https://weavus-group.com/kcp/wp-content/uploads/2025/11/d170313311ff1245830f2792bb6e0768.jpg",
    "https://weavus-group.com/kcp/wp-content/uploads/2025/11/9b91ee649bf131a794a49d9ad5d1ac77.jpg",
    "https://weavus-group.com/kcp/wp-content/uploads/2025/11/321c9db7fafdc0a70f45665f35abbbc6-scaled.jpg",
    "https://weavus-group.com/kcp/wp-content/uploads/2025/11/137370fb67dac9c0e29c012e4f100d28-scaled.jpg",
    "https://weavus-group.com/kcp/wp-content/uploads/2025/11/6e2a97e0becab2a006dbbb37f451034b-scaled.jpg",
    "https://weavus-group.com/kcp/wp-content/uploads/2025/11/79ae3e16250f84a5737be67b579a32a5-scaled.jpg",
    "https://weavus-group.com/kcp/wp-content/uploads/2025/11/aa30067ddd16863f9b4f86ecdcab2499-scaled.jpg",
  ]

  const buttons = [
    {
      title: "入学案内",
      description: "入学手続きに関する詳細情報を確認いただけます。ご不明な点は、いつでもご相談ください。",
      href: "/admission"
    },
    {
      title: "お問い合わせ",
      description: "証明書の発行、その他のお問い合わせ、よくある質問はこちらをクリックしてください。",
      href: "/contact"
    }
  ]

  return (
    <section className="relative py-0">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 h-full w-full">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          className="h-full w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="w-full">
              <img
                src={image}
                alt={`School image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {buttons.map((button, index) => (
              <Link
                key={index}
                href={button.href}
                className="group block bg-white hover:bg-blue-50 transition-colors rounded-lg overflow-hidden shadow-lg hover:shadow-xl"
              >
                <div className="p-8 flex flex-col items-start gap-4 h-full">
                  <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-transform">
                    {index === 0 ? '📋' : '❓'}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-cyan-500 transition-colors">
                      {button.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {button.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
