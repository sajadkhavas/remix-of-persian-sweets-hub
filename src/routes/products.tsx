import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
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
  return (
    <div>
      <BreadcrumbJsonLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-3xl font-bold mb-6">همه محصولات</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
