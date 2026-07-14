import { useQuery } from "@tanstack/react-query";
import { fetchProductBySlug, fetchProducts } from "@/api/products";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["products", slug],
    queryFn: () => fetchProductBySlug(slug),
    enabled: slug.length > 0,
  });
}
