import { useEffect, useRef } from "react";

export default function ParallaxShapes() {
  const shapesRef = useRef([]);
  const isMobile = useRef(window.innerWidth < 768);

  useEffect(() => {
    // На мобильных отключаем parallax полностью
    if (isMobile.current) {
      return;
    }

    // На десктопе используем RAF без state updates
    let rafId;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        shapesRef.current.forEach((el, index) => {
          if (!el) return;

          // Разные скорости для разных элементов
          const speeds = [0.1, -0.15, 0.08, -0.12, 0.2, -0.25, 0.18, -0.15, 0.3, -0.2, 0.25, -0.18, 0.15, -0.12, 0.2, -0.18, 0.25, 0.18, -0.15];
          const speed = speeds[index] || 0.1;
          const offset = scrollY * speed;

          // Применяем transform напрямую к DOM
          if (el.dataset.type === 'square') {
            el.style.transform = `translateY(${offset}px) rotate(${45 + scrollY * 0.05}deg)`;
          } else if (el.dataset.type === 'dot') {
            el.style.transform = `translateY(${offset}px)`;
          } else {
            el.style.transform = `translateY(${offset}px)`;
          }
        });
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial position

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // На мобильных возвращаем упрощенный статичный фон
  if (isMobile.current) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
        {/* Только градиентные круги без parallax */}
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/10 to-transparent blur-3xl top-[10%] left-[10%]" />
        <div className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-cyan-500/10 to-transparent blur-3xl top-[40%] right-[5%]" />
        <div className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-pink-500/10 to-transparent blur-3xl top-[70%] left-[15%]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Градиентные круги */}
      <div
        ref={el => shapesRef.current[0] = el}
        data-type="gradient"
        className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/10 to-transparent blur-3xl"
        style={{ top: "10%", left: "10%", willChange: "transform" }}
      />

      <div
        ref={el => shapesRef.current[1] = el}
        data-type="gradient"
        className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-cyan-500/10 to-transparent blur-3xl"
        style={{ top: "40%", right: "5%", willChange: "transform" }}
      />

      <div
        ref={el => shapesRef.current[2] = el}
        data-type="gradient"
        className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-pink-500/10 to-transparent blur-3xl"
        style={{ top: "70%", left: "15%", willChange: "transform" }}
      />

      <div
        ref={el => shapesRef.current[3] = el}
        data-type="gradient"
        className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-orange-500/10 to-transparent blur-3xl"
        style={{ top: "50%", right: "20%", willChange: "transform" }}
      />

      {/* Геометрические фигуры */}
      <div
        ref={el => shapesRef.current[4] = el}
        data-type="square"
        className="absolute w-32 h-32 border-2 border-cyan-400/20 rounded-xl"
        style={{ top: "20%", right: "15%", willChange: "transform" }}
      />

      <div
        ref={el => shapesRef.current[5] = el}
        data-type="circle"
        className="absolute w-24 h-24 border-2 border-purple-400/20 rounded-full"
        style={{ top: "60%", right: "10%", willChange: "transform" }}
      />

      <div
        ref={el => shapesRef.current[6] = el}
        data-type="square"
        className="absolute w-40 h-40 border-2 border-pink-400/20"
        style={{ top: "80%", left: "5%", willChange: "transform" }}
      />

      {/* Линии - статичные */}
      <svg
        className="absolute opacity-20"
        style={{ top: "30%", left: "5%", width: "200px", height: "200px" }}
      >
        <line x1="0" y1="0" x2="200" y2="200" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="2" />
        <line x1="0" y1="100" x2="200" y2="100" stroke="rgba(236, 72, 153, 0.2)" strokeWidth="2" />
      </svg>

      {/* Плавающие точки */}
      <div
        ref={el => shapesRef.current[8] = el}
        data-type="dot"
        className="absolute w-3 h-3 bg-yellow-400/40 rounded-full animate-pulse"
        style={{ top: "15%", left: "30%", willChange: "transform" }}
      />

      <div
        ref={el => shapesRef.current[9] = el}
        data-type="dot"
        className="absolute w-2 h-2 bg-cyan-400/40 rounded-full animate-pulse"
        style={{ top: "45%", left: "70%", willChange: "transform", animationDelay: "0.5s" }}
      />

      <div
        ref={el => shapesRef.current[10] = el}
        data-type="dot"
        className="absolute w-2.5 h-2.5 bg-pink-400/40 rounded-full animate-pulse"
        style={{ top: "75%", left: "25%", willChange: "transform", animationDelay: "1s" }}
      />

      <div
        ref={el => shapesRef.current[11] = el}
        data-type="dot"
        className="absolute w-2 h-2 bg-orange-400/40 rounded-full animate-pulse"
        style={{ top: "85%", left: "80%", willChange: "transform", animationDelay: "1.5s" }}
      />
    </div>
  );
}
