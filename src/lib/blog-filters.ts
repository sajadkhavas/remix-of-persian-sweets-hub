import { BLOG_CATEGORIES, type BlogCategorySlug, type BlogPost } from "@/data/blog";

export type BlogSort = "latest" | "oldest";

export interface BlogFilterSearch {
  q?: string;
  category?: BlogCategorySlug;
  tag?: string;
  sort?: BlogSort;
}

export interface BlogFacetOption {
  value: string;
  label: string;
  count: number;
}

export interface BlogFacets {
  categories: BlogFacetOption[];
  tags: BlogFacetOption[];
}

const SORT_VALUES = new Set<BlogSort>(["latest", "oldest"]);
const CATEGORY_LABELS = new Map(BLOG_CATEGORIES.map((category) => [category.slug, category.name]));
const CATEGORY_SLUGS = new Set<BlogCategorySlug>(BLOG_CATEGORIES.map((category) => category.slug));

const TAG_UI_LABELS: Record<string, string> = {
  article: "مقاله",
  baking: "شیرینی‌پزی",
  cookie: "کوکی",
  cookies: "کوکی‌ها",
  corporate: "سازمانی",
  delivery: "ارسال",
  diabetic: "دیابتی",
  diet: "رژیمی",
  freezer: "فریزر",
  gift: "هدیه",
  guide: "راهنما",
  health: "سلامت",
  hosting: "پذیرایی",
  nationwide: "سراسری",
  nowruz: "نوروز",
  packaging: "بسته‌بندی",
  recipe: "دستور پخت",
  shipping: "ارسال",
  storage: "نگهداری",
  sweets: "شیرینی",
  yalda: "یلدا",
};

function firstString(value: unknown): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  return typeof raw === "string" ? raw : undefined;
}

function normalizeText(value: string): string {
  return value.trim().toLocaleLowerCase("fa-IR");
}

export function getBlogCategoryLabel(value: BlogCategorySlug): string {
  return CATEGORY_LABELS.get(value) ?? value;
}

export function getBlogTagLabel(value: string): string {
  return TAG_UI_LABELS[value] ?? value;
}

export function parseBlogSearch(search: Record<string, unknown>): BlogFilterSearch {
  const rawQuery = firstString(search.q)?.trim();
  const rawCategory = firstString(search.category)?.trim();
  const rawTag = firstString(search.tag)?.trim();
  const rawSort = firstString(search.sort)?.trim();

  return {
    q: rawQuery || undefined,
    category:
      rawCategory && CATEGORY_SLUGS.has(rawCategory as BlogCategorySlug)
        ? (rawCategory as BlogCategorySlug)
        : undefined,
    tag: rawTag || undefined,
    sort: rawSort && SORT_VALUES.has(rawSort as BlogSort) ? (rawSort as BlogSort) : undefined,
  };
}

export function getActiveBlogFilterCount(filters: BlogFilterSearch): number {
  return (
    (filters.q ? 1 : 0) +
    (filters.category ? 1 : 0) +
    (filters.tag ? 1 : 0) +
    (filters.sort ? 1 : 0)
  );
}

export function hasActiveBlogFilters(filters: BlogFilterSearch): boolean {
  return getActiveBlogFilterCount(filters) > 0;
}

function countedOptions(values: Array<{ value: string; label: string }>): BlogFacetOption[] {
  const labels = new Map<string, string>();
  const counts = new Map<string, number>();

  values.forEach(({ value, label }) => {
    labels.set(value, label);
    counts.set(value, (counts.get(value) ?? 0) + 1);
  });

  return Array.from(counts.entries())
    .map(([value, count]) => ({ value, label: labels.get(value) ?? value, count }))
    .sort((a, b) => a.label.localeCompare(b.label, "fa"));
}

export function getBlogFacets(posts: BlogPost[]): BlogFacets {
  return {
    categories: countedOptions(
      posts.map((post) => ({ value: post.category, label: getBlogCategoryLabel(post.category) })),
    ),
    tags: countedOptions(
      posts.flatMap((post) =>
        post.tags.map((tag) => ({ value: tag, label: getBlogTagLabel(tag) })),
      ),
    ),
  };
}

function blogPostMatchesSearch(post: BlogPost, query: string): boolean {
  const categoryName = getBlogCategoryLabel(post.category);
  const haystack = normalizeText(
    [post.title, post.excerpt, post.content, ...post.tags, categoryName].join(" "),
  );

  return haystack.includes(normalizeText(query));
}

export function sortBlogPosts(posts: BlogPost[], sort: BlogSort = "latest"): BlogPost[] {
  return [...posts].sort((a, b) => {
    const left = new Date(a.publishedAt).getTime();
    const right = new Date(b.publishedAt).getTime();
    return sort === "oldest" ? left - right : right - left;
  });
}

export function filterBlogPosts(posts: BlogPost[], filters: BlogFilterSearch): BlogPost[] {
  const filtered = posts.filter((post) => {
    if (filters.q && !blogPostMatchesSearch(post, filters.q)) return false;
    if (filters.category && post.category !== filters.category) return false;
    if (filters.tag && !post.tags.includes(filters.tag)) return false;
    return true;
  });

  return sortBlogPosts(filtered, filters.sort);
}
