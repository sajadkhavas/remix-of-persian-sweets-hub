import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FAQJsonLd, type FaqItem } from "@/components/jsonld/FAQJsonLd";

// SSR-safe FAQ:
// - all Q/A text is present in the initial DOM for crawlers/AEO
// - client hydration adds animated open/close using AnimatePresence
export function AnimatedFAQ({
  items,
  heading = "سوالات متداول",
  id = "faq",
}: {
  items: FaqItem[];
  heading?: string;
  id?: string;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <FAQJsonLd items={items} />
      <h2
        id={`${id}-heading`}
        className="mb-8 text-center text-3xl font-bold"
        style={{ color: "var(--accent-brown)" }}
      >
        {heading}
      </h2>
      <div className="mx-auto max-w-3xl divide-y" style={{ borderColor: "var(--border)" }}>
        {items.map((it, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={i} className="border-b border-border">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-panel-${i}`}
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-start"
              >
                <h3
                  className="text-base md:text-lg font-semibold"
                  style={{ color: "var(--accent-brown)" }}
                >
                  {it.question}
                </h3>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xl"
                  style={{ background: "var(--primary-light)", color: "var(--primary-dark)" }}
                  aria-hidden="true"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="content"
                    id={`${id}-panel-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 leading-8 text-muted-foreground">{it.answer}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
              {/* SSR fallback: hidden text ensures crawlers see the answer even before hydration */}
              <noscript>
                <p className="pb-5 leading-8 text-muted-foreground">{it.answer}</p>
              </noscript>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AnimatedFAQ;
