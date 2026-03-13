"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Globe, ChevronDown } from "lucide-react"
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
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.education"), href: "/education" },
    { label: t("nav.schoolLife"), href: "/school-life" },
    { label: t("nav.admission"), href: "/admission" },
    { label: t("nav.contact"), href: "/contact" },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white shadow-md" 
          : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex flex-col group">
          <Image
            src="/images/original_from_customer/4-e1764725157523.png"
            alt="KCP地球市民日本語学校"
            width={200}
            height={40}
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side - Language + CTA */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-muted"
                aria-label={t("languageSelector")}
              >
                <Globe className="h-4 w-4" />
                <span className="font-medium uppercase">{currentLanguage.code}</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-48 rounded-xl shadow-xl border-border">
              {languageOptions.map((language) => (
                <DropdownMenuItem 
                  key={language.code} 
                  onClick={() => i18n.changeLanguage(language.code)}
                  className="py-3 cursor-pointer"
                >
                  <span className="mr-3 text-xs font-bold text-muted-foreground">{language.flag}</span>
                  <span>{language.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            className="lg:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? t("mobileMenuClose") : t("mobileMenuOpen")}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <nav className="lg:hidden bg-white border-t border-border" aria-label="Mobile navigation">
          <div className="px-6 py-6 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-medium text-foreground hover:text-primary hover:bg-muted transition-all py-3 px-4 rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Language Selector */}
            <div className="border-t border-border mt-2 pt-4">
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
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      language.code === currentLanguage.code
                        ? "bg-[#0085b2] text-white"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {language.flag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
