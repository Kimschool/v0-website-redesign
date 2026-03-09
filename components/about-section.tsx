'use client'

import { useEffect, useRef, useState } from "react"
import { School, User } from "lucide-react"

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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

  const history = [
    {
      year: "1983年",
      title: "【KCP】設立 駐在員とその家族を対象とした日本語教育開始",
      description: ""
    },
    {
      year: "1988年",
      title: "法務省東京入国管理局より第一号の就学生の受け入れが認可される",
      description: "校名を【ケーシーピーインターナショナル語学研修院】とする"
    },
    {
      year: "1991年",
      title: "姉妹校【ジャパンフジ共生日本語学校】運営開始（赤羽キャンパス）",
      description: ""
    },
    {
      year: "1993年",
      title: "新宿キャンパス移転",
      description: ""
    },
    {
      year: "2001年",
      title: "【KCP日本語教師養成講座】開講",
      description: ""
    },
    {
      year: "2006年",
      title: "【学校法人KCP学園】認可",
      description: ""
    },
    {
      year: "2007年",
      title: "【KCP地球市民日本語学校】設置（校名変更）",
      description: "文部科学大臣より【大学入学のための準備教育課程】の指定（翌年運営開始）"
    },
    {
      year: "2008年",
      title: "姉妹校の校名を【ジャパンフジ共生日本語学校】から【KCP共生日本語学校】に変更",
      description: ""
    },
    {
      year: "2014年",
      title: "新校舎竣工 【KCP地球市民日本語学校】と姉妹校【KCP共生日本語学校】を統合",
      description: ""
    },
    {
      year: "2017年",
      title: "法務省東京入国管理局に【日本語教育機関の告示基準に係る誓約書】提出",
      description: "告示校として官報公示"
    },
  ]

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* 학교장 인사말 */}
        <div className={`mb-20 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            学校長挨拶
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            {/* 학교장 이미지 및 정보 */}
            <div className="space-y-6">
              <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src="/images/principal.jpg"
                  alt="学校長"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <School className="w-5 h-5 text-[#0085b2]" />
                  <span className="text-lg">学校法人KCP学園</span>
                </div>
                <div className="flex items-center gap-3">
                  <School className="w-5 h-5 text-[#0085b2]" />
                  <span className="text-lg">KCP地球市民日本語学校</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-[#0085b2]" />
                  <span className="text-lg">学校長　金原 宏</span>
                </div>
              </div>
            </div>

            {/* 학교장 인사말 텍스트 */}
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                日本文化への深い理解は、活躍の場を日本に求めるのであれば、欠かすことはできません。同時に、高度な日本語を身に付ける上でも必須のものです。また、日本文化を知ることは、自国の文化の美質を改めて知るきっかけにもなります。
              </p>
              <p>
                KCPのＫは、Knowledge、「知識」を表します。高度日本語や日本文化に関する知識と言ってよいでしょう。Ｃは Coexistence、「共生」を表します。高度日本語を身に付け、日本文化を知った上で日本人や世界の人々と手を携えていくことを意味します。ＰはPeace、「平和」であり、こうしたことができれば平和な社会の建設に貢献でき、そういう人物こそ真の地球市民と言えます。
              </p>
              <p>
                現代社会を生き抜いていくには、いうまでもなく、さまざまな知識が必要です。しかし、それ以上に、その知識をベースにして、世界中の多くの人々と共に生きていこう、共生していこう、そして平和な社会を築こうという精神もまた、求められます。
              </p>
              <p>
                私たちの学校には、毎学期、多くの国からの留学生が入学します。そういう人たちと一緒に学ぶことによって、ＫとＣとＰを自然に身に付け、地球全体を見渡せる視野を持った人材へと成長していってもらいたい、そういう人材を育てていくんだという私たちの希望と決意が込められているのです。
              </p>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-200 my-16"></div>

        {/* 연혁 */}
        <div className={`mb-20 ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            沿革
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* 타임라인 선 */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-[#0085b2]/20"></div>
              
              {/* 타임라인 아이템들 */}
              <div className="space-y-8">
                {history.map((item, index) => (
                  <div key={index} className="relative flex items-start gap-8 md:gap-0">
                    {/* 연도 (데스크탑 왼쪽) */}
                    <div className="hidden md:block md:w-1/2 md:pr-8 md:text-right">
                      <span className="text-xl font-bold text-[#0085b2]">{item.year}</span>
                    </div>
                    
                    {/* 중앙 점 */}
                    <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#0085b2] rounded-full border-4 border-white shadow"></div>
                    
                    {/* 내용 */}
                    <div className="md:w-1/2 md:pl-8 pl-12">
                      <span className="md:hidden text-lg font-bold text-[#0085b2] block mb-1">{item.year}</span>
                      <h3 className="font-semibold text-gray-800">{item.title}</h3>
                      {item.description && (
                        <p className="text-gray-600 mt-1 text-sm">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-200 my-16"></div>

        {/* 안심의 서포트 체제 */}
        <div className={`${isVisible ? "animate-fade-in-up animation-delay-400" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            安心のサポート体制
          </h2>
          
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                KCPの個性豊かで経験豊富なベテラン教師・事務職員たち、<br />
                入学した皆さんが充実した留学生活を送り、<br />
                夢を実現することが、私たちの願いであり喜びでもあります。
              </p>
              <p>
                全職員が連携して、ときに優しくときに厳しく将来を見据えた指導を、<br />
                そして一人一人の学生と向き合い親身のサポートを行います。<br />
                勉強が心配になったとき、生活で困ったことがあるとき、いつも皆さんのそばで力になります。<br />
                日本語で伝えることが難しくても、英語・中国語・韓国語・ベトナム語に堪能な各国担当の<br />
                スタッフがいますから、心配しなくても大丈夫です。
              </p>
            </div>
            
            {/* 교직원 단체 사진 */}
            <div className="mt-10">
              <div className="aspect-[21/9] bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src="/images/staff-group.jpg"
                  alt="KCP地球市民日本語学校の教職員"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-500 mt-4">KCP地球市民日本語学校の教職員</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
