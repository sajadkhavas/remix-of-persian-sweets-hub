import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";
import { buildSeo } from "@/lib/seo";
import { PRODUCTS, findProduct } from "@/data/products";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { ProductJsonLd } from "@/components/jsonld/ProductJsonLd";
import { FAQSection } from "@/components/aeo/FAQSection";
import { Img } from "@/components/Img";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { useCartStore } from "@/lib/cart";
import { formatToman, toPersianDigits } from "@/lib/format";
import type { Product, ProductBadge, ProductCategory } from "@/data/types";
import type { FaqItem } from "@/components/jsonld/FAQJsonLd";

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  cookies: "کوکی‌ها",
  cakes: "کیک‌ها",
  diet: "رژیمی",
  "dry-sweets": "شیرینی خشک",
  "gift-boxes": "جعبه هدیه",
};

const BADGE_LABELS: Record<ProductBadge, string> = {
  bestseller: "⭐ پرفروش",
  diet: "🌿 رژیمی",
  diabetic: "💚 مناسب دیابتی‌ها",
  special: "✨ ویژه",
  new: "🆕 جدید",
};

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
      title: p.seo.title,
      description: p.seo.description.slice(0, 155),
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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const faqs = buildProductFaqs(p);
  const categoryName = CATEGORY_LABELS[p.category];
  const crumbs = [
    { name: "خانه", path: "/" },
    { name: "محصولات", path: "/products" },
    { name: categoryName, path: "/products" },
    { name: p.name, path: `/product/${p.slug}` },
  ];
  const validComparePrice = Boolean(p.compareAtPriceToman && p.compareAtPriceToman > p.priceToman);
  const discountPercent = validComparePrice
    ? Math.round(((p.compareAtPriceToman! - p.priceToman) / p.compareAtPriceToman!) * 100)
    : 0;
  const stockStatus = p.stock > 0 ? `${toPersianDigits(p.stock)} عدد موجود` : "ناموجود";
  const selectedImage = p.images[selectedImageIndex];
  const showDietAdvisory = p.category === "diet" || p.badge === "diet" || p.badge === "diabetic";

  const specifications = useMemo(
    () =>
      [
        p.weightGrams ? ["وزن", `${toPersianDigits(p.weightGrams)} گرم`] : null,
        p.quantityPerPack ? ["تعداد در بسته", `${toPersianDigits(p.quantityPerPack)} عدد`] : null,
        p.shelfLifeDays
          ? ["ماندگاری", `${toPersianDigits(p.shelfLifeDays)} روز از زمان تولید`]
          : null,
        ["دسته‌بندی", categoryName],
        ["شناسه کالا", p.sku],
      ].filter(Boolean) as string[][],
    [categoryName, p],
  );

  return (
    <div className="space-y-10">
      <BreadcrumbJsonLd items={crumbs} />
      <ProductJsonLd product={p} />
      <Breadcrumbs items={crumbs} />

      <article className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
        <section aria-label="گالری تصاویر محصول" className="space-y-4">
          <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
            {selectedImage ? (
              <Img
                src={selectedImage.url}
                alt={selectedImage.alt || `تصویر ${p.name}`}
                width={selectedImage.width ?? 900}
                height={selectedImage.height ?? 900}
                priority
                className="aspect-square w-full object-cover"
              />
            ) : (
              <div className="flex aspect-square flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#FFF7E8] to-[#F7DFC3] text-center">
                <span className="text-8xl" aria-hidden="true">
                  {p.emoji ?? "🍰"}
                </span>
                <p className="px-6 text-lg font-bold" style={{ color: "var(--accent-brown)" }}>
                  تصویر محصول به‌زودی اضافه می‌شود
                </p>
              </div>
            )}
          </div>
          {p.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
              {p.images.map((image, index) => (
                <button
                  key={image.url}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  aria-label={`نمایش تصویر ${toPersianDigits(index + 1)} ${p.name}`}
                  className={`overflow-hidden rounded-2xl border bg-white p-1 ${index === selectedImageIndex ? "border-primary ring-2 ring-primary/30" : "border-border"}`}
                >
                  <Img
                    src={image.url}
                    alt={image.alt || `نمای کوچک ${p.name}`}
                    width={160}
                    height={160}
                    className="aspect-square w-full rounded-xl object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="self-start rounded-3xl border border-border bg-white p-5 shadow-sm lg:sticky lg:top-24">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {p.badge && (
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                {BADGE_LABELS[p.badge]}
              </span>
            )}
            {validComparePrice && (
              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700">
                ٪{toPersianDigits(discountPercent)} تخفیف
              </span>
            )}
          </div>
          <h1
            className="text-3xl font-extrabold leading-10"
            style={{ color: "var(--accent-brown)" }}
          >
            {p.name}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">SKU: {p.sku}</p>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">{p.shortDescription}</p>
          <div className="mt-6 flex flex-wrap items-end gap-3">
            <p className="text-2xl font-extrabold" style={{ color: "var(--primary-dark)" }}>
              {formatToman(p.priceToman)}
            </p>
            {validComparePrice && (
              <p className="text-sm text-muted-foreground line-through">
                {formatToman(p.compareAtPriceToman!)}
              </p>
            )}
          </div>
          <p className={`mt-4 font-bold ${p.stock > 0 ? "text-green-700" : "text-red-700"}`}>
            {stockStatus}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <span className="text-sm font-bold">تعداد</span>
            <div className="flex items-center rounded-full border border-border bg-accent/40">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2"
                aria-label="کاهش تعداد"
              >
                −
              </button>
              <span className="min-w-10 text-center font-bold">{toPersianDigits(quantity)}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2"
                aria-label="افزایش تعداد"
              >
                +
              </button>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              disabled={p.stock <= 0}
              onClick={() => {
                addItem(
                  {
                    id: p.id,
                    slug: p.slug,
                    name: p.name,
                    priceToman: p.priceToman,
                    emoji: p.emoji ?? "🍪",
                  },
                  quantity,
                );
                toast.success(`${toPersianDigits(quantity)} عدد ${p.name} به سبد خرید اضافه شد.`);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-bold disabled:cursor-not-allowed disabled:opacity-50"
              style={{ background: "var(--primary)", color: "var(--primary-dark)" }}
            >
              <ShoppingCart size={18} /> افزودن به سبد
            </button>
            <Link
              to="/cart"
              className="inline-flex items-center justify-center rounded-full border border-border px-5 py-3 font-bold"
            >
              مشاهده سبد خرید
            </Link>
          </div>
        </section>
      </article>

      <section className="grid gap-3 rounded-3xl border border-border bg-white p-4 text-center text-sm font-bold shadow-sm sm:grid-cols-3">
        <div>🔥 پخت تازه بر اساس سفارش</div>
        <div>📦 بسته‌بندی محافظ برای مسیر ارسال</div>
        <div>🚚 ارسال به سراسر ایران</div>
      </section>

      {showDietAdvisory && (
        <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900">
          این محصول با رویکرد رژیمی/بدون قند افزوده معرفی شده است، اما توصیه پزشکی نیست. در صورت
          ابتلا به دیابت، حساسیت غذایی یا رژیم درمانی، پیش از مصرف با متخصص سلامت خود مشورت کنید.
        </aside>
      )}

      <section className="grid gap-5 md:grid-cols-2">
        <DetailCard title="معرفی محصول">
          <p>{p.longDescription}</p>
        </DetailCard>
        <DetailCard title="مواد اولیه">
          <ListOrEmpty items={p.ingredients} empty="مواد اولیه تکمیلی به‌زودی درج می‌شود." />
        </DetailCard>
        <DetailCard title="مشخصات">
          <dl className="space-y-2">
            {specifications.map(([label, value]) => (
              <div key={label} className="flex gap-2">
                <dt className="text-muted-foreground">{label}:</dt>
                <dd className="font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </DetailCard>
        <DetailCard title="شرایط نگهداری">
          <p>{p.storageInstructions ?? "در جای خشک و خنک و دور از نور مستقیم نگهداری شود."}</p>
        </DetailCard>
        <DetailCard title="آلرژن‌ها">
          <ListOrEmpty items={p.allergens} empty="آلرژن مشخصی برای این محصول ثبت نشده است." />
        </DetailCard>
        <DetailCard title="ارسال و زمان آماده‌سازی">
          <p>
            زمان آماده‌سازی معمولاً {toPersianDigits(p.preparationTimeDays ?? 1)} روز کاری است و
            امکان ارسال به سراسر ایران فراهم است.
          </p>
        </DetailCard>
      </section>

      <RelatedProducts product={p} products={PRODUCTS} />

      {faqs.length > 0 && <FAQSection items={faqs} />}
    </div>
  );
}

function DetailCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-white p-5 leading-8 shadow-sm">
      <h2 className="mb-3 text-xl font-bold" style={{ color: "var(--accent-brown)" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function ListOrEmpty({ items, empty }: { items: string[]; empty: string }) {
  if (items.length === 0) return <p>{empty}</p>;
  return (
    <ul className="list-disc space-y-1 ps-6">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
