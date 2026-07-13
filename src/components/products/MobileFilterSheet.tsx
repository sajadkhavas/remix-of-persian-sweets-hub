import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import type { ProductFacets, ProductFilterSearch } from "@/lib/product-filters";
import { ProductFilters } from "./ProductFilters";

interface MobileFilterSheetProps {
  filters: ProductFilterSearch;
  facets: ProductFacets;
  activeCount: number;
  onSearchChange: (value?: string) => void;
  onMinPriceChange: (value?: number) => void;
  onMaxPriceChange: (value?: number) => void;
  onFlavorToggle: (value: string) => void;
  onTagToggle: (value: string) => void;
  onClear: () => void;
}

export function MobileFilterSheet(props: MobileFilterSheetProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button type="button" variant="outline" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          فیلترها
          {props.activeCount > 0 ? <span>({props.activeCount})</span> : null}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh] overflow-y-auto px-4 pb-6">
        <DrawerHeader>
          <DrawerTitle>فیلتر محصولات</DrawerTitle>
          <DrawerDescription>
            فیلترها با آدرس صفحه هماهنگ می‌شوند و بعد از بازخوانی صفحه باقی می‌مانند.
          </DrawerDescription>
        </DrawerHeader>
        <ProductFilters {...props} idPrefix="mobile-product-filters" />
      </DrawerContent>
    </Drawer>
  );
}
