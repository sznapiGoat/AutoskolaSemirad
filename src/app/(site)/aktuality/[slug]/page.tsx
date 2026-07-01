import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { PostBody } from "@/components/sections/PostBody";
import { getPost, getPostSlugs } from "@/lib/content";
import { urlForImage } from "@/sanity/image";

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Aktualita nenalezena" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function PostPage({ params }: Params) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const cover = urlForImage(post.coverImage)?.width(1600).height(900).url();

  return (
    <article className="bg-bg">
      {/* Header */}
      <header className="bg-dark pt-32 text-white">
        <div className="mx-auto max-w-3xl pb-14 container-px">
          <Reveal>
            <Link
              href="/aktuality"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Zpět na aktuality
            </Link>
            <span className="mt-8 inline-flex items-center gap-1.5 text-xs font-medium text-accent-light">
              <CalendarDays className="h-3.5 w-3.5" />
              {formatDate(post.publishedAt)}
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold leading-[1.15] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-5 text-lg leading-relaxed text-white/60 text-pretty">
                {post.excerpt}
              </p>
            )}
          </Reveal>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-3xl py-16 container-px">
        {cover && (
          <Reveal className="mb-10 overflow-hidden rounded-2xl shadow-card">
            <Image
              src={cover}
              alt={post.title}
              width={1600}
              height={900}
              priority
              sizes="(min-width: 768px) 720px, 100vw"
              className="h-auto w-full object-cover"
            />
          </Reveal>
        )}
        {post.body && post.body.length > 0 && (
          <div className="max-w-none">
            <PostBody value={post.body} />
          </div>
        )}
      </div>
    </article>
  );
}
