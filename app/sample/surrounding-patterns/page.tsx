import Link from "next/link"

/**
 * デモ用：周辺環境カルーセルの3パターンを別URLで比較する。
 * 本番ナビには載せない想定。
 */
export default function SurroundingPatternsIndexPage() {
  const links = [
    { href: "/sample/surrounding-patterns/pattern-1", label: "パターン1 — 大判ヒーロー＋ドット" },
    { href: "/sample/surrounding-patterns/pattern-2", label: "パターン2 — ダーク・フィルムストリップ" },
    { href: "/sample/surrounding-patterns/pattern-3", label: "パターン3 — メイン＋サムネイル列" },
  ] as const

  return (
    <main className="min-h-screen bg-[#f4f6f8] py-10 px-4 md:py-14">
      <article className="mx-auto max-w-2xl">
        <p className="text-sm text-[#0085b2]">/sample/surrounding-patterns · デモ・検証用</p>
        <h1 className="mt-2 font-serif text-2xl font-bold text-gray-900 md:text-3xl">
          周辺環境エリア — UI パターン一覧
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-gray-600">
          学校生活ページ本番には反映していません。以下から各パターンのみを表示するページへ移動できます。
        </p>
        <ul className="mt-10 space-y-4">
          {links.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-xl border border-gray-200 bg-white px-5 py-4 text-[#0085b2] shadow-sm transition hover:border-[#0085b2]/30 hover:shadow-md"
              >
                <span className="font-semibold">{item.label}</span>
                <span className="mt-1 block text-xs text-gray-500">{item.href}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-xs text-gray-500">
          <Link href="/sample/pdf-viewer" className="text-[#0085b2] hover:underline">
            PDF ビューアサンプル
          </Link>
          へ
        </p>
      </article>
    </main>
  )
}
