import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, Heart, Instagram, Leaf, Package, ShieldCheck, Sparkles } from "lucide-react";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { Marquee } from "@/components/animations/Marquee";
import { ProductCard } from "@/components/ProductCard";
import { CategoryCard } from "@/components/category/CategoryCard";
import { PRODUCTS } from "@/data/products";
import { getPublicProductCategories } from "@/data/categories";
import { getPublishedPosts } from "@/data/blog";
import type { BlogPost } from "@/data/blog";
import { SITE } from "@/lib/site";
import { buildSeo } from "@/lib/seo";
import { brandStoryImage, heroBakery } from "@/lib/product-images";

export const Route = createFileRoute("/")({
  head: () =>
    buildSeo({
      title: "وینیمی بیکری؛ کیک و کوکی دست‌پخت خانگی",
      description:
        "وینیمی بیکری؛ کیک، کوکی و شیرینی دست‌پخت با مواد اولیه تازه، وسواس در بهداشت، پخت خانگی گرم و گزینه‌های بدون قند افزوده.",
      path: "/",
    }),
  component: HomePage,
});

const MARQUEE_ITEMS = [
  "مواد اولیه تازه و باکیفیت",
  "پخت خانگی گرم و تمیز",
  "وسواس در بهداشت و بسته‌بندی",
  "کوکی‌های دیابتی و بدون قند افزوده",
  "ماندگاری ۷ روزه کوکی‌ها",
  "ارسال سراسری برای محصولات مناسب ارسال",
];

const TRUST_PILLARS = [
  {
    icon: Leaf,
    title: "مواد اولیه مطمئن",
    body: "هر محصول با موادی آماده می‌شود که خودمان هم با خیال راحت برای خانواده‌مان استفاده می‌کنیم.",
  },
  {
    icon: ShieldCheck,
    title: "وسواس در بهداشت",
    body: "از انتخاب مواد اولیه تا پخت، بسته‌بندی و ارسال، تمیزی و کیفیت قبل از هر چیز اولویت دارد.",
  },
  {
    icon: Heart,
    title: "عشق به پخت",
    body: "وینیمی از علاقه واقعی به پخت کیک و شیرینی شروع شده؛ هر محصول با همان دقت خانگی آماده می‌شود.",
  },
  {
    icon: Package,
    title: "بسته‌بندی و ارسال روشن",
    body: "محصولات خشک برای ارسال سراسری آماده می‌شوند و کیک‌ها و تیرامیسوها با شرایط نگهداری یخچالی معرفی می‌شوند.",
  },
];

const HERO_FEATURES = [
  { label: "سبک", value: "خانگی گرم" },
  { label: "تمرکز", value: "بهداشت" },
  { label: "رنگ برند", value: "سبز پاستیلی" },
];

function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="overflow-hidden bg-[color:var(--accent-cream)]">
      <HeroSection reduceMotion={!!shouldReduceMotion} />
      <MarqueeSection />
      <CategoriesSection />
      <SignatureProductsSection />
      <BrandStorySection />
      <DiscoverySection />
      <TrustSection />
      <BlogEditorialSection />
      <InstagramSection />
    </div>
  );
}

