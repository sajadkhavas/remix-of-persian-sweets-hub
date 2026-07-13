import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { findPost, getRelatedPosts, formatPersianDate, estimateReadingTime } from "@/data/blog";
import { buildSeo } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleJsonLd } from "@/components/jsonld/ArticleJsonLd";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = findPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) =>
    buildSeo({
      title: loaderData?.post.title ?? "مقاله پیدا نشد",
      description: loaderData?.post.excerpt ?? "",
      path: loaderData ? `/blog/${loaderData.post.slug}` : "/blog",
      type: "article",
      noindex: !loaderData,
    }),
  component: BlogPostPage,
});

function renderContent(content: string) {
  return content.split("\n").map((line, i) => {
    if (line.startsWith("## "))
      return (
        <h2 key={i} className="mb-3 mt-8 text-2xl font-bold text-accent-foreground">
          {line.slice(3)}
        </h2>
      );
    if (line.startsWith("- "))
      return (
        <li key={i} className="mr-6 leading-9 text-[#4a3a32]">
          {line.slice(2)}
        </li>
      );
    if (line.trim())
      return (
        <p key={i} className="mb-4 leading-9 text-[#4a3a32]">
          {line}
        </p>
      );
    return null;
  });
}

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const related = getRelatedPosts(post.slug, 2);
  const postUrl = `${SITE.origin}/blog/${post.slug}`;
  const crumbs = [
    { name: "خانه", path: "/" },
    { name: "بلاگ", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];
  return (
    <main dir="rtl" className="min-h-screen bg-[#FEFCF9]">
      <BreadcrumbJsonLd items={crumbs} />
      <ArticleJsonLd
        headline={post.title}
        author={post.author}
        datePublished={post.datePublished}
        path={`/blog/${post.slug}`}
      />
      <article className="mx-auto max-w-4xl px-6 py-10">
        <Breadcrumbs items={crumbs} />
        <header className="mb-12 mt-6">
          <span className="mb-5 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-bold text-primary">
            مقاله
          </span>
          <h1 className="mb-6 text-4xl font-extrabold leading-[1.6] text-accent-foreground">
            {post.title}
          </h1>
          <div className="mb-5 flex flex-wrap gap-4 rounded-xl bg-accent p-5 text-sm text-muted-foreground">
            <span>✍️ {post.author}</span>
            <time dateTime={post.datePublished}>📅 {formatPersianDate(post.datePublished)}</time>
            <span>⏱ {estimateReadingTime(post.content)} مطالعه</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + postUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#25D366] px-4 py-2 text-sm font-bold text-white"
            >
              💬 واتساپ
            </a>
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#229ED9] px-4 py-2 text-sm font-bold text-white"
            >
              ✈️ تلگرام
            </a>
          </div>
        </header>
        <div className="mb-14 border-r-4 border-primary/30 pr-6">{renderContent(post.content)}</div>
        <section className="mb-14 rounded-3xl border bg-accent p-10 text-center">
          <p className="mb-6 text-2xl font-bold text-accent-foreground">دوست داری سفارش بدی؟</p>
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
        {related.length > 0 && (
          <section>
            <h2 className="mb-5 text-2xl font-bold text-accent-foreground">مقالات مرتبط</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="rounded-2xl border bg-accent p-5 no-underline"
                >
                  <div className="mb-2 text-2xl">{p.emoji}</div>
                  <h3 className="mb-2 font-bold text-accent-foreground">{p.title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
