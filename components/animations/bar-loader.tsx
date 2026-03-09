'use client';

import { useEffect, useState } from 'react';

export function BarLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 30;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="w-80 space-y-8">
        {/* Progress bar */}
        <div className="space-y-3">
          <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-400 via-pink-400 to-rose-400 rounded-full"
              style={{
                width: `${progress}%`,
                transition: 'width 0.5s ease-out',
              }}
            />
          </div>
          <p className="text-right text-slate-400 text-sm font-medium">{Math.floor(progress)}%</p>
        </div>

        {/* Loading text with animation */}
        <div className="text-center space-y-2">
          <h2 className="text-white text-xl font-bold">준비 중입니다</h2>
          <div className="flex justify-center gap-1">
            <span className="text-slate-400 text-sm">잠시만 기다려주세요</span>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1 h-1 bg-rose-400 rounded-full"
                  style={{
                    animation: `ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Secondary progress indicators */}
        <div className="space-y-2">
          {['리소스 로딩', '데이터 처리', '최종 확인'].map((label, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-slate-400 text-xs w-20">{label}</span>
              <div className="flex-1 h-0.5 bg-slate-700 rounded overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-cyan-400"
                  style={{
                    width: `${Math.max(0, progress - (i * 30))}%`,
                    transition: 'width 0.5s ease-out',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
