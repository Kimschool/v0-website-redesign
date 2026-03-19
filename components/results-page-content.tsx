"use client"

import { useState } from "react"
import Image from "next/image"
import { useTranslation } from "react-i18next"
import { PageBreadcrumb } from "@/components/page-breadcrumb"

// 2024年度データ（大学 + 大学院の2階層）
const data2024 = {
  大学: {
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
  大学院: {
    国公立: [
      "東京大学", "東京外国語大学", "東京藝術大学", "東京海洋大学", "広島大学",
      "弘前大学", "東京都立大学", "大阪公立大学", "京都市立芸術大学", "名古屋市立大学"
    ],
    私立: [
      "早稲田大学", "慶応義塾大学", "上智大学", "明治大学", "法政大学",
      "立命館大学", "東洋大学", "東京都市大学", "大阪工業大学", "城西国際大学"
    ],
    音楽美術: [
      "武蔵野美術大学", "多摩美術大学", "洗足学園音楽大学", "京都芸術大学", "東京造形大学"
    ]
  }
}

// 2023年度データ
const data2023 = {
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
    "城西国際大学", "ハリウッド大学院大学"
  ]
}

// 2022-2019年度データ
const pastYearsData: Record<string, { 国公立: string[]; 私立: string[] }> = {
  "2022": {
    国公立: [
      "京都大学", "大阪大学", "東京工業大学", "北海道大学", "名古屋大学", "九州大学", "神戸大学",
      "横浜市立大学", "兵庫県立大学", "東京学芸大学", "埼玉大学", "茨城大学", "山梨大学",
      "長崎大学", "室蘭工業大学", "上越教育大学"
    ],
    私立: [
      "早稲田大学", "上智大学", "東京理科大学", "同志社大学", "明治大学", "立教大学", "青山学院大学",
      "中央大学", "法政大学", "立命館大学", "関西学院大学", "関西大学", "明治学院大学", "順天堂大学",
      "学習院大学", "武蔵野大学", "東洋大学", "日本大学", "東海大学", "帝京大学", "神奈川大学",
      "工学院大学", "中京大学", "東京工芸大学", "東京造形大学", "武蔵野美術大学", "多摩美術大学",
      "女子美術大学", "洗足学園音楽大学", "京都芸術大学", "京都精華大学", "神戸芸術工科大学",
      "東北芸術工科大学", "名古屋造形大学", "静岡文化芸術大学", "宝塚大学", "拓殖大学", "城西大学",
      "東京国際大学", "埼玉工業大学", "文化学園大学", "文化ファッション大学院大学", "京都情報大学",
      "大阪観光大学", "法政大学専門職大学院"
    ]
  },
  "2021": {
    国公立: [
      "京都大学", "東京工業大学", "北海道大学", "名古屋大学", "筑波大学", "お茶の水大学",
      "横浜国立大学", "広島大学", "東京都立大学", "千葉大学", "滋賀大学", "埼玉大学",
      "兵庫教育大学", "上越教育大学", "近畿大学", "京都市立芸術大学", "愛知県立芸術大学",
      "広島市立大学"
    ],
    私立: [
      "慶應義塾大学", "早稲田大学", "上智大学", "東京理科大学", "同志社大学", "明治大学", "立命館大学",
      "青山学院大学", "中央大学", "法政大学", "関西学院大学", "関西大学", "立命館アジア太平洋大学",
      "西南学院大学", "学習院大学", "明治学院大学", "東京女子大学", "昭和女子大学", "武蔵野大学",
      "芝浦工業大学", "東京農業大学", "東京電機大学", "工学院大学", "長岡技術科学大学", "産業医科大学",
      "専修大学", "東洋大学", "日本大学", "東海大学", "帝京大学", "神奈川工科大学", "二松学舎大学",
      "国士舘大学", "亜細亜大学", "拓殖大学", "大東文化大学", "昭和薬科大学", "多摩美術大学",
      "武蔵野美術大学", "東京造形大学", "京都芸術大学", "京都精華大学", "大阪芸術大学", "神戸芸術工科大学",
      "成安造形大学", "静岡文化芸術大学", "倉敷芸術科学大学", "横浜美術大学", "洗足学園音楽大学",
      "武蔵野音楽大学", "日本映画大学", "東京工芸大学", "文化学園大学", "文化ファッション大学院大学",
      "京都ノートルダム女子大学", "学習院女子大学", "駒沢女子大学", "麻布大学", "熊本学園大学",
      "大阪経済法科大学", "明海大学", "横浜商科大学", "埼玉工業大学", "日本工業大学", "北海道科学大学",
      "山梨学院大学", "愛知産業大学", "筑波学院大学", "新潟産業大学", "至誠館大学", "千葉科学大学",
      "日本経済大学", "宝塚大学", "テンプル大学ジャパンキャンパス", "青山学院大学専門職大学院",
      "法政大学専門職大学院", "明治大学専門職大学院", "池坊短期大学"
    ]
  },
  "2020": {
    国公立: [
      "東京大学", "京都大学", "東京工業大学", "一橋大学", "大阪大学", "名古屋大学", "九州大学",
      "北海道大学", "神戸大学", "筑波大学", "東京外国語大学", "横浜国立大学", "広島大学",
      "金沢大学", "電気通信大学", "東京藝術大学", "熊本大学", "信州大学", "埼玉大学",
      "東京学芸大学", "首都大学東京", "富山大学", "山梨大学", "茨城大学", "弘前大学",
      "京都市立芸術大学"
    ],
    私立: [
      "慶應義塾大学", "早稲田大学", "上智大学", "東京理科大学", "明治大学", "立命館大学", "中央大学",
      "法政大学", "学習院大学", "青山学院大学", "名古屋工業大学", "北陸先端科学技術大学", "日本女子大学",
      "東京都市大学", "東京農業大学", "東京電機大学", "武蔵野美術大学", "多摩美術大学", "女子美術大学",
      "日本大学", "東洋大学", "駒澤大学", "獨協大学", "明治学院大学", "国際医療福祉大学", "武蔵野大学",
      "東海大学", "工学院大学", "都留文科大学", "神奈川大学", "大東文化大学", "帝京大学", "淑徳大学",
      "東京造形大学", "尚美学園大学", "神戸芸術工科大学", "名古屋芸術大学", "日本工業大学", "桜美林大学",
      "立正大学", "文化学園大学", "文化ファッション大学院大学", "東邦音楽大学", "大阪体育大学",
      "千葉科学大学", "京都情報大学", "山梨学院大学", "国士舘大学", "松陰大学", "武蔵野学院大学",
      "東京福祉大学", "埼玉工業大学", "第一工業大学", "事業創造大学", "デジタルハリウッド大学院"
    ]
  },
  "2019": {
    国公立: [
      "東京大学", "一橋大学", "東京工業大学", "大阪大学", "北海道大学", "九州大学", "神戸大学",
      "筑波大学", "千葉大学", "広島大学", "東京藝術大学", "埼玉大学", "信州大学", "群馬大学",
      "富山大学", "愛知県立芸術大学", "秋田公立美術大学"
    ],
    私立: [
      "東京大学医科歯科大学", "慶應義塾大学", "早稲田大学", "上智大学", "東京理科大学", "明治大学",
      "立教大学", "同志社大学", "中央大学", "法政大学", "関西学院大学", "関西大学",
      "学習院大学", "青山学院大学", "芝浦工業大学", "小樽商科大学", "日本女子大学",
      "東京農業大学", "東京海洋大学", "京都産業大学", "中京大学", "成蹊大学", "武蔵野美術大学",
      "多摩美術大学", "女子美術大学", "京都造形芸術大学", "名古屋美術大学", "神戸芸術工科大学",
      "京都精華大学", "専修大学", "東洋大学", "駒澤大学", "日本大学", "明治学院大学", "東京経済大学",
      "文教大学", "フェリス女学院大学", "昭和女子大学", "工学院大学", "東京工科大学", "武蔵野大学",
      "拓殖大学", "大東文化大学", "帝京大学", "城西大学", "麻布大学", "東洋学園大学", "横浜商科大学",
      "山口東京理科大学", "京都情報大学", "尚美学園大学", "文化学園大学", "文化女子大学", "東京造形大学",
      "東京工芸大学", "東邦音楽大学", "日本映画大学", "明海大学", "国士舘大学", "札幌学院大学",
      "松陰大学", "平成帝京科学大学", "東京福祉大学", "日本経済大学", "宝塚大学", "城西短期大学",
      "産業技術大学院大学", "慶応ビジネススクール", "北陸先端技術大学院"
    ]
  }
}

