import { createFileRoute, notFound } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { findCity } from "@/data/cities";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { FAQSection } from "@/components/aeo/FAQSection";
import { AnswerBlock } from "@/components/aeo/AnswerBlock";
import type { FaqItem } from "@/components/jsonld/FAQJsonLd";

export const Route = createFileRoute("/shipping-to/$city")({
  loader: ({ params }) => {
    const city = findCity(params.city);
    if (!city) throw notFound();
    return { city };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return buildSeo({
        title: "شهر پیدا نشد",
        description: "این مقصد در فهرست ارسال وینیمی نیست.",
        path: `/shipping-to/${params.city}`,
        noindex: true,
      });
    }
    const c = loaderData.city;
    return buildSeo({
      title: `ارسال کوکی و شیرینی به ${c.nameFa}`,
      description: `سفارش آنلاین کوکی و شیرینی خشک وینیمی با ارسال ${c.shippingMethod} به ${c.nameFa} در ${c.deliveryDays}.`,
      path: `/shipping-to/${c.slug}`,
    });
  },
  component: CityPage,
});

function CityPage() {
  const { city } = Route.useLoaderData();
  const crumbs = [
    { name: "خانه", path: "/" },
    { name: "ارسال به شهرها", path: "/products" },
    { name: city.nameFa, path: `/shipping-to/${city.slug}` },
  ];
  const faqs: FaqItem[] = [
    {
      question: `ارسال به ${city.nameFa} چند روز طول می‌کشد؟`,
      answer: `ارسال به ${city.nameFa} از طریق ${city.shippingMethod} حدود ${city.deliveryDays} زمان می‌برد.`,
    },
    {
      question: `آیا امکان ارسال کوکی به ${city.nameFa} با بسته‌بندی سالم وجود دارد؟`,
      answer: `بله. ${city.packagingNote} تا محصول بدون شکستگی به دست شما برسد.`,
    },
    {
      question: `چطور در ${city.nameFa} سفارش دهم؟`,
      answer:
        "کافیست از صفحه محصولات، محصول موردنظر را انتخاب و در مرحله پرداخت آدرس دقیق مقصد را وارد کنید.",
    },
    {
      question: "آیا امکان پرداخت در محل هست؟",
      answer:
        "در حال حاضر تنها پرداخت آنلاین از طریق درگاه بانکی امکان‌پذیر است.",
    },
  ];
  return (
    <div>
      <BreadcrumbJsonLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-3xl font-bold mb-4">
        ارسال کوکی و شیرینی وینیمی به {city.nameFa}
      </h1>
      <AnswerBlock
        question={`چطور کوکی وینیمی را در ${city.nameFa} تحویل بگیرم؟`}
        answer={`سفارش‌های ${city.nameFa} از طریق ${city.shippingMethod} در بازه ${city.deliveryDays} با ${city.packagingNote} ارسال می‌شود.`}
      />
      <FAQSection items={faqs} />
    </div>
  );
}
