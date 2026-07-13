import { SITE } from "@/lib/site";
import { JsonLd } from "./JsonLd";

export interface CollectionPageItem {
  name: string;
  path: string;
}

export function CollectionPageJsonLd({
  name,
  description,
  path,
  items,
}: {
  name: string;
  description: string;
  path: string;
  items: CollectionPageItem[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name,
        description,
        url: `${SITE.origin}${path}`,
        inLanguage: "fa-IR",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            url: `${SITE.origin}${item.path}`,
          })),
        },
      }}
    />
  );
}
