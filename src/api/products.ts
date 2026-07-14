import { PRODUCTS, findProduct } from "@/data/products";
import { requestJson, hasApiBaseUrl } from "./client";
import type { ApiCollection, ApiResource, ProductDto } from "@/types/api";

export async function fetchProducts(): Promise<ProductDto[]> {
  if (!hasApiBaseUrl()) return PRODUCTS;
  const response = await requestJson<ApiCollection<ProductDto>>("/api/v1/products");
  return response.data;
}

export async function fetchProductBySlug(slug: string): Promise<ProductDto | undefined> {
  if (!hasApiBaseUrl()) return findProduct(slug);
  const response = await requestJson<ApiResource<ProductDto>>(`/api/v1/products/${slug}`);
  return response.data;
}
