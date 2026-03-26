"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { Building2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { FacilitySlide } from "@/lib/school-life-facility"
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

function useAutoplayReset(api: CarouselApi | undefined) {
  useEffect(() => {
    if (!api) return
    const onSelect = () => {
      const p = api.plugins()?.autoplay
      if (p) p.reset()
    }
    api.on("select", onSelect)
    return () => {
      void api.off("select", onSelect)
    }
  }, [api])
}

type FacilityHeroProps = {
  items: FacilitySlide[]
  title: string
  intro: string
  className?: string
}

/**
 * 施設案内 — 周辺環境ヒーローと同型の大判スライド（自動再生・ドット・矢印）
 */
export function FacilityShowcaseHero({ items, title, intro, className }: FacilityHeroProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  useAutoplayReset(api)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    setCurrent(api.selectedScrollSnap())
    api.on("select", onSelect)
    return () => {
      void api.off("select", onSelect)
    }
  }, [api])

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-50 via-white to-[#0085b2]/[0.06] p-5 shadow-sm sm:p-7 md:p-10",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#0085b2]/10 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto mb-8 max-w-3xl text-center">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#0085b2]/20 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#0085b2]">
          <Building2 className="h-3.5 w-3.5" aria-hidden />
          Facility
        </span>
        <h2 className="font-serif text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">{title}</h2>
        <p className="mt-3 text-sm text-gray-600 md:text-base">{intro}</p>
      </div>

      <Carousel
        opts={{ loop: true, align: "start" }}
        plugins={[Autoplay({ delay: 5500, stopOnInteraction: false, stopOnMouseEnter: true })]}
        setApi={setApi}
        className="relative mx-auto w-full max-w-5xl"
      >
        <CarouselContent className="-ml-0">
          {items.map((item, index) => (
            <CarouselItem key={`${item.image}-${index}`} className="basis-full pl-0">
              <div className="group relative mx-auto overflow-hidden rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] ring-1 ring-black/[0.08]">
                <div className="relative aspect-[21/10] min-h-[280px] w-full max-md:aspect-[4/3] md:min-h-[380px] lg:min-h-[420px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 1024px"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 md:pb-10">
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">
                      Facility spotlight
                    </p>
                    <h3 className="max-w-4xl font-serif text-xl font-bold leading-snug text-white drop-shadow-sm md:text-2xl lg:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/90 md:text-base">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          variant="secondary"
          className="left-2 top-[42%] z-10 h-11 w-11 border-0 bg-white/95 text-[#0085b2] shadow-lg hover:bg-white md:left-0 md:-translate-x-1/2"
        />
        <CarouselNext
          variant="secondary"
          className="right-2 top-[42%] z-10 h-11 w-11 border-0 bg-white/95 text-[#0085b2] shadow-lg hover:bg-white md:right-0 md:translate-x-1/2"
        />
      </Carousel>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === current ? "w-8 bg-[#0085b2]" : "w-2 bg-gray-300 hover:bg-gray-400"
            )}
            aria-label={`スライド ${i + 1}`}
            aria-current={i === current}
            onClick={() => api?.scrollTo(i)}
          />
        ))}
      </div>
    </div>
  )
}
