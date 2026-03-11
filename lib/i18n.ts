import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
  ja: {
    translation: {
      // Header
      logoTop: "学校法人KCP学園",
      logoBottom: "KCP地球市民日本語学校",
      nav: {
        about: "KCPとは",
        education: "教育内容",
        schoolLife: "学校生活",
        admission: "入学案内",
        contact: "お問い合わせ",
      },
      languageSelector: "言語選択",
      mobileMenuOpen: "メニューを開く",
      mobileMenuClose: "メニューを閉じる",
      requestInfo: "資料請求",

      // Hero
      hero: {
        title1: "ともにまなび",
        titleHighlight: " ",
        title2: "ともに生きる",
        subtitle: "日本語教育を通じて、夢への第一歩を踏み出そう",
        cta1: "まずは資料請求",
        cta2: "KCPを知る",
        statsLabel: "累計卒業生",
        statsUnit: "人",
        statsDescription: "全世界からの留学生をサポートしてきました",
        partners: "PARTNERS",
        partnerList: ["大手IT企業", "上場メーカー", "グローバル商社", "有名大学", "研究機関"],
        scroll: "SCROLL",
      },

      // About
      about: {
        label: "KCPとは",
        title1: "KCPの理念",
        title2: "学校法人 KCP学園",
        description1: "Knowledge（知識）、Coexistence（共生）、Peace（平和）を理念とし",
        description2: "グローバル社会で活躍する人材の育成を目指しています",
        cta: "詳しく見る",
        features: [
          { title: "Knowledge", description: "高度な日本語と日本文化に関する知識" },
          { title: "Coexistence", description: "多国籍の仲間との共生と相互理解" },
          { title: "Peace", description: "地球市民として平和な社会の構築に貢献" },
          { title: "ベテラン講師陣", description: "経験豊かで献身的な教育スタッフ" },
          { title: "充実のサポート", description: "学習から生活相談まで多言語対応" },
        ],
      },

      // Reasons
      reasons: {
        label: "Why KCP",
        title: "選ばれる3つの理由",
        description: "理由1、理由2、理由3、理由4を入れて説明。KCPが「ユーザー」にとって何がいいのかを説明します。",
        items: [
          {
            title: "あなたの「好き」を大切に、\n今すぐオンラインでスタートできる。",
            description: "KCPでは、オンラインでも対面でも、あなたのペースで学習を進められます。忙しい方も、遠方の方も、どこからでも質の高い日本語教育を受けられます。",
          },
          {
            title: "好きなことを「手に職」にする\n使いやすいツールがあなたをサポート",
            description: "最新のeラーニングシステムと、経験豊富な講師陣があなたの学習をサポート。進捗管理から質問対応まで、充実したサポート体制を整えています。",
          },
          {
            title: "オンラインの力を最大化\n機能を活かしてサービスの幅が広がる！",
            description: "日本語能力だけでなく、日本でのキャリア形成もサポート。就職支援から進学相談まで、あなたの未来を全力でバックアップします。",
          },
        ],
        prev: "前へ",
        next: "次へ",
      },

      // Features
      features: {
        label: "Features",
        title: "高機能なシステムで管理もラクラク",
        description: "理由1、理由2、理由3、理由4を入れて説明。KCPが「ユーザー」にとって何がいいのかを説明します。",
        cta: "詳しく見る",
        items: [
          { title: "進学サポート体制", description: "大学・大学院進学を徹底サポート" },
          { title: "少人数制クラス", description: "きめ細かい指導が可能" },
          { title: "多国籍環境", description: "世界中の仲間と学ぶ" },
          { title: "充実した施設", description: "最新設備の学習環境" },
          { title: "豊富な課外活動", description: "日本文化を体験" },
          { title: "高い合格実績", description: "有名大学への進学実績多数" },
          { title: "オリジナル教材", description: "効率的な学習カリキュラム" },
          { title: "生活サポート", description: "住居・ビザなど全面支援" },
        ],
      },

      // Testimonials
      testimonials: {
        label: "Success Stories",
        title: "多種多様なユーザー様の成功事例",
        description1: "KCPでスキルを持ったユーザー様が自らのスキルを使い、それぞれの方法で活躍",
        description2: "ユーザーはグッズ作成やイベント開催など「好き」で活躍されています。",
        cta: "もっと見る",
        items: [
          { name: "李 明華", country: "中国", university: "東京大学 経済学部", quote: "KCPの先生方は本当に親身になって指導してくださいました。おかげで夢だった東京大学に合格できました。" },
          { name: "Maria Santos", country: "ブラジル", university: "早稲田大学 商学部", quote: "多国籍の友人ができ、日本語だけでなく異文化理解も深められました。KCPでの経験は一生の財産です。" },
          { name: "Kim Jiwon", country: "韓国", university: "慶應義塾大学 法学部", quote: "進学指導が充実していて、自分に合った大学を見つけることができました。サポート体制が素晴らしいです。" },
        ],
      },

      // Education
      education: {
        label: "Education",
        title: "教育内容とサポート体制",
        description: "KCPでは、質の高い教育と充実したサポート体制であなたの夢を応援します。",
        courses: [
          { title: "コース紹介", subtitle: "Course Introduction", description: "初級から上級まで、レベルに合わせた最適なコースをご用意しています。" },
          { title: "授業内容", subtitle: "Curriculum", description: "実践的な日本語能力を身につける、充実したカリキュラム。" },
          { title: "進学実績", subtitle: "Achievements", description: "東大、早稲田、慶應など、有名大学への進学実績多数。" },
        ],
        cta: "詳しく見る",
      },

      // School Life
      schoolLife: {
        label: "Campus Life",
        title1: "学び、つながり、",
        title2: "成長する毎日",
        description: "学ぶことも、楽しむことも、全力で過ごせるキャンパスライフがここにある。多国籍の仲間と過ごす毎日が、あなたを成長させます。",
        eventsCount: "年間イベント数",
        items: [
          { label: "年間スケジュール" },
          { label: "クラブ活動" },
          { label: "施設案内" },
          { label: "アクセス" },
        ],
        cta: "学校生活をもっと見る",
      },

      // Songs
      songs: {
        label: "Songs",
        title: "KCP校歌と応援歌",
        items: [
          { title: "校歌「今ここに」", subtitle: "School Song" },
          { title: "応援歌「そらとほしと」", subtitle: "Cheering Song" },
        ],
      },

      // CTA
      cta: {
        label: "Get Started",
        title: "KCPで学びを始めよう",
        description: "資料請求やお問い合わせはこちらから",
        admission: {
          title: "入学案内・資料請求",
          description: "入学手続きに関する詳細情報",
        },
        contact: {
          title: "お問い合わせ",
          description: "ご質問・ご相談はこちら",
        },
      },

      // Footer
      footer: {
        address: {
          postalCode: "〒169-0074",
          address: "東京都新宿区北新宿3-27-1",
          tel: "TEL: 03-3367-6789",
        },
        menu: "メニュー",
        relatedLinks: "関連リンク",
        follow: "フォローする",
        quickLinks: [
          { label: "KCPについて" },
          { label: "コース紹介" },
          { label: "入学案内" },
          { label: "学校生活" },
          { label: "お問い合わせ" },
        ],
        related: [
          { label: "KCP日本語教師養成講座" },
          { label: "KCP US" },
          { label: "KCP中国" },
          { label: "校長ブログ" },
          { label: "情報公開" },
        ],
        copyright: "Copyright © 2025 KCP地球市民日本語学校. All rights reserved.",
        privacy: "プライバシーポリシー",
        terms: "利用規約",
      },
    },
  },
  en: {
    translation: {
      // Header
      logoTop: "KCP Educational Foundation",
      logoBottom: "KCP International Japanese Language School",
      nav: {
        about: "About KCP",
        education: "Education",
        schoolLife: "School Life",
        admission: "Admissions",
        contact: "Contact",
      },
      languageSelector: "Language selector",
      mobileMenuOpen: "Open menu",
      mobileMenuClose: "Close menu",
      requestInfo: "Request Info",

      // Hero
      hero: {
        title1: "Learn Together",
        titleHighlight: " ",
        title2: "Live Together",
        subtitle: "Take the first step toward your dreams through Japanese language education",
        cta1: "Request Information",
        cta2: "Learn About KCP",
        statsLabel: "Total Graduates",
        statsUnit: "",
        statsDescription: "We have supported international students from around the world",
        partners: "PARTNERS",
        partnerList: ["Major IT Companies", "Listed Manufacturers", "Global Trading", "Famous Universities", "Research Institutes"],
        scroll: "SCROLL",
      },

      // About
      about: {
        label: "About KCP",
        title1: "Turn Your Passion Into",
        title2: "Your Career",
        description1: "KCP provides high-quality education to start your Japanese language journey from scratch.",
        description2: "Start by exploring our course offerings.",
        cta: "View Courses",
        features: [
          { title: "Practical Japanese Education", description: "Acquire practical Japanese skills for business" },
          { title: "Multinational Peers", description: "Learn alongside peers from around the world" },
          { title: "Comprehensive Support", description: "Consistent support from enrollment to employment" },
          { title: "Experienced Instructors", description: "Detailed guidance from veteran teachers" },
          { title: "Global Perspective", description: "Develop skills for international success" },
        ],
      },

      // Reasons
      reasons: {
        label: "Why KCP",
        title: "3 Reasons Why We're Chosen",
        description: "Discover what makes KCP the right choice for your Japanese language education.",
        items: [
          {
            title: "Value Your Passion,\nStart Online Today",
            description: "At KCP, you can learn at your own pace, whether online or in-person. Quality Japanese education is accessible from anywhere, even for busy people or those far away.",
          },
          {
            title: "Turn Your Interests Into Skills\nWith User-Friendly Tools",
            description: "Our latest e-learning system and experienced instructors support your learning. From progress management to answering questions, we have a comprehensive support system.",
          },
          {
            title: "Maximize Online Potential\nExpand Your Service Range",
            description: "We support not only Japanese language skills but also career development in Japan. From employment support to academic counseling, we fully back your future.",
          },
        ],
        prev: "Previous",
        next: "Next",
      },

      // Features
      features: {
        label: "Features",
        title: "Easy Management with Advanced Systems",
        description: "Discover what makes KCP the right choice for your Japanese language education.",
        cta: "Learn More",
        items: [
          { title: "Academic Support", description: "Comprehensive university admission support" },
          { title: "Small Classes", description: "Detailed instruction possible" },
          { title: "Multinational Environment", description: "Study with peers worldwide" },
          { title: "Excellent Facilities", description: "State-of-the-art learning environment" },
          { title: "Rich Extracurriculars", description: "Experience Japanese culture" },
          { title: "High Success Rate", description: "Many admissions to top universities" },
          { title: "Original Materials", description: "Efficient learning curriculum" },
          { title: "Life Support", description: "Full support for housing, visa, etc." },
        ],
      },

      // Testimonials
      testimonials: {
        label: "Success Stories",
        title: "Diverse Success Stories",
        description1: "KCP students use their skills to succeed in their own ways",
        description2: "Students are active in various fields through their passions.",
        cta: "View More",
        items: [
          { name: "Li Minghua", country: "China", university: "University of Tokyo, Economics", quote: "The KCP teachers were truly dedicated in their guidance. Thanks to them, I was able to pass the entrance exam for my dream school, the University of Tokyo." },
          { name: "Maria Santos", country: "Brazil", university: "Waseda University, Commerce", quote: "I made friends from many countries and deepened my understanding of cross-cultural communication. My experience at KCP is a lifelong treasure." },
          { name: "Kim Jiwon", country: "South Korea", university: "Keio University, Law", quote: "The academic guidance was thorough, and I was able to find a university that suited me. The support system is excellent." },
        ],
      },

      // Education
      education: {
        label: "Education",
        title: "Education & Support System",
        description: "KCP supports your dreams with high-quality education and comprehensive support.",
        courses: [
          { title: "Course Introduction", subtitle: "Course Introduction", description: "We offer optimal courses for all levels, from beginner to advanced." },
          { title: "Curriculum", subtitle: "Curriculum", description: "A comprehensive curriculum to develop practical Japanese skills." },
          { title: "Achievements", subtitle: "Achievements", description: "Many students advance to prestigious universities like Tokyo, Waseda, and Keio." },
        ],
        cta: "Learn More",
      },

      // School Life
      schoolLife: {
        label: "Campus Life",
        title1: "Learn, Connect,",
        title2: "Grow Every Day",
        description: "A campus life where you can study and have fun to the fullest. Every day spent with multinational peers helps you grow.",
        eventsCount: "Annual Events",
        items: [
          { label: "Annual Schedule" },
          { label: "Club Activities" },
          { label: "Facilities" },
          { label: "Access" },
        ],
        cta: "View More About School Life",
      },

      // Songs
      songs: {
        label: "Songs",
        title: "KCP School Song & Cheering Song",
        items: [
          { title: "School Song \"Here and Now\"", subtitle: "School Song" },
          { title: "Cheering Song \"Sky and Stars\"", subtitle: "Cheering Song" },
        ],
      },

      // CTA
      cta: {
        label: "Get Started",
        title: "Start Learning at KCP",
        description: "Request information or contact us here",
        admission: {
          title: "Admissions & Information Request",
          description: "Detailed information about admission procedures",
        },
        contact: {
          title: "Contact Us",
          description: "Questions and consultations here",
        },
      },

      // Footer
      footer: {
        address: {
          postalCode: "〒169-0074",
          address: "3-27-1 Kitashinjuku, Shinjuku-ku, Tokyo",
          tel: "TEL: 03-3367-6789",
        },
        menu: "Menu",
        relatedLinks: "Related Links",
        follow: "Follow Us",
        quickLinks: [
          { label: "About KCP" },
          { label: "Courses" },
          { label: "Admissions" },
          { label: "School Life" },
          { label: "Contact" },
        ],
        related: [
          { label: "KCP Teacher Training Course" },
          { label: "KCP US" },
          { label: "KCP China" },
          { label: "Principal's Blog" },
          { label: "Information Disclosure" },
        ],
        copyright: "Copyright © 2025 KCP International Japanese Language School. All rights reserved.",
        privacy: "Privacy Policy",
        terms: "Terms of Use",
      },
    },
  },
  ko: {
    translation: {
      // Header
      logoTop: "학교법인 KCP학원",
      logoBottom: "KCP 지구시민 일본어학교",
      nav: {
        about: "KCP 소개",
        education: "교육 내용",
        schoolLife: "학교 생활",
        admission: "입학 안내",
        contact: "문의",
      },
      languageSelector: "언어 선택",
      mobileMenuOpen: "메뉴 열기",
      mobileMenuClose: "메뉴 닫기",
      requestInfo: "자료 요청",

      // Hero
      hero: {
        title1: "함께 배우고",
        titleHighlight: " ",
        title2: "함께 살아가다",
        subtitle: "일본어 교육을 통해 꿈을 향한 첫걸음을 내딛어요",
        cta1: "자료 요청하기",
        cta2: "KCP 알아보기",
        statsLabel: "누적 졸업생",
        statsUnit: "명",
        statsDescription: "전 세계 유학생을 지원해 왔습니다",
        partners: "파트너",
        partnerList: ["대기업 IT", "상장 제조사", "글로벌 상사", "유명 대학", "연구 기관"],
        scroll: "스크롤",
      },

      // About
      about: {
        label: "KCP 소개",
        title1: "당신의 '좋아하는 것'을 직업으로",
        title2: "지금 바로 시작하세요",
        description1: "일본어 스쿨을 처음부터 시작하기 위해 KCP에서는 높은 품질의 학습을 제공합니다.",
        description2: "먼저 저희 코스 목록을 '보는 것'부터 시작해 보세요.",
        cta: "코스 목록 보기",
        features: [
          { title: "실용적인 일본어 교육", description: "비즈니스에서도 사용할 수 있는 실용적인 일본어 실력을 키워요" },
          { title: "다국적 동료들", description: "전 세계에서 모인 동료들과 함께 성장" },
          { title: "충실한 지원 체계", description: "진학·취업까지 일관된 지원" },
          { title: "경험 풍부한 강사진", description: "베테랑 강사의 세심한 지도" },
          { title: "글로벌 시각", description: "국제 사회에서 활약하는 힘을 기르기" },
        ],
      },

      // Reasons
      reasons: {
        label: "왜 KCP인가",
        title: "선택받는 3가지 이유",
        description: "KCP가 '사용자'에게 어떤 점이 좋은지 설명합니다.",
        items: [
          {
            title: "당신의 '좋아하는 것'을 소중히,\n지금 바로 온라인으로 시작할 수 있어요.",
            description: "KCP에서는 온라인이든 대면이든 당신의 페이스에 맞춰 학습을 진행할 수 있습니다. 바쁜 분도, 먼 곳에 계신 분도 어디서든 높은 품질의 일본어 교육을 받을 수 있습니다.",
          },
          {
            title: "좋아하는 것을 '기술'로 만들기\n사용하기 쉬운 도구가 당신을 지원",
            description: "최신 e러닝 시스템과 경험 풍부한 강사진이 당신의 학습을 지원합니다. 진도 관리부터 질문 대응까지 충실한 지원 체계를 갖추고 있습니다.",
          },
          {
            title: "온라인의 힘을 최대화\n기능을 활용해 서비스 범위가 넓어져요!",
            description: "일본어 능력뿐만 아니라 일본에서의 커리어 형성도 지원합니다. 취업 지원부터 진학 상담까지 당신의 미래를 전력으로 지원합니다.",
          },
        ],
        prev: "이전",
        next: "다음",
      },

      // Features
      features: {
        label: "특징",
        title: "고기능 시스템으로 관리도 쉽게",
        description: "KCP가 '사용자'에게 어떤 점이 좋은지 설명합니다.",
        cta: "자세히 보기",
        items: [
          { title: "진학 지원 체계", description: "대학·대학원 진학을 철저히 지원" },
          { title: "소수 정예 수업", description: "세심한 지도가 가능" },
          { title: "다국적 환경", description: "전 세계 동료와 함께 학습" },
          { title: "충실한 시설", description: "최신 설비의 학습 환경" },
          { title: "풍부한 과외 활동", description: "일본 문화를 체험" },
          { title: "높은 합격 실적", description: "유명 대학 진학 실적 다수" },
          { title: "오리지널 교재", description: "효율적인 학습 커리큘럼" },
          { title: "생활 지원", description: "주거·비자 등 전면 지원" },
        ],
      },

      // Testimonials
      testimonials: {
        label: "성공 사례",
        title: "다양한 사용자의 성공 사례",
        description1: "KCP에서 기술을 갖춘 사용자들이 자신만의 방법으로 활약",
        description2: "사용자들은 굿즈 제작이나 이벤트 개최 등 '좋아하는 것'으로 활약하고 있습니다.",
        cta: "더 보기",
        items: [
          { name: "이 명화", country: "중국", university: "도쿄대학 경제학부", quote: "KCP 선생님들은 정말 친절하게 지도해 주셨습니다. 덕분에 꿈이었던 도쿄대학에 합격할 수 있었습니다." },
          { name: "Maria Santos", country: "브라질", university: "와세다대학 상학부", quote: "다국적 친구들을 사귀고 일본어뿐만 아니라 이문화 이해도 깊어졌습니다. KCP에서의 경험은 일생의 재산입니다." },
          { name: "김지원", country: "한국", university: "게이오대학 법학부", quote: "진학 지도가 충실해서 저에게 맞는 대학을 찾을 수 있었습니다. 지원 체계가 훌륭합니다." },
        ],
      },

      // Education
      education: {
        label: "교육",
        title: "교육 내용과 지원 체계",
        description: "KCP에서는 높은 품질의 교육과 충실한 지원 체계로 당신의 꿈을 응원합니다.",
        courses: [
          { title: "코스 소개", subtitle: "Course Introduction", description: "초급부터 상급까지 레벨에 맞는 최적의 코스를 준비하고 있습니다." },
          { title: "수업 내용", subtitle: "Curriculum", description: "실용적인 일본어 능력을 키우는 충실한 커리큘럼." },
          { title: "진학 실적", subtitle: "Achievements", description: "도쿄대, 와세다, 게이오 등 유명 대학 진학 실적 다수." },
        ],
        cta: "자세히 보기",
      },

      // School Life
      schoolLife: {
        label: "캠퍼스 라이프",
        title1: "배우고, 연결되고,",
        title2: "성장하는 매일",
        description: "배우는 것도, 즐기는 것도 전력으로 보낼 수 있는 캠퍼스 라이프가 여기에 있습니다. 다국적 동료들과 함께하는 매일이 당신을 성장시킵니다.",
        eventsCount: "연간 이벤트 수",
        items: [
          { label: "연간 스케줄" },
          { label: "동아리 활동" },
          { label: "시설 안내" },
          { label: "오시는 길" },
        ],
        cta: "학교 생활 더 보기",
      },

      // Songs
      songs: {
        label: "���래",
        title: "KCP 교가와 응원가",
        items: [
          { title: "교가 「지금 여기에」", subtitle: "School Song" },
          { title: "응원가 「하늘과 별과」", subtitle: "Cheering Song" },
        ],
      },

      // CTA
      cta: {
        label: "시작하기",
        title: "KCP에서 배움을 시작하세요",
        description: "자료 요청이나 문의는 여기서",
        admission: {
          title: "입학 안내·자료 요청",
          description: "입학 절차에 관한 상세 정보",
        },
        contact: {
          title: "문의하기",
          description: "질문·상담은 여기로",
        },
      },

      // Footer
      footer: {
        address: {
          postalCode: "〒169-0074",
          address: "도쿄도 신주쿠구 기타신주쿠 3-27-1",
          tel: "TEL: 03-3367-6789",
        },
        menu: "메뉴",
        relatedLinks: "관련 링크",
        follow: "팔로우하기",
        quickLinks: [
          { label: "KCP 소개" },
          { label: "코스 소개" },
          { label: "입학 안내" },
          { label: "학교 생활" },
          { label: "문의" },
        ],
        related: [
          { label: "KCP 일본어교사 양성강좌" },
          { label: "KCP US" },
          { label: "KCP 중국" },
          { label: "교장 블로그" },
          { label: "정보 공개" },
        ],
        copyright: "Copyright © 2025 KCP 지구시민 일본어학교. All rights reserved.",
        privacy: "개인정보처리방침",
        terms: "이용약관",
      },
    },
  },
  zh: {
    translation: {
      // Header
      logoTop: "学校法人KCP学园",
      logoBottom: "KCP地球市民日语学校",
      nav: {
        about: "关于KCP",
        education: "教育内容",
        schoolLife: "学校生活",
        admission: "入学指南",
        contact: "联系我们",
      },
      languageSelector: "语言选择",
      mobileMenuOpen: "打开菜单",
      mobileMenuClose: "关闭菜单",
      requestInfo: "资料请求",

      // Hero
      hero: {
        title1: "共同学习",
        titleHighlight: " ",
        title2: "共同生活",
        subtitle: "通过日语教育，迈出实现梦想的第一步",
        cta1: "请求资料",
        cta2: "了解KCP",
        statsLabel: "累计毕业生",
        statsUnit: "人",
        statsDescription: "我们一直支持来自世界各地的留学生",
        partners: "合作伙伴",
        partnerList: ["大型IT企业", "上市制造商", "全球商社", "知名大学", "研究机构"],
        scroll: "滚动",
      },

      // About
      about: {
        label: "关于KCP",
        title1: "把你的「喜欢」变成工作",
        title2: "现在就开始",
        description1: "为了从头开始学习日语，KCP提供高质量的学习体验。",
        description2: "首先从「查看」我们的课程列表开始吧。",
        cta: "查看课程列表",
        features: [
          { title: "实用的日语教育", description: "掌握商务中也能使用的实用日语能力" },
          { title: "多国籍的伙伴", description: "与来自世界各地的伙伴共同成长" },
          { title: "完善的支援体制", description: "从升学到就业的一贯支持" },
          { title: "经验丰富的讲师团", description: "资深讲师的细致指导" },
          { title: "全球化视野", description: "培养在国际社会活跃的能力" },
        ],
      },

      // Reasons
      reasons: {
        label: "为什么选择KCP",
        title: "被选择的3个理由",
        description: "解释KCP对「用户」有什么好处。",
        items: [
          {
            title: "珍视你的「喜欢」，\n现在就可以在线开始。",
            description: "在KCP，无论是在线还是面对面，都可以按照自己的节奏学习。无论是忙碌的人还是远方的人，都可以从任何地方接受高质量的日语教育。",
          },
          {
            title: "把喜欢的事变成「一技之长」\n易用的工具支持你",
            description: "最新的e-learning系统和经验丰富的讲师团支持你的学习。从进度管理到问题解答，我们拥有完善的支援体制。",
          },
          {
            title: "最大化在线的力量\n活用功能，服务范围更广！",
            description: "我们不仅支持日语能力，还支持在日本的职业发展。从就业支援到升学咨询，全力支持你的未来。",
          },
        ],
        prev: "上一个",
        next: "下一个",
      },

      // Features
      features: {
        label: "特点",
        title: "高功能系统让管理更轻松",
        description: "解释KCP对「用户」有什么好处。",
        cta: "了解更多",
        items: [
          { title: "升学支援体制", description: "全面支持大学·研究生院升学" },
          { title: "小班制", description: "可以进行细致的指导" },
          { title: "多国籍环境", description: "与世界各地的伙伴一起学习" },
          { title: "完善的设施", description: "最新设备的学习环境" },
          { title: "丰富的课外活动", description: "体验日本文化" },
          { title: "高合格率", description: "众多名校升学实绩" },
          { title: "原创教材", description: "高效的学习课程" },
          { title: "生活支援", description: "住房·签证等全面支持" },
        ],
      },

      // Testimonials
      testimonials: {
        label: "成功案例",
        title: "多样化用户的成功案例",
        description1: "在KCP学习技能的用户们用自己的方式活跃",
        description2: "用户们通过制作周边商品、举办活动等「喜欢的事」活跃着。",
        cta: "查看更多",
        items: [
          { name: "李明华", country: "中国", university: "东京大学 经济学部", quote: "KCP的老师们真的很用心地指导我。多亏了他们，我才能考上梦想中的东京大学。" },
          { name: "Maria Santos", country: "巴西", university: "早稻田大学 商学部", quote: "结交了多国籍的朋友，不仅学到了日语，还加深了对异文化的理解。在KCP的经历是一生的财富。" },
          { name: "Kim Jiwon", country: "韩国", university: "�的义塾大学 法学部", quote: "升学指导很充实，能够找到适合自己的大学。支援体制非常出色。" },
        ],
      },

      // Education
      education: {
        label: "教育",
        title: "教育内容与支援体制",
        description: "KCP以高质量的教育和完善的支援体制支持你的梦想。",
        courses: [
          { title: "课程介绍", subtitle: "Course Introduction", description: "从初级到高级，为各个水平准备了最适合的课程。" },
          { title: "授课内容", subtitle: "Curriculum", description: "培养实用日语能力的充实课程。" },
          { title: "升学实绩", subtitle: "Achievements", description: "众多东大、早稻田、庆应等名校升学实绩。" },
        ],
        cta: "了解更多",
      },

      // School Life
      schoolLife: {
        label: "校园生活",
        title1: "学习、连接、",
        title2: "每天成长",
        description: "这里有可以全力学习和享受的校园生活。与多国籍伙伴度过的每一天都会让你成长。",
        eventsCount: "年度活动数",
        items: [
          { label: "年度日程" },
          { label: "社团活动" },
          { label: "设施介绍" },
          { label: "交通指南" },
        ],
        cta: "查看更多学校生活",
      },

      // Songs
      songs: {
        label: "歌曲",
        title: "KCP校歌与应援歌",
        items: [
          { title: "校歌「此刻此地」", subtitle: "School Song" },
          { title: "应援歌「天空与星星」", subtitle: "Cheering Song" },
        ],
      },

      // CTA
      cta: {
        label: "开始",
        title: "在KCP开始学习吧",
        description: "资料请求或咨询请点这里",
        admission: {
          title: "入学指南·资料请求",
          description: "关于入学手续的详细信息",
        },
        contact: {
          title: "联系我们",
          description: "咨询·商谈请点这里",
        },
      },

      // Footer
      footer: {
        address: {
          postalCode: "〒169-0074",
          address: "东京都新宿区北新宿3-27-1",
          tel: "TEL: 03-3367-6789",
        },
        menu: "菜单",
        relatedLinks: "相关链接",
        follow: "关注我们",
        quickLinks: [
          { label: "关于KCP" },
          { label: "课程介绍" },
          { label: "入学指南" },
          { label: "学校生活" },
          { label: "联系我们" },
        ],
        related: [
          { label: "KCP日语教师培训课程" },
          { label: "KCP US" },
          { label: "KCP中国" },
          { label: "校长博客" },
          { label: "信息公开" },
        ],
        copyright: "Copyright © 2025 KCP地球市民日语学校. All rights reserved.",
        privacy: "隐私政策",
        terms: "使用条款",
      },
    },
  },
  ru: {
    translation: {
      // Header
      logoTop: "Образовательная корпорация KCP",
      logoBottom: "Японская языковая школа KCP",
      nav: {
        about: "О KCP",
        education: "Обучение",
        schoolLife: "Жизнь в школе",
        admission: "Поступление",
        contact: "Контакты",
      },
      languageSelector: "Выбор языка",
      mobileMenuOpen: "Открыть меню",
      mobileMenuClose: "Закрыть меню",
      requestInfo: "Запросить информацию",

      // Hero
      hero: {
        title1: "Учимся вместе",
        titleHighlight: " ",
        title2: "Живем вместе",
        subtitle: "Сделайте первый шаг к своей мечте через изучение японского языка",
        cta1: "Запросить информацию",
        cta2: "Узнать о KCP",
        statsLabel: "Всего выпускников",
        statsUnit: "",
        statsDescription: "Мы поддерживаем иностранных студентов со всего мира",
        partners: "ПАРТНЕРЫ",
        partnerList: ["Крупные IT-компании", "Производители", "Глобальная торговля", "Известные университеты", "Исследовательские институты"],
        scroll: "ПРОКРУТИТЬ",
      },

      // About
      about: {
        label: "О KCP",
        title1: "Превратите свою страсть в",
        title2: "профессию",
        description1: "KCP предоставляет качественное образование для начала изучения японского языка с нуля.",
        description2: "Начните с просмотра наших курсов.",
        cta: "Посмотреть курсы",
        features: [
          { title: "Практичное обучение японскому", description: "Приобретите практические навыки японского для бизнеса" },
          { title: "Многонациональные одногруппники", description: "Учитесь вместе со сверстниками со всего мира" },
          { title: "Комплексная поддержка", description: "Постоянная поддержка от поступления до трудоустройства" },
          { title: "Опытные преподаватели", description: "Детальное руководство от опытных учителей" },
          { title: "Глобальная перспектива", description: "Развивайте навыки для международного успеха" },
        ],
      },

      // Reasons
      reasons: {
        label: "Почему KCP",
        title: "3 причины выбрать нас",
        description: "Узнайте, что делает KCP правильным выбором для изучения японского языка.",
        items: [
          {
            title: "Цените свою страсть,\nначните онлайн сегодня",
            description: "В KCP вы можете учиться в своем темпе, онлайн или очно. Качественное обучение японскому доступно откуда угодно.",
          },
          {
            title: "Превратите интересы в навыки\nс удобными инструментами",
            description: "Наша современная система электронного обучения и опытные преподаватели поддержат вашу учебу. От управления прогрессом до ответов на вопросы.",
          },
          {
            title: "Максимизируйте онлайн-потенциал\nрасширьте свои возможности",
            description: "Мы поддерживаем не только языковые навыки, но и карьерное развитие в Японии. От трудоустройства до консультаций по учебе.",
          },
        ],
        prev: "Предыдущий",
        next: "Следующий",
      },

      // Features
      features: {
        label: "Особенности",
        title: "Легкое управление с продвинутыми системами",
        description: "Узнайте, что делает KCP правильным выбором для изучения японского языка.",
        cta: "Подробнее",
        items: [
          { title: "Академическая поддержка", description: "Комплексная поддержка поступления в университет" },
          { title: "Маленькие классы", description: "Возможность детального обучения" },
          { title: "Многонациональная среда", description: "Учитесь со сверстниками со всего мира" },
          { title: "Отличные условия", description: "Современная учебная среда" },
          { title: "Богатая внеклассная жизнь", description: "Познакомьтесь с японской культурой" },
          { title: "Высокий показатель успеха", description: "Много поступлений в топовые университеты" },
          { title: "Оригинальные материалы", description: "Эффективная учебная программа" },
          { title: "Жизненная поддержка", description: "Полная поддержка по жилью, визе и т.д." },
        ],
      },

      // Testimonials
      testimonials: {
        label: "Истории успеха",
        title: "Разнообразные истории успеха",
        description1: "Студенты KCP используют свои навыки для успеха по-своему",
        description2: "Студенты активны в различных областях благодаря своим увлечениям.",
        cta: "Смотреть еще",
        items: [
          { name: "Ли Минхуа", country: "Китай", university: "Токийский университет, экономика", quote: "Преподаватели KCP были действительно преданы своему делу. Благодаря им я смог поступить в университет моей мечты - Токийский университет." },
          { name: "Maria Santos", country: "Бразилия", university: "Университет Васэда, коммерция", quote: "Я завел друзей из многих стран и углубил понимание межкультурной коммуникации. Мой опыт в KCP - сокровище на всю жизнь." },
          { name: "Ким Чивон", country: "Южная Корея", university: "Университет Кэйо, право", quote: "Академическое руководство было тщательным, и я смог найти подходящий мне университет. Система поддержки отличная." },
        ],
      },

      // Education
      education: {
        label: "Образование",
        title: "Образование и система поддержки",
        description: "KCP поддерживает ваши мечты с помощью качественного образования и комплексной поддержки.",
        courses: [
          { title: "Введение в курсы", subtitle: "Course Introduction", description: "Мы предлагаем оптимальные курсы для всех уровней, от начального до продвинутого." },
          { title: "Учебная программа", subtitle: "Curriculum", description: "Комплексная программа для развития практических навыков японского языка." },
          { title: "Достижения", subtitle: "Achievements", description: "Многие студенты поступают в престижные университеты: Токио, Васэда, Кэйо." },
        ],
        cta: "Подробнее",
      },

      // School Life
      schoolLife: {
        label: "Жизнь в кампусе",
        title1: "Учитесь, общайтесь,",
        title2: "растите каждый день",
        description: "Жизнь в кампусе, где можно учиться и веселиться по полной. Каждый день с многонациональными одногруппниками помогает вам расти.",
        eventsCount: "Ежегодных мероприятий",
        items: [
          { label: "Годовое расписание" },
          { label: "Клубы" },
          { label: "Условия" },
          { label: "Как добраться" },
        ],
        cta: "Подробнее о жизни в школе",
      },

      // Songs
      songs: {
        label: "Песни",
        title: "Гимн и песня поддержки KCP",
        items: [
          { title: "Гимн школы «Здесь и сейчас»", subtitle: "School Song" },
          { title: "Песня поддержки «Небо и звёзды»", subtitle: "Cheering Song" },
        ],
      },

      // CTA
      cta: {
        label: "Начать",
        title: "Начните обучение в KCP",
        description: "Запросите информацию или свяжитесь с нами",
        admission: {
          title: "Поступление и запрос информации",
          description: "Подробная информация о процедуре поступления",
        },
        contact: {
          title: "Связаться с нами",
          description: "Вопросы и консультации здесь",
        },
      },

      // Footer
      footer: {
        address: {
          postalCode: "〒169-0074",
          address: "3-27-1 Китасиндзюку, Синдзюку-ку, Токио",
          tel: "TEL: 03-3367-6789",
        },
        menu: "Меню",
        relatedLinks: "Связанные ссылки",
        follow: "Подписаться",
        quickLinks: [
          { label: "О KCP" },
          { label: "Курсы" },
          { label: "��оступление" },
          { label: "Жизнь в школе" },
          { label: "Контакты" },
        ],
        related: [
          { label: "Курс подготовки учителей KCP" },
          { label: "KCP US" },
          { label: "KCP Китай" },
          { label: "Блог директора" },
          { label: "Раскрытие информации" },
        ],
        copyright: "Copyright © 2025 Японская языковая школа KCP. Все права защищены.",
        privacy: "Политика конфиденциальности",
        terms: "Условия использования",
      },
    },
  },
  vi: {
    translation: {
      // Header
      logoTop: "Tập đoàn giáo dục KCP",
      logoBottom: "Trường Nhật ngữ KCP Global Citizen",
      nav: {
        about: "Về KCP",
        education: "Nội dung đào tạo",
        schoolLife: "Đời sống học đường",
        admission: "Hướng dẫn nhập học",
        contact: "Liên hệ",
      },
      languageSelector: "Chọn ngôn ngữ",
      mobileMenuOpen: "Mở menu",
      mobileMenuClose: "Đóng menu",
      requestInfo: "Yêu cầu tài liệu",

      // Hero
      hero: {
        title1: "Cùng học",
        titleHighlight: " ",
        title2: "Cùng sống",
        subtitle: "Bước đi đầu tiên hướng tới ước mơ thông qua giáo dục tiếng Nhật",
        cta1: "Yêu cầu tài liệu",
        cta2: "Tìm hiểu về KCP",
        statsLabel: "Tổng số sinh viên tốt nghiệp",
        statsUnit: "người",
        statsDescription: "Chúng tôi đã hỗ trợ du học sinh từ khắp nơi trên thế giới",
        partners: "ĐỐI TÁC",
        partnerList: ["Công ty IT lớn", "Nhà sản xuất", "Thương mại toàn cầu", "Trường đại học nổi tiếng", "Viện nghiên cứu"],
        scroll: "CUỘN",
      },

      // About
      about: {
        label: "Về KCP",
        title1: "Biến đam mê thành",
        title2: "nghề nghiệp",
        description1: "KCP cung cấp giáo dục chất lượng cao để bắt đầu hành trình tiếng Nhật từ đầu.",
        description2: "Hãy bắt đầu bằng việc xem danh sách khóa học của chúng tôi.",
        cta: "Xem danh sách khóa học",
        features: [
          { title: "Giáo dục tiếng Nhật thực tế", description: "Đạt được kỹ năng tiếng Nhật thực tế cho kinh doanh" },
          { title: "Bạn bè đa quốc gia", description: "Học cùng bạn bè từ khắp nơi trên thế giới" },
          { title: "Hỗ trợ toàn diện", description: "Hỗ trợ nhất quán từ nhập học đến việc làm" },
          { title: "Giảng viên giàu kinh nghiệm", description: "Hướng dẫn chi tiết từ giáo viên kỳ cựu" },
          { title: "Tầm nhìn toàn cầu", description: "Phát triển kỹ năng để thành công quốc tế" },
        ],
      },

      // Reasons
      reasons: {
        label: "Tại sao chọn KCP",
        title: "3 lý do được chọn",
        description: "Khám phá điều gì làm KCP trở thành lựa chọn đúng đắn cho việc học tiếng Nhật của bạn.",
        items: [
          {
            title: "Trân trọng đam mê của bạn,\nbắt đầu trực tuyến ngay hôm nay",
            description: "Tại KCP, bạn có thể học theo tốc độ của mình, trực tuyến hoặc trực tiếp. Giáo dục tiếng Nhật chất lượng có thể tiếp cận từ bất cứ đâu.",
          },
          {
            title: "Biến sở thích thành kỹ năng\nvới công cụ thân thiện",
            description: "Hệ thống e-learning mới nhất và giảng viên giàu kinh nghiệm hỗ trợ việc học của bạn. Từ quản lý tiến độ đến trả lời câu hỏi.",
          },
          {
            title: "Tối đa hóa tiềm năng trực tuyến\nmở rộng phạm vi dịch vụ",
            description: "Chúng tôi hỗ trợ không chỉ kỹ năng ngôn ngữ mà còn phát triển sự nghiệp tại Nhật Bản. Từ hỗ trợ việc làm đến tư vấn học tập.",
          },
        ],
        prev: "Trước",
        next: "Tiếp",
      },

      // Features
      features: {
        label: "Tính năng",
        title: "Quản lý dễ dàng với hệ thống tiên tiến",
        description: "Khám phá điều gì làm KCP trở thành lựa chọn đúng đắn cho việc học tiếng Nhật của bạn.",
        cta: "Xem thêm",
        items: [
          { title: "Hỗ trợ học thuật", description: "Hỗ trợ toàn diện nhập học đại học" },
          { title: "Lớp học nhỏ", description: "Có thể hướng dẫn chi tiết" },
          { title: "Môi trường đa quốc gia", description: "Học với bạn bè toàn thế giới" },
          { title: "Cơ sở vật chất tuyệt vời", description: "Môi trường học tập hiện đại" },
          { title: "Hoạt động ngoại khóa phong phú", description: "Trải nghiệm văn hóa Nhật Bản" },
          { title: "Tỷ lệ thành công cao", description: "Nhiều sinh viên vào các trường đại học hàng đầu" },
          { title: "Tài liệu gốc", description: "Chương trình học hiệu quả" },
          { title: "Hỗ trợ cuộc sống", description: "Hỗ trợ đầy đủ về nhà ở, visa, v.v." },
        ],
      },

      // Testimonials
      testimonials: {
        label: "Câu chuyện thành công",
        title: "Những câu chuyện thành công đa dạng",
        description1: "Học viên KCP sử dụng kỹ năng của mình để thành công theo cách riêng",
        description2: "Học viên hoạt động trong nhiều lĩnh vực thông qua đam mê của họ.",
        cta: "Xem thêm",
        items: [
          { name: "Lý Minh Hoa", country: "Trung Quốc", university: "Đại học Tokyo, Kinh tế", quote: "Các giáo viên KCP thực sự tận tâm hướng dẫn. Nhờ họ, tôi đã có thể đỗ vào trường mơ ước - Đại học Tokyo." },
          { name: "Maria Santos", country: "Brazil", university: "Đại học Waseda, Thương mại", quote: "Tôi kết bạn với nhiều người từ nhiều quốc gia và hiểu sâu hơn về giao tiếp đa văn hóa. Trải nghiệm tại KCP là kho báu cả đời." },
          { name: "Kim Jiwon", country: "Hàn Quốc", university: "Đại học Keio, Luật", quote: "Hướng dẫn học thuật rất kỹ lưỡng, và tôi có thể tìm được trường đại học phù hợp với mình. Hệ thống hỗ trợ tuyệt vời." },
        ],
      },

      // Education
      education: {
        label: "Giáo dục",
        title: "Nội dung giáo dục & Hệ thống hỗ trợ",
        description: "KCP hỗ trợ ước mơ của bạn với giáo dục chất lượng cao và hỗ trợ toàn diện.",
        courses: [
          { title: "Giới thiệu khóa học", subtitle: "Course Introduction", description: "Chúng tôi cung cấp các khóa học tối ưu cho mọi trình độ, từ sơ cấp đến cao cấp." },
          { title: "Chương trình giảng dạy", subtitle: "Curriculum", description: "Chương trình toàn diện để phát triển kỹ năng tiếng Nhật thực tế." },
          { title: "Thành tích", subtitle: "Achievements", description: "Nhiều sinh viên vào các trường đại học danh tiếng như Tokyo, Waseda, Keio." },
        ],
        cta: "Xem thêm",
      },

      // School Life
      schoolLife: {
        label: "Đời sống học đường",
        title1: "Học tập, kết nối,",
        title2: "phát triển mỗi ngày",
        description: "Cuộc sống học đường nơi bạn có thể học và vui chơi hết mình. Mỗi ngày bên bạn bè đa quốc gia giúp bạn trưởng thành.",
        eventsCount: "Sự kiện hàng năm",
        items: [
          { label: "Lịch trình năm" },
          { label: "Câu lạc bộ" },
          { label: "Cơ sở vật chất" },
          { label: "Đường đi" },
        ],
        cta: "Xem thêm về đời sống học đường",
      },

      // Songs
      songs: {
        label: "Bài hát",
        title: "Bài ca trường & Bài hát cổ vũ KCP",
        items: [
          { title: "Bài ca trường \"Ở đây và bây giờ\"", subtitle: "School Song" },
          { title: "Bài hát cổ vũ \"Trời và sao\"", subtitle: "Cheering Song" },
        ],
      },

      // CTA
      cta: {
        label: "Bắt đầu",
        title: "Bắt đầu học tại KCP",
        description: "Yêu cầu tài liệu hoặc liên hệ với chúng tôi tại đây",
        admission: {
          title: "Tuyển sinh & Yêu cầu thông tin",
          description: "Thông tin chi tiết về thủ tục nhập học",
        },
        contact: {
          title: "Liên hệ",
          description: "Câu hỏi và tư vấn tại đây",
        },
      },

      // Footer
      footer: {
        address: {
          postalCode: "〒169-0074",
          address: "3-27-1 Kitashinjuku, Shinjuku-ku, Tokyo",
          tel: "TEL: 03-3367-6789",
        },
        menu: "Menu",
        relatedLinks: "Liên kết liên quan",
        follow: "Theo dõi",
        quickLinks: [
          { label: "Về KCP" },
          { label: "Khóa học" },
          { label: "Tuyển sinh" },
          { label: "Đời sống học đường" },
          { label: "Liên hệ" },
        ],
        related: [
          { label: "Khóa đào tạo giáo viên KCP" },
          { label: "KCP US" },
          { label: "KCP Trung Quốc" },
          { label: "Blog của Hiệu trưởng" },
          { label: "Công bố thông tin" },
        ],
        copyright: "Copyright © 2025 Trường Nhật ngữ KCP Global Citizen. Bảo lưu mọi quyền.",
        privacy: "Chính sách bảo mật",
        terms: "Điều khoản sử dụng",
      },
    },
  },
} as const

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "ja",
    fallbackLng: "ja",
    interpolation: {
      escapeValue: false,
    },
  })
}

export default i18n
