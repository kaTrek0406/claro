import { useState } from "react";

export default function Marquee({ text }) {
  // Разбиваем текст на слова по разделителю " • "
  const words = text.split(' • ');
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="relative py-12">
      {/* Серая полоска на заднем фоне */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 overflow-visible rotate-3 bg-neutral-700">
        <div className="py-6 whitespace-nowrap overflow-hidden">
          <div
            className="inline-block animate-[marquee-reverse_25s_linear_infinite] pr-16 text-3xl md:text-5xl font-black text-neutral-500 tracking-tighter uppercase"
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {[...Array(3)].map((_, idx) => (
              <span key={idx} className="inline-flex">
                {words.map((word, i) => (
                  <span key={`${idx}-${i}`} className="inline-flex items-center">
                    <span
                      className="marquee-word inline-block px-3 transition-all duration-300 cursor-default hover:scale-110 hover:-translate-y-1 hover:text-neutral-300"
                      onMouseEnter={() => setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                    >
                      {word}
                    </span>
                    <span className="inline-block px-3">•</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Основная белая полоска */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 overflow-visible -rotate-2 bg-white">
        <div className="py-6 whitespace-nowrap overflow-hidden">
          <div
            className="inline-block animate-[marquee_25s_linear_infinite] pr-16 text-3xl md:text-5xl font-black text-black tracking-tighter uppercase"
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {[...Array(3)].map((_, idx) => (
              <span key={idx} className="inline-flex">
                {words.map((word, i) => (
                  <span key={`${idx}-${i}`} className="inline-flex items-center">
                    <span
                      className="marquee-word inline-block px-3 transition-all duration-300 cursor-default hover:scale-110 hover:-translate-y-1 hover:text-neutral-800"
                      onMouseEnter={() => setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                    >
                      {word}
                    </span>
                    <span className="inline-block px-3">•</span>
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
