import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { FAQSection } from "@/components/aeo/FAQSection";
import { GENERAL_FAQ } from "@/data/faqs";

export const Route = createFileRoute("/faq")({
  head: () =>
    buildSeo({
      title: "پرسش‌های پرتکرار درباره سفارش و ارسال",
      description: "پاسخ سؤالات پرتکرار درباره سفارش، ارسال، بسته‌بندی و ماندگاری محصولات وینیمی.",
      path: "/faq",
    }),
  component: FaqPage,
});

function FaqPage() {
  const crumbs = [
    { name: "خانه", path: "/" },
    { name: "پرسش‌های پرتکرار", path: "/faq" },
  ];
  return (
    <div>
      <BreadcrumbJsonLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-3xl font-bold mb-6">پرسش‌های پرتکرار</h1>
      <FAQSection items={GENERAL_FAQ} heading="سؤالات متداول مشتریان" />
    </div>
  );
}
