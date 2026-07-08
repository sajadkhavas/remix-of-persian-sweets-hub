export type Category = "cookies" | "dry-sweets" | "gift-boxes" | "diet";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  ingredients: string[];
  weightGrams: number;
  priceToman: number;
  images: string[];
  category: Category;
  shelfLifeDays: number;
  tags: string[];
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
