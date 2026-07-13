import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { buildSeo } from "@/lib/seo";
import { findCity } from "@/data/cities";
import { PRODUCTS } from "@/data/products";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { FAQSection } from "@/components/aeo/FAQSection";
import { AnswerBlock } from "@/components/aeo/AnswerBlock";
import { SITE } from "@/lib/site";
import { formatToman } from "@/lib/format";
import type { FaqItem } from "@/components/jsonld/FAQJsonLd";

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
        description: "",
        path: `/shipping-to/${params.city}`,
        noindex: true,
      });
    }
    const c = loaderData.city;
    return buildSeo({
      title: `ارسال کوکی به ${c.nameFa} | وینیمی بیکری`,
      description: `خرید کوکی دست‌پخت با ارسال به ${c.nameFa}. ${c.deliveryDays} با ${c.shippingMethod}.`,
      path: `/shipping-to/${c.slug}`,
    });
  },
  component: CityPage,
});

const TRUST = [
  { icon: "🌿", title: "مواد اولیه تازه", desc: "بدون نگهدارنده مصنوعی، پخت با هر سفارش" },
  { icon: "📦", title: "بسته‌بندی چندلایه", desc: "کارتن دولایه + پد ضربه‌گیر حبابی" },
  { icon: "🔍", title: "کد رهگیری", desc: "پس از ارسال از طریق واتساپ ارسال می‌شود" },
  { icon: "✅", title: "ضمانت سالم رسیدن", desc: "در صورت آسیب، جایگزین یا بازپرداخت" },
];

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

