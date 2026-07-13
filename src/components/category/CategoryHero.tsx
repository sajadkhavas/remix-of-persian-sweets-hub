import { Link } from "@tanstack/react-router";
import type { ProductCategoryDefinition } from "@/data/categories";

export function CategoryHero({ category }: { category: ProductCategoryDefinition }) {
  return (
    <section className="grid gap-6 rounded-3xl border border-border bg-white p-5 shadow-sm md:p-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
      <div>
        <Link
          to="/products"
          className="mb-4 inline-flex min-h-10 items-center rounded-full bg-accent px-4 py-2 text-sm font-bold text-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          بازگشت به همه محصولات
        </Link>
        <h1 className="text-3xl font-extrabold leading-10 md:text-4xl">{category.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
          {category.description}
        </p>
      </div>
      <div
        className="flex min-h-56 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-light via-accent-cream to-white"
        role="img"
        aria-label={category.visual.alt}
      >
        <span className="text-8xl" aria-hidden="true">
          {category.visual.placeholder}
        </span>
      </div>
    </section>
  );
}
