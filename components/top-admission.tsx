'use client'

import { useTranslation } from '@/lib/i18n'
import { Button } from '@/components/ui/button'

export const TopAdmission = () => {
  const { t } = useTranslation()

  return (
    <section id="admission" className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            入学案内
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            KCPへの入学手続きは、お住まいの国・地域の海外提携事務所を通じて行われます。出願からビザ取得、渡日前の準備まで幅広くサポートしていますので、入学をご希望の方は、まずお近くの海外事務所までお問い合わせください。
          </p>
        </div>

        {/* Application Process Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b-2 border-blue-500">
            入学までの流れ
          </h3>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white font-bold">
                  1
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">出願</h4>
                <p className="text-gray-600">
                  海外提携事務所へお申込みください。必要な書類をご説明いたします。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white font-bold">
                  2
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">審査</h4>
                <p className="text-gray-600">
                  書類の審査と面接試験を行います。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white font-bold">
                  3
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">合格通知</h4>
                <p className="text-gray-600">
                  試験結果をご連絡いたします。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white font-bold">
                  4
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">入学手続き</h4>
                <p className="text-gray-600">
                  所定の手続きを行います。学費振込などの事務手続きをご案内いたします。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white font-bold">
                  5
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">ビザ手続き・渡日準備</h4>
                <p className="text-gray-600">
                  ビザ申請に必要な書類をお送りします。渡日前の準備をサポートいたします。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white font-bold">
                  6
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">入学</h4>
                <p className="text-gray-600">
                  ようこそKCPへ！オリエンテーションを行い、学校生活をサポートします。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Management System Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b-2 border-blue-500">
            学習管理システムGokcp
          </h3>
          
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              KCP在学中のお知らせ、授業資料、宿題管理などは、学習管理システム「Gokcp」を通じて行われます。
            </p>
            <p>
              Gokcpでは、授業内容や課題を確認できるだけでなく、自分の学習の進み具合を振り返ることも可能です。日々の学習を積み重ね、目標に向かって計画的に取り組むためのツールとして活用されています。
            </p>
            <p>
              入学後にはオリエンテーションを行い、使い方を丁寧に説明しますので、初めての方でも安心して利用できます。
            </p>
          </div>
        </div>

        {/* Scholarship Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-4 border-b-2 border-blue-500">
            奨学金
          </h3>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            KCPでは、学業・出席が優秀な学生を対象とした奨学金制度があります。
          </p>

          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-gray-600">
              <span className="text-blue-500 font-bold mt-1">●</span>
              <span>公益財団法人　髙山国際教育財団　奨学金</span>
            </li>
            <li className="flex items-start gap-3 text-gray-600">
              <span className="text-blue-500 font-bold mt-1">●</span>
              <span>留学生受入れ促進プログラム　文部科学省外国人留学生学習奨励費</span>
            </li>
          </ul>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-50 rounded-lg p-8 md:p-12 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            ご質問やご不明な点がございましたら
          </h3>
          <p className="text-gray-600 mb-6">
            お気軽にお近くの海外事務所へお問い合わせください。
          </p>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-base rounded-full">
            {t('nav.contact')}
          </Button>
        </div>
      </div>
    </section>
  )
}
