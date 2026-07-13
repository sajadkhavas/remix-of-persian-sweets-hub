import { Link } from "@tanstack/react-router";
import type { BlogPost } from "@/data/blog";
import { formatPersianDate, getBlogCategory } from "@/data/blog";

export function BlogArticleCard({ post }: { post: BlogPost }) {
  const category = getBlogCategory(post.category);

  return (
    <article className="flex h-full flex-col rounded-3xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="text-4xl" aria-hidden="true">
          {post.emoji ?? category?.icon ?? "📝"}
        </span>
        {category ? (
          <Link
            to="/blog/category/$categorySlug"
            params={{ categorySlug: category.slug }}
            className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary"
          >
            {category.name}
          </Link>
        ) : null}
      </div>
      <h2 className="text-lg font-extrabold leading-8 text-accent-foreground">
        <Link to="/blog/$slug" params={{ slug: post.slug }} className="hover:text-primary">
          {post.title}
        </Link>
      </h2>
      <p className="mt-3 grow text-sm leading-8 text-muted-foreground">{post.excerpt}</p>
      <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
        <time dateTime={post.publishedAt}>{formatPersianDate(post.publishedAt)}</time>
        <span>{post.readingTime} مطالعه</span>
      </div>
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="mt-5 inline-flex w-fit rounded-full bg-primary px-5 py-2 text-sm font-bold text-white"
      >
        خواندن مقاله
      </Link>
    </article>
  );
}
