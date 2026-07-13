import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
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
    const t = setInterval(() => {
      v += step;
      if (v >= target) {
        setCount(target);
        clearInterval(t);
      } else {
        setCount(Math.floor(v));
      }
    }, 16);
    return () => clearInterval(t);
  }, [inView, target]);
  const pd = (n: number) => n.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
  return (
    <span ref={ref}>
      {pd(count)}
      {suffix}
    </span>
  );
}

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

const STATS = [
  { v: 500, s: "+", l: "سفارش موفق" },
  { v: 19, s: "", l: "محصول متنوع" },
  { v: 16, s: "", l: "شهر پوشش ارسال" },
];

function AboutPage() {
  const crumbs = [
    { name: "خانه", path: "/" },
    { name: "درباره ما", path: "/about" },
  ];
  return (
    <main dir="rtl" className="min-h-screen bg-[#FEFCF9]">
      <BreadcrumbJsonLd items={crumbs} />

      {/* Hero */}
      <section
        className="py-20 text-center"
        style={{
          background: "linear-gradient(160deg, rgba(141,184,122,0.1) 0%, var(--accent-cream) 100%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-8 flex h-36 w-36 items-center justify-center rounded-full text-6xl"
          style={{
            background: "rgba(141,184,122,0.15)",
            border: "3px solid rgba(141,184,122,0.3)",
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
            className="mb-4 font-extrabold text-[var(--accent-brown)]"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
          >
            داستان ما
          </h1>
          <p className="mx-auto max-w-xl leading-8 text-[var(--gray-text)]">
            از بوی کیک تازه تا وینیمی — یه مسیر پر از عشق به پخت
          </p>
        </motion.div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <Breadcrumbs items={crumbs} />
        <Reveal>
          <h2 className="mb-7 border-r-4 border-[var(--primary)] pr-5 text-2xl font-bold text-[var(--accent-brown)]">
            همه‌چیز از بوی کیک تازه شروع شد
          </h2>
          <div className="space-y-5">
            {STORY.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="leading-9 text-[#4a3a32]"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Values */}
      <section
        className="px-6 py-16"
        style={{
          background: "var(--accent-cream)",
          borderTop: "1px solid rgba(141,184,122,0.15)",
          borderBottom: "1px solid rgba(141,184,122,0.15)",
        }}
      >
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 className="mb-10 text-center text-2xl font-bold text-[var(--accent-brown)]">
              ارزش‌های ما
            </h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-2xl bg-white p-7"
                  style={{ border: "1px solid rgba(141,184,122,0.2)" }}
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-3xl"
                    style={{ background: "rgba(141,184,122,0.12)" }}
                  >
                    {v.icon}
                  </div>
                  <h3 className="mb-2 font-bold text-[var(--accent-brown)]">{v.title}</h3>
                  <p className="text-sm leading-7 text-[var(--gray-text)]">{v.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Diabetic */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <Reveal>
          <div
            className="rounded-r-2xl border-r-4 border-[var(--primary)] p-8 leading-9"
            style={{ background: "rgba(141,184,122,0.08)" }}
          >
            <h2 className="mb-4 text-xl font-bold text-[var(--accent-brown)]">
              چرا گزینه‌های دیابتی ساختیم
            </h2>
            <p className="mb-3 text-[#4a3a32]">
              بعضی از عزیزانم با دیابت زندگی می‌کنند و همیشه دلم می‌خواست آن‌ها هم بدون نگرانی از
              طعم شیرینی لذت ببرند.
            </p>
            <p className="text-[#4a3a32]">
              همین باعث شد روی شیرینی‌هایی با گزینه‌های بدون قند افزوده هم کار کنیم.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="bg-[var(--accent-brown)] px-6 py-16">
        <div className="mx-auto grid max-w-2xl grid-cols-3 gap-8 text-center">
          {STATS.map((stat, i) => (
            <Reveal key={stat.l} delay={i * 0.1}>
              <div>
                <div
                  className="mb-2 font-extrabold text-[var(--primary)]"
                  style={{ fontSize: "clamp(2rem, 5vw, 2.8rem)" }}
                >
                  <AnimatedCounter target={stat.v} suffix={stat.s} />
                </div>
                <div className="text-sm text-white/80">{stat.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 text-center">
        <Reveal>
          <h2 className="mb-3 text-2xl font-bold text-[var(--accent-brown)]">آماده سفارش هستید؟</h2>
          <p className="mb-8 text-[var(--gray-text)]">محصولات تازه وینیمی بیکری را ببینید</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/products"
              className="rounded-full bg-[var(--primary)] px-8 py-3 font-bold text-white"
            >
              مشاهده محصولات
            </Link>
            <Link
              to="/contact"
              className="rounded-full border px-8 py-3 font-bold text-[var(--accent-brown)]"
            >
              تماس با ما
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
