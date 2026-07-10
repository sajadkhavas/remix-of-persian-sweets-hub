import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function AnimatedStep({ number }: { number: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? number : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, number, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, number, reduce]);

  return (
    <span ref={ref} aria-label={String(number)}>
      {value.toLocaleString("fa-IR")}
    </span>
  );
}

export default AnimatedStep;