// 卒業生データ
const alumniData = [
  {
    id: "huang-xia",
    name: "黄 厦さん / 中国出身",
    school: "進学先：東京大学大学院　農学生命科学研究科",
    job: "現  職： P&Gジャパン",
    image: "/images/alumni/huang-xia.png",
    featured: true,
    paragraphs: [
      "KCPで過ごした時間は、私にとって日本語学習以上の意味を持つ、大切な経験でした。勉強だけでなく、人としての姿勢や考え方を学べた場所だと感じています。",
      "友達と色紙でおせち料理を作ったり、運動会でチーム一丸となって走ったり、ボランティア活動で放課後に子ども食堂を手伝ったり、浴衣の着付け教室に参加したり――その一つひとつが、今でも昨日のことのように思い出されます。",
      "先生方も経験豊富で、いつもいろいろな面白い教え方をしてくれました。気がついたら、知識が自然と頭に入ってきていた、そんな感覚です。",
      "KCPは、私にとって堅苦しい学校というより、実家のような場所でした（笑）。",
      "KCPで学んだことは、大きく分けて二つあります。一つは、場面に応じた正しい日本語の使い分け、もう一つは日本のカルチャーです。",
      "一つ目の日本語についてですが、特に書き言葉と話し言葉の違いを学びました。この二つを間違えて使うと、相手にあまりよくない印象を与えてしまうことがあります。私はこの二つを意識して使い分けてきたことで、学業や仕事、日常生活でも誤解なく自分の考えを伝えられるようになりました。",
      "もう一つは、日本のカルチャーです。日本社会では、ルール以上に「空気を共有できるか」が大切にされますが、KCPでその感覚を学んだことで、日本人の輪にも自然に溶け込めたと感じています。こうした経験は、大学生活を経て社会に出た今も、私の大きな支え��なっています。",
    ],
    previewCount: 2,
  },
  {
    id: "patrick",
    name: "Patrick Grainger さん / アメリカ出身",
    job: "現  職： 東京防災救急協会",
    image: "/images/alumni/patrick.png",
    featured: true,
    paragraphs: [
      "大学を卒業した後、さらに日本語の力をしっかりと伸ばしたいと考え、KCP地球市民日本語学校に入学いたしました。現在は、在日外国人を対象とした防災教育の仕事に携わっています。日本で暮らす外国人の方々が安心して生活できるよう支援するこの仕事は、私にとって大きなやりがいとなっています。",
      "KCPでは、アルバイト先を紹介していただいたことをきっかけに、面接練習や履歴書の作成などを先生方と一緒に進めさせていただきました。また、アルバイト先の複雑な労働条件や契約内容についても、分かりやすく言い換えて丁寧に説明していただき、大変心強く感じました。そのアルバイト先で最終的に正社員として採用されることになりましたので、私の日本でのキャリアはKCPで始まったと言っても過言ではありません。",
      "打ち合わせや会議、ビジネスメールなど、実際のビジネスシーンで求められる敬語表現や言い回しをKCPで徹底的に身につけたことで、社内外を問わず、相手や場面に応じた適切なコミュニケーションが取れるようになりました。特に、日本語には似ているようでニュアンスが大きく異なる表現が多くありますが、それらを正確に識別し、状況に合わせて使い分けられるようになったことは、仕事を進める上で大きな強みになっています。",
      "こうした実践的な日本語力をKCPで基礎からしっかり学べたおかげで、職場でも自信を持ってやり取りができるようになりました。少し細やかな自慢ではありますが、その成果として、周囲から日本育ちだと誤って思われたこともあり、自分自身の成長を実感するきっかけにもなっています。",
    ],
    previewCount: 2,
  },
  {
    id: "lee",
    name: "Lee Yit Chang さん / マレーシア出身",
    school: "進学先：早稲田大学 文化構想学部文化構想学科",
    image: "/images/alumni/lee.png",
    featured: false,
    paragraphs: [
      "私が来日した理由は、英語圏とは異なる文化に強い興味があったからです。私はオーストラリアで育ったため、日本の価値観や生活スタイル、言語などに惹かれ、「実際に日本で生活しながら学んでみたい」と思い来日しました。現在は、日本で社会人として働いています。",
      "KCPの一番の良さは、先生方がとても親身になってくれるところだと思います。勉強のことだけでなく、悩み事や不安なことも丁寧に聞いてくれて、とても心強かったです。",
      "また、KCPの授業は、先生が教えてくれる内容を一つ一つコツコツ理解していくことで、少しずつ日本語が確実��上達していく点が特徴だと思います。KCPでの日本語学習は、マラソンのようなイメージでした。一瞬で上達するのではなく、正しいペースで続けることで、着実に力がついていく感覚がありました。",
      "KCPで日本語を勉強したおかげで、当初の目標だった大学に合格することができました。また、KCPにはさまざまな国から来た学生がいて、それぞれ異なる背景や価値観を持つ仲間と一緒に学べたことは、自分の視野を大きく広げてくれました。",
      "日本語だけでなく、多様な視点を学べたことも、今の自分にとって非常に大きな財産になっています。",
    ],
    previewCount: 2,
  },
  {
    id: "zhao",
    name: "赵 瑞霄さん / 中国出身",
    school: "進学先：東北大学　農学部",
    image: "/images/alumni/zhao.png",
    featured: false,
    paragraphs: [
      "KCPの先生方は個性豊かですが、みんな学生一人ひとりを大切にしてくださっています。学習面だけでなく、生活の相談にものってくださって、安心して勉強できる環境だと感じています。",
      "また、毎学期に課外活動があって、クラス以外の場面で先生やクラスメートの新たな一面を見ることができます。特に印象に残っているのはBBQイベントです。先生と学生が一緒にバーベキューを楽しみ、普段は厳しそうな校長先生も頑張って焼いて、とても和やかな雰囲気でした。",
      "これから留学を考えている方には、目標を持ち、努力を続けること、そして困ったときは一人で抱え込まず、周囲に相談することの大切さを伝えたいです。日本留学は決して簡単ではありませんが、前向きな気持ちがあれば乗り越えられると思います。",
    ],
    previewCount: 2,
    additionalInfo: {
      acceptances: "山口大学応用化学系、立命館大学生物系、東京理科大学工学部、東京農工大学農学部、東北大学農学部　合格",
      scholarship: "KCP在学中、文部科学省外国人留学生学習奨励費を獲得",
    },
  },
  {
    id: "seki",
    name: "昔 聖原さん / 韓国出身",
    school: "進学先：法政大学 人間環境学部人間環境学科（指定校推薦）",
    image: "/images/alumni/seki.png",
    featured: false,
    paragraphs: [
      "「勉強をして大学に入る」という一般的な受験のプロセスであれば、正直どこでも学べると思います。しかしKCPで私が学んだのは、日本語だけではなく、「態度」でした。KCPには、日本語の指導だけでなく、学生一人ひとりを親身になって支えてくださる先生方がいます。在学中はもちろん、卒業後も日本で日本社会の中で活躍できるよう、さまざまなアドバイスをしてくださいました。",
      "正直に言うと、私は語学の才能に恵まれているとは思いません。それでも、思うようにいかない時があっても、KCPで学んだ勤勉で誠実な姿勢を大切にし、日本語はもちろん、大学での授業や就職活動にも生かせる力を磨いてきました。決して胸を張って自慢できるレベルではないかもしれませんが、来日当初の自分を振り返ると、確かな成長を感じます。この経験を原動力に、これからも目の前に立ちはだかる壁を乗り越えていきたいと思います。",
    ],
    previewCount: 1,
  },
  {
    id: "zhu",
    name: "朱 瑞婷さん / 中国出身",
    school: "進学先：多摩美術大学 情報デザイン学科情報デザインコース",
    image: "/images/alumni/zhu.png",
    featured: false,
    paragraphs: [
      "KCPでの学習経験は、私にとって非常に実り多いものでした。中でも最も大きく成長したと感じているのは、作文力です。毎週行われる体系的な作文指導と、先生方の丁寧な添削のおかげで、論文を書く力が大きく向上しました。この経験は、その後の大学入試においても大きな助けとなりました。",
      "また、勉強だけでなく、KCPの課外活動にも積極的に参加しました。演劇部の一員として、教科書だけでは学べない日本語表現を数多く身につけることができ、同じ志を持つ仲間とも出会うことができました。卒業後も、私たちは今なお連絡を取り合っています。",
      "こうした経験から、留学生活ではぜひ異なる文化的背景を持つ仲間と積極的に交流することをおすすめします。視野が広がるだけでなく、物事をさまざまな立場や視点から考えられるようになり、何よりもかけがえのない友情を得ることができます。",
    ],
    previewCount: 1,
  },
  {
    id: "qi",
    name: "戚笑さん / 中国出身",
    school: "進学先：静岡文化芸術大学大学院 デザイン研究科",
    image: "/images/alumni/qi.png",
    imagePosition: "right center",
    featured: false,
    paragraphs: [
      "私がKCPに通っていた時期はコロナ禍だったため、みんなで参加できるイベントがあまり多くありませんでした。その中でも特に印象に残っているのがスピーチ大会です。私はクラスメートと一緒に応援動画を作成し、クラスメート全員の似顔絵を描きました。",
      "大学院の進学準備は正直言ってとても順調とは言えませんでした。教授との面談で研究テーマを厳しく批判され、モチベーションを完全に失い、何も手につかない状態になったこともありました。そのとき、諸永先生が何度も面接練習をしてくださり、安楽先生が毎回授業後に相談に乗ってくださったおかげで、最終的に気持ちを奮い立たせ、無事に大学院に合格することができ��した。",
      "KCPで私が得た最大の成果は確実な日本語の基礎力だと思います。学校では宿題や試験が多く大変でしたが、一つ一つを真剣に準備したおかげで、自分の日本語能力が確実に伸びているのを実感できました。",
      "少し自慢話になるかもしれませんが、私は授業外で特別にEJUやJLPTの勉強をすることなく、授業内容をしっかり理解するだけで非常に良い成績を取ることができました。その中でもEJUの高得点は大学院入試でも強みとなり、大きな助けとなりました。会社に入ったばかりの頃、同僚たちは私が日本に来てからまだ4年しか経っていないことに驚いていたのも、KCPでの学びが基盤となっていたからだと思います。",
    ],
    previewCount: 1,
  },
  {
    id: "zhang",
    name: "张 首馨さん / 中国出身",
    school: "進学先：東京外国語大学大学院 総合国際学研究科",
    image: "/images/alumni/zhang.png",
    featured: false,
    badgeKeys: [
      "educationPage.alumniJpetTitle",
      "educationPage.alumniEssayContestTitle",
    ],
    paragraphs: [
      "KCPでの授業では、クラスメートと自由に意見交換ができ、さまざまな国から来た学生たちの考え方や価値観に触れることができました。そのおかげで、各国に対する理解が深まり、日々の会話を通して自然と日本語の口語力も鍛えられました。さらに、新しい知識をたくさん得ることができ、とても充実した時間を過ごしました。",
      "大学院に合格する前は不安でいっぱいでしたが、KCPでの毎日の授業が楽しく、勉強のストレスを感じることなく前向きに取り組むことができました。無事に大学院に合格できたことに加え、JPETや拓殖大学の作文コンテストでも賞をいただくことができ、本当に嬉しく、KCPで学んだ成果を実感しました。",
    ],
    previewCount: 1,
  },
  {
    id: "li",
    name: "李 黛玉さん / 中国出身",
    school: "進学先：東京藝術大学大学院 映像研究科アニメーション専攻",
    image: "/images/alumni/lee1.png",
    featured: false,
    paragraphs: [
      "私は中級クラスからKCPでの学習を始めました。母国での勉強は主に試験対策中心だったため、実践的な日本語力がまだ身についていなかったのです。中級クラスでは課題が多く、特に作文の宿題を通して、文の構造を意識しながら書く力を身につけました。",
      "最初は簡単な文から始まり、徐々に複雑な文型を使えるようになったことが、自信にもつながりました。KCPの授業の良いところは、中級という基礎を築く段階で繰り返し練習を行い、記憶を定着させていくことに重点が置かれている点です。語彙や文法の説明も丁寧で、意味や使い方の広がりについても詳しく教えてくださるので、その後の高度な日本語の学習やN1対策にも非常に役立ちました。",
      "上級になれば、先生は毎日授業の冒頭に、10分ほどニュースや時事問題、ことわざなどの話をしてくださいました。その時間で教科書には載っていないような表現や語彙をたくさん学ぶことができました。私はそこで覚えた言葉を、実際に藝大の入試でも使うことができ、とても助けになりました。",
    ],
    previewCount: 1,
  },
]

