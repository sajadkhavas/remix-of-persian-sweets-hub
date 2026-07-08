import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () =>
    buildSeo({
      title: "تماس با وینیمی",
      description:
        "راه‌های ارتباطی با وینیمی برای ثبت سفارش، پیگیری ارسال و سفارش‌های سازمانی.",
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  const crumbs = [
    { name: "خانه", path: "/" },
    { name: "تماس با ما", path: "/contact" },
  ];
  return (
    <div>
      <BreadcrumbJsonLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-3xl font-bold mb-6">تماس با ما</h1>
      <ul className="space-y-3">
        <li>
          ایمیل:{" "}
          <a href={`mailto:${SITE.email}`} className="underline">
            {SITE.email}
          </a>
        </li>
        <li>
          اینستاگرام:{" "}
          <a href={SITE.instagram} rel="noopener" className="underline">
            {SITE.instagram}
          </a>
        </li>
      </ul>
    </div>
  );
}
