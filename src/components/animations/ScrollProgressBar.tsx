import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.2,
  });
  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        transformOrigin: "right", // RTL: bar fills from right to left
        background: "var(--primary)",
      }}
      className="fixed inset-x-0 top-0 z-50 h-[3px]"
    />
  );
}

export default ScrollProgressBar;
