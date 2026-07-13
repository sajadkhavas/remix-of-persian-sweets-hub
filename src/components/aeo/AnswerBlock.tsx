import type { ReactNode } from "react";

// Renders an H2 question followed IMMEDIATELY by a ≤40-word direct answer,
// then optional deeper detail. Format optimized for AI answer extraction.
export function AnswerBlock({
  question,
  answer,
  detail,
  level = 2,
}: {
  question: string;
  answer: string;
  detail?: ReactNode;
  level?: 2 | 3;
}) {
  const H = level === 3 ? "h3" : "h2";
  return (
    <section className="mb-8">
      <H className="text-xl font-semibold text-foreground mb-2">{question}</H>
      <p className="text-base leading-8 text-foreground">{answer}</p>
      {detail ? (
        <div className="mt-3 text-base leading-8 text-muted-foreground">{detail}</div>
      ) : null}
    </section>
  );
}
