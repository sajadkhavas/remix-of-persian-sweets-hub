import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import type { Product, ProductBadge } from "@/data/types";
import { formatToman, toPersianDigits } from "@/lib/format";
import { useCartStore } from "@/lib/cart";
import { getProductImage } from "@/lib/product-images";

const BADGE_LABEL: Record<ProductBadge, string> = {
  bestseller: "پرفروش",
  diet: "رژیمی",
  diabetic: "بدون قند افزوده",
  special: "ویژه",
  new: "جدید",
};

export function ProductCard({ product }: { product: Product }) {
  const badgeLabel = product.badge ? BADGE_LABEL[product.badge] : null;
  const addItem = useCartStore((s) => s.addItem);
  const inCart = useCartStore((s) => s.items.some((i) => i.id === product.id));
  const image = getProductImage(product.slug, product.category);

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--border)] bg-card"
    >
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-[4/5] overflow-hidden bg-[color:var(--accent-cream)]"
      >
        <img
          src={image}
          alt={product.name}
          width={800}
          height={1000}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--primary-dark)]/45 via-transparent to-transparent" />
        {badgeLabel ? (
          <span className="absolute end-3 top-3 rounded-full bg-[color:var(--accent-gold)] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white shadow-sm">
            {badgeLabel}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display truncate text-lg font-semibold tracking-tight text-[color:var(--accent-brown)]">
              <Link to="/product/$slug" params={{ slug: product.slug }} className="hover:text-[color:var(--accent-gold)]">
                {product.name}
              </Link>
            </h3>
            <p className="mt-1 line-clamp-1 text-xs leading-6 text-muted-foreground">
              {product.shortDescription}
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between gap-3 border-t border-dashed border-[color:var(--border)] pt-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">قیمت</p>
            <p className="mt-0.5 text-base font-bold text-[color:var(--accent-brown)]">
              {formatToman(product.priceToman)}
            </p>
            {product.weightGrams ? (
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {toPersianDigits(product.weightGrams)} گرم
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => {
              addItem({
                id: product.id,
                slug: product.slug,
                name: product.name,
                priceToman: product.priceToman,
                emoji: product.emoji ?? "🍪",
              });
              toast.success(`${product.name} به سبد خرید اضافه شد.`);
            }}
            aria-label={`افزودن ${product.name} به سبد خرید`}
            className="inline-flex h-11 items-center gap-1.5 rounded-full bg-[color:var(--primary-dark)] px-4 text-xs font-semibold text-white transition-all hover:bg-[color:var(--accent-gold)]"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
            {inCart ? "یکی دیگر" : "افزودن"}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
