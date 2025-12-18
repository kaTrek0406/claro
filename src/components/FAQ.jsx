import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: t("faq.items.0.question"),
      answer: t("faq.items.0.answer"),
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
      border: "border-cyan-400/30",
    },
    {
      question: t("faq.items.1.question"),
      answer: t("faq.items.1.answer"),
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      border: "border-orange-500/30",
    },
    {
      question: t("faq.items.2.question"),
      answer: t("faq.items.2.answer"),
      color: "text-pink-400",
      bg: "bg-pink-400/10",
      border: "border-pink-400/30",
    },
    {
      question: t("faq.items.3.question"),
      answer: t("faq.items.3.answer"),
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      border: "border-purple-400/30",
    },
    {
      question: t("faq.items.4.question"),
      answer: t("faq.items.4.answer"),
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      border: "border-yellow-400/30",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block text-6xl mb-6">❓</div>
          <h2 className="text-[8vw] md:text-[5vw] lg:text-[3.5vw] leading-[0.95] font-black uppercase tracking-tight">
            {t("faq.title.part1")} <span className="text-cyan-400">{t("faq.title.part2")}</span>
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-2 rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === index ? `${faq.bg} ${faq.border}` : "border-white/10 bg-neutral-900/50"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <h3 className={`text-lg md:text-xl font-black uppercase tracking-tight pr-4 ${
                  openIndex === index ? faq.color : "text-white"
                }`}>
                  {faq.question}
                </h3>
                <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg ${
                  openIndex === index ? faq.bg : "bg-white/10"
                } transition-all duration-300`}>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    } ${openIndex === index ? faq.color : "text-white"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5">
                  <p className="text-neutral-300 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-neutral-400 mb-4">Не нашли ответ на свой вопрос?</p>
          <a
            href="#contacts"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-black uppercase tracking-tight rounded-full hover:bg-orange-600 transition-colors"
          >
            Напишите нам
            <span className="text-xl">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}