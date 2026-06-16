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
          "flex flex-col items-center justify-center gap-2 border border-accent/40 bg-zinc-900 p-6 text-center",
          className,
        )}
        style={fill ? undefined : { aspectRatio: `${width} / ${height}` }}
        role="img"
        aria-label={alt}
      >
        <ImageIcon className="h-6 w-6 text-accent" aria-hidden="true" />
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
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
