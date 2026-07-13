import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { buildSeo } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { findCity } from "@/data/cities";
import { PRODUCTS } from "@/data/products";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { FAQSection } from "@/components/aeo/FAQSection";
import { AnswerBlock } from "@/components/aeo/AnswerBlock";
import { ProductCard } from "@/components/ProductCard";
import type { FaqItem } from "@/components/jsonld/FAQJsonLd";

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.55, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

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
      answer: "در حال حاضر تنها پرداخت آنلاین از طریق درگاه بانکی امکان‌پذیر است.",
    },
  ];

  const infoCards = [
    { icon: "🚚", title: "روش ارسال", value: city.shippingMethod },
    { icon: "⏰", title: "زمان تحویل", value: city.deliveryDays },
    { icon: "📦", title: "بسته‌بندی", value: city.packagingNote },
  ];

  const features = [
    {
      icon: "🌿",
      title: "مواد اولیه تازه",
      description: "بدون نگهدارنده مصنوعی، پخت با هر سفارش",
    },
    {
      icon: "📦",
      title: "بسته‌بندی چندلایه",
      description: "کارتن دولایه + پد ضربه‌گیر حبابی",
    },
    {
      icon: "🔍",
      title: "کد رهگیری",
      description: "پس از ارسال از طریق واتساپ ارسال می‌شود",
    },
    {
      icon: "✅",
      title: "ضمانت سالم رسیدن",
      description: "در صورت آسیب، جایگزین یا بازپرداخت",
    },
  ];

  const shippableProducts = PRODUCTS.filter((p) => p.category === "cookies").slice(0, 4);

  return (
    <div dir="rtl" className="space-y-12">
      <BreadcrumbJsonLd items={crumbs} />
      <Breadcrumbs items={crumbs} />

      <section className="overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--primary-light)] via-white to-[var(--accent-cream)] px-6 py-14 text-center shadow-sm md:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white text-5xl shadow-sm"
        >
          🚚
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-3xl font-extrabold leading-tight text-[var(--accent-brown)] md:text-5xl"
        >
          ارسال کوکی و شیرینی وینیمی به {city.nameFa}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
          className="mx-auto mt-5 max-w-3xl text-lg leading-9 text-[var(--gray-text)]"
        >
          سفارش‌های {city.nameFa} با {city.shippingMethod}، در بازه {city.deliveryDays} و با{" "}
          {city.packagingNote} ارسال می‌شوند.
        </motion.p>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {infoCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
            className="rounded-2xl border border-[var(--border)] bg-white p-6 text-center shadow-sm"
          >
            <div className="text-4xl" aria-hidden="true">
              {card.icon}
            </div>
            <h2 className="mt-4 text-lg font-bold text-[var(--accent-brown)]">{card.title}</h2>
            <p className="mt-2 leading-7 text-[var(--gray-text)]">{card.value}</p>
          </motion.div>
        ))}
      </section>

      <AnswerBlock
        question={`چطور کوکی وینیمی را در ${city.nameFa} تحویل بگیرم؟`}
        answer={`سفارش‌های ${city.nameFa} از طریق ${city.shippingMethod} در بازه ${city.deliveryDays} با ${city.packagingNote} ارسال می‌شود.`}
      />

      <section>
        <Reveal>
          <h2 className="text-3xl font-extrabold text-[var(--accent-brown)]">
            چرا وینیمی برای ارسال به {city.nameFa}؟
          </h2>
        </Reveal>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.08}>
              <div className="h-full rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
                <span className="text-4xl" aria-hidden="true">
                  {feature.icon}
                </span>
                <h3 className="mt-4 text-xl font-bold text-[var(--accent-brown)]">
                  {feature.title}
                </h3>
                <p className="mt-2 leading-8 text-[var(--gray-text)]">{feature.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal>
        <section>
          <h2 className="text-3xl font-extrabold text-[var(--accent-brown)]">
            محصولات مناسب برای ارسال به {city.nameFa}
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {shippableProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] p-8 text-center text-white shadow-sm md:p-10">
          <h2 className="text-3xl font-extrabold">آماده سفارش به {city.nameFa} هستید؟</h2>
          <p className="mx-auto mt-3 max-w-2xl leading-8 text-white/85">
            محصولات تازه وینیمی با بسته‌بندی امن آماده رسیدن به دست شما هستند.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/products"
              className="rounded-full bg-white px-6 py-3 font-bold text-[var(--primary-dark)] transition-colors hover:bg-[var(--accent-cream)]"
            >
              مشاهده محصولات
            </Link>
            <a
              href={SITE.whatsapp}
              rel="noopener"
              className="rounded-full border border-white/70 px-6 py-3 font-bold text-white transition-colors hover:bg-white hover:text-[var(--primary-dark)]"
            >
              سفارش واتساپی
            </a>
          </div>
        </section>
      </Reveal>

      <FAQSection items={faqs} />
    </div>
  );
}
