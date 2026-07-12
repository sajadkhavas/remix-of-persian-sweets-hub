import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ShoppingCart, X, Instagram, Phone } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import { SITE } from "@/lib/site";

const NAV_LINKS = [
  { label: "خانه", to: "/" },
  { label: "محصولات", to: "/products" },
  { label: "ارسال", to: "/packaging-and-shipping" },
  { label: "درباره ما", to: "/about" },
  { label: "تماس", to: "/contact" },
] as const;

const MENU_LINKS = [
  { label: "خانه", to: "/" },
  { label: "محصولات", to: "/products" },
  { label: "درباره ما", to: "/about" },
  { label: "ارسال و بسته‌بندی", to: "/packaging-and-shipping" },
  { label: "بلاگ", to: "/blog" },
  { label: "تماس", to: "/contact" },
] as const;

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 shrink-0" aria-label={SITE.brandFa}>
      <span
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-lg"
        style={{ background: "var(--primary)", color: "var(--primary-dark)" }}
        aria-hidden="true"
      >
        🧁
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-display text-base" style={{ color: "var(--accent-brown)" }}>
          winimi <span className="italic">Bakery</span>
        </span>
        <span className="text-xs text-muted-foreground">{SITE.brandFa}</span>
      </span>
    </Link>
  );
}

function CartButton({ className = "" }: { className?: string }) {
  const totalItems = useCartStore((s) => s.totalItems());
  return (
    <Link
      to="/cart"
      aria-label="سبد خرید"
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-[var(--primary-light)] transition-colors ${className}`}
    >
      <ShoppingCart className="h-5 w-5" style={{ color: "var(--accent-brown)" }} />
      {totalItems > 0 ? (
        <span
          className="absolute -end-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white"
          style={{ background: "var(--primary-dark)" }}
        >
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      ) : null}
    </Link>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [menuOpen]);

  return (
    <>
      <header
        className="sticky top-0 z-40 border-b border-border"
        style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)" }}
      >
        <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between gap-4 px-4">
          <Logo />

          <nav aria-label="ناوبری اصلی" className="hidden md:flex items-center gap-6 text-sm">
            {NAV_LINKS.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-muted-foreground hover:text-foreground transition-colors"
                activeProps={{ className: "text-foreground font-semibold" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <CartButton />
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-105"
              style={{ background: "var(--primary)", color: "var(--primary-dark)" }}
            >
              ثبت سفارش
            </a>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <CartButton />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="باز کردن منو"
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border"
            >
              <span className="flex flex-col gap-1" aria-hidden="true">
                <span className="block h-0.5 w-5 rounded-full" style={{ background: "var(--accent-brown)" }} />
                <span className="block h-0.5 w-5 rounded-full" style={{ background: "var(--accent-brown)" }} />
                <span className="block h-0.5 w-5 rounded-full" style={{ background: "var(--accent-brown)" }} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col"
            style={{ background: "var(--accent-cream)" }}
          >
            <div className="flex items-center justify-between border-b border-border px-4 h-[72px]">
              <Logo />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="بستن منو"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border"
              >
                <X className="h-5 w-5" style={{ color: "var(--accent-brown)" }} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8">
              <ul className="space-y-1">
                {MENU_LINKS.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setMenuOpen(false)}
                      className="block py-4 text-2xl font-bold border-b border-border"
                      style={{ color: "var(--accent-brown)" }}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border p-6 space-y-4">
              <div className="flex gap-3">
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener"
                  className="flex-1 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold"
                  style={{ background: "var(--primary)", color: "var(--primary-dark)" }}
                >
                  سفارش واتساپ
                </a>
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener"
                  aria-label="اینستاگرام"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-white"
                >
                  <Instagram className="h-5 w-5" style={{ color: "var(--accent-brown)" }} />
                </a>
              </div>
              <a
                href={`tel:${SITE.phoneIntl}`}
                className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
              >
                <Phone className="h-4 w-4" />
                {SITE.phone}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Header;
