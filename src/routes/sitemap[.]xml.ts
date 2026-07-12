import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { PRODUCTS } from "@/data/products";
import { CITIES } from "@/data/cities";
import { OCCASIONS } from "@/data/occasions";
import { POSTS } from "@/data/blog";

const STATIC_PATHS = [
  "/",
  "/products",
  "/blog",
  "/packaging-and-shipping",
  "/faq",
  "/about",
  "/contact",
  "/terms",
  "/privacy-policy",
  "/returns",
];
const CATEGORY_SLUGS = ["cookies", "cakes", "diet"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().slice(0, 10);
        const paths: string[] = [
          ...STATIC_PATHS,
          ...CATEGORY_SLUGS.map((s) => `/category/${s}`),
          ...PRODUCTS.map((p) => `/product/${p.slug}`),
          ...CITIES.map((c) => `/shipping-to/${c.slug}`),
          ...OCCASIONS.map((o) => `/occasion/${o.slug}`),
          ...POSTS.map((p) => `/blog/${p.slug}`),
        ];
        const urls = paths
          .map(
            (p) =>
              `  <url>\n    <loc>${SITE.origin}${p}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
