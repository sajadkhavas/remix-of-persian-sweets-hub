import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/data/types";

export function BlogRelatedProducts({
  products,
  heading = "محصولات مرتبط",
}: {
  products: Product[];
  heading?: string;
}) {
  if (products.length === 0) return null;

  return (
    <section
      aria-labelledby="blog-related-products-heading"
      className="rounded-3xl border border-border bg-white p-5 shadow-sm"
    >
      <div className="mb-5">
        <p className="text-sm font-bold text-muted-foreground">پیشنهاد وینیمی برای مطالعه شما</p>
        <h2
          id="blog-related-products-heading"
          className="mt-1 text-2xl font-extrabold text-accent-foreground"
        >
          {heading}
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
