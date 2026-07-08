import { createFileRoute, Link } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { POSTS } from "@/data/blog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { toPersianDigits } from "@/lib/format";

export const Route = createFileRoute("/blog")({
  head: () =>
    buildSeo({
      title: "بلاگ وینیمی — راهنما، دستور پخت و مناسبت‌ها",
      description:
        "مقاله‌های وینیمی درباره کوکی، شیرینی خشک ایرانی، بسته‌بندی، ارسال و راهنمای انتخاب هدیه.",
      path: "/blog",
    }),
  component: BlogIndex,
});

function BlogIndex() {
  const crumbs = [
    { name: "خانه", path: "/" },
    { name: "بلاگ", path: "/blog" },
  ];
  return (
    <div>
      <BreadcrumbJsonLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-3xl font-bold mb-6">بلاگ وینیمی</h1>
      <ul className="space-y-6">
        {POSTS.map((p) => (
          <li key={p.slug} className="border border-border rounded-lg p-5">
            <h2 className="text-xl font-semibold">
              <Link to="/blog/$slug" params={{ slug: p.slug }}>
                {p.title}
              </Link>
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              {toPersianDigits(p.datePublished)} — {p.author}
            </p>
            <p className="mt-3 leading-7">{p.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
