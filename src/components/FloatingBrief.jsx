import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { sendToTelegram } from "../utils/telegram";
import logoClaro from '/logo-claro.png';

export default function FloatingBrief() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [briefData, setBriefData] = useState({
    name: "",
    service: "",
    budget: "",
    contact: "",
  });
  const [scrolled, setScrolled] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.5;

      if (window.scrollY > scrollThreshold && !scrolled && !isTransitioning) {
        // Начинаем переход: сначала исчезаем
        setIsTransitioning(true);
        setTimeout(() => {
          setScrolled(true);
          setTimeout(() => {
            setIsTransitioning(false);
          }, 100);
        }, 400);
      } else if (window.scrollY <= scrollThreshold && scrolled && !isTransitioning) {
        // Возвращаемся обратно: сначала исчезаем
        setIsTransitioning(true);
        setTimeout(() => {
          setScrolled(false);
          setTimeout(() => {
            setIsTransitioning(false);
          }, 100);
        }, 400);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled, isTransitioning]);

  const questions = [
    {
      id: "name",
      question: t("floatingBrief.questions.name.question"),
      placeholder: t("floatingBrief.questions.name.placeholder"),
      type: "text",
    },
    {
      id: "service",
      question: t("floatingBrief.questions.service.question"),
      options: t("floatingBrief.questions.service.options", { returnObjects: true }),
      type: "select",
    },
    {
      id: "budget",
      question: t("floatingBrief.questions.budget.question"),
      options: t("floatingBrief.questions.budget.options", { returnObjects: true }),
      type: "select",
    },
    {
      id: "contact",
      question: t("floatingBrief.questions.contact.question"),
      placeholder: t("floatingBrief.questions.contact.placeholder"),
      type: "text",
    },
  ];

  const handleNext = async () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Отправка брифа в Telegram
      try {
        await sendToTelegram(briefData, "Floating Brief");

        // Показываем успешную анимацию
        setIsSuccess(true);
        setShowConfetti(true);

        // Через 3 секунды закрываем окно и сбрасываем форму
        setTimeout(() => {
          setIsOpen(false);
          setIsSuccess(false);
          setShowConfetti(false);
          setStep(0);
          setBriefData({ name: "", service: "", budget: "", contact: "" });
        }, 3000);
      } catch (error) {
        console.error("Error submitting brief:", error);
        alert("Произошла ошибка при отправке. Попробуйте позже.");
      }
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const currentQuestion = questions[step];
  const currentValue = briefData[currentQuestion.id];
  const canProceed = currentValue && currentValue.trim() !== "";

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 z-[150] transition-all duration-500 ease-in-out ${
          isOpen
            ? "scale-0 opacity-0"
            : isTransitioning
            ? "scale-90 opacity-0"
            : "scale-100 opacity-100"
        } ${
          scrolled
            ? "right-6"
            : "left-1/2 -translate-x-1/2"
        }`}
      >
        <div className="relative group">
          {/* Пульсирующие круги */}
          <div className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-75"></div>
          <div className="absolute inset-0 rounded-full bg-orange-500 animate-pulse"></div>

          {/* Летающие логотипы полукругом */}
          <img
            src={logoClaro}
            alt="CLARO"
            className="absolute -left-24 -top-12 w-12 h-12 object-contain opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
          />
          <img
            src={logoClaro}
            alt="CLARO"
            className="absolute -left-28 top-8 w-12 h-12 object-contain opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 group-hover:scale-110 group-hover:-rotate-6"
          />
          <img
            src={logoClaro}
            alt="CLARO"
            className="absolute -left-20 top-24 w-12 h-12 object-contain opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 group-hover:scale-110 group-hover:rotate-6"
          />

          {/* Основная кнопка */}
          <div className="relative bg-orange-500 hover:bg-orange-600 text-white rounded-full p-5 shadow-2xl transition-all duration-300 group-hover:scale-110">
            <div className="flex items-center gap-3">
              <span className="font-black text-lg whitespace-nowrap">{t("floatingBrief.button")}</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
          </div>
        </div>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-[150] transition-all duration-500 ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-0 opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <div className="bg-black border-2 border-orange-500 rounded-3xl shadow-2xl w-[380px] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
              <div>
                <div className="font-black text-white text-lg">{t("floatingBrief.title")}</div>
                <div className="text-white/80 text-xs">{t("floatingBrief.step")} {step + 1} {t("floatingBrief.of")} {questions.length}</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-black transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-neutral-900">
            <div
              className="h-full bg-orange-500 transition-all duration-300"
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Content */}
          <div className="p-6 min-h-[300px] flex flex-col">
            {/* Success Screen */}
            {isSuccess ? (
              <div className="flex-1 flex flex-col items-center justify-center animate-[fadeIn_0.5s_ease-out]">
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
                <h3 className="text-2xl font-black text-white mb-2 text-center animate-[slideUp_0.5s_ease-out]">
                  {t("floatingBrief.successMessage")}
                </h3>
                <p className="text-neutral-400 text-center animate-[slideUp_0.5s_ease-out_0.1s_both]">
                  {t("floatingBrief.successDescription")}
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
                {/* Question */}
                <div className="mb-6">
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-4 mb-4 animate-[slideIn_0.3s_ease-out]">
                <p className="text-white font-bold text-lg">{currentQuestion.question}</p>
              </div>

              {/* Input */}
              {currentQuestion.type === "text" ? (
                <input
                  type="text"
                  value={currentValue}
                  onChange={(e) =>
                    setBriefData({ ...briefData, [currentQuestion.id]: e.target.value })
                  }
                  placeholder={currentQuestion.placeholder}
                  className="w-full px-4 py-3 bg-neutral-900 border-2 border-neutral-700 focus:border-orange-500 rounded-xl text-white placeholder-neutral-500 outline-none transition-colors"
                  onKeyPress={(e) => e.key === "Enter" && canProceed && handleNext()}
                />
              ) : (
                <div className="space-y-2">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setBriefData({ ...briefData, [currentQuestion.id]: option });
                        setTimeout(handleNext, 300);
                      }}
                      className={`w-full px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                        currentValue === option
                          ? "bg-orange-500 text-white scale-105"
                          : "bg-neutral-900 text-white hover:bg-neutral-800 hover:scale-102"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="mt-auto flex gap-3">
              {step > 0 && (
                <button
                  onClick={handleBack}
                  className="px-6 py-3 bg-neutral-800 text-white rounded-xl font-bold hover:bg-neutral-700 transition-colors"
                >
                  {t("floatingBrief.buttons.back")}
                </button>
              )}
              {currentQuestion.type === "text" && (
                <button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all ${
                    canProceed
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                  }`}
                >
                  {step === questions.length - 1 ? t("floatingBrief.buttons.submit") : t("floatingBrief.buttons.next")}
                </button>
              )}
            </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
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
    </>
  );
}
