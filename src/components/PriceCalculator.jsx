import { useState } from "react";
import { useTranslation } from "react-i18next";
import { sendToTelegram } from "../utils/telegram";

const services = [
  {
    id: "targeting",
    icon: "🎯",
    pricePerMonth: 500,
    color: "text-purple-400",
    borderColor: "border-purple-400",
    bgColor: "bg-purple-400/10",
  },
  {
    id: "smm",
    icon: "📱",
    pricePerMonth: 400,
    color: "text-cyan-400",
    borderColor: "border-cyan-400",
    bgColor: "bg-cyan-400/10",
  },
  {
    id: "website",
    icon: "💻",
    pricePerMonth: 1000,
    color: "text-pink-400",
    borderColor: "border-pink-400",
    bgColor: "bg-pink-400/10",
    oneTime: true,
  },
  {
    id: "automation",
    icon: "🤖",
    pricePerMonth: 600,
    color: "text-orange-400",
    borderColor: "border-orange-400",
    bgColor: "bg-orange-400/10",
    oneTime: true,
  },
];

const durations = [
  { value: 1, label: "1 месяц", multiplier: 1 },
  { value: 3, label: "3 месяца", multiplier: 0.95, discount: "5%" },
  { value: 6, label: "6 месяцев", multiplier: 0.9, discount: "10%" },
  { value: 12, label: "12 месяцев", multiplier: 0.85, discount: "15%" },
];

export default function PriceCalculator() {
  const { t } = useTranslation();
  const [selectedServices, setSelectedServices] = useState([]);
  const [duration, setDuration] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleService = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotal = () => {
    const selectedDuration = durations.find((d) => d.value === duration);
    let total = 0;

    selectedServices.forEach((serviceId) => {
      const service = services.find((s) => s.id === serviceId);
      if (service) {
        if (service.oneTime) {
          total += service.pricePerMonth;
        } else {
          total += service.pricePerMonth * duration * selectedDuration.multiplier;
        }
      }
    });

    return Math.round(total);
  };

  const handleSubmit = async () => {
    if (selectedServices.length === 0 || isSubmitting) return;

    try {
      setIsSubmitting(true);

      const selectedServiceNames = selectedServices
        .map(id => {
          const service = services.find(s => s.id === id);
          return service ? `${service.icon} ${t(`calculator.services.${id}.name`)}` : '';
        })
        .filter(Boolean)
        .join(", ");

      const message = `Калькулятор стоимости:\n\nУслуги: ${selectedServiceNames}\nДлительность: ${duration} мес.\nИтого: $${calculateTotal()}`;

      await sendToTelegram({ message }, "Price Calculator");

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setSelectedServices([]);
        setDuration(1);
      }, 3000);
    } catch (error) {
      console.error("Error submitting calculator:", error);
      alert("Произошла ошибка при отправке. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = calculateTotal();
  const selectedDuration = durations.find((d) => d.value === duration);

  return (
    <div className="px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block text-6xl mb-6">💰</div>
          <h2 className="text-[8vw] md:text-[5vw] lg:text-[3.5vw] leading-[0.95] font-black uppercase tracking-tight mb-4">
            {t("calculator.title.part1")}{" "}
            <span className="text-cyan-400">{t("calculator.title.part2")}</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            {t("calculator.subtitle")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {services.map((service) => {
            const isSelected = selectedServices.includes(service.id);
            return (
              <button
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                  isSelected
                    ? `${service.bgColor} ${service.borderColor} scale-105`
                    : "border-white/10 bg-neutral-900/50 hover:border-white/20"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{service.icon}</div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? `${service.borderColor} ${service.bgColor}`
                        : "border-white/30"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        className={`w-4 h-4 ${service.color}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <h3 className={`text-xl font-black uppercase tracking-tight mb-2 ${isSelected ? service.color : "text-white"}`}>
                  {t(`calculator.services.${service.id}.name`)}
                </h3>
                <p className="text-sm text-neutral-400 mb-3">
                  {t(`calculator.services.${service.id}.description`)}
                </p>
                <div className={`text-2xl font-black ${isSelected ? service.color : "text-white"}`}>
                  ${service.pricePerMonth}
                  {!service.oneTime && <span className="text-sm text-neutral-400">/мес</span>}
                  {service.oneTime && <span className="text-sm text-neutral-400"> разово</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Duration Selector */}
        {selectedServices.some(id => !services.find(s => s.id === id)?.oneTime) && (
          <div className="mb-8">
            <h3 className="text-xl font-black uppercase tracking-tight mb-4">
              {t("calculator.duration")}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {durations.map((dur) => (
                <button
                  key={dur.value}
                  onClick={() => setDuration(dur.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    duration === dur.value
                      ? "border-cyan-400 bg-cyan-400/10 scale-105"
                      : "border-white/10 bg-neutral-900/50 hover:border-white/20"
                  }`}
                >
                  <div className={`font-black ${duration === dur.value ? "text-cyan-400" : "text-white"}`}>
                    {dur.label}
                  </div>
                  {dur.discount && (
                    <div className="text-xs text-green-400 mt-1">
                      -{dur.discount}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Total and CTA */}
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border-2 border-white/10 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-neutral-400 text-sm mb-2">Итоговая стоимость</div>
              <div className="text-5xl font-black text-white">
                ${total}
                {selectedServices.length > 0 && selectedDuration.discount && (
                  <span className="ml-3 text-sm text-green-400">
                    скидка {selectedDuration.discount}
                  </span>
                )}
              </div>
              {selectedServices.length === 0 && (
                <div className="text-sm text-neutral-500 mt-2">Выберите услуги</div>
              )}
            </div>

            {isSuccess ? (
              <div className="flex items-center gap-3 px-6 py-4 bg-green-500/20 border-2 border-green-500 rounded-xl">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-bold text-green-400">Спасибо! Скоро свяжемся</span>
              </div>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={selectedServices.length === 0 || isSubmitting}
                className="px-8 py-4 bg-orange-500 text-white font-black uppercase tracking-tight rounded-full hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              >
                {isSubmitting ? "Отправка..." : "Получить консультацию →"}
              </button>
            )}
          </div>
        </div>

        {/* Note */}
        <p className="text-center text-neutral-500 text-sm mt-6">
          * Цены указаны ориентировочно. Точная стоимость рассчитывается индивидуально.
        </p>
      </div>
    </div>
  );
}