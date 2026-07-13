import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { PRODUCTS } from "@/data/products";
import { getPublicProductCategories } from "@/data/categories";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryCard } from "@/components/category/CategoryCard";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";

export const Route = createFileRoute("/products")({
  head: () =>
    buildSeo({
      title: "همه محصولات وینیمی",
      description:
        "لیست کامل کوکی، شیرینی خشک، جعبه‌های هدیه و محصولات رژیمی وینیمی با قیمت به تومان و ارسال به سراسر ایران.",
      path: "/products",
    }),
  component: Products,
});

function Products() {
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

  return (
    <div className="space-y-12">
      <BreadcrumbJsonLd items={crumbs} />
      <Breadcrumbs items={crumbs} />

      <header className="max-w-3xl">
        <h1 className="text-3xl font-extrabold leading-10 md:text-4xl">همه محصولات</h1>
        <p className="mt-3 text-base leading-8 text-muted-foreground md:text-lg">
          از این صفحه می‌توانید دسته‌های اصلی وینیمی را ببینید و سپس همه محصولات فعلی را یکجا مرور
          کنید.
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
            همه محصولات فعلی بدون فیلتر در این بخش نمایش داده می‌شوند.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
