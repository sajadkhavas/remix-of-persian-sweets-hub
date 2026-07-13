import type { FaqItem } from "@/components/jsonld/FAQJsonLd";
import { PRODUCTS } from "./products";
import type { Product } from "./types";

export type ArticleStatus = "published" | "draft";
export type BlogCategorySlug = "storage" | "gift" | "baking" | "diet" | "shipping" | "occasion";

export interface BlogCoverImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface BlogSeo {
  title: string;
  description: string;
}

export interface BlogCategory {
  slug: BlogCategorySlug;
  name: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  heroCopy: string;
  icon: string;
  faqs: FaqItem[];
  relatedProductSlugs: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategorySlug;
  tags: string[];
  coverImage: BlogCoverImage;
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  seo: BlogSeo;
  relatedProducts: string[];
  status: ArticleStatus;
  featured?: boolean;
  emoji?: string;
  topic?: string;
  /** @deprecated Use publishedAt. Kept for compatibility with older route code. */
  datePublished: string;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: "storage",
    name: "نگهداری شیرینی",
    title: "راهنمای نگهداری کوکی و شیرینی خانگی",
    description:
      "آموزش‌های کاربردی برای تازه ماندن کوکی، شیرینی خشک و محصولات خانگی از دمای اتاق تا فریزر.",
    seoTitle: "نگهداری کوکی و شیرینی خانگی",
    seoDescription:
      "راهنمای نگهداری کوکی و شیرینی خانگی وینیمی؛ نکات ظرف دربسته، فریزر، تازگی و بسته‌بندی برای ارسال.",
    heroCopy:
      "اگر می‌خواهید کوکی‌ها بعد از خرید هم عطر، بافت و تازگی‌شان را حفظ کنند، این دسته نقطه شروع خوبی است.",
    icon: "🍪",
    relatedProductSlugs: ["cookie-chocolate-walnut", "cookie-mini-pack", "cookie-crinkle"],
    faqs: [
      {
        question: "کوکی خانگی را چند روز می‌توان نگهداری کرد؟",
        answer:
          "مدت نگهداری به نوع محصول بستگی دارد. برای هر محصول وینیمی، ماندگاری و شرایط نگهداری در صفحه همان محصول نوشته شده است.",
      },
      {
        question: "آیا فریز کردن کوکی روی بافت آن اثر می‌گذارد؟",
        answer:
          "اگر کوکی در ظرف مناسب و دربسته فریز شود، برای نگهداری طولانی‌تر مناسب‌تر است. قبل از سرو بهتر است کمی در دمای اتاق بماند.",
      },
    ],
  },
  {
    slug: "gift",
    name: "هدیه و پذیرایی",
    title: "ایده‌های هدیه شیرینی و کوکی",
    description:
      "راهنمای انتخاب شیرینی خانگی برای هدیه، بسته‌بندی، پذیرایی سازمانی و مناسبت‌های خاص.",
    seoTitle: "هدیه شیرینی و کوکی خانگی",
    seoDescription:
      "ایده‌های هدیه شیرینی و کوکی خانگی؛ بسته‌بندی، باکس هدیه، هدیه شرکتی و انتخاب شیرینی مناسب مناسبت‌ها.",
    heroCopy:
      "از هدیه کوچک دوستانه تا سفارش سازمانی، این دسته به انتخاب شیرینی خوش‌ظاهر و به‌یادماندنی کمک می‌کند.",
    icon: "🎁",
    relatedProductSlugs: ["cookie-mini-pack", "cookie-red-velvet", "chocolate-cream-cake"],
    faqs: [
      {
        question: "برای هدیه دادن، کوکی بهتر است یا کیک؟",
        answer:
          "برای ارسال و ماندگاری، کوکی‌ها معمولاً انتخاب ساده‌تری هستند. برای تحویل نزدیک و پذیرایی تازه، کیک‌ها هم گزینه مناسبی‌اند.",
      },
      {
        question: "آیا می‌توان برای سفارش شرکتی از وینیمی راهنمایی گرفت؟",
        answer:
          "بله، برای سفارش‌های تعدادی بهتر است از واتساپ هماهنگ کنید تا زمان آماده‌سازی و بسته‌بندی دقیق‌تر بررسی شود.",
      },
    ],
  },
  {
    slug: "baking",
    name: "شیرینی‌پزی",
    title: "آموزش و نکات شیرینی‌پزی خانگی",
    description:
      "نکات ساده و قابل اجرا درباره انتخاب شیرینی، بافت کوکی، طعم‌ها و تجربه بهتر شیرینی‌پزی خانگی.",
    seoTitle: "نکات شیرینی‌پزی خانگی",
    seoDescription:
      "مقالات آموزشی وینیمی درباره شیرینی‌پزی خانگی، انتخاب طعم، بافت کوکی و نکات کاربردی پذیرایی.",
    heroCopy:
      "این دسته برای کاربرانی است که دوست دارند پشت انتخاب طعم، بافت و شیرینی خانگی را بهتر بشناسند.",
    icon: "🧁",
    relatedProductSlugs: ["cookie-apple-cinnamon", "carrot-walnut-cake", "baklava-cake"],
    faqs: [],
  },
  {
    slug: "diet",
    name: "رژیمی و بدون قند",
    title: "راهنمای کوکی رژیمی و شیرینی بدون قند افزوده",
    description:
      "محتوای آموزشی برای انتخاب آگاهانه محصولات رژیمی، بدون قند افزوده و مناسب محدودیت‌های غذایی.",
    seoTitle: "راهنمای کوکی رژیمی و بدون قند افزوده",
    seoDescription:
      "راهنمای انتخاب کوکی رژیمی و شیرینی بدون قند افزوده؛ نکات مصرف، مواد اولیه و یادآوری مشورت تخصصی.",
    heroCopy:
      "برای انتخاب محصولات رژیمی، بهتر است مواد اولیه، محدودیت‌های فردی و توصیه متخصص سلامت را کنار هم ببینید.",
    icon: "💚",
    relatedProductSlugs: ["cookie-diet", "cookie-diabetic"],
    faqs: [
      {
        question: "آیا کوکی رژیمی برای همه مناسب است؟",
        answer:
          "خیر. رژیمی بودن به معنی مناسب بودن برای همه افراد نیست و در رژیم‌های درمانی باید با متخصص سلامت مشورت شود.",
      },
      {
        question: "بدون قند افزوده یعنی بدون محدودیت مصرف؟",
        answer:
          "خیر. حتی محصولات بدون قند افزوده هم باید با توجه به شرایط فردی و مقدار مصرف انتخاب شوند.",
      },
    ],
  },
  {
    slug: "shipping",
    name: "ارسال شیرینی",
    title: "ارسال کوکی و شیرینی به شهرهای مختلف",
    description:
      "راهنمای بسته‌بندی و ارسال شیرینی خشک، کوکی و محصولات مناسب ارسال از تهران و اندیشه.",
    seoTitle: "ارسال کوکی و شیرینی خانگی",
    seoDescription:
      "راهنمای ارسال کوکی و شیرینی خانگی؛ بسته‌بندی محافظ، انتخاب محصول مناسب ارسال و نکات سفارش از وینیمی.",
    heroCopy: "برای ارسال شیرینی، انتخاب محصول مقاوم و بسته‌بندی درست به اندازه طعم اهمیت دارد.",
    icon: "🚚",
    relatedProductSlugs: ["cookie-chocolate-walnut", "cookie-mini-pack", "cookie-walnut"],
    faqs: [
      {
        question: "کدام شیرینی برای ارسال مناسب‌تر است؟",
        answer:
          "معمولاً کوکی و شیرینی خشک برای ارسال مناسب‌تر از کیک‌های خامه‌ای هستند؛ اما شرایط هر محصول باید جداگانه بررسی شود.",
      },
    ],
  },
  {
    slug: "occasion",
    name: "مناسبت‌ها",
    title: "شیرینی مناسب یلدا، نوروز و دورهمی‌ها",
    description:
      "ایده‌هایی برای انتخاب شیرینی خانگی در مناسبت‌های ایرانی، دورهمی‌ها و پذیرایی‌های فصلی.",
    seoTitle: "شیرینی مناسب مناسبت‌های ایرانی",
    seoDescription:
      "راهنمای انتخاب شیرینی برای یلدا، نوروز و دورهمی‌ها؛ ایده‌های کوکی و کیک خانگی برای پذیرایی مناسبتی.",
    heroCopy:
      "هر مناسبت حال‌وهوای خودش را دارد؛ این دسته کمک می‌کند شیرینی هماهنگ با همان فضا انتخاب کنید.",
    icon: "🌙",
    relatedProductSlugs: ["cookie-red-velvet", "red-velvet-cake", "three-milk-cake"],
    faqs: [],
  },
];

