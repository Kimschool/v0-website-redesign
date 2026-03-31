"use client"

import dynamic from "next/dynamic"
import type { SamplePdfFlipbookViewerProps } from "@/components/sample-pdf-flipbook-viewer"

/** react-pageflip / pdfjs はクライアントのみ */
export const PdfFlipbookViewerLazy = dynamic<SamplePdfFlipbookViewerProps>(
  () =>
    import("@/components/sample-pdf-flipbook-viewer").then(
      (m) => m.SamplePdfFlipbookViewer
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[280px] animate-pulse rounded-xl bg-muted/50"
        aria-busy="true"
        aria-label="PDF flipbook"
      />
    ),
  }
)
