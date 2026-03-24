"use client"

import dynamic from "next/dynamic"

/** pdfjs が Node SSR で評価されると Promise.withResolvers 等で失敗するため、クライアントのみ読み込む */
export const PdfCanvasViewerLazy = dynamic(
  () =>
    import("@/components/sample-pdf-canvas-viewer").then((m) => m.SamplePdfCanvasViewer),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[240px] animate-pulse rounded-md bg-muted/50"
        aria-busy="true"
        aria-label="PDF"
      />
    ),
  }
)