function HeroSection({ reduceMotion }: { reduceMotion: boolean }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 520], [0, 46]);
  const scale = useTransform(scrollY, [0, 520], [1, 1.04]);
  const heroProducts = PRODUCTS.slice(0, 3);

  return (
    <section className="relative px-4 pb-10 pt-8 md:px-8 md:pb-16 md:pt-12">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--accent-brown)] shadow-[0_30px_90px_-45px_rgba(36,70,31,0.7)] lg:grid-cols-[1.02fr_0.98fr]">
        <div className="relative flex min-h-[620px] flex-col justify-end overflow-hidden p-7 text-white md:p-12 lg:min-h-[700px]">
          <motion.div
            style={reduceMotion ? undefined : { y, scale }}
            className="absolute inset-0 opacity-95"
          >
            <img
              src={heroBakery}
              alt="وینیمی بیکری؛ شیرینی دست‌پخت خانگی"
              width={1600}
              height={1200}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(216,239,139,0.34),transparent_32%),linear-gradient(180deg,rgba(47,53,36,0.26),rgba(47,53,36,0.9))]" />
          </motion.div>

          <div className="relative z-10 max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[color:var(--primary)]/55 bg-white/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.22em] text-[color:var(--primary)] backdrop-blur"
            >
              <span className="font-serif-latin normal-case tracking-normal">Winimi Bakery</span>
              <span className="opacity-50">—</span>
              کیک و کوکی مثل خانه
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl font-black leading-[1.16] tracking-tight text-white md:text-7xl lg:text-[82px]"
            >
              همه‌چیز از
              <span className="block text-[color:var(--primary)]">بوی کیک تازه</span>
              شروع شد
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.45 }}
              className="mt-7 max-w-2xl text-base leading-9 text-white/82 md:text-lg"
            >
              وینیمی برای ما فقط فروش شیرینی نیست؛ هر کیک، کوکی و دسر با مواد اولیه تازه، وسواس در بهداشت و همان دقتی آماده می‌شود که اگر قرار بود برای عزیزان خودمان بپزیم.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.68 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/products"
                className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--primary)] px-8 py-4 text-sm font-extrabold text-[color:var(--primary-dark)] shadow-[0_18px_60px_-18px_rgba(216,239,139,0.72)] transition-all hover:bg-white"
              >
                مشاهده محصولات
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" strokeWidth={2.5} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-3 rounded-full border border-white/22 bg-white/8 px-8 py-4 text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/15"
              >
                داستان وینیمی
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="relative hidden bg-[color:var(--primary-light)] p-7 lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_26%,rgba(216,239,139,0.86),transparent_28%),radial-gradient(circle_at_20%_78%,rgba(255,255,255,0.9),transparent_24%)]" />
          <div className="relative grid h-full content-between gap-5">
            <div className="grid grid-cols-3 gap-4">
              {HERO_FEATURES.map((feature) => (
                <div key={feature.label} className="rounded-3xl bg-white/75 p-5 text-center shadow-sm backdrop-blur">
                  <p className="text-[11px] text-muted-foreground">{feature.label}</p>
                  <p className="mt-2 font-display text-xl font-black text-[color:var(--primary-dark)]">{feature.value}</p>
                </div>
              ))}
            </div>

            <div className="mx-auto w-full max-w-md rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-2xl backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.2em] text-[color:var(--primary-dark)]">محصولات محبوب</p>
                  <h2 className="mt-1 font-display text-2xl font-black text-[color:var(--accent-brown)]">طعم‌های تازه امروز</h2>
                </div>
                <Sparkles className="h-7 w-7 text-[color:var(--primary-dark)]" />
              </div>
              <div className="space-y-3">
                {heroProducts.map((product) => (
                  <Link
                    key={product.id}
                    to="/product/$slug"
                    params={{ slug: product.slug }}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-[color:var(--border)] bg-white p-3 transition hover:-translate-y-0.5 hover:border-[color:var(--primary-dark)]"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-bold text-[color:var(--accent-brown)]">{product.name}</p>
                      <p className="mt-1 truncate text-xs text-muted-foreground">{product.shortDescription}</p>
                    </div>
                    <ArrowLeft className="h-4 w-4 shrink-0 text-[color:var(--primary-dark)] transition-transform group-hover:-translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-[color:var(--accent-brown)] p-6 text-white">
              <p className="font-display text-2xl font-black text-[color:var(--primary)]">قبل از خوشمزگی، اعتماد مهم است.</p>
              <p className="mt-3 text-sm leading-7 text-white/75">مواد اولیه تازه، محیط تمیز، بسته‌بندی امن و توضیح شفاف برای هر محصول.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MarqueeSection() {
  return (
    <section className="border-y border-[color:var(--border)] bg-white py-4" aria-label="مزیت‌های وینیمی">
      <Marquee items={MARQUEE_ITEMS.map((text) => `✦  ${text}`)} />
    </section>
  );
}

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-extrabold tracking-[0.24em] text-[color:var(--primary-dark)]">
      <span className="h-px w-8 bg-[color:var(--primary-dark)]" />
      {children}
    </p>
  );
}

function CategoriesSection() {
  const categories = getPublicProductCategories();
  const countByCat = PRODUCTS.reduce<Record<string, number>>((acc, product) => {
    acc[product.category] = (acc[product.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll>
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <SectionEyebrow>دسته‌بندی‌ها</SectionEyebrow>
              <h2 className="font-display text-4xl font-black leading-tight tracking-tight text-[color:var(--accent-brown)] md:text-6xl">
                برای هر حال و هوا،
                <span className="block text-[color:var(--primary-dark)]">یک طعم وینیمی</span>
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex w-fit items-center gap-2 border-b-2 border-[color:var(--accent-brown)] pb-1 text-sm font-bold text-[color:var(--accent-brown)] transition-colors hover:border-[color:var(--primary-dark)] hover:text-[color:var(--primary-dark)]"
            >
              مشاهده همه دسته‌ها
              <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
            </Link>
          </div>
        </RevealOnScroll>

        <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <StaggerItem key={category.slug}>
              <CategoryCard category={category} productCount={countByCat[category.slug] ?? 0} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function SignatureProductsSection() {
  const signature = PRODUCTS.slice(0, 5);
  return (
    <section id="products" className="bg-[color:var(--primary-light)] px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll className="mb-10 text-center">
          <SectionEyebrow>محصولات منتخب</SectionEyebrow>
          <h2 className="font-display text-4xl font-black tracking-tight text-[color:var(--accent-brown)] md:text-6xl">
            انتخاب‌های محبوب وینیمی
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-muted-foreground md:text-base">
            از کوکی‌های کلاسیک تا دسرهای یخچالی؛ هر محصول با قیمت، توضیح مواد اولیه، ماندگاری و شرایط ارسال شفاف معرفی می‌شود.
          </p>
        </RevealOnScroll>

        <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {signature.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function BrandStorySection() {
  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <RevealOnScroll direction="right">
          <div className="relative overflow-hidden rounded-[2.2rem] border border-[color:var(--border)] bg-white p-4 shadow-[0_25px_75px_-50px_rgba(36,70,31,0.55)]">
            <img
              src={brandStoryImage}
              alt="داستان خانگی وینیمی بیکری"
              width={1200}
              height={1400}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-[1.75rem] object-cover"
            />
            <div className="absolute bottom-8 end-8 max-w-[250px] rounded-3xl bg-white/92 p-5 shadow-xl backdrop-blur">
              <p className="font-display text-3xl font-black text-[color:var(--primary-dark)]">وینیمی</p>
              <p className="mt-2 text-xs leading-6 text-[color:var(--accent-brown)]">از بوی کیک تازه تا بسته‌بندی هر سفارش</p>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll direction="left">
          <SectionEyebrow>داستان برند</SectionEyebrow>
          <h2 className="font-display text-4xl font-black leading-tight tracking-tight text-[color:var(--accent-brown)] md:text-6xl">
            یک علاقه خانوادگی
            <span className="block text-[color:var(--primary-dark)]">که به وینیمی تبدیل شد</span>
          </h2>
          <div className="mt-6 space-y-4 text-base leading-9 text-muted-foreground">
            <p>
              از کودکی، عطر کیک و شیرینی تازه همیشه در خانه ما می‌پیچید. شیرینی‌پزی برای ما فقط یک سرگرمی نبود؛ بخشی از زندگی و خاطرات خانوادگی‌مان بود.
            </p>
            <p>
              برای وینیمی، خوشمزه بودن کافی نیست. تازگی، کیفیت مواد اولیه، محیط تمیز و نظارت روی تمام مراحل کار، از انتخاب مواد تا پخت، بسته‌بندی و ارسال، اصل ماست.
            </p>
            <p>
              در کنار محصولات کلاسیک، روی گزینه‌های بدون قند افزوده و انتخاب‌های مناسب‌تر برای افراد حساس به قند هم کار می‌کنیم تا افراد بیشتری با خیال راحت‌تری شیرینی بخورند.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[color:var(--border)] pt-8 md:grid-cols-4">
            {[
              { title: "تازگی", body: "آماده‌سازی نزدیک به سفارش" },
              { title: "بهداشت", body: "کنترل مرحله‌به‌مرحله" },
              { title: "مواد اولیه", body: "انتخاب با خیال راحت" },
              { title: "بدون قند افزوده", body: "برای انتخاب آگاهانه‌تر" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-4">
                <p className="font-display text-sm font-black uppercase tracking-widest text-[color:var(--primary-dark)]">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

function DiscoverySection() {
  const dietProducts = PRODUCTS.filter((product) => product.category === "diet" || product.badge === "diabetic").slice(0, 2);
  const cakeProducts = PRODUCTS.filter((product) => product.requiresCooling).slice(0, 2);

  return (
    <section className="bg-[color:var(--accent-brown)] px-4 py-16 text-white md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        <DiscoveryCard
          title="کوکی‌های بدون قند افزوده"
          subtitle="برای انتخاب آگاهانه‌تر"
          body="کوکی‌های دیابتی و رژیمی وینیمی با تمرکز روی مواد اولیه سالم‌تر و طعم قابل تکرار معرفی می‌شوند."
          products={dietProducts}
        />
        <DiscoveryCard
          title="کیک‌ها و دسرهای یخچالی"
          subtitle="تازه، حساس و مناسب نگهداری سرد"
          body="کیک‌ها، چیزکیک‌ها و تیرامیسوها با شرایط نگهداری روشن معرفی می‌شوند تا کیفیت محصول تا زمان مصرف حفظ شود."
          products={cakeProducts}
        />
      </div>
    </section>
  );
}

function DiscoveryCard({
  title,
  subtitle,
  body,
  products,
}: {
  title: string;
  subtitle: string;
  body: string;
  products: typeof PRODUCTS;
}) {
  return (
    <RevealOnScroll>
      <article className="h-full rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur md:p-8">
        <p className="text-[11px] font-extrabold tracking-[0.24em] text-[color:var(--primary)]">{subtitle}</p>
        <h3 className="mt-3 font-display text-3xl font-black leading-tight md:text-4xl">{title}</h3>
        <p className="mt-4 max-w-xl text-sm leading-8 text-white/72">{body}</p>
        <div className="mt-8 grid gap-3">
          {products.length > 0 ? (
            products.map((product) => (
              <Link
                key={product.id}
                to="/product/$slug"
                params={{ slug: product.slug }}
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 transition hover:border-[color:var(--primary)]"
              >
                <div>
                  <p className="font-bold text-white">{product.name}</p>
                  <p className="mt-1 text-xs text-white/55">{product.shippingNote}</p>
                </div>
                <ArrowLeft className="h-4 w-4 text-[color:var(--primary)] transition-transform group-hover:-translate-x-1" />
              </Link>
            ))
          ) : (
            <p className="rounded-2xl bg-white/[0.08] p-4 text-sm text-white/65">محصولات این بخش به‌زودی تکمیل می‌شود.</p>
          )}
        </div>
      </article>
    </RevealOnScroll>
  );
}

function TrustSection() {
  return (
    <section className="bg-[color:var(--primary-light)] px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll className="mx-auto mb-10 max-w-2xl text-center">
          <SectionEyebrow>تعهد وینیمی</SectionEyebrow>
          <h2 className="font-display text-4xl font-black tracking-tight text-[color:var(--accent-brown)] md:text-6xl">
            قبل از خوشمزگی،
            <span className="block text-[color:var(--primary-dark)]">اعتماد و کیفیت مهم است</span>
          </h2>
        </RevealOnScroll>

        <StaggerContainer className="grid gap-5 md:grid-cols-4">
          {TRUST_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <StaggerItem key={pillar.title}>
                <article className="h-full rounded-3xl border border-[color:var(--border)] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[color:var(--primary-dark)]">
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-[color:var(--primary-light)] text-[color:var(--primary-dark)]">
                    <Icon className="h-5 w-5" strokeWidth={2.3} />
                  </div>
                  <h3 className="font-display text-lg font-black text-[color:var(--accent-brown)]">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{pillar.body}</p>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

function BlogEditorialSection() {
  const posts = getPublishedPosts().slice(0, 3);
  if (posts.length === 0) return null;
  const [lead, ...rest] = posts;

  return (
    <section className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionEyebrow>مجله وینیمی</SectionEyebrow>
            <h2 className="font-display text-4xl font-black leading-tight tracking-tight text-[color:var(--accent-brown)] md:text-6xl">
              نگهداری، انتخاب و
              <span className="block text-[color:var(--primary-dark)]">شیرینی سالم‌تر</span>
            </h2>
          </div>
          <Link to="/blog" className="inline-flex w-fit items-center gap-2 text-sm font-bold text-[color:var(--accent-brown)] hover:text-[color:var(--primary-dark)]">
            همه مقالات
            <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </RevealOnScroll>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {lead && (
            <RevealOnScroll>
              <Link to="/blog/$slug" params={{ slug: lead.slug }} className="group relative block min-h-[420px] overflow-hidden rounded-[2rem] bg-[color:var(--primary-light)] p-8">
                <div className="absolute inset-0 grid place-items-center text-[150px] opacity-25 transition-transform duration-1000 group-hover:scale-110">
                  {lead.emoji ?? "📖"}
                </div>
                <div className="relative flex min-h-[360px] flex-col justify-end">
                  <span className="mb-4 w-fit rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold tracking-[0.22em] text-[color:var(--accent-brown)] backdrop-blur">مقاله ویژه</span>
                  <h3 className="font-display text-3xl font-black leading-tight text-[color:var(--accent-brown)] md:text-4xl">{lead.title}</h3>
                  <p className="mt-4 line-clamp-2 text-sm leading-7 text-muted-foreground md:text-base">{lead.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[color:var(--accent-brown)] transition-transform group-hover:-translate-x-1">
                    خواندن مقاله
                    <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                </div>
              </Link>
            </RevealOnScroll>
          )}

          <div className="grid gap-4">
            {rest.map((post: BlogPost) => (
              <RevealOnScroll key={post.slug}>
                <Link to="/blog/$slug" params={{ slug: post.slug }} className="group flex gap-5 rounded-3xl border border-[color:var(--border)] bg-white p-5 transition-all hover:border-[color:var(--primary-dark)]">
                  <div className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-[color:var(--primary-light)] text-4xl">{post.emoji ?? "📝"}</div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--primary-dark)]">مجله</p>
                    <h4 className="mt-2 line-clamp-2 font-display text-base font-black leading-7 text-[color:var(--accent-brown)] group-hover:text-[color:var(--primary-dark)]">{post.title}</h4>
                    <p className="mt-2 line-clamp-1 text-xs text-muted-foreground">{post.readingTime}</p>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function InstagramSection() {
  return (
    <section className="px-4 pb-16 md:px-8 md:pb-24">
      <RevealOnScroll>
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[color:var(--accent-brown)] p-7 text-white md:p-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 text-[11px] font-extrabold tracking-[0.24em] text-[color:var(--primary)]">
                <Instagram className="h-4 w-4" />
                INSTAGRAM
              </p>
              <h2 className="font-display text-3xl font-black md:text-5xl">پشت‌صحنه پخت را در اینستاگرام ببینید</h2>
              <p className="mt-4 max-w-xl text-sm leading-8 text-white/72">
                عکس‌های واقعی محصولات، موجودی‌های تازه، پشت‌صحنه پخت و اطلاع‌رسانی سفارش‌ها در صفحه اینستاگرام وینیمی منتشر می‌شود.
              </p>
            </div>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-extrabold text-[color:var(--accent-brown)] transition hover:bg-[color:var(--primary)]"
            >
              @{SITE.instagramHandle}
              <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
