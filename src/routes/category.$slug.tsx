import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { getProductCategory, isProductCategorySlug } from "@/data/categories";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    if (!isProductCategorySlug(params.slug)) throw notFound();
    const category = getProductCategory(params.slug);
    if (!category.isPublicLanding) throw notFound();
    throw redirect({ to: "/products/$categorySlug", params: { categorySlug: category.slug } });
  },
  head: ({ params }) =>
    buildSeo({
      title: "انتقال دسته محصول",
      description: "آدرس دسته‌های وینیمی به ساختار جدید محصولات منتقل شده است.",
      path: `/category/${params.slug}`,
      noindex: true,
    }),
});
