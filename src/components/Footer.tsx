import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer style={{ background: "var(--accent-brown)", color: "white" }}>
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span
              className="inline-flex h-9 w-9 items-center justify-center rounded-full"
              style={{ background: "var(--primary)", color: "var(--primary-dark)" }}
            >
              🧁
            </span>
            <span className="font-display text-lg">winimi Bakery</span>
          </div>
          <p className="text-sm opacity-80 leading-7">{SITE.tagline}</p>
          <p className="text-sm opacity-70 mt-2">
            {SITE.city}، {SITE.region}
          </p>
        </div>
        <div>
          <h2 className="font-bold text-base mb-3">دسترسی سریع</h2>
          <ul className="space-y-2 text-sm opacity-80">
            <li>
              <Link to="/products">محصولات</Link>
            </li>
            <li>
              <Link to="/about">درباره ما</Link>
            </li>
            <li>
              <Link to="/packaging-and-shipping">ارسال و بسته‌بندی</Link>
            </li>
            <li>
              <Link to="/faq">سوالات متداول</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-base mb-3">محصولات</h2>
          <ul className="space-y-2 text-sm opacity-80">
            <li>
              <Link to="/products/$categorySlug" params={{ categorySlug: "cookies" }}>
                کوکی‌ها
              </Link>
            </li>
            <li>
              <Link to="/products/$categorySlug" params={{ categorySlug: "cakes" }}>
                کیک و دسر
              </Link>
            </li>
            <li>
              <Link to="/products/$categorySlug" params={{ categorySlug: "diet" }}>
                رژیمی و دیابتی
              </Link>
            </li>
            <li>
              <Link to="/contact">سفارش ویژه</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-base mb-3">تماس با ما</h2>
          <ul className="space-y-2 text-sm opacity-80">
            <li>
              📞 <span dir="ltr">{SITE.phone}</span>
            </li>
            <li>
              <a href={SITE.instagram} rel="noopener" target="_blank">
                📩 دایرکت اینستاگرام
              </a>
            </li>
          </ul>
          <div className="mt-3 flex gap-3">
            <a
              href={SITE.instagram}
              rel="noopener"
              target="_blank"
              aria-label="اینستاگرام"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              📷
            </a>
            <a
              href={SITE.whatsapp}
              rel="noopener"
              target="_blank"
              aria-label="واتساپ"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              💬
            </a>
          </div>
        </div>
      </div>
      <div
        className="border-t py-4 text-center text-xs"
        style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
      >
        © ۱۴۰۴ {SITE.brandFa} — تمام حقوق محفوظ است
      </div>
    </footer>
  );
}
