import { useState } from "react";
import { useTranslation } from "react-i18next";
import { sendToTelegram } from "../utils/telegram";

export default function ContactForm({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: ""
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Отправляем данные в Telegram
      const telegramData = {
        name: formData.name,
        contact: `${formData.email} | ${formData.phone}`,
        service: formData.service
      };

      await sendToTelegram(telegramData, "Contact Form");

      // Показываем успешную анимацию
      setIsSuccess(true);
      setShowConfetti(true);

      // Через 3 секунды закрываем форму и сбрасываем состояние
      setTimeout(() => {
        setIsSuccess(false);
        setShowConfetti(false);
        setFormData({ name: "", email: "", phone: "", service: "" });
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Произошла ошибка при отправке. Попробуйте позже.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 sm:px-6 animate-[fadeIn_0.3s_ease-out]"
      onClick={onClose}
    >
      <div
        className="bg-black border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 max-w-md w-full relative animate-[scaleIn_0.4s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors text-3xl font-light"
        >
          ×
        </button>

        {/* Success Screen */}
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 animate-[fadeIn_0.5s_ease-out]">
            {/* Success Icon with Animation */}
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center animate-[scaleIn_0.5s_ease-out]">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {/* Pulse rings */}
              <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
            </div>

            {/* Success Message */}
            <h3 className="text-3xl font-black text-white mb-2 text-center animate-[slideUp_0.5s_ease-out]">
              {t('contactForm.successTitle')}
            </h3>
            <p className="text-neutral-400 text-center animate-[slideUp_0.5s_ease-out_0.1s_both]">
              {t('contactForm.successMessage')}
            </p>

            {/* Confetti Animation */}
            {showConfetti && (
              <div className="fixed inset-0 pointer-events-none z-[200]">
                {[...Array(50)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 animate-[confetti_3s_ease-out_forwards]"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `-10px`,
                      backgroundColor: ['#f97316', '#06b6d4', '#ec4899', '#fbbf24', '#a855f7'][Math.floor(Math.random() * 5)],
                      animationDelay: `${Math.random() * 0.5}s`,
                      transform: `rotate(${Math.random() * 360}deg)`
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Title */}
            <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-8">
              {t('contactForm.title')} <span className="text-cyan-400">{t('contactForm.titleHighlight')}</span>
            </h3>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-tight text-neutral-400 mb-2">
              {t('contactForm.nameLabel')}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 transition-colors"
              placeholder={t('contactForm.namePlaceholder')}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-tight text-neutral-400 mb-2">
              {t('contactForm.emailLabel')}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 transition-colors"
              placeholder={t('contactForm.emailPlaceholder')}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-tight text-neutral-400 mb-2">
              {t('contactForm.phoneLabel')}
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 transition-colors"
              placeholder={t('contactForm.phonePlaceholder')}
            />
          </div>

          {/* Service */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-tight text-neutral-400 mb-2">
              {t('contactForm.serviceLabel')}
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-colors"
            >
              <option value="" disabled className="bg-black">{t('contactForm.servicePlaceholder')}</option>
              <option value="target" className="bg-black">{t('contactForm.services.target')}</option>
              <option value="smm" className="bg-black">{t('contactForm.services.smm')}</option>
              <option value="website" className="bg-black">{t('contactForm.services.website')}</option>
              <option value="bots" className="bg-black">{t('contactForm.services.bots')}</option>
              <option value="ai" className="bg-black">{t('contactForm.services.ai')}</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-8 py-4 bg-white text-black font-black uppercase tracking-tight rounded-full hover:bg-neutral-200 transition-colors text-lg group"
          >
            {t('contactForm.submitButton')}
            <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
          </button>
        </form>
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
