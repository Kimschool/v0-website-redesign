"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { useTranslation } from "react-i18next"

type Phase = "typing1a" | "typing1b" | "typing2" | "page2" | "fadeout"

const CHAR_INTERVAL = 150

export function LoadingScreen() {
  const { t } = useTranslation()
  const LINE1_A = t("loading.line1a")
  const LINE1_B = t("loading.line1b")
  const LINE2 = t("loading.line2")
  const [isVisible, setIsVisible] = useState(true)
  const [shouldRender, setShouldRender] = useState(true)
  const [phase, setPhase] = useState<Phase>("typing1a")
  const [typed1a, setTyped1a] = useState("")
  const [typed1b, setTyped1b] = useState("")
  const [typed2, setTyped2] = useState("")
  const [imageVisible, setImageVisible] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (sessionStorage.getItem("kcp-loading-shown")) {
      setShouldRender(false)
      setIsVisible(false)
      return
    }

    document.body.style.overflow = "hidden"

    // Start typing line 1a: "ともに"
    let i = 0
    intervalRef.current = setInterval(() => {
      i++
      setTyped1a(LINE1_A.slice(0, i))
      if (i >= LINE1_A.length) {
        clearInterval(intervalRef.current!)
        // Small pause then start line 1b: "まなび"
        setTimeout(() => {
          setPhase("typing1b")
          let j = 0
          intervalRef.current = setInterval(() => {
            j++
            setTyped1b(LINE1_B.slice(0, j))
            if (j >= LINE1_B.length) {
              clearInterval(intervalRef.current!)
              // Small pause then start line 2: "ともに生きる"
              setTimeout(() => {
                setPhase("typing2")
                let k = 0
                intervalRef.current = setInterval(() => {
                  k++
                  setTyped2(LINE2.slice(0, k))
                  if (k >= LINE2.length) {
                    clearInterval(intervalRef.current!)
                    // Pause then transition to page 2
                    setTimeout(() => {
                      setPhase("page2")
                      // Fade in image slightly after page 2 is revealed
                      setTimeout(() => setImageVisible(true), 200)
                      // Start fadeout after page 2 shows for 2500ms
                      setTimeout(() => {
                        setPhase("fadeout")
                        sessionStorage.setItem("kcp-loading-shown", "true")
                        // Remove from DOM after fade completes
                        setTimeout(() => {
                          setIsVisible(false)
                          setShouldRender(false)
                          document.body.style.overflow = ""
                        }, 800)
                      }, 2500)
                    }, 600)
                  }
                }, CHAR_INTERVAL)
              }, 200)
            }
          }, CHAR_INTERVAL)
        }, 200)
      }
    }, CHAR_INTERVAL)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      document.body.style.overflow = ""
    }
  }, [])

  if (!shouldRender) return null

  const isPage1 = phase === "typing1a" || phase === "typing1b" || phase === "typing2"

  return (
    <div
      className="fixed inset-0 z-[100]"
      style={{
        opacity: phase === "fadeout" ? 0 : 1,
        transition: "opacity 800ms cubic-bezier(.83,0,.17,1)",
      }}
    >
      {/* Page 2: Logo image — always rendered at opacity 1, behind page 1 */}
      <div
        className="absolute inset-0 bg-[#0085b2] flex items-center justify-center z-0"
      >
        <div
          className="relative w-[340px] h-[340px] md:w-[500px] md:h-[500px]"
          style={{
            opacity: imageVisible ? 1 : 0,
            transition: "opacity 700ms ease-in-out",
          }}
        >
          <Image
            src="/images/original_from_customer/6修正.png"
            alt="KCP Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Page 1: Typing animation — on top, fades out to reveal page 2 */}
      <div
        className="absolute inset-0 bg-white flex items-center justify-center z-10"
        style={{
          opacity: isPage1 ? 1 : 0,
          transition: "opacity 500ms ease-in-out",
          pointerEvents: isPage1 ? "auto" : "none",
        }}
      >
        <div className="text-center px-6">
          {/* Block 1: "ともに" + newline + "まなび" */}
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
          {/* Block 2: "ともに生きる" */}
          <p className="text-3xl md:text-5xl font-bold text-[#0085b2] tracking-wider inline-flex items-center justify-center min-h-[1.2em]">
            <span>{typed2}</span>
            {phase === "typing2" && (
              <span className="animate-blink-fast ml-0.5 inline-block w-[3px] h-[1em] bg-[#0085b2] align-middle" />
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