function UniGrid({ universities }: { universities: string[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {universities.map((uni, idx) => (
        <div
          key={idx}
          className="rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-700 transition hover:bg-gray-50"
        >
          <p className="font-medium">{uni}</p>
        </div>
      ))}
    </div>
  )
}

function YearResultsAlignedLayout() {
  const { t } = useTranslation()
  const yearOrder = ["2024", "2023", "2022", "2021", "2020", "2019"] as const

  const getTotal = (year: (typeof yearOrder)[number]) => {
    if (year === "2024") {
      return (
        data2024.大学.国公立.length +
        data2024.大学.私立.length +
        data2024.大学.音楽美術.length +
        data2024.大学院.国公立.length +
        data2024.大学院.私立.length +
        data2024.大学院.音楽美術.length
      )
    }
    if (year === "2023") return data2023.国公立.length + data2023.私立.length
    return pastYearsData[year].国公立.length + pastYearsData[year].私立.length
  }

  return (
    <div className="space-y-4">
      {yearOrder.map((year) => (
        <details key={year} open={year === "2024"} className="group rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <summary className="list-none cursor-pointer px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between gap-3">
            <span className="text-lg font-bold text-gray-900">{t("educationPage.resultTitle", { year })}</span>
            <span className="inline-flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-500">{getTotal(year)}校</span>
              <span className="text-gray-400 transition-transform duration-300 group-open:rotate-180">▼</span>
            </span>
          </summary>
          <div className="p-6">
            {year === "2024" ? (
              <div className="grid lg:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm font-bold text-gray-900 mb-3">{t("educationPage.universityHeader")}</p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-800 mb-2">{t("educationPage.publicUniTitle")}</p>
                      <UniGrid universities={data2024.大学.国公立} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 mb-2">{t("educationPage.privateUniTitle")}</p>
                      <UniGrid universities={data2024.大学.私立} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 mb-2">{t("educationPage.artMusicUniTitle")}</p>
                      <UniGrid universities={data2024.大学.音楽美術} />
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm font-bold text-gray-900 mb-3">{t("educationPage.graduateSchoolHeader")}</p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-800 mb-2">{t("educationPage.publicGradTitle")}</p>
                      <UniGrid universities={data2024.大学院.国公立} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 mb-2">{t("educationPage.privateGradTitle")}</p>
                      <UniGrid universities={data2024.大学院.私立} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 mb-2">{t("educationPage.artMusicGradTitle")}</p>
                      <UniGrid universities={data2024.大学院.音楽美術} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-2">{t("educationPage.publicUniGradTitle")}</p>
                  <UniGrid universities={year === "2023" ? data2023.国公立 : pastYearsData[year].国公立} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-2">{t("educationPage.privateUniGradTitle")}</p>
                  <UniGrid universities={year === "2023" ? data2023.私立 : pastYearsData[year].私立} />
                </div>
              </div>
            )}
          </div>
        </details>
      ))}
    </div>
  )
}

// 卒業生カード（クリックで展開）
function AlumniCard({ alumni, compact }: { alumni: typeof alumniData[number]; compact: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const { t } = useTranslation()

  const visibleParagraphs = expanded ? alumni.paragraphs : alumni.paragraphs.slice(0, alumni.previewCount)
  const hasMore = alumni.paragraphs.length > alumni.previewCount

  if (compact) {
    return (
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-0">
          <div className="relative h-48 sm:w-32 sm:min-h-[200px] flex-shrink-0 overflow-hidden sm:self-stretch">
            <Image
              src={alumni.image}
              alt={alumni.name}
              fill
              className="object-cover"
              style={("imagePosition" in alumni && alumni.imagePosition) ? { objectPosition: alumni.imagePosition } : undefined}
            />
          </div>
          <div className="p-4 bg-white flex-1 min-w-0">
            <div className="mb-3">
              <h3 className="text-base font-bold text-gray-900 mb-1">{alumni.name}</h3>
              {alumni.school && <p className="text-gray-700 font-semibold text-xs">{alumni.school}</p>}
              {alumni.job && <p className="text-gray-700 font-semibold text-xs">{alumni.job}</p>}
            </div>
            <div className="space-y-2 text-gray-700 leading-relaxed text-xs">
              {visibleParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {"additionalInfo" in alumni && alumni.additionalInfo && expanded && (
              <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200 text-xs">
                <p className="font-semibold text-gray-800">{alumni.additionalInfo.acceptances}</p>
                <p className="text-gray-700 mt-1">{alumni.additionalInfo.scholarship}</p>
              </div>
            )}
            {hasMore && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-2 text-[#0085b2] hover:text-[#006794] font-semibold text-xs transition"
              >
                {expanded ? t("educationPage.showLess") : t("educationPage.readMore")}
              </button>
            )}
            {"badgeKeys" in alumni && alumni.badgeKeys && (
              <div className="mt-3 space-y-0.5">
                {alumni.badgeKeys.map((key, i) => (
                  <p key={i} className="text-gray-600 text-xs font-semibold">{t(key)}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Featured (large) card
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="grid md:grid-cols-3 gap-0">
        <div className="relative h-96 md:col-span-1 overflow-hidden">
          <Image
            src={alumni.image}
            alt={alumni.name}
            fill
            className="object-contain"
          />
        </div>
        <div className="md:col-span-2 p-8 bg-white">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{alumni.name}</h3>
            {alumni.school && <p className="text-gray-700 font-semibold">{alumni.school}</p>}
            {alumni.job && <p className="text-gray-700 font-semibold">{alumni.job}</p>}
          </div>
          <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
            {visibleParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {hasMore && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-4 text-[#0085b2] hover:text-[#006794] font-semibold text-sm transition"
            >
              {expanded ? t("educationPage.showLess") : t("educationPage.readMore")}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export function ResultsPageContent() {
  const { t } = useTranslation()

  const featuredAlumni = alumniData.filter(a => a.featured)
  const compactAlumni = alumniData.filter(a => !a.featured)

  return (
    <section id="results" className="bg-white">
      {/* Page Banner - Extended to cover navigation area */}
      <div className="relative h-[350px] md:h-[400px] w-full overflow-hidden">
        <Image
          src={`/images/original_from_customer/${encodeURIComponent('トップ背景')}/${encodeURIComponent('02_教育内容（手元にフォーカス）')}.jpg`}
          alt={t("educationPage.resultsPageTitle")}
          fill
          className="object-cover object-[center_35%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 flex items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">{t("educationPage.resultsPageTitle")}</h1>
            <div className="w-20 h-1 bg-white/80 mx-auto mt-6 rounded-full"></div>
          </div>
        </div>
      </div>

    <PageBreadcrumb
      items={[
        { label: "教育内容", href: "/education" },
        { label: "進学実績・卒業生の声" },
      ]}
    />

      <div className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          {/* 進学実績一覧 */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="inline-block w-1.5 h-8 rounded-full bg-[#0085b2]" />
              {t("educationPage.resultsListTitle")}
            </h2>

            <YearResultsAlignedLayout />
          </div>

          <div className="w-full h-px bg-gray-300 mb-16" />

          {/* 卒業生の声 */}
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-12 flex items-center gap-3">
              <span className="inline-block w-1.5 h-8 rounded-full bg-[#0085b2]" />
              {t("educationPage.alumniTitle")}
            </h2>

            {/* Featured alumni (large cards) */}
            <div className="space-y-16 mb-16">
              {featuredAlumni.map((alumni) => (
                <AlumniCard key={alumni.id} alumni={alumni} compact={false} />
              ))}
            </div>

            {/* Compact alumni */}
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {compactAlumni.map((alumni) => (
                <AlumniCard key={alumni.id} alumni={alumni} compact={true} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
