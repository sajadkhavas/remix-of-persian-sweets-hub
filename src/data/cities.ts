import type { City } from "./types";

export const CITIES: City[] = [
  { slug: "tehran", nameFa: "تهران", shippingMethod: "پیک تیپاکس / پست پیشتاز", deliveryDays: "۱ تا ۲ روز کاری", packagingNote: "بسته‌بندی مقاوم دولایه با پد ضربه‌گیر" },
  { slug: "mashhad", nameFa: "مشهد", shippingMethod: "پست پیشتاز", deliveryDays: "۲ تا ۳ روز کاری", packagingNote: "کارتن مضاعف با پد فوم" },
  { slug: "isfahan", nameFa: "اصفهان", shippingMethod: "پست پیشتاز", deliveryDays: "۲ روز کاری", packagingNote: "لایه محافظ حبابی" },
  { slug: "shiraz", nameFa: "شیراز", shippingMethod: "پست پیشتاز", deliveryDays: "۲ تا ۳ روز کاری", packagingNote: "کارتن سخت با فوم داخلی" },
  { slug: "tabriz", nameFa: "تبریز", shippingMethod: "پست پیشتاز", deliveryDays: "۲ تا ۳ روز کاری", packagingNote: "بسته‌بندی مقاوم دولایه" },
  { slug: "karaj", nameFa: "کرج", shippingMethod: "پیک تیپاکس", deliveryDays: "۱ روز کاری", packagingNote: "پد ضربه‌گیر" },
  { slug: "qom", nameFa: "قم", shippingMethod: "پیک تیپاکس", deliveryDays: "۱ تا ۲ روز کاری", packagingNote: "کارتن مقاوم" },
  { slug: "ahvaz", nameFa: "اهواز", shippingMethod: "پست پیشتاز", deliveryDays: "۲ تا ۴ روز کاری", packagingNote: "بسته‌بندی مقاوم رطوبتی" },
  { slug: "kermanshah", nameFa: "کرمانشاه", shippingMethod: "پست پیشتاز", deliveryDays: "۳ تا ۴ روز کاری", packagingNote: "کارتن دولایه" },
  { slug: "urmia", nameFa: "ارومیه", shippingMethod: "پست پیشتاز", deliveryDays: "۳ روز کاری", packagingNote: "پد فوم و کارتن سخت" },
  { slug: "rasht", nameFa: "رشت", shippingMethod: "پست پیشتاز", deliveryDays: "۲ تا ۳ روز کاری", packagingNote: "بسته‌بندی ضدرطوبت مخصوص شمال" },
  { slug: "zahedan", nameFa: "زاهدان", shippingMethod: "پست پیشتاز", deliveryDays: "۳ تا ۵ روز کاری", packagingNote: "کارتن مقاوم و پد ضربه‌گیر" },
  { slug: "hamadan", nameFa: "همدان", shippingMethod: "پست پیشتاز", deliveryDays: "۲ تا ۳ روز کاری", packagingNote: "لایه محافظ حبابی" },
  { slug: "kerman", nameFa: "کرمان", shippingMethod: "پست پیشتاز", deliveryDays: "۳ روز کاری", packagingNote: "کارتن دولایه" },
  { slug: "yazd", nameFa: "یزد", shippingMethod: "پست پیشتاز", deliveryDays: "۲ تا ۳ روز کاری", packagingNote: "پد فوم مقاوم" },
  { slug: "ardabil", nameFa: "اردبیل", shippingMethod: "پست پیشتاز", deliveryDays: "۳ روز کاری", packagingNote: "کارتن مقاوم دولایه" },
];

export function findCity(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}
