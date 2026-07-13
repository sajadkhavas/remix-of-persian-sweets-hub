import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ProductSort } from "@/lib/product-filters";

interface SortSelectProps {
  idPrefix?: string;
  value?: ProductSort;
  onChange: (value?: ProductSort) => void;
}

const OPTIONS: Array<{ value: ProductSort; label: string }> = [
  { value: "newest", label: "جدیدترین" },
  { value: "price-asc", label: "ارزان‌ترین" },
  { value: "price-desc", label: "گران‌ترین" },
  { value: "popular", label: "محبوب‌ترین" },
];

export function SortSelect({ idPrefix = "product", value = "newest", onChange }: SortSelectProps) {
  const labelId = `${idPrefix}-sort-label`;

  return (
    <div className="min-w-44 space-y-2">
      <label id={labelId} className="text-sm font-bold">
        مرتب‌سازی
      </label>
      <Select
        value={value}
        onValueChange={(nextValue) =>
          onChange(nextValue === "newest" ? undefined : (nextValue as ProductSort))
        }
      >
        <SelectTrigger aria-labelledby={labelId}>
          <SelectValue placeholder="مرتب‌سازی" />
        </SelectTrigger>
        <SelectContent>
          {OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
