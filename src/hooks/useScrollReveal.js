import { useEffect, useRef, useState } from "react";

/**
 * Hook for scroll reveal animations using Intersection Observer
 * @param {Object} options - Intersection Observer options
 * @returns {Object} - { ref, isVisible }
 */
export default function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const defaultOptions = {
      threshold: 0.1,
      triggerOnce: true,
      rootMargin: "0px 0px -100px 0px",
      ...options,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (defaultOptions.triggerOnce) {
          observer.unobserve(element);
        }
      } else if (!defaultOptions.triggerOnce) {
        setIsVisible(false);
      }
    }, defaultOptions);

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);

  return { ref, isVisible };
}