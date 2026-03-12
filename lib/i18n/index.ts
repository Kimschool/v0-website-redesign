import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import ja from "./ja"
import en from "./en"
import ko from "./ko"
import zh from "./zh"
import ru from "./ru"
import vi from "./vi"

const resources = {
  ja: { translation: ja },
  en: { translation: en },
  ko: { translation: ko },
  zh: { translation: zh },
  ru: { translation: ru },
  vi: { translation: vi },
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
