import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { throttle } from "../utils/throttle";

export default function ParallaxText({ text, onServiceClick }) {
  const [hoveredWord, setHoveredWord] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const isMobile = useRef(window.innerWidth < 768);

  // Throttle mouse move handler (только на десктопе)
  const handleMouseMove = useCallback(
    throttle((e) => {
      if (!isMobile.current) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    }, 16), // 60fps
    []
  );

  useEffect(() => {
    // На мобильных отключаем parallax, только на десктопе используем RAF
    if (isMobile.current) {
      // Только mousemove не нужен на мобильных
      return;
    }

    // Десктоп: используем requestAnimationFrame для плавной анимации
    let rafId;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const scrollProgress = window.scrollY;
        const offset = scrollProgress * 0.5;

        if (row1Ref.current) {
          row1Ref.current.style.transform = `translateX(${-2000 + offset}px)`;
        }
        if (row2Ref.current) {
          row2Ref.current.style.transform = `translateX(${-2000 - offset}px)`;
        }
      });
    };

    // Проверка размера экрана
    const handleResize = () => {
      const wasMobile = isMobile.current;
      isMobile.current = window.innerWidth < 768;

      // Если переключились на мобильный, сбрасываем transform
      if (!wasMobile && isMobile.current) {
        if (row1Ref.current) row1Ref.current.style.transform = '';
        if (row2Ref.current) row2Ref.current.style.transform = '';
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);

    handleScroll(); // Инициализация

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
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

  // Memoize coloredWords array - уменьшаем до 50 повторений для мобильных
  const coloredWords = useMemo(() => {
    const result = [];
    const repeatCount = isMobile.current ? 50 : 100;
    for (let i = 0; i < repeatCount; i++) {
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
      {/* Плашка, следующая за курсором - только на десктопе */}
      {hoveredItem && !isMobile.current && (
        <div
          className="fixed pointer-events-none z-50 transition-opacity duration-200"
          style={{
            left: `${mousePos.x + 20}px`,
            top: `${mousePos.y + 20}px`,
            transform: 'translate(0, -50%)',
          }}
        >
          <div className={`${hoveredItem.color} bg-neutral-900 border-2 border-current px-6 py-3 rounded-lg whitespace-nowrap`}>
            <span className="text-2xl md:text-3xl font-bold uppercase tracking-tight flex items-center gap-2">
              {hoveredItem.text}
              <span className="text-xl">↗</span>
            </span>
          </div>
        </div>
      )}

      {/* First Row */}
      <div
        ref={row1Ref}
        className={`whitespace-nowrap mb-4 ${isMobile.current ? 'animate-[scroll-left_30s_linear_infinite]' : ''}`}
        style={{
          transform: isMobile.current ? 'none' : 'translateX(-2000px)',
          willChange: isMobile.current ? 'auto' : 'transform',
        }}
      >
        {coloredWords.map((item, idx) => (
          <span key={idx}>
            <button
              onMouseEnter={() => !isMobile.current && setHoveredWord(`row1-${idx}`)}
              onMouseLeave={() => !isMobile.current && setHoveredWord(null)}
              onClick={() => onServiceClick && onServiceClick(item.service)}
              className="inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight transition-colors duration-300 cursor-pointer text-neutral-800 md:hover:text-neutral-600"
            >
              {item.text}
            </button>
            <span className="text-neutral-800 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"> • </span>
          </span>
        ))}
      </div>

      {/* Second Row - opposite direction */}
      <div
        ref={row2Ref}
        className={`whitespace-nowrap ${isMobile.current ? 'animate-[scroll-right_30s_linear_infinite]' : ''}`}
        style={{
          transform: isMobile.current ? 'none' : 'translateX(-2000px)',
          willChange: isMobile.current ? 'auto' : 'transform',
        }}
      >
        {coloredWords.map((item, idx) => (
          <span key={idx}>
            <button
              onMouseEnter={() => !isMobile.current && setHoveredWord(`row2-${idx}`)}
              onMouseLeave={() => !isMobile.current && setHoveredWord(null)}
              onClick={() => onServiceClick && onServiceClick(item.service)}
              className="inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight transition-colors duration-300 cursor-pointer text-neutral-800 md:hover:text-neutral-600"
            >
              {item.text}
            </button>
            <span className="text-neutral-800 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"> • </span>
          </span>
        ))}
      </div>

      {/* CSS анимации для мобильных */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
