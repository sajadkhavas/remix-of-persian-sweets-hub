import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { useState } from "react";

const NAV = [
  { to: "/", label: "خانه" },
  { to: "/products", label: "محصولات" },
  { to: "/about", label: "درباره ما" },
  { to: "/packaging-and-shipping", label: "ارسال و بسته‌بندی" },
  { to: "/contact", label: "تماس" },
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

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header
      className="sticky top-0 z-40 border-b border-border"
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between gap-4 px-4">
        <Logo />
        <nav aria-label="ناوبری اصلی" className="hidden md:flex items-center gap-6 text-sm">
          {NAV.map((n) => (
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
        <div className="flex items-center gap-2">
          <a
            href="#products"
            className="hidden md:inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-105"
            style={{ background: "var(--primary)", color: "var(--primary-dark)" }}
          >
            ثبت سفارش
          </a>
          <button
            type="button"
            aria-label="منوی موبایل"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border"
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>
      {open ? (
        <div className="md:hidden border-t border-border bg-white">
          <nav aria-label="ناوبری موبایل" className="flex flex-col p-4 gap-3 text-sm">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-foreground"
              >
                {n.label}
              </Link>
            ))}
            <a
              href="#products"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex justify-center rounded-full px-5 py-2.5 text-sm font-semibold"
              style={{ background: "var(--primary)", color: "var(--primary-dark)" }}
            >
              ثبت سفارش
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
