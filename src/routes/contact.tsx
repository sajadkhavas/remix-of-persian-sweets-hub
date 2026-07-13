import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { buildSeo } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { SITE } from "@/lib/site";

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

export const Route = createFileRoute("/contact")({
  head: () =>
    buildSeo({
      title: "تماس با وینیمی",
      description: "راه‌های ارتباطی با وینیمی برای ثبت سفارش، پیگیری ارسال و سفارش‌های سازمانی.",
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  const crumbs = [
    { name: "خانه", path: "/" },
    { name: "تماس با ما", path: "/contact" },
  ];

  const contactCards = [
    {
      icon: "📱",
      title: "واتساپ",
      subtitle: "سریع‌ترین راه",
      value: SITE.phone,
      href: SITE.whatsapp,
      button: "پیام در واتساپ",
      buttonClass:
        "bg-[var(--primary)] text-[var(--primary-dark)] hover:bg-[var(--primary-dark)] hover:text-white",
    },
    {
      icon: "📸",
      title: "اینستاگرام",
      subtitle: `@${SITE.instagramHandle}`,
      value: "پشت صحنه پخت‌ها و خبرهای تازه",
      href: SITE.instagram,
      button: "دیدن اینستاگرام",
      buttonClass: "bg-[var(--accent-brown)] text-white hover:bg-[var(--primary-dark)]",
    },
    {
      icon: "📧",
      title: "ایمیل",
      subtitle: SITE.email,
      value: "برای همکاری، پیگیری و سفارش سازمانی",
      href: `mailto:${SITE.email}`,
      button: "ارسال ایمیل",
      buttonClass: "bg-[var(--accent-gold)] text-white hover:brightness-95",
    },
    {
      icon: "📍",
      title: "موقعیت",
      subtitle: `${SITE.city}، البرز — ارسال به سراسر ایران`,
      value: `ثبت سفارش آنلاین از ${SITE.domain}`,
      href: "/products",
      button: "مشاهده محصولات",
      buttonClass: "bg-[var(--primary-light)] text-[var(--primary-dark)] hover:bg-[var(--primary)]",
    },
  ];

  const quickFaqs = [
    {
      question: "آیا می‌توانم از طریق واتساپ سفارش بدهم؟",
      answer: "بله، سریع‌ترین روش همین است.",
    },
    {
      question: "پشتیبانی چه ساعاتی پاسخ می‌دهد؟",
      answer: "۹ صبح تا ۹ شب، همه روزه.",
    },
    {
      question: "برای سفارش سازمانی چه باید بکنم؟",
      answer: "در واتساپ پیام بدید، فاکتور رسمی صادر می‌کنیم.",
    },
  ];

  return (
    <div dir="rtl" className="space-y-12">
      <BreadcrumbJsonLd items={crumbs} />
      <Breadcrumbs items={crumbs} />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--accent-cream)] via-white to-[var(--primary-light)] px-6 py-14 text-center shadow-sm md:px-10"
      >
        <p className="mb-4 text-5xl" aria-hidden="true">
          ☎️
        </p>
        <h1 className="text-4xl font-extrabold text-[var(--accent-brown)] md:text-5xl">
          تماس با ما
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[var(--gray-text)]">
          خوشحال می‌شیم صداتون رو بشنویم
        </p>
      </motion.section>

      <Reveal>
        <section className="grid gap-5 md:grid-cols-2">
          {contactCards.map((card) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary-light)] text-3xl">
                  {card.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-bold text-[var(--accent-brown)]">{card.title}</h2>
                  <p className="mt-2 font-semibold text-[var(--primary-dark)]">{card.subtitle}</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--gray-text)]">{card.value}</p>
                  <a
                    href={card.href}
                    rel={card.href.startsWith("http") ? "noopener" : undefined}
                    className={`mt-5 inline-flex rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${card.buttonClass}`}
                  >
                    {card.button}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </section>
      </Reveal>

      <Reveal>
        <section className="rounded-3xl border border-[var(--border)] bg-[var(--accent-cream)] p-6 md:p-8">
          <h2 className="text-2xl font-extrabold text-[var(--accent-brown)]">ساعات پاسخگویی</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-5 text-[var(--gray-text)] shadow-sm">
              <span className="font-bold text-[var(--accent-brown)]">شنبه تا پنجشنبه:</span> ۹ صبح
              تا ۹ شب
            </div>
            <div className="rounded-2xl bg-white p-5 text-[var(--gray-text)] shadow-sm">
              <span className="font-bold text-[var(--accent-brown)]">جمعه:</span> ۱۰ صبح تا ۶ عصر
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-extrabold text-[var(--accent-brown)]">پرسش‌های سریع</h2>
          <div className="mt-6 space-y-4">
            {quickFaqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-[var(--border)] p-5">
                <h3 className="font-bold text-[var(--accent-brown)]">{faq.question}</h3>
                <p className="mt-2 text-[var(--gray-text)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}
