import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function ServicesAccordion() {
  const { t } = useTranslation();
  const items = t("services.items", { returnObjects: true });
  const [open, setOpen] = useState(-1);
  const [hasAnimated, setHasAnimated] = useState(false);
  const accordionRef = useRef(null);

  const colors = [
    "text-yellow-400",
    "text-cyan-400",
    "text-pink-400",
    "text-orange-500",
    "text-purple-400"
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setTimeout(() => {
              setOpen(0);
              setHasAnimated(true);
            }, 300);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (accordionRef.current) {
      observer.observe(accordionRef.current);
    }

    return () => {
      if (accordionRef.current) {
        observer.unobserve(accordionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div ref={accordionRef} className="space-y-0">
      {items.map((it, idx) => {
        const isOpen = open === idx;
        const color = colors[idx % colors.length];

        return (
          <button
            key={idx}
            onClick={() => setOpen(isOpen ? -1 : idx)}
            className="w-full text-left border-b border-white/10 py-5 hover:text-white transition-colors group"
          >
            <div className="flex items-center justify-between gap-4">
              <div className={`text-xl font-bold uppercase tracking-tight transition-colors ${
                isOpen ? color : "text-neutral-400 group-hover:text-white"
              }`}>
                {it.title}
              </div>
              <div className={`text-3xl font-light transition-all duration-300 ${
                isOpen ? color : "text-neutral-500"
              }`} style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                +
              </div>
            </div>

            <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"}`}>
              <div className={`overflow-hidden text-sm leading-relaxed ${
                isOpen ? color : "text-neutral-400"
              }`}>
                {it.text}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
