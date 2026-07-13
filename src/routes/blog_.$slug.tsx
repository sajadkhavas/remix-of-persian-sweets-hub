import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  findPost,
  getBlogCategory,
  getRelatedPosts,
  getRelatedProductsForPost,
  formatPersianDate,
} from "@/data/blog";
import { buildSeo } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleJsonLd } from "@/components/jsonld/ArticleJsonLd";
import { BlogArticleCard } from "@/components/blog/BlogArticleCard";
import { BlogRelatedProducts } from "@/components/blog/BlogRelatedProducts";
import { SITE } from "@/lib/site";
import ogDefault from "@/assets/og-default.jpg";

export const Route = createFileRoute("/blog_/$slug")({
  loader: ({ params }) => {
    const post = findPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) =>
    buildSeo({
      title: loaderData?.post.seo.title ?? "مقاله پیدا نشد",
      description: loaderData?.post.seo.description ?? "",
      path: loaderData ? `/blog/${loaderData.post.slug}` : "/blog",
      image: ogDefault,
      type: "article",
      noindex: !loaderData,
    }),
  component: BlogPostPage,
});

function renderContent(content: string) {
  const blocks: Array<{ type: "heading" | "paragraph" | "list"; content: string | string[] }> = [];
  const lines = content.split("\n");
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push({ type: "list", content: listItems });
      listItems = [];
    }
  };

  for (const line of lines) {
    if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
      continue;
    }

    flushList();
    if (line.startsWith("## ")) blocks.push({ type: "heading", content: line.slice(3) });
    else if (line.trim()) blocks.push({ type: "paragraph", content: line });
  }
  flushList();

  return blocks.map((block, index) => {
    if (block.type === "heading") {
      return (
        <h2 key={index} className="mb-3 mt-8 text-2xl font-bold text-accent-foreground">
          {block.content}
        </h2>
      );
    }

    if (block.type === "list") {
      return (
        <ul key={index} className="mb-6 list-disc space-y-2 pr-6 text-[#4a3a32]">
          {(block.content as string[]).map((item) => (
            <li key={item} className="leading-9">
              {item}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p key={index} className="mb-4 leading-9 text-[#4a3a32]">
        {block.content}
      </p>
    );
  });
}

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const category = getBlogCategory(post.category);
  const related = getRelatedPosts(post.slug, 2);
  const relatedProducts = getRelatedProductsForPost(post);
  const postUrl = `${SITE.origin}/blog/${post.slug}`;
  const crumbs = [
    { name: "خانه", path: "/" },
    { name: "بلاگ", path: "/blog" },
    ...(category ? [{ name: category.name, path: `/blog/category/${category.slug}` }] : []),
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  return (
    <div dir="rtl" className="space-y-10">
      <BreadcrumbJsonLd items={crumbs} />
      <ArticleJsonLd
        headline={post.title}
        description={post.seo.description}
        author={post.author}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
        image={`${SITE.origin}${ogDefault}`}
        path={`/blog/${post.slug}`}
      />
      <article className="mx-auto max-w-4xl">
        <Breadcrumbs items={crumbs} />
        <header className="mb-10 mt-6 rounded-[2rem] bg-accent p-6 shadow-sm md:p-10">
          {category ? (
            <Link
              to="/blog/category/$categorySlug"
              params={{ categorySlug: category.slug }}
              className="mb-5 inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-bold text-primary"
            >
              {category.icon} {category.name}
            </Link>
          ) : null}
          <h1 className="text-4xl font-extrabold leading-[1.6] text-accent-foreground md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 leading-8 text-muted-foreground">{post.excerpt}</p>
          <div className="mt-6 flex flex-wrap gap-4 rounded-xl bg-white/70 p-5 text-sm text-muted-foreground">
            <span>✍️ {post.author}</span>
            <time dateTime={post.publishedAt}>📅 {formatPersianDate(post.publishedAt)}</time>
            {post.updatedAt !== post.publishedAt ? (
              <time dateTime={post.updatedAt}>
                به‌روزرسانی: {formatPersianDate(post.updatedAt)}
              </time>
            ) : null}
            <span>⏱ {post.readingTime} مطالعه</span>
          </div>
          <div
            className="mt-6 flex aspect-[16/9] items-center justify-center rounded-3xl bg-white text-7xl"
            role="img"
            aria-label={post.coverImage.alt}
          >
            {post.emoji ?? category?.icon ?? "📝"}
          </div>
          {post.tags.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2" aria-label="برچسب‌های مقاله">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-white px-3 py-1 text-xs font-bold text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </header>

        <section
          aria-label="متن مقاله"
          className="mb-10 rounded-3xl border border-border bg-white p-6 shadow-sm md:p-10"
        >
          {renderContent(post.content)}
        </section>

        <section className="mb-10 rounded-3xl border bg-accent p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-accent-foreground">دوست داری سفارش بدی؟</h2>
          <p className="mx-auto mb-6 max-w-xl text-sm leading-7 text-muted-foreground">
            لینک محصولات مرتبط پایین همین مقاله آمده و برای سفارش سریع هم می‌توانید از واتساپ
            استفاده کنید.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/products" className="rounded-full bg-primary px-7 py-3 font-bold text-white">
              مشاهده محصولات
            </Link>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#25D366] px-7 py-3 font-bold text-white"
            >
              💬 سفارش واتساپی
            </a>
          </div>
        </section>

        <div className="space-y-10">
          <BlogRelatedProducts products={relatedProducts.slice(0, 3)} />
          {related.length > 0 ? (
            <section aria-labelledby="related-articles-heading" className="space-y-5">
              <h2
                id="related-articles-heading"
                className="text-2xl font-bold text-accent-foreground"
              >
                مقالات مرتبط
              </h2>
              <div className="grid gap-5 md:grid-cols-2">
                {related.map((relatedPost) => (
                  <BlogArticleCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </article>
    </div>
  );
}
