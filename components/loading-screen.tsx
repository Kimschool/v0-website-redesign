"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { useTranslation } from "react-i18next"

type Phase = "typing1a" | "typing1b" | "typing2" | "page2" | "fadeout"

// ===== 여기서 패턴을 선택하세요 =====
// "pattern1" - 원형 웨이브 애니메이션 (물결처럼 퍼지는 원들)
// "pattern2" - 스플릿 슬라이드 (화면이 좌우로 갈라지며 로고 등장)
// "pattern3" - 모자이크 그리드 (그리드가 순차적으로 나타났다 사라짐)
const LOADING_PATTERN: "pattern1" | "pattern2" | "pattern3" = "pattern1"
// ===================================

const CHAR_INTERVAL = 150

// Pattern 1: 원형 웨이브 애니메이션
function Pattern1({ phase, imageVisible }: { phase: Phase; imageVisible: boolean }) {
  const { t } = useTranslation()
  const LINE1_A = t("loading.line1a")
  const LINE1_B = t("loading.line1b")
  const LINE2 = t("loading.line2")
  const [typed1a, setTyped1a] = useState("")
  const [typed1b, setTyped1b] = useState("")
  const [typed2, setTyped2] = useState("")
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (phase === "typing1a") {
      let i = 0
      intervalRef.current = setInterval(() => {
        i++
        setTyped1a(LINE1_A.slice(0, i))
        if (i >= LINE1_A.length) {
          clearInterval(intervalRef.current!)
        }
      }, CHAR_INTERVAL)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [LINE1_A, phase])

  useEffect(() => {
    if (phase === "typing1b") {
      let j = 0
      intervalRef.current = setInterval(() => {
        j++
        setTyped1b(LINE1_B.slice(0, j))
        if (j >= LINE1_B.length) {
          clearInterval(intervalRef.current!)
        }
      }, CHAR_INTERVAL)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [LINE1_B, phase])

  useEffect(() => {
    if (phase === "typing2") {
      let k = 0
      intervalRef.current = setInterval(() => {
        k++
        setTyped2(LINE2.slice(0, k))
        if (k >= LINE2.length) {
          clearInterval(intervalRef.current!)
        }
      }, CHAR_INTERVAL)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [LINE2, phase])

  const isPage1 = phase === "typing1a" || phase === "typing1b" || phase === "typing2"

  return (
    <>
      {/* Page 2: 원형 웨이브와 로고 */}
      <div className="absolute inset-0 bg-[#0085b2] flex items-center justify-center z-0 overflow-hidden">
        {/* 웨이브 원들 */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border-2 border-white/20"
              style={{
                width: `${150 + i * 120}px`,
                height: `${150 + i * 120}px`,
                opacity: imageVisible ? 1 : 0,
                transform: imageVisible ? "scale(1)" : "scale(0.5)",
                transition: `all 800ms ease-out ${i * 150}ms`,
              }}
            />
          ))}
        </div>
        {/* 로고 */}
        <div
          className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] z-10"
          style={{
            opacity: imageVisible ? 1 : 0,
            transform: imageVisible ? "scale(1)" : "scale(0.8)",
            transition: "all 700ms ease-out 300ms",
          }}
        >
          <Image
            src="/images/original_from_customer/6%E4%BF%AE%E6%AD%A3.png"
            alt="KCP Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Page 1: 타이핑 애니메이션 + 물결 배경 */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-white flex items-center justify-center z-10 overflow-hidden"
        style={{
          opacity: isPage1 ? 1 : 0,
          transition: "opacity 500ms ease-in-out",
          pointerEvents: isPage1 ? "auto" : "none",
        }}
      >
        {/* 움직이는 배경 원들 */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#0085b2]/5 rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#0085b2]/5 rounded-full animate-pulse delay-300" />
        </div>

        <div className="text-center px-6 relative z-10 font-serif">          <div className="text-3xl md:text-5xl font-bold text-[#0085b2] tracking-wider mb-4 min-h-[2.6em]">
            <p className="inline-flex items-center justify-center min-h-[1.2em]">
              <span>{typed1a}</span>
              {phase === "typing1a" && (
                <span className="animate-blink-fast ml-0.5 inline-block w-[3px] h-[1em] bg-[#0085b2] align-middle" />
              )}
            </p>
            {(phase === "typing1b" || phase === "typing2" || phase === "page2" || phase === "fadeout") && (
              <p className="inline-flex items-center justify-center min-h-[1.2em]">
                <span>{typed1b}</span>
                {phase === "typing1b" && (
                  <span className="animate-blink-fast ml-0.5 inline-block w-[3px] h-[1em] bg-[#0085b2] align-middle" />
                )}
              </p>
            )}
          </div>
          <p className="text-3xl md:text-5xl font-bold text-[#0085b2] tracking-wider inline-flex items-center justify-center min-h-[1.2em]">
            <span>{typed2}</span>
            {phase === "typing2" && (
              <span className="animate-blink-fast ml-0.5 inline-block w-[3px] h-[1em] bg-[#0085b2] align-middle" />
            )}
          </p>
        </div>
      </div>
    </>
  )
}

// Pattern 2: 스플릿 슬라이드 애니메이션
function Pattern2({ phase, imageVisible }: { phase: Phase; imageVisible: boolean }) {
  const { t } = useTranslation()
  const LINE1_A = t("loading.line1a")
  const LINE1_B = t("loading.line1b")
  const LINE2 = t("loading.line2")
  const [typed1a, setTyped1a] = useState("")
  const [typed1b, setTyped1b] = useState("")
  const [typed2, setTyped2] = useState("")
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (phase === "typing1a") {
      let i = 0
      intervalRef.current = setInterval(() => {
        i++
        setTyped1a(LINE1_A.slice(0, i))
        if (i >= LINE1_A.length) clearInterval(intervalRef.current!)
      }, CHAR_INTERVAL)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [LINE1_A, phase])

  useEffect(() => {
    if (phase === "typing1b") {
      let j = 0
      intervalRef.current = setInterval(() => {
        j++
        setTyped1b(LINE1_B.slice(0, j))
        if (j >= LINE1_B.length) clearInterval(intervalRef.current!)
      }, CHAR_INTERVAL)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [LINE1_B, phase])

  useEffect(() => {
    if (phase === "typing2") {
      let k = 0
      intervalRef.current = setInterval(() => {
        k++
        setTyped2(LINE2.slice(0, k))
        if (k >= LINE2.length) clearInterval(intervalRef.current!)
      }, CHAR_INTERVAL)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [LINE2, phase])

  const isPage1 = phase === "typing1a" || phase === "typing1b" || phase === "typing2"

  return (
    <>
      {/* Page 2: 로고와 선 장식 */}
      <div className="absolute inset-0 bg-[#0085b2] flex items-center justify-center z-0 overflow-hidden">
        {/* 수평 라인 장식 */}
        <div
          className="absolute left-0 right-0 h-[1px] bg-white/30"
          style={{
            top: "30%",
            transform: imageVisible ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 800ms ease-out",
          }}
        />
        <div
          className="absolute left-0 right-0 h-[1px] bg-white/30"
          style={{
            top: "70%",
            transform: imageVisible ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 800ms ease-out 200ms",
          }}
        />
        {/* 로고 */}
        <div
          className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] z-10"
          style={{
            opacity: imageVisible ? 1 : 0,
            transform: imageVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 700ms ease-out 400ms",
          }}
        >
          <Image
            src="/images/original_from_customer/6%E4%BF%AE%E6%AD%A3.png"
            alt="KCP Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Page 1: 스플릿 슬라이드 */}
      <div
        className="absolute inset-0 z-10 overflow-hidden"
        style={{
          pointerEvents: isPage1 ? "auto" : "none",
        }}
      >
        {/* 왼쪽 패널 */}
        <div
          className="absolute top-0 left-0 w-1/2 h-full bg-white"
          style={{
            transform: isPage1 ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 600ms cubic-bezier(.83,0,.17,1)",
          }}
        />
        {/* 오른쪽 패널 */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full bg-white"
          style={{
            transform: isPage1 ? "translateX(0)" : "translateX(100%)",
            transition: "transform 600ms cubic-bezier(.83,0,.17,1)",
          }}
        />
        {/* 텍스트 */}
        <div
          className="absolute inset-0 flex items-center justify-center z-20"
          style={{
            opacity: isPage1 ? 1 : 0,
            transition: "opacity 300ms ease-out",
          }}
        >
          <div className="text-center px-6 font-sans">
            <div className="text-3xl md:text-5xl font-bold text-[#0085b2] tracking-wider mb-4 min-h-[2.6em]">
              <p className="inline-flex items-center justify-center min-h-[1.2em]">
                <span>{typed1a}</span>
                {phase === "typing1a" && (
                  <span className="animate-blink-fast ml-0.5 inline-block w-[3px] h-[1em] bg-[#0085b2] align-middle" />
                )}
              </p>
              {(phase === "typing1b" || phase === "typing2" || phase === "page2" || phase === "fadeout") && (
                <p className="inline-flex items-center justify-center min-h-[1.2em]">
                  <span>{typed1b}</span>
                  {phase === "typing1b" && (
                    <span className="animate-blink-fast ml-0.5 inline-block w-[3px] h-[1em] bg-[#0085b2] align-middle" />
                  )}
                </p>
              )}
            </div>
            <p className="text-3xl md:text-5xl font-bold text-[#0085b2] tracking-wider inline-flex items-center justify-center min-h-[1.2em]">
              <span>{typed2}</span>
              {phase === "typing2" && (
                <span className="animate-blink-fast ml-0.5 inline-block w-[3px] h-[1em] bg-[#0085b2] align-middle" />
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

// Pattern 3: 모자이크 그리드 애니메이션
function Pattern3({ phase, imageVisible }: { phase: Phase; imageVisible: boolean }) {
  const { t } = useTranslation()
  const LINE1_A = t("loading.line1a")
  const LINE1_B = t("loading.line1b")
  const LINE2 = t("loading.line2")
  const [typed1a, setTyped1a] = useState("")
  const [typed1b, setTyped1b] = useState("")
  const [typed2, setTyped2] = useState("")
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (phase === "typing1a") {
      let i = 0
      intervalRef.current = setInterval(() => {
        i++
        setTyped1a(LINE1_A.slice(0, i))
        if (i >= LINE1_A.length) clearInterval(intervalRef.current!)
      }, CHAR_INTERVAL)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [LINE1_A, phase])

  useEffect(() => {
    if (phase === "typing1b") {
      let j = 0
      intervalRef.current = setInterval(() => {
        j++
        setTyped1b(LINE1_B.slice(0, j))
        if (j >= LINE1_B.length) clearInterval(intervalRef.current!)
      }, CHAR_INTERVAL)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [LINE1_B, phase])

  useEffect(() => {
    if (phase === "typing2") {
      let k = 0
      intervalRef.current = setInterval(() => {
        k++
        setTyped2(LINE2.slice(0, k))
        if (k >= LINE2.length) clearInterval(intervalRef.current!)
      }, CHAR_INTERVAL)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [LINE2, phase])

  const isPage1 = phase === "typing1a" || phase === "typing1b" || phase === "typing2"

  // 그리드 타일 생성 (4x4 = 16개)
  const tiles = [...Array(16)].map((_, i) => ({
    row: Math.floor(i / 4),
    col: i % 4,
    delay: (Math.floor(i / 4) + (i % 4)) * 50, // 대각선으로 순차 애니메이션
  }))

  return (
    <>
      {/* Page 2: 로고와 점 패턴 */}
      <div className="absolute inset-0 bg-[#0085b2] flex items-center justify-center z-0 overflow-hidden">
        {/* 점 패턴 배경 */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>
        {/* 로고 */}
        <div
          className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] z-10"
          style={{
            opacity: imageVisible ? 1 : 0,
            transform: imageVisible ? "rotate(0deg) scale(1)" : "rotate(-10deg) scale(0.9)",
            transition: "all 700ms cubic-bezier(.34,1.56,.64,1) 200ms",
          }}
        >
          <Image
            src="/images/original_from_customer/6%E4%BF%AE%E6%AD%A3.png"
            alt="KCP Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Page 1: 모자이크 그리드 */}
      <div
        className="absolute inset-0 z-10 overflow-hidden"
        style={{
          pointerEvents: isPage1 ? "auto" : "none",
        }}
      >
        {/* 그리드 타일들 */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
          {tiles.map((tile, i) => (
            <div
              key={i}
              className="bg-white"
              style={{
                opacity: isPage1 ? 1 : 0,
                transform: isPage1 ? "scale(1)" : "scale(0)",
                transition: `all 400ms cubic-bezier(.83,0,.17,1) ${isPage1 ? 0 : tile.delay}ms`,
              }}
            />
          ))}
        </div>
        {/* 텍스트 */}
        <div
          className="absolute inset-0 flex items-center justify-center z-20"
          style={{
            opacity: isPage1 ? 1 : 0,
            transition: "opacity 200ms ease-out",
          }}
        >
          <div className="text-center px-6 font-sans">
            <div className="text-3xl md:text-5xl font-bold text-[#0085b2] tracking-wider mb-4 min-h-[2.6em]">
              <p className="inline-flex items-center justify-center min-h-[1.2em]">
                <span>{typed1a}</span>
                {phase === "typing1a" && (
                  <span className="animate-blink-fast ml-0.5 inline-block w-[3px] h-[1em] bg-[#0085b2] align-middle" />
                )}
              </p>
              {(phase === "typing1b" || phase === "typing2" || phase === "page2" || phase === "fadeout") && (
                <p className="inline-flex items-center justify-center min-h-[1.2em]">
                  <span>{typed1b}</span>
                  {phase === "typing1b" && (
                    <span className="animate-blink-fast ml-0.5 inline-block w-[3px] h-[1em] bg-[#0085b2] align-middle" />
                  )}
                </p>
              )}
            </div>
            <p className="text-3xl md:text-5xl font-bold text-[#0085b2] tracking-wider inline-flex items-center justify-center min-h-[1.2em]">
              <span>{typed2}</span>
              {phase === "typing2" && (
                <span className="animate-blink-fast ml-0.5 inline-block w-[3px] h-[1em] bg-[#0085b2] align-middle" />
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [shouldRender, setShouldRender] = useState(true)
  const [phase, setPhase] = useState<Phase>("typing1a")
  const [imageVisible, setImageVisible] = useState(false)
  const { t } = useTranslation()
  const LINE1_A = t("loading.line1a")
  const LINE1_B = t("loading.line1b")
  const LINE2 = t("loading.line2")

  useEffect(() => {
    if (sessionStorage.getItem("kcp-loading-shown")) {
      setShouldRender(false)
      setIsVisible(false)
      return
    }

    document.body.style.overflow = "hidden"

    // 타이밍 시퀀스
    const line1aTime = LINE1_A.length * CHAR_INTERVAL
    const line1bTime = LINE1_B.length * CHAR_INTERVAL
    const line2Time = LINE2.length * CHAR_INTERVAL

    // typing1a 완료 후 -> typing1b
    const timer1 = setTimeout(() => {
      setPhase("typing1b")
    }, line1aTime + 200)

    // typing1b 완료 후 -> typing2
    const timer2 = setTimeout(() => {
      setPhase("typing2")
    }, line1aTime + 200 + line1bTime + 200)

    // typing2 완료 후 -> page2
    const timer3 = setTimeout(() => {
      setPhase("page2")
    }, line1aTime + 200 + line1bTime + 200 + line2Time + 600)

    // page2 시작 후 이미지 표시
    const timer4 = setTimeout(() => {
      setImageVisible(true)
    }, line1aTime + 200 + line1bTime + 200 + line2Time + 800)

    // fadeout 시작
    const timer5 = setTimeout(() => {
      setPhase("fadeout")
      sessionStorage.setItem("kcp-loading-shown", "true")
    }, line1aTime + 200 + line1bTime + 200 + line2Time + 800 + 1200)

    // DOM에서 제거
    const timer6 = setTimeout(() => {
      setIsVisible(false)
      setShouldRender(false)
      document.body.style.overflow = ""
    }, line1aTime + 200 + line1bTime + 200 + line2Time + 800 + 1500 + 800)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
      clearTimeout(timer6)
      document.body.style.overflow = ""
    }
  }, [LINE1_A, LINE1_B, LINE2])

  if (!shouldRender) return null

  return (
    <div
      className="fixed inset-0 z-[100]"
      style={{
        opacity: phase === "fadeout" ? 0 : 1,
        transition: "opacity 800ms cubic-bezier(.83,0,.17,1)",
      }}
    >
      {LOADING_PATTERN === "pattern1" && <Pattern1 phase={phase} imageVisible={imageVisible} />}
      {LOADING_PATTERN === "pattern2" && <Pattern2 phase={phase} imageVisible={imageVisible} />}
      {LOADING_PATTERN === "pattern3" && <Pattern3 phase={phase} imageVisible={imageVisible} />}
    </div>
  )
}
