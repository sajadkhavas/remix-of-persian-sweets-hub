import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ProductSearchProps {
  idPrefix?: string;
  value?: string;
  onChange: (value?: string) => void;
}

export function ProductSearch({ idPrefix = "product", value = "", onChange }: ProductSearchProps) {
  const inputId = `${idPrefix}-search`;

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="text-sm font-bold">
        جستجو در محصولات
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id={inputId}
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value.trim() ? event.target.value : undefined)}
          placeholder="نام، توضیح، طعم یا ویژگی"
          className="pe-10"
        />
      </div>
    </div>
  );
}
