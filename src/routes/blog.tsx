import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FileSearch } from "lucide-react";
import { BLOG_CATEGORIES, getFeaturedPosts, getLatestPosts, getPostsByCategory } from "@/data/blog";
import { buildSeo } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { CollectionPageJsonLd } from "@/components/jsonld/CollectionPageJsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BlogArticleCard } from "@/components/blog/BlogArticleCard";
import { BlogCategoryCard } from "@/components/blog/BlogCategoryCard";
import { BlogActiveFilters } from "@/components/blog/BlogActiveFilters";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { BlogSortSelect } from "@/components/blog/BlogSortSelect";
import { MobileBlogFilterSheet } from "@/components/blog/MobileBlogFilterSheet";
import { Button } from "@/components/ui/button";
import { toPersianDigits } from "@/lib/format";
import {
  filterBlogPosts,
  getActiveBlogFilterCount,
  getBlogFacets,
  hasActiveBlogFilters,
  parseBlogSearch,
  type BlogFilterSearch,
  type BlogSort,
} from "@/lib/blog-filters";

export const Route = createFileRoute("/blog")({
  validateSearch: (search) => parseBlogSearch(search),
  head: ({ match }) => {
    const hasFilters = hasActiveBlogFilters(match.search as BlogFilterSearch);

    return buildSeo({
      title: "بلاگ وینیمی | راهنمای کوکی، هدیه و شیرینی خانگی",
      description:
        "بلاگ وینیمی با راهنمای نگهداری کوکی، ایده هدیه شیرینی، ارسال، محصولات رژیمی و نکات شیرینی‌پزی خانگی.",
      path: "/blog",
      noindex: hasFilters,
      robots: hasFilters ? "noindex,follow" : undefined,
    });
  },
  component: BlogPage,
});

const crumbs = [
  { name: "خانه", path: "/" },
  { name: "بلاگ", path: "/blog" },
];

function BlogPage() {
  const filters = Route.useSearch();
  const navigate = Route.useNavigate();
  const featuredPosts = useMemo(() => getFeaturedPosts(), []);
  const latestPosts = useMemo(() => getLatestPosts(), []);
  const filteredPosts = useMemo(
    () => filterBlogPosts(latestPosts, filters),
    [filters, latestPosts],
  );
  const facets = useMemo(() => getBlogFacets(latestPosts), [latestPosts]);
  const hasFilters = hasActiveBlogFilters(filters);
  const activeCount = getActiveBlogFilterCount(filters);

  const updateSearch = (patch: Partial<BlogFilterSearch>) => {
    void navigate({
      search: (previous: BlogFilterSearch) => ({ ...previous, ...patch }),
    });
  };

  const clearFilters = () => {
    void navigate({ search: {} });
  };

  const removeFilter = (key: keyof BlogFilterSearch) => {
    updateSearch({ [key]: undefined });
  };

  const filterProps = {
    filters,
    facets,
    onSearchChange: (value?: string) => updateSearch({ q: value }),
    onCategoryChange: (category?: BlogFilterSearch["category"]) => updateSearch({ category }),
    onTagChange: (tag?: string) => updateSearch({ tag }),
    onClear: clearFilters,
  };

  return (
    <div dir="rtl" className="space-y-12">
      <BreadcrumbJsonLd items={crumbs} />
      {!hasFilters && (
        <CollectionPageJsonLd
          name="بلاگ وینیمی بیکری"
          description="مقالات آموزشی درباره کوکی، شیرینی خانگی، هدیه، ارسال و نگهداری محصولات وینیمی."
          path="/blog"
          items={latestPosts.map((post) => ({ name: post.title, path: `/blog/${post.slug}` }))}
        />
      )}
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

      {!hasFilters && featuredPosts.length > 0 ? (
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

      <section aria-labelledby="blog-discovery-heading" className="space-y-5">
        <div>
          <p className="text-sm font-bold text-primary">کشف مقالات</p>
          <h2
            id="blog-discovery-heading"
            className="mt-1 text-2xl font-extrabold text-accent-foreground"
          >
            جستجو و فیلتر مقالات بلاگ
          </h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            در مقاله‌های منتشرشده جستجو کنید و نتیجه را با دسته، برچسب و تاریخ انتشار محدود کنید.
            وضعیت فیلترها در آدرس صفحه ذخیره می‌شود.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <div className="space-y-4">
            <div className="flex flex-col gap-3 rounded-3xl border border-border bg-white p-4 shadow-sm sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-bold">
                  {toPersianDigits(filteredPosts.length)} مقاله از{" "}
                  {toPersianDigits(latestPosts.length)} مقاله
                </p>
                <p className="text-xs text-muted-foreground">
                  حالت‌های فیلتر شده برای سئو noindex هستند و کانونیکال آن‌ها به /blog اشاره می‌کند.
                </p>
              </div>
              <div className="flex flex-wrap items-end gap-2">
                <div className="lg:hidden">
                  <MobileBlogFilterSheet {...filterProps} activeCount={activeCount} />
                </div>
                <BlogSortSelect
                  value={filters.sort}
                  onChange={(sort?: BlogSort) => updateSearch({ sort })}
                />
              </div>
            </div>

            <BlogActiveFilters filters={filters} onRemove={removeFilter} onClear={clearFilters} />

            {filteredPosts.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredPosts.map((post) => (
                  <BlogArticleCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-primary bg-primary-light/60 p-8 text-center shadow-sm">
                <FileSearch className="mx-auto h-12 w-12 text-primary-dark" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-extrabold">مقاله‌ای با این فیلترها پیدا نشد</h3>
                <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-muted-foreground">
                  جستجو را کوتاه‌تر کنید یا دسته و برچسب را پاک کنید تا مقاله‌های بیشتری نمایش داده
                  شود.
                </p>
                <Button type="button" className="mt-4" onClick={clearFilters}>
                  پاک کردن همه فیلترها
                </Button>
              </div>
            )}
          </div>

          <aside className="hidden lg:block" aria-label="فیلتر مقالات بلاگ">
            <BlogFilters {...filterProps} idPrefix="desktop-blog-filters" />
          </aside>
        </div>
      </section>
    </div>
  );
}
