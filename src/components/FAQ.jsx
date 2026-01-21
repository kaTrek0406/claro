import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const faqRef = useRef(null);

  const websiteColors = [
    {
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      border: "border-yellow-400/30",
    },
    {
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
      border: "border-cyan-400/30",
    },
    {
      color: "text-pink-400",
      bg: "bg-pink-400/10",
      border: "border-pink-400/30",
    },
    {
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      border: "border-orange-500/30",
    },
  ];

  const websites = t('websites.types', { returnObjects: true }).map((type, index) => ({
    ...type,
    ...websiteColors[index]
  }));

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
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl leading-[0.95] font-bold uppercase tracking-tight max-w-4xl mx-auto">
            {t('websites.title')} <span className="text-cyan-400">{t('websites.titleHighlight')}</span>
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
                className="w-full px-4 py-4 md:px-6 md:py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex-1 min-w-0 pr-2">
                  <h3 className={`text-sm sm:text-base md:text-lg lg:text-xl font-black uppercase tracking-tight ${
                    openIndex === index ? website.color : "text-white"
                  }`}>
                    {website.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                  <span className={`text-sm sm:text-base md:text-lg lg:text-xl font-black whitespace-nowrap ${
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
                    <p className="text-sm font-bold text-neutral-400 mb-2">{website.featuresTitle}</p>
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
          <p className="text-neutral-400 mb-4">{t('websites.cta')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+37376909069"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-400 text-black font-black uppercase tracking-tight rounded-full hover:bg-cyan-500 transition-colors"
            >
              <span className="text-xl">📞</span>
              {t('websites.callButton')}
            </a>
            <a
              href="https://t.me/Claro_md"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-black uppercase tracking-tight rounded-full hover:bg-orange-600 transition-colors"
            >
              {t('websites.telegramButton')}
              <span className="text-xl">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}