import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { buildSeo } from "@/lib/seo";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { FAQSection } from "@/components/aeo/FAQSection";
import { GENERAL_FAQ } from "@/data/faqs";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () =>
    buildSeo({
      title: "کوکی و کیک خانگی تازه با ارسال سراسری",
      description:
        "وینیمی بیکری: کوکی و کیک دست‌پخت با مواد اولیه تازه، بدون نگهدارنده، شامل گزینه‌های رژیمی و دیابتی. ارسال از اندیشه تهران به سراسر ایران.",
      path: "/",
    }),
  component: Home,
});

type Filter = "all" | "cookies" | "cakes" | "diet";
const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "همه" },
  { key: "cookies", label: "کوکی‌ها" },
  { key: "cakes", label: "کیک و دسر" },
  { key: "diet", label: "رژیمی و دیابتی" },
];

function Section({
  children,
  bg,
  id,
  className = "",
}: {
  children: React.ReactNode;
  bg?: string;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`py-16 md:py-20 ${className}`} style={bg ? { background: bg } : undefined}>
      <div className="mx-auto max-w-[1200px] px-4">{children}</div>
    </section>
  );
}

function Home() {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered = PRODUCTS.filter((p) => filter === "all" || p.category === filter);

  return (
    <>
      {/* HERO */}
      <section
        className="relative"
        style={{ background: "var(--accent-cream)", minHeight: "90vh" }}
      >
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span
              className="inline-block rounded-full px-4 py-1.5 text-sm font-medium"
              style={{ background: "var(--primary-light)", color: "var(--primary-dark)" }}
            >
              ✦ دست‌پخت تازه، ارسال سراسری
            </span>
            <h1
              className="mt-5 text-4xl font-bold leading-[1.4] md:text-5xl"
              style={{ color: "var(--accent-brown)" }}
            >
              کیک و کوکی که
              <br />
              مثل خانه مزه می‌ده
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground max-w-xl">
              از اندیشه تا هر گوشه‌ای از ایران — با مواد اولیه تازه،
              بهداشت وسواسی و عشق به پخت.
            </p>
            <ul className="mt-6 flex flex-wrap gap-3 text-sm">
              {[
                "🌿 بدون نگهدارنده",
                "🏠 دست‌پخت خانگی",
                "🚚 ارسال سراسری",
              ].map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-border bg-white px-4 py-1.5"
                >
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#products"
                className="inline-flex items-center rounded-full px-7 py-3.5 text-base font-bold transition-transform hover:scale-105"
                style={{ background: "var(--primary)", color: "var(--primary-dark)" }}
              >
                مشاهده محصولات
              </a>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center rounded-full border-2 bg-white px-7 py-3.5 text-base font-bold"
                style={{ borderColor: "var(--primary)", color: "var(--primary-dark)" }}
              >
                سفارش واتساپ
              </a>
            </div>
          </div>
          <div className="relative">
            <div
              className="relative aspect-square overflow-hidden rounded-3xl"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary-light) 0%, #D6E9C6 100%)",
                boxShadow: "0 20px 60px rgba(141,184,122,0.25)",
              }}
              role="img"
              aria-label="کوکی تازه وینیمی با بسته‌بندی"
            >
              <div className="absolute inset-0 flex items-center justify-center text-[160px]">
                🍪
              </div>
            </div>
            <div
              className="absolute -bottom-4 -start-4 rounded-full bg-white px-4 py-3 text-sm font-semibold shadow-lg"
              style={{ color: "var(--primary-dark)" }}
            >
              ⭐ ۱۰۰٪ مواد اولیه تازه
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{ background: "var(--primary)" }} className="py-5">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-4 px-4 text-sm font-medium md:grid-cols-4" style={{ color: "var(--primary-dark)" }}>
          <div className="flex items-center gap-2">🧁 پخت تازه روزانه</div>
          <div className="flex items-center gap-2">🌿 بدون نگهدارنده مصنوعی</div>
          <div className="flex items-center gap-2">📦 بسته‌بندی محافظ ویژه پست</div>
          <div className="flex items-center gap-2">🚚 ارسال به سراسر ایران</div>
        </div>
      </section>

      {/* PRODUCTS */}
      <Section id="products" bg="var(--accent-cream)">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold" style={{ color: "var(--accent-brown)" }}>
            محصولات ما
          </h2>
          <p className="mt-2 text-muted-foreground">تازه پخته، با عشق آماده شده</p>
        </div>
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className="rounded-full border px-5 py-2 text-sm font-medium transition-all"
                style={{
                  background: active ? "var(--primary)" : "white",
                  color: active ? "var(--primary-dark)" : "var(--foreground)",
                  borderColor: active ? "var(--primary)" : "var(--border)",
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      {/* ABOUT TEASER */}
      <Section bg="white">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="relative order-2 md:order-1">
            <div
              className="absolute -top-6 -end-6 h-24 w-24 rounded-full"
              style={{ background: "var(--primary-light)" }}
              aria-hidden="true"
            />
            <div
              className="relative aspect-[4/3] overflow-hidden rounded-3xl"
              style={{ background: "var(--primary-light)" }}
              role="img"
              aria-label="بسته‌بندی وینیمی با محصول"
            >
              <div className="flex h-full items-center justify-center text-[120px]">📦</div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span
              className="inline-block rounded-full px-4 py-1.5 text-sm font-medium"
              style={{ background: "var(--primary-light)", color: "var(--primary-dark)" }}
            >
              داستان ما
            </span>
            <h2 className="mt-4 text-3xl font-bold" style={{ color: "var(--accent-brown)" }}>
              از بوی کیک تازه تا وینیمی
            </h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              همه‌چیز از کودکی شروع شد — از عطر کیک تازه‌ای که در خانه می‌پیچید.
              وینیمی ثمره سال‌ها عشق به پخت و وسواس در کیفیت است.
              چون باور داریم شیرینی خوب باید مثل خانه مزه بده.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              {[
                "مواد اولیه تازه، بدون نگهدارنده",
                "گزینه‌های رژیمی و بدون قند",
                "بسته‌بندی بهداشتی ویژه ارسال پستی",
                "پخت تازه با هر سفارش",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span style={{ color: "var(--primary-dark)" }}>✓</span> {t}
                </li>
              ))}
            </ul>
            <Link
              to="/about"
              className="mt-6 inline-block border-b-2 pb-1 text-sm font-semibold"
              style={{ borderColor: "var(--primary)", color: "var(--primary-dark)" }}
            >
              بیشتر بدانید ←
            </Link>
          </div>
        </div>
      </Section>

      {/* DIET / DIABETIC HIGHLIGHT */}
      <section className="py-16 md:py-20" style={{ background: "white" }}>
        <div
          className="mx-auto max-w-[900px] rounded-3xl px-6 py-12 text-center md:px-12"
          style={{
            background:
              "linear-gradient(135deg, var(--primary-light) 0%, #E8F5E0 100%)",
          }}
        >
          <div className="text-5xl">🌿</div>
          <h2 className="mt-4 text-3xl font-bold" style={{ color: "var(--accent-brown)" }}>
            برای کسانی که مراقب سلامتی‌شان هستند
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-8 text-muted-foreground">
            در وینیمی، از همان ابتدا برای عزیزانمان که با دیابت زندگی می‌کنند فکر کردیم.
            کوکی‌های رژیمی و بدون قند افزوده ما همان لذت شیرینی را بدون نگرانی می‌دهند.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-5 text-start">
              <div className="text-2xl">🍃</div>
              <h3 className="mt-2 font-bold">کوکی رژیمی</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                بدون قند، کم‌کالری، پر از طعم
              </p>
            </div>
            <div className="rounded-2xl bg-white p-5 text-start">
              <div className="text-2xl">💚</div>
              <h3 className="mt-2 font-bold">کوکی دیابتی</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                بدون قند افزوده، مناسب دیابتی‌ها
              </p>
            </div>
          </div>
          <Link
            to="/category/$slug"
            params={{ slug: "diet" }}
            className="mt-8 inline-flex items-center rounded-full px-7 py-3 text-sm font-bold"
            style={{ background: "var(--primary)", color: "var(--primary-dark)" }}
          >
            مشاهده محصولات سالم
          </Link>
        </div>
      </section>

      {/* HOW TO ORDER */}
      <Section bg="var(--accent-cream)">
        <h2 className="text-center text-3xl font-bold" style={{ color: "var(--accent-brown)" }}>
          چطور سفارش بدم؟
        </h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            { icon: "📋", title: "انتخاب کنید", text: "محصول مورد نظرتان را از منو انتخاب کنید" },
            { icon: "💬", title: "پیام بدید", text: "از طریق دایرکت اینستاگرام یا واتساپ سفارش ثبت کنید" },
            { icon: "📦", title: "دریافت کنید", text: "محصول تازه با بسته‌بندی محافظ به دستتان می‌رسد" },
          ].map((s, i) => (
            <li key={i} className="text-center">
              <div
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-3xl"
                style={{ background: "var(--primary)", color: "var(--primary-dark)" }}
              >
                {s.icon}
              </div>
              <h3 className="mt-4 text-xl font-bold" style={{ color: "var(--accent-brown)" }}>
                {i + 1}. {s.title}
              </h3>
              <p className="mt-2 text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 text-center">
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center rounded-full px-8 py-4 text-base font-bold transition-transform hover:scale-105"
            style={{ background: "var(--primary)", color: "var(--primary-dark)" }}
          >
            💬 ثبت سفارش در واتساپ
          </a>
        </div>
      </Section>

      {/* SHIPPING TRUST */}
      <Section bg="white">
        <h2 className="text-center text-3xl font-bold" style={{ color: "var(--accent-brown)" }}>
          ارسال سراسری — از اندیشه تا همه جای ایران
        </h2>
        <div
          className="mx-auto mt-8 max-w-3xl rounded-2xl p-6"
          style={{
            background: "var(--primary-light)",
            borderRight: "4px solid var(--primary)",
          }}
        >
          <p className="font-bold" style={{ color: "var(--accent-brown)" }}>
            آیا کوکی توی پست خراب نمیشه؟
          </p>
          <p className="mt-2 text-muted-foreground leading-8">
            ما برای این سوال از همان ابتدا برنامه داشتیم. هر محصول با بسته‌بندی چندلایه محافظ ارسال می‌شود تا سالم و تازه به دستتان برسد.
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-3xl gap-4 md:grid-cols-2">
          {[
            "📦 بسته‌بندی چندلایه محافظ",
            "🚚 پست پیشتاز — ۲ تا ۵ روز کاری",
            "🌡️ مناسب برای حمل و نقل",
            "✅ ضمانت سالم رسیدن",
          ].map((t) => (
            <div key={t} className="rounded-xl border border-border bg-white p-4">
              {t}
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section bg="var(--accent-cream)">
        <FAQSection items={GENERAL_FAQ} heading="سوالات متداول" />
      </Section>

      {/* INSTAGRAM TEASER */}
      <Section bg="var(--secondary)">
        <div className="text-center">
          <h2 className="text-3xl font-bold" style={{ color: "var(--accent-brown)" }}>
            ما را در اینستاگرام دنبال کنید
          </h2>
          <p className="mt-2 text-muted-foreground" dir="ltr">
            @{SITE.instagramHandle}
          </p>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-3 md:gap-4">
          {["🧁", "🍰", "🍪", "🥐", "☕", "🎂"].map((e, i) => (
            <div
              key={i}
              className="flex aspect-square items-center justify-center rounded-2xl text-5xl transition-transform hover:scale-105"
              style={{ background: "var(--primary-light)" }}
              aria-hidden="true"
            >
              {e}
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold"
            style={{ background: "var(--primary)", color: "var(--primary-dark)" }}
          >
            📷 دنبال کردن در اینستاگرام
          </a>
        </div>
      </Section>
    </>
  );
}
