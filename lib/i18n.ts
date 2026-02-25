import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
  ja: {
    translation: {
      logoTop: "学校法人KCP学園",
      logoBottom: "KCP地球市民日本語学校",
      nav: {
        about: "KCPとは",
        education: "教育内容",
        schoolLife: "学校生活",
        admission: "入学案内",
        contact: "お問い合わせ",
      },
      languageSelector: "Language selector",
      mobileMenuOpen: "Open menu",
      mobileMenuClose: "Close menu",
    },
  },
  en: {
    translation: {
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
    },
  },
  ko: {
    translation: {
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
    },
  },
  zh: {
    translation: {
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
    },
  },
  ru: {
    translation: {
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
    },
  },
  vi: {
    translation: {
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