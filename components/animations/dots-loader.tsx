'use client';

export function DotsLoader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex flex-col items-center gap-12">
        {/* Bouncing dots */}
        <div className="flex items-center gap-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
              style={{
                animation: `bounce 1.4s infinite`,
                animationDelay: `${i * 0.16}s`,
              }}
            />
          ))}
        </div>
        
        {/* Pulsing text */}
        <div className="flex gap-1">
          <span className="text-white text-lg font-medium">초기화</span>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="text-emerald-400 text-lg font-bold"
              style={{
                animation: `pulse 1s infinite`,
                animationDelay: `${i * 0.2}s`,
                opacity: 0.3,
              }}
            >
              .
            </span>
          ))}
        </div>

        <style jsx>{`
          @keyframes bounce {
            0%, 80%, 100% {
              transform: translateY(0);
              opacity: 1;
            }
            40% {
              transform: translateY(-12px);
              opacity: 0.8;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
