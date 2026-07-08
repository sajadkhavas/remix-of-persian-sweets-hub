import { SITE } from "@/lib/site";
import { JsonLd } from "./JsonLd";

export function WebsiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE.brand,
        url: SITE.origin,
        inLanguage: "fa-IR",
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE.origin}/products?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}
