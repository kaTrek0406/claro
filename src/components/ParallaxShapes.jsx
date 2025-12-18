import { useEffect, useState } from "react";

export default function ParallaxShapes() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Градиентные круги */}
      <div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/10 to-transparent blur-3xl"
        style={{
          top: "10%",
          left: "10%",
          transform: `translateY(${scrollY * 0.1}px) scale(${1 + scrollY * 0.0001})`,
        }}
      />

      <div
        className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-cyan-500/10 to-transparent blur-3xl"
        style={{
          top: "40%",
          right: "5%",
          transform: `translateY(${scrollY * -0.15}px) rotate(${scrollY * 0.05}deg)`,
        }}
      />

      <div
        className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-pink-500/10 to-transparent blur-3xl"
        style={{
          top: "70%",
          left: "15%",
          transform: `translateY(${scrollY * 0.08}px) scale(${1 + scrollY * 0.00008})`,
        }}
      />

      <div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-orange-500/10 to-transparent blur-3xl"
        style={{
          top: "50%",
          right: "20%",
          transform: `translateY(${scrollY * -0.12}px)`,
        }}
      />

      {/* Геометрические фигуры */}
      <div
        className="absolute w-32 h-32 border-2 border-cyan-400/20 rounded-xl rotate-45"
        style={{
          top: "20%",
          right: "15%",
          transform: `translateY(${scrollY * 0.2}px) rotate(${45 + scrollY * 0.1}deg)`,
        }}
      />

      <div
        className="absolute w-24 h-24 border-2 border-purple-400/20 rounded-full"
        style={{
          top: "60%",
          right: "10%",
          transform: `translateY(${scrollY * -0.25}px) scale(${1 + scrollY * 0.0001})`,
        }}
      />

      <div
        className="absolute w-40 h-40 border-2 border-pink-400/20"
        style={{
          top: "80%",
          left: "5%",
          transform: `translateY(${scrollY * 0.18}px) rotate(${scrollY * -0.08}deg)`,
        }}
      />

      {/* Линии */}
      <svg
        className="absolute"
        style={{
          top: "30%",
          left: "5%",
          width: "200px",
          height: "200px",
          transform: `translateY(${scrollY * -0.15}px) rotate(${scrollY * 0.05}deg)`,
        }}
      >
        <line
          x1="0"
          y1="0"
          x2="200"
          y2="200"
          stroke="rgba(99, 102, 241, 0.2)"
          strokeWidth="2"
        />
        <line
          x1="0"
          y1="100"
          x2="200"
          y2="100"
          stroke="rgba(236, 72, 153, 0.2)"
          strokeWidth="2"
        />
      </svg>

      {/* Плавающие точки */}
      <div
        className="absolute w-3 h-3 bg-yellow-400/40 rounded-full animate-pulse"
        style={{
          top: "15%",
          left: "30%",
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />

      <div
        className="absolute w-2 h-2 bg-cyan-400/40 rounded-full animate-pulse"
        style={{
          top: "45%",
          left: "70%",
          transform: `translateY(${scrollY * -0.2}px)`,
          animationDelay: "0.5s",
        }}
      />

      <div
        className="absolute w-2.5 h-2.5 bg-pink-400/40 rounded-full animate-pulse"
        style={{
          top: "75%",
          left: "25%",
          transform: `translateY(${scrollY * 0.25}px)`,
          animationDelay: "1s",
        }}
      />

      <div
        className="absolute w-2 h-2 bg-orange-400/40 rounded-full animate-pulse"
        style={{
          top: "85%",
          left: "80%",
          transform: `translateY(${scrollY * -0.18}px)`,
          animationDelay: "1.5s",
        }}
      />

      {/* Дополнительные элементы для средней и нижней части страницы */}
      <div
        className="absolute w-24 h-24 border-2 border-purple-400/20 rounded-xl"
        style={{
          top: "40%",
          left: "5%",
          transform: `translateY(${scrollY * 0.15}px) rotate(${45 + scrollY * 0.08}deg)`,
        }}
      />

      <div
        className="absolute w-32 h-32 border-2 border-cyan-400/20 rounded-full"
        style={{
          top: "35%",
          right: "8%",
          transform: `translateY(${scrollY * -0.12}px) scale(${1 + scrollY * 0.00008})`,
        }}
      />

      <div
        className="absolute w-16 h-16 border-2 border-pink-400/20"
        style={{
          top: "50%",
          left: "15%",
          transform: `translateY(${scrollY * 0.2}px) rotate(${scrollY * -0.1}deg)`,
        }}
      />

      <div
        className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-orange-500/10 to-transparent blur-2xl"
        style={{
          top: "30%",
          right: "15%",
          transform: `translateY(${scrollY * -0.18}px)`,
        }}
      />

      <div
        className="absolute w-3 h-3 bg-yellow-400/50 rounded-full animate-pulse"
        style={{
          top: "45%",
          left: "10%",
          transform: `translateY(${scrollY * 0.25}px)`,
          animationDelay: "2s",
        }}
      />

      <div
        className="absolute w-20 h-20 border-2 border-cyan-400/20 rounded-xl"
        style={{
          top: "65%",
          right: "12%",
          transform: `translateY(${scrollY * 0.18}px) rotate(${-45 + scrollY * -0.06}deg)`,
        }}
      />

      <div
        className="absolute w-28 h-28 border-2 border-purple-400/20 rounded-full"
        style={{
          top: "70%",
          left: "8%",
          transform: `translateY(${scrollY * -0.15}px)`,
        }}
      />
    </div>
  );
}