import { SITE } from "@/lib/site";
import { JsonLd } from "./JsonLd";
import type { Product } from "@/data/types";

function isRealImageUrl(url: string) {
  const normalizedUrl = url.trim().toLowerCase();

  return normalizedUrl.length > 0 && !normalizedUrl.includes("placeholder");
}

export function ProductJsonLd({ product }: { product: Product }) {
  const imageUrls = product.images.map((image) => image.url).filter(isRealImageUrl);
  const hasValidWeight = typeof product.weightGrams === "number" && product.weightGrams > 0;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.longDescription || product.seo.description,
    sku: product.sku,
    ...(imageUrls.length > 0 ? { image: imageUrls } : {}),
    brand: { "@type": "Brand", name: SITE.brand },
    category: product.category,
    ...(hasValidWeight
      ? { weight: { "@type": "QuantitativeValue", value: product.weightGrams, unitCode: "GRM" } }
      : {}),
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

  return <JsonLd data={data} />;
}
