"use client"

import "@/lib/i18n/index"
import type { ReactNode } from "react"

type I18nProviderProps = {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  return <>{children}</>
}