import { useState, useMemo, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { sendToTelegram } from "../utils/telegram";

// Multi-service discount tiers - applied ONLY to base prices
const getMultiServiceDiscount = (serviceCount) => {
  if (serviceCount >= 4) return 0.2; // 20%
  if (serviceCount >= 3) return 0.15; // 15%
  if (serviceCount >= 2) return 0.1; // 10%
  return 0; // No discount
};

const getMultiServiceDiscountPercent = (serviceCount) => {
  if (serviceCount >= 4) return 20;
  if (serviceCount >= 3) return 15;
  if (serviceCount >= 2) return 10;
  return 0;
};

// Regex for Moldovan phone validation
const MOLDOVAN_PHONE_REGEX = /^\+373[0-9]{8}$/;

export default function PriceCalculator() {
  const { t } = useTranslation();
  const calculatorRef = useRef(null);

  // State management
  const [step, setStep] = useState(1); // 1 = selection, 2 = phone/submit
  const [transitioning, setTransitioning] = useState(false);
  const [nextStep, setNextStep] = useState(null);
  const [selected, setSelected] = useState(new Set());
  const [open, setOpen] = useState(new Set());
  const [addOns, setAddOns] = useState(new Map());
  const [budget, setBudget] = useState(new Map());
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Get services from translations
  const services = useMemo(() => {
    const servicesData = t('calculator.services', { returnObjects: true });
    return ['meta_ads', 'google_ads', 'youtube_ads', 'telegram_ads'].map(id => ({
      id,
      ...servicesData[id]
    }));
  }, [t]);

  // Phone validation
  const validateMoldovanPhone = useCallback((phoneNumber) => {
    const cleaned = phoneNumber.replace(/\s/g, '');
    return MOLDOVAN_PHONE_REGEX.test(cleaned);
  }, []);

  const formatPhoneNumber = useCallback((value) => {
    const cleaned = value.replace(/[^\d+]/g, '');
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
    return cleaned.slice(0, 12);
  }, []);

  const handlePhoneChange = useCallback((e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  }, [formatPhoneNumber]);

  const isPhoneValid = useMemo(
    () => validateMoldovanPhone(phone),
    [phone, validateMoldovanPhone]
  );

  // Smooth step transition with crossfade
  const changeStep = useCallback((newStep) => {
    if (transitioning || step === newStep) return;

    // Scroll to calculator top on mobile (только если нужно)
    if (calculatorRef.current && window.innerWidth < 1024) {
      const rect = calculatorRef.current.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.top <= window.innerHeight * 0.3;

      // Скроллим только если калькулятор не в верхней части экрана
      if (!isVisible) {
        calculatorRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }

    setNextStep(newStep);
    setTransitioning(true);
    setTimeout(() => {
      setStep(newStep);
      setTransitioning(false);
      setNextStep(null);
    }, 300); // Match fadeOut duration
  }, [step, transitioning]);

  // Toggle service selection
  const toggleService = useCallback((serviceId) => {
    setSelected(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(serviceId)) {
        newSelected.delete(serviceId);
        // Clean up related state
        setOpen(o => {
          const newOpen = new Set(o);
          newOpen.delete(serviceId);
          return newOpen;
        });
        setAddOns(a => {
          const newAddOns = new Map(a);
          newAddOns.delete(serviceId);
          return newAddOns;
        });
        setBudget(b => {
          const newBudget = new Map(b);
          newBudget.delete(serviceId);
          return newBudget;
        });
      } else {
        newSelected.add(serviceId);
        setOpen(o => new Set([...o, serviceId]));
        // Set default budget level
        setBudget(b => {
          const newBudget = new Map(b);
          newBudget.set(serviceId, 'b1');
          return newBudget;
        });
      }
      return newSelected;
    });
  }, []);

  // Toggle service expansion
  const toggleOpen = useCallback((serviceId) => {
    if (!selected.has(serviceId)) return;
    setOpen(prev => {
      const newOpen = new Set(prev);
      if (newOpen.has(serviceId)) {
        newOpen.delete(serviceId);
      } else {
        newOpen.add(serviceId);
      }
      return newOpen;
    });
  }, [selected]);

  // Toggle add-on
  const toggleAddOn = useCallback((serviceId, addOnId) => {
    setAddOns(prev => {
      const newAddOns = new Map(prev);
      const serviceAddOns = newAddOns.get(serviceId) || new Set();
      const newServiceAddOns = new Set(serviceAddOns);

      if (newServiceAddOns.has(addOnId)) {
        newServiceAddOns.delete(addOnId);
      } else {
        newServiceAddOns.add(addOnId);
      }

      newAddOns.set(serviceId, newServiceAddOns);
      return newAddOns;
    });
  }, []);

  // Set budget level
  const selectBudget = useCallback((serviceId, budgetId) => {
    setBudget(prev => {
      const newBudget = new Map(prev);
      newBudget.set(serviceId, budgetId);
      return newBudget;
    });
  }, []);

  // Calculate totals
  const calculation = useMemo(() => {
    const selectedServices = services.filter(s => selected.has(s.id));
    const count = selectedServices.length;

    if (count === 0) {
      return {
        count: 0,
        baseSum: 0,
        addonsSum: 0,
        budgetsSum: 0,
        discount: 0,
        discountPercent: 0,
        oldTotal: 0,
        newTotal: 0,
        breakdown: []
      };
    }

    const baseSum = selectedServices.reduce((acc, s) => acc + s.base, 0);
    let addonsSum = 0;
    let budgetsSum = 0;

    const breakdown = selectedServices.map(s => {
      const serviceAddOns = addOns.get(s.id) || new Set();
      const selectedAddOnsData = Array.from(serviceAddOns)
        .map(aid => s.addOns.find(a => a.id === aid))
        .filter(Boolean);

      const addonsTotal = selectedAddOnsData.reduce((acc, a) => acc + a.price, 0);
      addonsSum += addonsTotal;

      const budgetId = budget.get(s.id);
      const budgetData = s.budgets.find(b => b.id === budgetId);
      const budgetFee = budgetData ? budgetData.fee : 0;
      budgetsSum += budgetFee;

      return {
        service: s,
        addons: selectedAddOnsData,
        addonsTotal,
        budget: budgetData,
        budgetFee,
        lineTotal: s.base + addonsTotal + budgetFee
      };
    });

    const discountPercent = getMultiServiceDiscountPercent(count);
    const discountMultiplier = getMultiServiceDiscount(count);
    const discount = baseSum * discountMultiplier;

    const oldTotal = baseSum + addonsSum + budgetsSum;
    const newTotal = oldTotal - discount;

    return {
      count,
      baseSum,
      addonsSum,
      budgetsSum,
      discount,
      discountPercent,
      oldTotal,
      newTotal,
      breakdown
    };
  }, [services, selected, addOns, budget]);

  // Handle form submission
  const handleSubmit = async () => {
    if (calculation.count === 0 || !isPhoneValid || isSubmitting) return;

    try {
      setIsSubmitting(true);

      // Формируем детальное сообщение
      let message = `🧮 *КАЛЬКУЛЯТОР СТОИМОСТИ*\n\n`;
      message += `📱 *Телефон:* ${phone}\n`;
      message += `━━━━━━━━━━━━━━━━━━━━\n\n`;

      // Детализация по каждой услуге
      calculation.breakdown.forEach((row, index) => {
        message += `${row.service.icon} *${row.service.name}*\n`;
        message += `├ База: $${row.service.base}\n`;

        // Дополнительные услуги
        if (row.addons.length > 0) {
          row.addons.forEach((addon, i) => {
            const prefix = i === row.addons.length - 1 && !row.budget ? '└' : '├';
            message += `${prefix} ${addon.name}: +$${addon.price}\n`;
          });
        }

        // Бюджет
        if (row.budget) {
          message += `└ ${row.budget.name}: +$${row.budget.fee}\n`;
        }

        message += `*Итого: $${Math.round(row.lineTotal)}*\n`;

        if (index < calculation.breakdown.length - 1) {
          message += `\n`;
        }
      });

      message += `\n━━━━━━━━━━━━━━━━━━━━\n`;

      // Финальный расчет
      if (calculation.discountPercent > 0) {
        message += `Сумма без скидки: $${Math.round(calculation.oldTotal)}\n`;
        message += `🎉 Скидка ${calculation.discountPercent}% (на базы): -$${Math.round(calculation.discount)}\n`;
        message += `━━━━━━━━━━━━━━━━━━━━\n`;
      }

      message += `💰 *ИТОГО К ОПЛАТЕ: $${Math.round(calculation.newTotal)}*`;

      await sendToTelegram({ message }, "Price Calculator");

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setSelected(new Set());
        setOpen(new Set());
        setAddOns(new Map());
        setBudget(new Map());
        setPhone("");
        setStep(1);
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
      <div ref={calculatorRef} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl leading-[0.95] font-bold uppercase tracking-tight mb-4">
            {t("calculator.title.part1")}{" "}
            <span className="text-cyan-400">{t("calculator.title.part2")}</span>
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg max-w-3xl mx-auto font-normal">
            {t("calculator.subtitle")}
          </p>
        </div>

        {/* Step 1: Service Selection */}
        {(step === 1 || (transitioning && nextStep === 1)) && (
          <div
            key="step-1"
            className={`grid lg:grid-cols-[2fr_1fr] gap-6 items-start ${
              step === 1 && transitioning && nextStep === 2 ? 'animate-fadeOut' : 'animate-fadeIn'
            }`}
          >
            {/* Services Cards */}
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service) => {
                const isSelected = selected.has(service.id);
                const isOpen = open.has(service.id);
                const serviceAddOns = addOns.get(service.id) || new Set();
                const selectedBudget = budget.get(service.id);

                return (
                  <div
                    key={service.id}
                    className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                      isSelected
                        ? "border-cyan-400/50 bg-cyan-400/5"
                        : "border-white/10 bg-neutral-900/50"
                    }`}
                  >
                    {/* Card Header */}
                    <div
                      onClick={() => !isSelected ? toggleService(service.id) : toggleOpen(service.id)}
                      className="p-5 cursor-pointer hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4 items-start flex-1">
                          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl flex-shrink-0">
                            {service.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-black text-base sm:text-lg uppercase tracking-tight mb-2 text-white">
                              {service.name}
                            </h3>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                              {t('calculator.baseLabel')}: <span className="font-bold">${service.base}</span>
                            </p>
                            <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                              {t('calculator.includes')}: {service.includes.join(', ')}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <span className="text-base font-black whitespace-nowrap">
                            {t('calculator.priceFrom')} ${service.base}
                          </span>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleService(service.id);
                            }}
                            className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                              isSelected
                                ? "bg-cyan-400/20 border-cyan-400"
                                : "border-white/30"
                            }`}
                          >
                            {isSelected && (
                              <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Content (Add-ons + Budget) */}
                    {isSelected && isOpen && (
                      <div className="border-t border-white/10 bg-black/20 p-5 space-y-5">
                        {/* Add-ons */}
                        <div>
                          <p className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-3">
                            {t('calculator.addOnsTitle')}
                          </p>
                          <div className="space-y-2">
                            {service.addOns.map((addOn) => (
                              <label
                                key={addOn.id}
                                className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
                              >
                                <input
                                  type="checkbox"
                                  checked={serviceAddOns.has(addOn.id)}
                                  onChange={() => toggleAddOn(service.id, addOn.id)}
                                  className="accent-cyan-400 w-4 h-4"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-semibold">{addOn.name}</div>
                                  <div className="text-xs text-neutral-400 mt-0.5">{addOn.hint}</div>
                                </div>
                                <div className="text-sm font-black whitespace-nowrap">+ ${addOn.price}</div>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Budget Levels */}
                        <div>
                          <p className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-3">
                            {t('calculator.budgetTitle')}
                          </p>
                          <div className="grid grid-cols-3 gap-2">
                            {service.budgets.map((budgetOption) => (
                              <label
                                key={budgetOption.id}
                                className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <input
                                    type="radio"
                                    name={`budget-${service.id}`}
                                    checked={selectedBudget === budgetOption.id}
                                    onChange={() => selectBudget(service.id, budgetOption.id)}
                                    className="accent-cyan-400 w-4 h-4"
                                  />
                                  <span className="text-xs font-bold">{budgetOption.label}</span>
                                </div>
                                <div className="text-sm font-black mb-1">
                                  {budgetOption.fee > 0 ? `+ $${budgetOption.fee}` : '+ $0'}
                                </div>
                                <div className="text-xs text-neutral-400 leading-tight">{budgetOption.hint}</div>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Compact Summary Sidebar */}
            <div className="sticky top-4 bg-gradient-to-br from-neutral-900 to-neutral-800 border-2 border-white/10 rounded-2xl p-6">
              <h3 className="font-black text-lg uppercase mb-4">{t('calculator.summaryTitle')}</h3>

              {calculation.count === 0 ? (
                <p className="text-sm text-neutral-400 mb-6">
                  {t('calculator.summaryEmpty')}
                </p>
              ) : (
                <>
                  {calculation.discountPercent > 0 && (
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1.5 text-sm font-black bg-green-500/20 border border-green-500/50 rounded-full text-green-400">
                        {t('calculator.discountPill', { percent: calculation.discountPercent })}
                      </span>
                    </div>
                  )}

                  <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
                    {calculation.discountPercent > 0
                      ? t('calculator.summaryHintWithDiscount', { count: calculation.count, percent: calculation.discountPercent })
                      : t('calculator.summaryHintNoDiscount')}
                  </p>
                </>
              )}

              {/* Price Display */}
              <div className="mb-6">
                {calculation.discountPercent > 0 && (
                  <div className="text-2xl font-bold text-neutral-500 line-through mb-2">
                    ${Math.round(calculation.oldTotal)}
                  </div>
                )}
                <div className="text-5xl font-black text-white">
                  ${Math.round(calculation.newTotal)}
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={() => changeStep(2)}
                disabled={calculation.count === 0}
                className="w-full px-6 py-4 bg-orange-500 text-white text-base font-black uppercase tracking-tight rounded-full hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              >
                Далее →
              </button>

              <p className="text-center text-neutral-500 text-xs mt-4 leading-tight">
                {calculation.count > 0 ? `Выбрано услуг: ${calculation.count}` : 'Выберите хотя бы одну услугу'}
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Phone & Submit */}
        {(step === 2 || (transitioning && nextStep === 2)) && (
          <div
            key="step-2"
            className={`max-w-2xl mx-auto ${
              step === 2 && transitioning && nextStep === 1 ? 'animate-fadeOut' : 'animate-fadeIn'
            }`}
          >
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border-2 border-white/10 rounded-2xl p-6 sm:p-8">
              {/* Back Button */}
              <button
                onClick={() => changeStep(1)}
                className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-6 font-semibold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Назад к выбору
              </button>

              <h3 className="font-black text-2xl uppercase mb-6">{t('calculator.summaryTitle')}</h3>

              {/* Full Breakdown */}
              <div className="space-y-3 mb-6">
                {calculation.breakdown.map((row) => (
                  <div
                    key={row.service.id}
                    className="p-4 rounded-xl border border-white/10 bg-white/5"
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="text-sm font-black flex items-center gap-2">
                        <span className="text-xl">{row.service.icon}</span>
                        {row.service.name}
                      </div>
                      <div className="text-sm font-black">${Math.round(row.lineTotal)}</div>
                    </div>
                    <div className="text-xs text-neutral-400 leading-relaxed space-y-1">
                      <div>{t('calculator.basePriceLabel')}: ${row.service.base}</div>
                      {row.addons.map((a, i) => (
                        <div key={i}>+ {a.name}: ${a.price}</div>
                      ))}
                      {row.budget && (
                        <div>
                          + {t('calculator.budgetTitle')} ({row.budget.label}):{" "}
                          ${row.budget.fee}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Discount Line */}
                {calculation.discountPercent > 0 && (
                  <div className="p-4 rounded-xl border border-green-500/50 bg-green-500/10">
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <div className="text-sm font-black text-green-400">
                        {t('calculator.discountLabel', { count: calculation.count })}
                      </div>
                      <div className="text-sm font-black text-green-400">
                        - ${Math.round(calculation.discount)}
                      </div>
                    </div>
                    <div className="text-xs text-neutral-400">
                      {t('calculator.baseLabel')}: ${Math.round(calculation.baseSum)} · {t('calculator.discountPill', { percent: calculation.discountPercent })}
                    </div>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="border-t border-white/10 pt-6 mb-6">
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <span className="text-lg font-bold text-neutral-400">Итого:</span>
                  {calculation.discountPercent > 0 && (
                    <div className="text-xl font-bold text-neutral-500 line-through">
                      ${Math.round(calculation.oldTotal)}
                    </div>
                  )}
                </div>
                <div className="text-5xl font-black text-white text-right">
                  ${Math.round(calculation.newTotal)}
                </div>
              </div>

              {/* Phone Input */}
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder={t('calculator.phonePlaceholder')}
                    className={`w-full px-5 py-4 text-base rounded-xl border-2 bg-neutral-800 text-white font-semibold transition-all ${
                      phone.length > 0
                        ? isPhoneValid
                          ? "border-green-500 focus:border-green-400"
                          : "border-red-500 focus:border-red-400"
                        : "border-white/20 focus:border-cyan-400"
                    } focus:outline-none`}
                  />
                  {phone.length > 0 && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      {isPhoneValid ? (
                        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>
                  )}
                </div>

                {/* CTA Button */}
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
                    disabled={!isPhoneValid || isSubmitting}
                    className="w-full px-6 py-4 bg-orange-500 text-white text-base font-black uppercase tracking-tight rounded-full hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                  >
                    {isSubmitting ? "Отправка..." : t('calculator.ctaButton')}
                  </button>
                )}

                <p className="text-center text-neutral-500 text-xs leading-tight">
                  {t('calculator.note')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
