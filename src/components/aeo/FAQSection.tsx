import { AnswerBlock } from "./AnswerBlock";
import { FAQJsonLd, type FaqItem } from "@/components/jsonld/FAQJsonLd";

// A list of AnswerBlocks that auto-injects a single FAQJsonLd.
// All answers are in the initial HTML (no JS-gated accordions).
export function FAQSection({
  items,
  heading = "پرسش‌های پرتکرار",
  id = "faq",
}: {
  items: FaqItem[];
  heading?: string;
  id?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="mt-12">
      <h2 id={`${id}-heading`} className="text-2xl font-bold mb-6">
        {heading}
      </h2>
      <FAQJsonLd items={items} />
      <div>
        {items.map((it, i) => (
          <AnswerBlock key={i} question={it.question} answer={it.answer} level={3} />
        ))}
      </div>
    </section>
  );
}
