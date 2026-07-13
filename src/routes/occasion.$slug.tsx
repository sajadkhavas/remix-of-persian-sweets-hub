import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { buildSeo } from "@/lib/seo";
import { findOccasion } from "@/data/occasions";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { FAQSection } from "@/components/aeo/FAQSection";
import { SITE } from "@/lib/site";
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
      title: `هدیه ${o.nameFa} | کوکی و شیرینی دست‌پخت وینیمی`,
      description: o.heroCopy.slice(0, 155),
      path: `/occasion/${o.slug}`,
    });
  },
  component: OccasionPage,
});

const OCCASION_EMOJI: Record<string, string> = {
  yalda: "🌙",
  nowruz: "🌸",
  valentine: "❤️",
  "mothers-day": "💐",
  "fathers-day": "👑",
  "teachers-day": "📚",
};

const OCCASION_EXTRA: Record<string, string> = {
  yalda:
    "شب یلدا فرصتی برای دورهمی گرم خانوادگی است. یک جعبه کوکی دست‌پخت وینیمی، هدیه‌ای صمیمی و خوش‌طعم برای این شب خاص.",
  nowruz:
    "نوروز را با شیرینی‌های تازه وینیمی شیرین‌تر کنید. باکس‌های نوروزی ما برای سفره هفت‌سین و پذیرایی از مهمانان عید طراحی شده‌اند.",
  valentine:
    "احساساتت را با یک جعبه کوکی عاشقانه بیان کن. کوکی‌های ویژه ولنتاین وینیمی، هدیه‌ای متفاوت و دلنشین.",
  "mothers-day":
    "بهترین هدیه برای مادر، نشان دادن عشق با دست‌پختی که با عشق آماده شده. باکس ویژه روز مادر.",
  "fathers-day": "پدر عزیزت را با یک باکس شیرینی خانگی غافلگیر کن.",
  "teachers-day":
    "قدردانی از معلم با جعبه‌های شیرینی خانگی — هدیه‌ای متفاوت و ماندگار.",
};

const GIFT_IDEAS = [
  { emoji: "🍪", title: "باکس کوکی", desc: "ترکیبی از بهترین کوکی‌های وینیمی" },
  { emoji: "🎂", title: "کیک ویژه", desc: "کیک سفارشی برای این مناسبت" },
  { emoji: "🎁", title: "پک ترکیبی", desc: "کوکی + کیک + کارت هدیه دست‌نویس" },
];

const Reveal = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

function OccasionPage() {
  const { occasion } = Route.useLoaderData();

  // نمایش کوکی‌ها و کیک‌ها — نه gift-boxes که خالیه
  const displayProducts = PRODUCTS.filter(
    (p) => p.category === "cookies" || p.category === "cakes",
  ).slice(0, 6);

  const occasionEmoji = OCCASION_EMOJI[occasion.slug] ?? "🎁";
  const extraText = OCCASION_EXTRA[occasion.slug] ?? "";

  const crumbs = [
    { name: "خانه", path: "/" },
    { name: "مناسبت‌ها", path: "/" },
    { name: occasion.nameFa, path: `/occasion/${occasion.slug}` },
  ];

  const faqs: FaqItem[] = [
    {
      question: `بهترین هدیه برای ${occasion.nameFa} چیست؟`,
      answer: `جعبه‌های هدیه وینیمی با ترکیبی از کوکی و شیرینی دست‌پخت، انتخابی شکیل و به‌یادماندنی برای ${occasion.nameFa} است.`,
    },
    {
      question: `تا چند روز مانده به ${occasion.nameFa} سفارش دهم؟`,
      answer:
        "پیشنهاد می‌کنیم دست‌کم ۴ روز کاری پیش از تاریخ موردنظر سفارش را ثبت کنید تا به‌موقع برسد.",
    },
    {
      question: "آیا امکان درج پیام شخصی روی کارت هدیه هست؟",
      answer:
        "بله. در مرحله ثبت سفارش می‌توانید متن کارت تبریک دست‌نویس را وارد کنید.",
    },
    {
      question: "آیا امکان ارسال هدیه به آدرس گیرنده وجود دارد؟",
      answer:
        "بله. آدرس گیرنده را در بخش ارسال وارد کنید؛ فاکتور برای شما و بسته برای گیرنده ارسال می‌شود.",
    },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#FEFCF9]">
      <BreadcrumbJsonLd items={crumbs} />

      {/* Hero */}
      <section
        className="border-b py-20 text-center"
        style={{
          background:
            "linear-gradient(160deg, rgba(141,184,122,0.1) 0%, var(--accent-cream) 100%)",
          borderColor: "rgba(141,184,122,0.15)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 text-6xl">{occasionEmoji}</div>
          <span
            className="mb-4 inline-block rounded-full px-4 py-1 text-sm font-semibold text-[var(--primary-dark)]"
            style={{ background: "rgba(141,184,122,0.15)" }}
          >
            {occasion.dateWindow}
          </span>
          <h1
            className="mb-4 font-extrabold text-[var(--accent-brown)]"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
          >
            هدیه {occasion.nameFa}
          </h1>
          <p className="mx-auto max-w-xl leading-8 text-[var(--gray-text)]">
            {occasion.heroCopy}
          </p>
          {extraText && (
            <p className="mx-auto mt-3 max-w-xl leading-8 text-[var(--gray-text)] opacity-80">
              {extraText}
            </p>
          )}
          <div className="mt-8">
            <a
              href={`${SITE.whatsapp}?text=${encodeURIComponent(`سلام، می‌خوام هدیه ${occasion.nameFa} سفارش بدم`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-[var(--primary)] px-8 py-3 font-bold text-white"
            >
              سفارش هدیه {occasion.nameFa}
            </a>
          </div>
        </motion.div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <Breadcrumbs items={crumbs} />

        {/* Gift ideas */}
        <section className="my-10">
          <Reveal>
            <h2 className="mb-6 text-center text-2xl font-bold text-[var(--accent-brown)]">
              ایده‌های هدیه برای {occasion.nameFa}
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {GIFT_IDEAS.map((idea, i) => (
              <Reveal key={idea.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-2xl bg-white p-6 text-center"
                  style={{ border: "1px solid rgba(141,184,122,0.2)" }}
                >
                  <div className="mb-3 text-4xl">{idea.emoji}</div>
                  <h3 className="mb-2 font-bold text-[var(--accent-brown)]">{idea.title}</h3>
                  <p className="text-sm leading-7 text-[var(--gray-text)]">{idea.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="my-10">
          <Reveal>
            <h2 className="mb-6 text-2xl font-bold text-[var(--accent-brown)]">
              محصولات ویژه {occasion.nameFa}
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {displayProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              to="/products"
              className="font-semibold text-[var(--primary-dark)] underline underline-offset-4"
            >
              مشاهده همه محصولات
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection
          items={faqs}
          heading={`سؤالات متداول درباره هدیه ${occasion.nameFa}`}
        />
      </div>
    </div>
  );
}
