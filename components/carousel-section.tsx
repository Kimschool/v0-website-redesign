'use client'

import { useTranslation } from '@/lib/i18n'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import Link from 'next/link'

export function CarouselSection() {
  const t = useTranslation()

  const carouselItems = [
    {
      image: "https://weavus-group.com/kcp/wp-content/uploads/2025/11/EJU.jpg",
      title: "EJU・日本語科目で最高得点者を輩出"
    },
    {
      image: "https://weavus-group.com/kcp/wp-content/uploads/2025/07/31e0362326d434d6dbc1d2390aa01eff.jpg",
      title: "多国籍の学生が集うKCPで\nグローバルに考える視点を養う"
    },
    {
      image: "https://weavus-group.com/kcp/wp-content/uploads/2025/11/2aaf315dd8c8254983b5ed098691efcd-rotated.jpg",
      title: "日本をより深く知るための\n楽しいプログラムも満載"
    },
    {
      image: "https://weavus-group.com/kcp/wp-content/uploads/2025/11/1f9820d2152d8e9bcc962b8600ef019d.jpg",
      title: "経験豊かなベテラン教師が\nきめ細かい指導"
    },
    {
      image: "https://weavus-group.com/kcp/wp-content/uploads/2025/11/c6d0b891872831f84c0c747a5da2a261.jpg",
      title: "アメリカの大学の単位認定\nプログラムもあり"
    },
    {
      image: "https://weavus-group.com/kcp/wp-content/uploads/2025/07/f3680d56ae6dfb979b5be7961e73155c.jpg",
      title: "公共性の高い教育機関として\n公的に認知"
    },
    {
      image: "https://weavus-group.com/kcp/wp-content/uploads/2025/07/1c279b72c09a930d753cc9f263d78c88.jpg",
      title: "充実した教育設備"
    }
  ]

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            日本語だけじゃない<br />
            「進む力」を育てる
          </h2>
          <p className="text-gray-600 text-lg">
            KCPには、世界中から集まっている「本気の学び」と、それを支える確かな指導がある。
          </p>
        </div>

        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 2000 }}
          loop
          className="mb-8"
        >
          {carouselItems.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-96 rounded-xl overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white text-center text-2xl font-bold px-6">
                    {item.title}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center">
          <Link 
            href="/about"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
          >
            KCPとは
          </Link>
        </div>
      </div>
    </section>
  )
}
