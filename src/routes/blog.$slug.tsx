import { createFileRoute, notFound } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { findPost } from "@/data/blog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { ArticleJsonLd } from "@/components/jsonld/ArticleJsonLd";
import { toPersianDigits } from "@/lib/format";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = findPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return buildSeo({
        title: "نوشته پیدا نشد",
        description: "این نوشته در بلاگ وینیمی وجود ندارد.",
        path: `/blog/${params.slug}`,
        noindex: true,
      });
    }
    const p = loaderData.post;
    return buildSeo({
      title: p.title,
      description: p.excerpt.slice(0, 150),
      path: `/blog/${p.slug}`,
      type: "article",
    });
  },
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const crumbs = [
    { name: "خانه", path: "/" },
    { name: "بلاگ", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];
  return (
    <div>
      <BreadcrumbJsonLd items={crumbs} />
      <ArticleJsonLd
        headline={post.title}
        datePublished={post.datePublished}
        author={post.author}
        path={`/blog/${post.slug}`}
      />
      <Breadcrumbs items={crumbs} />
      <article className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {toPersianDigits(post.datePublished)} — {post.author}
        </p>
        <div className="prose leading-8 whitespace-pre-line">{post.content}</div>
      </article>
    </div>
  );
}
