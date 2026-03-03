"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Globe, ChevronDown } from "lucide-react"
import { useTranslation } from "react-i18next"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const languageOptions = [
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "zh", label: "Chinese (Simplified)", flag: "🇨🇳" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ko", label: "Korean", flag: "🇰🇷" },
  { code: "ru", label: "Russian", flag: "🇷🇺" },
  { code: "vi", label: "Vietnamese", flag: "🇻🇳" },
] as const

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t, i18n } = useTranslation()
  const currentLanguage =
    languageOptions.find((language) => language.code === i18n.resolvedLanguage) ?? languageOptions[0]

  const navItems = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.education"), href: "#education" },
    { label: t("nav.schoolLife"), href: "#school-life" },
    { label: t("nav.admission"), href: "#admission" },
    { label: t("nav.contact"), href: "#contact" },
  ]

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
          <button
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                aria-label={t("languageSelector")}
          >
            <Globe className="h-4 w-4" />
                <span className="font-light uppercase">{currentLanguage.code}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-56">
              {languageOptions.map((language) => (
                <DropdownMenuItem key={language.code} onClick={() => i18n.changeLanguage(language.code)}>
                  <span className="mr-2 text-base leading-none">{language.flag}</span>
                  <span>{language.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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
