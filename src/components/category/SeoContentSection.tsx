import type { CategorySeoContent } from "@/data/categories";

export function SeoContentSection({ content }: { content: CategorySeoContent }) {
  const blocks = [content.introduction, content.buyingGuide, content.usefulInfo];

  return (
    <section aria-labelledby="category-guide-heading" className="space-y-4">
      <h2 id="category-guide-heading" className="text-2xl font-extrabold">
        راهنمای این دسته
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {blocks.map((block) => (
          <article
            key={block.title}
            className="rounded-2xl border border-border bg-white p-5 shadow-sm"
          >
            <h3 className="mb-3 text-lg font-bold">{block.title}</h3>
            <p className="text-sm leading-8 text-muted-foreground">{block.body}</p>
          </article>
        ))}
      </div>
      {content.futureBlogLinks.length > 0 && (
        <div className="rounded-2xl border border-border bg-white p-5">
          <h3 className="mb-3 text-lg font-bold">مطالب مرتبط</h3>
          <ul className="list-disc space-y-2 pe-0 ps-6 text-sm text-muted-foreground">
            {content.futureBlogLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-bold text-primary-dark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
