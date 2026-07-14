import type { FaqItem } from "@/components/jsonld/FAQJsonLd";
import type { ProductCategory } from "./types";

export interface CategoryVisual {
  src?: string;
  alt: string;
  placeholder: string;
}

export interface CategoryContentBlock {
  title: string;
  body: string;
}

export interface CategorySeoContent {
  introduction: CategoryContentBlock;
  buyingGuide: CategoryContentBlock;
  usefulInfo: CategoryContentBlock;
  futureBlogLinks: Array<{
    title: string;
    href: string;
  }>;
}

export interface ProductCategoryDefinition {
  slug: ProductCategory;
  name: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  visual: CategoryVisual;
  faqs: FaqItem[];
  seoContent: CategorySeoContent;
  relatedCategorySlugs: ProductCategory[];
  isPublicLanding: boolean;
}

function seoContent(
  introduction: CategoryContentBlock,
  buyingGuide: CategoryContentBlock,
  usefulInfo: CategoryContentBlock,
): CategorySeoContent {
  return { introduction, buyingGuide, usefulInfo, futureBlogLinks: [] };
}

export const PRODUCT_CATEGORIES = [
  {
    slug: "cookies",
    name: "کوکی‌ها",
    title: "خرید کوکی خانگی تازه",
    description:
      "کوکی‌های وینیمی با پخت تازه، طعم‌های شفاف و بسته‌بندی مناسب برای عصرانه، پذیرایی و هدیه آماده می‌شوند.",
    seoTitle: "خرید کوکی خانگی تازه",
    seoDescription:
      "خرید آنلاین کوکی خانگی وینیمی با پخت تازه، مواد اولیه شفاف و ارسال به سراسر ایران.",
    visual: {
      alt: "تصویر نمادین کوکی‌های خانگی وینیمی",
      placeholder: "🍪",
    },
    faqs: [
      {
        question: "کوکی‌های وینیمی برای چه موقعیت‌هایی مناسب هستند؟",
        answer:
          "کوکی‌های وینیمی برای عصرانه، پذیرایی خانگی، هدیه‌های کوچک و میز شیرینی مناسب هستند و مواد اولیه هر محصول در صفحه همان محصول نوشته شده است.",
      },
      {
        question: "کوکی‌ها به کجا ارسال می‌شوند؟",
        answer: "محصول فعلی این دسته یخچالی نیست و با بسته‌بندی محافظ به سراسر ایران ارسال می‌شود.",
      },
    ],
    seoContent: seoContent(
      {
        title: "کوکی تازه برای پذیرایی روزمره",
        body: "دسته کوکی‌ها برای محصولاتی است که بافت نرم، طعم آشنا و امکان ارسال ساده‌تری دارند. در شروع پروژه فقط یک محصول کامل برای این دسته فعال است.",
      },
      {
        title: "راهنمای انتخاب کوکی",
        body: "اگر محصولی می‌خواهید که هم برای عصرانه مناسب باشد و هم برای هدیه کوچک، کوکی شکلاتی گردویی گزینه شروع خوبی است.",
      },
      {
        title: "نکته نگهداری",
        body: "برای حفظ بافت و عطر، کوکی‌ها را در ظرف دربسته، دور از نور مستقیم و در جای خشک و خنک نگهداری کنید.",
      },
    ),
    relatedCategorySlugs: ["dry-sweets", "diet", "gift-boxes"],
    isPublicLanding: true,
  },
  {
    slug: "cakes",
    name: "کیک‌ها",
    title: "خرید کیک و دسر خانگی",
    description:
      "کیک‌های وینیمی برای دورهمی و مناسبت‌های کوچک با اطلاعات شفاف درباره نگهداری، آلرژن و شرایط ارسال معرفی می‌شوند.",
    seoTitle: "خرید کیک و دسر خانگی",
    seoDescription:
      "خرید آنلاین کیک خانگی وینیمی با مواد اولیه شفاف و ارسال یخچالی فقط در تهران و کرج.",
    visual: {
      alt: "تصویر نمادین کیک‌های وینیمی",
      placeholder: "🍰",
    },
    faqs: [
      {
        question: "کیک‌های وینیمی برای ارسال مناسب هستند؟",
        answer:
          "کیک فعلی این دسته یخچالی است و برای حفظ کیفیت فقط در تهران و کرج ارسال می‌شود.",
      },
      {
        question: "اطلاعات نگهداری کیک کجا نوشته شده است؟",
        answer:
          "ماندگاری، شرایط نگهداری، مواد اولیه و آلرژن‌ها در صفحه محصول درج شده است.",
      },
    ],
    seoContent: seoContent(
      {
        title: "کیک تازه برای مصرف نزدیک",
        body: "کیک‌های وینیمی نسبت به کوکی و شیرینی خشک حساس‌تر هستند و شرایط نگهداری و ارسال آن‌ها باید پیش از سفارش بررسی شود.",
      },
      {
        title: "راهنمای انتخاب کیک",
        body: "اگر محصولی برای دورهمی کوچک می‌خواهید و در تهران یا کرج هستید، کیک خیس شکلاتی انتخاب اصلی شروع فروش آنلاین است.",
      },
      {
        title: "نگهداری کیک",
        body: "کیک‌های یخچالی باید در دمای مناسب نگهداری شوند و بهتر است نزدیک به زمان مصرف سفارش داده شوند.",
      },
    ),
    relatedCategorySlugs: ["cookies", "dry-sweets", "gift-boxes"],
    isPublicLanding: true,
  },
  {
    slug: "dry-sweets",
    name: "شیرینی خشک",
    title: "خرید شیرینی خشک وینیمی",
    description:
      "شیرینی خشک وینیمی برای پذیرایی، هدیه و ارسال امن‌تر با ماندگاری بیشتر معرفی می‌شود.",
    seoTitle: "خرید شیرینی خشک وینیمی",
    seoDescription:
      "خرید آنلاین شیرینی خشک وینیمی مناسب پذیرایی و هدیه با امکان ارسال به سراسر ایران.",
    visual: {
      alt: "تصویر نمادین شیرینی خشک وینیمی",
      placeholder: "🥮",
    },
    faqs: [
      {
        question: "شیرینی خشک وینیمی برای چه موقعیت‌هایی مناسب است؟",
        answer:
          "شیرینی خشک برای پذیرایی، هدیه‌های ساده و ارسال امن‌تر مناسب است و ماندگاری بیشتری نسبت به کیک‌های یخچالی دارد.",
      },
      {
        question: "آیا شیرینی خشک به سراسر ایران ارسال می‌شود؟",
        answer:
          "بله، محصول فعلی این دسته یخچالی نیست و با بسته‌بندی محافظ برای ارسال به سراسر ایران آماده می‌شود.",
      },
    ],
    seoContent: seoContent(
      {
        title: "شیرینی خشک برای پذیرایی و ارسال",
        body: "این دسته برای محصولاتی است که ماندگاری بیشتری دارند و برای پذیرایی، همراه چای و ارسال بین‌شهری انتخاب مناسب‌تری هستند.",
      },
      {
        title: "راهنمای انتخاب شیرینی خشک",
        body: "اگر محصولی می‌خواهید که نگهداری و ارسال ساده‌تری داشته باشد، شیرینی خشک نسبت به کیک‌های یخچالی انتخاب مطمئن‌تری است.",
      },
      {
        title: "نگهداری شیرینی خشک",
        body: "برای حفظ بافت، شیرینی خشک را در ظرف دربسته، جای خشک و خنک و دور از نور مستقیم نگهداری کنید.",
      },
    ),
    relatedCategorySlugs: ["cookies", "gift-boxes", "diet"],
    isPublicLanding: true,
  },
  {
    slug: "diet",
    name: "محصولات رژیمی",
    title: "خرید شیرینی و کوکی رژیمی",
    description:
      "محصولات رژیمی و بدون قند افزوده وینیمی با توضیح شفاف مواد اولیه، آلرژن‌ها و یادآوری مشورت تخصصی معرفی می‌شوند.",
    seoTitle: "خرید محصولات رژیمی و بدون قند افزوده",
    seoDescription:
      "خرید آنلاین کوکی بدون قند افزوده وینیمی با مواد اولیه شفاف و ارسال به سراسر ایران.",
    visual: {
      alt: "تصویر نمادین محصولات رژیمی وینیمی",
      placeholder: "🌿",
    },
    faqs: [
      {
        question: "آیا محصولات رژیمی جایگزین توصیه پزشکی هستند؟",
        answer:
          "خیر. اطلاعات محصولات رژیمی وینیمی توصیه پزشکی نیست. در صورت دیابت، حساسیت غذایی یا رژیم درمانی، پیش از مصرف با متخصص سلامت مشورت کنید.",
      },
      {
        question: "محصول رژیمی فعلی به کجا ارسال می‌شود؟",
        answer: "محصول فعلی این دسته یخچالی نیست و با بسته‌بندی محافظ به سراسر ایران ارسال می‌شود.",
      },
    ],
    seoContent: seoContent(
      {
        title: "شیرینی با انتخاب آگاهانه‌تر",
        body: "این دسته برای کاربرانی طراحی شده که می‌خواهند پیش از خرید، مواد اولیه و آلرژن‌ها را دقیق‌تر بررسی کنند.",
      },
      {
        title: "راهنمای خرید محصولات رژیمی",
        body: "قبل از سفارش، مواد اولیه، آلرژن‌ها و توضیح محصول را مطالعه کنید. در صورت محدودیت پزشکی، تصمیم مصرف باید با نظر متخصص انجام شود.",
      },
      {
        title: "اطلاعات مهم برای مصرف‌کنندگان حساس",
        body: "وجود عبارت رژیمی یا بدون قند افزوده به معنی مناسب بودن برای همه افراد نیست و شرایط فردی باید جداگانه بررسی شود.",
      },
    ),
    relatedCategorySlugs: ["cookies", "dry-sweets", "gift-boxes"],
    isPublicLanding: true,
  },
  {
    slug: "gift-boxes",
    name: "باکس هدیه",
    title: "باکس هدیه شیرینی و کوکی",
    description:
      "باکس هدیه وینیمی برای مناسبت‌ها، تشکر و پذیرایی ویژه با بسته‌بندی محافظ معرفی می‌شود.",
    seoTitle: "باکس هدیه شیرینی و کوکی",
    seoDescription:
      "خرید باکس هدیه وینیمی شامل شیرینی و کوکی منتخب با بسته‌بندی مناسب هدیه و ارسال به سراسر ایران.",
    visual: {
      alt: "تصویر نمادین باکس هدیه وینیمی",
      placeholder: "🎁",
    },
    faqs: [
      {
        question: "باکس هدیه وینیمی شامل چه محصولاتی است؟",
        answer:
          "باکس هدیه وینیمی برای ترکیب محصولات منتخب وینیمی در یک بسته‌بندی مناسب هدیه طراحی شده و جزئیات دقیق آن در صفحه محصول نوشته می‌شود.",
      },
      {
        question: "آیا باکس هدیه برای ارسال مناسب است؟",
        answer:
          "باکس هدیه با بسته‌بندی محافظ آماده می‌شود و شرایط ارسال آن در صفحه محصول اعلام شده است.",
      },
    ],
    seoContent: seoContent(
      {
        title: "هدیه خوراکی آماده سفارش",
        body: "باکس هدیه چند محصول منتخب وینیمی را در قالبی مرتب و مناسب هدیه یا پذیرایی خاص کنار هم قرار می‌دهد.",
      },
      {
        title: "راهنمای انتخاب باکس هدیه",
        body: "برای هدیه‌های کوچک و رسمی، باکس هدیه انتخابی آماده‌تر است. برای پذیرایی روزمره، کوکی‌ها و شیرینی خشک گزینه‌های ساده‌تری هستند.",
      },
      {
        title: "اطلاعات مهم باکس",
        body: "محتوای باکس، وزن تقریبی، آلرژن‌ها و شرایط نگهداری در صفحه محصول نوشته می‌شود و در نسخه نهایی با عکس واقعی تکمیل خواهد شد.",
      },
    ),
    relatedCategorySlugs: ["cookies", "dry-sweets", "diet"],
    isPublicLanding: true,
  },
] as const satisfies ProductCategoryDefinition[];

export type PublicProductCategorySlug = (typeof PRODUCT_CATEGORIES)[number]["slug"];

export const PRODUCT_CATEGORY_BY_SLUG = PRODUCT_CATEGORIES.reduce(
  (accumulator, category) => {
    accumulator[category.slug] = category;
    return accumulator;
  },
  {} as Record<ProductCategory, ProductCategoryDefinition>,
);

export function isProductCategorySlug(slug: string): slug is ProductCategory {
  return slug in PRODUCT_CATEGORY_BY_SLUG;
}

export function getProductCategory(slug: ProductCategory): ProductCategoryDefinition {
  return PRODUCT_CATEGORY_BY_SLUG[slug];
}

export function getPublicProductCategories(): ProductCategoryDefinition[] {
  return PRODUCT_CATEGORIES.filter((category) => category.isPublicLanding);
}

export function getRelatedProductCategories(
  category: ProductCategoryDefinition,
): ProductCategoryDefinition[] {
  return category.relatedCategorySlugs
    .map((slug) => PRODUCT_CATEGORY_BY_SLUG[slug])
    .filter((relatedCategory) => relatedCategory.isPublicLanding);
}
