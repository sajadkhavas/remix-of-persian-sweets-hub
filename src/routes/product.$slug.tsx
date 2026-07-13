import { createFileRoute, notFound } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { findProduct } from "@/data/products";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { ProductJsonLd } from "@/components/jsonld/ProductJsonLd";
import { FAQSection } from "@/components/aeo/FAQSection";
import { formatToman, toPersianDigits } from "@/lib/format";
import type { Product } from "@/data/types";
import type { FaqItem } from "@/components/jsonld/FAQJsonLd";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return buildSeo({
        title: "محصول پیدا نشد",
        description: "این محصول در وینیمی موجود نیست.",
        path: `/product/${params.slug}`,
        noindex: true,
      });
    }
    const p = loaderData.product;
    return buildSeo({
      title: `${p.name} — خرید با ارسال به سراسر ایران`,
      description: p.seo.description.slice(0, 150),
      path: `/product/${p.slug}`,
      type: "product",
    });
  },
  component: ProductPage,
});

function buildProductFaqs(product: Product): FaqItem[] {
  const faqs: FaqItem[] = [];

  if (product.shelfLifeDays && product.shelfLifeDays > 0) {
    faqs.push({
      question: `${product.name} چند روز ماندگاری دارد؟`,
      answer: `ماندگاری این محصول ${toPersianDigits(product.shelfLifeDays)} روز از زمان تولید است. تاریخ دقیق روی بسته‌بندی درج می‌شود.`,
    });
  }

  if (product.ingredients.length > 0) {
    faqs.push({
      question: `مواد اولیه ${product.name} چیست؟`,
      answer: `این محصول از ${product.ingredients.join("، ")} تهیه شده است.`,
    });
  }

  if (product.allergens.length > 0) {
    faqs.push({
      question: `${product.name} چه آلرژن‌هایی دارد؟`,
      answer: `آلرژن‌های اعلام‌شده برای این محصول شامل ${product.allergens.join("، ")} است.`,
    });
  }

  if (product.weightGrams && product.weightGrams > 0) {
    faqs.push({
      question: `وزن ${product.name} چقدر است؟`,
      answer: `وزن این محصول ${toPersianDigits(product.weightGrams)} گرم است.`,
    });
  }

  return faqs;
}

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const hasIngredients = p.ingredients.length > 0;
  const hasWeight = Boolean(p.weightGrams && p.weightGrams > 0);
  const hasShelfLife = Boolean(p.shelfLifeDays && p.shelfLifeDays > 0);
  const faqs = buildProductFaqs(p);
  const crumbs = [
    { name: "خانه", path: "/" },
    { name: "محصولات", path: "/products" },
    { name: p.name, path: `/product/${p.slug}` },
  ];

  return (
    <div>
      <BreadcrumbJsonLd items={crumbs} />
      <ProductJsonLd product={p} />
      <Breadcrumbs items={crumbs} />
      <article>
        <h1 className="text-3xl font-bold mb-3">{p.name}</h1>
        <p className="text-lg leading-8 text-muted-foreground max-w-3xl mb-6">
          {p.longDescription}
        </p>
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {hasIngredients && (
            <div>
              <h2 className="font-bold text-lg mb-2">مواد اولیه</h2>
              <ul className="list-disc ps-6 space-y-1">
                {p.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <h2 className="font-bold text-lg mb-2">مشخصات</h2>
            <dl className="space-y-2 text-sm">
              {hasWeight && (
                <div className="flex gap-2">
                  <dt className="text-muted-foreground">وزن:</dt>
                  <dd>{toPersianDigits(p.weightGrams)} گرم</dd>
                </div>
              )}
              {hasShelfLife && (
                <div className="flex gap-2">
                  <dt className="text-muted-foreground">ماندگاری:</dt>
                  <dd>{toPersianDigits(p.shelfLifeDays)} روز</dd>
                </div>
              )}
              <div className="flex gap-2">
                <dt className="text-muted-foreground">قیمت:</dt>
                <dd className="font-bold">{formatToman(p.priceToman)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </article>
      {faqs.length > 0 && <FAQSection items={faqs} />}
    </div>
  );
}
