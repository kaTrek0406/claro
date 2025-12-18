import { useState } from "react";
import { sendToTelegram } from "../utils/telegram";

export default function Footer() {
  const phoneRaw = "+37379950191";
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await sendToTelegram({ contact: email }, "Footer Consultation");

      setIsSuccess(true);
      setEmail("");

      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting consultation form:", error);
      alert("Произошла ошибка при отправке. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contacts" className="bg-orange-500 text-black py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Левая колонка - Контакты */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
              Контакты
            </h2>

            <div className="space-y-4">
              <div className="text-2xl font-bold">
                <a href={`tel:${phoneRaw}`} className="hover:underline">
                  +373 79 950 191
                </a>
              </div>

              <div className="flex flex-wrap gap-3 text-base">
                <a href="https://t.me/" target="_blank" rel="noreferrer" className="hover:underline font-bold">
                  Telegram
                </a>
                <span>•</span>
                <a href={`https://wa.me/${phoneRaw.replace("+", "")}`} target="_blank" rel="noreferrer" className="hover:underline font-bold">
                  WhatsApp
                </a>
                <span>•</span>
                <a href={`viber://chat?number=%2B${phoneRaw.replace("+", "")}`} className="hover:underline font-bold">
                  Viber
                </a>
              </div>

              <div className="text-base">
                Instagram:{" "}
                <a href="https://instagram.com/Claro_md" target="_blank" rel="noreferrer" className="hover:underline font-bold">
                  @Claro_md
                </a>
              </div>

              <div className="text-base font-semibold">
                Valea Trandafirilor 6/2, Кишинев, Молдова
              </div>
            </div>
          </div>

          {/* Правая колонка - Newsletter */}
          <div>
            <div className="bg-black/10 border-2 border-black rounded-2xl p-6 mb-6">
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4">
                Получи консультацию
              </h3>
              <p className="text-sm mb-4">
                Будьте в курсе последних трендов digital-маркетинга
              </p>
              {isSuccess ? (
                <div className="flex items-center gap-2 px-4 py-3 bg-green-500/20 border-2 border-green-500 rounded-xl animate-[fadeIn_0.3s_ease-out]">
                  <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm font-bold text-green-700">Спасибо! Скоро свяжемся</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ваш email"
                    required
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 bg-white/90 border-2 border-black rounded-xl text-black placeholder-neutral-600 focus:outline-none focus:bg-white disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="px-6 py-3 bg-black text-orange-500 font-black uppercase tracking-tight rounded-xl hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "..." : "→"}
                  </button>
                </form>
              )}
            </div>

            {/* Социальные сети */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/claro_md/"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-orange-500 hover:bg-neutral-800 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/claro.md"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-orange-500 hover:bg-neutral-800 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://t.me/"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-orange-500 hover:bg-neutral-800 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
              </a>
              <a
                href="https://dribbble.com/"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-orange-500 hover:bg-neutral-800 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm8.24 6.307c1.43 1.742 2.307 3.97 2.348 6.4-.188-.04-2.073-.422-3.966-.183-.082-.197-.164-.402-.254-.607-.263-.607-.547-1.213-.848-1.802 2.123-.862 3.086-2.107 3.72-3.808zM12 2.183c2.545 0 4.87.97 6.615 2.564-.545 1.572-1.437 2.735-3.437 3.515-1.572-2.886-3.307-5.235-3.567-5.595.455-.082.92-.131 1.389-.131-.002 0-.002 0 0 0zM8.378 3.123c.247.345 1.959 2.693 3.548 5.537-4.467 1.189-8.403 1.172-8.838 1.172.559-3.053 2.596-5.598 5.29-6.709zm-6.195 8.993v-.263c.428.008 5.235.066 9.95-1.38.345.673.673 1.355.975 2.04-.131.033-.263.075-.394.107-4.884 1.58-7.482 5.905-8.116 7.027-1.645-1.8-2.646-4.193-2.646-6.828 0-.239.009-.477.026-.714l.205.011zm3.888 9.447c.477-1.106 2.694-4.926 7.92-6.81l.017-.008c1.437 3.732 2.024 6.866 2.172 7.754-1.314.558-2.76.862-4.28.862-2.319 0-4.442-.82-6.115-2.19l.286.392zm9.87.574c-.107-.648-.657-3.717-2.024-7.382 1.781-.279 3.347.181 3.551.246-.263 2.892-1.645 5.399-3.788 7.136h.261z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="border-t-2 border-black/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <p className="text-sm font-bold">
                © {new Date().getFullYear()} Claro Digital Agency
              </p>
              <p className="text-xs">
                Сделано с ❤️ в Кишиневе, Молдова
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="hover:underline font-bold">
                Условия использования
              </a>
              <a href="#" className="hover:underline font-bold">
                Политика конфиденциальности
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
