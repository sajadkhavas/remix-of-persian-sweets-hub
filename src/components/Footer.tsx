import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { CITIES } from "@/data/cities";
import { OCCASIONS } from "@/data/occasions";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <h2 className="font-bold text-base mb-3">{SITE.brand}</h2>
          <p className="text-muted-foreground leading-7">
            کوکی و شیرینی خشک تازه، ارسال به تمام شهرهای ایران با بسته‌بندی مقاوم.
          </p>
          <a
            href={SITE.instagram}
            rel="noopener"
            className="inline-block mt-3 text-foreground"
          >
            اینستاگرام
          </a>
        </div>
        <div>
          <h2 className="font-bold text-base mb-3">راهنما</h2>
          <ul className="space-y-2">
            <li><Link to="/packaging-and-shipping">بسته‌بندی و ارسال</Link></li>
            <li><Link to="/faq">پرسش‌های پرتکرار</Link></li>
            <li><Link to="/about">درباره ما</Link></li>
            <li><Link to="/contact">تماس با ما</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-base mb-3">ارسال به شهر</h2>
          <ul className="space-y-2">
            {CITIES.slice(0, 8).map((c) => (
              <li key={c.slug}>
                <Link to="/shipping-to/$city" params={{ city: c.slug }}>
                  ارسال به {c.nameFa}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-base mb-3">مناسبت‌ها</h2>
          <ul className="space-y-2">
            {OCCASIONS.map((o) => (
              <li key={o.slug}>
                <Link to="/occasion/$slug" params={{ slug: o.slug }}>
                  {o.nameFa}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {SITE.brand}
      </div>
    </footer>
  );
}
