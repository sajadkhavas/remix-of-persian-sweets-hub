import { createFileRoute } from "@tanstack/react-router";
import { BLOG_CATEGORIES, getFeaturedPosts, getLatestPosts, getPostsByCategory } from "@/data/blog";
import { buildSeo } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { CollectionPageJsonLd } from "@/components/jsonld/CollectionPageJsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BlogArticleCard } from "@/components/blog/BlogArticleCard";
import { BlogCategoryCard } from "@/components/blog/BlogCategoryCard";

export const Route = createFileRoute("/blog")({
  head: () =>
    buildSeo({
      title: "بلاگ وینیمی | راهنمای کوکی، هدیه و شیرینی خانگی",
      description:
        "بلاگ وینیمی با راهنمای نگهداری کوکی، ایده هدیه شیرینی، ارسال، محصولات رژیمی و نکات شیرینی‌پزی خانگی.",
      path: "/blog",
    }),
  component: BlogPage,
});

const crumbs = [
  { name: "خانه", path: "/" },
  { name: "بلاگ", path: "/blog" },
];

function BlogPage() {
  const featuredPosts = getFeaturedPosts();
  const latestPosts = getLatestPosts();

  return (
    <div dir="rtl" className="space-y-12">
      <BreadcrumbJsonLd items={crumbs} />
      <CollectionPageJsonLd
        name="بلاگ وینیمی بیکری"
        description="مقالات آموزشی درباره کوکی، شیرینی خانگی، هدیه، ارسال و نگهداری محصولات وینیمی."
        path="/blog"
        items={latestPosts.map((post) => ({ name: post.title, path: `/blog/${post.slug}` }))}
      />
      <Breadcrumbs items={crumbs} />

      <section className="overflow-hidden rounded-[2rem] bg-accent px-6 py-16 text-center shadow-sm">
        <p className="mb-4 text-sm font-semibold text-primary">مجله آموزشی وینیمی</p>
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-[1.5] text-accent-foreground md:text-5xl">
          بلاگ وینیمی بیکری
        </h1>
        <p className="mx-auto mt-5 max-w-2xl leading-8 text-muted-foreground">
          راهنمای فارسی و کاربردی برای نگهداری کوکی، انتخاب شیرینی هدیه، ارسال محصولات خانگی و خرید
          آگاهانه شیرینی رژیمی.
        </p>
      </section>

      <section aria-labelledby="blog-category-heading" className="space-y-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold text-primary">مسیرهای مطالعه</p>
            <h2
              id="blog-category-heading"
              className="mt-1 text-2xl font-extrabold text-accent-foreground"
            >
              دسته‌بندی مقالات
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground">
            هر دسته یک صفحه SEO مستقل دارد و مقاله‌ها را بر اساس نیاز کاربر، از نگهداری تا هدیه و
            رژیمی، مرتب می‌کند.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {BLOG_CATEGORIES.map((category) => (
            <BlogCategoryCard
              key={category.slug}
              category={category}
              articleCount={getPostsByCategory(category.slug).length}
            />
          ))}
        </div>
      </section>

      {featuredPosts.length > 0 ? (
        <section aria-labelledby="featured-articles-heading" className="space-y-5">
          <div>
            <p className="text-sm font-bold text-primary">پیشنهاد سردبیر</p>
            <h2
              id="featured-articles-heading"
              className="mt-1 text-2xl font-extrabold text-accent-foreground"
            >
              مقالات ویژه
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <BlogArticleCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      ) : null}

      <section aria-labelledby="latest-articles-heading" className="space-y-5">
        <div>
          <p className="text-sm font-bold text-primary">تازه‌ترین نوشته‌ها</p>
          <h2
            id="latest-articles-heading"
            className="mt-1 text-2xl font-extrabold text-accent-foreground"
          >
            آخرین مقالات بلاگ
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <BlogArticleCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
