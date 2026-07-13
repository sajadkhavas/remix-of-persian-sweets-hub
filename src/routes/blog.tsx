import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { POSTS, formatPersianDate } from "@/data/blog";
import { buildSeo } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/jsonld/BreadcrumbJsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const Route = createFileRoute("/blog")({
  head: () =>
    buildSeo({
      title: "بلاگ وینیمی | مقالات شیرینی‌پزی و هدیه",
      description:
        "مقالات آموزشی درباره کوکی، شیرینی‌پزی، هدیه دادن و نگهداری محصولات وینیمی بیکری",
      path: "/blog",
    }),
  component: BlogPage,
});

const topics = ["همه", "نگهداری", "هدیه", "یلدا", "کوکی رژیمی", "شیرینی ارسالی"];
const crumbs = [
  { name: "خانه", path: "/" },
  { name: "بلاگ", path: "/blog" },
];

function BlogPage() {
  const [activeTopic, setActiveTopic] = useState("همه");
  const filtered = activeTopic === "همه" ? POSTS : POSTS.filter((p) => p.topic === activeTopic);
  return (
    <main dir="rtl" className="min-h-screen bg-[#FEFCF9]">
      <BreadcrumbJsonLd items={crumbs} />
      <section className="bg-accent px-6 py-20 text-center">
        <p className="mb-4 text-sm font-semibold text-primary">وینیمی بیکری</p>
        <h1 className="mb-4 text-4xl font-extrabold text-accent-foreground">بلاگ وینیمی بیکری</h1>
        <p className="mx-auto max-w-xl leading-8 text-muted-foreground">
          آموزش، الهام و داستان‌های شیرینی‌پزی خانگی
        </p>
      </section>
      <div className="mx-auto max-w-6xl px-6">
        <Breadcrumbs items={crumbs} />
      </div>
      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => setActiveTopic(topic)}
              className={
                activeTopic === topic
                  ? "rounded-full bg-primary px-5 py-2 text-sm font-bold text-white"
                  : "rounded-full border px-5 py-2 text-sm font-bold text-muted-foreground"
              }
            >
              {topic}
            </button>
          ))}
        </div>
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col rounded-2xl border bg-accent p-7 shadow-sm"
            >
              <div className="mb-4 text-4xl">{post.emoji}</div>
              {post.topic && (
                <span className="mb-3 w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  {post.topic}
                </span>
              )}
              <h2 className="mb-3 text-lg font-bold leading-8 text-accent-foreground">
                {post.title}
              </h2>
              <p className="mb-6 grow text-sm leading-8 text-muted-foreground">{post.excerpt}</p>
              <div className="flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
                <time dateTime={post.datePublished}>{formatPersianDate(post.datePublished)}</time>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="font-bold text-primary"
                >
                  بیشتر بخوانید ←
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
