import { useEffect, useRef, useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView } from "motion/react";
import { buildSeo } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const Route = createFileRoute("/about")({
  head: () =>
    buildSeo({
      title: "درباره ما | داستان وینیمی بیکری",
      description:
        "وینیمی بیکری: شیرینی‌پزی خانگی در اندیشه تهران. داستان یک علاقه به شیرینی‌پزی که تبدیل به کسب‌وکار شد.",
      path: "/about",
    }),
  component: AboutPage,
});

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const step = target / (1800 / 16);
    const timer = setInterval(() => {
      v += step;
      if (v >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(v));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  const pd = (n: number) => n.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
  return (
    <span ref={ref}>
      {pd(count)}
      {suffix}
    </span>
  );
}

const Reveal = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.55, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const VALUES = [
  { icon: "🌿", title: "تازگی واقعی", desc: "پخت تازه با هر سفارش، نه از انبار." },
  { icon: "🧼", title: "بهداشت وسواسی", desc: "محیط پخت استریل، کنترل کیفیت دقیق." },
  { icon: "💚", title: "همه می‌توانند", desc: "گزینه‌های رژیمی و دیابتی از همان ابتدا." },
  { icon: "📦", title: "تا دررسیدن", desc: "بسته‌بندی چندلایه برای ارسال سالم." },
];

const STORY = [
  "از کودکی، عطر کیک و شیرینی تازه همیشه در خانه ما می‌پیچید. شیرینی‌پزی بخشی از زندگی و خاطرات خانوادگی‌مان بود.",
  "همان روزها عاشق پختن کیک شدم و این علاقه، سال‌ها بعد به وینیمی تبدیل شد.",
  "اما خوشمزه بودن هیچ‌وقت کافی نبود. دوست داشتم مطمئن باشم هر چیزی که می‌خورم با مواد اولیه تازه و در محیطی بهداشتی تهیه شده.",
  "به همین دلیل تصمیم گرفتم شیرینی‌پزی را حرفه‌ای یاد بگیرم تا روی تک‌تک مراحل نظارت داشته باشم.",
];

function AboutPage() {
  const crumbs = [
    { name: "خانه", path: "/" },
    { name: "درباره ما", path: "/about" },
  ];
  return (
    <main
      dir="rtl"
      style={{ minHeight: "100vh", background: "#FEFCF9", fontFamily: "Vazirmatn, sans-serif" }}
    >
      <BreadcrumbJsonLd items={crumbs} />
      <section
        style={{
          background: "linear-gradient(160deg,rgba(141,184,122,0.1) 0%,var(--accent-cream) 100%)",
          padding: "5rem 1.5rem",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            width: "9rem",
            height: "9rem",
            borderRadius: "50%",
            background: "rgba(141,184,122,0.15)",
            border: "3px solid rgba(141,184,122,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "3.5rem",
            margin: "0 auto 2rem",
          }}
        >
          🧁
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1
            style={{
              fontSize: "clamp(2rem,5vw,3rem)",
              fontWeight: 800,
              color: "var(--accent-brown)",
              marginBottom: "1rem",
            }}
          >
            داستان ما
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#6b5a52",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.8,
            }}
          >
            از بوی کیک تازه تا وینیمی — یه مسیر پر از عشق به پخت
          </p>
        </motion.div>
      </section>
      <section style={{ padding: "5rem 1.5rem", maxWidth: "820px", margin: "0 auto" }}>
        <Breadcrumbs items={crumbs} />
        <Reveal>
          <h2
            style={{
              fontSize: "1.6rem",
              fontWeight: 700,
              color: "var(--accent-brown)",
              marginBottom: "1.75rem",
              paddingRight: "1.2rem",
              borderRight: "4px solid var(--primary)",
            }}
          >
            همه‌چیز از بوی کیک تازه شروع شد
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {STORY.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ color: "#4a3a32", lineHeight: 2.1 }}
              >
                {para}
              </motion.p>
            ))}
          </div>
        </Reveal>
      </section>
      <section style={{ background: "var(--accent-cream)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Reveal>
            <h2
              style={{
                fontSize: "1.6rem",
                fontWeight: 700,
                color: "var(--accent-brown)",
                marginBottom: "2.5rem",
                textAlign: "center",
              }}
            >
              ارزش‌های ما
            </h2>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
              gap: "1.25rem",
            }}
          >
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  style={{
                    background: "#FEFCF9",
                    borderRadius: "1rem",
                    padding: "1.75rem",
                    border: "1px solid rgba(141,184,122,0.2)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2rem",
                      marginBottom: "0.75rem",
                      width: "3rem",
                      height: "3rem",
                      borderRadius: "0.625rem",
                      background: "rgba(141,184,122,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {v.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "var(--accent-brown)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {v.title}
                  </h3>
                  <p style={{ color: "#6b5a52", lineHeight: 1.8, fontSize: "0.88rem" }}>{v.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: "5rem 1.5rem", maxWidth: "820px", margin: "0 auto" }}>
        <Reveal>
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              alignItems: "flex-start",
              background: "rgba(141,184,122,0.08)",
              borderRadius: "0 1rem 1rem 0",
              padding: "2rem",
              borderRight: "4px solid var(--primary)",
            }}
          >
            <span style={{ fontSize: "2rem", flexShrink: 0 }}>💚</span>
            <div>
              <h2
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "var(--accent-brown)",
                  marginBottom: "1rem",
                }}
              >
                چرا گزینه‌های دیابتی ساختیم
              </h2>
              <p style={{ color: "#4a3a32", lineHeight: 2.1, marginBottom: "1rem" }}>
                بعضی از عزیزانم با دیابت زندگی می‌کنند و همیشه دلم می‌خواست آن‌ها هم بدون نگرانی از
                طعم شیرینی لذت ببرند.
              </p>
              <p style={{ color: "#4a3a32", lineHeight: 2.1 }}>
                همین باعث شد روی شیرینی‌هایی با گزینه‌های بدون قند افزوده هم کار کنیم.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
      <section style={{ background: "var(--accent-brown)", padding: "4rem 1.5rem" }}>
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "2rem",
            textAlign: "center",
          }}
        >
          {[
            { v: 500, s: "+", l: "سفارش موفق" },
            { v: 19, s: "", l: "محصول متنوع" },
            { v: 16, s: "", l: "شهر پوشش ارسال" },
          ].map((stat, i) => (
            <Reveal key={stat.l} delay={i * 0.1}>
              <div>
                <div
                  style={{
                    fontSize: "clamp(2rem,5vw,2.8rem)",
                    fontWeight: 800,
                    color: "var(--primary)",
                    marginBottom: "0.4rem",
                  }}
                >
                  <AnimatedCounter target={stat.v} suffix={stat.s} />
                </div>
                <div style={{ color: "rgba(250,247,242,0.8)", fontSize: "0.9rem" }}>{stat.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section style={{ padding: "5rem 1.5rem", textAlign: "center" }}>
        <Reveal>
          <h2
            style={{
              fontSize: "1.6rem",
              fontWeight: 700,
              color: "var(--accent-brown)",
              marginBottom: "0.75rem",
            }}
          >
            آماده سفارش هستید؟
          </h2>
          <p style={{ color: "#6b5a52", marginBottom: "2rem", lineHeight: 1.8 }}>
            محصولات تازه وینیمی بیکری را ببینید
          </p>
          <div
            style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link
              to="/products"
              style={{
                background: "var(--primary)",
                color: "#fff",
                padding: "0.8rem 2rem",
                borderRadius: "2rem",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              مشاهده محصولات
            </Link>
            <Link
              to="/contact"
              style={{
                background: "transparent",
                color: "var(--accent-brown)",
                padding: "0.8rem 2rem",
                borderRadius: "2rem",
                textDecoration: "none",
                fontWeight: 700,
                border: "1.5px solid rgba(61,43,31,0.2)",
              }}
            >
              تماس با ما
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
