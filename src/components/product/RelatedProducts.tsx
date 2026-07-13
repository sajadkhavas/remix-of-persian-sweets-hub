import { Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/data/types";

type RelatedProductsProps = {
  product: Product;
  products: Product[];
};

function countSharedItems(currentItems: string[], candidateItems: string[]) {
  const candidateSet = new Set(candidateItems);
  return currentItems.filter((item) => candidateSet.has(item)).length;
}

function uniqueById(products: Product[]) {
  const seen = new Set<string>();
  return products.filter((product) => {
    if (seen.has(product.id)) return false;
    seen.add(product.id);
    return true;
  });
}

function getRelatedProducts(product: Product, products: Product[], limit = 4) {
  const candidates = uniqueById(products).filter((candidate) => candidate.id !== product.id);

  const scoredProducts = candidates
    .map((candidate, index) => {
      const sameCategoryScore = candidate.category === product.category ? 100 : 0;
      const sharedTagsScore = countSharedItems(product.tags, candidate.tags) * 10;
      const sharedFlavorsScore = countSharedItems(product.flavors, candidate.flavors) * 15;
      const featuredScore = candidate.featured ? 3 : 0;

      return {
        product: candidate,
        score: sameCategoryScore + sharedTagsScore + sharedFlavorsScore + featuredScore,
        index,
      };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ product }) => product);

  const featuredFallback = candidates.filter((candidate) => candidate.featured);
  const fallbackProducts = [...scoredProducts, ...featuredFallback, ...candidates];

  return uniqueById(fallbackProducts).slice(0, limit);
}

export function RelatedProducts({ product, products }: RelatedProductsProps) {
  const relatedProducts = getRelatedProducts(product, products);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="rounded-3xl border border-border bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-muted-foreground">پیشنهاد وینیمی برای شما</p>
          <h2 className="mt-1 text-2xl font-extrabold" style={{ color: "var(--accent-brown)" }}>
            محصولات مرتبط
          </h2>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-bold transition-colors hover:bg-accent"
        >
          بازگشت به همه محصولات
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {relatedProducts.map((relatedProduct) => (
          <ProductCard key={relatedProduct.id} product={relatedProduct} />
        ))}
      </div>
    </section>
  );
}
