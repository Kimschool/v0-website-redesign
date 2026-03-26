import Link from "next/link"

export function SampleSurroundingPatternNav({ current }: { current: 1 | 2 | 3 }) {
  const items = [
    { n: 1 as const, href: "/sample/surrounding-patterns/pattern-1", label: "パターン1" },
    { n: 2 as const, href: "/sample/surrounding-patterns/pattern-2", label: "パターン2" },
    { n: 3 as const, href: "/sample/surrounding-patterns/pattern-3", label: "パターン3" },
  ]
  return (
    <nav className="mb-10 flex flex-wrap items-center gap-2 border-b border-gray-200 pb-4 text-sm">
      <Link href="/sample/surrounding-patterns" className="font-medium text-[#0085b2] hover:underline">
        ← 一覧
      </Link>
      <span className="text-gray-300">|</span>
      {items.map((item, i) => (
        <span key={item.n} className="flex items-center gap-2">
          {i > 0 && <span className="text-gray-300">·</span>}
          {item.n === current ? (
            <span className="font-semibold text-gray-900">{item.label}</span>
          ) : (
            <Link href={item.href} className="text-[#0085b2] hover:underline">
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}
