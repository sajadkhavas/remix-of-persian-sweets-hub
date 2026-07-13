import type { Product, ProductBadge, ProductCategory, ProductSeo } from "./types";

type ProductSeed = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  seo: ProductSeo;
  priceToman: number;
  category: ProductCategory;
  emoji: string;
  badge?: ProductBadge;
  flavors: string[];
  ingredients: string[];
  allergens: string[];
  tags?: string[];
  weightGrams?: number;
  quantityPerPack?: number;
  shelfLifeDays?: number;
  featured?: boolean;
};

const DEFAULT_SHELF_LIFE_DAYS = 7;
const DEFAULT_PREPARATION_TIME_DAYS = 1;
const DEFAULT_STOCK = 20;

function product(seed: ProductSeed): Product {
  const tags = seed.tags ?? [seed.category, ...seed.flavors];
  return {
    id: seed.id,
    slug: seed.slug,
    sku: `VIN-${seed.id.toUpperCase()}`,
    name: seed.name,
    shortDescription: seed.shortDescription,
    longDescription: `${seed.shortDescription}. این محصول با مواد اولیه تازه و با پخت سفارشی وینیمی آماده می‌شود تا برای پذیرایی، هدیه یا عصرانه خانگی انتخابی مطمئن باشد.`,
    priceToman: seed.priceToman,
    category: seed.category,
    tags,
    flavors: seed.flavors,
    images: [
      {
        url: `/images/products/${seed.slug}.webp`,
        alt: seed.name,
        isPrimary: true,
      },
    ],
    emoji: seed.emoji,
    weightGrams: seed.weightGrams ?? 250,
    quantityPerPack: seed.quantityPerPack,
    shelfLifeDays: seed.shelfLifeDays ?? DEFAULT_SHELF_LIFE_DAYS,
    ingredients: seed.ingredients,
    allergens: seed.allergens,
    storageInstructions: "در ظرف دربسته، جای خشک و خنک و دور از نور مستقیم نگهداری شود.",
    preparationTimeDays: DEFAULT_PREPARATION_TIME_DAYS,
    stock: DEFAULT_STOCK,
    featured: seed.featured,
    badge: seed.badge,
    seo: seed.seo,
  };
}

