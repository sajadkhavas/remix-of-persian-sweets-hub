import { SITE } from "./site";
import ogDefault from "../assets/og-default.jpg";

export interface SeoInput {
  title: string; // page-specific portion; brand suffix appended
  description: string; // Persian, <= 155 chars
  path: string; // "/", "/about", "/product/foo" — leading slash
  image?: string; // absolute or root-relative; default og image otherwise
  type?: "website" | "article" | "product";
  noindex?: boolean;
  robots?: "noindex,nofollow" | "noindex,follow";
}

export interface HeadEntry {
  meta: Array<Record<string, string>>;
  links: Array<Record<string, string>>;
}

export function buildSeo(input: SeoInput): HeadEntry {
  const fullTitle = `${input.title} | ${SITE.brand}`.slice(0, 70);
  const url = input.path === "/" ? "/" : input.path.replace(/\/$/, "");
  const image = input.image ?? ogDefault;
  const meta: Array<Record<string, string>> = [
    { title: fullTitle },
    { name: "description", content: input.description },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: input.description },
    { property: "og:type", content: input.type ?? "website" },
    { property: "og:locale", content: SITE.locale },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: input.description },
    { name: "twitter:image", content: image },
  ];
  if (input.noindex) meta.push({ name: "robots", content: input.robots ?? "noindex,nofollow" });
  return {
    meta,
    links: [{ rel: "canonical", href: url }],
  };
}
