import { useState, useEffect, useRef } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const faqRef = useRef(null);

  const websites = [
    {
      title: "Landing page",
      description: "Одностраничный сайт под одну услугу или конкретный оффер. Подходит для рекламы, быстрых запусков и сбора заявок.",
      features: [
        "запуск рекламы",
        "тест ниши или услуги",
        "быстрый старт"
      ],
      price: "от $150",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      border: "border-yellow-400/30",
    },
    {
      title: "Многостраничный сайт",
      description: "Сайт с несколькими страницами: услуги, о компании, контакты. Подходит для бизнеса, который планирует развиваться и продвигаться в SEO.",
      features: [
        "несколько услуг или направлений",
        "долгосрочное продвижение",
        "повышение доверия"
      ],
      price: "от $250",
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
      border: "border-cyan-400/30",
    },
    {
      title: "Интернет-магазин",
      description: "Полноценный сайт для онлайн-продаж с каталогом, корзиной и оформлением заказов.",
      features: [
        "продажа товаров онлайн",
        "приём заказов и оплат",
        "масштабирование бизнеса"
      ],
      price: "от $400",
      color: "text-pink-400",
      bg: "bg-pink-400/10",
      border: "border-pink-400/30",
    },
    {
      title: "Автоматизация",
      description: "Telegram-боты, интеграции с CRM, автоматические воронки продаж и другие решения для оптимизации бизнес-процессов.",
      features: [
        "автоматизация заявок и коммуникации",
        "интеграции с сервисами",
        "экономия времени и ресурсов"
      ],
      price: "от $300",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      border: "border-orange-500/30",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setTimeout(() => {
              setOpenIndex(0);
              setHasAnimated(true);
            }, 300);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (faqRef.current) {
      observer.observe(faqRef.current);
    }

    return () => {
      if (faqRef.current) {
        observer.unobserve(faqRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div ref={faqRef} className="px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block text-6xl mb-6">💻</div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl leading-[0.95] font-black uppercase tracking-tight max-w-4xl mx-auto">
            Создание <span className="text-cyan-400">сайтов</span>
          </h2>
        </div>

        {/* Website Items */}
        <div className="space-y-4">
          {websites.map((website, index) => (
            <div
              key={index}
              className={`border-2 rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === index ? `${website.bg} ${website.border}` : "border-white/10 bg-neutral-900/50"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex-1">
                  <h3 className={`text-lg md:text-xl font-black uppercase tracking-tight ${
                    openIndex === index ? website.color : "text-white"
                  }`}>
                    {website.title}
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-lg md:text-xl font-black ${
                    openIndex === index ? website.color : "text-white"
                  }`}>
                    {website.price}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg ${
                    openIndex === index ? website.bg : "bg-white/10"
                  } transition-all duration-300`}>
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      } ${openIndex === index ? website.color : "text-white"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 space-y-4">
                  <p className="text-neutral-300 leading-relaxed">
                    {website.description}
                  </p>

                  <div>
                    <p className="text-sm font-bold text-neutral-400 mb-2">Когда выбирать:</p>
                    <ul className="space-y-1">
                      {website.features.map((feature, idx) => (
                        <li key={idx} className="text-neutral-300 text-sm flex items-start gap-2">
                          <span className={website.color}>—</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-neutral-400 mb-4">Нужен сайт? Обсудим ваш проект!</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+37379950191"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-400 text-black font-black uppercase tracking-tight rounded-full hover:bg-cyan-500 transition-colors"
            >
              <span className="text-xl">📞</span>
              Позвонить
            </a>
            <a
              href="https://t.me/Grigorii314"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-black uppercase tracking-tight rounded-full hover:bg-orange-600 transition-colors"
            >
              Написать в Telegram
              <span className="text-xl">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}