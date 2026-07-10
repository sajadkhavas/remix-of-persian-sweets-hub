import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { Product, ProductBadge } from "@/data/types";
import { formatToman } from "@/lib/format";

const BADGE_STYLE: Record<ProductBadge, { bg: string; color: string; label: string }> = {
  bestseller: { bg: "var(--accent-gold)", color: "white", label: "⭐ پرفروش" },
  diet: { bg: "#E8F5E0", color: "#5C7A4A", label: "🌿 رژیمی" },
  diabetic: { bg: "#FFF3E0", color: "#E65100", label: "💚 دیابتی" },
  special: { bg: "var(--primary-dark)", color: "white", label: "✨ ویژه" },
};

export function ProductCard({ product }: { product: Product }) {
  const badge = product.badge ? BADGE_STYLE[product.badge] : null;
  return (
    <motion.article
      layout
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm hover:shadow-xl"
    >
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block"
      >
        <div
          className="relative flex aspect-square items-center justify-center overflow-hidden"
          style={{ background: "var(--primary-light)" }}
          aria-hidden="true"
        >
          <motion.span
            className="text-6xl"
            whileHover={{ scale: 1.12, rotate: -4 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            {product.emoji ?? "🍪"}
          </motion.span>
          {badge ? (
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="absolute top-3 end-3 rounded-full px-3 py-1 text-xs font-semibold shadow-sm"
              style={{ background: badge.bg, color: badge.color }}
            >
              {badge.label}
            </motion.span>
          ) : null}
          {/* Hover overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <div className="p-4">
          <h3 className="text-base font-bold" style={{ color: "var(--accent-brown)" }}>
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
            {product.description}
          </p>
          <p
            className="mt-3 text-lg font-bold"
            style={{ color: "var(--primary-dark)" }}
          >
            {formatToman(product.priceToman)}
          </p>
        </div>
      </Link>
      <div className="mt-auto px-4 pb-4">
        <a
          href="https://wa.me/989212508746"
          target="_blank"
          rel="noopener"
          className="block w-full rounded-lg py-2 text-center text-sm font-semibold transition-colors hover:brightness-95"
          style={{ background: "var(--primary)", color: "var(--primary-dark)" }}
        >
          افزودن به سبد
        </a>
      </div>
    </motion.article>
  );
}
