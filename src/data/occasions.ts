import type { Occasion } from "./types";

export const OCCASIONS: Occasion[] = [
  {
    slug: "yalda",
    nameFa: "شب یلدا",
    dateWindow: "۳۰ آذر",
    heroCopy: "جعبه‌های یلدایی وینیمی: هدیه‌ای گرم برای طولانی‌ترین شب سال.",
  },
  {
    slug: "nowruz",
    nameFa: "نوروز",
    dateWindow: "اول فروردین",
    heroCopy: "شیرینی خشک نوروزی برای هفت‌سین و پذیرایی از میهمانان عید.",
  },
  {
    slug: "valentine",
    nameFa: "ولنتاین",
    dateWindow: "۲۵ بهمن",
    heroCopy: "جعبه‌های عاشقانه با کوکی و شیرینی خانگی برای هدیه ولنتاین.",
  },
  {
    slug: "mothers-day",
    nameFa: "روز مادر",
    dateWindow: "ولادت حضرت فاطمه (س)",
    heroCopy: "جعبه هدیه ویژه روز مادر با شیرینی‌های سنتی و کارت دست‌نویس.",
  },
  {
    slug: "fathers-day",
    nameFa: "روز پدر",
    dateWindow: "ولادت حضرت علی (ع)",
    heroCopy: "هدیه‌ای شکیل با شیرینی‌های خشک برای پدرانی که دوست‌شان داریم.",
  },
  {
    slug: "teachers-day",
    nameFa: "روز معلم",
    dateWindow: "۱۲ اردیبهشت",
    heroCopy: "قدردانی از معلم با جعبه‌های شیرینی خانگی.",
  },
];

export function findOccasion(slug: string): Occasion | undefined {
  return OCCASIONS.find((o) => o.slug === slug);
}
