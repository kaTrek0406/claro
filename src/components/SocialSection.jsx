import { useState } from "react";
import samoletImg from '/samolet.png';

export default function SocialSection({ onContactClick }) {
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const socialLinks = {
    twitter: null,
    linkedin: null,
    facebook: "https://www.facebook.com/claro.md",
    instagram: "https://www.instagram.com/claro_md/",
  };

  const getSocialLabel = (social) => {
    const labels = {
      twitter: "TWITTER",
      linkedin: "LINKEDIN",
      facebook: "FACEBOOK",
      instagram: "INSTAGRAM FLEX",
    };
    return labels[social] || social.toUpperCase();
  };

  const getSocialColor = (social) => {
    const colors = {
      twitter: "text-blue-400 border-blue-400",
      linkedin: "text-blue-600 border-blue-600",
      facebook: "text-blue-600 border-blue-600",
      instagram: "text-pink-500 border-pink-500",
    };
    return colors[social] || "text-white border-white";
  };

  const handleSocialClick = (social, e) => {
    if (socialLinks[social]) {
      window.open(socialLinks[social], '_blank');
    } else {
      e.preventDefault();
      onContactClick();
    }
  };

  return (
    <div className="px-6" onMouseMove={handleMouseMove}>
      <style>{`
        @keyframes fly {
          0%, 100% {
            transform: translateX(0) translateY(0) rotate(0deg);
          }
          25% {
            transform: translateX(10px) translateY(-5px) rotate(5deg);
          }
          50% {
            transform: translateX(0) translateY(-10px) rotate(0deg);
          }
          75% {
            transform: translateX(-10px) translateY(-5px) rotate(-5deg);
          }
        }
      `}</style>
      <div className="max-w-5xl mx-auto">
        {/* Плашка для соцсетей */}
        {hoveredSocial && (
          <div
            className="fixed pointer-events-none z-50"
            style={{
              left: `${mousePos.x + 20}px`,
              top: `${mousePos.y - 30}px`,
            }}
          >
            <div className={`${getSocialColor(hoveredSocial)} bg-neutral-900 border-2 px-6 py-3 rounded-xl whitespace-nowrap`}>
              <span className="text-xl md:text-2xl font-black uppercase tracking-tight flex items-center gap-2">
                {getSocialLabel(hoveredSocial)}
                <span className="text-2xl">😍</span>
              </span>
            </div>
          </div>
        )}

        {/* Верхний текст с иконками соц сетей */}
        <div className="mb-16 relative">
          <h2 className="text-[6vw] md:text-[4vw] lg:text-[2.5vw] leading-tight font-black uppercase tracking-tight max-w-6xl mx-auto text-center">
            <span className="inline-block">Мы наиболее</span>{" "}
            <span className="inline-block text-cyan-400">активны</span>{" "}
            <span className="inline-block">в</span>{" "}
            <button
              onClick={(e) => handleSocialClick("twitter", e)}
              onMouseEnter={() => setHoveredSocial("twitter")}
              onMouseLeave={() => setHoveredSocial(null)}
              className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-blue-400 rounded-lg text-white hover:scale-110 transition-transform duration-300 cursor-pointer rotate-6"
            >
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </button>
            <span>,</span>{" "}
            <button
              onClick={(e) => handleSocialClick("linkedin", e)}
              onMouseEnter={() => setHoveredSocial("linkedin")}
              onMouseLeave={() => setHoveredSocial(null)}
              className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-lg text-white hover:scale-110 transition-transform duration-300 cursor-pointer -rotate-6"
            >
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>
            <span>,</span>{" "}
            <button
              onClick={(e) => handleSocialClick("facebook", e)}
              onMouseEnter={() => setHoveredSocial("facebook")}
              onMouseLeave={() => setHoveredSocial(null)}
              className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-lg text-white hover:scale-110 transition-transform duration-300 cursor-pointer rotate-6"
            >
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <span> и </span>
            <button
              onClick={(e) => handleSocialClick("instagram", e)}
              onMouseEnter={() => setHoveredSocial("instagram")}
              onMouseLeave={() => setHoveredSocial(null)}
              className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-lg text-white hover:scale-110 transition-transform duration-300 cursor-pointer -rotate-6"
            >
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </button>
            <span>. Здесь мы делимся</span>{" "}
            <span className="inline-block text-pink-400">кейсами</span>
            <span>,</span>{" "}
            <span className="inline-block text-orange-500">инсайтами</span>
            <span>,</span>{" "}
            <span className="inline-block">показываем</span>{" "}
            <span className="inline-block text-yellow-400">результаты</span>{" "}
            <span className="inline-block">наших клиентов и рассказываем о</span>{" "}
            <span className="inline-block text-purple-400">digital-трендах</span>
            <span>.</span>
          </h2>
        </div>

        {/* Призыв к действию */}
        <div className="text-center">
          <h3 className="text-[8vw] md:text-[5vw] lg:text-[3.5vw] leading-[0.95] font-black uppercase tracking-tight mb-8">
            Давайте создадим{" "}
            <span className="text-cyan-400">что-то крутое!</span>
          </h3>

          <div className="relative inline-flex mb-8">
            <button
              onClick={onContactClick}
              className="group inline-flex items-center gap-3 px-12 py-6 bg-orange-500 text-white font-black uppercase tracking-tight rounded-full hover:bg-orange-600 transition-all duration-300 text-2xl md:text-3xl relative z-10 overflow-visible"
            >
              Связаться с нами
              <span className="text-3xl transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>

              {/* Иконка самолетика */}
              <img
                src={samoletImg}
                alt="plane"
                className="absolute -top-4 -right-16 w-20 h-20 md:w-24 md:h-24 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none group-hover:translate-x-12 group-hover:-translate-y-8 group-hover:rotate-[25deg]"
                style={{ transform: 'translateX(0) translateY(0) rotate(0deg)' }}
              />
            </button>
          </div>

          <p className="text-neutral-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Мы всегда открыты для новых возможностей, сотрудничества и связей. Если у вас есть проект,
            которым вы хотели бы поделиться, хотите обсудить работу или просто поздороваться -
            свяжитесь с нами!
          </p>
        </div>
      </div>
    </div>
  );
}
