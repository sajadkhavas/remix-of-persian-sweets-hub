import type { Product } from "./types";

export const PRODUCTS: Product[] = [
  // COOKIES
  { id: "c1", slug: "cookie-chocolate-walnut", name: "کوکی شکلاتی گردویی", description: "ترکیب شکلات تلخ و گردو توی هر گاز", priceToman: 100000, images: [], category: "cookies", badge: "bestseller", emoji: "🍪" },
  { id: "c2", slug: "cookie-diet", name: "کوکی رژیمی", description: "خوشمزه، سبک، همراه مسیر سلامتی‌ات", priceToman: 110000, images: [], category: "diet", badge: "diet", emoji: "🌿" },
  { id: "c3", slug: "cookie-crinkle", name: "کوکی ترک‌دار (کرینکل)", description: "ترک‌های پودر قند روی شکلات — انفجار خوشمزگی", priceToman: 90000, images: [], category: "cookies", emoji: "🍫" },
  { id: "c4", slug: "cookie-apple-cinnamon", name: "کوکی سیب و دارچین", description: "هر چی از طعمش بگم کمه", priceToman: 85000, images: [], category: "cookies", emoji: "🍎" },
  { id: "c5", slug: "cookie-walnut", name: "کوکی گردویی", description: "کلاسیک، ساده، بی‌نظیر", priceToman: 95000, images: [], category: "cookies", emoji: "🌰" },
  { id: "c6", slug: "cookie-red-velvet", name: "کوکی ردولوت", description: "با شکلات توت‌فرنگی که عاشقش میشی", priceToman: 105000, images: [], category: "cookies", emoji: "❤️" },
  { id: "c7", slug: "cookie-snickers", name: "اسنیکرز در نقش کوکی", description: "وقتی اسنیکرز کوکی میشه — باید امتحانش کنی", priceToman: 120000, images: [], category: "cookies", badge: "special", emoji: "🥜" },
  { id: "c8", slug: "cookie-diabetic", name: "کوکی مختص دیابتی", description: "بدون قند افزوده، با همان طعم شیرین", priceToman: 115000, images: [], category: "diet", badge: "diabetic", emoji: "💚" },
  { id: "c9", slug: "cookie-mini-pack", name: "مینی کوکی (بسته ۱۰ عددی)", description: "ده تا مینی لذت توی یه بسته", priceToman: 80000, images: [], category: "cookies", emoji: "🍪" },
  { id: "c10", slug: "croissant", name: "کروسان", description: "لایه‌لایه، تازه، کره‌ای", priceToman: 140000, images: [], category: "cookies", emoji: "🥐" },
  { id: "c19", slug: "cake-vanilla-choco-walnut", name: "کیک وانیلی شکلاتی گردویی", description: "وانیل، شکلات، گردو — ترکیب بی‌نقص", priceToman: 95000, images: [], category: "cookies", emoji: "🧁" },

  // CAKES
  { id: "k1", slug: "tiramisu", name: "تیرامیسو", description: "ایتالیایی، خامه‌ای، فراموش‌نشدنی", priceToman: 420000, images: [], category: "cakes", badge: "bestseller", emoji: "☕" },
  { id: "k2", slug: "cheesecake", name: "چیزکیک", description: "کرمی و سنگین به بهترین شکل", priceToman: 350000, images: [], category: "cakes", emoji: "🧀" },
  { id: "k3", slug: "wet-chocolate-cake", name: "کیک خیس شکلاتی", description: "آنقدر مرطوب که قاشق توش فرو میره", priceToman: 300000, images: [], category: "cakes", emoji: "🍫" },
  { id: "k4", slug: "red-velvet-cake", name: "کیک ردولوت", description: "قرمز، خامه‌ای، چشم‌نواز", priceToman: 380000, images: [], category: "cakes", badge: "special", emoji: "❤️" },
  { id: "k5", slug: "carrot-walnut-cake", name: "کیک هویج گردو", description: "گرم، ادویه‌ای، خانگی", priceToman: 280000, images: [], category: "cakes", emoji: "🥕" },
  { id: "k6", slug: "chocolate-cream-cake", name: "کیک شکلاتی خامه‌ای", description: "لایه‌های شکلات و خامه که تموم نمیشه", priceToman: 320000, images: [], category: "cakes", emoji: "🎂" },
  { id: "k7", slug: "baklava-cake", name: "کیک باقلوا", description: "عسل، خلال بادام، بافت منحصربه‌فرد", priceToman: 290000, images: [], category: "cakes", emoji: "🍯" },
  { id: "k8", slug: "three-milk-cake", name: "کیک سه شیر", description: "خیس از سه نوع شیر — سبک، لطیف، اعتیادآور", priceToman: 270000, images: [], category: "cakes", emoji: "🥛" },
];

export function findProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
