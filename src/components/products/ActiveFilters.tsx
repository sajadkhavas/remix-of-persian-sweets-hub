import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProductFilterSearch } from "@/lib/product-filters";
import { tagLabel } from "@/lib/product-filters";
import { formatToman } from "@/lib/format";

interface ActiveFiltersProps {
  filters: ProductFilterSearch;
  onRemove: (key: keyof ProductFilterSearch, value?: string) => void;
  onClear: () => void;
}

const sortLabels: Record<string, string> = {
  "price-asc": "ارزان‌ترین",
  "price-desc": "گران‌ترین",
  popular: "محبوب‌ترین",
};

export function ActiveFilters({ filters, onRemove, onClear }: ActiveFiltersProps) {
  const chips: Array<{ key: keyof ProductFilterSearch; label: string; value?: string }> = [];
  if (filters.q) chips.push({ key: "q", label: `جستجو: ${filters.q}` });
  if (filters.minPrice !== undefined) {
    chips.push({ key: "minPrice", label: `از ${formatToman(filters.minPrice)}` });
  }
  if (filters.maxPrice !== undefined) {
    chips.push({ key: "maxPrice", label: `تا ${formatToman(filters.maxPrice)}` });
  }
  filters.flavor?.forEach((flavor) => chips.push({ key: "flavor", value: flavor, label: flavor }));
  filters.tag?.forEach((tag) => chips.push({ key: "tag", value: tag, label: tagLabel(tag) }));
  if (filters.sort) chips.push({ key: "sort", label: `مرتب‌سازی: ${sortLabels[filters.sort]}` });

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="فیلترهای فعال">
      {chips.map((chip) => (
        <button
          key={`${chip.key}-${chip.value ?? chip.label}`}
          type="button"
          onClick={() => onRemove(chip.key, chip.value)}
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
