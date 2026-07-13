import { Link } from "@tanstack/react-router";
import type { BlogCategory } from "@/data/blog";

export function BlogCategoryCard({
  category,
  articleCount,
}: {
  category: BlogCategory;
  articleCount: number;
}) {
  return (
    <Link
      to="/blog/category/$categorySlug"
      params={{ categorySlug: category.slug }}
      className="group rounded-3xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="text-4xl" aria-hidden="true">
        {category.icon}
      </div>
      <h2 className="mt-4 text-xl font-extrabold text-accent-foreground group-hover:text-primary">
        {category.name}
      </h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{category.description}</p>
      <span className="mt-5 inline-flex rounded-full bg-accent px-3 py-1 text-xs font-bold text-muted-foreground">
        {articleCount.toLocaleString("fa-IR")} مقاله
      </span>
    </Link>
  );
}
