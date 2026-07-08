import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/types";
import { formatToman } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="border border-border rounded-lg p-4 bg-card">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block"
      >
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <p className="mt-3 font-bold text-foreground">
          {formatToman(product.priceToman)}
        </p>
      </Link>
    </article>
  );
}
