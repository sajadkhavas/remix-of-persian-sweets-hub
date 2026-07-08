import { createFileRoute, notFound } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { findOccasion } from "@/data/occasions";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { FAQSection } from "@/components/aeo/FAQSection";
import type { FaqItem } from "@/components/jsonld/FAQJsonLd";

export const Route = createFileRoute("/occasion/$slug")({
  loader: ({ params }) => {
    const occasion = findOccasion(params.slug);
    if (!occasion) throw notFound();
    return { occasion };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return buildSeo({
        title: "مناسبت پیدا نشد",
        description: "این مناسبت در وینیمی وجود ندارد.",
        path: `/occasion/${params.slug}`,
        noindex: true,
      });
    }
    const o = loaderData.occasion;
    return buildSeo({
      title: `هدیه ${o.nameFa} — جعبه شیرینی وینیمی`,
      description: o.heroCopy.slice(0, 150),
      path: `/occasion/${o.slug}`,
    });
  },
  component: OccasionPage,
});

function OccasionPage() {
  const { occasion } = Route.useLoaderData();
  const gift = PRODUCTS.filter((p) => p.category === "gift-boxes");
  const crumbs = [
    { name: "خانه", path: "/" },
    { name: "مناسبت‌ها", path: "/" },
    { name: occasion.nameFa, path: `/occasion/${occasion.slug}` },
  ];
  const faqs: FaqItem[] = [
    {
      question: `بهترین هدیه برای ${occasion.nameFa} چیست؟`,
      answer: `جعبه‌های هدیه وینیمی با ترکیبی از کوکی و شیرینی خشک، انتخابی شکیل و به‌یادماندنی برای ${occasion.nameFa} است.`,
    },
    {
      question: `تا چند روز مانده به ${occasion.nameFa} می‌توانم سفارش دهم؟`,
      answer:
        "پیشنهاد می‌کنیم دست‌کم ۴ روز کاری پیش از تاریخ موردنظر سفارش را ثبت کنید تا با احتساب زمان تولید و ارسال به‌موقع برسد.",
    },
    {
      question: "آیا امکان درج پیام شخصی روی کارت هدیه هست؟",
      answer:
        "بله. در مرحله ثبت سفارش می‌توانید متن کارت تبریک دست‌نویس را وارد کنید.",
    },
    {
      question: "آیا امکان ارسال هدیه به آدرس گیرنده وجود دارد؟",
      answer:
        "بله. کافیست آدرس گیرنده را در بخش ارسال وارد کنید؛ فاکتور برای شما و بسته برای گیرنده ارسال می‌شود.",
    },
  ];
  return (
    <div>
      <BreadcrumbJsonLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-3xl font-bold mb-3">هدیه {occasion.nameFa}</h1>
      <p className="text-muted-foreground text-lg leading-8 max-w-3xl mb-6">
        {occasion.heroCopy}
      </p>
      <p className="text-sm text-muted-foreground mb-8">
        بازه زمانی: {occasion.dateWindow}
      </p>
      <h2 className="text-2xl font-bold mb-4">جعبه‌های پیشنهادی</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gift.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <FAQSection items={faqs} />
    </div>
  );
}
