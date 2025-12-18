import { useState } from "react";

const testimonials = [
  {
    quote: "Работает с данными как никто другой. Полный контроль над проектом и внимание к деталям на высшем уровне.",
    author: "Александр Попов",
    position: "CEO, TechStart",
    company: "TechStart",
    bgColor: "bg-emerald-400",
    textColor: "text-emerald-950",
  },
  {
    quote: "Всегда ищет новые решения для каждого проекта. Любопытство и проактивность добавляют огромную ценность нашим кампаниям.",
    author: "Мария Ионеску",
    position: "Marketing Director",
    company: "ZUDDI",
    bgColor: "bg-purple-500",
    textColor: "text-purple-950",
  },
  {
    quote: "Основа нашей дизайн-команды. Невероятное внимание к деталям и исследованиям приносит магию в каждый проект.",
    author: "Сергей Волков",
    position: "Lead Designer",
    company: "Creative Lab",
    bgColor: "bg-amber-400",
    textColor: "text-amber-950",
  },
  {
    quote: "Выдающееся внимание к деталям. Ключевая роль в редизайне нашего сайта - результат просто потрясающий!",
    author: "Анна Михайлова",
    position: "Product Manager",
    company: "ZUDDI",
    bgColor: "bg-rose-400",
    textColor: "text-rose-950",
  },
];

export default function Testimonials() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div>
      <div className="text-center mb-16">
        <div className="inline-block text-6xl mb-6">💬</div>
        <h2 className="text-[8vw] md:text-[5vw] lg:text-[3.5vw] leading-[0.95] font-black uppercase tracking-tight">
          Добрые слова, <span className="text-cyan-400">большой буст</span>
        </h2>
      </div>

      <div className="pb-12 pt-4 -mx-4 md:-mx-8 lg:-mx-12">
        <div className="flex gap-6 animate-[scroll_30s_linear_infinite]">
          {[...testimonials, ...testimonials, ...testimonials].map((testimonial, idx) => (
          <div
            key={idx}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="flex-shrink-0 w-[450px] snap-start"
          >
            <div
              className={`h-full ${testimonial.bgColor} rounded-2xl p-8 transition-all duration-300 cursor-pointer overflow-hidden ${
                hoveredIndex === idx ? "scale-105 -rotate-3" : "scale-100 rotate-0"
              }`}
            >
              <div className={`${testimonial.textColor} mb-6 text-lg leading-relaxed font-semibold`}>
                "{testimonial.quote}"
              </div>

              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full ${testimonial.textColor} bg-black/10 flex items-center justify-center text-2xl font-black`}>
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className={`font-black ${testimonial.textColor} uppercase tracking-tight text-lg`}>
                    {testimonial.author}
                  </div>
                  <div className={`text-sm ${testimonial.textColor} opacity-70`}>{testimonial.position}</div>
                  <div className={`text-xs ${testimonial.textColor} font-bold opacity-80`}>{testimonial.company}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
      `}</style>
    </div>
  );
}
