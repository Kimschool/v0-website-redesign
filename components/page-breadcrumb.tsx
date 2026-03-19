import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

type BreadcrumbItem = {
  label: string
  href?: string
}

type PageBreadcrumbProps = {
  items: BreadcrumbItem[]
}

export function PageBreadcrumb({ items }: PageBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="px-4 md:px-8 lg:px-16 py-4 border-b border-gray-200 bg-white">
      <ol className="max-w-6xl mx-auto flex flex-wrap items-center gap-2 text-sm">
        <li>
          <Link href="/" className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors">
            <Home className="h-4 w-4" />
            HOME
          </Link>
        </li>

        {items.map((item, idx) => (
          <li key={`${item.label}-${idx}`} className="inline-flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-gray-400" />
            {item.href ? (
              <Link href={item.href} className="text-gray-500 hover:text-gray-800 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-[#0085b2]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