function CityPage() {
  const { city } = Route.useLoaderData();
  const cookies = PRODUCTS.filter((p) => p.category === "cookies").slice(0, 4);
  const crumbs = [
    { name: "خانه", path: "/" },
    { name: "ارسال به شهرها", path: "/products" },
    { name: city.nameFa, path: `/shipping-to/${city.slug}` },
  ];
  const faqs: FaqItem[] = [
    {
      question: `آیا به ${city.nameFa} ارسال می‌کنید؟`,
      answer: `بله. وینیمی بیکری به ${city.nameFa} از طریق ${city.shippingMethod} ارسال می‌کند.`,
    },
    {
      question: `مدت زمان ارسال به ${city.nameFa} چقدر است؟`,
      answer: `زمان تحویل به ${city.nameFa} ${city.deliveryDays} است.`,
    },
    {
      question: `هزینه ارسال به ${city.nameFa} چقدر است؟`,
      answer: "هزینه ارسال بر اساس وزن سفارش محاسبه می‌شود و در مرحله نهایی اعلام می‌شود.",
    },
    {
      question: "آیا کوکی توی پست سالم می‌رسد؟",
      answer: `بله. با ${city.packagingNote} ارسال می‌شود.`,
    },
  ];
  return (
    <div
      dir="rtl"
      style={{ minHeight: "100vh", background: "#FEFCF9", fontFamily: "Vazirmatn, sans-serif" }}
    >
      <BreadcrumbJsonLd items={crumbs} />
      <section
        style={{
          background: "linear-gradient(160deg,rgba(141,184,122,0.08) 0%,var(--accent-cream) 100%)",
          padding: "4rem 1.5rem 3rem",
          textAlign: "center",
          borderBottom: "1px solid rgba(141,184,122,0.15)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🚚</div>
          <h1
            style={{
              fontSize: "clamp(1.8rem,4vw,2.8rem)",
              fontWeight: 800,
              color: "var(--accent-brown)",
              marginBottom: "1rem",
            }}
          >
            ارسال کوکی و شیرینی به {city.nameFa}
          </h1>
          <p style={{ color: "#6b5a52", maxWidth: "500px", margin: "0 auto", lineHeight: 1.9 }}>
            وینیمی بیکری — دست‌پخت تازه از اندیشه تا {city.nameFa}
          </p>
        </motion.div>
      </section>
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <Breadcrumbs items={crumbs} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
            gap: "1rem",
            margin: "2rem 0 3rem",
          }}
        >
          {[
            { icon: "🚚", title: "روش ارسال", value: city.shippingMethod },
            { icon: "⏰", title: "زمان تحویل", value: city.deliveryDays },
            { icon: "📦", title: "بسته‌بندی", value: city.packagingNote },
          ].map((card) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: "white",
                borderRadius: "1rem",
                padding: "1.5rem",
                border: "1px solid rgba(141,184,122,0.2)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{card.icon}</div>
              <p style={{ fontSize: "0.8rem", color: "#8a7a72", marginBottom: "0.25rem" }}>
                {card.title}
              </p>
              <p style={{ fontWeight: 700, color: "var(--accent-brown)", fontSize: "0.95rem" }}>
                {card.value}
              </p>
            </motion.div>
          ))}
        </div>
        <AnswerBlock
          question={`چطور کوکی وینیمی را در ${city.nameFa} سفارش دهم؟`}
          answer={`از سایت یا واتساپ سفارش بده — ظرف ${city.deliveryDays} با ${city.shippingMethod} به ${city.nameFa} می‌رسه.`}
        />
        <section style={{ margin: "3rem 0" }}>
          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: 700,
              color: "var(--accent-brown)",
              marginBottom: "1.5rem",
            }}
          >
            چرا وینیمی برای ارسال به {city.nameFa}؟
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
              gap: "1rem",
            }}
          >
            {TRUST.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.08}>
                <div
                  style={{
                    background: "var(--accent-cream)",
                    borderRadius: "0.875rem",
                    padding: "1.25rem",
                  }}
                >
                  <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>{r.icon}</div>
                  <h3
                    style={{
                      fontWeight: 700,
                      color: "var(--accent-brown)",
                      fontSize: "0.9rem",
                      marginBottom: "0.35rem",
                    }}
                  >
                    {r.title}
                  </h3>
                  <p style={{ color: "#6b5a52", fontSize: "0.82rem", lineHeight: 1.7 }}>{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
        {cookies.length > 0 && (
          <section style={{ margin: "3rem 0" }}>
            <h2
              style={{
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "var(--accent-brown)",
                marginBottom: "1.25rem",
              }}
            >
              محصولات مناسب برای ارسال به {city.nameFa}
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
                gap: "1rem",
              }}
            >
              {cookies.map((p) => (
                <Link
                  key={p.id}
                  to="/product/$slug"
                  params={{ slug: p.slug }}
                  style={{ textDecoration: "none" }}
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    style={{
                      background: "white",
                      borderRadius: "1rem",
                      border: "1px solid var(--border)",
                      padding: "1.25rem",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>{p.emoji}</div>
                    <p
                      style={{
                        fontWeight: 600,
                        color: "var(--accent-brown)",
                        fontSize: "0.88rem",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {p.name}
                    </p>
                    <p
                      style={{ color: "var(--primary-dark)", fontWeight: 700, fontSize: "0.85rem" }}
                    >
                      {formatToman(p.priceToman)}
                    </p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </section>
        )}
        <div
          style={{
            background: "linear-gradient(135deg,rgba(141,184,122,0.1),var(--accent-cream))",
            borderRadius: "1.25rem",
            padding: "2.5rem",
            textAlign: "center",
            margin: "3rem 0",
            border: "1px solid rgba(141,184,122,0.2)",
          }}
        >
          <p
            style={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "var(--accent-brown)",
              marginBottom: "1.25rem",
            }}
          >
            آماده سفارش به {city.nameFa} هستید؟
          </p>
          <div
            style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link
              to="/products"
              style={{
                background: "var(--primary)",
                color: "white",
                padding: "0.7rem 1.6rem",
                borderRadius: "2rem",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              مشاهده محصولات
            </Link>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#25D366",
                color: "white",
                padding: "0.7rem 1.6rem",
                borderRadius: "2rem",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              💬 سفارش واتساپی
            </a>
          </div>
        </div>
        <FAQSection items={faqs} heading={`سؤالات متداول ارسال به ${city.nameFa}`} />
      </div>
    </div>
  );
}
