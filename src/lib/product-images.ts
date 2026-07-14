import type { Product, ProductCategory, ProductImage } from "@/data/types";

const CATEGORY_TONE: Record<ProductCategory, { bg: string; fg: string; label: string }> = {
  cookies: { bg: "#E8F5E0", fg: "#5C7A4A", label: "کوکی" },
  cakes: { bg: "#FAF7F2", fg: "#C8961E", label: "کیک" },
  diet: { bg: "#F5F5F0", fg: "#5C7A4A", label: "رژیمی" },
  "dry-sweets": { bg: "#FAF7F2", fg: "#3D2B1F", label: "شیرینی" },
  "gift-boxes": { bg: "#E8F5E0", fg: "#3D2B1F", label: "هدیه" },
};

function svgImage(label: string, bg: string, fg: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" role="img" aria-label="${label}"><rect width="800" height="1000" fill="${bg}"/><circle cx="400" cy="390" r="185" fill="${fg}" opacity=".12"/><circle cx="400" cy="390" r="105" fill="${fg}" opacity=".16"/><text x="400" y="610" text-anchor="middle" font-family="Arial, sans-serif" font-size="58" font-weight="700" fill="${fg}">${label}</text><text x="400" y="690" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="${fg}" opacity=".72">Winimi Bakery</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const CATEGORY_IMAGE: Record<ProductCategory, string> = Object.fromEntries(
  Object.entries(CATEGORY_TONE).map(([category, tone]) => [
    category,
    svgImage(tone.label, tone.bg, tone.fg),
  ]),
) as Record<ProductCategory, string>;

export const heroBakery = svgImage("وینیمی", "#E8F5E0", "#5C7A4A");
export const brandStoryImage = svgImage("وینیمی", "#FAF7F2", "#3D2B1F");

export function isRealProductImageUrl(url?: string): boolean {
  if (!url) return false;
  const normalized = url.trim().toLowerCase();
  return (
    normalized.length > 0 &&
    !normalized.startsWith("data:") &&
    !normalized.includes("placeholder") &&
    !normalized.includes("/images/products/")
  );
}

export function getPrimaryProductImage(product: Product): ProductImage | undefined {
  return product.images.find((image) => image.isPrimary && isRealProductImageUrl(image.url)) ??
    product.images.find((image) => isRealProductImageUrl(image.url));
}

export function getProductImage(productOrSlug: Product | string, category?: ProductCategory): string {
  if (typeof productOrSlug !== "string") {
    const realImage = getPrimaryProductImage(productOrSlug);
    return realImage?.url ?? CATEGORY_IMAGE[productOrSlug.category];
  }

  return category ? CATEGORY_IMAGE[category] : heroBakery;
}

export function getProductImageAlt(product: Product): string {
  return getPrimaryProductImage(product)?.alt ?? `تصویر ${product.name}`;
}
