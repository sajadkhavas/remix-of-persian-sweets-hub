import { Link } from "@tanstack/react-router";
import type { ProductCategoryDefinition } from "@/data/categories";
import { toPersianDigits } from "@/lib/format";

export function CategoryCard({
  category,
  productCount,
}: {
  category: ProductCategoryDefinition;
  productCount: number;
}) {
  const isComingSoon = productCount === 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition-shadow hover:shadow-lg">
      <Link
        to="/products/$categorySlug"
        params={{ categorySlug: category.slug }}
        className="flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        <div
          className="flex min-h-36 items-center justify-center bg-gradient-to-br from-primary-light to-accent-cream"
          aria-hidden="true"
        >
          <span className="text-6xl transition-transform group-hover:scale-110">
            {category.visual.placeholder}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xl font-extrabold">{category.name}</h3>
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary-dark">
              {isComingSoon ? "به‌زودی" : `${toPersianDigits(productCount)} محصول`}
            </span>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">{category.description}</p>
          <span className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:brightness-95">
            {isComingSoon ? "مشاهده برنامه این دسته" : "مشاهده محصولات"}
          </span>
        </div>
      </Link>
    </article>
  );
}
