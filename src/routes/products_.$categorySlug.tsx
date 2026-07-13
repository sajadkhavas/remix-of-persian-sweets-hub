import { useMemo } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { PackageSearch } from "lucide-react";
import { buildSeo } from "@/lib/seo";
import { PRODUCTS } from "@/data/products";
import {
  getProductCategory,
  getRelatedProductCategories,
  isProductCategorySlug,
} from "@/data/categories";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryHero } from "@/components/category/CategoryHero";
import { RelatedCategories } from "@/components/category/RelatedCategories";
import { SeoContentSection } from "@/components/category/SeoContentSection";
import { FAQSection } from "@/components/aeo/FAQSection";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { ItemListJsonLd } from "@/components/jsonld/ItemListJsonLd";
import { Button } from "@/components/ui/button";
import { ActiveFilters } from "@/components/products/ActiveFilters";
import { MobileFilterSheet } from "@/components/products/MobileFilterSheet";
import { ProductFilters } from "@/components/products/ProductFilters";
import { SortSelect } from "@/components/products/SortSelect";
import {
  filterProducts,
  getProductFacets,
  hasActiveProductFilters,
  parseProductSearch,
  type ProductFilterSearch,
  type ProductSort,
} from "@/lib/product-filters";
import { toPersianDigits } from "@/lib/format";

export const Route = createFileRoute("/products_/$categorySlug")({
  validateSearch: (search) => parseProductSearch(search),
  loader: ({ params }) => {
    if (!isProductCategorySlug(params.categorySlug)) throw notFound();
    const category = getProductCategory(params.categorySlug);
    if (!category.isPublicLanding) throw notFound();
    return { category };
  },
  head: ({ params, loaderData, match }) => {
    if (!loaderData) {
      return buildSeo({
        title: "دسته محصول پیدا نشد",
        description: "این دسته محصول در وینیمی وجود ندارد.",
        path: `/products/${params.categorySlug}`,
        noindex: true,
      });
    }

    const { category } = loaderData;
    const hasFilters = hasActiveProductFilters(match.search as ProductFilterSearch);
    return buildSeo({
      title: category.seoTitle,
      description: category.seoDescription.slice(0, 155),
      path: `/products/${category.slug}`,
      noindex: hasFilters,
      robots: hasFilters ? "noindex,follow" : undefined,
    });
  },
  component: CategoryLandingPage,
});

function removeFromArray(values: string[] | undefined, value: string): string[] | undefined {
  const nextValues = (values ?? []).filter((item) => item !== value);
  return nextValues.length > 0 ? nextValues : undefined;
}

function toggleArrayValue(values: string[] | undefined, value: string): string[] | undefined {
  const current = values ?? [];
  if (current.includes(value)) return removeFromArray(current, value);
  return [...current, value];
}

function activeFilterCount(filters: ProductFilterSearch): number {
  return (
    (filters.q ? 1 : 0) +
    (filters.minPrice !== undefined ? 1 : 0) +
    (filters.maxPrice !== undefined ? 1 : 0) +
    (filters.flavor?.length ?? 0) +
    (filters.tag?.length ?? 0) +
    (filters.sort ? 1 : 0)
  );
}

