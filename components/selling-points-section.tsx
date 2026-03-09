'use client'

import Link from 'next/link'

export function SellingPointsSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            教育内容とサポート体制
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            （教育方針的なスローガンを入れるが、文章は未定）
          </p>
        </div>

        <div className="space-y-12">
          {/* Section 1 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-bold text-cyan-500">POINT</span>
                <span className="text-2xl font-bold text-cyan-500">1</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">コース紹介</h3>
              <p className="text-gray-600 mb-6">コース紹介１</p>
              <Link 
                href="/education"
                className="inline-block px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-full transition-colors"
              >
                コース紹介
              </Link>
            </div>
            <div className="order-1 md:order-2 h-64 md:h-80 rounded-lg overflow-hidden">
              <img 
                src="https://weavus-group.com/kcp/wp-content/uploads/2025/11/dd6e3db1cbacac3da072b308e7aa15d0-scaled.jpg"
                alt="コース紹介"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Section 2 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="h-64 md:h-80 rounded-lg overflow-hidden">
              <img 
                src="https://weavus-group.com/kcp/wp-content/uploads/2025/07/e72a791362a75bb4b4f61b3ba2e9d824-scaled.jpg"
                alt="授業内容"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-bold text-cyan-500">POINT</span>
                <span className="text-2xl font-bold text-cyan-500">2</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">授業内容</h3>
              <p className="text-gray-600 mb-6">授業内容の説明</p>
              <Link 
                href="/education"
                className="inline-block px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-full transition-colors"
              >
                授業内容
              </Link>
            </div>
          </div>

          {/* Section 3 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-bold text-cyan-500">POINT</span>
                <span className="text-2xl font-bold text-cyan-500">3</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">進学実績</h3>
              <p className="text-gray-600 mb-6">進学実績の説明</p>
              <Link 
                href="/education"
                className="inline-block px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-full transition-colors"
              >
                進学実績
              </Link>
            </div>
            <div className="order-1 md:order-2 h-64 md:h-80 rounded-lg overflow-hidden">
              <img 
                src="https://weavus-group.com/kcp/wp-content/uploads/2025/07/990f7b4e7b14dbe8e107dec4200b2802-scaled.jpg"
                alt="進学実績"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/education"
            className="inline-block px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-full transition-colors"
          >
            教育内容
          </Link>
        </div>
      </div>
    </section>
  )
}
