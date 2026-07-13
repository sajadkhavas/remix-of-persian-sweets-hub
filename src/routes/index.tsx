import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Instagram } from "lucide-react";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { FloatingBadge } from "@/components/animations/FloatingBadge";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Marquee } from "@/components/animations/Marquee";
import { AnimatedFAQ } from "@/components/animations/AnimatedFAQ";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import { GENERAL_FAQ } from "@/data/faqs";
import { SITE } from "@/lib/site";
import { buildSeo } from "@/lib/seo";
import { formatToman } from "@/lib/format";

export const Route = createFileRoute("/")({
  head: () =>
    buildSeo({
      title: "کیک و کوکی دست‌پخت، ارسال به سراسر ایران",
      description:
        "کوکی و شیرینی دست‌پخت با مواد اولیه تازه، بدون نگهدارنده، با گزینه‌های رژیمی و بدون قند افزوده. ارسال با بسته‌بندی محافظ به سراسر ایران.",
      path: "/",
    }),
  component: HomePage,
});

const HERO_EMOJIS = ["🍪", "🧁", "🎂", "🍫", "🥐", "🌿"];
const HERO_WORDS = ["کیک", "و", "کوکی", "که", "مثل", "خانه", "مزه", "می‌ده"];
const TRUST_PILLS = ["🌿 بدون نگهدارنده", "🏠 دست‌پخت خانگی", "🚚 ارسال سراسری", "💚 گزینه رژیمی"];
const MARQUEE_ITEMS = [
  "🧁 پخت تازه روزانه",
  "🌿 بدون نگهدارنده مصنوعی",
  "📦 بسته‌بندی محافظ ویژه پست",
  "🚚 ارسال به سراسر ایران",
  "💚 گزینه رژیمی و بدون قند افزوده",
  "🏠 دست‌پخت خانگی",
];
const CATEGORY_TABS = [
  { key: "all", label: "همه" },
  { key: "cookies", label: "کوکی‌ها" },
  { key: "cakes", label: "کیک و دسر" },
  { key: "diet", label: "رژیمی" },
] as const;
type TabKey = (typeof CATEGORY_TABS)[number]["key"];

const ORDER_STEPS = [
  { icon: "📋", title: "انتخاب کنید", description: "محصول مورد نظرتان را از منو انتخاب کنید" },
  { icon: "💬", title: "پیام بدید", description: "از طریق واتساپ یا دایرکت سفارش دهید" },
  { icon: "📦", title: "دریافت کنید", description: "با بسته‌بندی محافظ به دستتان می‌رسد" },
];

const SHIPPING_BADGES = [
  { icon: "📦", label: "بسته‌بندی چندلایه" },
  { icon: "🚚", label: "پست پیشتاز" },
  { icon: "🌡️", label: "مقاوم در حمل" },
  { icon: "✅", label: "ضمانت سالم رسیدن" },
];

const INSTAGRAM_EMOJIS = ["🍪", "🧁", "🎂", "🍫", "🥐", "❤️"];

function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="overflow-hidden">
      <HeroSection reduceMotion={!!shouldReduceMotion} />
      <MarqueeSection />
      <ProductsSection />
      <DietHighlightSection />
      <AboutTeaserSection />
      <HowToOrderSection />
      <ShippingTrustSection />
      <FaqSection />
      <InstagramSection />
    </div>
  );
}

