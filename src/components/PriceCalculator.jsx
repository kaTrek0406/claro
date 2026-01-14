import { useState, useMemo, useCallback } from "react";
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

  // State management
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

  // Helper to get add-ons set for a service
  const getAddOnsSet = useCallback((serviceId) => {
    if (!addOns.has(serviceId)) {
      const newSet = new Set();
      const newAddOns = new Map(addOns);
      newAddOns.set(serviceId, newSet);
      setAddOns(newAddOns);
      return newSet;
    }
    return addOns.get(serviceId);
  }, [addOns]);

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

      const lines = calculation.breakdown.map(row => {
        return `${row.service.icon} ${row.service.name}: $${Math.round(row.lineTotal)}`;
      });

      if (calculation.discountPercent > 0) {
        lines.push(`Скидка: -$${Math.round(calculation.discount)} (только базы)`);
      }

      const message = `Калькулятор стоимости:\n\n📱 Телефон: ${phone}\n\n${lines.join('\n')}\n\nИтого: $${Math.round(calculation.newTotal)}`;

      await sendToTelegram({ message }, "Price Calculator");

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setSelected(new Set());
        setOpen(new Set());
        setAddOns(new Map());
        setBudget(new Map());
        setPhone("");
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl leading-[0.95] font-black uppercase tracking-tight mb-4">
            {t("calculator.title.part1")}{" "}
            <span className="text-cyan-400">{t("calculator.title.part2")}</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-3xl mx-auto font-normal">
            {t("calculator.subtitle")}
          </p>
        </div>

        {/* Grid: Services + Summary */}
        <div className="grid lg:grid-cols-[1.55fr_0.95fr] gap-4 items-start">
          {/* Services Cards */}
          <div className="grid md:grid-cols-2 gap-3">
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
                    className="p-4 cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex gap-3 items-start flex-1">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl flex-shrink-0">
                          {service.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-black text-sm uppercase tracking-tight mb-1 text-white">
                            {service.name}
                          </h3>
                          <p className="text-xs text-neutral-400">
                            {t('calculator.baseLabel')}: <span className="font-bold">${service.base}</span> · {t('calculator.includes')}: {service.includes.slice(0, 2).join(' • ')}{service.includes.length > 2 ? ' • …' : ''}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-sm font-black whitespace-nowrap">
                          {t('calculator.priceFrom')} ${service.base}
                        </span>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleService(service.id);
                          }}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
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
                    <div className="border-t border-white/10 bg-black/20 p-4 space-y-4">
                      {/* Add-ons */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                          {t('calculator.addOnsTitle')}
                        </p>
                        <div className="space-y-2">
                          {service.addOns.map((addOn) => (
                            <label
                              key={addOn.id}
                              className="flex items-center gap-2 p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
                            >
                              <input
                                type="checkbox"
                                checked={serviceAddOns.has(addOn.id)}
                                onChange={() => toggleAddOn(service.id, addOn.id)}
                                className="accent-cyan-400"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-semibold">{addOn.name}</div>
                                <div className="text-xs text-neutral-400">{addOn.hint}</div>
                              </div>
                              <div className="text-xs font-black whitespace-nowrap">+ ${addOn.price}</div>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Budget Levels */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                          {t('calculator.budgetTitle')}
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {service.budgets.map((budgetOption) => (
                            <label
                              key={budgetOption.id}
                              className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
                            >
                              <div className="flex items-center gap-1 mb-1">
                                <input
                                  type="radio"
                                  name={`budget-${service.id}`}
                                  checked={selectedBudget === budgetOption.id}
                                  onChange={() => selectBudget(service.id, budgetOption.id)}
                                  className="accent-cyan-400"
                                />
                                <span className="text-xs font-bold">{budgetOption.label}</span>
                              </div>
                              <div className="text-xs font-black mb-1">
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

          {/* Summary Sidebar */}
          <div className="sticky top-4 bg-gradient-to-br from-neutral-900 to-neutral-800 border-2 border-white/10 rounded-2xl p-4 lg:p-6">
            <div className="flex items-start justify-between gap-2 mb-3">
              <h3 className="font-black text-sm uppercase">{t('calculator.summaryTitle')}</h3>
              {calculation.discountPercent > 0 && (
                <span className="px-2 py-1 text-xs font-black bg-green-500/20 border border-green-500/50 rounded-full text-green-400 whitespace-nowrap">
                  {t('calculator.discountPill', { percent: calculation.discountPercent })}
                </span>
              )}
            </div>

            <p className="text-xs text-neutral-400 mb-4">
              {calculation.count === 0
                ? t('calculator.summaryEmpty')
                : calculation.discountPercent > 0
                ? t('calculator.summaryHintWithDiscount', { count: calculation.count, percent: calculation.discountPercent })
                : t('calculator.summaryHintNoDiscount')}
            </p>

            {/* Price Display */}
            <div className="flex items-baseline justify-between gap-3 mb-4">
              {calculation.discountPercent > 0 && (
                <div className="text-xl font-bold text-neutral-500 line-through">
                  ${Math.round(calculation.oldTotal)}
                </div>
              )}
              <div className="text-4xl font-black text-white ml-auto">
                ${Math.round(calculation.newTotal)}
              </div>
            </div>

            {/* Breakdown */}
            {calculation.count > 0 && (
              <div className="space-y-2 mb-4">
                {calculation.breakdown.map((row) => (
                  <div
                    key={row.service.id}
                    className="p-3 rounded-xl border border-white/10 bg-white/5"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="text-xs font-black">
                        {row.service.name}{" "}
                        <span className="text-neutral-400 font-bold">
                          ({t('calculator.basePriceLabel')} ${row.service.base})
                        </span>
                      </div>
                      <div className="text-xs font-black">${Math.round(row.lineTotal)}</div>
                    </div>
                    {(row.addons.length > 0 || row.budget) && (
                      <div className="text-xs text-neutral-400 leading-tight">
                        {row.addons.map((a, i) => (
                          <div key={i}>{a.name}: +${a.price}</div>
                        ))}
                        {row.budget && (
                          <div>
                            {t('calculator.budgetTitle')} {row.budget.label}:{" "}
                            {row.budget.fee > 0 ? `+ $${row.budget.fee}` : '+ $0'}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {/* Discount Line */}
                {calculation.discountPercent > 0 && (
                  <div className="p-3 rounded-xl border border-green-500/50 bg-green-500/10">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-xs font-black text-green-400">
                        {t('calculator.discountLabel', { count: calculation.count })}{" "}
                        <span className="text-neutral-400">
                          ({t('calculator.discountOnlyBases')})
                        </span>
                      </div>
                      <div className="text-xs font-black text-green-400">
                        - ${Math.round(calculation.discount)}
                      </div>
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">
                      {t('calculator.baseLabel')}: ${Math.round(calculation.baseSum)} · {t('calculator.discountPill', { percent: calculation.discountPercent })}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="border-t border-white/10 pt-4 space-y-3">
              {/* Phone Input */}
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder={t('calculator.phonePlaceholder')}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-neutral-800 text-white font-semibold transition-all ${
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

              {/* CTA Button */}
              {isSuccess ? (
                <div className="flex items-center gap-3 px-6 py-3 bg-green-500/20 border-2 border-green-500 rounded-xl">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-bold text-green-400">Спасибо! Скоро свяжемся</span>
                </div>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={calculation.count === 0 || !isPhoneValid || isSubmitting}
                  className="w-full px-6 py-3 bg-orange-500 text-white font-black uppercase tracking-tight rounded-full hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                >
                  {isSubmitting ? "Отправка..." : t('calculator.ctaButton')}
                </button>
              )}
            </div>

            {/* Note */}
            <p className="text-center text-neutral-500 text-xs mt-3 leading-tight">
              {t('calculator.note')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
