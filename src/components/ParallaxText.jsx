import { useEffect, useState, useMemo, useCallback } from "react";
import { throttle } from "../utils/throttle";

export default function ParallaxText({ text, onServiceClick }) {
  const [offsetX, setOffsetX] = useState(0);
  const [hoveredWord, setHoveredWord] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Throttle mouse move handler to reduce state updates from 100+/sec to 60/sec
  const handleMouseMove = useCallback(
    throttle((e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    }, 16), // 60fps
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollProgress = window.scrollY;
      setOffsetX(scrollProgress * 0.5); // Скорость параллакса
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    handleScroll(); // Инициализация

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  // Разбиваем текст на отдельные слова
  const words = text.split(" • ");

  // Цвета для каждого слова (единая палитра)
  const colors = [
    "text-cyan-400",    // ТАРГЕТ
    "text-pink-400",    // РЕЗУЛЬТАТ
    "text-pink-400",    // РОСТ
    "text-orange-500",  // ЗАЯВКИ
    "text-yellow-400",  // КОНВЕРСИИ
    "text-cyan-400",    // МЕТРИКИ
  ];

  // Memoize coloredWords array to prevent creating 600 objects every render
  const coloredWords = useMemo(() => {
    const result = [];
    for (let i = 0; i < 100; i++) {
      words.forEach((word, idx) => {
        result.push({
          text: word,
          color: colors[idx % colors.length],
          service: word.toLowerCase()
        });
      });
    }
    return result;
  }, [text]); // Only recreate if text prop changes

  // Memoize hovered item calculation
  const hoveredItem = useMemo(() => {
    if (!hoveredWord) return null;
    const [, idx] = hoveredWord.split('-');
    return coloredWords[parseInt(idx)];
  }, [hoveredWord, coloredWords]);

  return (
    <div className="overflow-hidden py-8 bg-black relative">
      {/* Плашка, следующая за курсором */}
      {hoveredItem && (
        <div
          className="fixed pointer-events-none z-50 transition-opacity duration-200"
          style={{
            left: `${mousePos.x + 20}px`,
            top: `${mousePos.y + 20}px`,
            transform: 'translate(0, -50%)',
          }}
        >
          <div className={`${hoveredItem.color} bg-neutral-900 border-2 border-current px-6 py-3 rounded-lg whitespace-nowrap`}>
            <span className="text-2xl md:text-3xl font-black uppercase tracking-tight flex items-center gap-2">
              {hoveredItem.text}
              <span className="text-xl">↗</span>
            </span>
          </div>
        </div>
      )}

      {/* First Row */}
      <div
        className="whitespace-nowrap mb-4"
        style={{
          transform: `translateX(${-2000 + offsetX}px)`,
        }}
      >
        {coloredWords.map((item, idx) => (
          <span key={idx}>
            <button
              onMouseEnter={() => setHoveredWord(`row1-${idx}`)}
              onMouseLeave={() => setHoveredWord(null)}
              onClick={() => onServiceClick && onServiceClick(item.service)}
              className="inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight transition-colors duration-300 cursor-pointer text-neutral-800 hover:text-neutral-600"
            >
              {item.text}
            </button>
            <span className="text-neutral-800 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black"> • </span>
          </span>
        ))}
      </div>

      {/* Second Row - opposite direction */}
      <div
        className="whitespace-nowrap"
        style={{
          transform: `translateX(${-2000 - offsetX}px)`,
        }}
      >
        {coloredWords.map((item, idx) => (
          <span key={idx}>
            <button
              onMouseEnter={() => setHoveredWord(`row2-${idx}`)}
              onMouseLeave={() => setHoveredWord(null)}
              onClick={() => onServiceClick && onServiceClick(item.service)}
              className="inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight transition-colors duration-300 cursor-pointer text-neutral-800 hover:text-neutral-600"
            >
              {item.text}
            </button>
            <span className="text-neutral-800 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black"> • </span>
          </span>
        ))}
      </div>
    </div>
  );
}
