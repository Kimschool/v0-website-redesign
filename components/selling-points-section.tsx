'use client'

import Link from 'next/link'

export function SellingPointsSection() {
  const sections = [
    {
      title: "コース紹介",
      desc: "コース紹介１",
      image: "https://weavus-group.com/kcp/wp-content/uploads/2025/11/dd6e3db1cbacac3da072b308e7aa15d0-scaled.jpg",
      link: "/education",
      point: "POINT 1"
    },
    {
      title: "授業内容",
      desc: "授業内容の説明",
      image: "https://weavus-group.com/kcp/wp-content/uploads/2025/07/e72a791362a75bb4b4f61b3ba2e9d824-scaled.jpg",
      link: "/education",
      point: "POINT 2"
    },
    {
      title: "進学実績",
      desc: "進学実績の説明",
      image: "https://weavus-group.com/kcp/wp-content/uploads/2025/07/990f7b4e7b14dbe8e107dec4200b2802-scaled.jpg",
      link: "/education",
      point: "POINT 3"
    }
  ]

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            教育内容とサポート体制
          </h2>
          <p className="text-gray-600 text-lg">
            教育方針的なスローガンを入れるが、文章は未定
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={section.image}
                  alt={section.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-semibold text-blue-600">{section.point}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{section.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{section.desc}</p>
                <Link 
                  href={section.link}
                  className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors text-sm"
                >
                  {section.title}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/education"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
          >
            教育内容
          </Link>
        </div>
      </div>
    </section>
  )
}
