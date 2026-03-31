"use client"

import { forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import HTMLFlipBook from "react-pageflip"
import { Maximize2, Minimize2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"

type Manifest = {
  /** 例: ["0001.webp", "0002.webp"] or ["https://.../0001.webp", ...] */
  pages: string[]
  /** 任意: 既知なら UI に表示（未指定でも動作） */
  title?: string
}

function getFullscreenElement(): Element | null {
  if (typeof document === "undefined") return null
  const doc = document as Document & { webkitFullscreenElement?: Element | null }
  return document.fullscreenElement ?? doc.webkitFullscreenElement ?? null
}

async function enterFullscreen(el: HTMLElement): Promise<void> {
  const anyEl = el as HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void> | void
  }
  if (typeof anyEl.requestFullscreen === "function") {
    await anyEl.requestFullscreen()
  } else if (typeof anyEl.webkitRequestFullscreen === "function") {
    await Promise.resolve(anyEl.webkitRequestFullscreen.call(anyEl))
  }
}

async function exitFullscreenDoc(): Promise<void> {
  const doc = document as Document & {
    webkitExitFullscreen?: () => Promise<void> | void
  }
  if (typeof document.exitFullscreen === "function") {
    await document.exitFullscreen()
  } else if (typeof doc.webkitExitFullscreen === "function") {
    await Promise.resolve(doc.webkitExitFullscreen.call(document))
  }
}

export type ImageFlipbookViewerProps = {
  /** manifest.json の URL。サーバー配置想定（例: https://.../ja/manifest.json） */
  manifestUrl: string
  /** ページの論理幅（CSS px）。デフォルト 440 */
  pageCssWidth?: number
  /** 下部の操作ヒント（デフォルト true） */
  showFooterHint?: boolean
  /** 全画面ボタン（デフォルト true） */
  showFullscreenButton?: boolean
  /**
   * manifest 内が相対パスの場合の base URL。
   * 例: manifestUrl が .../manifest.json なら、通常は同階層を自動採用するので未指定でOK。
   */
  manifestBaseUrlOverride?: string
}

const DEFAULT_PAGE_CSS_WIDTH = 440

const FlipPage = forwardRef<HTMLDivElement, { src: string; alt: string }>(
  function FlipPage({ src, alt }, ref) {
    return (
      <div
        ref={ref}
        className="h-full w-full overflow-hidden bg-neutral-900 shadow-inner"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- flipbook は外部 CDN の静的画像を使う */}
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-contain bg-white"
          draggable={false}
          loading="lazy"
        />
      </div>
    )
  }
)

function isAbsoluteUrl(s: string) {
  return /^https?:\/\//i.test(s)
}

