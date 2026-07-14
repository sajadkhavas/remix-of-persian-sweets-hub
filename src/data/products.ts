import type { Product, ProductCategory } from "./types";

type ProductInput = Omit<Product, "images"> & {
  imageLabel?: string;
};

const CATEGORY_IMAGE_TONE: Record<ProductCategory, { bg: string; fg: string }> = {
  cookies: { bg: "#E8F5E0", fg: "#5C7A4A" },
  cakes: { bg: "#FAF7F2", fg: "#C8961E" },
  diet: { bg: "#F5F5F0", fg: "#5C7A4A" },
  "dry-sweets": { bg: "#FAF7F2", fg: "#3D2B1F" },
  "gift-boxes": { bg: "#E8F5E0", fg: "#3D2B1F" },
};

function placeholderImage(label: string, category: ProductCategory): string {
  const tone = CATEGORY_IMAGE_TONE[category];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" role="img" aria-label="${label}"><rect width="800" height="1000" fill="${tone.bg}"/><circle cx="400" cy="380" r="178" fill="${tone.fg}" opacity=".12"/><circle cx="400" cy="380" r="98" fill="${tone.fg}" opacity=".16"/><text x="400" y="600" text-anchor="middle" font-family="Arial, sans-serif" font-size="50" font-weight="700" fill="${tone.fg}">${label}</text><text x="400" y="675" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" fill="${tone.fg}" opacity=".7">Winimi photo placeholder</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function product(input: ProductInput): Product {
  const imageLabel = input.imageLabel ?? input.name;
  return {
    ...input,
    images: [
      {
        url: placeholderImage(imageLabel, input.category),
        alt: `تصویر ${input.name}`,
        width: 800,
        height: 1000,
        isPrimary: true,
      },
    ],
  };
}

export const PRODUCTS: Product[] = [
  product({
    id: "cookie-001",
    slug: "cookie-chocolate-walnut",
    sku: "VIN-COOKIE-001",
    name: "کوکی شکلاتی گردویی",
    shortDescription: "کوکی نرم با شکلات تلخ و تکه‌های گردو برای عصرانه و هدیه کوچک.",
    longDescription:
      "کوکی شکلاتی گردویی وینیمی برای کسانی طراحی شده که طعم شکلات عمیق و بافت مغزدار را کنار هم می‌خواهند. این محصول با پخت تازه، بسته‌بندی محافظ و اندازه مناسب برای پذیرایی روزمره آماده می‌شود.",
    priceToman: 100000,
    category: "cookies",
    tags: ["کوکی", "شکلات", "گردو", "پرفروش"],
    flavors: ["شکلات تلخ", "گردو"],
    emoji: "🍪",
    weightGrams: 250,
    quantityPerPack: 6,
    shelfLifeDays: 7,
    ingredients: ["آرد", "کره", "شکلات تلخ", "گردو", "تخم‌مرغ"],
    allergens: ["گلوتن", "تخم‌مرغ", "لبنیات", "مغزها"],
    storageInstructions: "در ظرف دربسته، جای خشک و خنک و دور از نور مستقیم نگهداری شود.",
    preparationTimeDays: 1,
    stock: 20,
    requiresCooling: false,
    shippingScope: "nationwide",
    shippingNote: "ارسال این محصول با بسته‌بندی محافظ به سراسر ایران امکان‌پذیر است.",
    featured: true,
    badge: "bestseller",
    seo: {
      title: "کوکی شکلاتی گردویی | خرید آنلاین از وینیمی",
      description: "خرید کوکی شکلاتی گردویی وینیمی با پخت تازه، شکلات تلخ، گردو و بسته‌بندی مناسب ارسال.",
    },
  }),
  product({
    id: "cake-001",
    slug: "wet-chocolate-cake",
    sku: "VIN-CAKE-001",
    name: "کیک خیس شکلاتی",
    shortDescription: "کیک شکلاتی مرطوب با بافت لطیف برای دورهمی‌های کوچک.",
    longDescription:
      "کیک خیس شکلاتی وینیمی با بافت مرطوب و طعم پررنگ کاکائو آماده می‌شود و برای مصرف تازه بهترین تجربه را دارد. به دلیل ماهیت کیک و نیاز به کنترل دما، ارسال آن فقط در محدوده تهران و کرج انجام می‌شود.",
    priceToman: 300000,
    category: "cakes",
    tags: ["کیک", "شکلات", "یخچالی"],
    flavors: ["شکلات", "کاکائو"],
    emoji: "🍫",
    weightGrams: 650,
    shelfLifeDays: 3,
    ingredients: ["آرد", "پودر کاکائو", "شیر", "تخم‌مرغ", "روغن"],
    allergens: ["گلوتن", "تخم‌مرغ", "لبنیات"],
    storageInstructions: "در یخچال نگهداری شود و پیش از مصرف، چند دقیقه در دمای محیط قرار بگیرد.",
    preparationTimeDays: 1,
    stock: 8,
    requiresCooling: true,
    shippingScope: "tehran-karaj",
    shippingNote: "این محصول یخچالی است و فقط در تهران و کرج ارسال می‌شود.",
    featured: true,
    badge: "special",
    seo: {
      title: "کیک خیس شکلاتی | خرید آنلاین از وینیمی",
      description: "خرید کیک خیس شکلاتی وینیمی با بافت مرطوب و ارسال یخچالی فقط در تهران و کرج.",
    },
  }),
  product({
    id: "dry-001",
    slug: "dry-sweets-assorted-box",
    sku: "VIN-DRY-001",
    name: "شیرینی خشک مخصوص",
    shortDescription: "ترکیبی ساده و ماندگار برای پذیرایی، هدیه و همراه چای.",
    longDescription:
      "شیرینی خشک مخصوص وینیمی برای پذیرایی‌هایی ساخته شده که به محصولی سبک، قابل نگهداری و مناسب ارسال نیاز دارند. بافت خشک‌تر این محصول باعث می‌شود برای ارسال شهری و بین‌شهری انتخاب مطمئن‌تری باشد.",
    priceToman: 180000,
    category: "dry-sweets",
    tags: ["شیرینی خشک", "پذیرایی", "ارسال ایران"],
    flavors: ["وانیل", "کره"],
    emoji: "🥮",
    weightGrams: 300,
    quantityPerPack: 12,
    shelfLifeDays: 10,
    ingredients: ["آرد", "کره", "وانیل", "پودر قند"],
    allergens: ["گلوتن", "لبنیات"],
    storageInstructions: "در ظرف دربسته و جای خشک و خنک نگهداری شود تا بافت شیرینی حفظ شود.",
    preparationTimeDays: 1,
    stock: 15,
    requiresCooling: false,
    shippingScope: "nationwide",
    shippingNote: "ارسال این محصول به سراسر ایران امکان‌پذیر است.",
    featured: true,
    badge: "new",
    seo: {
      title: "شیرینی خشک مخصوص | خرید آنلاین از وینیمی",
      description: "خرید شیرینی خشک مخصوص وینیمی مناسب پذیرایی و هدیه با امکان ارسال به سراسر ایران.",
    },
  }),
  product({
    id: "diet-001",
    slug: "cookie-no-added-sugar",
    sku: "VIN-DIET-001",
    name: "کوکی بدون قند افزوده",
    shortDescription: "کوکی سبک‌تر با شیرینی کنترل‌شده و مواد اولیه شفاف.",
    longDescription:
      "کوکی بدون قند افزوده وینیمی برای انتخاب آگاهانه‌تر طراحی شده و مواد اولیه آن شفاف اعلام می‌شود. این محصول توصیه پزشکی نیست و برای رژیم درمانی یا دیابت باید با نظر متخصص مصرف شود.",
    priceToman: 115000,
    category: "diet",
    tags: ["رژیمی", "بدون قند افزوده", "کوکی"],
    flavors: ["وانیل", "جو دوسر"],
    emoji: "💚",
    weightGrams: 220,
    quantityPerPack: 6,
    shelfLifeDays: 7,
    ingredients: ["آرد سبوس‌دار", "جو دوسر", "شیرین‌کننده مجاز", "روغن گیاهی"],
    allergens: ["گلوتن"],
    storageInstructions: "در ظرف دربسته و دور از نور مستقیم نگهداری شود.",
    preparationTimeDays: 1,
    stock: 12,
    requiresCooling: false,
    shippingScope: "nationwide",
    shippingNote: "ارسال این محصول به سراسر ایران امکان‌پذیر است.",
    featured: true,
    badge: "diabetic",
    seo: {
      title: "کوکی بدون قند افزوده | خرید آنلاین از وینیمی",
      description: "خرید کوکی بدون قند افزوده وینیمی با مواد اولیه شفاف و امکان ارسال به سراسر ایران.",
    },
  }),
  product({
    id: "gift-001",
    slug: "winimi-gift-box",
    sku: "VIN-GIFT-001",
    name: "باکس هدیه وینیمی",
    shortDescription: "باکس هدیه شامل انتخابی از شیرینی و کوکی مناسب مناسبت‌های کوچک.",
    longDescription:
      "باکس هدیه وینیمی برای زمانی آماده می‌شود که می‌خواهید چند طعم منتخب را در یک بسته‌بندی مرتب و مناسب هدیه کنار هم داشته باشید. این محصول به‌عنوان گزینه نمایشی اولیه ثبت شده و در آینده با عکس و ترکیب دقیق مشتری تکمیل می‌شود.",
    priceToman: 350000,
    category: "gift-boxes",
    tags: ["باکس هدیه", "هدیه خوراکی", "کوکی"],
    flavors: ["ترکیبی"],
    emoji: "🎁",
    weightGrams: 500,
    quantityPerPack: 1,
    shelfLifeDays: 7,
    ingredients: ["ترکیبی از محصولات منتخب وینیمی"],
    allergens: ["گلوتن", "تخم‌مرغ", "لبنیات", "مغزها"],
    storageInstructions: "در جای خشک و خنک نگهداری شود و پس از باز شدن بسته‌بندی، درب آن بسته بماند.",
    preparationTimeDays: 2,
    stock: 10,
    requiresCooling: false,
    shippingScope: "nationwide",
    shippingNote: "ارسال این باکس با بسته‌بندی محافظ به سراسر ایران امکان‌پذیر است.",
    featured: true,
    badge: "new",
    seo: {
      title: "باکس هدیه وینیمی | خرید آنلاین شیرینی و کوکی",
      description: "خرید باکس هدیه وینیمی شامل شیرینی و کوکی منتخب با بسته‌بندی مناسب هدیه و ارسال به سراسر ایران.",
    },
  }),
];

export function findProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
