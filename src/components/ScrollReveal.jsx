import useScrollReveal from "../hooks/useScrollReveal";

/**
 * ScrollReveal component with various animation types
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to reveal
 * @param {string} props.animation - Animation type: "fade-up", "fade-down", "fade-left", "fade-right", "scale", "rotate"
 * @param {number} props.delay - Delay in ms before animation starts
 * @param {number} props.duration - Animation duration in ms
 * @param {number} props.threshold - Intersection Observer threshold
 */
export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 800,
  threshold = 0.1,
  className = "",
}) {
  const { ref, isVisible } = useScrollReveal({ threshold });

  const animationClasses = {
    "fade-up": {
      initial: "opacity-0 translate-y-12",
      visible: "opacity-100 translate-y-0",
    },
    "fade-down": {
      initial: "opacity-0 -translate-y-12",
      visible: "opacity-100 translate-y-0",
    },
    "fade-left": {
      initial: "opacity-0 translate-x-12",
      visible: "opacity-100 translate-x-0",
    },
    "fade-right": {
      initial: "opacity-0 -translate-x-12",
      visible: "opacity-100 translate-x-0",
    },
    scale: {
      initial: "opacity-0 scale-75",
      visible: "opacity-100 scale-100",
    },
    rotate: {
      initial: "opacity-0 rotate-12 scale-75",
      visible: "opacity-100 rotate-0 scale-100",
    },
    blur: {
      initial: "opacity-0 blur-sm",
      visible: "opacity-100 blur-0",
    },
  };

  const selectedAnimation = animationClasses[animation] || animationClasses["fade-up"];

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${
        isVisible ? selectedAnimation.visible : selectedAnimation.initial
      } ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}