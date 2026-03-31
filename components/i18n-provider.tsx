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
    html.lang = lang
    html.dataset.lang = lang
  }, [i18n.language])

  return <>{children}</>
}