function HeroSection({ reduceMotion }: { reduceMotion: boolean }) {
  const bestSeller = PRODUCTS.find((p) => p.badge === "bestseller") ?? PRODUCTS[0];
  return (
    <section
      className="relative overflow-hidden px-4 pb-16 pt-10 md:pt-16"
      style={{ background: "var(--primary-light)" }}
    >
      {!reduceMotion &&
        HERO_EMOJIS.map((emoji, i) => (
          <motion.span
            key={emoji}
            className="pointer-events-none absolute select-none text-3xl opacity-20 md:text-5xl"
            style={{
              top: `${10 + (i % 3) * 25}%`,
              left: `${(i * 17) % 90}%`,
            }}
            animate={{ y: [0, -14, 0], rotate: [0, 6, 0] }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            aria-hidden="true"
          >
            {emoji}
          </motion.span>
        ))}

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block rounded-full px-4 py-1.5 text-sm font-semibold"
            style={{ background: "white", color: "var(--primary-dark)" }}
          >
            ✦ دست‌پخت تازه، ارسال سراسری
          </motion.p>

          <h1
            className="mb-5 text-4xl font-black leading-[1.25] md:text-6xl"
            style={{ color: "var(--accent-brown)" }}
          >
            {HERO_WORDS.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                className="me-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mb-6 text-lg leading-8 text-muted-foreground md:text-xl"
          >
            از اندیشه تا هر گوشه‌ای از ایران — مواد اولیه تازه، بهداشت وسواسی، عشق به پخت.
          </motion.p>

          <div className="mb-8 flex flex-wrap gap-2">
            {TRUST_PILLS.map((pill, i) => (
              <motion.span
                key={pill}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.08 }}
                className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold shadow-sm"
                style={{ color: "var(--accent-brown)" }}
              >
                {pill}
              </motion.span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <MagneticButton
              href="#products"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold shadow-lg"
            >
              <span
                className="inline-block rounded-full px-6 py-3"
                style={{ background: "var(--primary-dark)", color: "white" }}
              >
                مشاهده محصولات
              </span>
            </MagneticButton>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 bg-white px-6 py-3 text-sm font-bold shadow-sm"
              style={{ borderColor: "var(--primary-dark)", color: "var(--primary-dark)" }}
            >
              سفارش واتساپ
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative mx-auto w-full max-w-md"
        >
          <div
            className="absolute inset-0 -z-10 rounded-[2rem] blur-3xl"
            style={{ background: "var(--primary)", opacity: 0.35 }}
          />
          <div className="relative rounded-[2rem] bg-white p-8 shadow-2xl">
            <div
              className="mb-4 flex aspect-square items-center justify-center rounded-2xl text-8xl"
              style={{ background: "var(--primary-light)" }}
            >
              {bestSeller?.emoji ?? "🍪"}
            </div>
            <h3 className="text-lg font-bold" style={{ color: "var(--accent-brown)" }}>
              {bestSeller?.name ?? "کوکی شکلاتی وینیمی"}
            </h3>
            <p className="mt-1 text-xl font-black" style={{ color: "var(--primary-dark)" }}>
              {formatToman(bestSeller?.priceToman ?? 120000)}
            </p>
            <FloatingBadge className="absolute -top-4 -start-4 rounded-full px-4 py-2 text-sm font-bold shadow-lg">
              <span
                className="inline-block rounded-full px-4 py-2"
                style={{ background: "var(--accent-gold)", color: "white" }}
              >
                ⭐ ۱۰۰٪ تازه
              </span>
            </FloatingBadge>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MarqueeSection() {
  return (
    <section
      className="border-y py-4"
      style={{ background: "white", borderColor: "var(--border)" }}
      aria-label="مزیت‌های وینیمی"
    >
      <Marquee items={MARQUEE_ITEMS} />
    </section>
  );
}

function ProductsSection() {
  const [active, setActive] = useState<TabKey>("all");
  const filtered = useMemo(
    () => (active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active)),
    [active],
  );

  return (
    <section id="products" className="px-4 py-16 md:py-24">
      <RevealOnScroll className="mx-auto max-w-6xl text-center">
        <h2
          className="mb-3 text-3xl font-black md:text-4xl"
          style={{ color: "var(--accent-brown)" }}
        >
          محصولات ما
        </h2>
        <p className="mb-8 text-muted-foreground">تازه پخته، با عشق آماده شده</p>
      </RevealOnScroll>

      <div className="mx-auto mb-10 flex max-w-3xl flex-wrap justify-center gap-2">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActive(tab.key)}
            className="relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
            style={{
              color: active === tab.key ? "var(--primary-dark)" : "var(--gray-text, #6b7280)",
            }}
          >
            {active === tab.key && (
              <motion.span
                layoutId="active-tab"
                className="absolute inset-0 rounded-full"
                style={{ background: "var(--primary-light)" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-6xl">
        <AnimatePresence mode="wait">
          <StaggerContainer
            key={active}
            className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
          >
            {filtered.map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimatePresence>
      </div>
    </section>
  );
}

function DietHighlightSection() {
  return (
    <section className="px-4 py-16 md:py-24" style={{ background: "var(--primary-light)" }}>
      <RevealOnScroll className="mx-auto max-w-4xl text-center">
        <div className="mb-4 text-6xl">🌿</div>
        <h2
          className="mb-4 text-3xl font-black md:text-4xl"
          style={{ color: "var(--accent-brown)" }}
        >
          برای کسانی که مراقب سلامتی‌شان هستند
        </h2>
        <p className="mb-10 text-lg leading-8 text-muted-foreground">
          در وینیمی، از همان ابتدا برای عزیزانمان که با دیابت زندگی می‌کنند فکر کردیم.
        </p>

        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          {[
            { icon: "🍃", title: "کوکی رژیمی", sub: "بدون قند افزوده، کم‌کالری" },
            { icon: "💚", title: "کوکی بدون قند افزوده", sub: "با اطلاعات شفاف مواد اولیه" },
          ].map((card) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -4 }}
              className="rounded-2xl bg-white p-6 text-start shadow-md"
            >
              <div className="mb-2 text-4xl">{card.icon}</div>
              <h3 className="text-lg font-bold" style={{ color: "var(--accent-brown)" }}>
                {card.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{card.sub}</p>
            </motion.div>
          ))}
        </div>

        <Link
          to="/products/$categorySlug"
          params={{ categorySlug: "diet" }}
          className="inline-block rounded-full px-6 py-3 text-sm font-bold shadow-md"
          style={{ background: "var(--primary-dark)", color: "white" }}
        >
          مشاهده محصولات سالم
        </Link>
      </RevealOnScroll>
    </section>
  );
}

function AboutTeaserSection() {
  return (
    <section className="px-4 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <RevealOnScroll direction="right">
          <div
            className="flex aspect-square items-center justify-center rounded-[2rem] text-9xl shadow-lg"
            style={{ background: "var(--primary-light)" }}
          >
            🧁
          </div>
        </RevealOnScroll>
        <RevealOnScroll direction="left">
          <p className="mb-2 text-sm font-bold" style={{ color: "var(--primary-dark)" }}>
            داستان ما
          </p>
          <h2
            className="mb-4 text-3xl font-black md:text-4xl"
            style={{ color: "var(--accent-brown)" }}
          >
            از بوی کیک تازه تا وینیمی
          </h2>
          <p className="mb-6 leading-8 text-muted-foreground">
            همه‌چیز از کودکی شروع شد — از عطر کیک تازه‌ای که در خانه می‌پیچید. وینیمی ثمره سال‌ها
            عشق به پخت و وسواس در کیفیت است.
          </p>
          <ul className="mb-6 space-y-2">
            {[
              "مواد اولیه تازه، بدون نگهدارنده",
              "گزینه‌های رژیمی و بدون قند",
              "بسته‌بندی ویژه ارسال پستی",
              "پخت تازه با هر سفارش",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm">
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold"
                  style={{ background: "var(--primary)", color: "var(--primary-dark)" }}
                >
                  ✓
                </span>
                <span style={{ color: "var(--accent-brown)" }}>{item}</span>
              </li>
            ))}
          </ul>
          <Link
            to="/about"
            className="inline-block rounded-full border-2 px-6 py-3 text-sm font-bold"
            style={{ borderColor: "var(--primary-dark)", color: "var(--primary-dark)" }}
          >
            بیشتر بدانید
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}

function HowToOrderSection() {
  return (
    <section className="px-4 py-16 md:py-24" style={{ background: "var(--primary-light)" }}>
      <RevealOnScroll className="mx-auto mb-12 max-w-4xl text-center">
        <h2 className="text-3xl font-black md:text-4xl" style={{ color: "var(--accent-brown)" }}>
          چطور سفارش بدم؟
        </h2>
      </RevealOnScroll>

      <StaggerContainer className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        {ORDER_STEPS.map((step, i) => (
          <StaggerItem key={step.title}>
            <motion.div
              whileHover={{ y: -6 }}
              className="relative rounded-2xl bg-white p-6 text-center shadow-md"
            >
              <div className="mb-4 text-5xl">{step.icon}</div>
              <div
                className="absolute -top-4 start-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full text-lg font-black shadow-md"
                style={{ background: "var(--primary-dark)", color: "white" }}
              >
                {i + 1}
              </div>
              <h3 className="mb-2 text-lg font-bold" style={{ color: "var(--accent-brown)" }}>
                {step.title}
              </h3>
              <p className="text-sm leading-7 text-muted-foreground">{step.description}</p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="mt-10 text-center">
        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full px-8 py-4 text-base font-bold shadow-lg"
          style={{ background: "var(--primary-dark)", color: "white" }}
        >
          ثبت سفارش در واتساپ
        </a>
      </div>
    </section>
  );
}

function ShippingTrustSection() {
  return (
    <section className="px-4 py-16 md:py-24">
      <RevealOnScroll className="mx-auto mb-8 max-w-4xl text-center">
        <h2 className="text-3xl font-black md:text-4xl" style={{ color: "var(--accent-brown)" }}>
          ارسال سراسری — از اندیشه تا همه جای ایران
        </h2>
      </RevealOnScroll>

      <RevealOnScroll className="mx-auto mb-10 max-w-3xl">
        <div
          className="rounded-2xl border p-6"
          style={{ background: "var(--primary-light)", borderColor: "var(--border)" }}
        >
          <h3 className="mb-2 text-lg font-bold" style={{ color: "var(--accent-brown)" }}>
            آیا کوکی توی پست خراب نمیشه؟
          </h3>
          <p className="leading-8 text-muted-foreground">
            برای این سوال از همان ابتدا برنامه داشتیم. هر محصول با بسته‌بندی چندلایه محافظ ارسال
            می‌شود.
          </p>
        </div>
      </RevealOnScroll>

      <StaggerContainer className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
        {SHIPPING_BADGES.map((badge) => (
          <StaggerItem key={badge.label}>
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-sm"
            >
              <span className="mb-2 text-4xl">{badge.icon}</span>
              <span className="text-sm font-semibold" style={{ color: "var(--accent-brown)" }}>
                {badge.label}
              </span>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="px-4 py-16 md:py-24" style={{ background: "var(--primary-light)" }}>
      <div className="mx-auto max-w-4xl">
        <AnimatedFAQ items={GENERAL_FAQ} />
      </div>
    </section>
  );
}

function InstagramSection() {
  return (
    <section className="px-4 py-16 md:py-24">
      <RevealOnScroll className="mx-auto mb-8 max-w-4xl text-center">
        <h2
          className="mb-2 text-3xl font-black md:text-4xl"
          style={{ color: "var(--accent-brown)" }}
        >
          ما را در اینستاگرام دنبال کنید
        </h2>
        <p className="text-muted-foreground">@{SITE.instagramHandle}</p>
      </RevealOnScroll>

      <StaggerContainer className="mx-auto mb-8 grid max-w-4xl grid-cols-3 gap-2 md:grid-cols-6">
        {INSTAGRAM_EMOJIS.map((emoji, i) => (
          <StaggerItem key={i}>
            <motion.a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-xl text-5xl"
              style={{ background: "var(--primary-light)" }}
            >
              <span>{emoji}</span>
              <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <Instagram className="h-8 w-8 text-white" />
              </span>
            </motion.a>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="text-center">
        <a
          href={SITE.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-md"
          style={{ background: "var(--primary-dark)", color: "white" }}
        >
          <Instagram className="h-4 w-4" />
          دنبال کردن در اینستاگرام
        </a>
      </div>
    </section>
  );
}
