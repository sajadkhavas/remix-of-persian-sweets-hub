import { Link } from "@tanstack/react-router";
import type { ProductCategoryDefinition } from "@/data/categories";

export function RelatedCategories({ categories }: { categories: ProductCategoryDefinition[] }) {
  if (categories.length === 0) return null;

  return (
    <section
      aria-labelledby="related-categories-heading"
      className="rounded-3xl border border-border bg-white p-5 shadow-sm"
    >
      <h2 id="related-categories-heading" className="mb-4 text-2xl font-extrabold">
        دسته‌های مرتبط
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            to="/products/$categorySlug"
            params={{ categorySlug: category.slug }}
            className="flex min-h-20 items-center justify-between gap-3 rounded-2xl border border-border bg-accent/40 px-4 py-3 font-bold transition hover:border-primary hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span>{category.name}</span>
            <span aria-hidden="true" className="text-2xl">
              {category.visual.placeholder}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
