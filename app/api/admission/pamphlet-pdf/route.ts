import { NextResponse } from "next/server"

/** PDF.js 用 — 同一オリジンで配信（CORS 回避）。URL はサーバー側のみ保持 */
const PAMPHLET_SOURCE_BY_LANG = {
  ja: "http://weavus.main.jp/temp/KCPパンフレット_JP.pdf",
  zh: "http://weavus.main.jp/temp/KCPパンフレット_CN.pdf",
  ko: "http://weavus.main.jp/temp/KCPパンフレット_KR.pdf",
} as const

type Lang = keyof typeof PAMPHLET_SOURCE_BY_LANG

export async function GET(request: Request) {
  const lang = new URL(request.url).searchParams.get("lang") as Lang | null
  if (lang !== "ja" && lang !== "zh" && lang !== "ko") {
    return new NextResponse("Invalid lang", { status: 400 })
  }

  const sourceUrl = PAMPHLET_SOURCE_BY_LANG[lang]

  try {
    const upstream = await fetch(sourceUrl, {
      next: { revalidate: 300 },
    })
    if (!upstream.ok) {
      return new NextResponse(null, { status: 502 })
    }
    const buffer = Buffer.from(await upstream.arrayBuffer())
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="kcp-pamphlet.pdf"',
        "Cache-Control": "public, max-age=300, s-maxage=300",
      },
    })
  } catch {
    return new NextResponse(null, { status: 502 })
  }
}
