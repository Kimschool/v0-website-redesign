"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Globe, ChevronDown, ArrowRight } from "lucide-react"
import { useTranslation } from "react-i18next"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const languageOptions = [
  { code: "ja", label: "日本語", flag: "JP" },
  { code: "zh", label: "Chinese", flag: "CN" },
  { code: "en", label: "English", flag: "EN" },
  { code: "ko", label: "Korean", flag: "KR" },
  { code: "ru", label: "Russian", flag: "RU" },
  { code: "vi", label: "Vietnamese", flag: "VN" },
] as const

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { t, i18n } = useTranslation()
  const currentLanguage =
    languageOptions.find((language) => language.code === i18n.resolvedLanguage) ?? languageOptions[0]

  /** NEWS系ページは常に明るい背景のため、未スクロールでもヘッダーを「固体」表示にする */
  const lightTopPage = pathname?.startsWith("/news") ?? false
  const solidNav = scrolled || lightTopPage

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: t("nav.news"), href: "/news" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.education"), href: "/education" },
    { label: t("nav.schoolLife"), href: "/school-life" },
    { label: t("nav.admission"), href: "/admission" },
    { label: t("nav.contact"), href: "/contact" },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solidNav 
          ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-black/[0.03] py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex flex-col group relative">
          <div className={`transition-all duration-300 ${solidNav ? "" : "drop-shadow-lg"}`}>
            <Image
              src="/images/original_from_customer/4-e1764725157523.png"
              alt="KCP地球市民日本語学校"
              width={200}
              height={40}
              className={`h-8 w-auto transition-all duration-300 ${!solidNav ? "brightness-0 invert" : ""}`}
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
                solidNav 
                  ? "text-foreground hover:text-primary hover:bg-primary/5" 
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side - Language + CTA */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button
                className={`flex items-center gap-2 text-sm py-2 px-3 rounded-lg transition-all duration-300 ${
                  solidNav 
                    ? "text-muted-foreground hover:text-foreground hover:bg-muted" 
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                aria-label={t("languageSelector")}
              >
                <Globe className="h-4 w-4" />
                <span className="font-medium uppercase">{currentLanguage.code}</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-48 rounded-xl shadow-xl border-border/50 bg-white/95 backdrop-blur-xl">
              {languageOptions.map((language) => (
                <DropdownMenuItem 
                  key={language.code} 
                  onClick={() => i18n.changeLanguage(language.code)}
                  className="py-3 cursor-pointer hover:bg-primary/5"
                >
                  <span className="mr-3 text-xs font-bold text-muted-foreground">{language.flag}</span>
                  <span>{language.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* CTA Button - Desktop */}
          <Link
            href="/school-life#access"
            className={`hidden lg:flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 shimmer ${
              solidNav 
                ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20" 
                : "bg-white text-primary hover:bg-white/90"
            }`}
          >
            {t("nav.access")}
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
              solidNav 
                ? "text-foreground hover:bg-muted" 
                : "text-white hover:bg-white/10"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? t("mobileMenuClose") : t("mobileMenuOpen")}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-white/95 backdrop-blur-xl border-t border-border/50 shadow-xl" aria-label="Mobile navigation">
          <div className="px-6 py-6 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-all py-3 px-4 rounded-xl"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile CTA */}
            <Link
              href="/school-life#access"
              className="mt-4 flex items-center justify-center gap-2 bg-primary text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-primary/20"
              onClick={() => setMobileOpen(false)}
            >
              {t("nav.access")}
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Language Selector - Mobile */}
            <div className="border-t border-border/50 mt-4 pt-4">
              <div className="flex items-center gap-2 px-4 mb-3 text-sm text-muted-foreground">
                <Globe className="h-4 w-4" />
                <span className="font-medium">{currentLanguage.label}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 px-4">
                {languageOptions.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => {
                      i18n.changeLanguage(language.code)
                      setMobileOpen(false)
                    }}
                    className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
                      language.code === currentLanguage.code
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "bg-muted text-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {language.flag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
