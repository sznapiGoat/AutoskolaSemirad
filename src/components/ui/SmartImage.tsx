"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type SmartImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  label: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
};

/**
 * next/image wrapper that falls back to a dark placeholder describing the
 * intended photo when the file is missing or fails to load. Real photos are
 * dropped into /public/images by the client after handover.
 */
export function SmartImage({
  src,
  alt,
  width,
  height,
  label,
  className,
  imgClassName,
  priority,
  sizes,
  fill,
}: SmartImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={cn(
          "relative isolate flex flex-col items-center justify-center gap-3 overflow-hidden bg-dark p-6 text-center",
          className,
        )}
        style={fill ? undefined : { aspectRatio: `${width ?? 16} / ${height ?? 10}` }}
        role="img"
        aria-label={alt}
      >
        {/* branded backdrop so a missing photo still reads as designed */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/25 via-dark to-dark" />
        <div className="grid-texture absolute inset-0 opacity-60" />
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/30 blur-3xl" />
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 ring-1 ring-accent/40">
          <ImageIcon className="h-5 w-5 text-accent-light" aria-hidden="true" />
        </span>
        <span className="relative max-w-[14rem] text-xs font-medium uppercase tracking-[0.18em] text-white/55">
          {label}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      sizes={sizes}
      priority={priority}
      onError={() => setErrored(true)}
      className={cn(className, imgClassName)}
    />
  );
}
