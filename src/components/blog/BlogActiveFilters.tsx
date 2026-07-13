import { X } from "lucide-react";
import type { BlogFilterSearch } from "@/lib/blog-filters";
import { getBlogCategoryLabel, getBlogTagLabel } from "@/lib/blog-filters";
import { Button } from "@/components/ui/button";

interface BlogActiveFiltersProps {
  filters: BlogFilterSearch;
  onRemove: (key: keyof BlogFilterSearch) => void;
  onClear: () => void;
}

const sortLabels: Record<string, string> = {
  oldest: "قدیمی‌ترین",
};

export function BlogActiveFilters({ filters, onRemove, onClear }: BlogActiveFiltersProps) {
  const chips: Array<{ key: keyof BlogFilterSearch; label: string }> = [];

  if (filters.q) chips.push({ key: "q", label: `جستجو: ${filters.q}` });
  if (filters.category) {
    chips.push({ key: "category", label: `دسته: ${getBlogCategoryLabel(filters.category)}` });
  }
  if (filters.tag) chips.push({ key: "tag", label: `برچسب: ${getBlogTagLabel(filters.tag)}` });
  if (filters.sort) chips.push({ key: "sort", label: `مرتب‌سازی: ${sortLabels[filters.sort]}` });

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="فیلترهای فعال بلاگ">
      {chips.map((chip) => (
        <button
          key={`${chip.key}-${chip.label}`}
          type="button"
          onClick={() => onRemove(chip.key)}
          className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary-light px-3 py-1 text-xs font-semibold text-primary-dark transition-colors hover:bg-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`حذف فیلتر ${chip.label}`}
        >
          {chip.label}
          <X className="h-3 w-3" aria-hidden="true" />
        </button>
      ))}
      <Button type="button" variant="ghost" size="sm" onClick={onClear}>
        پاک کردن همه
      </Button>
    </div>
  );
}
