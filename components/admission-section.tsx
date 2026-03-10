"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"

export function AdmissionSection() {
  return (
    <section id="admission" className="bg-white">
      {/* Page Header */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden">
        <Image
          src="/images/admission-header.jpg"
          alt="入学案内"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">入学案内</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Introduction */}
          <div className="mb-16">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              KCPへの入学手続きは、お住まいの国・地域の海外提携事務所を通じて行われます。
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              出願からビザ取得、渡日前の準備まで幅広くサポートしていますので、入学をご希望の方は、まずお近くの海外事務所までお問い合わせください。
            </p>
            <p className="text-gray-600 leading-relaxed">
              なお、在留資格の状況によりビザ取得が不要な方、または特別な事情がある方は、個別にご案内いたしますので、学校まで直接お問い合わせください。
            </p>
          </div>

          {/* Contact Section */}
          <Link href="/contact" className="block group mb-16">
            <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 p-8 md:p-12 rounded-xl border-2 border-blue-200 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-blue-400 hover:scale-105">
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full opacity-30 -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Header with icon */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-500 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">お問い合わせ</h2>
                </div>

                {/* Description */}
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  入学に関するご質問やご相談がございましたら、お気軽にお問い合わせください。
                </p>

                {/* Info cards */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-blue-300/30">
                    <p className="text-sm font-semibold text-gray-600 mb-1">メール</p>
                    <p className="text-gray-800 font-medium">info@kcp.ac.jp</p>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-blue-300/30">
                    <p className="text-sm font-semibold text-gray-600 mb-1">営業時間</p>
                    <p className="text-gray-800 font-medium">月～金 9:00～18:00 JST</p>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 font-medium">お問い合わせページへ移動</p>
                  <div className="p-2 bg-blue-500 rounded-lg group-hover:bg-blue-600 group-hover:translate-x-1 transition-all duration-300">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Application Documents */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">入学願書・パンフレット</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Application Form */}
              <div className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-gray-800 mb-4">入学願書</h3>
                <p className="text-gray-600 mb-4">
                  以下の言語での入学願書をダウンロードできます。
                </p>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-semibold">対応言語:</span><br />
                    English・中文简体・中文繁体・한국어・Tiếng Việt
                  </p>
                </div>
                <a 
                  href="https://weavus-group.com/kcp/%e9%a1%98%e6%9b%b8%e3%82%bb%e3%83%83%e3%83%88/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition text-center"
                >
                  願書をダウンロード
                </a>
              </div>

              {/* Pamphlet */}
              <div className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-gray-800 mb-4">パンフレット</h3>
                <p className="text-gray-600 mb-4">
                  KCPの詳しい情報やコース内容については、パンフレットをご覧ください。
                </p>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-semibold">ファイル形式:</span><br />
                    PDF形式 (ダウンロード可能)
                  </p>
                </div>
                <a 
                  href="https://weavus-group.com/kcp/wp-content/uploads/2026/02/KCP%E3%83%91%E3%83%B3%E3%83%95%E3%83%AC%E3%83%83%E3%83%88%E7%A2%BA%E5%AE%9A%E7%89%88.pdf" 
                  download
                  className="inline-block mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition text-center"
                >
                  パンフレットをダウンロード
                </a>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-16" />

          {/* Pre-Placement Test */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">入学前プレメーンテスト</h2>

            <div className="bg-gray-50 p-8 rounded-lg border border-gray-300">
              <p className="text-gray-700 leading-relaxed mb-6">
                KCPでは、入学確定後に日本語プレメーンテストを受けていただきます。
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex gap-4">
                  <div className="text-blue-500 font-bold text-xl">✓</div>
                  <div className="text-gray-700">
                    試験日程は事前にお知らせします。必ず指定日にご参加ください。
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-blue-500 font-bold text-xl">✓</div>
                  <div className="text-gray-700">
                    オンライン形式で実施、面接を受けていただく場合もあります。
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-blue-500 font-bold text-xl">✓</div>
                  <div className="text-gray-700">
                    テスト後、レベル分けの結果をお送りします。
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
                プレテスト中に受けたアドバイスは、入学後の学習計画策定に活用されます。
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-16" />

          {/* Learning Management System */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">学習管理システム「Go KCP」</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  KCP在学中のお知らせ、授業資料、宿題管理などは、学習管理システム「Go KCP」を通じて行われます。
                </p>
                <p>
                  Go KCPでは、授業内容や課題を確認できるだけでなく、自分の学習の進み具合を振り返ることも可能です。
                </p>
                <p>
                  日々の学習を積み重ね、目標に向かって計画的に取り組むためのツールとして活用されています。
                </p>
                <p className="font-semibold text-blue-600">
                  入学後にはオリエンテーションを行い、使い方を丁寧に説明しますので、初めての方でも安心して利用できます。
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="font-bold text-gray-800 mb-4">Go KCP の主な機能</h3>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li className="flex gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>授業スケジュール・資料の確認</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>宿題・課題の提出</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>成績・進捗状況の確認</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>学校からのお知らせ受信</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>学習ポートフォリオの作成</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-16" />

          {/* Scholarship */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">奨学金</h2>

            <p className="text-gray-700 leading-relaxed mb-8">
              KCPでは、学業・出席が優秀な学生を対象とした奨学金制度があります。
            </p>

            <div className="space-y-6">
              {/* Scholarship 1 */}
              <div className="border-l-4 border-blue-500 pl-6 py-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  公益財団法人　髙山国際教育財団　奨学金
                </h3>
                <p className="text-gray-600">
                  優秀な成績と出席状況を保つ学生に対して支給される奨学金です。
                </p>
              </div>

              {/* Scholarship 2 */}
              <div className="border-l-4 border-green-500 pl-6 py-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  留学生受入れ促進プログラム　文部科学省外国人留学生学習奨励費
                </h3>
                <p className="text-gray-600">
                  文部科学省による留学生支援制度で、学業成績と出席率が優秀な学生が対象です。
                </p>
              </div>
            </div>

            <div className="mt-8 bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <p className="text-gray-700">
                <strong className="text-gray-800">※</strong> 詳しい奨学金の条件や申請方法については、入学後にご案内いたします。
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-lg text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              入学に関するご不明な点はお気軽にお問い合わせください
            </h2>
            <p className="text-blue-100 mb-6">
              出願手続きからビザ申請、渡日後のサポートまで、全力でサポートいたします。
            </p>
            <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition">
              お問い合わせフォーム
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
