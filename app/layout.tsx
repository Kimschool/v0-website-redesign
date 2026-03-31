import type { Metadata, Viewport } from 'next'
import { Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google'
import localFont from 'next/font/local'
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

// 中国語（簡体）向け。self-host 폰트로 글리프/굵기 혼재를 고정 제거
// 다운로드: node scripts/download-noto-sc-ttf.mjs
const notoSansSC = localFont({
  src: [
    { path: '../public/fonts/NotoSansSC-300.ttf', weight: '300', style: 'normal' },
    { path: '../public/fonts/NotoSansSC-400.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/NotoSansSC-500.ttf', weight: '500', style: 'normal' },
    { path: '../public/fonts/NotoSansSC-600.ttf', weight: '600', style: 'normal' },
    { path: '../public/fonts/NotoSansSC-700.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-sans-zh',
  display: 'swap',
  fallback: [
    'PingFang SC',
    'Hiragino Sans GB',
    'Microsoft YaHei',
    'Source Han Sans SC',
    'system-ui',
    'sans-serif',
  ],
})

const notoSerifSC = localFont({
  src: [
    { path: '../public/fonts/NotoSerifSC-400.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/NotoSerifSC-500.ttf', weight: '500', style: 'normal' },
    { path: '../public/fonts/NotoSerifSC-600.ttf', weight: '600', style: 'normal' },
    { path: '../public/fonts/NotoSerifSC-700.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-serif-zh',
  display: 'swap',
  fallback: ['Songti SC', 'STSong', 'Noto Serif SC', 'Source Han Serif SC', 'Times New Roman', 'serif'],
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
