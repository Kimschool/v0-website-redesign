import { NextResponse } from "next/server"

/**
 * Flipbook manifest proxy (same-origin) to avoid CORS issues when fetching
 * `manifest.json` from a different domain in the browser.
 *
 * Images themselves are loaded by <img>, so they can stay cross-origin.
 */
const FLIPBOOK_BASE_URL = "http://weavus.main.jp/doc/flipbooks/pamphlet"

const ALLOWED_LANGS = ["ja", "zh", "ko"] as const
type Lang = (typeof ALLOWED_LANGS)[number]

export async function GET(request: Request) {
  const lang = new URL(request.url).searchParams.get("lang") as Lang | null
  if (!lang || !ALLOWED_LANGS.includes(lang)) {
    return new NextResponse("Invalid lang", { status: 400 })
  }

  const upstreamUrl = `${FLIPBOOK_BASE_URL}/${lang}/manifest.json`

  try {
    const upstream = await fetch(upstreamUrl, {
      next: { revalidate: 300 },
      headers: {
        // Some hosts block requests without UA/Accept
        Accept: "application/json,text/plain,*/*",
      },
    })

    if (!upstream.ok) {
      return new NextResponse(`Upstream error: ${upstream.status}`, { status: 502 })
    }

    const json = await upstream.json()
    return NextResponse.json(json, {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=300",
      },
    })
  } catch {
    return new NextResponse("Upstream fetch failed", { status: 502 })
  }
}

