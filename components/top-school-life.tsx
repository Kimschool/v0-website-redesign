'use client'

import { useTranslation } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const TopSchoolLife = () => {
  const { t } = useTranslation()

  return (
    <section id="school-life" className="w-full py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* ヘッダー */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            学校生活
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            KCPでの生活は、教室の中だけにとどまりません。年間を通じてのイベントやクラブ活動——多国籍の仲間とともに過ごす日々の中で、日本語力だけでなく、人との関わり方や文化理解も自然と深まっていきます。
          </p>
        </div>

        {/* キャンパスツアー */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              キャンパスツアー
            </h3>
            <p className="text-gray-700 mb-6">
              最新のキャンパス施設や学習環境をご紹介します。オンラインまたは対面でのツアーが可能です。
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              詳しく見る
            </Button>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-green-900 mb-4">
              イベント・クラブ活動
            </h3>
            <p className="text-gray-700 mb-6">
              年間を通じて様々なイベントとクラブ活動が開催されています。多国籍の仲間との交流の場です。
            </p>
            <Button className="bg-green-600 hover:bg-green-700">
              詳しく見る
            </Button>
          </div>
        </div>

        {/* アクセス情報 */}
        <div className="bg-gray-50 p-8 rounded-lg mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            最寄り駅
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 東京メトロ丸ノ内線 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                東京メトロ丸ノ内線
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <strong>新宿御苑前駅（M10）</strong>
                  <p className="ml-4">2番出口より徒歩5分</p>
                </li>
                <li>
                  <strong>四谷３丁目駅（M11）</strong>
                  <p className="ml-4">2番出口より徒歩12分</p>
                </li>
              </ul>
            </div>

            {/* 東京メトロ副都心線 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                東京メトロ副都心線
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <strong>新宿3丁目駅（F13）</strong>
                  <p className="ml-4">C4番出口より徒歩13分</p>
                </li>
              </ul>
            </div>

            {/* 都営新宿線 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                都営新宿線
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <strong>新宿3丁目駅（S02）</strong>
                  <p className="ml-4">C4番出口より徒歩13分</p>
                </li>
                <li>
                  <strong>曙橋駅（S03）</strong>
                  <p className="ml-4">C4番出口より徒歩11分</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* KCPの日常 */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            KCPの日常をのぞいてみよう！
          </h3>

          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="https://www.kcp.ac.jp/blog/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              ブログをチェック
            </Link>
            <Link
              href="https://www.instagram.com/kcp_yosei/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-medium"
            >
              Instagramで見る
            </Link>
            <Link
              href="https://www.facebook.com/kcpchikyushimin/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
            >
              Facebookで見る
            </Link>
          </div>
        </div>

        {/* 施設紹介 */}
        <div className="bg-blue-50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            充実した施設
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: '充実のラーニング施設',
                description: '最新の教材と設備を備えた教室、図書館、コンピュータルーム'
              },
              {
                title: '快適な学習環境',
                description: 'カフェテリア、ラウンジ、学生ホールなど、交流できるスペース'
              },
              {
                title: '多言語対応サポート',
                description: '英語、中国語、韓国語、ベトナム語での学習支援'
              },
              {
                title: 'アクティビティルーム',
                description: 'クラブ活動やイベントで、多国籍の仲間と交流'
              },
            ].map((facility, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border-l-4 border-blue-600"
              >
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {facility.title}
                </h4>
                <p className="text-gray-700">{facility.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
