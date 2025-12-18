import { useEffect, useRef } from "react";

export default function ScrollingBanner({ text, bgColor = "bg-orange-500", textColor = "text-white" }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 1.5; // pixels per frame
    const textWidth = scrollContainer.scrollWidth / 3; // Width of one set

    const scroll = () => {
      scrollPosition += scrollSpeed;

      // Reset position when we've scrolled one full set
      if (scrollPosition >= textWidth) {
        scrollPosition = 0;
      }

      scrollContainer.style.transform = `translateX(-${scrollPosition}px)`;
      requestAnimationFrame(scroll);
    };

    const animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className={`w-full ${bgColor} py-4 overflow-hidden -rotate-2 my-16`}>
      <div ref={scrollRef} className="flex whitespace-nowrap">
        {/* Repeat text 3 times for seamless loop */}
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className="flex items-center shrink-0">
            <span className={`text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight ${textColor} px-6`}>
              {text}
            </span>
            <span className={`text-2xl md:text-3xl lg:text-4xl font-black ${textColor}`}>
              •
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}