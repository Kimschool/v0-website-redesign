"use client"

import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import HTMLFlipBook from "react-pageflip"
import { Maximize2, Minimize2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { getDocument, GlobalWorkerOptions, version } from "pdfjs-dist"
import { cn } from "@/lib/utils"

GlobalWorkerOptions.workerSrc = `/pdfjs/pdf.worker.min.mjs?v=${version}`

/** Logical page width in CSS px; very large values slow first paint */
const DEFAULT_PAGE_CSS_WIDTH = 440

/**
 * Keep on-screen size at pageCssWidth but rasterize PDF pages at this supersample factor.
 * Reduces blur after fullscreen scale (~3x) at the cost of memory and first-render time.
 */
const PDF_RASTER_SUPERSAMPLE_DESKTOP = 3
const PDF_RASTER_SUPERSAMPLE_MOBILE = 1.85
const PDF_CANVAS_DPR_CAP = 2.5
const PDF_JPEG_QUALITY = 0.94

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

export type SamplePdfFlipbookViewerProps = {
  pdfUrl: string
  /** Narrow layouts (e.g. modal); default 440 */
  pageCssWidth?: number
  /** Footer usage hint; default true */
  showFooterHint?: boolean
  /** Fullscreen toggle; default true */
  showFullscreenButton?: boolean
}

type FlipBookApi = {
  pageFlip: () =>
    | {
        flipNext: () => void
        flipPrev: () => void
        getCurrentPageIndex: () => number
      }
    | undefined
}

const FlipPage = forwardRef<
  HTMLDivElement,
  { src: string; alt: string }
>(function FlipPage({ src, alt }, ref) {
  return (
    <div
      ref={ref}
      className="h-full w-full overflow-hidden bg-neutral-900 shadow-inner"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- page images are data URLs from canvas */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-contain bg-white"
        draggable={false}
      />
    </div>
  )
})

export function SamplePdfFlipbookViewer({
  pdfUrl,
  pageCssWidth: pageCssWidthProp,
  showFooterHint = true,
  showFullscreenButton = true,
}: SamplePdfFlipbookViewerProps) {
  const { t } = useTranslation()
  const pageCssWidth = pageCssWidthProp ?? DEFAULT_PAGE_CSS_WIDTH
  const bookHeight = Math.round(pageCssWidth * 1.414)
  const bookRef = useRef<FlipBookApi | null>(null)
  const fullscreenRootRef = useRef<HTMLDivElement | null>(null)
  const bookStageRef = useRef<HTMLDivElement | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fullscreenScale, setFullscreenScale] = useState(1)
  /** Single portrait page on small screens; two-page spread otherwise */
  const [usePortraitLayout, setUsePortraitLayout] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle"
  )
  const [message, setMessage] = useState("")
  const [pageUrls, setPageUrls] = useState<string[]>([])
  const [renderProgress, setRenderProgress] = useState({ done: 0, total: 0 })
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
      setPageUrls([])
      setRenderProgress({ done: 0, total: 0 })

      try {
        const task = getDocument({
          url: pdfUrl,
          withCredentials: false,
        })
        const pdf = await task.promise
        if (cancelled) return

        const total = pdf.numPages
        setRenderProgress({ done: 0, total })

        const isNarrow =
          typeof window !== "undefined" &&
          window.matchMedia("(max-width: 640px)").matches
        const supersample = isNarrow
          ? PDF_RASTER_SUPERSAMPLE_MOBILE
          : PDF_RASTER_SUPERSAMPLE_DESKTOP
        const dpr =
          typeof window !== "undefined"
            ? Math.min(window.devicePixelRatio || 1, PDF_CANVAS_DPR_CAP)
            : 1

        const urls: string[] = []

        for (let i = 1; i <= total; i++) {
          if (cancelled) return
          const page = await pdf.getPage(i)
          const baseVp = page.getViewport({ scale: 1 })
          const rasterCssW = pageCssWidth * supersample
          const scale = rasterCssW / baseVp.width
          const viewport = page.getViewport({ scale })

          const canvas = document.createElement("canvas")
          const ctx = canvas.getContext("2d", { alpha: false })
          if (!ctx) continue

          ctx.imageSmoothingEnabled = true
          ctx.imageSmoothingQuality = "high"

          canvas.width = Math.floor(viewport.width * dpr)
          canvas.height = Math.floor(viewport.height * dpr)
          ctx.scale(dpr, dpr)

          await page.render({ canvasContext: ctx, viewport }).promise
          urls.push(canvas.toDataURL("image/jpeg", PDF_JPEG_QUALITY))

          setRenderProgress({ done: i, total })
        }

        if (!cancelled) {
          setPageUrls(urls)
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
  }, [pdfUrl, pageCssWidth])

  const flipNext = useCallback(() => {
    bookRef.current?.pageFlip()?.flipNext()
  }, [])

  const flipPrev = useCallback(() => {
    bookRef.current?.pageFlip()?.flipPrev()
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
      // e.g. browser denied fullscreen
    }
  }, [])

  /** Approximate spread width when DOM metrics are missing or unreliable */
  const recomputeFullscreenScale = useCallback(() => {
    const stage = bookStageRef.current
    if (!isFullscreen || !stage) return

    const pad = 16
    const sr = stage.getBoundingClientRect()
    let availW = Math.max(100, sr.width - pad * 2)
    let availH = Math.max(100, sr.height - pad * 2)
    if (typeof window !== "undefined") {
      if (availH < 160) availH = Math.max(availH, window.innerHeight * 0.7)
      if (availW < 160) availW = Math.max(availW, window.innerWidth * 0.9)
    }

    const layoutFudge = 1.22
    const logicalSpreadW = usePortraitLayout
      ? pageCssWidth
      : pageCssWidth * 2
    const targetW = logicalSpreadW * layoutFudge
    const targetH = bookHeight * layoutFudge

    const raw = Math.min(availW / targetW, availH / targetH)
    const s = Math.max(0.55, Math.min(raw * 0.98, 3))
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
  }, [isFullscreen, recomputeFullscreenScale, status, pageUrls.length])

  if (status === "loading") {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white/90 px-6 py-16 text-center text-sm text-gray-600">
        {renderProgress.total > 0 ? (
          <p>
            {t("admissionPage.pamphletFlipbookRendering", {
              done: renderProgress.done,
              total: renderProgress.total,
            })}
          </p>
        ) : (
          <p>{t("admissionPage.pamphletFlipbookLoading")}</p>
        )}
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

  if (status !== "ready" || pageUrls.length === 0) {
    return null
  }

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
            current: livePage + 1,
            total: pageUrls.length,
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
          {showFullscreenButton ? (
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
            ? "flex min-h-0 min-w-0 flex-1 items-center justify-center overflow-hidden border-neutral-700 bg-neutral-900 py-3 sm:py-4"
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
              showCover={false}
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
              onUpdate={() => {
                if (isFullscreen) {
                  requestAnimationFrame(recomputeFullscreenScale)
                }
              }}
            >
              {pageUrls.map((src, i) => (
                <FlipPage
                  key={`p-${i}`}
                  src={src}
                  alt={`PDF ページ ${i + 1}`}
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
