'use client'

import { useTranslation } from 'react-i18next'

export const TopEducation = () => {
  const { t } = useTranslation()

  return (
    <section id="education" className="py-20 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-8">
          <span>ホーム</span> <span className="mx-2">/</span> <span>教育内容</span>
        </div>

        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-balance">
          教育内容
        </h1>
        
        {/* Subtitle */}
        <p className="text-center text-lg text-gray-700 mb-16">
          世界から集う若者に、質の高い日本語教育を。確かな日本語力ときめ細かな進路指導で夢の実現を支えていきます。
        </p>

        {/* 教育理念・教育方針 */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 border-b-2 border-blue-600 pb-4">
            教育理念・教育方針
          </h2>
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              本学の基本理念は、若者が切磋琢磨しながら学び成長し、21世紀を生き抜く力を身につけて世界の平和と繁栄に貢献することにある。そのためには、科学技術が進展する現代において、自主・自立・自尊と、自省・自制・自戒を併せ持つバランスの取れた精神が不可欠であり、これを基盤とし、自文化と異文化を正しく理解し、普遍的な人類観を育む。
            </p>
            <p>
              本学は、生涯にわたって主体的に学び続ける姿勢を重視し、批判力・論理力・明晰性といった学びの基礎力を育成するとともに、大学や企業活動にも通用する高度で実践的な日本語力の養成を教育目標とする。
            </p>
          </div>
        </div>

        {/* コース紹介 */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 border-b-2 border-blue-600 pb-4">
            コース紹介
          </h2>
          
          {/* 進学準備教育 */}
          <div className="mb-12">
            <div className="bg-blue-50 p-8 rounded-lg border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold mb-4 text-blue-900">進学準備教育　2年課程 / 1年6か月課程</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                本課程は、大学進学に特化した課程です。毎週「進学指導」の時間があり、志望校決定から出願、受験、合格、進学先決定まで計画的に準備していきます。
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                また、通常の日本語の授業に加えて、日本留学試験（EJU）や大学独自試験に備えるための科目もあります。さらに、個別相談、個別指導を通じて手厚く指導していきます。
              </p>
              
              <div className="bg-white p-6 rounded mt-6 border border-blue-200">
                <h4 className="font-bold text-blue-900 mb-3">※文部科学省認定準備教育課程とは</h4>
                <p className="text-gray-700 leading-relaxed">
                  本課程は文部科学省認定の準備教育課程に指定されていますので、自国での初等中等教育の期間が、日本の大学の受験資格である12年に満たない方も、本課程を修了すれば大学入試を受験し、進学することができます。
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-xl font-bold mb-4">レベル別コース概要</h4>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>初級においては</strong>、通常クラスの日本語授業でコミュニケーション力を養い、進学日本語授業で大学入学試験を見据えた日本語力を養成していきます。
                </p>
                <p>
                  <strong>初中級以上では</strong>、文科系、理科系の進路に応じたＥＪＵ対策授業や、各学生が受験する大学独自試験に合わせて、英語から美術まで様々な科目の授業が受けられます。
                </p>
                <p>
                  <strong>中上級になると</strong>、通常クラスにおいて小論文のような論理的な文章の書き方やプレゼンテーションのような、進学後に有用な授業が用意されています。
                </p>
                <p>
                  <strong>また</strong>、留学生入試には必ずあると言っていい面接や口頭試問に関しては、計画的に個別指導をしていきます。
                </p>
              </div>
            </div>
          </div>

          {/* 進学高度日本語 */}
          <div>
            <div className="bg-purple-50 p-8 rounded-lg border-l-4 border-purple-600">
              <h3 className="text-2xl font-bold mb-4 text-purple-900">進学高度日本語（学びと探求）　2年課程 / 1年9か月課程 / 1年6か月課程 / 1年3か月課程</h3>
              <p className="text-gray-700 leading-relaxed">
                本課程は、高度な日本語を身に付けるための課程です。高度な日本語とは、単に各種日本語試験において好成績を収めるにとどまらず、大学や大学院等で、学習や研究を円滑に遂行していけるだけの情報発信力と情報収集力をも含みます。
              </p>
            </div>

            <div className="mt-8">
              <h4 className="text-xl font-bold mb-4">レベル別コース概要</h4>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>初級においては</strong>、発話力を中心とした日本語コミュニケーション力を身に付けます。
                </p>
                <p>
                  <strong>初中級以降は</strong>、コミュニケーション力に磨きをかけるとともに、読解力や文章表現力など、日本語力を高度化していくのに必要な要素を身に付けていきます。
                </p>
                <p>
                  <strong>中級、上級へとレベルが上がるとともに</strong>、培ってきた日本語力を用いて、日本文化への造詣を深め、日本のみならず地球規模で活躍できる人材へと成長していきます。
                </p>
                <p>
                  <strong>自分の目標のために必要な日本語力をより一層高められるよう</strong>、種々の選択授業も用意されています。進学や就職のための手厚い指導があることは、言うまでもありません。
                </p>
              </div>
            </div>

            <div className="mt-8 bg-gray-50 p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-6">レベル別到達目標</h4>
              <div className="space-y-4">
                <div className="flex gap-4 pb-4 border-b">
                  <div className="font-bold text-center w-20">🟢A1 Lv.1</div>
                  <div className="text-gray-700">日常生活の基本的な場面において、情報の受信・発信ができる。</div>
                </div>
                <div className="flex gap-4 pb-4 border-b">
                  <div className="font-bold text-center w-20">🟢A2 Lv.2</div>
                  <div className="text-gray-700">身近な話題について、ある程度のまとまりのある内容の読み書きや情報交換ができる。</div>
                </div>
                <div className="flex gap-4 pb-4 border-b">
                  <div className="font-bold text-center w-20">🟡B1</div>
                  <div>
                    <p className="text-gray-700 mb-2">Lv.3 / Lv.4</p>
                    <p className="text-gray-700">自分の意見や考えを理由や根拠とともに発信したり、周囲から必要な情報を得たりすることができる。社会的な事柄に関して、必要なデータを入手し、整理したうえで説明・発表ができる。</p>
                  </div>
                </div>
                <div className="flex gap-4 pb-4 border-b">
                  <div className="font-bold text-center w-20">🟠B2</div>
                  <div>
                    <p className="text-gray-700 mb-2">Lv.5 / Lv.6</p>
                    <p className="text-gray-700">社会性を帯びた文章を理解したり、構成力のある文章を書いたり発表をしたりすることができる。自分の専門分野について、自分で調べて論理的な文章が書ける。</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="font-bold text-center w-20">🟣B2</div>
                  <div>
                    <p className="text-gray-700 mb-2">Lv.7 / Lv.8</p>
                    <p className="text-gray-700">新聞記事をはじめとする社会的な内容の文章を読みこなし、それについての議論ができる。新聞記事をはじめとする論説文を自由に読みこなし、関連する情報も加味して自分の意見を構成し議論できる。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 授業内容 */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 border-b-2 border-blue-600 pb-4">
            授業内容
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "文字・表記・漢字・語彙",
                content: "ひらがな・カタカナの手書きから始め、漢字の意味を把握することから、専門書に使われる語彙を理解し、日本独特の日本の文化に根ざした言い回し、慣用表現、コロケーションを使い、自分の言いたいことが表現できるようになることを目指す。"
              },
              {
                title: "聴解",
                content: "短い会話の聞き取りから始め、ラジオドラマや大学生向け講義の要点理解まで練習していく。一般的な話題であれば、あらゆる音声情報を聞いて概要をまとめられ、講義や議論の要点が理解できるようになることを目指す。"
              },
              {
                title: "読解",
                content: "読解テキストの内容を理解し、筆者の主張や考えに対して自分なりの意見を持ち、グループ内で意見交換する。最終的には、文学、エッセイ、新聞、論説文、専門書など長く複雑な文章でも、慣用表現や略語がまざっていても文脈から理解できるようになることを目指す。"
              },
              {
                title: "総合学習",
                content: "メインテキストに沿って、\"読む、聞く、書く、話す（やりとり）、話す（発表）\"を組み合わせて勉強し、自分の意志や意図を正確かつ相手に失礼がない形で自然に伝え、相手の反応にうまく対処しながら、コミュニケーションが取れるようになることを目指す。"
              },
              {
                title: "作文/文章表現",
                content: "原稿用紙を正しく使い、学習した漢字を織り交ぜながら、自分の経験したことについて、事実を述べ、やや詳しい説明とその時の感情を述べたり、現実的ではない場面でも文章を創造して書いたりすることができるようになることを目指す。"
              },
              {
                title: "文章読解型小論文",
                content: "新聞や論説文を批判的に読み、書かれた内容の要旨をまとめ、意見の違いを論じ、自身の意見を述べることができるようになることを目指す。"
              },
              {
                title: "進学準備（進学準備教育課程限定科目）",
                content: "自分で得た情報から、志望校を決め、大学入学までの計画を立て、出願書類を作成する。志望理由書や面接において自己表現をしたり、大学において日本人学生と対等に議論したりできるようになることを目指す。"
              },
              {
                title: "大学入試対策（進学準備教育課程限定科目）",
                content: "主に問題演習を通して、大学進学に合わせ、ＥＪＵ対策、入試対策等、合格に必要なスキルを身につけ、国公立を含め自分の希望する大学を目指す力をつけることを目指す。"
              }
            ].map((item, index) => (
              <div key={index} className="p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                <h3 className="text-lg font-bold mb-3 text-blue-900">◆ {item.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-6">
            <div className="p-6 bg-green-50 rounded-lg border-l-4 border-green-600">
              <h3 className="text-lg font-bold mb-3 text-green-900">◆ 中間/期末タスク</h3>
              <p className="text-gray-700 leading-relaxed">その学期の学習内容を応用し、ロールプレイ、スピーチ、プレゼンテーション、ディベートなどを行う。相手の考えを受け入れ、仲間と協働しながら発表を準備したり、どんな聴者に対してもわかりやすい構成で発表し、納得させたりすることができるようになることを目指す。</p>
            </div>

            <div className="p-6 bg-orange-50 rounded-lg border-l-4 border-orange-600">
              <h3 className="text-lg font-bold mb-3 text-orange-900">◆ テスト・振り返り</h3>
              <p className="text-gray-700 leading-relaxed">自らの学習に関して、目標設定、目標達成のための計画、計画の振り返り、修正ができるようになることを目指す。メンタル面での自己管理を強化することも学ぶ。</p>
            </div>

            <div className="p-6 bg-red-50 rounded-lg border-l-4 border-red-600">
              <h3 className="text-lg font-bold mb-3 text-red-900">◆ 日本事情</h3>
              <p className="text-gray-700 leading-relaxed">日本の伝統行事の体験、現代日本社会の見学、日本人との交流を通して現代日本人の考え方を知る。警察講話、避難訓練、防災体験などにより、日本で安全に暮らしていくことができるようになる。学校行事を通して、日本で生活していく上で常に求められる協調性を身に付ける。</p>
            </div>
          </div>
        </div>

        {/* 合格までのスケジュール */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 border-b-2 border-blue-600 pb-4">
            合格までのスケジュール
          </h2>

          <div className="space-y-8">
            {/* 1年目 */}
            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6 text-blue-900">1年目（基礎固め期間）</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-blue-800 mb-3">大学進学</h4>
                  <p className="text-gray-700">
                    4月〜12月：日本語基礎力強化、EJU / JLPT対策、聴解・読解・語彙力向上
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-blue-800 mb-3">大学院進学</h4>
                  <p className="text-gray-700">
                    4月〜12月：日本語力強化、EJU / JLPT対策、日本の大学事情理解、キャリアデザイン
                  </p>
                </div>
              </div>
            </div>

            {/* 2年目 前半 */}
            <div className="bg-green-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6 text-green-900">2年目 前半（応用力強化期間）</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-green-800 mb-3">大学進学</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>12月〜9月：受験スケジュール作成</li>
                    <li>日本の大学情報収集</li>
                    <li>6月 第1回EJU受験</li>
                    <li>私立大学出願</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-green-800 mb-3">大学院進学</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>12月〜9月：研究テーマ決定</li>
                    <li>研究室探し</li>
                    <li>教授面談</li>
                    <li>研究計画書作成</li>
                    <li>試験内容確認</li>
                    <li>出願開始</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2年目 後半 */}
            <div className="bg-purple-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6 text-purple-900">2年目 後半（ラストスパート）</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-purple-800 mb-3">大学進学</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>9月〜3月：私立大学受験</li>
                    <li>11月 第2回EJU受験</li>
                    <li>国立大学出願</li>
                    <li>二次試験対策</li>
                    <li>国立大学受験</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-purple-800 mb-3">大学院進学</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>9月〜3月：II期試験出願</li>
                    <li>面接対策</li>
                    <li>II期試験受験</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 指定校推薦 */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 border-b-2 border-blue-600 pb-4">
            指定校推薦
          </h2>
          
          <p className="text-gray-700 mb-8">
            KCPでは、これまでの安定した進学実績と教育内容が評価され、以下の大学より指定校推薦枠をいただいています。
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
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
              <div key={index} className="p-4 bg-blue-50 rounded-lg text-center text-gray-800 font-semibold">
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
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 border-b-2 border-blue-600 pb-4">
            直近5年間の進学実績
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-900 border-b-2 border-blue-600 pb-2">
                国公立大学/大学院
              </h3>
              <div className="text-gray-700 text-sm leading-relaxed">
                <p className="mb-3">東京大学、京都大学、大阪大学、名古屋大学、東北大学、九州大学、北海道大学、一橋大学、東京工業大学、筑波大学、神戸大学、横浜国立大学、千葉大学、東京外国語大学、東京学芸大学、東京都立大学、広島大学、金沢大学、電気通信大学、熊本大学、長崎大学、山口大学、埼玉大学、信州大学、群馬大学、茨城大学、弘前大学、富山大学、山梨大学、宇都宮大学、滋賀大学、上越教育大学、兵庫県立大学、兵庫教育大学、横浜市立大学、大阪公立大学、広島市立大学、名古屋市立大学</p>
                <p className="text-center text-gray-500">等</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-purple-900 border-b-2 border-purple-600 pb-2">
                私立大学/大学院
              </h3>
              <div className="text-gray-700 text-sm leading-relaxed">
                <p className="mb-3">早稲田大学、慶應義塾大学、上智大学、明治大学、青山学院大学、立教大学、中央大学、法政大学、立命館大学、関西学院大学、同志社大学、関西大学、東京理科大学、芝浦工業大学、学習院大学、明治学院大学、日本大学、専修大学、東洋大学、駒澤大学、神奈川大学、工学院大学、東京農業大学、東京電機大学、東京工科大学、東京都市大学、帝京大学、国士舘大学、昭和女子大学、武蔵野大学、文教大学、二松学舎大学、拓殖大学、大東文化大学、東海大学、城西大学、国際医療福祉大学、産業医科大学</p>
                <p className="text-center text-gray-500">等</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-red-900 border-b-2 border-red-600 pb-2">
                芸術系・音楽系大学/大学院
              </h3>
              <div className="text-gray-700 text-sm leading-relaxed">
                <p className="mb-3">東京藝術大学、多摩美術大学、女子美術大学、武蔵野美術大学、東京造形大学、京都芸術大学、京都精華大学、京都市立芸術大学、名古屋芸術大学、名古屋造形大学、大阪芸術大学、愛知県立芸術大学、神戸芸術工科大学、東北芸術工科大学、秋田公立美術大学、成安造形大学、横浜美術大学、金沢美術工芸大学、武蔵野音楽大学、洗足学園音楽大学、昭和音楽大学、東邦音楽大学、尚美学園大学、文化学園大学、東京工芸大学、日本映画大学</p>
                <p className="text-center text-gray-500">等</p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>多くの卒業生が難関大学・専門学校への進学を実現。</strong>KCPは確かな進学実績と、指定校推薦枠を通じて、学びの先の未来を支えています。
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
      </div>
    </section>
  )
}
