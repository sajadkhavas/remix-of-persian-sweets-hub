import { createFileRoute, notFound } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { findProduct } from "@/data/products";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { ProductJsonLd } from "@/components/jsonld/ProductJsonLd";
import { FAQSection } from "@/components/aeo/FAQSection";
import { formatToman, toPersianDigits } from "@/lib/format";
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
      description: p.description.slice(0, 150),
      path: `/product/${p.slug}`,
      type: "product",
    });
  },
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const crumbs = [
    { name: "خانه", path: "/" },
    { name: "محصولات", path: "/products" },
    { name: p.name, path: `/product/${p.slug}` },
  ];
  const faqs: FaqItem[] = [
    {
      question: `${p.name} چند روز ماندگاری دارد؟`,
      answer: `ماندگاری این محصول ${toPersianDigits(p.shelfLifeDays)} روز از زمان تولید است. تاریخ دقیق روی بسته‌بندی درج می‌شود.`,
    },
    {
      question: `مواد اولیه ${p.name} چیست؟`,
      answer: `این محصول از ${p.ingredients.join("، ")} تهیه شده و بدون مواد نگهدارنده صنعتی است.`,
    },
    {
      question: "آیا این محصول سالم به دست من می‌رسد؟",
      answer:
        "بله. تمام محصولات با کارتن دولایه و پد ضربه‌گیر بسته‌بندی و به‌صورت پست پیشتاز یا تیپاکس ارسال می‌شوند.",
    },
    {
      question: "هزینه و زمان ارسال چقدر است؟",
      answer:
        "زمان ارسال بسته به شهر مقصد بین ۱ تا ۵ روز کاری است و هزینه در مرحله پرداخت بر اساس مقصد محاسبه می‌شود.",
    },
  ];
  return (
    <div>
      <BreadcrumbJsonLd items={crumbs} />
      <ProductJsonLd product={p} />
      <Breadcrumbs items={crumbs} />
      <article>
        <h1 className="text-3xl font-bold mb-3">{p.name}</h1>
        <p className="text-lg leading-8 text-muted-foreground max-w-3xl mb-6">
          {p.description}
        </p>
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div>
            <h2 className="font-bold text-lg mb-2">مواد اولیه</h2>
            <ul className="list-disc ps-6 space-y-1">
              {p.ingredients.map((i: string) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-lg mb-2">مشخصات</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex gap-2">
                <dt className="text-muted-foreground">وزن:</dt>
                <dd>{toPersianDigits(p.weightGrams)} گرم</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-muted-foreground">ماندگاری:</dt>
                <dd>{toPersianDigits(p.shelfLifeDays)} روز</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-muted-foreground">قیمت:</dt>
                <dd className="font-bold">{formatToman(p.priceToman)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </article>
      <FAQSection items={faqs} />
    </div>
  );
}