export const PRODUCTS: Product[] = [
  // COOKIES
  product({
    id: "c1",
    slug: "cookie-chocolate-walnut",
    name: "کوکی شکلاتی گردویی",
    shortDescription: "ترکیب شکلات تلخ و گردو توی هر گاز",
    seo: {
      title: "کوکی شکلاتی گردویی | خرید آنلاین از وینیمی",
      description: "ترکیب شکلات تلخ و گردو توی هر گاز",
    },
    priceToman: 100000,
    category: "cookies",
    badge: "bestseller",
    featured: true,
    emoji: "🍪",
    flavors: ["شکلات تلخ", "گردو"],
    ingredients: ["آرد", "کره", "شکلات تلخ", "گردو", "تخم‌مرغ"],
    allergens: ["گلوتن", "تخم‌مرغ", "لبنیات", "مغزها"],
  }),
  product({
    id: "c2",
    slug: "cookie-diet",
    name: "کوکی رژیمی",
    shortDescription: "خوشمزه، سبک، همراه مسیر سلامتی‌ات",
    seo: {
      title: "کوکی رژیمی | خرید آنلاین از وینیمی",
      description: "خوشمزه، سبک، همراه مسیر سلامتی‌ات",
    },
    priceToman: 110000,
    category: "diet",
    badge: "diet",
    emoji: "🌿",
    flavors: ["جو دوسر", "دارچین"],
    ingredients: ["آرد سبوس‌دار", "جو دوسر", "روغن گیاهی", "دارچین"],
    allergens: ["گلوتن"],
  }),
  product({
    id: "c3",
    slug: "cookie-crinkle",
    name: "کوکی ترک‌دار (کرینکل)",
    shortDescription: "ترک‌های پودر قند روی شکلات — انفجار خوشمزگی",
    seo: {
      title: "کوکی ترک‌دار (کرینکل) | خرید آنلاین از وینیمی",
      description: "ترک‌های پودر قند روی شکلات — انفجار خوشمزگی",
    },
    priceToman: 90000,
    category: "cookies",
    emoji: "🍫",
    flavors: ["شکلات", "وانیل"],
    ingredients: ["آرد", "پودر کاکائو", "تخم‌مرغ", "کره", "پودر قند"],
    allergens: ["گلوتن", "تخم‌مرغ", "لبنیات"],
  }),
  product({
    id: "c4",
    slug: "cookie-apple-cinnamon",
    name: "کوکی سیب و دارچین",
    shortDescription: "هر چی از طعمش بگم کمه",
    seo: {
      title: "کوکی سیب و دارچین | خرید آنلاین از وینیمی",
      description: "هر چی از طعمش بگم کمه",
    },
    priceToman: 85000,
    category: "cookies",
    emoji: "🍎",
    flavors: ["سیب", "دارچین"],
    ingredients: ["آرد", "کره", "سیب", "دارچین", "تخم‌مرغ"],
    allergens: ["گلوتن", "تخم‌مرغ", "لبنیات"],
  }),
  product({
    id: "c5",
    slug: "cookie-walnut",
    name: "کوکی گردویی",
    shortDescription: "کلاسیک، ساده، بی‌نظیر",
    seo: {
      title: "کوکی گردویی | خرید آنلاین از وینیمی",
      description: "کلاسیک، ساده، بی‌نظیر",
    },
    priceToman: 95000,
    category: "cookies",
    emoji: "🌰",
    flavors: ["گردو", "وانیل"],
    ingredients: ["آرد", "کره", "گردو", "تخم‌مرغ", "وانیل"],
    allergens: ["گلوتن", "تخم‌مرغ", "لبنیات", "مغزها"],
  }),
  product({
    id: "c6",
    slug: "cookie-red-velvet",
    name: "کوکی ردولوت",
    shortDescription: "با شکلات توت‌فرنگی که عاشقش میشی",
    seo: {
      title: "کوکی ردولوت | خرید آنلاین از وینیمی",
      description: "با شکلات توت‌فرنگی که عاشقش میشی",
    },
    priceToman: 105000,
    category: "cookies",
    emoji: "❤️",
    flavors: ["ردولوت", "توت‌فرنگی"],
    ingredients: ["آرد", "کره", "پودر کاکائو", "شکلات توت‌فرنگی", "تخم‌مرغ"],
    allergens: ["گلوتن", "تخم‌مرغ", "لبنیات"],
  }),
  product({
    id: "c7",
    slug: "cookie-snickers",
    name: "اسنیکرز در نقش کوکی",
    shortDescription: "وقتی اسنیکرز کوکی میشه — باید امتحانش کنی",
    seo: {
      title: "اسنیکرز در نقش کوکی | خرید آنلاین از وینیمی",
      description: "وقتی اسنیکرز کوکی میشه — باید امتحانش کنی",
    },
    priceToman: 120000,
    category: "cookies",
    badge: "special",
    featured: true,
    emoji: "🥜",
    flavors: ["بادام‌زمینی", "کارامل", "شکلات"],
    ingredients: ["آرد", "کره", "بادام‌زمینی", "کارامل", "شکلات"],
    allergens: ["گلوتن", "لبنیات", "بادام‌زمینی"],
  }),
  product({
    id: "c8",
    slug: "cookie-diabetic",
    name: "کوکی مختص دیابتی",
    shortDescription: "بدون قند افزوده، با همان طعم شیرین",
    seo: {
      title: "کوکی مختص دیابتی | خرید آنلاین از وینیمی",
      description: "بدون قند افزوده، با همان طعم شیرین",
    },
    priceToman: 115000,
    category: "diet",
    badge: "diabetic",
    emoji: "💚",
    flavors: ["وانیل", "جو دوسر"],
    ingredients: ["آرد سبوس‌دار", "جو دوسر", "شیرین‌کننده مجاز", "روغن گیاهی"],
    allergens: ["گلوتن"],
  }),
  product({
    id: "c9",
    slug: "cookie-mini-pack",
    name: "مینی کوکی (بسته ۱۰ عددی)",
    shortDescription: "ده تا مینی لذت توی یه بسته",
    seo: {
      title: "مینی کوکی (بسته ۱۰ عددی) | خرید آنلاین از وینیمی",
      description: "ده تا مینی لذت توی یه بسته",
    },
    priceToman: 80000,
    category: "cookies",
    emoji: "🍪",
    flavors: ["وانیل", "شکلات"],
    ingredients: ["آرد", "کره", "شکلات", "تخم‌مرغ"],
    allergens: ["گلوتن", "تخم‌مرغ", "لبنیات"],
    quantityPerPack: 10,
    weightGrams: 180,
  }),
  product({
    id: "c10",
    slug: "croissant",
    name: "کروسان",
    shortDescription: "لایه‌لایه، تازه، کره‌ای",
    seo: {
      title: "کروسان | خرید آنلاین از وینیمی",
      description: "لایه‌لایه، تازه، کره‌ای",
    },
    priceToman: 140000,
    category: "cookies",
    emoji: "🥐",
    flavors: ["کره", "وانیل"],
    ingredients: ["آرد", "کره", "خمیرمایه", "شیر", "تخم‌مرغ"],
    allergens: ["گلوتن", "تخم‌مرغ", "لبنیات"],
    shelfLifeDays: 3,
  }),
  product({
    id: "c19",
    slug: "cake-vanilla-choco-walnut",
    name: "کیک وانیلی شکلاتی گردویی",
    shortDescription: "وانیل، شکلات، گردو — ترکیب بی‌نقص",
    seo: {
      title: "کیک وانیلی شکلاتی گردویی | خرید آنلاین از وینیمی",
      description: "وانیل، شکلات، گردو — ترکیب بی‌نقص",
    },
    priceToman: 95000,
    category: "cookies",
    emoji: "🧁",
    flavors: ["وانیل", "شکلات", "گردو"],
    ingredients: ["آرد", "وانیل", "شکلات", "گردو", "تخم‌مرغ"],
    allergens: ["گلوتن", "تخم‌مرغ", "لبنیات", "مغزها"],
  }),

  // CAKES
  product({
    id: "k1",
    slug: "tiramisu",
    name: "تیرامیسو",
    shortDescription: "ایتالیایی، خامه‌ای، فراموش‌نشدنی",
    seo: {
      title: "تیرامیسو | خرید آنلاین از وینیمی",
      description: "ایتالیایی، خامه‌ای، فراموش‌نشدنی",
    },
    priceToman: 420000,
    category: "cakes",
    badge: "bestseller",
    featured: true,
    emoji: "☕",
    flavors: ["قهوه", "خامه"],
    ingredients: ["بیسکوئیت لیدی‌فینگر", "قهوه", "پنیر ماسکارپونه", "خامه", "پودر کاکائو"],
    allergens: ["گلوتن", "لبنیات", "تخم‌مرغ"],
    weightGrams: 700,
    shelfLifeDays: 3,
  }),
  product({
    id: "k2",
    slug: "cheesecake",
    name: "چیزکیک",
    shortDescription: "کرمی و سنگین به بهترین شکل",
    seo: {
      title: "چیزکیک | خرید آنلاین از وینیمی",
      description: "کرمی و سنگین به بهترین شکل",
    },
    priceToman: 350000,
    category: "cakes",
    emoji: "🧀",
    flavors: ["پنیر خامه‌ای", "وانیل"],
    ingredients: ["پنیر خامه‌ای", "بیسکویت", "کره", "خامه", "وانیل"],
    allergens: ["گلوتن", "لبنیات"],
    weightGrams: 650,
    shelfLifeDays: 3,
  }),
  product({
    id: "k3",
    slug: "wet-chocolate-cake",
    name: "کیک خیس شکلاتی",
    shortDescription: "آنقدر مرطوب که قاشق توش فرو میره",
    seo: {
      title: "کیک خیس شکلاتی | خرید آنلاین از وینیمی",
      description: "آنقدر مرطوب که قاشق توش فرو میره",
    },
    priceToman: 300000,
    category: "cakes",
    emoji: "🍫",
    flavors: ["شکلات", "کاکائو"],
    ingredients: ["آرد", "پودر کاکائو", "شیر", "تخم‌مرغ", "روغن"],
    allergens: ["گلوتن", "تخم‌مرغ", "لبنیات"],
    weightGrams: 650,
    shelfLifeDays: 4,
  }),
  product({
    id: "k4",
    slug: "red-velvet-cake",
    name: "کیک ردولوت",
    shortDescription: "قرمز، خامه‌ای، چشم‌نواز",
    seo: {
      title: "کیک ردولوت | خرید آنلاین از وینیمی",
      description: "قرمز، خامه‌ای، چشم‌نواز",
    },
    priceToman: 380000,
    category: "cakes",
    badge: "special",
    emoji: "❤️",
    flavors: ["ردولوت", "خامه"],
    ingredients: ["آرد", "پودر کاکائو", "پنیر خامه‌ای", "خامه", "تخم‌مرغ"],
    allergens: ["گلوتن", "تخم‌مرغ", "لبنیات"],
    weightGrams: 700,
    shelfLifeDays: 3,
  }),
  product({
    id: "k5",
    slug: "carrot-walnut-cake",
    name: "کیک هویج گردو",
    shortDescription: "گرم، ادویه‌ای، خانگی",
    seo: {
      title: "کیک هویج گردو | خرید آنلاین از وینیمی",
      description: "گرم، ادویه‌ای، خانگی",
    },
    priceToman: 280000,
    category: "cakes",
    emoji: "🥕",
    flavors: ["هویج", "گردو", "دارچین"],
    ingredients: ["آرد", "هویج", "گردو", "دارچین", "تخم‌مرغ"],
    allergens: ["گلوتن", "تخم‌مرغ", "مغزها"],
    weightGrams: 600,
    shelfLifeDays: 5,
  }),
  product({
    id: "k6",
    slug: "chocolate-cream-cake",
    name: "کیک شکلاتی خامه‌ای",
    shortDescription: "لایه‌های شکلات و خامه که تموم نمیشه",
    seo: {
      title: "کیک شکلاتی خامه‌ای | خرید آنلاین از وینیمی",
      description: "لایه‌های شکلات و خامه که تموم نمیشه",
    },
    priceToman: 320000,
    category: "cakes",
    emoji: "🎂",
    flavors: ["شکلات", "خامه"],
    ingredients: ["آرد", "خامه", "شکلات", "تخم‌مرغ", "شیر"],
    allergens: ["گلوتن", "تخم‌مرغ", "لبنیات"],
    weightGrams: 700,
    shelfLifeDays: 3,
  }),
  product({
    id: "k7",
    slug: "baklava-cake",
    name: "کیک باقلوا",
    shortDescription: "عسل، خلال بادام، بافت منحصربه‌فرد",
    seo: {
      title: "کیک باقلوا | خرید آنلاین از وینیمی",
      description: "عسل، خلال بادام، بافت منحصربه‌فرد",
    },
    priceToman: 290000,
    category: "cakes",
    emoji: "🍯",
    flavors: ["عسل", "بادام"],
    ingredients: ["آرد", "عسل", "بادام", "کره", "تخم‌مرغ"],
    allergens: ["گلوتن", "تخم‌مرغ", "لبنیات", "مغزها"],
    weightGrams: 600,
    shelfLifeDays: 5,
  }),
  product({
    id: "k8",
    slug: "three-milk-cake",
    name: "کیک سه شیر",
    shortDescription: "خیس از سه نوع شیر — سبک، لطیف، اعتیادآور",
    seo: {
      title: "کیک سه شیر | خرید آنلاین از وینیمی",
      description: "خیس از سه نوع شیر — سبک، لطیف، اعتیادآور",
    },
    priceToman: 270000,
    category: "cakes",
    emoji: "🥛",
    flavors: ["شیر", "وانیل"],
    ingredients: ["آرد", "شیر", "خامه", "شیر عسلی", "تخم‌مرغ"],
    allergens: ["گلوتن", "تخم‌مرغ", "لبنیات"],
    weightGrams: 650,
    shelfLifeDays: 3,
  }),
];

export function findProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
