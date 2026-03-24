import { readFile } from "node:fs/promises"
import path from "node:path"
import { NextResponse } from "next/server"

/** 学則PDF — ブラウザ内表示（Content-Disposition: inline、ダウンロード強制を避ける） */
export async function GET() {
  const filePath = path.join(process.cwd(), "public", "documents", "gakusoku.pdf")
  try {
    const buffer = await readFile(filePath)
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="gakusoku.pdf"',
        "Cache-Control": "public, max-age=3600",
      },
    })
  } catch {
    return new NextResponse(null, { status: 404 })
  }
}
