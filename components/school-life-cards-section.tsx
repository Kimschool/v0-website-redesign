'use client'

import Link from 'next/link'

export function SchoolLifeCardsSection() {
  const cards = [
    {
      title: "年間スケジュール",
      image: "https://weavus-group.com/kcp/wp-content/uploads/2026/02/3月卒業式-480x306.jpg",
      link: "#"
    },
    {
      title: "クラブ活動",
      image: "https://weavus-group.com/kcp/wp-content/uploads/2025/07/6f45ecfb6c01875b84b7015eaebe18db-480x306.jpg",
      link: "#"
    },
    {
      title: "施設案内",
      image: "https://weavus-group.com/kcp/wp-content/uploads/2025/11/345a1428880b476bf98db1a41b142cfc-1-480x306.jpg",
      link: "#"
    }
  ]

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            学び、つながり、成長する毎日
          </h2>
          <p className="text-gray-600 text-lg">
            学ぶことも、楽しむことも、全力で過ごせるキャンパスライフがここにある。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {cards.map((card, index) => (
            <Link key={index} href={card.link}>
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="relative h-48 overflow-hidden group">
                  <img 
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">{card.title}</h3>
                  <span className="inline-block px-4 py-2 text-blue-600 border border-blue-600 rounded-full text-sm font-semibold hover:bg-blue-600 hover:text-white transition-colors">
                    詳細を見る
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="/school-life"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
          >
            学校生活
          </Link>
        </div>
      </div>
    </section>
  )
}
