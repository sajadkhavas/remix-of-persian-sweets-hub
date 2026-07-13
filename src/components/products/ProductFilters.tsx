import { Button } from "@/components/ui/button";
import type { ProductFacets, ProductFilterSearch } from "@/lib/product-filters";
import { ProductSearch } from "./ProductSearch";
import { PriceFilter } from "./PriceFilter";
import { FlavorFilter } from "./FlavorFilter";
import { TagFilter } from "./TagFilter";

interface ProductFiltersProps {
  idPrefix?: string;
  filters: ProductFilterSearch;
  facets: ProductFacets;
  onSearchChange: (value?: string) => void;
  onMinPriceChange: (value?: number) => void;
  onMaxPriceChange: (value?: number) => void;
  onFlavorToggle: (value: string) => void;
  onTagToggle: (value: string) => void;
  onClear: () => void;
}

export function ProductFilters({
  idPrefix = "product-filters",
  filters,
  facets,
  onSearchChange,
  onMinPriceChange,
  onMaxPriceChange,
  onFlavorToggle,
  onTagToggle,
  onClear,
}: ProductFiltersProps) {
  return (
    <div className="space-y-6 rounded-3xl border border-border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-extrabold">فیلتر محصولات</h3>
        <Button type="button" variant="ghost" size="sm" onClick={onClear}>
          پاک کردن
        </Button>
      </div>
      <ProductSearch idPrefix={idPrefix} value={filters.q} onChange={onSearchChange} />
      <PriceFilter
        idPrefix={idPrefix}
        minValue={filters.minPrice}
        maxValue={filters.maxPrice}
        minAvailable={facets.minPrice}
        maxAvailable={facets.maxPrice}
        onMinChange={onMinPriceChange}
        onMaxChange={onMaxPriceChange}
      />
      <FlavorFilter
        options={facets.flavors}
        selected={filters.flavor ?? []}
        onToggle={onFlavorToggle}
      />
      <TagFilter options={facets.tags} selected={filters.tag ?? []} onToggle={onTagToggle} />
    </div>
  );
}
