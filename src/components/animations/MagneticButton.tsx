import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { useRef, type ReactNode, type MouseEvent } from "react";

export function MagneticButton({
  children,
  className,
  href,
  target,
  rel,
  onClick,
  strength = 0.25,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });
  const reduce = useReducedMotion();

  function handleMove(e: MouseEvent) {
    if (reduce || !window.matchMedia("(hover: hover)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const commonProps = {
    className,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    style: { x: sx, y: sy },
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        {...commonProps}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      {...commonProps}
    >
      {children}
    </motion.button>
  );
}

export default MagneticButton;
