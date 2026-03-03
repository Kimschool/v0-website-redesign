"use client"

import { useState, useEffect } from "react"
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
  const [scrolled, setScrolled] = useState(false)
  const { t, i18n } = useTranslation()
  const currentLanguage =
    languageOptions.find((language) => language.code === i18n.resolvedLanguage) ?? languageOptions[0]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.education"), href: "#education" },
    { label: t("nav.schoolLife"), href: "#school-life" },
    { label: t("nav.admission"), href: "#admission" },
    { label: t("nav.contact"), href: "#contact" },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-card/98 backdrop-blur-lg shadow-lg shadow-primary/5 border-b border-border" 
          : "bg-card/90 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-8 py-5">
        {/* Logo */}
        <Link href="/" className="flex flex-col group">
          <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-light group-hover:text-accent transition-colors duration-300">
            {"学校法人KCP学園"}
          </span>
          <span className="text-lg font-medium tracking-wider text-foreground mt-0.5">
            {"KCP地球市民日本語学校"}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-light tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-accent hover:after:w-full after:transition-all after:duration-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Language Selector + Mobile Toggle */}
        <div className="flex items-center gap-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 py-2 px-3 rounded-lg hover:bg-secondary"
                aria-label={t("languageSelector")}
              >
                <Globe className="h-4 w-4" />
                <span className="font-light uppercase tracking-wider">{currentLanguage.code}</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-56 rounded-xl shadow-xl border-border/50">
              {languageOptions.map((language) => (
                <DropdownMenuItem 
                  key={language.code} 
                  onClick={() => i18n.changeLanguage(language.code)}
                  className="py-3 cursor-pointer"
                >
                  <span className="mr-3 text-base leading-none">{language.flag}</span>
                  <span className="tracking-wide">{language.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            className="lg:hidden p-2.5 text-foreground hover:bg-secondary rounded-lg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <nav className="lg:hidden bg-card border-t border-border shadow-xl" aria-label="Mobile navigation">
          <div className="px-8 py-8 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-light text-muted-foreground hover:text-foreground hover:bg-secondary transition-all py-3 px-4 rounded-lg tracking-wide"
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
