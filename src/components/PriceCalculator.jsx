import { useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { sendToTelegram } from "../utils/telegram";

const services = [
  {
    id: "google_ads",
    icon: "🎯",
    pricePerMonth: 500,
    color: "text-yellow-400",
    borderColor: "border-yellow-400",
    bgColor: "bg-yellow-400/10",
  },
  {
    id: "meta_ads",
    icon: "📣",
    pricePerMonth: 600,
    color: "text-cyan-400",
    borderColor: "border-cyan-400",
    bgColor: "bg-cyan-400/10",
  },
  {
    id: "youtube_ads",
    icon: "▶️",
    pricePerMonth: 700,
    color: "text-pink-400",
    borderColor: "border-pink-400",
    bgColor: "bg-pink-400/10",
  },
  {
    id: "telegram_ads",
    icon: "💬",
    pricePerMonth: 400,
    color: "text-orange-500",
    borderColor: "border-orange-500",
    bgColor: "bg-orange-500/10",
  },
];

// Regex constant to avoid recreation on every validation call
const MOLDOVAN_PHONE_REGEX = /^\+373[0-9]{8}$/;

// Multi-service discount tiers
const getMultiServiceDiscount = (serviceCount) => {
  if (serviceCount >= 4) return 0.8; // 20% discount
  if (serviceCount >= 3) return 0.85; // 15% discount
  if (serviceCount >= 2) return 0.9; // 10% discount
  return 1; // No discount
};

const getMultiServiceDiscountLabel = (serviceCount) => {
  if (serviceCount >= 4) return "20%";
  if (serviceCount >= 3) return "15%";
  if (serviceCount >= 2) return "10%";
  return null;
};

export default function PriceCalculator() {
  const { t } = useTranslation();
  const [selectedServices, setSelectedServices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [phone, setPhone] = useState("");
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  const toggleService = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
    // Show phone input when at least one service is selected
    if (!selectedServices.includes(serviceId)) {
      setTimeout(() => setShowPhoneInput(true), 300);
    }
  };

  // Memoize phone validation to avoid recreation
  const validateMoldovanPhone = useCallback((phoneNumber) => {
    // Moldovan phone format: +373 XX XXX XXX or variations
    // Accepts: +373XXXXXXXX, +373 XX XXX XXX, etc.
    const cleaned = phoneNumber.replace(/\s/g, '');
    return MOLDOVAN_PHONE_REGEX.test(cleaned);
  }, []);

  const formatPhoneNumber = useCallback((value) => {
    // Remove all non-digits except +
    const cleaned = value.replace(/[^\d+]/g, '');

    // Ensure it starts with +373
    if (!cleaned.startsWith('+373')) {
      if (cleaned.startsWith('373')) {
        return '+' + cleaned;
      } else if (cleaned.startsWith('+')) {
        return '+373';
      } else if (cleaned.length > 0) {
        return '+373' + cleaned;
      }
      return '+373';
    }

    // Limit to +373 + 8 digits
    return cleaned.slice(0, 12);
  }, []);

  const handlePhoneChange = useCallback((e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  }, [formatPhoneNumber]);

  // Memoize phone validation result
  const isPhoneValid = useMemo(
    () => validateMoldovanPhone(phone),
    [phone, validateMoldovanPhone]
  );

  // Memoize total calculation to prevent recalculation on every render
  const { total, originalTotal, multiServiceDiscount } = useMemo(() => {
    let sum = 0;

    selectedServices.forEach((serviceId) => {
      const service = services.find((s) => s.id === serviceId);
      if (service) {
        sum += service.pricePerMonth;
      }
    });

    const originalTotal = Math.round(sum);
    const multiServiceMultiplier = getMultiServiceDiscount(selectedServices.length);
    const discountLabel = getMultiServiceDiscountLabel(selectedServices.length);
    const finalTotal = Math.round(sum * multiServiceMultiplier);

    return {
      total: finalTotal,
      originalTotal: originalTotal,
      multiServiceDiscount: discountLabel
    };
  }, [selectedServices]);

  const handleSubmit = async () => {
    if (selectedServices.length === 0 || !isPhoneValid || isSubmitting) return;

    try {
      setIsSubmitting(true);

      const selectedServiceNames = selectedServices
        .map(id => {
          const service = services.find(s => s.id === id);
          return service ? `${service.icon} ${t(`calculator.services.${id}.name`)}` : '';
        })
        .filter(Boolean)
        .join(", ");

      const message = `Калькулятор стоимости:\n\n📱 Телефон: ${phone}\nУслуги: ${selectedServiceNames}\nИтого: $${total}`;

      await sendToTelegram({ message }, "Price Calculator");

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setSelectedServices([]);
        setPhone("");
        setShowPhoneInput(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting calculator:", error);
      alert("Произошла ошибка при отправке. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl leading-[0.95] font-black uppercase tracking-tight mb-4 max-w-4xl mx-auto">
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

        {/* Total and CTA */}
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border-2 border-white/10 rounded-2xl p-8 overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-neutral-400 text-sm mb-2">
                Итоговая стоимость
                {multiServiceDiscount && (
                  <span className="ml-2 text-green-400 font-bold">
                    🎉 Скидка за {selectedServices.length} услуги
                  </span>
                )}
              </div>

              {/* Show original price crossed out if multi-service discount applies */}
              {multiServiceDiscount && originalTotal !== total ? (
                <div className="flex items-baseline gap-3 flex-wrap">
                  <div className="text-3xl font-black text-neutral-500 line-through">
                    ${originalTotal}
                  </div>
                  <div className="text-5xl font-black text-white">
                    ${total}
                  </div>
                  <div className="px-3 py-1 bg-green-500/20 border border-green-500 rounded-full">
                    <span className="text-green-400 font-black text-sm">
                      -{multiServiceDiscount}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-5xl font-black text-white">
                  ${total}
                </div>
              )}

              {selectedServices.length === 0 && (
                <div className="text-sm text-neutral-500 mt-2">Выберите услуги</div>
              )}
            </div>

            <div className="flex flex-col items-end gap-3">
              {/* Phone Input - slides down from button */}
              <div
                className={`w-full md:w-auto transition-all duration-500 origin-top ${
                  showPhoneInput && selectedServices.length > 0
                    ? "opacity-100 max-h-24 translate-y-0"
                    : "opacity-0 max-h-0 -translate-y-4 pointer-events-none"
                }`}
              >
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="+373 XX XXX XXX"
                    className={`w-full md:w-64 px-4 py-3 rounded-xl border-2 bg-neutral-800 text-white font-semibold transition-all ${
                      phone.length > 0
                        ? isPhoneValid
                          ? "border-green-500 focus:border-green-400"
                          : "border-red-500 focus:border-red-400"
                        : "border-white/20 focus:border-cyan-400"
                    } focus:outline-none`}
                  />
                  {phone.length > 0 && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {isPhoneValid ? (
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>
                  )}
                </div>
                {phone.length > 0 && !isPhoneValid && (
                  <p className="text-xs text-red-400 mt-1 ml-1">
                    Формат: +373 + 8 цифр
                  </p>
                )}
              </div>

              {/* Button */}
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
                  disabled={selectedServices.length === 0 || !isPhoneValid || isSubmitting}
                  className="px-8 py-4 bg-orange-500 text-white font-black uppercase tracking-tight rounded-full hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 whitespace-nowrap"
                >
                  {isSubmitting ? "Отправка..." : "Получить консультацию →"}
                </button>
              )}
            </div>
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