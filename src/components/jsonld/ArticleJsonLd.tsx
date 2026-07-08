import { SITE } from "@/lib/site";
import { JsonLd } from "./JsonLd";

export function ArticleJsonLd({
  headline,
  datePublished,
  dateModified,
  author,
  image,
  path,
}: {
  headline: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
  path: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline,
        datePublished,
        dateModified: dateModified ?? datePublished,
        author: { "@type": "Person", name: author },
        publisher: {
          "@type": "Organization",
          name: SITE.brand,
          logo: { "@type": "ImageObject", url: `${SITE.origin}/favicon.ico` },
        },
        mainEntityOfPage: `${SITE.origin}${path}`,
        ...(image ? { image: [image] } : {}),
      }}
    />
  );
}