function CategoryLandingPage() {
  const { category } = Route.useLoaderData();
  const filters = Route.useSearch();
  const navigate = Route.useNavigate();
  const products = useMemo(
    () => PRODUCTS.filter((product) => product.category === category.slug),
    [category.slug],
  );
  const facets = useMemo(() => getProductFacets(products), [products]);
  const filteredProducts = useMemo(() => filterProducts(products, filters), [products, filters]);
  const relatedCategories = getRelatedProductCategories(category);
  const crumbs = [
    { name: "خانه", path: "/" },
    { name: "محصولات", path: "/products" },
    { name: category.name, path: `/products/${category.slug}` },
  ];
  const isComingSoon = products.length === 0;
  const hasFilters = hasActiveProductFilters(filters);
  const activeCount = activeFilterCount(filters);

  const updateSearch = (patch: Partial<ProductFilterSearch>) => {
    void navigate({
      search: (previous) => ({ ...previous, ...patch }),
    });
  };

  const clearFilters = () => {
    void navigate({ search: {} });
  };

  const removeFilter = (key: keyof ProductFilterSearch, value?: string) => {
    if (key === "flavor" && value) updateSearch({ flavor: removeFromArray(filters.flavor, value) });
    else if (key === "tag" && value) updateSearch({ tag: removeFromArray(filters.tag, value) });
    else updateSearch({ [key]: undefined });
  };

  const filterProps = {
    filters,
    facets,
    onSearchChange: (value?: string) => updateSearch({ q: value }),
    onMinPriceChange: (value?: number) => updateSearch({ minPrice: value }),
    onMaxPriceChange: (value?: number) => updateSearch({ maxPrice: value }),
    onFlavorToggle: (value: string) =>
      updateSearch({ flavor: toggleArrayValue(filters.flavor, value) }),
    onTagToggle: (value: string) => updateSearch({ tag: toggleArrayValue(filters.tag, value) }),
    onClear: clearFilters,
  };

  return (
    <div className="space-y-10">
      <BreadcrumbJsonLd items={crumbs} />
      {products.length > 0 && !hasFilters && <ItemListJsonLd products={products} />}
      <Breadcrumbs items={crumbs} />

      <CategoryHero category={category} />

      <section aria-labelledby="category-products-heading" className="space-y-5">
        <div>
          <h2 id="category-products-heading" className="text-2xl font-extrabold">
            محصولات {category.name}
          </h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {isComingSoon
              ? "محصولات این دسته هنوز فعال نشده‌اند، اما این صفحه برای معرفی مجموعه‌های آینده و دسترسی به دسته‌های مرتبط آماده است."
              : "محصولات فعلی این دسته را با جستجو، فیلتر و مرتب‌سازی سریع‌تر پیدا کنید."}
          </p>
        </div>

        {isComingSoon ? (
          <div className="rounded-3xl border border-dashed border-primary bg-primary-light/60 p-6 text-center shadow-sm">
            <div className="text-6xl" aria-hidden="true">
              {category.visual.placeholder}
            </div>
            <h3 className="mt-4 text-2xl font-extrabold">این مجموعه به‌زودی تکمیل می‌شود</h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-8 text-muted-foreground">
              در حال حاضر محصول فعالی برای {category.name} ثبت نشده است. تا زمان اضافه شدن محصولات
              این دسته، می‌توانید از دسته‌های مرتبط پایین صفحه یا همه محصولات وینیمی دیدن کنید.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
            <div className="space-y-4">
              <div className="flex flex-col gap-3 rounded-3xl border border-border bg-white p-4 shadow-sm sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-bold">
                    {toPersianDigits(filteredProducts.length)} محصول از{" "}
                    {toPersianDigits(products.length)} محصول
                  </p>
                  <p className="text-xs text-muted-foreground">
                    فیلترها در آدرس صفحه ذخیره می‌شوند و برای اشتراک‌گذاری قابل استفاده‌اند.
                  </p>
                </div>
                <div className="flex flex-wrap items-end gap-2">
                  <div className="lg:hidden">
                    <MobileFilterSheet {...filterProps} activeCount={activeCount} />
                  </div>
                  <SortSelect
                    value={filters.sort}
                    onChange={(sort?: ProductSort) => updateSearch({ sort })}
                  />
                </div>
              </div>

              <ActiveFilters filters={filters} onRemove={removeFilter} onClear={clearFilters} />

              {filteredProducts.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-primary bg-primary-light/60 p-8 text-center shadow-sm">
                  <PackageSearch
                    className="mx-auto h-12 w-12 text-primary-dark"
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 text-xl font-extrabold">محصولی با این فیلترها پیدا نشد</h3>
                  <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-muted-foreground">
                    چند فیلتر را حذف کنید یا جستجو را تغییر دهید تا محصولات بیشتری نمایش داده شوند.
                  </p>
                  <Button type="button" className="mt-4" onClick={clearFilters}>
                    پاک کردن همه فیلترها
                  </Button>
                </div>
              )}
            </div>

            <aside className="hidden lg:block" aria-label="فیلتر محصولات">
              <ProductFilters {...filterProps} idPrefix="desktop-product-filters" />
            </aside>
          </div>
        )}
      </section>

      <SeoContentSection content={category.seoContent} />
      {category.faqs.length > 0 && <FAQSection items={category.faqs} />}
      <RelatedCategories categories={relatedCategories} />
    </div>
  );
}
