import type { Metadata, Viewport } from 'next'
import { Noto_Sans_JP, Noto_Sans_SC, Noto_Serif_JP, Noto_Serif_SC } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { I18nProvider } from '@/components/i18n-provider'
import './globals.css'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
})

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
})

// 中国語（簡体）向け。i18n が zh のとき body 上で --font-sans/--font-serif を差し替え
const notoSansSC = Noto_Sans_SC({
  // CJK 글리프가 subsets 필터링으로 누락되면 일부 문자만 다른 폰트로 fallback되어 “깨져 보임”.
  // 따라서 중국어 폰트는 subsets를 지정하지 않아 전체 글리프가 적용되도록 한다.
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans-zh',
  display: 'swap',
  adjustFontFallback: true,
  fallback: [
    'PingFang SC',
    'Hiragino Sans GB',
    'Microsoft YaHei',
    'Source Han Sans SC',
    'system-ui',
    'sans-serif',
  ],
})

const notoSerifSC = Noto_Serif_SC({
  // 위와 동일한 이유로 subsets를 지정하지 않는다.
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif-zh',
  display: 'swap',
  adjustFontFallback: true,
  fallback: [
    'Songti SC',
    'STSong',
    'Noto Serif SC',
    'Source Han Serif SC',
    'Times New Roman',
    'serif',
  ],
})

export const metadata: Metadata = {
  title: 'KCP地球市民日本語学校 | ともにまなび ともに生きる',
  description: '学校法人KCP学園 KCP地球市民日本語学校 - 日本語教育を通じて世界をつなぐ',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0085b2',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} ${notoSerifJP.variable} ${notoSansSC.variable} ${notoSerifSC.variable} font-sans antialiased`}
      >
        <I18nProvider>{children}</I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}
