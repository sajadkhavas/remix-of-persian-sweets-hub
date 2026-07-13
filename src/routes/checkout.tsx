import { useState } from "react";
import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { z } from "zod";
import { useCartStore } from "@/lib/cart";
import { buildSeo } from "@/lib/seo";
import { formatToman } from "@/lib/format";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/checkout")({
  head: () =>
    buildSeo({
      title: "تسویه حساب",
      description: "ثبت سفارش وینیمی بیکری",
      path: "/checkout",
      noindex: true,
    }),
  component: CheckoutPage,
});

const PROVINCES = [
  "آذربایجان شرقی",
  "آذربایجان غربی",
  "اردبیل",
  "اصفهان",
  "البرز",
  "ایلام",
  "بوشهر",
  "تهران",
  "چهارمحال و بختیاری",
  "خراسان جنوبی",
  "خراسان رضوی",
  "خراسان شمالی",
  "خوزستان",
  "زنجان",
  "سمنان",
  "سیستان و بلوچستان",
  "فارس",
  "قزوین",
  "قم",
  "کردستان",
  "کرمان",
  "کرمانشاه",
  "کهگیلویه و بویراحمد",
  "گلستان",
  "گیلان",
  "لرستان",
  "مازندران",
  "مرکزی",
  "هرمزگان",
  "همدان",
  "یزد",
];

const checkoutSchema = z.object({
  fullName: z.string().min(3, "نام باید حداقل ۳ کاراکتر باشد"),
  mobile: z.string().regex(/^09[0-9]{9}$/, "شماره موبایل معتبر نیست"),
  province: z.string().min(1, "استان را انتخاب کنید"),
  city: z.string().min(2, "شهر را وارد کنید"),
  address: z.string().min(10, "آدرس باید حداقل ۱۰ کاراکتر باشد"),
  postalCode: z.string().regex(/^[0-9]{10}$/, "کد پستی باید ۱۰ رقم باشد"),
  notes: z.string().optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;
type FormErrors = Partial<Record<keyof CheckoutForm, string>>;

const EMPTY: CheckoutForm = {
  fullName: "",
  mobile: "",
  province: "",
  city: "",
  address: "",
  postalCode: "",
  notes: "",
};

const INPUT_CLS =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-colors";

function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const clearCart = useCartStore((s) => s.clearCart);

  const [form, setForm] = useState<CheckoutForm>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  if (items.length === 0 && !isSuccess) return <Navigate to="/cart" />;

  const setField = (field: keyof CheckoutForm, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = checkoutSchema.safeParse(form);
    if (!result.success) {
      const fe: FormErrors = {};
      for (const issue of result.error.issues) {
        const k = issue.path[0] as keyof CheckoutForm;
        if (!fe[k]) fe[k] = issue.message;
      }
      setErrors(fe);
      return;
    }
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      clearCart();
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "خانه", path: "/" },
          { name: "سبد خرید", path: "/cart" },
          { name: "تسویه حساب", path: "/checkout" },
        ]}
      />

      <h1 className="mb-6 text-2xl font-bold" style={{ color: "var(--accent-brown)" }}>
        تسویه حساب
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Field label="نام و نام خانوادگی" error={errors.fullName}>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => setField("fullName", e.target.value)}
              className={INPUT_CLS}
            />
          </Field>

          <Field label="شماره موبایل" error={errors.mobile}>
            <input
              type="tel"
              dir="ltr"
              value={form.mobile}
              onChange={(e) => setField("mobile", e.target.value)}
              placeholder="09xxxxxxxxx"
              className={INPUT_CLS}
            />
          </Field>

          <Field label="استان" error={errors.province}>
            <select
              value={form.province}
              onChange={(e) => setField("province", e.target.value)}
              className={INPUT_CLS}
            >
              <option value="">انتخاب کنید</option>
              {PROVINCES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </Field>

          <Field label="شهر" error={errors.city}>
            <input
              type="text"
              value={form.city}
              onChange={(e) => setField("city", e.target.value)}
              className={INPUT_CLS}
            />
          </Field>

          <Field label="آدرس کامل" error={errors.address}>
            <textarea
              rows={3}
              value={form.address}
              onChange={(e) => setField("address", e.target.value)}
              className={INPUT_CLS}
            />
          </Field>

          <Field label="کد پستی (۱۰ رقم)" error={errors.postalCode}>
            <input
              type="text"
              dir="ltr"
              maxLength={10}
              value={form.postalCode}
              onChange={(e) => setField("postalCode", e.target.value.replace(/\D/g, ""))}
              className={INPUT_CLS}
            />
          </Field>

          <Field label="توضیحات سفارش (اختیاری)">
            <textarea
              rows={2}
              value={form.notes ?? ""}
              onChange={(e) => setField("notes", e.target.value)}
              className={INPUT_CLS}
            />
          </Field>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className="w-full rounded-full py-4 text-lg font-bold disabled:opacity-50"
            style={{ background: "var(--primary)", color: "var(--primary-dark)" }}
          >
            {isSubmitting ? "در حال ثبت..." : "ثبت سفارش و پرداخت"}
          </motion.button>
        </form>

        <aside className="h-fit rounded-2xl border border-border bg-white p-6 lg:sticky lg:top-24">
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
        </aside>
      </div>

      <AnimatePresence>
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: "rgba(0,0,0,0.4)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-full max-w-md rounded-3xl bg-white p-8 text-center"
            >
              <motion.span
                className="mb-4 block text-6xl"
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >
                ✅
              </motion.span>
              <h2 className="mb-3 text-xl font-bold" style={{ color: "var(--accent-brown)" }}>
                سفارش شما با موفقیت ثبت شد!
              </h2>
              <p className="mb-8 text-muted-foreground">
                کارشناس ما در اسرع وقت با شما تماس می‌گیرد و لینک پرداخت ارسال می‌کند.
              </p>
              <a
                href={`${SITE.whatsapp}?text=${encodeURIComponent("سلام، سفارش ثبت کردم")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-3 block w-full rounded-full py-3 font-bold text-white"
                style={{ background: "#25D366" }}
              >
                پیام در واتساپ
              </a>
              <Link
                to="/"
                className="block w-full rounded-full py-3 font-bold"
                style={{ background: "#F3F4F6", color: "var(--accent-brown)" }}
              >
                بازگشت به خانه
              </Link>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold" style={{ color: "var(--accent-brown)" }}>
        {label}
      </label>
      {children}
      {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
    </div>
  );
}
