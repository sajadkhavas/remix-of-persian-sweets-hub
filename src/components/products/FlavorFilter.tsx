import { Checkbox } from "@/components/ui/checkbox";
import type { ProductFacetOption } from "@/lib/product-filters";
import { toPersianDigits } from "@/lib/format";

interface FlavorFilterProps {
  options: ProductFacetOption[];
  selected: string[];
  onToggle: (value: string) => void;
}

export function FlavorFilter({ options, selected, onToggle }: FlavorFilterProps) {
  if (options.length === 0) return null;
  const selectedSet = new Set(selected);

  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-bold">طعم‌ها</legend>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-border px-3 py-2 text-sm transition-colors hover:bg-primary-light/50"
          >
            <span className="flex items-center gap-2">
              <Checkbox
                checked={selectedSet.has(option.value)}
                onCheckedChange={() => onToggle(option.value)}
                aria-label={`فیلتر طعم ${option.value}`}
              />
              {option.value}
            </span>
            <span className="text-xs text-muted-foreground">{toPersianDigits(option.count)}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
