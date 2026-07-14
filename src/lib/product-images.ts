import type { Product, ProductCategory } from "@/data/types";

const CATEGORY_TONE: Record<ProductCategory, { bg: string; fg: string; label: string }> = {
  cookies: { bg: "#E8F5E0", fg: "#5C7A4A", label: "کوکی" },
  cakes: { bg: "#FAF7F2", fg: "#C8961E", label: "کیک" },
  diet: { bg: "#F5F5F0", fg: "#5C7A4A", label: "رژیمی" },
  "dry-sweets": { bg: "#FAF7F2", fg: "#3D2B1F", label: "شیرینی" },
  "gift-boxes": { bg: "#E8F5E0", fg: "#3D2B1F", label: "هدیه" },
};

function svgPlaceholder(label: string, bg: string, fg: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" role="img" aria-label="${label}"><rect width="800" height="1000" fill="${bg}"/><circle cx="400" cy="410" r="180" fill="${fg}" opacity=".12"/><circle cx="400" cy="410" r="112" fill="${fg}" opacity=".14"/><text x="400" y="610" text-anchor="middle" font-family="Arial, sans-serif" font-size="56" font-weight="700" fill="${fg}">${label}</text><text x="400" y="690" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="${fg}" opacity=".72">Winimi photo placeholder</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const CATEGORY_IMAGE: Record<ProductCategory, string> = Object.fromEntries(
  Object.entries(CATEGORY_TONE).map(([category, tone]) => [
    category,
    svgPlaceholder(tone.label, tone.bg, tone.fg),
  ]),
) as Record<ProductCategory, string>;

export const heroBakery = svgPlaceholder("وینیمی", "#E8F5E0", "#5C7A4A");
export const brandStoryImage = svgPlaceholder("داستان برند", "#FAF7F2", "#3D2B1F");

export function getProductImage(
  productOrSlug: Product | string,
  category?: ProductCategory,
): string {
  if (typeof productOrSlug !== "string") {
    // Product records already carry the future API image shape. Until verified client
    // photography exists, keep cards on branded placeholders instead of broken or AI imagery.
    return CATEGORY_IMAGE[productOrSlug.category];
  }

  return category ? CATEGORY_IMAGE[category] : heroBakery;
}
