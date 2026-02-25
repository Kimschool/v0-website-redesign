"use client"

import Link from "next/link"

export function AchievementSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#3d7ea6] text-[#faf9f7]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - text content */}
          <div>
            {/* Point badge */}
            <div className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-foreground mb-8">
              <span className="text-[9px] tracking-widest uppercase text-[#faf9f7] font-medium">
                POINT
              </span>
              <span className="text-xl font-medium text-[#faf9f7] leading-none">3</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-medium text-[#faf9f7] tracking-wide mb-3">
              {"進学実績1"}
            </h3>
            <p className="text-sm font-light text-[#faf9f7]/80 leading-relaxed mb-8">
              {"進学実績2"}
            </p>
            <Link
              href="#results"
              className="inline-flex items-center gap-3 px-8 py-3 border border-[#faf9f7]/50 text-[#faf9f7] text-sm tracking-wider hover:bg-[#faf9f7]/10 transition-all"
            >
              {"進学実績"}
            </Link>
          </div>

          {/* Right side - Donut chart */}
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-64 lg:w-72 lg:h-72">
              <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                {/* Background circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#faf9f7"
                  strokeWidth="30"
                  opacity="0.1"
                />
                {/* 進学 50% - green */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#5b8a72"
                  strokeWidth="30"
                  strokeDasharray="219.91 219.91"
                  strokeDashoffset="0"
                />
                {/* その他 40% - warm gold */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#c9a96e"
                  strokeWidth="30"
                  strokeDasharray="175.93 263.89"
                  strokeDashoffset="-219.91"
                />
                {/* 就職 10% - coral */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#d4726a"
                  strokeWidth="30"
                  strokeDasharray="43.98 395.84"
                  strokeDashoffset="-395.84"
                />
              </svg>
              {/* Center label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-light text-[#faf9f7]/70 tracking-wider">{"進学実績"}</span>
              </div>
              {/* Percentage labels */}
              <div className="absolute top-2 right-4 text-sm font-medium text-[#faf9f7]">50%</div>
              <div className="absolute top-2 left-4 text-sm font-medium text-[#faf9f7]">40%</div>
              <div className="absolute bottom-8 left-8 text-sm font-medium text-[#faf9f7]">10%</div>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-6 mt-8">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#5b8a72]" />
                <span className="text-sm font-light text-[#faf9f7]/80">{"進学"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#c9a96e]" />
                <span className="text-sm font-light text-[#faf9f7]/80">{"その他"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#d4726a]" />
                <span className="text-sm font-light text-[#faf9f7]/80">{"就職"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
