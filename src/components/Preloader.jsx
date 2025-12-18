import { useState, useEffect } from "react";

export default function Preloader({ onComplete }) {
  const [currentWord, setCurrentWord] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const words = [
    "CAMPAIGNS",
    "LEADS",
    "ANALYTICS",
    "REACH",
    "OPTIMIZATION"
  ];

  useEffect(() => {
    if (currentWord < words.length) {
      const timer = setTimeout(() => {
        setCurrentWord(currentWord + 1);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          onComplete();
        }, 800);
      }, 500);
      return () => clearTimeout(exitTimer);
    }
  }, [currentWord, words.length, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center transition-opacity duration-700 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Orange Progress Bar - Top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-900">
        <div
          className="h-full bg-orange-500 transition-all duration-500 ease-out"
          style={{ width: `${(currentWord / words.length) * 100}%` }}
        />
      </div>

      {/* Logo */}
      <div className="mb-16">
        <img
          src="/logo-claro.png"
          alt="CLARO"
          className="h-16 md:h-24 animate-pulse"
        />
      </div>

      {/* Animated Words */}
      <div className="relative h-32 md:h-40 mb-12 flex items-center justify-center w-full px-8">
        <div className="relative w-full max-w-4xl flex items-center justify-center" style={{ minHeight: '8rem' }}>
          {words.map((word, index) => (
            <div
              key={word}
              className={`absolute text-orange-500 font-black text-4xl md:text-6xl uppercase tracking-tight transition-all duration-700 ease-in-out whitespace-nowrap ${
                index === currentWord
                  ? 'opacity-100 translate-y-0 scale-100'
                  : index < currentWord
                  ? 'opacity-0 -translate-y-20 scale-90'
                  : 'opacity-0 translate-y-20 scale-90'
              }`}
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) ${
                  index === currentWord
                    ? 'translateY(0) scale(1)'
                    : index < currentWord
                    ? 'translateY(-5rem) scale(0.9)'
                    : 'translateY(5rem) scale(0.9)'
                }`
              }}
            >
              {word}
            </div>
          ))}
        </div>
      </div>

      {/* Loading Dots */}
      <div className="flex gap-2">
        <div className="w-3 h-3 bg-orange-500 rounded-full animate-[wave_1.4s_ease-in-out_infinite]"></div>
        <div className="w-3 h-3 bg-orange-500 rounded-full animate-[wave_1.4s_ease-in-out_0.2s_infinite]"></div>
        <div className="w-3 h-3 bg-orange-500 rounded-full animate-[wave_1.4s_ease-in-out_0.4s_infinite]"></div>
      </div>

      <style>{`
        @keyframes wave {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(-10px);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
