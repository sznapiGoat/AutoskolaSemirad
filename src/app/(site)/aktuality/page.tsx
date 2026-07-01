import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, Newspaper } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { getPosts } from "@/lib/content";
import { urlForImage } from "@/sanity/image";

export const metadata: Metadata = {
  title: "Aktuality",
  description:
    "Novinky, termíny kurzů a informace z autoškoly Royal Cars Liberec.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function AktualityPage() {
  const posts = await getPosts();

  return (
    <>
      {/* Header */}
      <section className="bg-dark pt-32 text-white">
        <div className="mx-auto max-w-container pb-16 container-px">
          <SectionHeading
            dark
            eyebrow="Aktuality"
            title="Novinky z autoškoly"
            description="Termíny kurzů, změny v provozu a užitečné informace pro naše žáky."
          />
        </div>
      </section>

      {/* Posts */}
      <section className="bg-bg">
        <div className="mx-auto max-w-container py-20 container-px sm:py-24">
          {posts.length === 0 ? (
            <Reveal className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-line bg-white p-12 text-center shadow-card">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Newspaper className="h-6 w-6" />
              </span>
              <h2 className="font-display text-xl font-bold text-ink">
                Zatím tu nic nemáme
              </h2>
              <p className="text-sm leading-relaxed text-ink-muted">
                První aktuality přidáme brzy. Sledujte nás, ať vám neuteče žádná
                novinka ani termín kurzu.
              </p>
            </Reveal>
          ) : (
            <StaggerGroup className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const cover = urlForImage(post.coverImage)?.width(800).height(500).url();
                return (
                  <StaggerItem key={post._id}>
                    <Link
                      href={`/aktuality/${post.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                    >
                      <div className="relative aspect-[8/5] w-full overflow-hidden bg-bg-muted">
                        {cover ? (
                          <Image
                            src={cover}
                            alt={post.title}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <Newspaper className="h-8 w-8 text-ink-muted/30" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {formatDate(post.publishedAt)}
                        </span>
                        <h2 className="mt-3 font-display text-lg font-bold leading-snug text-ink transition-colors group-hover:text-accent">
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-muted">
                            {post.excerpt}
                          </p>
                        )}
                        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                          Číst více
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          )}
        </div>
      </section>
    </>
  );
}
