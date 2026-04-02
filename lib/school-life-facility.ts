const dir = encodeURIComponent("施設案内")

/** Same image paths as School Life “facilities” (order matches facilityItems 0–10) */
export const SCHOOL_LIFE_FACILITY_IMAGES = [
  `${encodeURIComponent("01_校舍全景")}.jpg`,
  `${encodeURIComponent("02_校庭")}.jpg`,
  `${encodeURIComponent("03_駐輪場")}.jpg`,
  `${encodeURIComponent("04_BF1美術室")}.jpg`,
  `${encodeURIComponent("05_1F職員室")}.jpg`,
  `${encodeURIComponent("06_2Fラウンジ")}.jpg`,
  `${encodeURIComponent("07_2F図書室")}.jpg`,
  `${encodeURIComponent("08_教室(明るく調整してください）")}.jpg`,
  `${encodeURIComponent("10_6F講堂")}.jpg`,
  `${encodeURIComponent("11_7F和室")}.jpg`,
  `${encodeURIComponent("12_日本庭園")}.jpg`,
].map((file) => `/images/original_from_customer/${dir}/${file}`) as readonly string[]

export type FacilitySlide = {
  title: string
  caption: string
  image: string
}

export function getFacilitySlides(t: (key: string) => string): FacilitySlide[] {
  return SCHOOL_LIFE_FACILITY_IMAGES.map((image, i) => ({
    image,
    title: t(`schoolLifePage.facilityItems.${i}.title`),
    caption: t(`schoolLifePage.facilityItems.${i}.caption`),
  }))
}
