// Persian-digit + toman formatting. Storage stays as plain integers.
const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function toPersianDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);
}

export function formatToman(amount: number): string {
  const grouped = amount.toLocaleString("en-US");
  return `${toPersianDigits(grouped)} تومان`;
}
