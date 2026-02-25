"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Globe } from "lucide-react"

const navItems = [
  { label: "KCPとは", href: "#about" },
  { label: "教育内容", href: "#education" },
  { label: "学校生活", href: "#school-life" },
  { label: "入学案内", href: "#admission" },
  { label: "お問い合わせ", href: "#contact" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex flex-col">
          <span className="text-[10px] tracking-widest text-muted-foreground font-light">
            {"学校法人KCP学園"}
          </span>
          <span className="text-lg font-medium tracking-wide text-foreground">
            {"KCP地球市民日本語学校"}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-light tracking-wide text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Language Selector + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Language selector"
          >
            <Globe className="h-4 w-4" />
            <span className="font-light">JA</span>
          </button>

          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <nav className="lg:hidden bg-card border-t border-border" aria-label="Mobile navigation">
          <div className="px-6 py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-light text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
