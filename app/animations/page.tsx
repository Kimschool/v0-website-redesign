'use client';

import { useState } from 'react';
import { SpinnerLoader } from '@/components/animations/spinner-loader';
import { DotsLoader } from '@/components/animations/dots-loader';
import { BarLoader } from '@/components/animations/bar-loader';

export default function AnimationsPage() {
  const [selectedAnimation, setSelectedAnimation] = useState<'spinner' | 'dots' | 'bar' | null>(null);

  if (selectedAnimation === 'spinner') return <SpinnerLoader />;
  if (selectedAnimation === 'dots') return <DotsLoader />;
  if (selectedAnimation === 'bar') return <BarLoader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">시작 애니메이션</h1>
          <p className="text-slate-400 text-lg">3가지 패턴 선택</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Spinner Pattern */}
          <button
            onClick={() => setSelectedAnimation('spinner')}
            className="group relative overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50 p-6 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative space-y-4">
              {/* Preview */}
              <div className="flex justify-center mb-6">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-400 animate-spin" />
                  <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-purple-500 border-l-purple-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                  <div className="absolute inset-4 rounded-full border-3 border-transparent border-t-cyan-400 animate-spin" style={{ animationDuration: '2s' }} />
                </div>
              </div>

              <h3 className="text-white font-semibold text-lg">회전 스피너</h3>
              <p className="text-slate-400 text-sm">3겹의 회전 원형 로더</p>
              
              <div className="pt-2">
                <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">클릭해서 보기</span>
              </div>
            </div>
          </button>

          {/* Dots Pattern */}
          <button
            onClick={() => setSelectedAnimation('dots')}
            className="group relative overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50 p-6 hover:border-emerald-500 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative space-y-4">
              {/* Preview */}
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                      style={{
                        animation: `bounce 1.4s infinite`,
                        animationDelay: `${i * 0.16}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              <h3 className="text-white font-semibold text-lg">점프 도트</h3>
              <p className="text-slate-400 text-sm">튀는 도트 애니메이션</p>
              
              <div className="pt-2">
                <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full">클릭해서 보기</span>
              </div>
            </div>
          </button>

          {/* Bar Pattern */}
          <button
            onClick={() => setSelectedAnimation('bar')}
            className="group relative overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50 p-6 hover:border-rose-500 transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative space-y-4">
              {/* Preview */}
              <div className="flex justify-center mb-6">
                <div className="space-y-2 w-full">
                  <div className="w-16 h-1 bg-slate-700 rounded-full overflow-hidden mx-auto">
                    <div className="h-full w-1/2 bg-gradient-to-r from-orange-400 via-pink-400 to-rose-400 rounded-full animate-pulse" />
                  </div>
                  <p className="text-slate-400 text-xs text-center">50%</p>
                </div>
              </div>

              <h3 className="text-white font-semibold text-lg">진행 바</h3>
              <p className="text-slate-400 text-sm">진행률 표시 로더</p>
              
              <div className="pt-2">
                <span className="inline-block px-3 py-1 bg-rose-500/20 text-rose-300 text-xs rounded-full">클릭해서 보기</span>
              </div>
            </div>
          </button>
        </div>

        <style jsx>{`
          @keyframes bounce {
            0%, 80%, 100% {
              transform: translateY(0);
              opacity: 1;
            }
            40% {
              transform: translateY(-8px);
              opacity: 0.8;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
