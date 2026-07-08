import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { FAQSection } from "@/components/aeo/FAQSection";
import { AnswerBlock } from "@/components/aeo/AnswerBlock";
import type { FaqItem } from "@/components/jsonld/FAQJsonLd";

export const Route = createFileRoute("/packaging-and-shipping")({
  head: () =>
    buildSeo({
      title: "بسته‌بندی و ارسال کوکی و شیرینی به سراسر ایران",
      description:
        "روش بسته‌بندی چندلایه وینیمی و روش‌های ارسال با پست پیشتاز و تیپاکس؛ کوکی سالم به تمام شهرهای ایران می‌رسد.",
      path: "/packaging-and-shipping",
    }),
  component: PackagingPage,
});

function PackagingPage() {
  const crumbs = [
    { name: "خانه", path: "/" },
    { name: "بسته‌بندی و ارسال", path: "/packaging-and-shipping" },
  ];
  const faqs: FaqItem[] = [
    {
      question: "آیا کوکی توی پست سالم می‌رسه؟",
      answer:
        "بله. کوکی‌ها در جعبه سخت، با پد ضربه‌گیر و جداکننده داخلی بسته می‌شوند و در بیش از ۹۹٪ موارد بدون شکستگی می‌رسند.",
    },
    {
      question: "از چه روش‌های ارسالی استفاده می‌کنید؟",
      answer:
        "پست پیشتاز برای سراسر ایران و پیک تیپاکس برای تهران و کرج و برخی مراکز استان.",
    },
    {
      question: "زمان تحویل چقدر است؟",
      answer:
        "بین ۱ تا ۵ روز کاری بسته به شهر مقصد؛ زمان دقیق در صفحه هر شهر آمده است.",
    },
    {
      question: "اگر بسته آسیب دید چه کنم؟",
      answer:
        "با ارسال ویدیوی بازکردن بسته به پشتیبانی، محصول جایگزین یا مبلغ آن به شما برگردانده می‌شود.",
    },
  ];
  return (
    <div>
      <BreadcrumbJsonLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-3xl font-bold mb-4">بسته‌بندی و ارسال</h1>
      <AnswerBlock
        question="آیا کوکی در پست سالم به دست من می‌رسد؟"
        answer="بله. هر سفارش با جعبه سخت دولایه، پد ضربه‌گیر و جداکننده داخلی بسته‌بندی و از طریق پست پیشتاز یا تیپاکس به سراسر ایران ارسال می‌شود."
        detail={
          <p>
            هر محصول ابتدا در بسته‌بندی مخصوص خودش قرار می‌گیرد، سپس داخل جعبه
            اصلی با پد فوم و لایه حبابی محافظت می‌شود. تمام سفارش‌ها قبل از
            تحویل به پست، کنترل کیفی می‌شوند.
          </p>
        }
      />
      <FAQSection items={faqs} />
    </div>
  );
}
