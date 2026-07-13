import { SITE } from "@/lib/site";
import { JsonLd } from "./JsonLd";

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Bakery",
        name: SITE.brandFa,
        alternateName: SITE.brand,
        url: SITE.origin,
        logo: `${SITE.origin}/favicon.ico`,
        image: `${SITE.origin}/og-home.jpg`,
        description: "کوکی و کیک خانگی با مواد اولیه تازه، ارسال سراسری از اندیشه تهران",
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE.city,
          addressRegion: SITE.region,
          addressCountry: "IR",
        },
        telephone: SITE.phoneIntl,
        servesCuisine: "Bakery",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "منوی وینیمی بیکری",
        },
        sameAs: [SITE.instagram],
      }}
    />
  );
}
