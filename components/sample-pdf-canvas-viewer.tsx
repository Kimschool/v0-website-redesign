"use client"

import { useEffect, useRef, useState } from "react"
import { getDocument, GlobalWorkerOptions, version } from "pdfjs-dist"

GlobalWorkerOptions.workerSrc = `/pdfjs/pdf.worker.min.mjs?v=${version}`

type Props = {
  /** Same-origin PDF URL (e.g. /documents/gakusoku.pdf) */
  pdfUrl: string
}

/**
 * Demo: render each PDF page to a canvas with PDF.js.
 * Slightly harder to "Save as" than opening the PDF in a new tab, but not copy-proof
 * (print, screenshots, DevTools, screen recording still apply).
 */
export function SamplePdfCanvasViewer({ pdfUrl }: Props) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle")
  const [message, setMessage] = useState("")
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let cancelled = false

    async function load() {
      setStatus("loading")
      setMessage("")
      host.innerHTML = ""

      try {
        const task = getDocument({
          url: pdfUrl,
          withCredentials: false,
        })
        const pdf = await task.promise
        if (cancelled) return

        setPageCount(pdf.numPages)

        const cssW = Math.min(host.clientWidth || (typeof window !== "undefined" ? window.innerWidth - 48 : 800), 900)
        const first = await pdf.getPage(1)
        const baseVp = first.getViewport({ scale: 1 })
        const scale = Math.min(1.8, cssW / baseVp.width)

        for (let i = 1; i <= pdf.numPages; i++) {
          if (cancelled) return
          const page = await pdf.getPage(i)
          const viewport = page.getViewport({ scale })

          const canvas = document.createElement("canvas")
          const ctx = canvas.getContext("2d", { alpha: false })
          if (!ctx) continue

          const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1
          canvas.width = Math.floor(viewport.width * dpr)
          canvas.height = Math.floor(viewport.height * dpr)
          canvas.style.width = `${Math.floor(viewport.width)}px`
          canvas.style.height = `${Math.floor(viewport.height)}px`
          canvas.className =
            "mx-auto mb-8 block max-w-full rounded border border-gray-200 bg-white shadow-sm"
          canvas.style.userSelect = "none"
          ;(canvas.style as unknown as { webkitUserSelect: string }).webkitUserSelect = "none"

          canvas.addEventListener("contextmenu", (e) => e.preventDefault())
          canvas.addEventListener("dragstart", (e) => e.preventDefault())

          ctx.scale(dpr, dpr)
          await page.render({ canvasContext: ctx, viewport }).promise
          host.appendChild(canvas)
        }

        if (!cancelled) setStatus("ready")
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
  }, [pdfUrl])

  return (
    <div
      ref={hostRef}
      className="min-h-[200px] rounded-lg border border-dashed border-gray-300 bg-white/80 p-4 select-none"
      onContextMenu={(e) => e.preventDefault()}
      aria-busy={status === "loading"}
    >
      {status === "loading" && (
        <p className="py-12 text-center text-sm text-gray-500">PDF を読み込み、ページを canvas に描画中…</p>
      )}
      {status === "error" && (
        <p className="py-8 text-center text-sm text-red-600">読み込みエラー: {message}</p>
      )}
      {status === "ready" && pageCount > 0 && (
        <p className="mb-4 text-center text-xs text-gray-400">全 {pageCount} ページを canvas 表示</p>
      )}
    </div>
  )
}
