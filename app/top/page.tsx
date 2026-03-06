'use client'

import { useTranslation } from '@/hooks/use-translation'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function TopPage() {
  const t = useTranslation()

  return (
    <div className="w-full">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#0085b2]">KCP地球市民日本語学校</h1>
          <nav className="hidden md:flex gap-8">
            <a href="#about" className="text-gray-700 hover:text-[#0085b2] transition">KCPとは</a>
            <a href="#services" className="text-gray-700 hover:text-[#0085b2] transition">教育内容</a>
            <a href="#campus" className="text-gray-700 hover:text-[#0085b2] transition">学校生活</a>
            <a href="#admission" className="text-gray-700 hover:text-[#0085b2] transition">入学案内</a>
            <a href="#contact" className="text-gray-700 hover:text-[#0085b2] transition">お問い合わせ</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-[#f0ffff] to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#0085b2] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#0cc0df] rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h2 className="text-5xl md:text-7xl font-bold text-[#0085b2] mb-6 leading-tight">
            ともにまなび
          </h2>
          <h2 className="text-5xl md:text-7xl font-bold text-[#0085b2] mb-8 leading-tight">
            ともに生きる
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
            KCP Always by your side
          </p>
          <Button className="bg-[#0085b2] hover:bg-[#006794] text-white px-8 py-3 rounded-full text-lg">
            詳しく見る
          </Button>
        </div>
      </section>

      {/* Three Points Section */}
      <section className="w-full py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#0085b2]">KCPの特徴</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Point 1 */}
            <div className="p-8 border-2 border-[#0085b2] rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-[#0085b2] text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-2xl font-bold text-[#0085b2] mb-4">コース紹介</h3>
              <p className="text-gray-700">
                多様なコースで、あなたの目的に合わせた日本語学習が可能です。
              </p>
              <a href="#services" className="text-[#0cc0df] font-semibold mt-4 inline-block hover:underline">
                詳細を見る →
              </a>
            </div>

            {/* Point 2 */}
            <div className="p-8 border-2 border-[#0085b2] rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-[#0085b2] text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-2xl font-bold text-[#0085b2] mb-4">授業内容</h3>
              <p className="text-gray-700">
                実践的な日本語教育で、ビジネスでも使える高度な日本語力を身につけます。
              </p>
              <a href="#services" className="text-[#0cc0df] font-semibold mt-4 inline-block hover:underline">
                詳細を見る →
              </a>
            </div>

            {/* Point 3 */}
            <div className="p-8 border-2 border-[#0085b2] rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-[#0085b2] text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-2xl font-bold text-[#0085b2] mb-4">進学実績</h3>
              <p className="text-gray-700">
                数多くの学生が有名大学への進学を実現しています。
              </p>
              <a href="#services" className="text-[#0cc0df] font-semibold mt-4 inline-block hover:underline">
                詳細を見る →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Life Section */}
      <section id="campus" className="w-full py-20 px-4 bg-[#f0ffff]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-[#0085b2]">
            学び、つながり、成長する毎日
          </h2>
          <p className="text-center text-gray-700 mb-16 text-lg">
            学ぶことも、楽しむことも、全力で過ごせるキャンパスライフがここにある。
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Schedule */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
              <div className="bg-gradient-to-r from-[#0085b2] to-[#0cc0df] h-40 flex items-center justify-center">
                <span className="text-white text-3xl">📅</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#0085b2] mb-2">年間スケジュール</h3>
                <p className="text-gray-700 mb-4">年間を通じたイベントスケジュールをご紹介します。</p>
                <a href="#campus" className="text-[#0cc0df] font-semibold hover:underline">
                  詳細を見る →
                </a>
              </div>
            </div>

            {/* Club Activity */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
              <div className="bg-gradient-to-r from-[#0cc0df] to-[#0085b2] h-40 flex items-center justify-center">
                <span className="text-white text-3xl">⚽</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#0085b2] mb-2">クラブ活動</h3>
                <p className="text-gray-700 mb-4">多くのクラブ活動で新しい友人との交流が生まれます。</p>
                <a href="#campus" className="text-[#0cc0df] font-semibold hover:underline">
                  詳細を見る →
                </a>
              </div>
            </div>

            {/* Facility */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
              <div className="bg-gradient-to-r from-[#0085b2] to-[#0cc0df] h-40 flex items-center justify-center">
                <span className="text-white text-3xl">🏫</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#0085b2] mb-2">施設案内</h3>
                <p className="text-gray-700 mb-4">充実した施設で快適な学習環境を実現しています。</p>
                <a href="#campus" className="text-[#0cc0df] font-semibold hover:underline">
                  詳細を見る →
                </a>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-[#0085b2] hover:bg-[#006794] text-white px-8 py-3 rounded-full text-lg">
              学校生活を見る
            </Button>
          </div>
        </div>
      </section>

      {/* School Songs Section */}
      <section className="w-full py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#0085b2]">
            KCP校歌と応援歌
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* School Song */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-6 h-64 bg-gray-200 group-hover:shadow-lg transition">
                <div className="w-full h-full bg-gradient-to-br from-[#0085b2] to-[#0cc0df] flex items-center justify-center">
                  <span className="text-white text-6xl">🎵</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#0085b2] mb-2">
                校歌「今ここに」
              </h3>
              <p className="text-gray-700 mb-4">
                KCPの校歌「今ここに」は、学校の理念と想いを込めた歌です。
              </p>
              <a href="#" className="text-[#0cc0df] font-semibold hover:underline">
                詳細を見る →
              </a>
            </div>

            {/* Cheering Song */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-6 h-64 bg-gray-200 group-hover:shadow-lg transition">
                <div className="w-full h-full bg-gradient-to-br from-[#0cc0df] to-[#0085b2] flex items-center justify-center">
                  <span className="text-white text-6xl">🎶</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#0085b2] mb-2">
                応援歌「そらとほしと」
              </h3>
              <p className="text-gray-700 mb-4">
                応援歌「そらとほしと」は、KCPの活動を応援する歌です。
              </p>
              <a href="#" className="text-[#0cc0df] font-semibold hover:underline">
                詳細を見る →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Contact Section */}
      <section id="contact" className="w-full py-20 px-4 bg-[#f0ffff]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Admission */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="w-16 h-16 bg-[#0085b2] text-white rounded-full flex items-center justify-center text-3xl mb-6">
                📝
              </div>
              <h3 className="text-2xl font-bold text-[#0085b2] mb-3">入学案内</h3>
              <p className="text-gray-700 mb-6">
                入学手続きに関する詳細情報を確認いただけます。ご不明な点は、いつでもご相談ください。
              </p>
              <Button className="bg-[#0085b2] hover:bg-[#006794] text-white w-full">
                入学案内を見る
              </Button>
            </div>

            {/* Contact */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="w-16 h-16 bg-[#0085b2] text-white rounded-full flex items-center justify-center text-3xl mb-6">
                💬
              </div>
              <h3 className="text-2xl font-bold text-[#0085b2] mb-3">お問い合わせ</h3>
              <p className="text-gray-700 mb-6">
                証明書の発行、その他のお問い合わせ、よくある質問はこちらをクリックしてください。
              </p>
              <Button className="bg-[#0cc0df] hover:bg-[#0aa8b8] text-white w-full">
                お問い合わせ
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#0085b2] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h4 className="text-2xl font-bold mb-2">KCP地球市民日本語学校</h4>
          <p className="text-sm opacity-75">KCP Always by your side</p>
          <div className="mt-8 pt-8 border-t border-white border-opacity-20">
            <p className="text-sm opacity-75">
              © 2026 KCP Chikyuu Shimin Nihongo Gakkou. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
