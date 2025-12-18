import { useEffect, useRef, useState } from "react";

export function useInViewOnce(options = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, options);
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen, options]);

  return { ref, seen };
}
