'use client'

import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* 학교장 인사말 */}
        <div className={`mb-20 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 pb-6 border-b-2 border-gray-300">
            学校長挨拶
          </h2>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-lg leading-relaxed text-gray-700">
              KCPという名前には、Knowledge(知識)、Coexistence(共生)、Peace(平和)という3つの想いが込められています。
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              高度な日本語および日本文化に関する知識を持ちながら、様々な国から来た留学生同士が切磋琢磨し、多文化共生の大切さを学び、やがて地球市民として真の平和な社会の構築に貢献していく人材を育成することが、KCPの教育理念です。
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              また、学生の皆さんが充実した留学生活を送り、夢を実現することこそが、私たちの願いであり喜びでもあります。
            </p>
          </div>
        </div>

        {/* KCPの理念 */}
        <div className={`mb-20 ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 pb-6 border-b-2 border-gray-300">
            KCPの理念
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-8 bg-blue-50 rounded-lg">
              <h3 className="text-3xl font-bold text-blue-600 mb-4">Knowledge</h3>
              <p className="text-gray-700 leading-relaxed">
                高度な日本語と日本文化に関する知識を習得し、言語スキルを高める
              </p>
            </div>
            <div className="text-center p-8 bg-green-50 rounded-lg">
              <h3 className="text-3xl font-bold text-green-600 mb-4">Coexistence</h3>
              <p className="text-gray-700 leading-relaxed">
                多国籍の学生との交流を通じて、相互理解と共生の精神を学ぶ
              </p>
            </div>
            <div className="text-center p-8 bg-amber-50 rounded-lg">
              <h3 className="text-3xl font-bold text-amber-600 mb-4">Peace</h3>
              <p className="text-gray-700 leading-relaxed">
                地球市民として平和な社会の構築に貢献できる人材を目指す
              </p>
            </div>
          </div>
        </div>

        {/* 学校の歴史 */}
        <div className={`mb-20 ${isVisible ? "animate-fade-in-up animation-delay-400" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 pb-6 border-b-2 border-gray-300">
            学校の歴史
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 font-bold text-blue-600">1983年</div>
                <p className="text-gray-700">KCP設立。駐在員家族を対象とした日本語教育を開始</p>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 font-bold text-blue-600">1988年</div>
                <p className="text-gray-700">法務省東京入国管理局により、最初の留学生受け入れ認可を取得</p>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 font-bold text-blue-600">1991年</div>
                <p className="text-gray-700">姉妹校「ジパン富士共生日本語学校」の運営を開始（赤羽キャンパス）</p>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-24 font-bold text-blue-600">1993年以降</div>
                <p className="text-gray-700">継続的な発展と充実した教育体制の構築</p>
              </div>
            </div>
          </div>
        </div>

        {/* 安心のサポート体制 */}
        <div className={`${isVisible ? "animate-fade-in-up animation-delay-600" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 pb-6 border-b-2 border-gray-300">
            安心のサポート体制
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                KCPの個性豊かで経験豊富なベテラン教師・事務職員たち。
                <br />
                入学した皆さんが充実した留学生活を送り、
                <br />
                夢を実現することが、私たちの願いであり喜びでもあります。
              </p>
              <p>
                全職員が連携して、ときに優しくときに厳しく将来を見据えた指導を、
                <br />
                そして一人一人の学生と向き合い親身のサポートを行います。
                <br />
                勉強が心配になったとき、生活で困ったことがあるとき、いつも皆さんのそばで力になります。
              </p>
              <p>
                日本語で伝えることが難しくても、英語・中国語・韓国語・ベトナム語に堪能な各国担当の
                <br />
                スタッフがいますから、心配しなくても大丈夫です。
              </p>
              <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                <p className="font-semibold text-blue-900">
                  多言語対応スタッフが常駐：英語・中国語・韓国語・ベトナム語
                </p>
              </div>
            </div>

            {/* サポート体制のポイント */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h4 className="text-xl font-bold mb-3 text-gray-800">学習サポート</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• 個別相談・指導</li>
                  <li>• 進学・進路サポート</li>
                  <li>• 補習授業</li>
                </ul>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h4 className="text-xl font-bold mb-3 text-gray-800">生活サポート</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• 生活相談</li>
                  <li>• ビザ手続きサポート</li>
                  <li>• 多言語による対応</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
