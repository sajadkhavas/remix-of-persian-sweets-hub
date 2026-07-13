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

export const PRODUCT_CATEGORIES = [
  {
    slug: "cookies",
    name: "کوکی‌ها",
    title: "خرید کوکی خانگی تازه",
    description:
      "کوکی‌های وینیمی با پخت تازه، طعم‌های متنوع و بسته‌بندی مناسب برای عصرانه، پذیرایی و هدیه آماده می‌شوند.",
    seoTitle: "خرید کوکی خانگی تازه",
    seoDescription:
      "خرید آنلاین کوکی خانگی وینیمی با طعم‌های شکلاتی، گردویی، کرینکل و مینی‌کوکی؛ پخت تازه و ارسال به سراسر ایران.",
    visual: {
      alt: "تصویر نمادین کوکی‌های خانگی وینیمی",
      placeholder: "🍪",
    },
    faqs: [
      {
        question: "کوکی‌های وینیمی برای چه موقعیت‌هایی مناسب هستند؟",
        answer:
          "کوکی‌های وینیمی برای عصرانه، پذیرایی خانگی، هدیه‌های کوچک و میز شیرینی مناسب هستند و هر محصول توضیح جداگانه مواد اولیه و آلرژن دارد.",
      },
      {
        question: "ماندگاری کوکی‌ها چقدر است؟",
        answer:
          "ماندگاری دقیق هر محصول در صفحه همان محصول درج می‌شود. بیشتر کوکی‌های فعلی با نگهداری در ظرف دربسته و جای خشک و خنک، ماندگاری چندروزه دارند.",
      },
      {
        question: "آیا مواد آلرژن کوکی‌ها مشخص شده است؟",
        answer:
          "بله، برای هر محصول آلرژن‌های اعلام‌شده مانند گلوتن، تخم‌مرغ، لبنیات یا مغزها در صفحه محصول نوشته شده است.",
      },
    ],
    seoContent: {
      introduction: {
        title: "کوکی تازه برای پذیرایی روزمره",
        body: "دسته کوکی‌ها شامل محصولاتی با طعم‌های شکلاتی، گردویی، دارچینی و کلاسیک است. اطلاعات هر محصول از جمله مواد اولیه، وزن و ماندگاری در صفحه همان محصول آمده تا انتخاب راحت‌تر باشد.",
      },
      buyingGuide: {
        title: "راهنمای انتخاب کوکی",
        body: "اگر طعم‌های پرشکلات را دوست دارید، کوکی‌های شکلاتی و کرینکل انتخاب‌های مناسبی هستند. برای طعم‌های گرم‌تر و خانگی‌تر، گزینه‌هایی مثل گردویی یا سیب و دارچین را بررسی کنید.",
      },
      usefulInfo: {
        title: "نکته نگهداری",
        body: "برای حفظ بافت و عطر، کوکی‌ها را در ظرف دربسته، دور از نور مستقیم و در جای خشک و خنک نگهداری کنید. شرایط دقیق نگهداری در صفحه هر محصول نیز تکرار شده است.",
      },
      futureBlogLinks: [],
    },
    relatedCategorySlugs: ["cakes", "diet", "gift-boxes"],
    isPublicLanding: true,
  },
  {
    slug: "cakes",
    name: "کیک‌ها",
    title: "خرید کیک و دسر خانگی",
    description:
      "کیک‌ها و دسرهای وینیمی برای دورهمی، پذیرایی و مناسبت‌های کوچک با مواد اولیه مشخص و توضیحات شفاف ارائه می‌شوند.",
    seoTitle: "خرید کیک و دسر خانگی",
    seoDescription:
      "خرید آنلاین کیک و دسر خانگی وینیمی؛ تیرامیسو، چیزکیک، ردولوت، کیک شکلاتی و طعم‌های مناسب پذیرایی.",
    visual: {
      alt: "تصویر نمادین کیک‌ها و دسرهای وینیمی",
      placeholder: "🍰",
    },
    faqs: [
      {
        question: "کیک‌های وینیمی چه اطلاعاتی دارند؟",
        answer:
          "در صفحه هر کیک، توضیح محصول، مواد اولیه، آلرژن‌ها، وزن تقریبی، ماندگاری و زمان آماده‌سازی درج شده است.",
      },
      {
        question: "کیک‌ها برای ارسال مناسب هستند؟",
        answer:
          "وینیمی برای محصولات خود بسته‌بندی محافظ در نظر می‌گیرد. جزئیات محصول و شرایط نگهداری را پیش از سفارش در صفحه محصول بررسی کنید.",
      },
      {
        question: "چطور بین کیک‌ها انتخاب کنم؟",
        answer:
          "برای طعم‌های خامه‌ای، تیرامیسو و چیزکیک را بررسی کنید. برای طعم‌های شکلاتی یا مناسب پذیرایی کلاسیک، کیک خیس شکلاتی و کیک شکلاتی خامه‌ای گزینه‌های فعلی هستند.",
      },
    ],
    seoContent: {
      introduction: {
        title: "کیک و دسر برای دورهمی",
        body: "در این دسته، کیک‌ها و دسرهایی مانند تیرامیسو، چیزکیک، ردولوت و کیک‌های شکلاتی گردآوری شده‌اند. هر محصول با توضیح کوتاه، مشخصات و آلرژن‌ها معرفی می‌شود.",
      },
      buyingGuide: {
        title: "راهنمای انتخاب کیک",
        body: "اگر دسر خامه‌ای و لطیف می‌خواهید، تیرامیسو یا چیزکیک را ببینید. برای پذیرایی شکلاتی، کیک خیس شکلاتی یا کیک شکلاتی خامه‌ای می‌تواند انتخاب مناسب‌تری باشد.",
      },
      usefulInfo: {
        title: "نگهداری کیک و دسر",
        body: "بسیاری از کیک‌ها و دسرها ماندگاری کوتاه‌تری نسبت به کوکی دارند. اطلاعات ماندگاری و نگهداری هر مورد را از صفحه محصول بررسی کنید.",
      },
      futureBlogLinks: [],
    },
    relatedCategorySlugs: ["cookies", "diet", "gift-boxes"],
    isPublicLanding: true,
  },
  {
    slug: "diet",
    name: "محصولات رژیمی",
    title: "خرید شیرینی و کوکی رژیمی",
    description:
      "محصولات رژیمی وینیمی با توضیح شفاف مواد اولیه، آلرژن‌ها و یادآوری مشورت تخصصی برای رژیم‌های درمانی معرفی می‌شوند.",
    seoTitle: "خرید محصولات رژیمی و بدون قند افزوده",
    seoDescription:
      "خرید آنلاین محصولات رژیمی وینیمی مانند کوکی رژیمی و محصولات بدون قند افزوده با اطلاعات مواد اولیه و آلرژن‌ها.",
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
        question: "مواد اولیه محصولات رژیمی کجا نوشته شده است؟",
        answer:
          "مواد اولیه، آلرژن‌ها و مشخصات هر محصول رژیمی در صفحه همان محصول درج شده است تا پیش از خرید قابل بررسی باشد.",
      },
      {
        question: "محصولات رژیمی فعلی شامل چه مواردی هستند؟",
        answer:
          "محصولات فعلی این دسته شامل کوکی رژیمی و محصول بدون قند افزوده است. موجودی، مواد اولیه و آلرژن‌ها در کارت و صفحه هر محصول نمایش داده می‌شود.",
      },
    ],
    seoContent: {
      introduction: {
        title: "شیرینی با انتخاب آگاهانه‌تر",
        body: "دسته محصولات رژیمی برای کاربرانی طراحی شده که می‌خواهند پیش از خرید، مواد اولیه و آلرژن‌ها را دقیق‌تر بررسی کنند. توضیحات هر محصول به انتخاب شفاف‌تر کمک می‌کند.",
      },
      buyingGuide: {
        title: "راهنمای خرید محصولات رژیمی",
        body: "قبل از سفارش، مواد اولیه، آلرژن‌ها، وزن و توضیح محصول را مطالعه کنید. اگر محدودیت پزشکی یا رژیم درمانی دارید، تصمیم مصرف باید با نظر متخصص سلامت انجام شود.",
      },
      usefulInfo: {
        title: "اطلاعات مهم برای مصرف‌کنندگان حساس",
        body: "وجود عبارت رژیمی یا بدون قند افزوده به معنی مناسب بودن برای همه افراد نیست. شرایط فردی، حساسیت‌ها و رژیم غذایی باید جداگانه بررسی شود.",
      },
      futureBlogLinks: [],
    },
    relatedCategorySlugs: ["cookies", "cakes", "gift-boxes"],
    isPublicLanding: true,
  },
  {
    slug: "gift-boxes",
    name: "باکس هدیه",
    title: "باکس هدیه شیرینی و کوکی",
    description:
      "باکس‌های هدیه وینیمی برای مناسبت‌ها، تشکر و پذیرایی ویژه طراحی می‌شوند و ساختار این دسته برای مجموعه‌های آینده آماده است.",
    seoTitle: "باکس هدیه شیرینی و کوکی",
    seoDescription:
      "باکس هدیه شیرینی و کوکی وینیمی؛ دسته آماده برای مجموعه‌های هدیه آینده با لینک به کوکی‌ها، کیک‌ها و محصولات مناسب پذیرایی.",
    visual: {
      alt: "تصویر نمادین باکس هدیه وینیمی",
      placeholder: "🎁",
    },
    faqs: [
      {
        question: "آیا باکس هدیه اکنون محصول فعال دارد؟",
        answer:
          "در حال حاضر محصول فعالی برای باکس هدیه ثبت نشده است. این صفحه برای معرفی مجموعه‌های هدیه آینده و دسترسی به دسته‌های مرتبط آماده شده است.",
      },
      {
        question: "تا زمان فعال شدن باکس هدیه چه محصولاتی را ببینم؟",
        answer:
          "برای هدیه‌های کوچک می‌توانید دسته کوکی‌ها را بررسی کنید و برای پذیرایی مناسبتی، دسته کیک‌ها و دسرها گزینه‌های فعلی بیشتری دارد.",
      },
      {
        question: "آیا اطلاعات باکس‌های آینده در همین صفحه قرار می‌گیرد؟",
        answer:
          "بله، پس از اضافه شدن محصولات هدیه، همین صفحه با کارت محصولات، توضیحات و مشخصات هر باکس به‌روزرسانی می‌شود.",
      },
    ],
    seoContent: {
      introduction: {
        title: "دسته آماده برای هدیه‌های آینده",
        body: "باکس هدیه برای مجموعه‌هایی در نظر گرفته شده که بتوانند چند محصول وینیمی را در قالبی مناسب هدیه یا پذیرایی خاص کنار هم قرار دهند.",
      },
      buyingGuide: {
        title: "تا آماده شدن باکس‌ها چه انتخابی مناسب است؟",
        body: "اگر اکنون به دنبال هدیه خوراکی هستید، کوکی‌ها به‌دلیل تنوع طعم و بسته‌بندی ساده‌تر می‌توانند گزینه شروع خوبی باشند. برای دورهمی‌ها، دسته کیک‌ها را هم بررسی کنید.",
      },
      usefulInfo: {
        title: "برنامه آینده این دسته",
        body: "پس از تعریف محصولات هدیه، اطلاعات هر باکس شامل محتوا، آلرژن‌ها، وزن یا تعداد اقلام و شرایط نگهداری در صفحه محصول درج خواهد شد.",
      },
      futureBlogLinks: [],
    },
    relatedCategorySlugs: ["cookies", "cakes", "diet"],
    isPublicLanding: true,
  },
  {
    slug: "dry-sweets",
    name: "شیرینی خشک",
    title: "شیرینی خشک",
    description:
      "این دسته برای سازگاری آینده نگهداری شده و پس از اضافه شدن محصول، امکان تبدیل به صفحه عمومی را دارد.",
    seoTitle: "شیرینی خشک وینیمی",
    seoDescription: "دسته آینده شیرینی خشک وینیمی پس از اضافه شدن محصولات مرتبط فعال می‌شود.",
    visual: {
      alt: "تصویر نمادین شیرینی خشک وینیمی",
      placeholder: "🥮",
    },
    faqs: [],
    seoContent: {
      introduction: {
        title: "دسته آینده شیرینی خشک",
        body: "این دسته برای توسعه آینده نگهداری شده است.",
      },
      buyingGuide: {
        title: "راهنمای آینده",
        body: "پس از اضافه شدن محصولات شیرینی خشک، راهنمای خرید در همین بخش تکمیل می‌شود.",
      },
      usefulInfo: {
        title: "اطلاعات آینده",
        body: "اطلاعات نگهداری و ترکیبات پس از ثبت محصول نمایش داده می‌شود.",
      },
      futureBlogLinks: [],
    },
    relatedCategorySlugs: ["cookies", "cakes"],
    isPublicLanding: false,
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
