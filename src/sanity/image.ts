import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { dataset, projectId, isSanityConfigured } from "./env";

const builder = isSanityConfigured
  ? imageUrlBuilder({ projectId, dataset })
  : null;

/**
 * Returns a Sanity CDN URL for an image, or null when Sanity isn't configured
 * or no image is set. Callers fall back to the static /public image.
 */
export function urlForImage(source: SanityImageSource | undefined | null) {
  if (!builder || !source) return null;
  return builder.image(source).auto("format").fit("max");
}
