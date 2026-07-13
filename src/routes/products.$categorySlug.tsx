import { createFileRoute, notFound } from "@tanstack/react-router";
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

export const Route = createFileRoute("/products/$categorySlug")({
  loader: ({ params }) => {
    if (!isProductCategorySlug(params.categorySlug)) throw notFound();
    const category = getProductCategory(params.categorySlug);
    if (!category.isPublicLanding) throw notFound();
    return { category };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return buildSeo({
        title: "دسته محصول پیدا نشد",
        description: "این دسته محصول در وینیمی وجود ندارد.",
        path: `/products/${params.categorySlug}`,
        noindex: true,
      });
    }

    const { category } = loaderData;
    return buildSeo({
      title: category.seoTitle,
      description: category.seoDescription.slice(0, 155),
      path: `/products/${category.slug}`,
    });
  },
  component: CategoryLandingPage,
});

function CategoryLandingPage() {
  const { category } = Route.useLoaderData();
  const products = PRODUCTS.filter((product) => product.category === category.slug);
  const relatedCategories = getRelatedProductCategories(category);
  const crumbs = [
    { name: "خانه", path: "/" },
    { name: "محصولات", path: "/products" },
    { name: category.name, path: `/products/${category.slug}` },
  ];
  const isComingSoon = products.length === 0;

  return (
    <div className="space-y-10">
      <BreadcrumbJsonLd items={crumbs} />
      {products.length > 0 && <ItemListJsonLd products={products} />}
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
              : "محصولات فعلی این دسته را در کارت‌های زیر مشاهده کنید."}
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <SeoContentSection content={category.seoContent} />
      {category.faqs.length > 0 && <FAQSection items={category.faqs} />}
      <RelatedCategories categories={relatedCategories} />
    </div>
  );
}
