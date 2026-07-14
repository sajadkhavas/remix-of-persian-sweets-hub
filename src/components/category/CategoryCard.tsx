import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ProductCategoryDefinition } from "@/data/categories";
import { toPersianDigits } from "@/lib/format";
import { CATEGORY_IMAGE } from "@/lib/product-images";

export function CategoryCard({
  category,
  productCount,
}: {
  category: ProductCategoryDefinition;
  productCount: number;
}) {
  const isComingSoon = productCount === 0;
  const image = CATEGORY_IMAGE[category.slug];

  return (
    <Link
      to="/products/$categorySlug"
      params={{ categorySlug: category.slug }}
      className="group relative flex aspect-[3/4] flex-col overflow-hidden rounded-2xl bg-[color:var(--accent-brown)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent-gold)]"
    >
      <img
        src={image}
        alt={category.visual.alt}
        width={800}
        height={1000}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--accent-brown)]/95 via-[color:var(--accent-brown)]/40 to-transparent" />

      <div className="relative mt-auto flex flex-col gap-3 p-6 text-white">
        <span className="inline-flex w-fit items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.24em] backdrop-blur">
          {isComingSoon ? "به‌زودی" : `${toPersianDigits(productCount)} محصول`}
        </span>
        <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight">
          {category.name}
        </h3>
        <p className="line-clamp-2 text-sm leading-7 text-white/80">{category.description}</p>
        <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent-gold)] transition-transform group-hover:translate-x-[-4px]">
          {isComingSoon ? "برنامه این دسته" : "کاوش دسته"}
          <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
        </span>
      </div>
    </Link>
  );
}
