import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

const NAV = [
  { to: "/", label: "خانه" },
  { to: "/products", label: "محصولات" },
  { to: "/category/cookies", label: "کوکی" },
  { to: "/category/dry-sweets", label: "شیرینی خشک" },
  { to: "/category/gift-boxes", label: "جعبه هدیه" },
  { to: "/blog", label: "بلاگ" },
  { to: "/about", label: "درباره ما" },
  { to: "/contact", label: "تماس" },
] as const;

export function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center gap-4">
        <Link to="/" className="text-2xl font-bold text-foreground">
          {SITE.brandFa}
          <span className="ms-2 text-sm font-normal text-muted-foreground">
            {SITE.brand}
          </span>
        </Link>
        <nav aria-label="ناوبری اصلی" className="flex flex-wrap gap-4 text-sm">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-muted-foreground hover:text-foreground"
              activeProps={{ className: "text-foreground font-semibold" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
