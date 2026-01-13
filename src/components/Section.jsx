import clsx from "clsx";
import { useInViewOnce } from "../hooks/useInViewOnce";

export default function Section({ id, className, children }) {
  const { ref, seen } = useInViewOnce();

  return (
    <section id={id} className="py-16">
      <div
        ref={ref}
        className={clsx(
          "transition duration-700",
          seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          className
        )}
      >
        {children}
      </div>
    </section>
  );
}
