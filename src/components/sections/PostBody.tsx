import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import { urlForImage } from "@/sanity/image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-5 text-[15px] leading-relaxed text-ink-muted">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 font-display text-2xl font-bold tracking-tight text-ink">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-display text-xl font-bold text-ink">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 border-accent pl-5 text-lg italic text-ink">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 space-y-2 pl-1 text-[15px] text-ink-muted">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-5 text-[15px] text-ink-muted">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3">
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="font-medium text-accent underline underline-offset-2 hover:text-accent-light"
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      const url = urlForImage(value)?.width(1200).url();
      if (!url) return null;
      return (
        <span className="mt-8 block overflow-hidden rounded-2xl">
          <Image
            src={url}
            alt={value?.alt ?? ""}
            width={1200}
            height={800}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
        </span>
      );
    },
  },
};

export function PostBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
