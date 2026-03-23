import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NEWS | KCP地球市民日本語学校",
  description: "KCP地球市民日本語学校からのお知らせ・最新情報です。",
}

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children
}