export function ImageFlipbookViewer({
  manifestUrl,
  pageCssWidth: pageCssWidthProp,
  showFooterHint = true,
  showFullscreenButton = true,
  manifestBaseUrlOverride,
}: ImageFlipbookViewerProps) {
  const { t } = useTranslation()
  const pageCssWidth = pageCssWidthProp ?? DEFAULT_PAGE_CSS_WIDTH
  const bookHeight = Math.round(pageCssWidth * 1.414)

  const bookRef = useRef<{ pageFlip: () => any } | null>(null)
  const fullscreenRootRef = useRef<HTMLDivElement | null>(null)
  const bookStageRef = useRef<HTMLDivElement | null>(null)

  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fullscreenScale, setFullscreenScale] = useState(1)
  const [usePortraitLayout, setUsePortraitLayout] = useState(false)
  const [isFullscreenSupported, setIsFullscreenSupported] = useState(true)

  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle"
  )
  const [message, setMessage] = useState("")
  const [pages, setPages] = useState<string[]>([])
  const [livePage, setLivePage] = useState(0)

  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(max-width: 640px)")
    const syncPortrait = () => setUsePortraitLayout(mq.matches)
    syncPortrait()
    mq.addEventListener("change", syncPortrait)
    return () => mq.removeEventListener("change", syncPortrait)
  }, [])

  useEffect(() => {
    if (typeof document === "undefined") return
    const doc = document as Document & { webkitFullscreenEnabled?: boolean }
    const enabled =
      typeof document.fullscreenEnabled === "boolean"
        ? document.fullscreenEnabled
        : typeof doc.webkitFullscreenEnabled === "boolean"
          ? doc.webkitFullscreenEnabled
          : false
    setIsFullscreenSupported(enabled)
  }, [])

  useEffect(() => {
    const sync = () => {
      const root = fullscreenRootRef.current
      setIsFullscreen(!!(root && getFullscreenElement() === root))
    }
    document.addEventListener("fullscreenchange", sync)
    document.addEventListener(
      "webkitfullscreenchange",
      sync as (this: Document, ev: Event) => void
    )
    return () => {
      document.removeEventListener("fullscreenchange", sync)
      document.removeEventListener(
        "webkitfullscreenchange",
        sync as (this: Document, ev: Event) => void
      )
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function load() {
      setStatus("loading")
      setMessage("")
      setPages([])

      try {
        const res = await fetch(manifestUrl, { cache: "force-cache" })
        if (!res.ok) throw new Error(`manifest ${res.status}`)
        const json = (await res.json()) as Manifest
        if (!json?.pages || !Array.isArray(json.pages) || json.pages.length === 0) {
          throw new Error("manifest.pages is empty")
        }

        const base =
          manifestBaseUrlOverride ??
          new URL("./", manifestUrl).toString().replace(/\/$/, "")

        const resolved = json.pages.map((p) => {
          if (isAbsoluteUrl(p)) return p
          const clean = p.replace(/^\.?\//, "")
          return `${base}/${clean}`
        })

        if (!cancelled) {
          setPages(resolved)
          setStatus("ready")
        }
      } catch (e) {
        if (!cancelled) {
          setStatus("error")
          setMessage(e instanceof Error ? e.message : String(e))
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [manifestUrl, manifestBaseUrlOverride])

  const flipNext = useCallback(() => {
    bookRef.current?.pageFlip()?.flipNext?.()
  }, [])

  const flipPrev = useCallback(() => {
    bookRef.current?.pageFlip()?.flipPrev?.()
  }, [])

  const toggleFullscreen = useCallback(async () => {
    const el = fullscreenRootRef.current
    if (!el) return
    try {
      if (getFullscreenElement() === el) {
        await exitFullscreenDoc()
      } else {
        await enterFullscreen(el)
      }
    } catch {
      // ignore
    }
  }, [])

  const recomputeFullscreenScale = useCallback(() => {
    const stage = bookStageRef.current
    if (!isFullscreen || !stage) return

    const pad = 16
    const sr = stage.getBoundingClientRect()
    const availW = Math.max(100, sr.width - pad * 2)
    const availH = Math.max(100, sr.height - pad * 2)

    const layoutFudge = 1.2
    const logicalSpreadW = usePortraitLayout ? pageCssWidth : pageCssWidth * 2
    const targetW = logicalSpreadW * layoutFudge
    const targetH = bookHeight * layoutFudge

    /**
     * 모바일(1페이지)에서는 "가로 꽉 차게"를 우선하고,
     * 세로는 넘치면 스크롤로 보이게 한다(너무 작아지지 않게).
     */
    const raw = usePortraitLayout
      ? availW / targetW
      : Math.min(availW / targetW, availH / targetH)
    const s = Math.max(0.6, Math.min(raw * 0.98, 3))
    setFullscreenScale(2.5)
  }, [isFullscreen, usePortraitLayout, pageCssWidth, bookHeight])

  useLayoutEffect(() => {
    if (!isFullscreen) {
      setFullscreenScale(1)
      return
    }

    const run = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(recomputeFullscreenScale)
      })
    }

    run()
    const stage = bookStageRef.current
    if (!stage) return

    const ro = new ResizeObserver(() => run())
    ro.observe(stage)

    window.addEventListener("resize", run)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", run)
    }
  }, [isFullscreen, recomputeFullscreenScale, usePortraitLayout, pages.length, status])

  if (status === "loading") {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white/90 px-6 py-16 text-center text-sm text-gray-600">
        <p>{t("admissionPage.pamphletFlipbookLoading")}</p>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center text-sm text-red-800">
        {t("admissionPage.pamphletFlipbookError")}: {message}
      </div>
    )
  }

  if (status !== "ready" || pages.length === 0) return null

  return (
    <div
      ref={fullscreenRootRef}
      className={cn(
        isFullscreen
          ? "box-border flex min-h-[100dvh] max-h-[100dvh] flex-col gap-3 overflow-hidden bg-neutral-950 p-2 sm:p-4"
          : "space-y-4"
      )}
    >
      <div
        className={cn(
          "flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-3",
          isFullscreen
            ? "shrink-0 border-neutral-600 bg-neutral-900 text-white"
            : "border-gray-200 bg-white"
        )}
      >
        <p
          className={cn(
            "text-sm font-medium",
            isFullscreen ? "text-neutral-100" : "text-gray-800"
          )}
        >
          {t("admissionPage.pamphletFlipbookPageLabel", {
            current: Math.min(livePage + 1, pages.length),
            total: pages.length,
          })}
        </p>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={flipPrev}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm font-semibold transition-colors",
              isFullscreen
                ? "border-neutral-500 bg-neutral-800 text-white hover:bg-neutral-700"
                : "border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
            )}
          >
            {t("admissionPage.pamphletFlipbookPrev")}
          </button>
          <button
            type="button"
            onClick={flipNext}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm font-semibold transition-colors",
              isFullscreen
                ? "border-neutral-500 bg-neutral-800 text-white hover:bg-neutral-700"
                : "border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
            )}
          >
            {t("admissionPage.pamphletFlipbookNext")}
          </button>

          {showFullscreenButton && isFullscreenSupported && !usePortraitLayout ? (
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-pressed={isFullscreen}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-semibold transition-colors",
                isFullscreen
                  ? "border-emerald-600/80 bg-emerald-700 text-white hover:bg-emerald-600"
                  : "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700"
              )}
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4 shrink-0" aria-hidden />
              ) : (
                <Maximize2 className="h-4 w-4 shrink-0" aria-hidden />
              )}
              {isFullscreen
                ? t("admissionPage.pamphletFlipbookExitFullscreen")
                : t("admissionPage.pamphletFlipbookFullscreen")}
            </button>
          ) : null}
        </div>
      </div>

      <div
        ref={bookStageRef}
        className={cn(
          "rounded-xl border border-gray-200 bg-neutral-800 py-8 px-4",
          isFullscreen
            ? cn(
                "flex min-h-0 min-w-0 flex-1 items-center justify-center border-neutral-700 bg-neutral-900 py-3 sm:py-4",
                usePortraitLayout ? "overflow-y-auto overflow-x-hidden" : "overflow-hidden"
              )
            : "overflow-x-auto"
        )}
      >
        <div
          className="inline-block align-middle"
          style={{
            transform: isFullscreen ? `scale(${fullscreenScale})` : undefined,
            transformOrigin: "center center",
          }}
        >
          <HTMLFlipBook
            key={usePortraitLayout ? "flip-portrait" : "flip-spread"}
            ref={bookRef}
            width={pageCssWidth}
            height={bookHeight}
            size="stretch"
            minWidth={300}
            maxWidth={1200}
            minHeight={360}
            maxHeight={1500}
            drawShadow={true}
            flippingTime={650}
            usePortrait={usePortraitLayout}
            startZIndex={0}
            autoSize={true}
            maxShadowOpacity={0.4}
            showCover={true}
            mobileScrollSupport={true}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
            startPage={0}
            className="mx-auto"
            style={{}}
            onFlip={(e: { data?: number }) => {
              if (typeof e?.data === "number") setLivePage(e.data)
              if (isFullscreen) {
                requestAnimationFrame(() => {
                  requestAnimationFrame(recomputeFullscreenScale)
                })
              }
            }}
          >
            {pages.map((src, i) => (
              <FlipPage
                key={`p-${i}`}
                src={src}
                alt={`Flipbook page ${i + 1}`}
              />
            ))}
          </HTMLFlipBook>
        </div>
      </div>

      {showFooterHint ? (
        <p
          className={cn(
            "text-center text-xs",
            isFullscreen ? "shrink-0 text-neutral-400" : "text-gray-500"
          )}
        >
          {t("admissionPage.pamphletFlipbookHint")}
        </p>
      ) : null}
    </div>
  )
}

