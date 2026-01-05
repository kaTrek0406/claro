import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (cookieConsent) return;

    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.5;

      if (window.scrollY > scrollThreshold) {
        // Показываем баннер через 1 секунду после скролла
        setTimeout(() => setIsVisible(true), 1000);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="mx-3 mb-3 sm:mx-4 sm:mb-4 md:mx-6 md:mb-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-neutral-900 to-black border-2 border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-row items-center gap-3 sm:gap-4">
            {/* Cookie Icon */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl sm:text-3xl md:text-4xl animate-bounce-slow shadow-lg">
                🍪
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed">
                Мы используем cookies для работы сайта, аналитики и маркетинга (<span className="text-cyan-400 font-semibold">Meta/Google</span>). Вы можете принять все cookies или настроить предпочтения.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2 sm:gap-2 flex-shrink-0">
              <button
                onClick={handleAccept}
                className="px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs sm:text-sm font-black uppercase tracking-tight rounded-full hover:scale-105 transition-all shadow-lg hover:shadow-orange-500/50 whitespace-nowrap"
              >
                Принять все
              </button>
              <button
                onClick={handleAccept}
                className="px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-2.5 bg-white/10 border border-white/20 text-white text-xs sm:text-sm font-bold uppercase tracking-tight rounded-full hover:bg-white/20 transition-all whitespace-nowrap"
              >
                Отклонить
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
