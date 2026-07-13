import { SlidersHorizontal } from "lucide-react";
import type { BlogFacets, BlogFilterSearch } from "@/lib/blog-filters";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { BlogFilters } from "./BlogFilters";

interface MobileBlogFilterSheetProps {
  filters: BlogFilterSearch;
  facets: BlogFacets;
  activeCount: number;
  onSearchChange: (value?: string) => void;
  onCategoryChange: (value?: BlogFilterSearch["category"]) => void;
  onTagChange: (value?: string) => void;
  onClear: () => void;
}

export function MobileBlogFilterSheet(props: MobileBlogFilterSheetProps) {
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
          <DrawerTitle>فیلتر مقالات</DrawerTitle>
          <DrawerDescription>
            فیلترها با آدرس صفحه هماهنگ می‌شوند و بعد از بازخوانی صفحه باقی می‌مانند.
          </DrawerDescription>
        </DrawerHeader>
        <BlogFilters {...props} idPrefix="mobile-blog-filters" />
      </DrawerContent>
    </Drawer>
  );
}
