'use client'

import Image from 'next/image'

function YearResultsTable({ year }: { year: string }) {
  const yearData: Record<string, { 国公立: Array<string>; 私立: Array<string> }> = {
    '2024': {
      国公立: ['東京大学', '東北大学', '名古屋大学'],
      私立: ['早稲田大学', '慶應義塾大学', '上智大学']
    },
    '2023': {
      国公立: ['京都大学', '大阪大学'],
      私立: ['明治大学', '立教大学']
    }
  }

  const data = yearData[year] || { 国公立: [], 私立: [] }

  return (
    <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
        <h3 className="text-lg font-bold">{year}年度進学実績</h3>
      </div>
      <div className="p-6">
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">国公立大学</h4>
          <div className="space-y-2">
            {data.国公立.map((uni, idx) => (
              <p key={idx} className="text-gray-700">• {uni}</p>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-3">私立大学</h4>
          <div className="space-y-2">
            {data.私立.map((uni, idx) => (
              <p key={idx} className="text-gray-700">• {uni}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function EducationSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            教育課程
          </h1>
          <p className="text-lg text-gray-700">
            KCPの教育理念と学習プログラム
          </p>
        </div>

        {/* Year Results Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">進学実績</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <YearResultsTable year="2024" />
            <YearResultsTable year="2023" />
          </div>
        </div>

        <div className="w-full h-px bg-gray-300 mb-16" />

        {/* 時間割例 */}
        <div className="mb-16" id="timetable">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">時間割例</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <th className="border border-gray-300 p-3 text-left">時間帯</th>
                  <th className="border border-gray-300 p-3 text-left">月</th>
                  <th className="border border-gray-300 p-3 text-left">火</th>
                  <th className="border border-gray-300 p-3 text-left">水</th>
                  <th className="border border-gray-300 p-3 text-left">木</th>
                  <th className="border border-gray-300 p-3 text-left">金</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold">09:00~09:50</td>
                  <td className="border border-gray-300 p-3">進学日本語①</td>
                  <td className="border border-gray-300 p-3">進学日本語①</td>
                  <td className="border border-gray-300 p-3">進学日本語①</td>
                  <td className="border border-gray-300 p-3">総合学習</td>
                  <td className="border border-gray-300 p-3">進学日本語①</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold">10:00~10:50</td>
                  <td className="border border-gray-300 p-3">進学日本語①</td>
                  <td className="border border-gray-300 p-3">進学日本語①</td>
                  <td className="border border-gray-300 p-3">進学日本語①</td>
                  <td className="border border-gray-300 p-3">総合学習</td>
                  <td className="border border-gray-300 p-3">進学日本語①</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold">11:00~11:50</td>
                  <td className="border border-gray-300 p-3">聴解</td>
                  <td className="border border-gray-300 p-3">読解</td>
                  <td className="border border-gray-300 p-3">聴解</td>
                  <td className="border border-gray-300 p-3">進学指導</td>
                  <td className="border border-gray-300 p-3">読解</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Timetable Notes */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
            <p className="text-gray-700 leading-relaxed mb-3">
              ※1. <span className="font-bold">【進学日本語】</span>
              <br />
              進学準備教育課程での選択授業
            </p>
            <p className="text-gray-700 leading-relaxed">
              ※2. <span className="font-bold">【選択授業】</span>
              <br />
              EJU対策、JLPT対策、小論文対策等が用意されています。大学・大学院に進学したい人、日本語能力試験に合格したい人、必要に応じて授業を選ぶことができます。
            </p>
          </div>
        </div>

        <div className="w-full h-px bg-gray-300 mb-16" />

        {/* 関連リンク */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900">関連リンク</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <a
              href="https://weavus-group.com/kcp/apply/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-semibold text-lg"
            >
              入学案内
            </a>
            <span className="text-gray-400">→</span>
            <a
              href="https://weavus-group.com/kcp/service/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-semibold text-lg"
            >
              学校生活
            </a>
            <span className="text-gray-400">→</span>
            <a
              href="https://weavus-group.com/kcp/contact/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-semibold text-lg"
            >
              お問い合わせ
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
