import type { ProductCategory } from "@/data/types";
import heroBakery from "@/assets/hero-bakery.jpg";
import catCookies from "@/assets/cat-cookies.jpg";
import catCakes from "@/assets/cat-cakes.jpg";
import catDiet from "@/assets/cat-diet.jpg";
import catDrySweets from "@/assets/cat-dry-sweets.jpg";
import catGiftBoxes from "@/assets/cat-gift-boxes.jpg";
import prodChocolate from "@/assets/prod-chocolate.jpg";

export const CATEGORY_IMAGE: Record<ProductCategory, string> = {
  cookies: catCookies,
  cakes: catCakes,
  diet: catDiet,
  "dry-sweets": catDrySweets,
  "gift-boxes": catGiftBoxes,
};

// Per-slug overrides for hero signature products.
const PRODUCT_OVERRIDES: Record<string, string> = {
  "cookie-chocolate-walnut": prodChocolate,
};

export function getProductImage(slug: string, category: ProductCategory): string {
  return PRODUCT_OVERRIDES[slug] ?? CATEGORY_IMAGE[category];
}

export { heroBakery };
