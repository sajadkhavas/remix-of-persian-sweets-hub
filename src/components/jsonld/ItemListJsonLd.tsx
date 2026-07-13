import type { Product } from "@/data/types";
import { SITE } from "@/lib/site";
import { JsonLd } from "./JsonLd";

export function ItemListJsonLd({ products }: { products: Product[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: products.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: product.name,
          url: `${SITE.origin}/product/${product.slug}`,
        })),
      }}
    />
  );
}
