import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
}

const map = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 60, y: 0 },
  right: { x: -60, y: 0 },
};

export function RevealOnScroll({
  children,
  direction = "up",
  delay = 0,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const from = reduce ? { opacity: 0 } : { opacity: 0, ...map[direction] };
  const to = reduce ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      ref={ref}
      initial={from}
      animate={isInView ? to : from}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default RevealOnScroll;
