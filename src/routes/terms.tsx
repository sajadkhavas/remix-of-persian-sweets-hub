import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { FAQSection } from "@/components/aeo/FAQSection";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { SITE } from "@/lib/site";
import type { FaqItem } from "@/components/jsonld/FAQJsonLd";

export const Route = createFileRoute("/terms")({
  head: () =>
    buildSeo({
      title: "قوانین و مقررات",
      description: "قوانین و شرایط استفاده از خدمات وینیمی بیکری — خرید، ارسال، بازگشت کالا.",
      path: "/terms",
    }),
  component: TermsPage,
});

const FAQS: FaqItem[] = [
  {
    question: "آیا می‌توانم سفارشم را پس از ثبت لغو کنم؟",
    answer:
      "در صورتی که سفارش هنوز آماده نشده باشد، با تماس فوری امکان لغو وجود دارد. پس از آماده‌سازی، امکان لغو وجود ندارد.",
  },
  {
    question: "آیا برای شرکت‌ها و سازمان‌ها فاکتور صادر می‌کنید؟",
    answer:
      "بله، برای سفارش‌های سازمانی فاکتور رسمی صادر می‌شود. لطفاً هنگام ثبت سفارش اطلاع دهید.",
  },
  {
    question: "اگه محصول آسیب‌دیده برسد چه کار کنم؟",
    answer:
      "بلافاصله تصویر را به واتساپ ما ارسال کنید. ظرف ۲۴ ساعت محصول جایگزین یا هزینه بازپرداخت می‌شود.",
  },
  {
    question: "آیا قیمت‌ها شامل هزینه ارسال می‌شود؟",
    answer:
      "خیر. قیمت‌ها مربوط به محصول است. هزینه ارسال بر اساس شهر مقصد محاسبه و به سفارش اضافه می‌شود.",
  },
];

const crumbs = [
  { name: "خانه", path: "/" },
  { name: "قوانین و مقررات", path: "/terms" },
];

function TermsPage() {
  return (
    <div>
      <BreadcrumbJsonLd items={crumbs} />
      <Breadcrumbs items={crumbs} />

      <RevealOnScroll>
        <article className="mx-auto max-w-3xl rounded-3xl bg-white p-8 md:p-10 border border-border">
          <h1 className="text-3xl font-bold" style={{ color: "var(--accent-brown)" }}>
            قوانین و مقررات {SITE.brandFa}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">آخرین بروزرسانی: تیر ۱۴۰۴</p>

          <div className="legal-content mt-6">
            <h2>۱. شرایط کلی استفاده</h2>
            <p>
              با ثبت سفارش در وبسایت {SITE.brandFa} ({SITE.domain})، کاربر موافقت خود را با تمامی
              شرایط و مقررات این صفحه اعلام می‌کند. {SITE.brandFa} حق دارد در هر زمان این شرایط را
              بدون اطلاع قبلی تغییر دهد.
            </p>

            <h2>۲. ثبت سفارش و خرید</h2>
            <ul>
              <li>ثبت سفارش از طریق سایت، واتساپ یا دایرکت اینستاگرام انجام می‌شود.</li>
              <li>سفارش‌ها پس از تأیید نهایی از سوی کارشناس {SITE.brandFa} پردازش می‌شوند.</li>
              <li>اطلاعات سفارش (نام، آدرس، شماره تماس) باید صحیح و کامل وارد شود.</li>
              <li>{SITE.brandFa} حق رد یا لغو هر سفارشی را به دلایل موجه دارد.</li>
              <li>
                موجودی محصولات محدود و روزانه پخته می‌شود. در صورت ناموجودی، با خریدار تماس گرفته
                می‌شود.
              </li>
            </ul>

            <h2>۳. قیمت‌ها و پرداخت</h2>
            <ul>
              <li>قیمت‌های نمایش داده‌شده به تومان و شامل مالیات هستند.</li>
              <li>هزینه ارسال به آدرس و وزن سفارش بستگی دارد و در مرحله تأیید اعلام می‌شود.</li>
              <li>پرداخت از طریق درگاه اینترنتی معتبر یا کارت به کارت انجام می‌شود.</li>
              <li>قیمت سفارش‌های ثبت‌شده تغییر نمی‌کند حتی اگر قیمت‌ها به‌روز شوند.</li>
              <li>در صورت عدم پرداخت در مهلت مقرر، سفارش به‌طور خودکار لغو می‌شود.</li>
            </ul>

            <h2>۴. ارسال و تحویل</h2>
            <ul>
              <li>محصولات از طریق پست پیشتاز یا تیپاکس ارسال می‌شوند.</li>
              <li>زمان تحویل بسته به شهر مقصد ۱ تا ۵ روز کاری است.</li>
              <li>همه محصولات با بسته‌بندی چندلایه محافظ ارسال می‌شوند تا سالم برسند.</li>
              <li>پس از ارسال، کد رهگیری از طریق پیامک یا واتساپ ارسال می‌شود.</li>
              <li>تأخیر ناشی از اختلالات پستی خارج از کنترل {SITE.brandFa} است.</li>
              <li>{SITE.brandFa} به تمام شهرهای ایران ارسال می‌کند.</li>
            </ul>

            <h2>۵. شرایط بازگشت کالا</h2>
            <ul>
              <li>در صورت آسیب‌دیدگی محصول در حین ارسال، جایگزین یا بازپرداخت صورت می‌گیرد.</li>
              <li>محصولات مواد غذایی پس از باز شدن قابل بازگشت نیستند.</li>
              <li>در صورت ارسال محصول اشتباه، هزینه ارسال مجدد بر عهده {SITE.brandFa} است.</li>
              <li>درخواست بازگشت باید ظرف ۴۸ ساعت از دریافت کالا اعلام شود.</li>
              <li>تغییر ذائقه دلیل موجه برای بازگشت کالای غذایی نیست.</li>
            </ul>

            <h2>۶. مسئولیت‌ها</h2>
            <ul>
              <li>
                {SITE.brandFa} مسئولیت صحت اطلاعات محصولات (مواد اولیه، ماندگاری) را می‌پذیرد.
              </li>
              <li>استفاده از محصولات در افراد دارای آلرژی خاص بر عهده خریدار است.</li>
              <li>آسیب ناشی از عدم رعایت شرایط نگهداری توسط خریدار در مسئولیت ما نیست.</li>
            </ul>

            <h2>۷. حریم خصوصی</h2>
            <p>
              اطلاعات شخصی کاربران صرفاً برای پردازش سفارش استفاده می‌شود.{" "}
              <a href="/privacy-policy">سیاست حریم خصوصی</a> را مطالعه کنید.
            </p>

            <h2>۸. حل اختلاف</h2>
            <p>
              در صورت بروز اختلاف، ابتدا از طریق پشتیبانی (واتساپ: {SITE.phone}) پیگیری شود.
              {SITE.brandFa} متعهد است ظرف ۷۲ ساعت پاسخگو باشد.
            </p>

            <h2>۹. تماس با ما</h2>
            <ul>
              <li>📞 {SITE.phone}</li>
              <li>📩 {SITE.email}</li>
              <li>
                📍 {SITE.city}، {SITE.region}
              </li>
            </ul>
          </div>
        </article>
      </RevealOnScroll>

      <div className="mx-auto max-w-3xl">
        <FAQSection items={FAQS} heading="سوالات متداول قوانین" />
      </div>
    </div>
  );
}
