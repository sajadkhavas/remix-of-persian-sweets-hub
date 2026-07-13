import { Input } from "@/components/ui/input";
import { formatToman } from "@/lib/format";

interface PriceFilterProps {
  idPrefix?: string;
  minValue?: number;
  maxValue?: number;
  minAvailable: number;
  maxAvailable: number;
  onMinChange: (value?: number) => void;
  onMaxChange: (value?: number) => void;
}

function parsePrice(value: string): number | undefined {
  if (!value.trim()) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : undefined;
}

export function PriceFilter({
  idPrefix = "product",
  minValue,
  maxValue,
  minAvailable,
  maxAvailable,
  onMinChange,
  onMaxChange,
}: PriceFilterProps) {
  const minPriceId = `${idPrefix}-min-price`;
  const maxPriceId = `${idPrefix}-max-price`;

  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-bold">محدوده قیمت</legend>
      <p className="text-xs text-muted-foreground">
        بازه فعلی: {formatToman(minAvailable)} تا {formatToman(maxAvailable)}
      </p>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <label htmlFor={minPriceId} className="text-xs font-medium text-muted-foreground">
            حداقل
          </label>
          <Input
            id={minPriceId}
            inputMode="numeric"
            type="number"
            min={0}
            value={minValue ?? ""}
            onChange={(event) => onMinChange(parsePrice(event.target.value))}
            placeholder={String(minAvailable)}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor={maxPriceId} className="text-xs font-medium text-muted-foreground">
            حداکثر
          </label>
          <Input
            id={maxPriceId}
            inputMode="numeric"
            type="number"
            min={0}
            value={maxValue ?? ""}
            onChange={(event) => onMaxChange(parsePrice(event.target.value))}
            placeholder={String(maxAvailable)}
          />
        </div>
      </div>
    </fieldset>
  );
}
