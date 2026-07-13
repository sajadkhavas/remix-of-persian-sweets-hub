import { Search } from "lucide-react";
import type { BlogFacets, BlogFilterSearch } from "@/lib/blog-filters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toPersianDigits } from "@/lib/format";

interface BlogFiltersProps {
  idPrefix?: string;
  filters: BlogFilterSearch;
  facets: BlogFacets;
  onSearchChange: (value?: string) => void;
  onCategoryChange: (value?: BlogFilterSearch["category"]) => void;
  onTagChange: (value?: string) => void;
  onClear: () => void;
}

export function BlogFilters({
  idPrefix = "blog-filters",
  filters,
  facets,
  onSearchChange,
  onCategoryChange,
  onTagChange,
  onClear,
}: BlogFiltersProps) {
  const searchId = `${idPrefix}-search`;

  return (
    <div className="space-y-6 rounded-3xl border border-border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-extrabold">فیلتر مقالات</h3>
        <Button type="button" variant="ghost" size="sm" onClick={onClear}>
          پاک کردن
        </Button>
      </div>

      <div className="space-y-2">
        <label htmlFor={searchId} className="text-sm font-bold">
          جستجو در بلاگ
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id={searchId}
            type="search"
            value={filters.q ?? ""}
            onChange={(event) =>
              onSearchChange(event.target.value.trim() ? event.target.value : undefined)
            }
            placeholder="عنوان، متن، دسته یا برچسب"
            className="pe-10"
          />
        </div>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-bold">دسته‌بندی</legend>
        <div className="space-y-2">
          {facets.categories.map((category) => {
            const inputId = `${idPrefix}-category-${category.value}`;
            const checked = filters.category === category.value;
            return (
              <label
                key={category.value}
                htmlFor={inputId}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-border px-3 py-2 text-sm transition-colors hover:bg-accent/60"
              >
                <span className="flex items-center gap-2">
                  <Checkbox
                    id={inputId}
                    checked={checked}
                    onCheckedChange={() =>
                      onCategoryChange(
                        checked ? undefined : (category.value as BlogFilterSearch["category"]),
                      )
                    }
                  />
                  <span>{category.label}</span>
                </span>
                <span className="text-xs text-muted-foreground">
                  {toPersianDigits(category.count)}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-bold">برچسب‌ها</legend>
        <div className="flex flex-wrap gap-2">
          {facets.tags.map((tag) => {
            const checked = filters.tag === tag.value;
            return (
              <button
                key={tag.value}
                type="button"
                onClick={() => onTagChange(checked ? undefined : tag.value)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  checked
                    ? "border-primary bg-primary text-white"
                    : "border-primary/30 bg-primary-light text-primary-dark hover:bg-primary/20"
                }`}
                aria-pressed={checked}
              >
                {tag.label} ({toPersianDigits(tag.count)})
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
