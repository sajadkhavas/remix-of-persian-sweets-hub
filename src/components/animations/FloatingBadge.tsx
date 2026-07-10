import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function FloatingBadge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
      animate={
        reduce
          ? { opacity: 1, scale: 1, rotate: 0 }
          : { opacity: 1, scale: 1, rotate: 0, y: [0, -6, 0] }
      }
      transition={{
        opacity: { duration: 0.5, delay: 0.6 },
        scale: { duration: 0.5, delay: 0.6, type: "spring", stiffness: 200 },
        y: reduce
          ? undefined
          : { duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
      }}
    >
      {children}
    </motion.div>
  );
}

export default FloatingBadge;
