'use client'

import { useTranslation } from '@/components/i18n-provider'

export const TopEducation = () => {
  const { t } = useTranslation()

  return (
    <section id="education" className="py-20 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 text-balance">
          教育内容
        </h1>

        {/* 通常クラス */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 border-b-2 border-blue-600 pb-4">
            通常クラス
          </h2>
          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            世界から集う若者に、質の高い日本語教育を。確かな日本語力ときめ細かな進路指導で夢の実現を支えていきます。
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="p-6 border-l-4 border-blue-600 bg-blue-50">
              <h3 className="text-2xl font-bold mb-3 text-blue-900">初級クラス</h3>
              <p className="text-gray-700">
                日本語ゼロから「文字・語彙・文法」の基礎を習得し、簡単な日常会話ができるレベルを目指します。
              </p>
            </div>
            
            <div className="p-6 border-l-4 border-blue-500 bg-blue-50">
              <h3 className="text-2xl font-bold mb-3 text-blue-900">中級クラス</h3>
              <p className="text-gray-700">
                「漢字・語彙・読解・聴解」を強化し、日本での生活や学習に必要な日本語スキルを習得します。
              </p>
            </div>
            
            <div className="p-6 border-l-4 border-blue-400 bg-blue-50">
              <h3 className="text-2xl font-bold mb-3 text-blue-900">上級クラス</h3>
              <p className="text-gray-700">
                大学進学・大学院進学に必要な学術日本語と専門知識の習得を目指します。
              </p>
            </div>
          </div>
        </div>

        {/* 特別クラス・進路サポート */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 border-b-2 border-blue-600 pb-4">
            特別クラス・進路サポート
          </h2>
          <p className="text-lg mb-6 text-gray-700 italic">
            必要に応じて選択することができ、通常クラス以外の時間に行います。
          </p>

          {/* 日本語強化クラス */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-blue-900">【日本語強化クラス】 ※レベル1・2対象</h3>
            <p className="text-gray-700 leading-relaxed">
              日本語ゼロから「漢字/聴解/読解」スキル別に基礎を強化。これに続く日本語プラスの授業が受けられるだけの日本語の基礎力をつける。
            </p>
          </div>

          {/* 日本語プラス - 各種試験対策 */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-2xl font-bold mb-6 text-blue-900">【日本語プラス】 ※レベル3～対象</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">EJU対策</h4>
                <p className="text-gray-700">EJUの読解、聴解・聴読解、記述に対応した授業</p>
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">数学Ⅰ/Ⅱ</h4>
                <p className="text-gray-700">
                  EJUの数学コースⅠ（文科系：２次方程式、三角比、平面図形、確率など）・Ⅱ（理科系：1の範囲に加えて、数列、行列、微分、積分、ベクトルなど）の出題範囲に対応した授業
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">物理、化学、生物</h4>
                <p className="text-gray-700">
                  EJUの理科の出題範囲に対応した授業。各自の志望校学部学科に合わせて、2科目を選択
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">総合科目</h4>
                <p className="text-gray-700">
                  EJUの総合科目の出題範囲に対応した授業。政治、経済、社会、地理、歴史（産業革命以降）を扱う
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">JLPT</h4>
                <p className="text-gray-700">
                  N1とN2に分かれて、それぞれ読解、文法、文字、語彙、聴解の演習を行う
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">TOEIC</h4>
                <p className="text-gray-700">
                  受講生の実力に合わせて目標設定し、問題演習を行う
                </p>
              </div>
            </div>
          </div>

          {/* 進路指導 */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 border-l-4 border-green-600 bg-green-50">
              <h4 className="text-xl font-bold mb-3 text-green-900">大学・大学院進学指導</h4>
              <ul className="space-y-3 text-gray-700">
                <li><strong>大学HR：</strong>日本の大学の概況、入試の実態、志望理由書の書き方、面接の受け方を指導</li>
                <li><strong>大学院HR：</strong>入試の最新情報とともに、研究計画書の書き方、指導教官との面談の受け方を指導</li>
              </ul>
            </div>

            <div className="p-6 border-l-4 border-purple-600 bg-purple-50">
              <h4 className="text-xl font-bold mb-3 text-purple-900">美術指導</h4>
              <p className="text-gray-700">
                「日本の美術系大学」に照準を合わせて実技指導を行います。さらに、各大学・大学院で要求されるデッサン・色彩構成・平面構成などの美術の基礎力を身につけます。一人一人の目的に合わせた受験指導を行っていきます。
              </p>
            </div>

            <div className="p-6 border-l-4 border-orange-600 bg-orange-50">
              <h4 className="text-xl font-bold mb-3 text-orange-900">個別指導</h4>
              <p className="text-gray-700">
                KCPを卒業した後の進路に合わせて、試験対策科目や個別指導が受けられます。大学進学、大学院進学、美術系学校への進学、就職などそれぞれの進路に必要な試験科目や面接・実技の練習指導を行っています。進路に迷っている場合は、個別相談を通してキャリア設計をしていきます。
              </p>
            </div>

            <div className="p-6 border-l-4 border-red-600 bg-red-50">
              <h4 className="text-xl font-bold mb-3 text-red-900">就職支援</h4>
              <p className="text-gray-700">
                日本での就職を目指し、キャリア設計、職業選択、就職活動に関する方法の助言や指導を行います。ガイダンス、個別面接指導などキャリアコンサルタントの資格をもつ担当者と相談しながら、日本での就職活動を進めることができます。
              </p>
            </div>
          </div>
        </div>

        {/* 時間割例 */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 border-b-2 border-blue-600 pb-4">
            時間割例
          </h2>
          
          <p className="text-center mb-6 text-gray-600 italic">
            ※時間割は学期ごとに変更します。
          </p>

          {/* 初級クラス */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-4 text-blue-900">初級クラス</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="border border-gray-300 p-3">時間</th>
                    <th className="border border-gray-300 p-3">月</th>
                    <th className="border border-gray-300 p-3">火</th>
                    <th className="border border-gray-300 p-3">水</th>
                    <th className="border border-gray-300 p-3">木</th>
                    <th className="border border-gray-300 p-3">金</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border border-gray-300 p-3 font-bold">13:30–14:15</td>
                    <td className="border border-gray-300 p-3">🟦漢字</td>
                    <td className="border border-gray-300 p-3">🟨聴解</td>
                    <td className="border border-gray-300 p-3">🟦漢字・作文</td>
                    <td className="border border-gray-300 p-3">🟨聴解</td>
                    <td className="border border-gray-300 p-3">🟦漢字</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border border-gray-300 p-3 font-bold">14:15–15:00</td>
                    <td className="border border-gray-300 p-3">🟩総合学習</td>
                    <td className="border border-gray-300 p-3">🟩総合学習</td>
                    <td className="border border-gray-300 p-3">🟩総合学習</td>
                    <td className="border border-gray-300 p-3">🟩総合学習</td>
                    <td className="border border-gray-300 p-3">🟩総合学習</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border border-gray-300 p-3 font-bold">15:15–16:00</td>
                    <td className="border border-gray-300 p-3">🟩総合学習</td>
                    <td className="border border-gray-300 p-3">🟩総合学習</td>
                    <td className="border border-gray-300 p-3">🟩総合学習</td>
                    <td className="border border-gray-300 p-3">🟩総合学習</td>
                    <td className="border border-gray-300 p-3">🟩総合学習</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border border-gray-300 p-3 font-bold">16:00–16:45</td>
                    <td className="border border-gray-300 p-3">🟩総合学習</td>
                    <td className="border border-gray-300 p-3">🟩総合学習</td>
                    <td className="border border-gray-300 p-3">🟩総合学習</td>
                    <td className="border border-gray-300 p-3">🟩総合学習</td>
                    <td className="border border-gray-300 p-3">🟧進学準備</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border border-gray-300 p-3 font-bold">17:00–17:45</td>
                    <td className="border border-gray-300 p-3">🟧進学日本語</td>
                    <td className="border border-gray-300 p-3">ー</td>
                    <td className="border border-gray-300 p-3">🟧進学日本語</td>
                    <td className="border border-gray-300 p-3">ー</td>
                    <td className="border border-gray-300 p-3">🟧進学日本語</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 中級クラス */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 text-blue-900">中級クラス</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="border border-gray-300 p-3">時間</th>
                    <th className="border border-gray-300 p-3">月</th>
                    <th className="border border-gray-300 p-3">火</th>
                    <th className="border border-gray-300 p-3">水</th>
                    <th className="border border-gray-300 p-3">木</th>
                    <th className="border border-gray-300 p-3">金</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border border-gray-300 p-3 font-bold">09:00–09:45</td>
                    <td className="border border-gray-300 p-3">🟦漢字語彙</td>
                    <td className="border border-gray-300 p-3">🟨聴解</td>
                    <td className="border border-gray-300 p-3">🟦漢字語彙</td>
                    <td className="border border-gray-300 p-3">🟦漢字語彙</td>
                    <td className="border border-gray-300 p-3">🟦漢字語彙</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border border-gray-300 p-3 font-bold">09:45–10:30</td>
                    <td className="border border-gray-300 p-3">🟨聴解</td>
                    <td className="border border-gray-300 p-3">🟩総合学習</td>
                    <td className="border border-gray-300 p-3">🟪読解</td>
                    <td className="border border-gray-300 p-3">🟩総合学習</td>
                    <td className="border border-gray-300 p-3">🟨聴解</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border border-gray-300 p-3 font-bold">10:45–11:30</td>
                    <td className="border border-gray-300 p-3">🟥文章読解型小論文</td>
                    <td className="border border-gray-300 p-3">🟩総合学習</td>
                    <td className="border border-gray-300 p-3">🟩総合学習</td>
                    <td className="border border-gray-300 p-3">🟩総合学習</td>
                    <td className="border border-gray-300 p-3">🟪読解</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border border-gray-300 p-3 font-bold">11:30–12:15</td>
                    <td className="border border-gray-300 p-3">🟥文章読解型小論文</td>
                    <td className="border border-gray-300 p-3">🟧選択授業1</td>
                    <td className="border border-gray-300 p-3">🟧選択授業2</td>
                    <td className="border border-gray-300 p-3">★JLPT対策</td>
                    <td className="border border-gray-300 p-3">🟪読解</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 時間割注記 */}
          <div className="bg-blue-50 p-6 rounded-lg mt-8">
            <p className="text-gray-700 mb-3">
              <strong>※1. 【進学日本語】</strong>
            </p>
            <p className="text-gray-700 mb-6 ml-4">
              進学準備教育課程での選択授業
            </p>
            <p className="text-gray-700 mb-3">
              <strong>※2. 【選択授業】</strong>
            </p>
            <p className="text-gray-700 ml-4">
              EJU対策、JLPT対策、小論文対策等が用意されています。大学・大学院に進学したい人、日本語能力試験に合格したい人、必要に応じて授業を選ぶことができます。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