export const POSTS: BlogPost[] = [
  {
    id: "blog-storage-cookies",
    slug: "how-to-store-cookies",
    title: "چطور کوکی را در خانه نگهداری کنیم؟",
    excerpt: "راهنمای کامل نگهداری کوکی برای حفظ تازگی و طعم — از دمای اتاق تا فریزر.",
    content: `نگهداری درست کوکی یکی از مهم‌ترین مراحل بعد از خرید است.

## نگهداری در دمای اتاق

کوکی‌های خشک در ظرف دربسته یا کیسه زیپ‌لاک تا ۱۴ روز تازه می‌مانند.

## فریزر برای نگهداری طولانی‌مدت

در ظرف دربسته فریزری تا سه ماه سالم می‌مانند.

## نکات مهم

- کوکی‌های با فیلینگ خامه‌ای باید در یخچال نگهداری شوند
- از نگهداری کوکی در نزدیکی مواد بودار خودداری کنید
- قبل از سرو از فریزر، ۳۰ دقیقه در دمای اتاق بگذارید`,
    category: "storage",
    tags: ["کوکی", "نگهداری", "فریزر", "شیرینی خشک"],
    coverImage: {
      url: "/images/blog/how-to-store-cookies.webp",
      alt: "کوکی خانگی در ظرف دربسته برای نگهداری بهتر",
      width: 1200,
      height: 630,
    },
    author: "تیم وینیمی",
    publishedAt: "2026-03-15",
    updatedAt: "2026-03-15",
    readingTime: "۲ دقیقه",
    seo: {
      title: "چطور کوکی را در خانه نگهداری کنیم؟",
      description:
        "راهنمای نگهداری کوکی خانگی برای حفظ تازگی، بافت و طعم در دمای اتاق، یخچال و فریزر.",
    },
    relatedProducts: ["cookie-chocolate-walnut", "cookie-mini-pack", "cookie-crinkle"],
    status: "published",
    featured: true,
    emoji: "🍪",
    topic: "نگهداری",
    datePublished: "2026-03-15",
  },
  {
    id: "blog-gift-wrapping",
    slug: "gift-wrapping-ideas",
    title: "بسته‌بندی هدیه شیرینی — ۵ ایده خلاقانه",
    excerpt: "هدیه دادن کوکی را با این بسته‌بندی‌های زیبا فراموش‌نشدنی کنید.",
    content: `شیرینی هدیه دادن با بسته‌بندی زیبا تأثیر دوچندانی دارد.

## ۱. جعبه کرافت با روبان

ساده اما شیک. با یک روبان ساتن، حس هدیه‌ای لوکس ایجاد می‌کند.

## ۲. کیسه شفاف با گل خشک

مناسب هدیه‌های عروسی و سالگرد.

## ۳. ظرف شیشه‌ای

بعد از خالی شدن هم برای گیرنده کاربردی است.

## ۴. جعبه دولایه با کاغذ کشی

از آسیب‌دیدگی جلوگیری می‌کند.

## ۵. کیف هدیه

برای تولد و یلدا محبوب است.`,
    category: "gift",
    tags: ["هدیه", "بسته‌بندی", "کوکی", "پذیرایی"],
    coverImage: {
      url: "/images/blog/gift-wrapping-ideas.webp",
      alt: "بسته‌بندی هدیه شیرینی با روبان و جعبه کرافت",
      width: 1200,
      height: 630,
    },
    author: "تیم وینیمی",
    publishedAt: "2026-04-10",
    updatedAt: "2026-04-10",
    readingTime: "۲ دقیقه",
    seo: {
      title: "بسته‌بندی هدیه شیرینی؛ ۵ ایده خلاقانه",
      description:
        "۵ ایده ساده و زیبا برای بسته‌بندی هدیه شیرینی و کوکی خانگی مناسب تولد، سالگرد و مناسبت‌ها.",
    },
    relatedProducts: ["cookie-mini-pack", "cookie-red-velvet", "cookie-walnut"],
    status: "published",
    featured: true,
    emoji: "🎁",
    topic: "هدیه",
    datePublished: "2026-04-10",
  },
  {
    id: "blog-yalda-sweets",
    slug: "yalda-sweets-tradition",
    title: "شیرینی یلدا: سنت‌ها و انتخاب‌های مدرن",
    excerpt: "از آجیل و انار تا کوکی‌های مخصوص یلدا.",
    content: `شب یلدا یکی از قدیمی‌ترین جشن‌های ایرانی است.

## سنت‌های قدیمی

انار، هندوانه، آجیل و شیرینی‌های سنتی از همیشگی‌های سفره یلدا هستند.

## کوکی یلدا در وینیمی

کوکی‌های مخصوص با طراحی انار و نگاره‌های سنتی ایرانی.

## چطور سفارش دهید

سفارش‌های یلدا از اوایل دی ماه. حتماً یک هفته قبل سفارش بدهید.`,
    category: "occasion",
    tags: ["یلدا", "مناسبت", "کوکی", "شیرینی ایرانی"],
    coverImage: {
      url: "/images/blog/yalda-sweets-tradition.webp",
      alt: "شیرینی و کوکی مناسب شب یلدا کنار انار",
      width: 1200,
      height: 630,
    },
    author: "تیم وینیمی",
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    readingTime: "۱ دقیقه",
    seo: {
      title: "شیرینی یلدا؛ سنت‌ها و انتخاب‌های مدرن",
      description:
        "راهنمای انتخاب شیرینی شب یلدا؛ از سنت‌های ایرانی تا کوکی‌های مناسبتی و نکات سفارش به‌موقع.",
    },
    relatedProducts: ["cookie-red-velvet", "red-velvet-cake", "cookie-crinkle"],
    status: "published",
    emoji: "🌙",
    topic: "یلدا",
    datePublished: "2026-05-01",
  },
  {
    id: "blog-diet-cookie-guide",
    slug: "diet-cookie-guide",
    title: "راهنمای کامل کوکی رژیمی: چه کسانی می‌توانند بخورند؟",
    excerpt: "کوکی رژیمی برای همه مناسب است یا فقط دیابتی‌ها؟",
    content: `کوکی رژیمی در سال‌های اخیر طرفداران زیادی پیدا کرده.

## تفاوت کوکی رژیمی و معمولی

به‌جای قند سفید از استویا یا اریتریتول استفاده می‌شود.

## چه کسانی می‌توانند بخورند؟

دیابتی‌ها و افراد در رژیم لاغری. با پزشک مشورت کنید.

## نکته مهم

کوکی رژیمی به معنای بی‌محدودیت نیست.`,
    category: "diet",
    tags: ["کوکی رژیمی", "بدون قند افزوده", "دیابت", "سلامت"],
    coverImage: {
      url: "/images/blog/diet-cookie-guide.webp",
      alt: "کوکی رژیمی و مواد اولیه سبک برای انتخاب آگاهانه",
      width: 1200,
      height: 630,
    },
    author: "تیم وینیمی",
    publishedAt: "2026-06-20",
    updatedAt: "2026-06-20",
    readingTime: "۲ دقیقه",
    seo: {
      title: "راهنمای کامل کوکی رژیمی",
      description:
        "کوکی رژیمی برای چه کسانی مناسب است؟ نکات مهم درباره بدون قند افزوده، دیابت و مصرف محدود.",
    },
    relatedProducts: ["cookie-diet", "cookie-diabetic"],
    status: "published",
    featured: true,
    emoji: "💚",
    topic: "کوکی رژیمی",
    datePublished: "2026-06-20",
  },
  {
    id: "blog-nationwide-delivery",
    slug: "nationwide-cookie-delivery",
    title: "چطور کوکی را از تهران به سراسر ایران بفرستیم؟",
    excerpt: "راهنمای ارسال شیرینی خشک با پست پیشتاز.",
    content: `آیا می‌توانند کوکی را از طریق پست سفارش دهند؟

## آیا کوکی پستی می‌شود؟

بله، با بسته‌بندی مناسب.

## روش‌های ارسال

پست پیشتاز ۲ تا ۵ روز. تیپاکس برای تهران و کرج یک‌روزه.

## بسته‌بندی ما

لایه اول کیسه محافظ، لایه دوم پد حبابی، لایه سوم کارتن دولایه.`,
    category: "shipping",
    tags: ["ارسال", "پست", "کوکی", "شیرینی خشک"],
    coverImage: {
      url: "/images/blog/nationwide-cookie-delivery.webp",
      alt: "بسته‌بندی کوکی برای ارسال به شهرهای مختلف ایران",
      width: 1200,
      height: 630,
    },
    author: "تیم وینیمی",
    publishedAt: "2026-07-01",
    updatedAt: "2026-07-01",
    readingTime: "۲ دقیقه",
    seo: {
      title: "ارسال کوکی از تهران به سراسر ایران",
      description:
        "راهنمای ارسال کوکی و شیرینی خشک با بسته‌بندی محافظ، پست پیشتاز و نکات سفارش از وینیمی.",
    },
    relatedProducts: ["cookie-chocolate-walnut", "cookie-mini-pack", "cookie-walnut"],
    status: "published",
    emoji: "🚚",
    topic: "شیرینی ارسالی",
    datePublished: "2026-07-01",
  },
  {
    id: "blog-corporate-gift-guide",
    slug: "corporate-gift-guide",
    title: "راهنمای هدایای شرکتی با شیرینی خانگی",
    excerpt: "چرا شیرینی خانگی برای سازمان‌ها بهتر است؟",
    content: `هدایای شرکتی باید به یاد بمانند.

## چرا شیرینی خانگی؟

تجربه‌ای ملموس و لذت‌بخش که مدت‌ها در خاطر می‌ماند.

## مناسبت‌های مناسب

سالگرد تأسیس، نوروز، تشکر از همکاران.

## چطور سفارش دهید؟

بالای ۵۰ جعبه با واتساپ تماس بگیرید. فاکتور رسمی صادر می‌کنیم.`,
    category: "gift",
    tags: ["هدیه شرکتی", "سازمانی", "کوکی", "بسته‌بندی"],
    coverImage: {
      url: "/images/blog/corporate-gift-guide.webp",
      alt: "هدیه شرکتی شیرینی خانگی با بسته‌بندی مرتب",
      width: 1200,
      height: 630,
    },
    author: "تیم وینیمی",
    publishedAt: "2026-07-05",
    updatedAt: "2026-07-05",
    readingTime: "۲ دقیقه",
    seo: {
      title: "راهنمای هدایای شرکتی با شیرینی خانگی",
      description:
        "چرا شیرینی خانگی برای هدیه شرکتی مناسب است؟ نکات سفارش تعدادی، مناسبت‌ها و بسته‌بندی.",
    },
    relatedProducts: ["cookie-mini-pack", "cookie-red-velvet", "chocolate-cream-cake"],
    status: "published",
    emoji: "🏢",
    topic: "هدیه",
    datePublished: "2026-07-05",
  },
];

