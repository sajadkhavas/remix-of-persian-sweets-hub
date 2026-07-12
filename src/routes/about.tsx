import { createFileRoute, Link } from "@tanstack/react-router";
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

const values = [
  ["🌿", "تازگی واقعی", "پخت تازه با هر سفارش، نه از انبار."],
  ["🧼", "بهداشت وسواسی", "محیط پخت استریل و کنترل کیفیت دقیق."],
  ["💚", "همه می‌توانند", "گزینه‌های رژیمی و دیابتی از همان ابتدا."],
  ["📦", "تا دررسیدن", "بسته‌بندی چندلایه برای ارسال سالم."],
];

function AboutPage() {
  const crumbs = [
    { name: "خانه", path: "/" },
    { name: "درباره ما", path: "/about" },
  ];
  return (
    <main dir="rtl" className="min-h-screen bg-[#FEFCF9]">
      <BreadcrumbJsonLd items={crumbs} />
      <section className="bg-accent py-20 text-center">
        <div className="mx-auto mb-8 flex h-36 w-36 items-center justify-center rounded-full border text-6xl">
          🧁
        </div>
        <h1 className="mb-4 text-4xl font-extrabold text-accent-foreground">داستان ما</h1>
        <p className="mx-auto max-w-xl leading-8 text-muted-foreground">
          از بوی کیک تازه تا وینیمی — یه مسیر پر از عشق به پخت
        </p>
      </section>
      <section className="mx-auto max-w-4xl px-6 py-16">
        <Breadcrumbs items={crumbs} />
        <h2 className="mb-7 border-r-4 border-primary pr-5 text-2xl font-bold text-accent-foreground">
          همه‌چیز از بوی کیک تازه شروع شد
        </h2>
        <div className="space-y-5 leading-9 text-[#4a3a32]">
          <p>
            از کودکی، عطر کیک و شیرینی تازه همیشه در خانه ما می‌پیچید. شیرینی‌پزی بخشی از زندگی و
            خاطرات خانوادگی‌مان بود.
          </p>
          <p>همان روزها عاشق پختن کیک شدم و این علاقه، سال‌ها بعد به وینیمی تبدیل شد.</p>
          <p>
            اما خوشمزه بودن هیچ‌وقت کافی نبود. دوست داشتم مطمئن باشم هر چیزی که می‌خورم با مواد
            اولیه تازه و در محیطی بهداشتی تهیه شده.
          </p>
          <p>
            به همین دلیل تصمیم گرفتم شیرینی‌پزی را حرفه‌ای یاد بگیرم تا روی تک‌تک مراحل نظارت داشته
            باشم.
          </p>
        </div>
      </section>
      <section className="bg-accent px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-accent-foreground">
            ارزش‌های ما
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(([icon, title, desc]) => (
              <div key={title} className="rounded-2xl border bg-background p-7">
                <div className="mb-4 text-3xl">{icon}</div>
                <h3 className="mb-2 font-bold text-accent-foreground">{title}</h3>
                <p className="text-sm leading-7 text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-r-2xl border-r-4 border-primary bg-primary/10 p-8 leading-9">
          <h2 className="mb-4 text-xl font-bold text-accent-foreground">
            چرا گزینه‌های دیابتی ساختیم
          </h2>
          <p>
            بعضی از عزیزانم با دیابت زندگی می‌کنند و همیشه دلم می‌خواست آن‌ها هم بدون نگرانی از طعم
            شیرینی لذت ببرند.
          </p>
          <p>همین باعث شد روی شیرینی‌هایی با گزینه‌های بدون قند افزوده هم کار کنیم.</p>
        </div>
      </section>
      <section className="px-6 py-16 text-center">
        <h2 className="mb-3 text-2xl font-bold text-accent-foreground">آماده سفارش هستید؟</h2>
        <p className="mb-8 text-muted-foreground">محصولات تازه وینیمی بیکری را ببینید</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/products" className="rounded-full bg-primary px-8 py-3 font-bold text-white">
            مشاهده محصولات
          </Link>
          <Link to="/contact" className="rounded-full border px-8 py-3 font-bold">
            تماس با ما
          </Link>
        </div>
      </section>
    </main>
  );
}
