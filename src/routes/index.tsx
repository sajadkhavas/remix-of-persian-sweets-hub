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
        "کوکی و شیرینی دست‌پخت با مواد اولیه تازه، بدون نگهدارنده، با گزینه‌های رژیمی و دیابتی.",
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
  "💚 گزینه رژیمی و دیابتی",
  "🏠 دست‌پخت خانگی",
];
const CATEGORY_TABS = [
  { key: "all", label: "همه" },
  { key: "cookies", label: "کوکی‌ها" },
  { key: "cakes", label: "کیک و دسر" },
  { key: "diet", label: "رژیمی و دیابتی" },
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
    <main dir="rtl">
      <HeroSection reduceMotion={!!shouldReduceMotion} />
      <MarqueeSection />
      <ProductsSection />
      <DietHighlightSection />
      <AboutTeaserSection />
      <HowToOrderSection />
      <ShippingTrustSection />
      <FaqSection />
      <InstagramSection />
    </main>
  );
}

function HeroSection({ reduceMotion }: { reduceMotion: boolean }) {
  const best = PRODUCTS.find((p) => p.badge === "bestseller") ?? PRODUCTS[0];
  return (
    <section
      className="relative flex min-h-[95vh] items-center overflow-hidden px-4 md:px-8"
      style={{ background: "var(--accent-cream)" }}
    >
      {!reduceMotion &&
        HERO_EMOJIS.map((e, i) => (
          <motion.span
            key={e + i}
            aria-hidden="true"
            className="absolute select-none text-3xl opacity-60 md:text-4xl"
            style={{ top: `${12 + ((i * 13) % 70)}%`, left: `${5 + ((i * 21) % 85)}%` }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3 + (i % 5), repeat: Infinity, ease: "easeInOut" }}
          >
            {e}
          </motion.span>
        ))}
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 py-24 md:grid-cols-2 md:items-center">
        <div className="order-1">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary-light)] px-4 py-2 text-sm text-[var(--primary-dark)]"
          >
            <span>✦</span> دست‌پخت تازه، ارسال سراسری
          </motion.div>
          <h1
            className="mb-6 font-bold leading-[1.3] text-[var(--accent-brown)]"
            style={{ fontSize: "clamp(2.2rem,5vw,3.5rem)" }}
          >
            {HERO_WORDS.map((w, i) => (
              <motion.span
                key={i}
                className="ml-2 inline-block"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                {w}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-8 max-w-md text-lg text-[var(--gray-text)]"
          >
            از اندیشه تا هر گوشه‌ای از ایران — مواد اولیه تازه، بهداشت وسواسی، عشق به پخت.
          </motion.p>
          <StaggerContainer className="mb-8 flex flex-wrap gap-2">
            {TRUST_PILLS.map((pill) => (
              <StaggerItem key={pill}>
                <span className="inline-block rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-sm text-[var(--accent-brown)]">
                  {pill}
                </span>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <div className="flex flex-wrap gap-3">
            <MagneticButton
              href="#products"
              className="rounded-full bg-[var(--primary)] px-7 py-3.5 font-semibold text-white"
            >
              مشاهده محصولات
            </MagneticButton>
            <MagneticButton
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-[var(--primary)] px-7 py-3.5 font-semibold text-[var(--primary-dark)]"
            >
              سفارش واتساپ
            </MagneticButton>
          </div>
        </div>
        <div className="order-2 relative flex items-center justify-center">
          <div
            aria-hidden="true"
            className="absolute h-[400px] w-[400px] rounded-full blur-3xl"
            style={{ background: "var(--primary)", opacity: 0.15 }}
          />
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-full max-w-sm rounded-3xl bg-white p-8 text-center"
            style={{ boxShadow: "0 30px 60px -20px rgba(93,122,74,0.35)" }}
          >
            <div className="mb-4 text-7xl">{best?.emoji ?? "🍪"}</div>
            <h3 className="mb-1 text-xl font-bold text-[var(--accent-brown)]">
              {best?.name ?? "کوکی شکلاتی وینیمی"}
            </h3>
            <p className="font-semibold text-[var(--primary-dark)]">
              {formatToman(best?.priceToman ?? 120000)}
            </p>
            <FloatingBadge className="absolute -bottom-4 -left-4 rounded-full bg-[var(--accent-gold)] px-4 py-2 text-sm font-bold text-white shadow-lg">
              ⭐ ۱۰۰٪ تازه
            </FloatingBadge>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MarqueeSection() {
  return (
    <div
      className="overflow-hidden py-3"
      style={{ background: "linear-gradient(135deg,var(--primary),var(--primary-dark))" }}
    >
      <Marquee items={MARQUEE_ITEMS} duration={28} />
    </div>
  );
}

function ProductsSection() {
  const [active, setActive] = useState<TabKey>("all");
  const filtered = useMemo(
    () => (active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active)),
    [active],
  );
  return (
    <section id="products" className="mx-auto max-w-7xl px-4 py-24 md:px-8">
      <RevealOnScroll className="mb-10 text-center">
        <span className="mb-2 block text-sm font-semibold uppercase tracking-widest text-[var(--primary-dark)]">
          محصولات ما
        </span>
        <h2 className="text-3xl font-bold text-[var(--accent-brown)] md:text-4xl">
          تازه پخته، با عشق آماده شده
        </h2>
      </RevealOnScroll>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className="relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
            style={{ color: active === tab.key ? "var(--primary-dark)" : "var(--gray-text)" }}
          >
            {active === tab.key && (
              <motion.span
                layoutId="activeTab"
                className="absolute inset-0 rounded-full"
                style={{ background: "var(--primary-light)" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
        >
          <StaggerContainer className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {filtered.map((product) => (
              <StaggerItem key={product.id}>
                <Link
                  to="/product/$slug"
                  params={{ slug: product.slug }}
                  className="group block rounded-2xl border border-[var(--border)] bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-3 flex aspect-square items-center justify-center rounded-xl bg-[var(--primary-light)] text-5xl">
                    {product.emoji ?? "🍪"}
                  </div>
                  {product.badge && (
                    <span className="mb-1 inline-block rounded-full bg-[var(--accent-gold)]/15 px-2 py-0.5 text-[11px] font-semibold text-[var(--accent-gold)]">
                      {product.badge === "bestseller"
                        ? "⭐ پرفروش"
                        : product.badge === "diet"
                          ? "🌿 رژیمی"
                          : product.badge === "diabetic"
                            ? "💚 دیابتی"
                            : "✨ ویژه"}
                    </span>
                  )}
                  <h3 className="mb-1 line-clamp-2 font-semibold text-[var(--accent-brown)]">
                    {product.name}
                  </h3>
                  <p className="font-bold text-[var(--primary-dark)]">
                    {formatToman(product.priceToman)}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function DietHighlightSection() {
  return (
    <section className="px-4 py-16 md:px-8">
      <RevealOnScroll className="mx-auto max-w-[900px]">
        <div
          className="rounded-3xl p-8 text-center md:p-12"
          style={{ background: "linear-gradient(135deg,var(--primary-light),#F0F9E8)" }}
        >
          <div className="mb-4 text-6xl">🌿</div>
          <h2 className="mb-4 text-2xl font-bold text-[var(--accent-brown)] md:text-3xl">
            برای کسانی که مراقب سلامتی‌شان هستند
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-[var(--gray-text)]">
            در وینیمی، از همان ابتدا برای عزیزانمان که با دیابت زندگی می‌کنند فکر کردیم.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            {[
              { icon: "🍃", title: "کوکی رژیمی", sub: "بدون قند افزوده" },
              { icon: "💚", title: "کوکی دیابتی", sub: "مخصوص دیابتی‌ها" },
            ].map((card) => (
              <div
                key={card.title}
                className="flex-1 rounded-2xl bg-white p-5 text-right shadow-sm sm:max-w-xs"
              >
                <div className="mb-2 text-2xl">{card.icon}</div>
                <h3 className="mb-1 font-bold text-[var(--accent-brown)]">{card.title}</h3>
                <p className="text-sm text-[var(--gray-text)]">{card.sub}</p>
              </div>
            ))}
          </div>
          <Link
            to="/category/$slug"
            params={{ slug: "diet" }}
            className="mt-8 inline-block rounded-full bg-[var(--primary)] px-7 py-3 font-semibold text-white"
          >
            مشاهده محصولات سالم
          </Link>
        </div>
      </RevealOnScroll>
    </section>
  );
}

function AboutTeaserSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 flex aspect-[4/3] items-center justify-center rounded-3xl md:order-1"
          style={{ background: "var(--primary-light)" }}
        >
          <span className="text-8xl">🧁</span>
        </motion.div>
        <RevealOnScroll className="order-1 md:order-2">
          <span className="mb-3 inline-block rounded-full border border-[var(--primary)]/20 bg-[var(--primary-light)] px-4 py-1.5 text-sm text-[var(--primary-dark)]">
            داستان ما
          </span>
          <h2 className="mb-4 text-3xl font-bold text-[var(--accent-brown)]">
            از بوی کیک تازه تا وینیمی
          </h2>
          <p className="mb-6 text-[var(--gray-text)]">
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
              <li key={item} className="flex items-center gap-2 text-[var(--accent-brown)]">
                <span className="text-[var(--primary)]">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            to="/about"
            className="font-semibold text-[var(--primary-dark)] underline underline-offset-4"
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
    <section className="px-4 py-24 md:px-8" style={{ background: "var(--accent-cream)" }}>
      <RevealOnScroll className="mb-14 text-center">
        <h2 className="text-3xl font-bold text-[var(--accent-brown)] md:text-4xl">
          چطور سفارش بدم؟
        </h2>
      </RevealOnScroll>
      <div className="relative mx-auto grid max-w-4xl gap-10 md:grid-cols-3">
        <div
          aria-hidden="true"
          className="absolute top-8 hidden h-px w-full border-t-2 border-dashed md:block"
          style={{ borderColor: "var(--border)" }}
        />
        {ORDER_STEPS.map((step, i) => (
          <RevealOnScroll key={step.title} delay={i * 0.12} className="text-center">
            <div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-3xl"
              style={{ background: "var(--primary)" }}
            >
              {step.icon}
            </div>
            <div className="mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-brown)] text-sm font-bold text-white">
              {i + 1}
            </div>
            <h3 className="mb-2 font-bold text-[var(--accent-brown)]">{step.title}</h3>
            <p className="text-sm text-[var(--gray-text)]">{step.description}</p>
          </RevealOnScroll>
        ))}
      </div>
      <div className="mt-14 text-center">
        <MagneticButton
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[var(--primary)] px-7 py-3.5 font-semibold text-white"
        >
          ثبت سفارش در واتساپ
        </MagneticButton>
      </div>
    </section>
  );
}

function ShippingTrustSection() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 md:px-8">
      <RevealOnScroll className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-[var(--accent-brown)] md:text-4xl">
          ارسال سراسری — از اندیشه تا همه جای ایران
        </h2>
      </RevealOnScroll>
      <RevealOnScroll className="mb-10">
        <div
          className="rounded-xl p-6"
          style={{ borderRight: "4px solid var(--primary)", background: "var(--primary-light)" }}
        >
          <p className="mb-2 font-bold text-[var(--accent-brown)]">آیا کوکی توی پست خراب نمیشه؟</p>
          <p className="text-[var(--gray-text)]">
            برای این سوال از همان ابتدا برنامه داشتیم. هر محصول با بسته‌بندی چندلایه محافظ ارسال
            می‌شود.
          </p>
        </div>
      </RevealOnScroll>
      <div className="grid grid-cols-2 gap-4">
        {SHIPPING_BADGES.map((badge) => (
          <div
            key={badge.label}
            className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-white p-4"
          >
            <span className="text-2xl">{badge.icon}</span>
            <span className="font-medium text-[var(--accent-brown)]">{badge.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 md:px-8">
      <RevealOnScroll className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-[var(--accent-brown)] md:text-4xl">سوالات متداول</h2>
      </RevealOnScroll>
      <AnimatedFAQ items={GENERAL_FAQ} />
    </section>
  );
}

function InstagramSection() {
  return (
    <section className="px-4 py-24 md:px-8" style={{ background: "#F5F5F0" }}>
      <RevealOnScroll className="mb-10 text-center">
        <h2 className="mb-2 text-3xl font-bold text-[var(--accent-brown)] md:text-4xl">
          ما را در اینستاگرام دنبال کنید
        </h2>
        <p className="text-[var(--gray-text)]">@{SITE.instagramHandle}</p>
      </RevealOnScroll>
      <StaggerContainer className="mx-auto mb-10 grid max-w-2xl grid-cols-3 gap-3">
        {INSTAGRAM_EMOJIS.map((emoji, i) => (
          <StaggerItem key={i}>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-xl"
              style={{ background: "var(--primary-light)" }}
            >
              <span className="text-4xl transition-opacity group-hover:opacity-0">{emoji}</span>
              <span
                className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
                style={{ background: "rgba(93,122,74,0.85)" }}
              >
                <Instagram size={28} className="text-white" />
              </span>
            </a>
          </StaggerItem>
        ))}
      </StaggerContainer>
      <div className="text-center">
        <a
          href={SITE.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-7 py-3.5 font-semibold text-white"
        >
          <Instagram size={18} /> دنبال کردن در اینستاگرام
        </a>
      </div>
    </section>
  );
}
