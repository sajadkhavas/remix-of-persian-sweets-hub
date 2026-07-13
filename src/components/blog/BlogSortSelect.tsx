import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { BlogSort } from "@/lib/blog-filters";

interface BlogSortSelectProps {
  idPrefix?: string;
  value?: BlogSort;
  onChange: (value?: BlogSort) => void;
}

const OPTIONS: Array<{ value: BlogSort; label: string }> = [
  { value: "latest", label: "جدیدترین" },
  { value: "oldest", label: "قدیمی‌ترین" },
];

export function BlogSortSelect({
  idPrefix = "blog",
  value = "latest",
  onChange,
}: BlogSortSelectProps) {
  const labelId = `${idPrefix}-sort-label`;

  return (
    <div className="min-w-44 space-y-2">
      <label id={labelId} className="text-sm font-bold">
        مرتب‌سازی
      </label>
      <Select
        value={value}
        onValueChange={(nextValue) =>
          onChange(nextValue === "latest" ? undefined : (nextValue as BlogSort))
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
