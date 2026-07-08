import { SITE } from "@/lib/site";
import { JsonLd } from "./JsonLd";

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "OnlineStore",
        name: SITE.brand,
        alternateName: SITE.brandFa,
        url: SITE.origin,
        logo: `${SITE.origin}/favicon.ico`,
        sameAs: [SITE.instagram],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: SITE.email,
            areaServed: "IR",
            availableLanguage: ["fa", "Persian"],
          },
        ],
      }}
    />
  );
}
