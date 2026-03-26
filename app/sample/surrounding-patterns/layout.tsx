import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "サンプル: 周辺環境 UI パターン | KCP",
  robots: { index: false, follow: false },
}

export default function SurroundingPatternsSampleLayout({ children }: { children: ReactNode }) {
  return children
}
