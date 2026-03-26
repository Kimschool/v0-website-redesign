"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SurroundingSlide } from "@/lib/surrounding-environment"
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

type BaseProps = {
  slides: SurroundingSlide[]
  title: string
  className?: string
}

/**
 * Pattern 1 — 1枚を大きく：シネマティックな一枚絵＋ドット＋強めのシャドウ（デモ: /sample/surrounding-patterns/pattern-1）
 */
export function SurroundingShowcaseHero({ slides, title, className }: BaseProps) {
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
          <MapPin className="h-3.5 w-3.5" aria-hidden />
          Area
        </span>
        <h2 className="font-serif text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">{title}</h2>
        <p className="mt-3 text-sm text-gray-600 md:text-base">
          学校の周辺スポットを大きく表示しています。左右の矢印または下のドットで切り替えできます。
        </p>
      </div>

      <Carousel
        opts={{ loop: true, align: "start" }}
        plugins={[Autoplay({ delay: 5500, stopOnInteraction: false, stopOnMouseEnter: true })]}
        setApi={setApi}
        className="relative mx-auto w-full max-w-5xl"
      >
        <CarouselContent className="-ml-0">
          {slides.map((item, index) => (
            <CarouselItem key={index} className="basis-full pl-0">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 md:pb-10">
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">
                      Location spotlight
                    </p>
                    <h3 className="max-w-4xl font-serif text-xl font-bold leading-snug text-white drop-shadow-sm md:text-2xl lg:text-3xl">
                      {item.title}
                    </h3>
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
        {slides.map((_, i) => (
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

/**
 * Pattern 2 — フィルムストリップ風：次のスライドが少し覗く＋ダークレール（デモ: /sample/surrounding-patterns/pattern-2）
 */
export function SurroundingShowcaseReel({ slides, title, className }: BaseProps) {
  const [api, setApi] = useState<CarouselApi>()
  useAutoplayReset(api)

  return (
    <section
      className={cn(
        "border-y border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 py-16 text-white md:py-20",
        className
      )}
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-10 flex flex-col gap-2 text-center md:text-left">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#5ec8e8]">Tokyo reel</span>
          <h2 className="font-serif text-2xl font-bold md:text-3xl">{title}</h2>
          <p className="text-sm text-slate-400 md:max-w-xl">
            カルーセルを横に送ると、次の一枚がわずかに見える「フィルム」レイアウトです。
          </p>
        </div>

        <div className="relative rounded-2xl bg-black/40 p-3 ring-1 ring-white/10 md:p-5">
          <Carousel
            opts={{ loop: true, align: "center", skipSnaps: false }}
            plugins={[Autoplay({ delay: 4800, stopOnInteraction: false, stopOnMouseEnter: true })]}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="-ml-3 md:-ml-4">
              {slides.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="basis-[88%] pl-3 sm:basis-[82%] md:basis-[68%] md:pl-4 lg:basis-[62%]"
                >
                  <div className="relative overflow-hidden rounded-xl shadow-2xl ring-2 ring-white/15">
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 88vw, 65vw"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-12">
                        <h3 className="text-sm font-semibold leading-snug text-white md:text-base">{item.title}</h3>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1 border-white/20 bg-white/10 text-white hover:bg-white/20 md:-left-2" />
            <CarouselNext className="right-1 border-white/20 bg-white/10 text-white hover:bg-white/20 md:-right-2" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}

/**
 * Pattern 3 — エディトリアル：大きなメイン＋サムネイル列（デモ: /sample/surrounding-patterns/pattern-3）
 */
export function SurroundingShowcaseEditorial({ slides, title, className }: BaseProps) {
  const [active, setActive] = useState(0)
  const main = slides[active]

  return (
    <section className={cn("bg-stone-50 py-16 md:py-20", className)}>
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-2xl font-bold text-gray-900 md:text-3xl">{title}</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-gray-600">
            サムネイルを選ぶと、メイン表示が切り替わるレイアウトです。
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,200px)] lg:gap-8 lg:items-start">
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-stone-200/80">
            <div className="relative aspect-[16/10] min-h-[240px] w-full md:aspect-[21/11] md:min-h-[320px]">
              {main ? (
                <Image
                  key={main.image}
                  src={main.image}
                  alt={main.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  priority
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                <h3 className="font-serif text-lg font-bold text-white md:text-xl lg:text-2xl">{main?.title}</h3>
              </div>
            </div>
          </div>

          <ul className="flex flex-row gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {slides.map((item, i) => (
              <li key={item.image} className="shrink-0 lg:w-full">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex w-[104px] flex-col gap-1 rounded-xl border-2 bg-white p-1 text-left transition-all lg:w-full lg:flex-row lg:items-center lg:gap-3 lg:p-2",
                    i === active
                      ? "border-[#0085b2] shadow-md ring-2 ring-[#0085b2]/20"
                      : "border-transparent opacity-80 hover:border-stone-200 hover:opacity-100"
                  )}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg lg:h-16 lg:w-20 lg:shrink-0">
                    <Image src={item.image} alt="" fill className="object-cover" sizes="120px" />
                  </div>
                  <span className="line-clamp-2 px-0.5 text-[10px] font-medium leading-tight text-gray-800 lg:text-xs">
                    {item.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
