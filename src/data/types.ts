export type ProductCategory = "cookies" | "cakes" | "diet" | "dry-sweets" | "gift-boxes";
export type Category = ProductCategory;
export type ProductBadge = "bestseller" | "diet" | "diabetic" | "special" | "new";

export interface ProductImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  isPrimary?: boolean;
}

export interface ProductSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  priceToman: number;
  compareAtPriceToman?: number;
  category: ProductCategory;
  tags: string[];
  flavors: string[];
  images: ProductImage[];
  emoji?: string;
  weightGrams?: number;
  quantityPerPack?: number;
  shelfLifeDays?: number;
  ingredients: string[];
  allergens: string[];
  storageInstructions?: string;
  preparationTimeDays?: number;
  stock: number;
  featured?: boolean;
  badge?: ProductBadge;
  seo: ProductSeo;
}

export interface Review {
  rating: number;
  author: string;
  text: string;
  date: string;
}

export interface City {
  slug: string;
  nameFa: string;
  shippingMethod: string;
  deliveryDays: string;
  packagingNote: string;
}

export interface Occasion {
  slug: string;
  nameFa: string;
  dateWindow: string;
  heroCopy: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  datePublished: string;
}
