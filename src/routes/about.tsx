import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () =>
    buildSeo({
      title: "درباره وینیمی — قنادی خانگی با ارسال سراسری",
      description:
        "وینیمی یک قنادی خانگی است که کوکی و شیرینی خشک تازه و بدون مواد نگهدارنده تولید و به سراسر ایران ارسال می‌کند.",
      path: "/about",
    }),
  component: AboutPage,
});

function AboutPage() {
  const crumbs = [
    { name: "خانه", path: "/" },
    { name: "درباره ما", path: "/about" },
  ];
  return (
    <div>
      <BreadcrumbJsonLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-3xl font-bold mb-4">درباره {SITE.brand}</h1>
      <div className="prose max-w-3xl leading-8 space-y-4">
        <p>
          وینیمی یک قنادی خانگی است که با هدف رساندن طعم تازه و اصیل کوکی و
          شیرینی سنتی ایرانی به همه شهرهای ایران راه‌اندازی شده است.
        </p>
        <p>
          تمام محصولات ما روزانه با مواد اولیه مرغوب و بدون افزودنی صنعتی
          تولید می‌شوند و با بسته‌بندی مقاوم برای شما ارسال می‌گردند.
        </p>
      </div>
    </div>
  );
}
