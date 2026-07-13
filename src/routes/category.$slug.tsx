import { createFileRoute, notFound } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { FAQSection } from "@/components/aeo/FAQSection";
import { GENERAL_FAQ } from "@/data/faqs";
import type { ProductCategory } from "@/data/types";

const CATEGORY_MAP: Record<ProductCategory, { name: string; intro: string }> = {
  cookies: {
    name: "کوکی",
    intro:
      "کوکی‌های خانگی وینیمی با کره تازه، شکلات مرغوب و پخت روزانه. مناسب هدیه، عصرانه و پذیرایی.",
  },
  cakes: {
    name: "کیک و دسر",
    intro:
      "کیک‌های تازه دست‌پخت وینیمی؛ تیرامیسو، چیزکیک، ردولوت و کیک‌های خانگی با مواد اولیه مرغوب.",
  },
  diet: {
    name: "رژیمی و دیابتی",
    intro: "کوکی‌های رژیمی و مختص دیابتی بدون قند افزوده؛ همان لذت شیرینی، بدون نگرانی از سلامتی.",
  },
  "dry-sweets": {
    name: "شیرینی خشک",
    intro: "شیرینی خشک سنتی ایرانی با ماندگاری بالا؛ مناسب ارسال و پذیرایی.",
  },
  "gift-boxes": {
    name: "جعبه هدیه",
    intro: "جعبه‌های هدیه شکیل با ترکیب منتخب از محصولات وینیمی، مناسب مناسبت‌ها.",
  },
};

function isProductCategory(slug: string): slug is ProductCategory {
  return slug in CATEGORY_MAP;
}

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    if (!isProductCategory(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => {
    const meta = isProductCategory(params.slug) ? CATEGORY_MAP[params.slug] : undefined;
    if (!meta) {
      return buildSeo({
        title: "دسته پیدا نشد",
        description: "این دسته در وینیمی وجود ندارد.",
        path: `/category/${params.slug}`,
        noindex: true,
      });
    }
    return buildSeo({
      title: `${meta.name} — خرید آنلاین با ارسال به سراسر ایران`,
      description: meta.intro.slice(0, 150),
      path: `/category/${params.slug}`,
    });
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useLoaderData();
  const meta = CATEGORY_MAP[slug];
  const products = PRODUCTS.filter((p) => p.category === slug);
  const crumbs = [
    { name: "خانه", path: "/" },
    { name: "محصولات", path: "/products" },
    { name: meta.name, path: `/category/${slug}` },
  ];
  return (
    <div>
      <BreadcrumbJsonLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-3xl font-bold mb-3">{meta.name}</h1>
      <p className="text-muted-foreground max-w-3xl leading-8 mb-8">{meta.intro}</p>
      {products.length === 0 ? (
        <p className="text-muted-foreground">محصولی در این دسته موجود نیست.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
      <FAQSection items={GENERAL_FAQ.slice(0, 4)} />
    </div>
  );
}
