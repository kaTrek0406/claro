import { useState } from "react";

export default function Marquee({ text }) {
  // Разбиваем текст на слова по разделителю " • "
  const words = text.split(' • ');
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="relative py-8 sm:py-12 overflow-visible">
      {/* Серая полоска на заднем фоне */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen overflow-visible -rotate-6 sm:-rotate-3 bg-neutral-400">
        <div className="py-4 sm:py-6"></div>
      </div>

      {/* Основная белая полоска */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen overflow-visible rotate-6 sm:rotate-3 bg-white">
        <div className="py-4 sm:py-6 whitespace-nowrap overflow-hidden">
          <div
            className="inline-block animate-[marquee_15s_linear_infinite] pr-8 sm:pr-16 text-xl sm:text-3xl md:text-5xl font-black text-black tracking-tighter uppercase"
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {[...Array(3)].map((_, idx) => (
              <span key={idx} className="inline-flex">
                {words.map((word, i) => (
                  <span key={`${idx}-${i}`} className="inline-flex items-center">
                    <span
                      className="marquee-word inline-block px-2 sm:px-3 transition-all duration-300 cursor-default sm:hover:scale-110 sm:hover:-translate-y-1 sm:hover:text-neutral-800"
                      onMouseEnter={() => setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                    >
                      {word}
                    </span>
                    <span className="inline-block px-2 sm:px-3">•</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
        @keyframes marquee-reverse { 0% { transform: translateX(-33.33%); } 100% { transform: translateX(0); } }
      `}</style>
    </div>
  );
}
