"use client"

import dynamic from "next/dynamic"

/** Load pdfjs on the client only; evaluating it during Node SSR can throw (e.g. Promise.withResolvers) */
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
