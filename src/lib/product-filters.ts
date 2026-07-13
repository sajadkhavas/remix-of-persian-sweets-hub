import type { Product } from "@/data/types";

export type ProductSort = "newest" | "price-asc" | "price-desc" | "popular";

export interface ProductFilterSearch {
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  flavor?: string[];
  tag?: string[];
  sort?: ProductSort;
}

export interface ProductFacetOption {
  value: string;
  count: number;
}

export interface ProductFacets {
  flavors: ProductFacetOption[];
  tags: ProductFacetOption[];
  minPrice: number;
  maxPrice: number;
}

const SORT_VALUES = new Set<ProductSort>(["newest", "price-asc", "price-desc", "popular"]);

function toArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string" && item.trim() !== "");
  }
  return typeof value === "string" && value.trim() !== "" ? [value] : [];
}

function toPositiveNumber(value: unknown): number | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (typeof raw !== "string" && typeof raw !== "number") return undefined;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0) return undefined;
  return Math.floor(parsed);
}

export function parseProductSearch(search: Record<string, unknown>): ProductFilterSearch {
  const sort =
    typeof search.sort === "string" && SORT_VALUES.has(search.sort as ProductSort)
      ? (search.sort as ProductSort)
      : undefined;
  const q = typeof search.q === "string" && search.q.trim() !== "" ? search.q.trim() : undefined;
  const minPrice = toPositiveNumber(search.minPrice);
  const maxPrice = toPositiveNumber(search.maxPrice);

  return {
    q,
    minPrice,
    maxPrice,
    flavor: toArray(search.flavor),
    tag: toArray(search.tag),
    sort,
  };
}

export function hasActiveProductFilters(search: ProductFilterSearch): boolean {
  return Boolean(
    search.q ||
    search.minPrice !== undefined ||
    search.maxPrice !== undefined ||
    (search.flavor?.length ?? 0) > 0 ||
    (search.tag?.length ?? 0) > 0 ||
    search.sort,
  );
}

function countedOptions(values: string[]): ProductFacetOption[] {
  const counts = new Map<string, number>();
  values.forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));
  return Array.from(counts.entries())
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => a.value.localeCompare(b.value, "fa"));
}

export function getProductFacets(products: Product[]): ProductFacets {
  const prices = products.map((product) => product.priceToman);
  return {
    flavors: countedOptions(products.flatMap((product) => product.flavors)),
    tags: countedOptions(
      products.flatMap((product) => [
        ...product.tags,
        ...(product.badge ? [product.badge] : []),
        ...(product.featured ? ["featured"] : []),
      ]),
    ),
    minPrice: prices.length > 0 ? Math.min(...prices) : 0,
    maxPrice: prices.length > 0 ? Math.max(...prices) : 0,
  };
}

function normalizeText(value: string): string {
  return value.trim().toLocaleLowerCase("fa-IR");
}

function productMatchesSearch(product: Product, query: string): boolean {
  const haystack = normalizeText(
    [product.name, product.shortDescription, ...product.flavors, ...product.tags].join(" "),
  );
  return haystack.includes(normalizeText(query));
}

function productTagValues(product: Product): string[] {
  return [
    ...product.tags,
    ...(product.badge ? [product.badge] : []),
    ...(product.featured ? ["featured"] : []),
  ];
}

export function sortProducts(products: Product[], sort: ProductSort = "newest"): Product[] {
  const withIndex = products.map((product, index) => ({ product, index }));
  const byCatalogOrder = (a: { index: number }, b: { index: number }) => a.index - b.index;

  withIndex.sort((a, b) => {
    if (sort === "price-asc")
      return a.product.priceToman - b.product.priceToman || byCatalogOrder(a, b);
    if (sort === "price-desc")
      return b.product.priceToman - a.product.priceToman || byCatalogOrder(a, b);
    if (sort === "popular") {
      const score = (product: Product) =>
        (product.featured ? 30 : 0) +
        (product.badge === "bestseller" ? 20 : 0) +
        (product.badge === "special" ? 10 : 0);
      return score(b.product) - score(a.product) || byCatalogOrder(a, b);
    }
    return byCatalogOrder(a, b);
  });

  return withIndex.map(({ product }) => product);
}

export function filterProducts(products: Product[], filters: ProductFilterSearch): Product[] {
  const selectedFlavors = new Set(filters.flavor ?? []);
  const selectedTags = new Set(filters.tag ?? []);
  const filtered = products.filter((product) => {
    if (filters.q && !productMatchesSearch(product, filters.q)) return false;
    if (filters.minPrice !== undefined && product.priceToman < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && product.priceToman > filters.maxPrice) return false;
    if (
      selectedFlavors.size > 0 &&
      !product.flavors.some((flavor) => selectedFlavors.has(flavor))
    ) {
      return false;
    }
    if (selectedTags.size > 0 && !productTagValues(product).some((tag) => selectedTags.has(tag))) {
      return false;
    }
    return true;
  });

  return sortProducts(filtered, filters.sort);
}

export function tagLabel(value: string): string {
  const labels: Record<string, string> = {
    bestseller: "پرفروش",
    diet: "رژیمی",
    diabetic: "بدون قند افزوده",
    special: "ویژه",
    new: "جدید",
    featured: "پیشنهادی",
  };
  return labels[value] ?? value;
}
