import type { Product, ProductCategoryDefinition } from "@/data/types";

export interface ApiCollection<T> {
  data: T[];
}

export interface ApiResource<T> {
  data: T;
}

export type ProductDto = Product;
export type CategoryDto = ProductCategoryDefinition;

export interface CreateOrderItemInput {
  productId: string;
  quantity: number;
}

export interface CreateOrderInput {
  customerName: string;
  mobile: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  notes?: string;
  items: CreateOrderItemInput[];
}

export interface OrderDraftResponse {
  orderNumber: string;
  status: "pending";
  paymentStatus: "unpaid";
}
