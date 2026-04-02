"use client"

import dynamic from "next/dynamic"
import type { ImageFlipbookViewerProps } from "@/components/image-flipbook-viewer"

/** react-pageflip is client-only */
export const PdfFlipbookViewerLazy = dynamic<ImageFlipbookViewerProps>(
  () =>
    import("@/components/image-flipbook-viewer").then((m) => m.ImageFlipbookViewer),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[280px] animate-pulse rounded-xl bg-muted/50"
        aria-busy="true"
        aria-label="Flipbook"
      />
    ),
  }
)
