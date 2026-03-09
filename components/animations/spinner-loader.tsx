'use client';

export function SpinnerLoader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="relative w-20 h-20">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-400 animate-spin" />
        
        {/* Middle ring */}
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-purple-500 border-l-purple-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        
        {/* Inner ring */}
        <div className="absolute inset-4 rounded-full border-3 border-transparent border-t-cyan-400 animate-spin" style={{ animationDuration: '2s' }} />
        
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
        </div>
      </div>
      
      <div className="absolute bottom-20 text-center">
        <p className="text-white text-lg font-semibold">로딩 중...</p>
      </div>
    </div>
  );
}
