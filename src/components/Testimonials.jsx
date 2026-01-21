import { useState, useEffect, useRef, useMemo, memo } from "react";
import { useTranslation } from "react-i18next";

const testimonialColors = [
  {
    bgColor: "bg-emerald-400",
    textColor: "text-emerald-950",
  },
  {
    bgColor: "bg-purple-500",
    textColor: "text-purple-950",
  },
  {
    bgColor: "bg-amber-400",
    textColor: "text-amber-950",
  },
  {
    bgColor: "bg-rose-400",
    textColor: "text-rose-950",
  },
];

// Extract TestimonialCard outside to prevent recreation on every render
const TestimonialCard = memo(({ testimonial, id, hoveredIndex, onHover }) => (
  <div
    onMouseEnter={() => onHover(id)}
    onMouseLeave={() => onHover(null)}
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
));

TestimonialCard.displayName = 'TestimonialCard';

export default function Testimonials() {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const scrollRef = useRef(null);

  const testimonials = useMemo(() => {
    const items = t('testimonials.items', { returnObjects: true });
    return items.map((item, index) => ({
      ...item,
      ...testimonialColors[index]
    }));
  }, [t]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Calculate responsive card width and gap
    const getCardWidth = () => {
      const width = window.innerWidth;
      let cardWidth = 280; // mobile default
      let gap = 16; // gap-4 = 1rem = 16px

      if (width >= 640) { // sm breakpoint
        cardWidth = 350;
        gap = 24; // gap-6 = 1.5rem = 24px
      }
      if (width >= 768) { // md breakpoint
        cardWidth = 450;
        gap = 24; // gap-6 = 1.5rem = 24px
      }

      return cardWidth + gap;
    };

    let totalCardWidth = getCardWidth();
    let singleSetWidth = totalCardWidth * testimonials.length;

    // Start from the middle set (second set of 4 cards)
    let scrollPosition = singleSetWidth;
    let scrollSpeed = 1.5; // pixels per frame

    // Update on resize
    const handleResize = () => {
      const oldCardWidth = totalCardWidth;
      totalCardWidth = getCardWidth();
      singleSetWidth = totalCardWidth * testimonials.length;

      // Adjust scroll position proportionally to maintain visual position
      scrollPosition = (scrollPosition / oldCardWidth) * totalCardWidth;
    };

    window.addEventListener('resize', handleResize);

    // Set initial position immediately
    scrollContainer.style.transform = `translateX(-${scrollPosition}px)`;

    const scroll = () => {
      scrollPosition += scrollSpeed;

      // When we reach the end of second set, reset to start of second set
      // This creates seamless infinite loop
      if (scrollPosition >= singleSetWidth * 2) {
        scrollPosition = singleSetWidth;
      }

      scrollContainer.style.transform = `translateX(-${scrollPosition}px)`;
      requestAnimationFrame(scroll);
    };

    const animationFrame = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Memoize tripled array to prevent recreation on every render
  const tripledTestimonials = useMemo(
    () => [...testimonials, ...testimonials, ...testimonials],
    []
  );

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-12 sm:mb-16">
        <div className="inline-block text-5xl sm:text-6xl mb-4 sm:mb-6">💬</div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl leading-[0.95] font-bold uppercase tracking-tight max-w-4xl mx-auto">
          {t('testimonials.title')} <span className="text-cyan-400">{t('testimonials.titleHighlight')}</span>.
        </h2>
      </div>

      <div className="pb-8 sm:pb-12 pt-4 pl-4 sm:pl-6 md:pl-[calc((100vw-80rem)/2+1.5rem)] lg:pl-[calc((100vw-80rem)/2+1.5rem)]">
        <div ref={scrollRef} className="flex gap-4 sm:gap-6">
          {tripledTestimonials.map((testimonial, idx) => (
            <TestimonialCard
              key={idx}
              testimonial={testimonial}
              id={`card-${idx}`}
              hoveredIndex={hoveredIndex}
              onHover={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
}