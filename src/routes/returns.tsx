import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { FAQSection } from "@/components/aeo/FAQSection";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { SITE } from "@/lib/site";
import type { FaqItem } from "@/components/jsonld/FAQJsonLd";

export const Route = createFileRoute("/returns")({
  head: () =>
    buildSeo({
      title: "شرایط بازگشت کالا",
      description:
        "شرایط بازگشت و مبادله محصولات وینیمی بیکری — ضمانت سالم رسیدن.",
      path: "/returns",
    }),
  component: ReturnsPage,
});

const FAQS: FaqItem[] = [
  {
    question: "آیا می‌توانم سفارشم را پس از ثبت لغو کنم؟",
    answer:
      "در صورتی که سفارش هنوز آماده نشده باشد، با تماس فوری امکان لغو وجود دارد. پس از آماده‌سازی، امکان لغو وجود ندارد.",
  },
  {
    question: "اگه محصول آسیب‌دیده برسد چه کار کنم؟",
    answer:
      "بلافاصله تصویر را به واتساپ ما ارسال کنید. ظرف ۲۴ ساعت محصول جایگزین یا هزینه بازپرداخت می‌شود.",
  },
  {
    question: "بازپرداخت وجه چقدر طول می‌کشد؟",
    answer: "بازپرداخت وجه ظرف ۳ تا ۵ روز کاری انجام می‌شود.",
  },
  {
    question: "آیا محصولات باز شده قابل بازگشت هستند؟",
    answer:
      "خیر. محصولات مواد غذایی پس از باز شدن، به دلایل بهداشتی قابل بازگشت نیستند.",
  },
];

const crumbs = [
  { name: "خانه", path: "/" },
  { name: "شرایط بازگشت کالا", path: "/returns" },
];

function ReturnsPage() {
  const whatsappUrl = `${SITE.whatsapp}?text=${encodeURIComponent("درخواست بازگشت کالا")}`;

  return (
    <div>
      <BreadcrumbJsonLd items={crumbs} />
      <Breadcrumbs items={crumbs} />

      <RevealOnScroll>
        <article className="mx-auto max-w-3xl rounded-3xl bg-white p-8 md:p-10 border border-border">
          <h1 className="text-3xl font-bold" style={{ color: "var(--accent-brown)" }}>
            شرایط بازگشت کالا
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">آخرین بروزرسانی: تیر ۱۴۰۴</p>

          <div className="legal-content mt-6">
            <h2>ضمانت {SITE.brandFa}</h2>
            <p>
              {SITE.brandFa} ضمانت می‌دهد که تمام محصولات سالم، تازه و طبق توضیحات سایت به
              دستتان برسند.
            </p>

            <h2>شرایطی که بازگشت امکان‌پذیر است</h2>
            <ul>
              <li>✅ محصول در حین ارسال آسیب دیده باشد</li>
              <li>✅ محصول اشتباه ارسال شده باشد</li>
              <li>✅ کیفیت محصول با توضیحات سایت مغایرت داشته باشد</li>
            </ul>

            <h2>شرایطی که بازگشت امکان‌پذیر نیست</h2>
            <ul>
              <li>❌ محصول باز یا مصرف شده باشد</li>
              <li>❌ تغییر ذائقه یا سلیقه خریدار</li>
              <li>❌ آسیب ناشی از عدم رعایت شرایط نگهداری</li>
              <li>❌ درخواست پس از ۴۸ ساعت از دریافت</li>
            </ul>

            <h2>فرآیند بازگشت</h2>
            <ul>
              <li><strong>مرحله ۱:</strong> تصویر محصول معیوب را به واتساپ ما ارسال کنید</li>
              <li><strong>مرحله ۲:</strong> کارشناس ما ظرف ۲۴ ساعت بررسی و تأیید می‌کند</li>
              <li><strong>مرحله ۳:</strong> محصول جایگزین ارسال یا هزینه بازپرداخت می‌شود</li>
            </ul>

            <h2>زمان بازپرداخت</h2>
            <p>بازپرداخت وجه ظرف ۳ تا ۵ روز کاری انجام می‌شود.</p>

            <h2>تماس پشتیبانی</h2>
            <p>
              📞 واتساپ: {SITE.phone}
              <br />
              (همه روزه ۹ صبح تا ۹ شب)
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold text-white"
            style={{ background: "#25D366" }}
          >
            💬 درخواست بازگشت کالا از طریق واتساپ
          </a>
        </article>
      </RevealOnScroll>

      <div className="mx-auto max-w-3xl">
        <FAQSection items={FAQS} heading="سوالات متداول بازگشت" />
      </div>
    </div>
  );
}
