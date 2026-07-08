import { createFileRoute, Link } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { PRODUCTS } from "@/data/products";
import { CITIES } from "@/data/cities";
import { OCCASIONS } from "@/data/occasions";
import { ProductCard } from "@/components/ProductCard";
import { FAQSection } from "@/components/aeo/FAQSection";
import { GENERAL_FAQ } from "@/data/faqs";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () =>
    buildSeo({
      title: "کوکی و شیرینی خشک تازه با ارسال به سراسر ایران",
      description:
        "وینیمی؛ کوکی خانگی و شیرینی خشک سنتی با بسته‌بندی مقاوم و ارسال به تمام شهرهای ایران. تازه، بدون مواد نگهدارنده.",
      path: "/",
    }),
  component: Home,
});

function Home() {
  const featured = PRODUCTS.slice(0, 4);
  return (
    <div>
      <section className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {SITE.brand} — کوکی و شیرینی خشک تازه با ارسال به سراسر ایران
        </h1>
        <p className="text-lg leading-8 text-muted-foreground max-w-3xl">
          کوکی خانگی، باقلوا، کلمپه کرمانی، نان نخودچی و جعبه‌های هدیه ویژه؛
          تازه‌پخت، بدون مواد نگهدارنده و با بسته‌بندی مقاوم برای پست به تمام
          شهرهای ایران.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            to="/products"
            className="inline-flex items-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium"
          >
            دیدن همه محصولات
          </Link>
          <Link
            to="/packaging-and-shipping"
            className="inline-flex items-center rounded-md border border-input px-4 py-2 text-sm"
          >
            بسته‌بندی و ارسال
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">محصولات پرطرفدار</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">ارسال به شهرهای ایران</h2>
        <ul className="flex flex-wrap gap-2 text-sm">
          {CITIES.map((c) => (
            <li key={c.slug}>
              <Link
                to="/shipping-to/$city"
                params={{ city: c.slug }}
                className="inline-block border border-border rounded-full px-3 py-1 hover:bg-accent"
              >
                ارسال به {c.nameFa}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">مناسبت‌ها</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {OCCASIONS.map((o) => (
            <li key={o.slug} className="border border-border rounded-lg p-4">
              <Link to="/occasion/$slug" params={{ slug: o.slug }}>
                <h3 className="font-semibold mb-1">{o.nameFa}</h3>
                <p className="text-sm text-muted-foreground">{o.heroCopy}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <FAQSection items={GENERAL_FAQ} />
    </div>
  );
}