export function getPublishedPosts(): BlogPost[] {
  return POSTS.filter((post) => post.status === "published").sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function findPost(slug: string): BlogPost | undefined {
  return getPublishedPosts().find((p) => p.slug === slug);
}

export function getFeaturedPosts(count = 3): BlogPost[] {
  return getPublishedPosts()
    .filter((post) => post.featured)
    .slice(0, count);
}

export function getLatestPosts(count?: number): BlogPost[] {
  const posts = getPublishedPosts();
  return typeof count === "number" ? posts.slice(0, count) : posts;
}

export function getRelatedPosts(currentSlug: string, count = 2): BlogPost[] {
  const currentPost = findPost(currentSlug);
  const posts = getPublishedPosts().filter((post) => post.slug !== currentSlug);
  const sameCategoryPosts = currentPost
    ? posts.filter((post) => post.category === currentPost.category)
    : [];
  const fallbackPosts = posts.filter((post) => !sameCategoryPosts.includes(post));
  return [...sameCategoryPosts, ...fallbackPosts].slice(0, count);
}

export function getBlogCategory(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((category) => category.slug === slug);
}

export function isBlogCategorySlug(slug: string): slug is BlogCategorySlug {
  return BLOG_CATEGORIES.some((category) => category.slug === slug);
}

export function getPostsByCategory(categorySlug: BlogCategorySlug): BlogPost[] {
  return getPublishedPosts().filter((post) => post.category === categorySlug);
}

export function getProductsBySlugs(slugs: string[]): Product[] {
  const productMap = new Map(PRODUCTS.map((product) => [product.slug, product]));
  return slugs
    .map((slug) => productMap.get(slug))
    .filter((product): product is Product => Boolean(product));
}

export function getRelatedProductsForPost(post: BlogPost): Product[] {
  return getProductsBySlugs(post.relatedProducts);
}

export function getRelatedProductsForCategory(category: BlogCategory): Product[] {
  const categoryPostProducts = getPostsByCategory(category.slug).flatMap(
    (post) => post.relatedProducts,
  );
  return getProductsBySlugs([...category.relatedProductSlugs, ...categoryPostProducts]).filter(
    (product, index, products) =>
      products.findIndex((candidate) => candidate.id === product.id) === index,
  );
}

export function formatPersianDate(dateString: string): string {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${dateString}T00:00:00Z`));
}

export function estimateReadingTime(content: string): string {
  const minutes = Math.ceil(content.split(/\s+/).length / 150);
  return `${minutes.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)])} دقیقه`;
}
