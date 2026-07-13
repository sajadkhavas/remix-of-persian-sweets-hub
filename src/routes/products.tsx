import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PackageSearch } from "lucide-react";
import { buildSeo } from "@/lib/seo";
import { PRODUCTS } from "@/data/products";
import { getPublicProductCategories } from "@/data/categories";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryCard } from "@/components/category/CategoryCard";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { ItemListJsonLd } from "@/components/jsonld/ItemListJsonLd";
import { ActiveFilters } from "@/components/products/ActiveFilters";
import { MobileFilterSheet } from "@/components/products/MobileFilterSheet";
import { ProductFilters } from "@/components/products/ProductFilters";
import { SortSelect } from "@/components/products/SortSelect";
import { Button } from "@/components/ui/button";
import {
  filterProducts,
  getActiveProductFilterCount,
  getProductFacets,
  hasActiveProductFilters,
  parseProductSearch,
  removeProductFilterArrayValue,
  toggleProductFilterArrayValue,
  type ProductFilterSearch,
  type ProductSort,
} from "@/lib/product-filters";
import { toPersianDigits } from "@/lib/format";

export const Route = createFileRoute("/products")({
  validateSearch: (search) => parseProductSearch(search),
  head: ({ match }) => {
    const hasFilters = hasActiveProductFilters(match.search as ProductFilterSearch);

    return buildSeo({
      title: "همه محصولات وینیمی",
      description:
        "لیست کامل کوکی، شیرینی خشک، جعبه‌های هدیه و محصولات رژیمی وینیمی با قیمت به تومان و ارسال به سراسر ایران.",
      path: "/products",
      noindex: hasFilters,
      robots: hasFilters ? "noindex,follow" : undefined,
    });
  },
  component: Products,
});

function Products() {
  const filters = Route.useSearch();
  const navigate = Route.useNavigate();
  const facets = useMemo(() => getProductFacets(PRODUCTS), []);
  const filteredProducts = useMemo(() => filterProducts(PRODUCTS, filters), [filters]);
  const hasFilters = hasActiveProductFilters(filters);
  const activeCount = getActiveProductFilterCount(filters);
  const crumbs = [
    { name: "خانه", path: "/" },
    { name: "محصولات", path: "/products" },
  ];
  const categories = getPublicProductCategories();
  const productCountByCategory = PRODUCTS.reduce(
    (counts, product) => {
      counts[product.category] = (counts[product.category] ?? 0) + 1;
      return counts;
    },
    {} as Record<string, number>,
  );

  const updateSearch = (patch: Partial<ProductFilterSearch>) => {
    void navigate({
      search: (previous) => ({ ...previous, ...patch }),
    });
  };

  const clearFilters = () => {
    void navigate({ search: {} });
  };

  const removeFilter = (key: keyof ProductFilterSearch, value?: string) => {
    if (key === "flavor" && value) {
      updateSearch({ flavor: removeProductFilterArrayValue(filters.flavor, value) });
    } else if (key === "tag" && value) {
      updateSearch({ tag: removeProductFilterArrayValue(filters.tag, value) });
    } else {
      updateSearch({ [key]: undefined });
    }
  };

  const filterProps = {
    filters,
    facets,
    onSearchChange: (value?: string) => updateSearch({ q: value }),
    onMinPriceChange: (value?: number) => updateSearch({ minPrice: value }),
    onMaxPriceChange: (value?: number) => updateSearch({ maxPrice: value }),
    onFlavorToggle: (value: string) =>
      updateSearch({ flavor: toggleProductFilterArrayValue(filters.flavor, value) }),
    onTagToggle: (value: string) =>
      updateSearch({ tag: toggleProductFilterArrayValue(filters.tag, value) }),
    onClear: clearFilters,
  };

  return (
    <div className="space-y-12">
      <BreadcrumbJsonLd items={crumbs} />
      {!hasFilters && <ItemListJsonLd products={PRODUCTS} />}
      <Breadcrumbs items={crumbs} />

      <header className="max-w-3xl">
        <h1 className="text-3xl font-extrabold leading-10 md:text-4xl">همه محصولات</h1>
        <p className="mt-3 text-base leading-8 text-muted-foreground md:text-lg">
          از این صفحه می‌توانید دسته‌های اصلی وینیمی را ببینید و سپس همه محصولات فعلی را با جستجو،
          فیلتر و مرتب‌سازی یکجا مرور کنید.
        </p>
      </header>

      <section aria-labelledby="category-discovery-heading" className="space-y-5">
        <div>
          <h2 id="category-discovery-heading" className="text-2xl font-extrabold">
            دسته‌بندی محصولات
          </h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            برای پیدا کردن سریع‌تر کوکی، کیک، محصولات رژیمی یا مجموعه‌های هدیه آینده از دسته‌های زیر
            شروع کنید.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
              productCount={productCountByCategory[category.slug] ?? 0}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="all-products-heading" className="space-y-5">
        <div>
          <h2 id="all-products-heading" className="text-2xl font-extrabold">
            همه محصولات وینیمی
          </h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            در کل کاتالوگ جستجو کنید و محصولات را بر اساس طعم، ویژگی، قیمت یا محبوبیت مرتب کنید.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <div className="space-y-4">
            <div className="flex flex-col gap-3 rounded-3xl border border-border bg-white p-4 shadow-sm sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-bold">
                  {toPersianDigits(filteredProducts.length)} محصول از{" "}
                  {toPersianDigits(PRODUCTS.length)} محصول
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
                <PackageSearch className="mx-auto h-12 w-12 text-primary-dark" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-extrabold">محصولی با این مشخصات پیدا نشد</h3>
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
            <ProductFilters {...filterProps} idPrefix="desktop-products-filters" />
          </aside>
        </div>
      </section>
    </div>
  );
}
