import { motion, useReducedMotion } from "motion/react";

const ITEMS = [
  "🧁 پخت تازه روزانه",
  "🌿 بدون نگهدارنده مصنوعی",
  "📦 بسته‌بندی محافظ ویژه پست",
  "🚚 ارسال به سراسر ایران",
  "💚 گزینه رژیمی و دیابتی",
  "🏠 دست‌پخت خانگی",
];

export function Marquee({
  items = ITEMS,
  duration = 28,
}: {
  items?: string[];
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const doubled = [...items, ...items];

  if (reduce) {
    return (
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
        {items.map((t) => (
          <span key={t} className="text-sm font-medium">
            {t}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((t, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-2 text-sm font-medium"
            style={{ color: "var(--primary-dark)" }}
          >
            {t}
            <span className="opacity-40" aria-hidden="true">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default Marquee;
