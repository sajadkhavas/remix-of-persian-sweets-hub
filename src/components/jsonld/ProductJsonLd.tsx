import { SITE } from "@/lib/site";
import { JsonLd } from "./JsonLd";
import type { Product, Review } from "@/data/types";

export function ProductJsonLd({ product, reviews = [] }: { product: Product; reviews?: Review[] }) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.seo.description,
    sku: product.sku,
    image: product.images.map((image) => image.url),
    brand: { "@type": "Brand", name: SITE.brand },
    category: product.category,
    weight: { "@type": "QuantitativeValue", value: product.weightGrams, unitCode: "GRM" },
    offers: {
      "@type": "Offer",
      priceCurrency: SITE.currency,
      // toman -> rial (Iran's schema.org currency is IRR)
      price: product.priceToman * 10,
      availability:
        product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      url: `${SITE.origin}/product/${product.slug}`,
    },
  };
  if (reviews.length > 0) {
    const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(1),
      reviewCount: reviews.length,
    };
  }
  return <JsonLd data={data} />;
}
