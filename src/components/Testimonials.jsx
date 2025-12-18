import { useState, useEffect, useRef } from "react";

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
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 1.5; // pixels per frame
    const cardWidth = 450 + 24; // width + gap in pixels (1.5rem = 24px)
    const totalWidth = cardWidth * testimonials.length;

    const scroll = () => {
      scrollPosition += scrollSpeed;

      // Reset position when we've scrolled one full set
      if (scrollPosition >= totalWidth) {
        scrollPosition = 0;
      }

      scrollContainer.style.transform = `translateX(-${scrollPosition}px)`;
      requestAnimationFrame(scroll);
    };

    const animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const TestimonialCard = ({ testimonial, id }) => (
    <div
      key={id}
      onMouseEnter={() => setHoveredIndex(id)}
      onMouseLeave={() => setHoveredIndex(null)}
      className="flex-shrink-0 w-[280px] sm:w-[350px] md:w-[450px] snap-start"
    >
      <div
        className={`h-full ${testimonial.bgColor} rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 transition-all duration-300 cursor-pointer overflow-hidden ${
          hoveredIndex === id ? "md:scale-105 md:-rotate-3" : "scale-100 rotate-0"
        }`}
      >
        <div className={`${testimonial.textColor} mb-4 sm:mb-6 text-sm sm:text-base md:text-lg leading-relaxed font-semibold`}>
          "{testimonial.quote}"
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full ${testimonial.textColor} bg-black/10 flex items-center justify-center text-lg sm:text-xl md:text-2xl font-black`}>
            {testimonial.author.charAt(0)}
          </div>
          <div>
            <div className={`font-black ${testimonial.textColor} uppercase tracking-tight text-sm sm:text-base md:text-lg`}>
              {testimonial.author}
            </div>
            <div className={`text-xs sm:text-sm ${testimonial.textColor} opacity-70`}>{testimonial.position}</div>
            <div className={`text-xs ${testimonial.textColor} font-bold opacity-80`}>{testimonial.company}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-12 sm:mb-16">
        <div className="inline-block text-5xl sm:text-6xl mb-4 sm:mb-6">💬</div>
        <h2 className="text-[10vw] sm:text-[8vw] md:text-[5vw] lg:text-[3.5vw] leading-[0.95] font-black uppercase tracking-tight">
          Добрые слова, <span className="text-cyan-400">большой буст</span>
        </h2>
      </div>

      <div className="pb-8 sm:pb-12 pt-4 pl-4 sm:pl-6 md:pl-[calc((100vw-80rem)/2+1.5rem)] lg:pl-[calc((100vw-80rem)/2+1.5rem)]">
        <div ref={scrollRef} className="flex gap-4 sm:gap-6">
          {[...testimonials, ...testimonials, ...testimonials].map((testimonial, idx) => (
            <TestimonialCard key={idx} testimonial={testimonial} id={`card-${idx}`} />
          ))}
        </div>
      </div>
    </div>
  );
}