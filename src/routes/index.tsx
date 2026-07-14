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
  const y = useTransform(scrollY, [0, 620], [0, 105]);
  const scale = useTransform(scrollY, [0, 620], [1.02, 1.08]);

  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden bg-[color:var(--accent-brown)] text-white">
      <motion.div style={reduceMotion ? undefined : { y, scale }} className="absolute inset-0">
        <img
          src={heroBakery}
          alt="وینیمی بیکری؛ کیک و کوکی دست‌پخت با رنگ سبز پاستیلی"
          width={1600}
          height={1200}
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--accent-brown)] via-[color:var(--accent-brown)]/65 to-[color:var(--accent-brown)]/18" />
        <div className="absolute inset-0 bg-gradient-to-l from-[color:var(--accent-brown)]/15 via-transparent to-[color:var(--accent-brown)]/72" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-end px-6 pb-20 pt-32 md:px-10 md:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[color:var(--primary)]/50 bg-white/8 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.24em] text-[color:var(--primary)] backdrop-blur"
        >
          <span className="font-serif-latin normal-case tracking-normal">Winimi Bakery</span>
          <span className="opacity-50">—</span>
          خانگی، گرم، مینیمال
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl font-display text-4xl font-bold leading-[1.18] tracking-tight text-white md:text-6xl lg:text-[68px]"
        >
          همه‌چیز از
          <span className="mx-2 italic text-[color:var(--primary)]">بوی کیک تازه</span>
          <br />
          شروع شد
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 max-w-2xl text-base leading-9 text-white/82 md:text-lg"
        >
          وینیمی بیکری برای ما فقط یک شیرینی‌فروشی نیست؛ هر کیک و کوکی با مواد اولیه تازه، وسواس در بهداشت و همان دقتی آماده می‌شود که اگر قرار بود برای عزیزان خودمان بپزیم.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            to="/products"
            className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--primary)] px-8 py-4 text-sm font-bold text-[color:var(--primary-dark)] shadow-[0_20px_60px_-18px_rgba(216,239,139,0.65)] transition-all hover:bg-white"
          >
            مشاهده محصولات
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" strokeWidth={2.5} />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/15"
          >
            داستان وینیمی
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-8"
        >
          {[
            { label: "سبک برند", value: "خانگی" },
            { label: "تمرکز", value: "بهداشت" },
            { label: "طعم", value: "تازه" },
          ].map((item) => (
            <div key={item.label}>
              <p className="font-display text-2xl font-bold text-[color:var(--primary)] md:text-3xl">{item.value}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/60">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function MarqueeSection() {
  return (
    <section
      className="border-y border-[color:var(--border)] bg-[color:var(--primary-dark)] py-5 text-white"
      aria-label="مزیت‌های وینیمی"
    >
      <Marquee items={MARQUEE_ITEMS.map((text) => `✦  ${text}`)} />
    </section>
  );
}

function CategoriesSection() {
  const categories = getPublicProductCategories();
  const countByCat = PRODUCTS.reduce<Record<string, number>>((acc, product) => {
    acc[product.category] = (acc[product.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[color:var(--primary-dark)]">
                <span className="h-px w-8 bg-[color:var(--primary-dark)]" />
                طعم‌های وینیمی
              </p>
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-[color:var(--accent-brown)] md:text-5xl">
                از کوکی‌های روزمره
                <br />
                <span className="italic text-[color:var(--primary-dark)]">تا کیک‌های مناسب دورهمی</span>
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 border-b-2 border-[color:var(--accent-brown)] pb-1 text-sm font-semibold text-[color:var(--accent-brown)] transition-colors hover:border-[color:var(--primary-dark)] hover:text-[color:var(--primary-dark)]"
            >
              مشاهده همه دسته‌ها
              <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
            </Link>
          </div>
        </RevealOnScroll>

        <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
  const signature = PRODUCTS.filter((product) => product.featured || product.badge === "bestseller").slice(0, 8);
  return (
    <section
      id="products"
      className="border-y border-[color:var(--border)] bg-[color:var(--primary-light)] px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll className="mb-14 text-center">
          <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[color:var(--primary-dark)]">
            <span className="h-px w-8 bg-[color:var(--primary-dark)]" />
            محصولات منتخب
            <span className="h-px w-8 bg-[color:var(--primary-dark)]" />
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-[color:var(--accent-brown)] md:text-5xl">
            انتخاب‌های <span className="italic text-[color:var(--primary-dark)]">محبوب وینیمی</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-muted-foreground md:text-base">
            از کوکی‌های کلاسیک تا کیک و تیرامیسوی یخچالی، هر محصول با توضیح مواد اولیه، ماندگاری و شرایط ارسال معرفی می‌شود.
          </p>
        </RevealOnScroll>

        <StaggerContainer className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
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
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[5fr_6fr]">
        <RevealOnScroll direction="right">
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-[color:var(--primary-light)]" />
            <img
              src={brandStoryImage}
              alt="داستان خانگی وینیمی بیکری"
              width={1200}
              height={1400}
              loading="lazy"
              className="aspect-[5/6] w-full rounded-[2rem] object-cover shadow-2xl"
            />
            <div className="absolute bottom-6 end-6 max-w-[230px] rounded-2xl bg-white/95 p-5 shadow-xl backdrop-blur">
              <p className="font-display text-3xl font-bold text-[color:var(--primary-dark)]">وینیمی</p>
              <p className="mt-1 text-xs leading-6 text-[color:var(--accent-brown)]">
                از بوی کیک تازه تا بسته‌بندی هر سفارش
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll direction="left">
          <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[color:var(--primary-dark)]">
            <span className="h-px w-8 bg-[color:var(--primary-dark)]" />
            داستان برند
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-[color:var(--accent-brown)] md:text-5xl">
            یک علاقه خانوادگی
            <br />
            <span className="italic text-[color:var(--primary-dark)]">که به وینیمی تبدیل شد</span>
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

          <div className="mt-8 grid grid-cols-2 gap-6 border-t border-[color:var(--border)] pt-8">
            {[
              { title: "تازگی", body: "محصولات با زمان آماده‌سازی مشخص و نزدیک به سفارش تهیه می‌شوند" },
              { title: "بهداشت", body: "تمیزی و کنترل مراحل کار، اولویت قبل از زیبایی محصول است" },
              { title: "مواد اولیه", body: "انتخاب مواد باکیفیت، همان چیزی که برای خانواده خودمان می‌پسندیم" },
              { title: "گزینه‌های خاص", body: "کوکی‌های بدون قند افزوده، رژیمی و مناسب‌تر برای انتخاب آگاهانه" },
            ].map((item) => (
              <div key={item.title}>
                <p className="font-display text-sm font-semibold uppercase tracking-widest text-[color:var(--primary-dark)]">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>

          <Link
            to="/about"
            className="mt-10 inline-flex items-center gap-3 rounded-full border-2 border-[color:var(--accent-brown)] px-7 py-3.5 text-sm font-semibold text-[color:var(--accent-brown)] transition-all hover:bg-[color:var(--accent-brown)] hover:text-white"
          >
            بیشتر درباره وینیمی
            <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}

function DiscoverySection() {
  const popular = PRODUCTS.filter((product) => product.badge === "bestseller" || product.badge === "special").slice(0, 4);
  const diet = PRODUCTS.filter((product) => product.category === "diet" || product.badge === "diabetic").slice(0, 4);
  const groups = [
    { title: "پرفروش‌ها و طعم‌های محبوب", subtitle: "محصولاتی که بیشتر تکرار خرید می‌شوند", items: popular },
    { title: "انتخاب آگاهانه‌تر", subtitle: "بدون قند افزوده، رژیمی و مناسب‌تر برای سبک زندگی سالم‌تر", items: diet },
  ].filter((group) => group.items.length > 0);

  return (
    <section className="border-y border-[color:var(--border)] bg-[color:var(--accent-brown)] px-6 py-24 text-white md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl space-y-24">
        {groups.map((group) => (
          <div key={group.title}>
            <RevealOnScroll className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.28em] text-[color:var(--primary)]">
                  {group.subtitle}
                </p>
                <h3 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{group.title}</h3>
              </div>
              <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--primary)] hover:text-white">
                مشاهده محصولات
                <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            </RevealOnScroll>
            <StaggerContainer className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {group.items.map((product) => (
                <StaggerItem key={product.id}>
                  <ProductCard product={product} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        ))}
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="border-t border-[color:var(--border)] bg-[color:var(--primary-light)] px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[color:var(--primary-dark)]">
            <span className="h-px w-8 bg-[color:var(--primary-dark)]" />
            تعهد وینیمی
            <span className="h-px w-8 bg-[color:var(--primary-dark)]" />
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-[color:var(--accent-brown)] md:text-5xl">
            قبل از خوشمزگی،
            <br />
            <span className="italic text-[color:var(--primary-dark)]">اعتماد و کیفیت مهم است</span>
          </h2>
        </RevealOnScroll>

        <StaggerContainer className="grid gap-5 md:grid-cols-4">
          {TRUST_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <StaggerItem key={pillar.title}>
                <article className="h-full rounded-2xl border border-[color:var(--border)] bg-white p-6 transition-all hover:-translate-y-1 hover:border-[color:var(--primary-dark)]">
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-[color:var(--primary-light)] text-[color:var(--primary-dark)]">
                    <Icon className="h-5 w-5" strokeWidth={2.3} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[color:var(--accent-brown)]">{pillar.title}</h3>
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
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[color:var(--primary-dark)]">
              <span className="h-px w-8 bg-[color:var(--primary-dark)]" />
              مجله وینیمی
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-[color:var(--accent-brown)] md:text-5xl">
              راهنمای نگهداری، انتخاب و
              <span className="italic text-[color:var(--primary-dark)]"> شیرینی سالم‌تر</span>
            </h2>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent-brown)] hover:text-[color:var(--primary-dark)]">
            همه مقالات
            <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </RevealOnScroll>

        <div className="grid gap-8 lg:grid-cols-[7fr_5fr]">
          {lead && (
            <RevealOnScroll>
              <Link to="/blog/$slug" params={{ slug: lead.slug }} className="group relative block h-full min-h-[420px] overflow-hidden rounded-3xl bg-[color:var(--primary-light)]">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[color:var(--primary-light)] to-[color:var(--accent-cream)] text-[140px] opacity-40 transition-transform duration-1000 group-hover:scale-110">
                  {lead.emoji ?? "📖"}
                </div>
                <div className="relative flex h-full flex-col justify-end p-8 md:p-10">
                  <span className="mb-4 w-fit rounded-full bg-white/80 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.24em] text-[color:var(--accent-brown)] backdrop-blur">مقاله ویژه</span>
                  <h3 className="font-display text-2xl font-bold leading-tight text-[color:var(--accent-brown)] md:text-3xl">{lead.title}</h3>
                  <p className="mt-4 line-clamp-2 text-sm leading-7 text-muted-foreground md:text-base">{lead.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent-brown)] transition-transform group-hover:-translate-x-1">
                    خواندن مقاله
                    <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                </div>
              </Link>
            </RevealOnScroll>
          )}

          <div className="grid gap-5">
            {rest.map((post: BlogPost) => (
              <RevealOnScroll key={post.slug}>
                <Link to="/blog/$slug" params={{ slug: post.slug }} className="group flex gap-5 rounded-2xl border border-[color:var(--border)] bg-white p-5 transition-all hover:border-[color:var(--primary-dark)]">
                  <div className="grid h-24 w-24 shrink-0 place-items-center rounded-xl bg-[color:var(--primary-light)] text-4xl">{post.emoji ?? "📝"}</div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--primary-dark)]">مجله</p>
                    <h4 className="mt-2 line-clamp-2 font-display text-base font-semibold leading-7 text-[color:var(--accent-brown)] group-hover:text-[color:var(--primary-dark)]">{post.title}</h4>
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
    <section className="px-6 py-20 md:px-10">
      <RevealOnScroll>
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[color:var(--accent-brown)] p-8 text-white md:p-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-[color:var(--primary)]">
                <Instagram className="h-4 w-4" />
                Instagram
              </p>
              <h2 className="font-display text-3xl font-bold md:text-5xl">وینیمی را در اینستاگرام دنبال کنید</h2>
              <p className="mt-4 max-w-xl text-sm leading-8 text-white/75">
                عکس‌های واقعی محصولات، استوری‌های منو، پشت‌صحنه پخت و موجودی‌های تازه در اینستاگرام وینیمی منتشر می‌شود.
              </p>
            </div>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white px-7 py-4 text-sm font-bold text-[color:var(--accent-brown)] transition hover:bg-[color:var(--primary)]"
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
