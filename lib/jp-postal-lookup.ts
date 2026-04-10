/**
 * 日本の郵便番号 → 住所（1行）
 * ZipCloud 公開 API（https://zipcloud.ibsnet.co.jp/doc/api）を利用。追加 npm 不要。
 * 静的エクスポートでも動作（ブラウザから直接 fetch）。CORS が拒否される環境は稀。
 */

const ZIPCLOUD_SEARCH = "https://zipcloud.ibsnet.co.jp/api/search"

export type ZipCloudResult = {
  address1: string
  address2: string
  address3: string
}

type ZipCloudApiResponse = {
  status: number
  message: string | null
  results: ZipCloudResult[] | null
}

export function normalizeJapanPostalDigits(input: string): string {
  return input.replace(/\D/g, "").slice(0, 7)
}

export function formatJapanPostalCode(digits: string): string {
  const d = normalizeJapanPostalDigits(digits)
  if (d.length <= 3) return d
  return `${d.slice(0, 3)}-${d.slice(3)}`
}

function joinAddressLine(r: ZipCloudResult): string {
  return `${r.address1}${r.address2}${r.address3}`
}

/**
 * 7 桁に正規化でき、かつ API が 1 件以上返すときだけ結果を返す。
 */
export async function lookupJapanAddressByPostalCode(postalCode: string): Promise<{
  addressLine: string
  formattedPostal: string
} | null> {
  const digits = normalizeJapanPostalDigits(postalCode)
  if (digits.length !== 7) return null

  const url = `${ZIPCLOUD_SEARCH}?zipcode=${encodeURIComponent(digits)}`
  const res = await fetch(url)
  if (!res.ok) return null

  const data = (await res.json()) as ZipCloudApiResponse
  if (data.status !== 200 || !data.results?.length) return null

  return {
    addressLine: joinAddressLine(data.results[0]),
    formattedPostal: formatJapanPostalCode(digits),
  }
}
