import { createFileRoute, notFound } from "@tanstack/react-router";
import {
  getBlogCategory,
  getPostsByCategory,
  getRelatedProductsForCategory,
  isBlogCategorySlug,
} from "@/data/blog";
import { buildSeo } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/aeo/FAQSection";
import { BlogArticleCard } from "@/components/blog/BlogArticleCard";
import { BlogRelatedProducts } from "@/components/blog/BlogRelatedProducts";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { CollectionPageJsonLd } from "@/components/jsonld/CollectionPageJsonLd";

export const Route = createFileRoute("/blog_/category/$categorySlug")({
  loader: ({ params }) => {
    if (!isBlogCategorySlug(params.categorySlug)) throw notFound();
    const category = getBlogCategory(params.categorySlug);
    if (!category) throw notFound();
    return { category, posts: getPostsByCategory(category.slug) };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return buildSeo({
        title: "دسته‌بندی بلاگ پیدا نشد",
        description: "این دسته‌بندی بلاگ در وینیمی وجود ندارد.",
        path: `/blog/category/${params.categorySlug}`,
        noindex: true,
      });
    }

    return buildSeo({
      title: loaderData.category.seoTitle,
      description: loaderData.category.seoDescription.slice(0, 155),
      path: `/blog/category/${loaderData.category.slug}`,
    });
  },
  component: BlogCategoryPage,
});

function BlogCategoryPage() {
  const { category, posts } = Route.useLoaderData();
  const relatedProducts = getRelatedProductsForCategory(category);
  const crumbs = [
    { name: "خانه", path: "/" },
    { name: "بلاگ", path: "/blog" },
    { name: category.name, path: `/blog/category/${category.slug}` },
  ];

  return (
    <div dir="rtl" className="space-y-10">
      <BreadcrumbJsonLd items={crumbs} />
      <CollectionPageJsonLd
        name={category.title}
        description={category.seoDescription}
        path={`/blog/category/${category.slug}`}
        items={posts.map((post: { title: string; slug: string }) => ({ name: post.title, path: `/blog/${post.slug}` }))}
      />
      <Breadcrumbs items={crumbs} />

      <section className="rounded-[2rem] bg-accent px-6 py-14 shadow-sm md:px-10">
        <div className="max-w-3xl">
          <span
            className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-3xl"
            aria-hidden="true"
          >
            {category.icon}
          </span>
          <p className="mt-6 text-sm font-bold text-primary">دسته‌بندی بلاگ وینیمی</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.5] text-accent-foreground">
            {category.title}
          </h1>
          <p className="mt-4 leading-8 text-muted-foreground">{category.heroCopy}</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{category.description}</p>
        </div>
      </section>

      <section aria-labelledby="category-articles-heading" className="space-y-5">
        <div>
          <p className="text-sm font-bold text-primary">مقالات این دسته</p>
          <h2
            id="category-articles-heading"
            className="mt-1 text-2xl font-extrabold text-accent-foreground"
          >
            {posts.length.toLocaleString("fa-IR")} مقاله درباره {category.name}
          </h2>
        </div>
        {posts.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: import("@/data/blog").BlogPost) => (
              <BlogArticleCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-primary bg-primary-light/60 p-8 text-center">
            <h2 className="text-xl font-extrabold">مقاله‌ای در این دسته منتشر نشده است</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              این صفحه برای رشد آینده محتوای آموزشی و SEO آماده شده است.
            </p>
          </div>
        )}
      </section>

      <BlogRelatedProducts
        products={relatedProducts.slice(0, 3)}
        heading={`محصولات مرتبط با ${category.name}`}
      />
      {category.faqs.length > 0 ? <FAQSection items={category.faqs} /> : null}
    </div>
  );
}
