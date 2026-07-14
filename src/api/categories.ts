import { getPublicProductCategories } from "@/data/categories";
import { requestJson, hasApiBaseUrl } from "./client";
import type { ApiCollection, CategoryDto } from "@/types/api";

export async function fetchCategories(): Promise<CategoryDto[]> {
  if (!hasApiBaseUrl()) return getPublicProductCategories();
  const response = await requestJson<ApiCollection<CategoryDto>>("/api/v1/categories");
  return response.data;
}
