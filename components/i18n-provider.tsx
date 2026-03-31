"use client"

import "@/lib/i18n/index"
import type { ReactNode } from "react"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"

type I18nProviderProps = {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const { i18n } = useTranslation()

  useEffect(() => {
    const lang = i18n.language || "ja"
    const html = document.documentElement
    // 브라우저가 CJK 글리프(간체/일본식 등)를 선택할 때 lang를 참고하는 경우가 있어,
    // zh는 zh-CN으로 명시해 중국어(간체) 렌더링이 섞이지 않게 한다.
    html.lang = lang === "zh" ? "zh-CN" : lang
    html.dataset.lang = lang
  }, [i18n.language])

  return <>{children}</>
}