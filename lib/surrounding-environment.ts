/** 学校生活ページ「周辺環境」と同じ写真セット（他ページのショーケースでも再利用） */
export const SURROUNDING_ENVIRONMENT_IMAGES = [
  "/images/original_from_customer/Shinjuku-gyoemmae-station-Exit1-1-scaled.jpg",
  "/images/original_from_customer/rich2s6257899_05-1.jpg",
  "/images/original_from_customer/unnamed.jpg",
  "/images/original_from_customer/NRFaHRT38eoY60XESAAPgjV5AOK9ybxJKDsJO9EW-1.jpg",
  "/images/original_from_customer/Tomihisa_Cross_Comfort_Tower-1-scaled.jpg",
  "/images/original_from_customer/Shinjuku_Gyoen_National_Garden_-_sakura_3.jpg",
] as const

export type SurroundingSlide = { title: string; image: string }

export function getSurroundingSlides(t: (key: string) => string): SurroundingSlide[] {
  return SURROUNDING_ENVIRONMENT_IMAGES.map((image, i) => ({
    image,
    title: t(`schoolLifePage.surroundingItems.${i}.title`),
  }))
}
