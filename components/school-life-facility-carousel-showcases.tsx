"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
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

type Props = {
  items: FacilitySlide[]
  className?: string
}

/** 施設案内：中央寄せピーク表示＋自動再生（学校生活ページ） */
export function FacilityCarouselPattern3({ items, className }: Props) {
  const [api, setApi] = useState<CarouselApi>()
  useAutoplayReset(api)

  return (
    <div className={cn("w-full max-w-5xl mx-auto", className)}>
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-3 md:p-4">
        <Carousel
          opts={{ loop: true, align: "center" }}
          plugins={[Autoplay({ delay: 4800, stopOnInteraction: false, stopOnMouseEnter: true })]}
          setApi={setApi}
          className="relative"
        >
          <CarouselContent className="-ml-3 md:-ml-4">
            {items.map((item, index) => (
              <CarouselItem
                key={item.image}
                className="basis-[90%] pl-3 sm:basis-[85%] md:basis-[78%] md:pl-4"
              >
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
                  <div className="relative aspect-[4/3] w-full bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, 70vw"
                      priority={index === 0}
                    />
                  </div>
                  <div className="border-t border-gray-100 px-4 py-3">
                    <h3 className="font-serif text-sm font-bold text-gray-900 md:text-base">{item.title}</h3>
                    <p className="mt-1 line-clamp-2 text-xs text-gray-600 md:text-sm">{item.caption}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 border-gray-200 bg-white shadow-sm md:-left-3" />
          <CarouselNext className="right-0 border-gray-200 bg-white shadow-sm md:-right-3" />
        </Carousel>
      </div>
    </div>
  )
}
