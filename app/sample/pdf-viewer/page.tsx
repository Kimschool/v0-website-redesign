import type { Metadata } from "next"
import Link from "next/link"
import { PdfCanvasViewerLazy } from "@/components/pdf-canvas-viewer-lazy"

export const metadata: Metadata = {
  title: "サンプル: PDF.js キャンバス表示 | KCP",
  robots: { index: false, follow: false },
}

/**
 * デモ用ルート（本番ではナビに載せない想定）。
 * /sample/pdf-viewer
 */
export default function SamplePdfViewerPage() {
  return (
    <main className="min-h-screen bg-[#f4f6f8] py-10 px-4 md:py-14">
      <article className="mx-auto max-w-3xl">
        <h1 className="font-serif text-2xl font-bold text-gray-900 md:text-3xl">
          PDF.js キャンバス表示サンプル（学則）
        </h1>
        <p className="mt-2 text-sm text-[#0085b2]">
          /sample/pdf-viewer · デモ・検証用 ·{" "}
          <Link href="/sample/pdf-flipbook" className="font-medium hover:underline">
            ページめくり（react-pageflip）サンプル →
          </Link>
        </p>

        <div className="mt-8 space-y-4 text-sm leading-relaxed text-gray-700">
          <p>
            <strong>このページの挙動</strong>
            ：PDF をブラウザ標準の PDF ビューで開かず、
            <strong className="text-gray-900">PDF.js で各ページを canvas に描画</strong>
            しています。
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              別タブで <code className="rounded bg-gray-200 px-1">.pdf</code> が開かないため、
              アドレスバー横の「ダウンロード」に相当する操作は出にくいです。
            </li>
            <li>
              canvas 上の<strong>右クリックメニューを抑止</strong>（ページ内のこの枠のみ）しています。
            </li>
          </ul>
          <p className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-amber-950">
            <strong>防げないこと（重要）</strong>
            ：印刷、スクリーンショット、開発者ツールでのネットワーク／キャンバス取得、画面録画、
            スマホのスクリーンキャプチャなどは従来どおり可能です。完全なコピー防止は Web では実現できません。
          </p>
        </div>

        <section className="mt-10">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">表示エリア（/api/basic-info/gakusoku）</h2>
          <PdfCanvasViewerLazy pdfUrl="/api/basic-info/gakusoku" />
        </section>

        <p className="mt-10 text-xs text-gray-500">
          本番で同様の UI を使う場合は、情報公開ページの「学則について」からモーダルまたは専用ページへ遷移する形が扱いやすいです。
        </p>
      </article>
    </main>
  )
}
