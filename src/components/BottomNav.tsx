import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Home, Grid2x2, ShoppingCart, Package, Phone } from "lucide-react";
import { useCartStore } from "@/lib/cart";

const TABS = [
  { icon: Home, label: "خانه", to: "/" },
  { icon: Grid2x2, label: "محصولات", to: "/products" },
  { icon: ShoppingCart, label: "سبد", to: "/cart" },
  { icon: Package, label: "ارسال", to: "/packaging-and-shipping" },
  { icon: Phone, label: "تماس", to: "/contact" },
] as const;

export function BottomNav() {
  const totalItems = useCartStore((s) => s.totalItems());
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="ناوبری موبایل"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-border"
      style={{ background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)" }}
    >
      <ul className="mx-auto flex max-w-[600px] items-stretch justify-between px-2">
        {TABS.map(({ icon: Icon, label, to }) => {
          const isActive = to === "/" ? pathname === "/" : pathname.startsWith(to);
          const isCart = to === "/cart";
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className="relative flex flex-col items-center justify-center gap-1 py-2.5"
                style={{
                  color: isActive ? "var(--primary-dark)" : "var(--muted-foreground)",
                }}
              >
                <span className="relative">
                  <Icon className="h-5 w-5" />
                  {isCart && totalItems > 0 ? (
                    <span
                      className="absolute -end-2 -top-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white"
                      style={{ background: "var(--primary-dark)" }}
                    >
                      {totalItems > 9 ? "9+" : totalItems}
                    </span>
                  ) : null}
                </span>
                <span className="text-[11px] font-medium">{label}</span>
                {isActive ? (
                  <motion.span
                    layoutId="bottomnav-active"
                    className="absolute top-0 h-0.5 w-8 rounded-full"
                    style={{ background: "var(--primary)" }}
                  />
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default BottomNav;
