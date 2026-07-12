import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, X } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import { buildSeo } from "@/lib/seo";
import { formatToman } from "@/lib/format";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";

export const Route = createFileRoute("/cart")({
  head: () =>
    buildSeo({
      title: "سبد خرید",
      description: "سبد خرید وینیمی بیکری — کوکی و کیک دست‌پخت",
      path: "/cart",
      noindex: true,
    }),
  component: CartPage,
});

function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const totalPrice = useCartStore((s) => s.totalPrice);

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "خانه", path: "/" },
          { name: "سبد خرید", path: "/cart" },
        ]}
      />

      {items.length === 0 ? (
        <div className="py-16 text-center">
          <div className="text-7xl">🛒</div>
          <h1 className="mt-6 text-2xl font-bold" style={{ color: "var(--accent-brown)" }}>
            سبد خرید شما خالی است
          </h1>
          <p className="mt-2 text-muted-foreground">محصولات خوشمزه وینیمی را کشف کنید</p>
          <Link
            to="/products"
            className="mt-8 inline-flex items-center rounded-full px-7 py-3 text-sm font-bold"
            style={{ background: "var(--primary)", color: "var(--primary-dark)" }}
          >
            مشاهده محصولات
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <section>
            <h1 className="mb-6 text-2xl font-bold" style={{ color: "var(--accent-brown)" }}>
              سبد خرید
            </h1>
            <ul className="space-y-3">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.li
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-white p-4"
                  >
                    <div
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-3xl"
                      style={{ background: "var(--primary-light)" }}
                    >
                      {item.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold truncate" style={{ color: "var(--accent-brown)" }}>
                        {item.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatToman(item.priceToman)}
                      </p>
                    </div>
                    <div
                      className="flex items-center gap-2 rounded-full border border-border px-2 py-1"
                      style={{ background: "var(--accent-cream)" }}
                    >
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        aria-label="کاهش تعداد"
                        className="p-1"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        aria-label="افزایش تعداد"
                        className="p-1"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div
                      className="hidden sm:block w-28 text-end font-bold"
                      style={{ color: "var(--primary-dark)" }}
                    >
                      {formatToman(item.priceToman * item.quantity)}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label="حذف از سبد"
                      className="text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </section>

          <aside
            className="h-fit rounded-2xl border border-border bg-white p-6 lg:sticky lg:top-24"
          >
            <h2 className="mb-4 text-xl font-bold" style={{ color: "var(--accent-brown)" }}>
              خلاصه سفارش
            </h2>
            <ul className="space-y-2 text-sm">
              {items.map((item) => (
                <li key={item.id} className="flex justify-between gap-2">
                  <span className="text-muted-foreground truncate">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium shrink-0">
                    {formatToman(item.priceToman * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="my-4 border-t border-border" />
            <div className="flex justify-between">
              <span className="text-muted-foreground">جمع محصولات</span>
              <span className="font-bold" style={{ color: "var(--primary-dark)" }}>
                {formatToman(totalPrice())}
              </span>
            </div>
            <p className="mt-3 rounded-lg bg-[var(--accent-cream)] p-3 text-xs text-muted-foreground">
              🚚 هزینه ارسال در مرحله بعد محاسبه می‌شود
            </p>
            <Link
              to="/checkout"
              className="mt-4 block w-full rounded-full py-3 text-center text-sm font-bold"
              style={{ background: "var(--primary)", color: "var(--primary-dark)" }}
            >
              ثبت سفارش
            </Link>
            <Link
              to="/products"
              className="mt-2 block w-full rounded-full py-3 text-center text-sm font-semibold border border-border"
            >
              ادامه خرید
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
