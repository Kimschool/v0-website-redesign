import type { Metadata } from "next"
import Link from "next/link"
import { PdfFlipbookViewerLazy } from "@/components/pdf-flipbook-viewer-lazy"

export const metadata: Metadata = {
  title: "サンプル: PDF ページめくり（react-pageflip）| KCP",
  robots: { index: false, follow: false },
}

const DEMO_PDF_URL = "/api/basic-info/gakusoku"

/**
 * デモ用: react-pageflip + PDF.js（各ページを画像化してめくり表示）
 * /sample/pdf-flipbook
 */
export default function SamplePdfFlipbookPage() {
  return (
    <main className="min-h-screen bg-[#f4f6f8] py-10 px-4 md:py-14">
      <article className="mx-auto max-w-4xl">
        <p className="text-sm text-[#0085b2]">
          <Link href="/sample/pdf-viewer" className="hover:underline">
            ← PDF.js キャンバス表示サンプル
          </Link>
        </p>

        <h1 className="mt-4 font-serif text-2xl font-bold text-gray-900 md:text-3xl">
          PDF ページめくりサンプル（react-pageflip）
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          /sample/pdf-flipbook · 本番ナビには載せない検証用ページです。
        </p>

        <div className="mt-8 space-y-4 text-sm leading-relaxed text-gray-700">
          <p>
            <strong>このページの挙動</strong>：
            PDF を <strong>PDF.js で1ページずつ canvas に描画</strong>し、JPEG の data
            URL として <strong>react-pageflip</strong>（StPageFlip）に渡してめくり UI
            を出しています。千駄ヶ谷サイトの Real3D とは別製品で、同様の「横めくり」体験を
            Next 上で試すためのサンプルです。
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              表示元 PDF:{" "}
              <code className="rounded bg-gray-200 px-1">{DEMO_PDF_URL}</code>{" "}
              （学則 PDF。リポジトリに <code className="rounded bg-gray-200 px-1">public/documents/gakusoku.pdf</code>{" "}
              がある場合のみ取得できます）
            </li>
            <li>
              ページ数が多いと初回の「画像化」に時間がかかります。
            </li>
          </ul>
        </div>

        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            表示エリア
          </h2>
          <PdfFlipbookViewerLazy pdfUrl={DEMO_PDF_URL} />
        </section>
      </article>
    </main>
  )
}
