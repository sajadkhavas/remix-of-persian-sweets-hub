import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function StaggerContainer({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  const reduce = useReducedMotion();
  const MotionTag =
    Tag === "ul" ? motion.ul : Tag === "ol" ? motion.ol : motion.div;
  return (
    <MotionTag
      className={className}
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "visible"}
      viewport={{ once: true, margin: "-60px" }}
      variants={containerVariants}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const MotionTag = Tag === "li" ? motion.li : motion.div;
  return (
    <MotionTag className={className} variants={itemVariants}>
      {children}
    </MotionTag>
  );
}
