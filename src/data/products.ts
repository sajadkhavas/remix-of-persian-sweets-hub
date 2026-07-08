import type { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "kolompeh-kermani",
    name: "کلمپه کرمانی سنتی",
    description:
      "کلمپه کرمانی با مغز خرما، گردو و هل، پخته‌شده به‌روش سنتی کرمان. تازه و بدون مواد نگهدارنده.",
    ingredients: ["آرد گندم", "خرمای مضافتی", "گردو", "هل", "کره حیوانی", "زعفران"],
    weightGrams: 450,
    priceToman: 285000,
    images: ["/placeholder.svg"],
    category: "cookies",
    shelfLifeDays: 30,
    tags: ["سنتی", "خرما", "کرمان"],
  },
  {
    id: "p2",
    slug: "nan-berenji-qazvin",
    name: "نان برنجی قزوینی",
    description:
      "نان برنجی نازک و خوش‌عطر قزوین با گلاب و هل، مناسب پذیرایی و عصرانه.",
    ingredients: ["آرد برنج", "روغن حیوانی", "شکر", "گلاب", "هل", "خشخاش"],
    weightGrams: 400,
    priceToman: 240000,
    images: ["/placeholder.svg"],
    category: "cookies",
    shelfLifeDays: 45,
    tags: ["سنتی", "گلاب", "قزوین"],
  },
  {
    id: "p3",
    slug: "nan-nokhodchi-qom",
    name: "نان نخودچی قم",
    description:
      "نان نخودچی قم با آرد نخودچی مرغوب و هل، ذوب‌شونده در دهان و کم‌شیرین.",
    ingredients: ["آرد نخودچی", "پودر قند", "روغن", "هل", "پسته"],
    weightGrams: 350,
    priceToman: 210000,
    images: ["/placeholder.svg"],
    category: "cookies",
    shelfLifeDays: 30,
    tags: ["سنتی", "قم", "بدون گلوتن"],
  },
  {
    id: "p4",
    slug: "baghlava-yazdi",
    name: "باقلوا یزدی",
    description:
      "باقلوای یزدی لوزی با مغز پسته و بادام و شربت هل و گلاب، برش‌های تازه و خوش‌رنگ.",
    ingredients: ["آرد", "پسته", "بادام", "شکر", "گلاب", "هل"],
    weightGrams: 500,
    priceToman: 480000,
    images: ["/placeholder.svg"],
    category: "dry-sweets",
    shelfLifeDays: 25,
    tags: ["یزد", "پسته", "شیرینی خشک"],
  },
  {
    id: "p5",
    slug: "sohan-asali",
    name: "سوهان عسلی خانگی",
    description:
      "سوهان عسلی با عسل طبیعی، بادام و زعفران؛ ترد و خوش‌طعم، بسته‌بندی مقاوم برای ارسال.",
    ingredients: ["عسل طبیعی", "شکر", "بادام", "زعفران", "کره"],
    weightGrams: 300,
    priceToman: 320000,
    images: ["/placeholder.svg"],
    category: "dry-sweets",
    shelfLifeDays: 60,
    tags: ["عسل", "زعفران"],
  },
  {
    id: "p6",
    slug: "gift-box-yalda",
    name: "جعبه هدیه شب یلدا",
    description:
      "جعبه چوبی شکیل شامل کلمپه، باقلوا، نان نخودچی و پسته؛ مناسب هدیه شب یلدا.",
    ingredients: ["ترکیبی از محصولات ویترین"],
    weightGrams: 900,
    priceToman: 890000,
    images: ["/placeholder.svg"],
    category: "gift-boxes",
    shelfLifeDays: 30,
    tags: ["یلدا", "هدیه", "جعبه چوبی"],
  },
  {
    id: "p7",
    slug: "gift-box-nowruz",
    name: "جعبه هدیه نوروز",
    description:
      "جعبه نوروزی شامل شیرینی خشک منتخب و نان برنجی، همراه کارت تبریک دست‌نویس.",
    ingredients: ["ترکیبی از محصولات ویترین"],
    weightGrams: 1000,
    priceToman: 1150000,
    images: ["/placeholder.svg"],
    category: "gift-boxes",
    shelfLifeDays: 30,
    tags: ["نوروز", "هدیه", "عید"],
  },
  {
    id: "p8",
    slug: "cookie-jo-dosheker",
    name: "کوکی جو بدون شکر رژیمی",
    description:
      "کوکی جو دوسر با شیرین‌کننده استویا و کره بادام‌زمینی؛ مناسب رژیم و ورزشکاران.",
    ingredients: ["جو دوسر", "کره بادام‌زمینی", "تخم مرغ", "استویا", "کشمش"],
    weightGrams: 300,
    priceToman: 260000,
    images: ["/placeholder.svg"],
    category: "diet",
    shelfLifeDays: 20,
    tags: ["رژیمی", "بدون شکر", "جو"],
  },
];

export function findProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
