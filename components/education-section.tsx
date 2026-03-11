"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

// 年度別進学実績テーブルコンポーネント
function YearResultsTable({ year }: { year: string }) {
  const data: Record<string, { 国公立: string[]; 私立: string[]; 音楽美術?: string[] }> = {
    "2024": {
      国公立: ["東北大学", "東京農工大学", "茨城大学", "山口大学"],
      私立: [
        "立教大学", "明治大学", "中央大学", "法政大学", "青山学院大学", "立命館大学", "関西学院大学",
        "東京理科大学", "東京薬科大学", "明治薬科大学", "東洋大学", "帝京大学", "東海大学",
        "湘南工科大学", "東京工芸大学", "国士館大学", "昭和女子大学", "二松学舎大学", "文教大学",
        "武蔵野大学", "中央学院大学", "龍谷大学", "大阪観光大学", "東京国際大学", "関西国際大学",
        "多摩大学", "西武文理大学", "高千穂大学", "創価大学", "城西大学", "千葉科学大学",
        "ものつくり大学"
      ],
      音楽美術: [
        "武蔵野音楽大学", "多摩美術大学", "日本大学", "女子美術大学", "洗足学園音楽大学",
        "昭和音楽大学", "京都精華大学", "京都芸術大学", "文化学園大学", "尚美学園大学",
        "開志専門職大学"
      ]
    },
    "2023": {
      国公立: [
        "東京工業大学", "一橋大学", "京都大学", "九州大学", "名古屋大学", "筑波大学",
        "東京学芸大学", "神戸大学", "東京外国語大学", "千葉大学", "東京藝術大学",
        "宇都宮大学", "群馬大学", "長崎大学", "山口大学"
      ],
      私立: [
        "早稲田大学", "東京医科歯科大学", "東京理科大学", "立教大学", "明治大学", "法政大学",
        "青山学院大学", "立命館大学", "関西学院大学", "龍谷大学", "東京農業大学", "東洋大学",
        "日本大学", "専修大学", "駒澤大学", "東海大学", "帝京大学", "大東文化大学", "拓殖大学",
        "二松学舎大学", "神奈川大学", "東京電機大学", "東京工科大学", "武蔵野美術大学",
        "多摩美術大学", "女子美術大学", "金沢美術工芸大学", "京都芸術大学", "京都精華大学",
        "大阪芸術大学", "名古屋芸術大学", "名古屋造形大学", "昭和音楽大学", "洗足学園音楽大学",
        "文化学園大学", "桜美林大学", "山梨学院大学", "大手前大学", "嘉悦大学", "千葉科学大学",
        "城西大学", "国際大学", "ハリウッド大学院大学"
      ]
    }
  }

  const yearData = data[year]

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 text-white font-bold text-lg">
        {year}年度 進学実績
      </div>
      <div className="p-6 space-y-6">
        {yearData && (
          <>
            <div>
              <h4 className="font-bold text-blue-900 mb-4">【国公立大学/大学院】</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {yearData.国公立.map((uni, idx) => (
                  <div key={idx} className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center hover:bg-blue-100 transition">
                    <p className="text-gray-800 font-semibold text-sm">{uni}</p>
                  </div>
                ))}
            </div>
          </div>

          {/* Timetable Notes */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-16">
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

          {/* コース紹介 */}
          <div className="mb-16" id="course1">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">コース紹介</h2>

            {/* 進学準備教育 */}
            <div className="mb-12">
              <h3 className="text-lg font-bold mb-6 text-gray-900">
                ◆ 進学準備教育　2年課程 / 1年6か月課程
              </h3>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden rounded-lg">
                    <Image
                      src="https://weavus-group.com/kcp/wp-content/uploads/2026/02/%E3%82%B3%E3%83%BC%E3%82%B9%E7%B4%B9%E4%BB%8B-1024x683.jpg"
                      alt="進学準備教育コース"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      本課程は、大学進学に特化した課程です。毎週「進学指導」の時間があり、志望校決定から出願、受験、合格、進学先決定まで計画的に準備していきます。
                    </p>
                    <p>
                      また、通常の日本語の授業に加えて、日本留学試験（EJU）や大学独自試験に備えるための科目もあります。さらに、個別相談、個別指導を通じて手厚く指導していきます。
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-3">※文部科学省認定準備教育課程とは</h4>
                    <p className="text-gray-700 leading-relaxed">
                      本課程は文部科学省認定の準備教育課程に指定されていますので、自国での初等中等教育の期間が、日本の大学の受験資格である12年に満たない方も、本課程を修了すれば大学入試を受験し、進学することができます。
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-4">レベル別コース概要</h4>
                    <div className="space-y-3 text-gray-700 leading-relaxed text-sm">
                      <p>初級においては、通常クラスの日本語授業でコミュニケーション力を養い、進学日本語授業で大学入学試験を見据えた日本語力を養成していきます。</p>
                      <p>初中級以上では、文科系、理科系の進路に応じたＥＪＵ対策授業や、各学生が受験する大学独自試験に合わせて、英語から美術まで様々な科目の授業が受けられます。</p>
                      <p>中上級になると、通常クラスにおいて小論文のような論理的な文章の書き方やプレゼンテーションのような、進学後に有用な授業が用意されています。</p>
                      <p>また、留学生入試には必ずあると言っていい面接や口頭試問に関しては、計画的に個別指導をしていきます。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 進学高度日本語 */}
            <div className="mb-12">
              <h3 className="text-lg font-bold mb-6 text-gray-900">
                ◆ 進学高度日本語（学びと探求）　2年課程 / 1年9か月課程 / 1年6か月課程 / 1年3か月課程
              </h3>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden rounded-lg">
                    <Image
                      src="https://weavus-group.com/kcp/wp-content/uploads/2026/02/%E3%82%B3%E3%83%BC%E3%82%B9%E7%B4%B9%E4%BB%8B_2-768x512.jpg"
                      alt="進学高度日本語コース"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    本課程は、高度な日本語を身に付けるための課程です。高度な日本語とは、単に各種日本語試験において好成績を収めるにとどまらず、大学や大学院等で、学習や研究を円滑に遂行していけるだけの情報発信力と情報収集力をも含みます。
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-4">レベル別コース概要</h4>
                  <div className="space-y-3 text-gray-700 leading-relaxed text-sm">
                    <p></p>
                    <p></p>
                    <p>初級においては、発話力を中心とした日本語コミュニケーション力を身に付けます。</p>
                    <p>初中級以降は、コミュニケーション力に磨きをかけるとともに、読解力や文章表現力など、日本語力を高度化していくのに必要な要素を身に付けていきます。</p>
                    <p>中級、上級へとレベルが上がるとともに、培ってきた日本語力を用いて、日本文化への造詣を深め、日本のみならず地球規模で活躍できる人材へと成長していきます。</p>
                    <p>自分の目標のために必要な日本語力をより一層高められるよう、種々の選択授業も用意されています。進学や就職のための手厚い指導があることは、言うまでもありません。</p>
                  </div>
                </div>
              </div>

              {/* レベル別到達目標 */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4">レベル別到達目標</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-3 text-left font-bold">CEFR</th>
                        <th className="border border-gray-300 p-3 text-left font-bold">KCP</th>
                        <th className="border border-gray-300 p-3 text-left font-bold">到達目標</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr>
                        <td className="border border-gray-300 p-3">🟢A1</td>
                        <td className="border border-gray-300 p-3">Lv.1</td>
                        <td className="border border-gray-300 p-3">日常生活の基本的な場面において、情報の受信・発信ができる。</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">🟢A2</td>
                        <td className="border border-gray-300 p-3">Lv.2</td>
                        <td className="border border-gray-300 p-3">身近な話題について、ある程度のまとまりのある内容の読み書きや情報交換ができる。</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">🟡B1</td>
                        <td className="border border-gray-300 p-3">Lv.3<br />Lv.4</td>
                        <td className="border border-gray-300 p-3">
                          <p>自分の意見や考えを理由や根拠とともに発信したり、周囲から必要な情報を得たりすることができる。</p>
                          <p className="mt-2">社会的な事柄に関して、必要なデータを入手し、整理したうえで説明・発表ができる。</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">🟠B2</td>
                        <td className="border border-gray-300 p-3">Lv.5<br />Lv.6</td>
                        <td className="border border-gray-300 p-3">
                          <p>社会性を帯びた文章を理解したり、構成力のある文章を書いたり発表をしたりすることができる。</p>
                          <p className="mt-2">自分の専門分野について、自分で調べて論理的な文章が書ける。</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">🟣B2</td>
                        <td className="border border-gray-300 p-3">Lv.7<br />Lv.8</td>
                        <td className="border border-gray-300 p-3">
                          <p>新聞記事をはじめとする社会的な内容の文章を読みこなし、それについての議論ができる。</p>
                          <p className="mt-2">新聞記事をはじめとする論説文を自由に読みこなし、関連する情報も加味して自分の意見を構成し議論できる。</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-16" />

          {/* 授業内容 */}
          <div className="mb-16" id="course2">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">授業内容</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {[
                { title: "文字・表記・漢字・語彙", content: "ひらがな・カタカナの手書きから始め、���字の意味を把握することから、専門書に使われる語彙を理解し、日本独特の日本の文化に根ざした言い回し、慣用表現、コロケーションを使い、自分の言いたいことが表現できるようになることを目指す。" },
                { title: "聴解", content: "短い会話の聞き取りから始め、ラジオドラマや大学生向け講義の要点理解まで練習していく。一般的な話題であれば、あらゆる音声情報を聞いて概要をまとめられ、講義や議論の要点が理解できるようになることを目指す。" },
                { title: "読解", content: "読解テキストの内容を理解し、筆者の主張や考えに対して自分なりの意見を持ち、グループ内で意見交換する。最終的には、文学、エッセイ、新聞、論説文、専門書など長く複雑な文章でも、慣用表現や略語がまざっていても文脈から理解できるようになることを目指す。" },
              ].map((item, index) => (
                <div key={index} className="space-y-2 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold text-gray-900">◆ {item.title}</h4>
                  <p className="text-gray-700 leading-relaxed text-sm">{item.content}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {[
                { title: "総合学習", content: "メインテキストに沿って、「読む、聞く、書く、話す（やりとり）、話す（発表）」を組み合わせて勉強し、自分の意志や意図を正確かつ相手に失礼がない形で自然に伝え、相手の反応にうまく対処しながら、コミュニケーションが取れるようになることを目指す。" },
                { title: "作文/文章表現", content: "原稿用紙を正しく使い、学習した漢字を織り交ぜながら、自分の経験したことについて、事実を述べ、やや詳しい説明とその時の感情を述べたり、現実的ではない場面でも文章を創造して書いたりすることができるようになることを目指す。" },
                { title: "文章読解型小論文", content: "新聞や論説文を批判的に読み、書かれた内容の要旨をまとめ、意見の違いを論じ、自身の意見を述べることができるようになることを目指す。" },
              ].map((item, index) => (
                <div key={index} className="space-y-2 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold text-gray-900">◆ {item.title}</h4>
                  <p className="text-gray-700 leading-relaxed text-sm">{item.content}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {[
                { title: "進学準備（進学準備教育課程限定科目）", content: "自分で得た情報から、志望校を決め、大学入学までの計画を立て、出願書類を作成する。志望理由書や面接において自己表現をしたり、大学において日本人学生と対等に議論したりできるようになることを目指す。" },
                { title: "大学入試対策（進学準備教育課程限定科目）", content: "主に問題演習を通して、大学進学に合わせ、ＥＪＵ対策、入試対策等、合格に必要なスキルを身につけ、国公立を含め自分の希望する大学を目指す力をつけることを目指す。" },
                { title: "中間/期末タスク", content: "その学期の学習内容を応用し、ロールプレイ、スピーチ、プレゼンテーション、ディベートなどを行う。相手の考えを受け入れ、仲間と協働しながら発表を準備したり、わかりやすく発表することを目指す。" },
              ].map((item, index) => (
                <div key={index} className="space-y-2 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold text-gray-900">◆ {item.title}</h4>
                  <p className="text-gray-700 leading-relaxed text-sm">{item.content}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "テスト・振り返り", content: "自らの学習に関して、目標設定、目標達成のための計画、計画の振り返り、修正ができるようになることを目指す。メンタル面での自己管理を強化することも学ぶ。" },
                { title: "日本事情", content: "日本の伝統行事の体験、現代日本社会の見学、日本人との交流を通して現代日本人の考え方を知る。警察講話、避難訓練、防災体験などにより、日本で安全に暮らしていくことができるようになる。学校行事を通して、日本で生活していく上で常に求められる協調性を身に付ける。" },
              ].map((item, index) => (
                <div key={index} className="space-y-2 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold text-gray-900">◆ {item.title}</h4>
                  <p className="text-gray-700 leading-relaxed text-sm">{item.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-16" />

          {/* 特別クラス・進路サポート */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">特別クラス・進路サポート</h2>

            <p className="text-gray-700 mb-8 font-semibold">必要に応じて選択することができ、通常クラス以外の時間に行います。</p>

            <div className="space-y-8">
              {/* 日本語強化クラス */}
              <div>
                <pre className="mb-2"><span className="font-bold">【日本語強化クラス】</span>※レベル1・2対象</pre>
                <p className="text-gray-700 leading-relaxed">
                  日本語ゼロから「漢字/聴解/読解」スキル別に基礎を強化。これに続く日本語プラスの授業が受けられるだけの日本語の基礎力をつける。
                </p>
              </div>

              {/* 日本語プラス */}
              <div>
                <pre className="mb-4"><span className="font-bold">【日本語プラス】</span>※レベル3～対象</pre>
                <p className="font-semibold text-gray-900 mb-4">各種試験対策</p>

                <div className="space-y-3 text-gray-700 leading-relaxed">
                  <div>
                    <p><strong>EJU対策：</strong>EJUの読解、聴解・聴読解、記述に対応した授業</p>
                  </div>
                  <div>
                    <p><strong>数学Ⅰ/Ⅱ：</strong>EJUの数学コースⅠ（文科系：２次方程式、三角比、平面図形、確率など）・Ⅱ（理科系：1の範囲に加えて、数列、行列、微分、積分、ベクトルなど）の出題範囲に対応した授業</p>
                  </div>
                  <div>
                    <p><strong>物理、化学、生物：</strong>EJUの理科の出題範囲に対応した授業。各自の志望校学部学科に合わせて、2科目を選択</p>
                  </div>
                  <div>
                    <p><strong>総合科目：</strong>EJUの総合科目の出題範囲に対応した授業。政治、経済、社会、地理、歴史（産業革命以降）を扱う</p>
                  </div>
                  <div>
                    <p><strong>JLPT：</strong>N1とN2に分かれて、それぞれ読解、文法、文字、語彙、聴解の演習を行う</p>
                  </div>
                  <div>
                    <p><strong>TOEIC：</strong>受講生の実力に合わせて目標設定し、問題演習を行う</p>
                  </div>
                </div>
              </div>

              {/* 進路指導グリッド */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">大学・大学院進学指導</h4>
                  <div className="text-gray-700 leading-relaxed space-y-2 text-sm">
                    <p><strong>大学HR：</strong>日本の大学の概況、入試の実態、志望理由書の書き方、面接の受け方を指導</p>
                    <p><strong>大学院HR：</strong>入試の最新情報とともに、研究計画書の書き方、指導教官との面談の受け方を指導</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">美術指導</h4>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    「日本の美術系大学」に照準を合わせて実技指導を行います。さらに、各大学・大学院で要求されるデッサン・色彩構成・平面構成などの美術の基礎力を身につけます。一人一人の目的に合わせた受験指導を行っていきます。
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">個別指導</h4>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    KCPを卒業した後の進路に合わせて、試験対策科目や個別指導が受けられます。大学進学、大学院進学、美術系学校への進学、就職などそれぞれの進路に必要な試験科目や面接・実技の練習指導を行っています。進路に迷っている場合は、個別相談を通してキャリア設計をしていきます。
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">就職支援</h4>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    日本での就職を目指し、キャリア設計、職業選択、就職活動に関する方法の助言や指導を行います。ガイダンス、個別面接指導などキャリアコンサルタントの資格をもつ担当者と相談しながら、日本での就職活動を進めることができます。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-16" />

          {/* 時間割例 */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">時間割例</h2>

            <p className="text-gray-700 mb-4 font-semibold">※時間割は学期ごとに変更します。</p>

            <p className="text-sm text-gray-600 mb-6 flex flex-wrap gap-4">
              <span><span className="inline-block w-4 h-4 bg-blue-400 mr-1 align-middle"></span> 漢字</span>
              <span><span className="inline-block w-4 h-4 bg-yellow-400 mr-1 align-middle"></span> 聴解</span>
              <span><span className="inline-block w-4 h-4 bg-green-400 mr-1 align-middle"></span> 総合学習</span>
              <span><span className="inline-block w-4 h-4 bg-purple-400 mr-1 align-middle"></span> 読解</span>
              <span><span className="inline-block w-4 h-4 bg-red-400 mr-1 align-middle"></span> 小論文</span>
              <span><span className="inline-block w-4 h-4 bg-orange-400 mr-1 align-middle"></span> 進学準備 / 選択授業</span>
            </p>

            {/* 初級クラス */}
            <div className="mb-8">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2 font-bold">初級クラス</th>
                      <th className="border border-gray-300 p-2 font-bold">月</th>
                      <th className="border border-gray-300 p-2 font-bold">火</th>
                      <th className="border border-gray-300 p-2 font-bold">水</th>
                      <th className="border border-gray-300 p-2 font-bold">木</th>
                      <th className="border border-gray-300 p-2 font-bold">金</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr>
                      <td className="border border-gray-300 p-2 font-semibold">13:30–14:15</td>
                      <td className="border border-gray-300 p-2 bg-blue-100">漢字</td>
                      <td className="border border-gray-300 p-2 bg-yellow-100">聴解</td>
                      <td className="border border-gray-300 p-2 bg-blue-100">漢字・作文</td>
                      <td className="border border-gray-300 p-2 bg-yellow-100">聴解</td>
                      <td className="border border-gray-300 p-2 bg-blue-100">漢字</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-semibold">14:15–15:00</td>
                      <td className="border border-gray-300 p-2 bg-green-100">総合学習</td>
                      <td className="border border-gray-300 p-2 bg-green-100">総合学習</td>
                      <td className="border border-gray-300 p-2 bg-green-100">総合学習</td>
                      <td className="border border-gray-300 p-2 bg-green-100">総合学習</td>
                      <td className="border border-gray-300 p-2 bg-green-100">総合学習</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-semibold">15:15–16:00</td>
                      <td className="border border-gray-300 p-2 bg-green-100">総合学習</td>
                      <td className="border border-gray-300 p-2 bg-green-100">総合学習</td>
                      <td className="border border-gray-300 p-2 bg-green-100">総合学習</td>
                      <td className="border border-gray-300 p-2 bg-green-100">総合学習</td>
                      <td className="border border-gray-300 p-2 bg-green-100">総合学習</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-semibold">16:00–16:45</td>
                      <td className="border border-gray-300 p-2 bg-green-100">総合学習</td>
                      <td className="border border-gray-300 p-2 bg-green-100">総合学習</td>
                      <td className="border border-gray-300 p-2 bg-green-100">総合学習</td>
                      <td className="border border-gray-300 p-2 bg-green-100">総合学習</td>
                      <td className="border border-gray-300 p-2 bg-orange-100">進学準備</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-semibold">17:00–17:45</td>
                      <td className="border border-gray-300 p-2 bg-orange-100">進学日本語</td>
                      <td className="border border-gray-300 p-2">ー</td>
                      <td className="border border-gray-300 p-2 bg-orange-100">進学日本語</td>
                      <td className="border border-gray-300 p-2">ー</td>
                      <td className="border border-gray-300 p-2 bg-orange-100">進学日本語</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 中級クラス */}
            <div className="mb-8">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2 font-bold">中級クラス</th>
                      <th className="border border-gray-300 p-2 font-bold">月</th>
                      <th className="border border-gray-300 p-2 font-bold">火</th>
                      <th className="border border-gray-300 p-2 font-bold">水</th>
                      <th className="border border-gray-300 p-2 font-bold">木</th>
                      <th className="border border-gray-300 p-2 font-bold">金</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr>
                      <td className="border border-gray-300 p-2 font-semibold">09:00–09:45</td>
                      <td className="border border-gray-300 p-2 bg-blue-100">漢字語彙</td>
                      <td className="border border-gray-300 p-2 bg-yellow-100">聴解</td>
                      <td className="border border-gray-300 p-2 bg-blue-100">漢字語彙</td>
                      <td className="border border-gray-300 p-2 bg-blue-100">漢字語彙</td>
                      <td className="border border-gray-300 p-2 bg-blue-100">漢字語彙</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-semibold">09:45–10:30</td>
                      <td className="border border-gray-300 p-2 bg-yellow-100">聴解</td>
                      <td className="border border-gray-300 p-2 bg-green-100">総合学習</td>
                      <td className="border border-gray-300 p-2 bg-purple-100">読解</td>
                      <td className="border border-gray-300 p-2 bg-green-100">総合学習</td>
                      <td className="border border-gray-300 p-2 bg-yellow-100">聴解</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-semibold">10:45–11:30</td>
                      <td className="border border-gray-300 p-2 bg-red-100">文章読解型小論文</td>
                      <td className="border border-gray-300 p-2 bg-green-100">総合学習</td>
                      <td className="border border-gray-300 p-2 bg-green-100">総合学習</td>
                      <td className="border border-gray-300 p-2 bg-green-100">総合学習</td>
                      <td className="border border-gray-300 p-2 bg-purple-100">読解</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-semibold">11:30–12:15</td>
                      <td className="border border-gray-300 p-2 bg-red-100">文章読解型小論文</td>
                      <td className="border border-gray-300 p-2 bg-orange-100">選択授業1</td>
                      <td className="border border-gray-300 p-2 bg-orange-100">選択授業2</td>
                      <td className="border border-gray-300 p-2 bg-gray-100">★JLPT対策</td>
                      <td className="border border-gray-300 p-2 bg-purple-100">読解</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-16" />

          {/* 合格までのスケジュール */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">合格までのスケジュール</h2>

            {/* 1年目 */}
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-4 text-gray-800">1年目（基礎固め期間）</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm bg-white">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="border border-gray-300 p-3 font-bold text-left">区分</th>
                      <th className="border border-gray-300 p-3 font-bold text-left">大学進学</th>
                      <th className="border border-gray-300 p-3 font-bold text-left">大学院進学</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">4月〜12月</td>
                      <td className="border border-gray-300 p-3 text-gray-700">
                        日本語基礎力強化<br />
                        EJU / JLPT対策<br />
                        聴解・読解・語彙力向上
                      </td>
                      <td className="border border-gray-300 p-3 text-gray-700">
                        日本語力強化<br />
                        EJU / JLPT対策<br />
                        日本の大学事情理解<br />
                        キャリアデザイン
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2年目 前半 */}
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-4 text-gray-800">2年目 前半（応用力強化期間）</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm bg-white">
                  <thead>
                    <tr className="bg-green-100">
                      <th className="border border-gray-300 p-3 font-bold text-left">区分</th>
                      <th className="border border-gray-300 p-3 font-bold text-left">大学進学</th>
                      <th className="border border-gray-300 p-3 font-bold text-left">大学院進学</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">12月〜9月</td>
                      <td className="border border-gray-300 p-3 text-gray-700">
                        受験スケジュール作成<br />
                        日本の大学情報収集<br />
                        6月 第1回EJU受験<br />
                        私立大学出願
                      </td>
                      <td className="border border-gray-300 p-3 text-gray-700">
                        研究テーマ決定<br />
                        研究室探し<br />
                        教授面談<br />
                        研究計画書作成<br />
                        試験内容確認<br />
                        出願開始
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2年目 後半 */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">2年目 後半（ラストスパート）</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm bg-white">
                  <thead>
                    <tr className="bg-purple-100">
                      <th className="border border-gray-300 p-3 font-bold text-left">区分</th>
                      <th className="border border-gray-300 p-3 font-bold text-left">大学進学</th>
                      <th className="border border-gray-300 p-3 font-bold text-left">大学院進学</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">9月〜3月</td>
                      <td className="border border-gray-300 p-3 text-gray-700">
                        私立大学受験<br />
                        11月 第2回EJU受験<br />
                        国立大学出願<br />
                        二次試験対策<br />
                        国立大学受験
                      </td>
                      <td className="border border-gray-300 p-3 text-gray-700">
                        II期試験出願<br />
                        面接対策<br />
                        II期試験受験
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 mb-16" />
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">指定校推薦</h2>

            <p className="text-gray-700 mb-8">
              KCPでは、これまでの安定した進学実績と教育内容が評価され、以下の大学より指定校推薦枠をいただいています。
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {[
                "法政大学",
                "東洋大学",
                "芝浦工業大学",
                "関西学院大学",
                "拓殖大学",
                "昭和女子大学",
                "尚美学園大学",
                "フェリス女学院大学",
                "東京工芸大学",
                "武蔵野大学",
                "帝京大学",
                "駒沢女子大学",
                "東京情報大学",
                "横浜商科大学",
                "明海大学",
                "文化学園大学"
              ].map((uni, index) => (
                <div key={index} className="p-4 bg-blue-50 rounded-lg text-center text-gray-800 font-semibold border border-blue-200 hover:bg-blue-100 transition">
                  {uni}
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <p className="text-sm text-gray-700">
                ※毎年の状況により変わることもありますので、希望する方には、早期の進路相談をおすすめします。成績・出席率・人物評価などによる校内選考を実施します
              </p>
            </div>
          </div>

          {/* 進学実績 */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">直近5年間の進学実績</h2>

            <div className="space-y-8">
              {/* 国公立大学/大学院 */}
              <div className="bg-blue-50 p-8 rounded-lg border border-blue-200">
                <h3 className="text-lg font-bold mb-6 text-blue-900 text-center border-b-2 border-blue-600 pb-4">
                  国公立大学/大学院
                </h3>
                <div className="text-gray-700 text-sm leading-loose text-center space-y-2">
                  <p>
                    東京大学、京都大学、大阪大学、名古屋大学、東北大学、九州大学、<br />
                    北海道大学、一橋大学、東京工業大学、筑波大学、神戸大学、<br />
                    横浜国立大学、千葉大学、東京外国語大学、東京学芸大学、<br />
                    東京都立大学、広島大学、金沢大学、電気通信大学、熊本大学、<br />
                    長崎大学、山口大学、埼玉大学、信州大学、群馬大学、<br />
                    茨城大学、弘前大学、富山大学、山梨大学、宇都宮大学、<br />
                    滋賀大学、上越教育大学、兵庫県立大学、兵庫教育大学、<br />
                    横浜市立大学、大阪公立大学、広島市立大学、名古屋市立大学
                  </p>
                  <p className="text-gray-400 italic">等</p>
                </div>
              </div>

              {/* 私立大学/大学院 */}
              <div className="bg-purple-50 p-8 rounded-lg border border-purple-200">
                <h3 className="text-lg font-bold mb-6 text-purple-900 text-center border-b-2 border-purple-600 pb-4">
                  私立大学/大学院
                </h3>
                <div className="text-gray-700 text-sm leading-loose text-center space-y-2">
                  <p>
                    早稲田大学、慶應義塾大学、上智大学、明治大学、青山学院大学、<br />
                    立教大学、中央大学、法政大学、立命館大学、関西学院大学、<br />
                    同志社大学、関西大学、東京理科大学、芝浦工業大学、<br />
                    学習院大学、明治学院大学、日本大学、専修大学、東洋大学、<br />
                    駒澤大学、神奈川大学、工学院大学、東京農業大学、<br />
                    東京電機大学、東京工科大学、東京都市大学、帝京大学、<br />
                    国士舘大学、昭和女子大学、武蔵野大学、文教大学、<br />
                    二松学舎大学、拓殖大学、大東文化大学、東海大学、<br />
                    城西大学、国際医療福祉大学、産業医科大学
                  </p>
                  <p className="text-gray-400 italic">等</p>
                </div>
              </div>

              {/* 芸術系・音楽系大学/大学院 */}
              <div className="bg-red-50 p-8 rounded-lg border border-red-200">
                <h3 className="text-lg font-bold mb-6 text-red-900 text-center border-b-2 border-red-600 pb-4">
                  芸術系・音楽系大学/大学院
                </h3>
                <div className="text-gray-700 text-sm leading-loose text-center space-y-2">
                  <p>
                    東京藝術大学、多摩美術大学、女子美術大学、武蔵野美術大学、<br />
                    東京造形大学、京都芸術大学、京都精華大学、京都市立芸術大学、<br />
                    名古屋芸術大学、名古屋造形大学、大阪芸術大学、<br />
                    愛知県立芸術大学、神戸芸術工科大学、東北芸術工科大学、<br />
                    秋田公立美術大学、成安造形大学、横浜美術大学、<br />
                    金沢美術工芸大学、武蔵野音楽大学、洗足学園音楽大学、<br />
                    昭和音楽大学、東邦音楽大学、尚美学園大学、文化学園大学、<br />
                    東京工芸大学、日本映画大学
                  </p>
                  <p className="text-gray-400 italic">等</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mt-8">
              <p className="text-gray-700 text-sm leading-relaxed text-center">
                <strong>多くの卒業生が難関大学・専門学校への進学を実現。</strong><br />
                KCPは確かな進学実績と、指定校推薦枠を通じて、学びの先の未来を支えています。
              </p>
            </div>
          </div>

          {/* 進学実績一覧 */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">進学実績一覧</h2>

            <div className="space-y-4">
              {/* 2024年 */}
              <YearResultsTable year="2024" />

              {/* 2023年 */}
              <YearResultsTable year="2023" />

              {/* 2022-2019年（折りたたみ） */}
              <ToggleableYearResults />
            </div>
          </div>

          {/* 卒業生の声 */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-gray-900">卒業生の声</h2>

            <div className="space-y-16">
              {/* 卒業生1 - 黄 厦さん */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="grid md:grid-cols-3 gap-0">
                  {/* 画像 */}
                  <div className="relative h-96 md:col-span-1 overflow-hidden">
                    <Image
                      src="https://weavus-group.com/kcp/wp-content/uploads/2026/02/%E9%BB%84-%E5%8E%A6%E3%81%95%E3%82%93.jpg"
                      alt="黄 厦さん"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* コンテンツ */}
                  <div className="md:col-span-2 p-8 bg-white">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">黄 厦さん / 中国出身</h3>
                      <p className="text-gray-700 font-semibold">進学先：東京大学大学院　農学生命科学研究科</p>
                      <p className="text-gray-700 font-semibold">現  職： P&Gジャパン</p>
                    </div>
                    <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
                      <p>KCPで過ごした時間は、私にとって日本語学習以上の意味を持つ、大切な経験でした。勉強だけでなく、人としての姿勢や考え方を学べた場所だと感じています。</p>
                      <p>友達と色紙でおせち料理を作ったり、運動会でチーム一丸となって走ったり、ボランティア活動で放課後に子ども食堂を手伝ったり、浴衣の着付け教室に参加したり――その一つひとつが、今でも昨日のことのように思い出されます。</p>
                      <p>先生方も経験豊富で、いつもいろいろな面白い教え方をしてくれました。気がついたら、知識が自然と頭に入ってきていた、そんな感覚です。</p>
                      <p>KCPは、私にとって堅苦しい学校というより、実家のような場所でした（笑）。</p>
                      <p>KCPで学んだことは、大きく分けて二つありまります。一つは、場面に応じた正しい日本語の使い分け、もう一つは日本のカルチャーです。</p>
                      <p>一つ目の日本語についてですが、特に書き言葉と話し言葉の違いを学びました。この二つを間違えて使うと、相手にあまりよくない印象を与えてしまうことがあります。私はこの二つを意識して使い分けてきたことで、学業や仕事、日常生活でも誤解なく自分の考えを伝えられるように��りました。</p>
                      <p>もう一つは、日本のカルチャーです。日本社会では、ルール以上に「空気を共有できるか」が大切にされますが、KCPでその感覚を学んだことで、日本人の輪にも自然に溶け込めたと感じています。こうした経験は、大学生活を経て社会に出た今も、私の大きな支えになっています。</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 卒業生2 - Patrick Grainger さん */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="grid md:grid-cols-3 gap-0">
                  {/* 画像 */}
                  <div className="relative h-96 md:col-span-1 overflow-hidden">
                    <Image
                      src="https://weavus-group.com/kcp/wp-content/uploads/2026/02/patric.png"
                      alt="Patrick Grainger さん"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* コンテンツ */}
                  <div className="md:col-span-2 p-8 bg-white">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Patrick Grainger さん / アメリカ出身</h3>
                      <p className="text-gray-700 font-semibold">現  職： 東京防災救急協会</p>
                    </div>
                    <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
                      <p>大学を卒業した後、さらに日本語の力をしっかりと伸ばしたいと考え、KCP地球市民日本語学校に入学いたしました。現在は、在日外国人を対象とした防災教育の仕事に携わっています。日本で暮らす外国人の方々が安心して生活できるよう支援するこの仕事は、私にとって大きなやりがいとなっています。</p>
                      <p>KCPでは、アルバイト先を紹介していただいたことをきっかけに、面接練習や履歴書の作成などを先生方と一緒に進めさせていただきました。また、アルバイト先の複雑な労働条件や契約内容についても、分かりやすく言い換えて丁寧に説明していただき、大変心強く感じました。そのアルバイト先で最終的に正社員として採用されることになりましたので、私の日本でのキャリアはKCPで始まったと言っても過言ではありません。</p>
                      <p>打ち合わせや会議、ビジネスメールなど、実際のビジネスシーンで求められる敬語表現や言い回しをKCPで徹底的に身につけたことで、社内外を問わず、相手や場面に応じた適切なコミュニケーションが取れるようになりました。特に、日本語には似ているようでニュアンスが大きく異なる表現が多くありますが、それらを正確に識別し、状況に合わせて使い分けられるようになったことは、仕事を進める上で大きな強みになっています。</p>
                      <p>こうした実践的な日本語力をKCPで基礎からしっかり学べたおかげで、職場でも自信を持ってやり取りができるようになりました。少し細やかな自慢ではありますが、その成果として、周囲から日本育ちだと誤って思われたこともあり、自分自身の成長を実感するきっかけにもなっています。</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 卒業生3 - Lee Yit Chang さん */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="grid md:grid-cols-3 gap-0">
                  {/* 画像 */}
                  <div className="relative h-96 md:col-span-1 overflow-hidden">
                    <Image
                      src="https://weavus-group.com/kcp/wp-content/uploads/2026/02/leesang.jpg"
                      alt="Lee Yit Chang さん"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* コンテンツ */}
                  <div className="md:col-span-2 p-8 bg-white">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Lee Yit Chang さん / マレーシア出身</h3>
                      <p className="text-gray-700 font-semibold">進学先：早稲田大学 文化構想学部文化構想学科</p>
                    </div>
                    <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
                      <p>私が来日した理由は、英語圏とは異なる文化に強い���味があったからです。私はオーストラリアで育ったため、日本の価値観や生活スタイル、言語などに惹かれ、「実際に日本で生活しながら学んでみたい」と思い来日しました。現在は、日本で社会人として働いています。</p>
                      <p>KCPの一番の良さは、先生方がとても親身になってくれるところだと思います。勉強のことだけでなく、悩み事や不安なことも丁寧に聞いてくれて、とても心強かったです。</p>
                      <p>また、KCPの授業は、先生が教えてくれる内容を一つ一つコツコツ理解していくことで、少しずつ日本語が確実に上達していく点が特徴だと思います。KCPでの日本語学習は、マラソンのようなイメージでした。一瞬で上達するのではなく、正しいペースで続けることで、着実に力がついていく感覚がありました。</p>
                      <p>KCPで日本語を勉強したおかげで、当初の目標だった大学に合格することができました。また、KCPにはさまざまな国から来た学生がいて、それぞれ異なる背景や価値観を持つ仲間と一緒に学べたことは、自分の視野を大きく広げてくれました。</p>
                      <p>日本語だけでなく、多様な視点を学べたことも、今の自分にとって非常に大きな財産になっています。</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 卒業生4 - 赵 瑞霄さん */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="grid md:grid-cols-3 gap-0">
                  {/* 画像 */}
                  <div className="relative h-96 md:col-span-1 overflow-hidden">
                    <Image
                      src="https://weavus-group.com/kcp/wp-content/uploads/2026/02/%E8%B5%B5-%E7%91%9E%E9%9C%84%E3%81%95%E3%82%93-.png"
                      alt="赵 瑞霄さん"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* コンテンツ */}
                  <div className="md:col-span-2 p-8 bg-white">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">赵 瑞霄さん / 中国出身</h3>
                      <p className="text-gray-700 font-semibold">進学先：東北大学　農学部</p>
                    </div>
                    <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
                      <p>KCPの先生方は個性豊かですが、みんな学生一人ひとりを大切にしてくださっています。学習面だけでなく、生活の相談にものってくださって、安心して勉強できる環境だと感じています。</p>
                      <p>また、毎学期に課外活動があって、クラス以外の場面で先生やクラスメートの新たな一面を見ることができます。特に印象に残っているのはBBQイベントです。先生と学生が一緒にバーベキューを楽しみ、普段は厳しそうな校長先生も頑張って焼いて、とても和やかな雰囲気でした。</p>
                      <p>これから留学を考えている方には、目標を持ち、努力を続けること、そして困ったときは一人で抱え込まず、周囲に相談することの大切さを伝えたいです。日本留学は決して簡単ではありませんが、前向きな気持ちがあれば乗り越えられると思います。</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 卒業生5 - 昔 聖原さん */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="grid md:grid-cols-3 gap-0">
                  {/* 画像 */}
                  <div className="relative h-96 md:col-span-1 overflow-hidden">
                    <Image
                      src="https://weavus-group.com/kcp/wp-content/uploads/2026/02/%E6%98%94-%E8%81%96%E5%8E%9F-.jpg"
                      alt="昔 聖原さん"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* コンテンツ */}
                  <div className="md:col-span-2 p-8 bg-white">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">昔 聖原さん / 韓国出身</h3>
                      <p className="text-gray-700 font-semibold">進学先：法政大学 人間環境学部人間環境学科（指定校推薦）</p>
                    </div>
                    <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
                      <p>「勉強をして大学に入る」という一般的な受験のプロセスであれば、正直どこでも学べると思います。しかしKCPで私が学んだのは、日本語だけではなく、「態度」でした。KCPには、日本語の指導だけでなく、学生一人ひとりを親身になって支えてくださる先生方がいます。在学中はもちろん、卒業後も日本で日本社会の中で活躍できるよう、さまざまなアドバイスをしてくださいました。</p>
                      <p>そのアドバイスは、ときに小言や説教、あるいは叱られているように感じて、正直「うるさいな……」と思ってしまうこともあったかもしれません。それでも、そうした言葉の一つひとつは、学生を大切に思う先生方の優しい気持ちから生まれたものだったと、今では感じています。こうした学びは、今に至るまで私にとって大きな宝となっています。</p>
                      <p>正直に言うと、私は語学の才能に恵まれているとは思いません。それでも、思うようにいかない時があっても、KCPで学んだ勤勉で誠実な姿勢を大切にし、日本語はもちろん、大学での授業や就職活動にも生かせる力を磨いてきました。決して胸を張って自慢できるレベルではないかもしれませんが、来日当初の自分を振り返ると、確かな成長を感じます。この経験を原動力に、これからも目の前に立ちはだかる壁を乗り越えていきたいと思います。</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 卒業生6 - 朱 瑞婷さん */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="grid md:grid-cols-3 gap-0">
                  {/* 画像 */}
                  <div className="relative h-96 md:col-span-1 overflow-hidden">
                    <Image
                      src="https://weavus-group.com/kcp/wp-content/uploads/2026/02/%E6%9C%B1-%E7%91%9E%E5%A9%B7%E3%81%95%E3%82%93-.jpg"
                      alt="朱 瑞婷さん"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* コンテンツ */}
                  <div className="md:col-span-2 p-8 bg-white">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">朱 瑞婷さん / 中国出身</h3>
                      <p className="text-gray-700 font-semibold">進学先：多摩美術大学 情報デザイン学科情報デザインコース</p>
                    </div>
                    <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
                      <p>KCPでの学習経験は、私にとって非常に実り多いものでした。中でも最も大きく成長したと感じているのは、作文力です。毎週行われる体系的な作文指導と、先生方の丁寧な添削のおかげで、論文を書く力が大きく向上しました。この経験は、その後の大学入試においても大きな助けとなりました。</p>
                      <p>また、勉強だけでなく、KCPの課外活動にも積極的に参加しました。演劇部の一員として、教科書だけでは学べない日本語表現を数多く身につけることができ、同����を持つ仲間とも出会うことができました。卒業後も、私たちは今なお連絡を取り合っています。</p>
                      <p>こうした経験から、留学生活ではぜひ異なる文化的背景を持つ仲間と積極的に交流することをおすすめします。視野が広がるだけでなく、物事をさまざまな立場や視点から考えられるよう���な���、何よりもかけがえのない友情を得ることができます。</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 卒業生7 - 戚笑さん */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="grid md:grid-cols-3 gap-0">
                  {/* 画像 */}
                  <div className="relative h-96 md:col-span-1 overflow-hidden">
                    <Image
                      src="https://weavus-group.com/kcp/wp-content/uploads/2026/02/%E6%88%9A%E7%AC%91%E3%81%95%E3%82%93--768x576.jpg"
                      alt="戚笑さん"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* コンテンツ */}
                  <div className="md:col-span-2 p-8 bg-white">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">戚笑さん / 中国出身</h3>
                      <p className="text-gray-700 font-semibold">進学先：静岡文化芸術大学大学院 デザイン研究科</p>
                    </div>
                    <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
                      <p>私は2020年11月に来日しました。日本の大学院で建築デザインを勉強したいと思い、日本に来ることを決めました。現在、東京にあるディスプレイおよび内装管理の会社に務めています。</p>
                      <p>私がKCPに通っていた時期はコロナ禍だったため、みんなで参加できるイベントがあまり多くありませんでした。その中でも特に印象に残っているのがスピーチ大会で���。私は���ラスメートと一緒に応援動画を作成し、クラスメート���員の似顔絵を描きました。</p>
                      <p>大学院の進学準備は正直言ってとても順調とは言えませんでした。教授との面談で研究テーマを厳しく批判され、モチベーションを完全に失い、何も手につかない状態になったこともありました。そのとき、諸永先生が何度も面接練習をしてくださり、安楽先生が毎回授業後に相談に乗ってくださったおかげで、最終的に気持ちを奮い立たせ、無事に大学院に合格することができました。</p>
                      <p>KCPで私が得た最大の成果は確実な日本語の基礎力だと思います。学校では宿題や試験が多く大変でしたが、一つ一つを真剣に準備したおかげで、自分の日本語能力が確実に伸びているのを実感できました。</p>
                      <p>少し自慢話になるかもしれませんが、私は授業外で特別にEJUやJLPTの勉強をすることなく、授業内容をしっかり理解するだけで非常に良い成績を取ることができました。その中でもEJUの高得点は大学院入試でも強みとなり、大きな助けとなりました。会社に入ったばかりの頃、同僚たちは私が日本に来てからまだ4年しか経っていないことに驚いていたのも、KCPでの学びが基盤となっていたからだと思います。</p>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-12 text-gray-900">2024年8月JPET 日本全国一位</h2>
              <h6>
                後藤新平・新渡戸稲造記念 第26回全国高校生・留学生作文コンクール　2024 留学生の部奨励賞</h6>
              {/* 卒業生8 - 张 首馨さん */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="grid md:grid-cols-3 gap-0">
                  {/* 画像 */}
                  <div className="relative h-96 md:col-span-1 overflow-hidden">
                    <Image
                      src="https://weavus-group.com/kcp/wp-content/uploads/2026/02/%E5%BC%A0-%E9%A6%96%E9%A6%A8%E3%81%95%E3%82%93--768x571.png"
                      alt="张 首馨さん"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* コンテンツ */}
                  <div className="md:col-span-2 p-8 bg-white">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">张 首馨さん / 中国出身</h3>
                      <p className="text-gray-700 font-semibold">進学先：東京外国語大学大学院 総合国際学研究科</p>
                    </div>
                    <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
                      <p>KCPでの授業では、クラスメートと自由に意見交換ができ���さまざまな国から来た学生たちの考え方や価値観に触れることができました。そのおかげで、各国に対する理解が深まり、日々の会話を通して自然と日本語の口語力も鍛えられました。さらに、新しい知識をたくさん得ることができ、とても充実した時間を過ごしました。</p>
                      <p>大学院に合格する前は不安でいっぱいでしたが、KCPでの毎日の授業が楽しく、勉強のストレスを感じることなく前向きに取り組むことができました。無事に大学院に合格できたことに加え、JPETや拓殖大学の作文コンテストでも賞をいただくことができ、本当に嬉しく、KCPで学んだ成果を実感しました。</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 卒業生9 - 李 黛玉さん */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="grid md:grid-cols-3 gap-0">
                  {/* 画像 */}
                  <div className="relative h-96 md:col-span-1 overflow-hidden">
                    <Image
                      src="https://weavus-group.com/kcp/wp-content/uploads/2026/02/%E6%9D%8E-%E9%BB%9B%E7%8E%89%E3%81%95%E3%82%93-.png"
                      alt="李 黛玉さん"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* コンテンツ */}
                  <div className="md:col-span-2 p-8 bg-white">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">李 黛玉さん / 中国出身</h3>
                      <p className="text-gray-700 font-semibold">進学先：東京藝術大学大学院 映像研究科アニメーション専攻</p>
                    </div>
                    <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
                      <p>私は中級クラスからKCPでの学習を始めました。母国での勉強は主に試験対策中心だったため、実践的な日本語力がまだ身についていなかったのです。中級クラスでは課題が多く、特に作文の宿題を通して、文の構造を意識しながら書く力を身につけました。</p>
                      <p>最初は簡単な文から��まり、徐々��複雑な文型を使えるようになったことが、自信にもつながりました。KCPの授業の良いところは、中級という基礎を築く段階で繰り返し練習を行い、記憶を定着させていくことに重点が置かれている点です。語彙や文法の説明も丁寧で、意味や使い方の広がりについても詳しく教えてくださるので、その後の高度な日本語の学習やN1対策にも非常に役立ちました。</p>
                      <p>上級になれば、先生は毎日授業の冒頭に、10分ほどニュースや時事問題、ことわざなどの話をしてくださいました。その時間で教科書には載っていないような表現や語彙をたくさん学ぶことができました。私はそこで覚えた言葉を、実際に藝大の入試でも使うことができ、とても助けになりました。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
