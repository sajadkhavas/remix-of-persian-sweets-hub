import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/privacy-policy")({
  head: () =>
    buildSeo({
      title: "سیاست حریم خصوصی",
      description: "سیاست حریم خصوصی وینیمی بیکری — نحوه جمع‌آوری و استفاده از اطلاعات شخصی.",
      path: "/privacy-policy",
    }),
  component: PrivacyPolicyPage,
});

const crumbs = [
  { name: "خانه", path: "/" },
  { name: "سیاست حریم خصوصی", path: "/privacy-policy" },
];

function PrivacyPolicyPage() {
  return (
    <div>
      <BreadcrumbJsonLd items={crumbs} />
      <Breadcrumbs items={crumbs} />

      <RevealOnScroll>
        <article className="mx-auto max-w-3xl rounded-3xl bg-white p-8 md:p-10 border border-border">
          <h1 className="text-3xl font-bold" style={{ color: "var(--accent-brown)" }}>
            سیاست حریم خصوصی
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">آخرین بروزرسانی: تیر ۱۴۰۴</p>

          <div className="legal-content mt-6">
            <h2>مقدمه</h2>
            <p>
              {SITE.brandFa} به حریم خصوصی کاربران احترام می‌گذارد. این سند نحوه جمع‌آوری، استفاده و
              محافظت از اطلاعات شما را توضیح می‌دهد.
            </p>

            <h2>۱. اطلاعاتی که جمع‌آوری می‌کنیم</h2>
            <ul>
              <li>
                <strong>اطلاعات شخصی:</strong> نام، شماره موبایل، آدرس و کد پستی — صرفاً برای پردازش
                سفارش.
              </li>
              <li>
                <strong>اطلاعات مرور:</strong> صفحات بازدیدشده و زمان بازدید — برای بهبود تجربه
                کاربری.
              </li>
              <li>
                <strong>اطلاعات پرداخت:</strong> مستقیماً توسط درگاه بانکی پردازش می‌شود و ما به آن
                دسترسی نداریم.
              </li>
            </ul>

            <h2>۲. نحوه استفاده از اطلاعات</h2>
            <ul>
              <li>پردازش و تحویل سفارش‌ها</li>
              <li>ارسال کد رهگیری پستی</li>
              <li>پاسخ به سوالات و پشتیبانی</li>
              <li>بهبود محصولات و خدمات</li>
              <li>اطلاع‌رسانی محصولات جدید (با رضایت شما)</li>
            </ul>

            <h2>۳. اشتراک‌گذاری اطلاعات</h2>
            <p>اطلاعات شما با اشخاص ثالث به اشتراک گذاشته نمی‌شود، به جز:</p>
            <ul>
              <li>شرکت‌های پستی (برای ارسال سفارش) — فقط آدرس و نام گیرنده</li>
              <li>الزامات قانونی در صورت درخواست مراجع قضایی</li>
            </ul>

            <h2>۴. امنیت اطلاعات</h2>
            <ul>
              <li>سایت از HTTPS استفاده می‌کند</li>
              <li>اطلاعات پرداخت روی سرورهای ما ذخیره نمی‌شود</li>
              <li>دسترسی به اطلاعات محدود به پرسنل مجاز است</li>
            </ul>

            <h2>۵. کوکی‌های مرورگر</h2>
            <p>
              سایت از کوکی‌های ضروری برای عملکرد سبد خرید استفاده می‌کند. این کوکی‌ها اطلاعات شخصی
              ذخیره نمی‌کنند.
            </p>

            <h2>۶. حقوق کاربران</h2>
            <p>شما حق دارید:</p>
            <ul>
              <li>از اطلاعات ذخیره‌شده درباره خود مطلع شوید</li>
              <li>درخواست حذف اطلاعات خود را بدهید</li>
              <li>از دریافت پیام‌های بازاریابی انصراف دهید</li>
            </ul>

            <h2>۷. تماس</h2>
            <p>برای هر سوالی درباره حریم خصوصی:</p>
            <ul>
              <li>📞 {SITE.phone}</li>
              <li>📩 {SITE.email}</li>
            </ul>
          </div>
        </article>
      </RevealOnScroll>
    </div>
  );
}
