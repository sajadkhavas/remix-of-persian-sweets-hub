import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS } from "@/data/products";
import { getPublicProductCategories } from "@/data/categories";
import { CITIES } from "@/data/cities";
import { OCCASIONS } from "@/data/occasions";
import { POSTS } from "@/data/blog";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const now = new Date().toISOString().split("T")[0];
        const url = (loc: string, priority: string, changefreq: string) =>
          `  <url>\n    <loc>${SITE.origin}${loc}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
        const urls = [
          url("/", "1.0", "weekly"),
          url("/products", "0.9", "daily"),
          url("/about", "0.7", "monthly"),
          url("/contact", "0.6", "monthly"),
          url("/faq", "0.7", "monthly"),
          url("/blog", "0.8", "weekly"),
          url("/packaging-and-shipping", "0.8", "monthly"),
          url("/terms", "0.3", "yearly"),
          url("/privacy-policy", "0.3", "yearly"),
          url("/returns", "0.4", "yearly"),
          ...getPublicProductCategories().map((category) =>
            url(
              `/products/${category.slug}`,
              category.slug === "gift-boxes" ? "0.6" : "0.8",
              "weekly",
            ),
          ),
          ...PRODUCTS.map((p) => url(`/product/${p.slug}`, "0.9", "weekly")),
          ...CITIES.map((c) => url(`/shipping-to/${c.slug}`, "0.7", "monthly")),
          ...OCCASIONS.map((o) => url(`/occasion/${o.slug}`, "0.8", "monthly")),
          ...POSTS.map((p) => url(`/blog/${p.slug}`, "0.7", "weekly")),
        ];
        return new Response(
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`,
          {
            headers: {
              "Content-Type": "application/xml; charset=utf-8",
              "Cache-Control": "public, max-age=3600",
            },
          },
        );
      },
    },
  },
});
