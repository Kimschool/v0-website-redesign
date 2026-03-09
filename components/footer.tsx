"use client"

import Link from "next/link"

export function Footer() {
  return (
    <>
      {/* Footer Catch */}
      <div className="bg-cyan-500 text-white text-center py-6">
        <p className="font-semibold">KCP地球市民日本語学校</p>
      </div>

      {/* Footer Inner */}
      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-12">
          {/* Logo and SNS */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8 pb-8 border-b border-gray-200">
            <div className="flex-shrink-0">
              <Link href="/" className="inline-block">
                <img
                  src="https://weavus-group.com/kcp/wp-content/uploads/2025/12/4-e1764725157523.png"
                  alt="KCP Logo"
                  className="h-12 w-auto"
                />
              </Link>
            </div>

            {/* SNS Links */}
            <div className="flex items-center gap-6">
              <Link
                href="https://www.instagram.com/kcp_yosei/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-500 hover:text-cyan-600 font-semibold text-sm"
              >
                Instagram
              </Link>
              <Link
                href="https://www.facebook.com/kcpchikyushimin/?locale=ja_JP"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-500 hover:text-cyan-600 font-semibold text-sm"
              >
                Facebook
              </Link>
              <Link
                href="/"
                className="text-cyan-500 hover:text-cyan-600 font-semibold text-sm"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Footer Nav Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center mb-8">
            <Link
              href="https://www.kcpyosei.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-700 hover:text-cyan-500 transition-colors"
            >
              KCP日本語教師養成講座
            </Link>
            <Link
              href="https://www.kcpinternational.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-700 hover:text-cyan-500 transition-colors"
            >
              KCP US
            </Link>
            <Link
              href="/"
              className="text-sm text-gray-700 hover:text-cyan-500 transition-colors"
            >
              KCP中国
            </Link>
            <Link
              href="https://www.kcpkorea.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-700 hover:text-cyan-500 transition-colors"
            >
              KCP韓国
            </Link>
            <Link
              href="https://www.kcp.ac.jp/blog/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-700 hover:text-cyan-500 transition-colors"
            >
              校長ブログ
            </Link>
            <Link
              href="/"
              className="text-sm text-gray-700 hover:text-cyan-500 transition-colors"
            >
              情報公開
            </Link>
          </div>
        </div>
      </footer>

      {/* Copyright */}
      <div className="bg-gray-100 py-6 text-center">
        <p className="text-xs text-gray-600">Copyright © 2025</p>
      </div>
    </>
  )
}

