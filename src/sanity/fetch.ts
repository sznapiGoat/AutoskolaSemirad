import { draftMode } from "next/headers";
import { client, previewClient } from "./client";

/**
 * Thin wrapper around the Sanity client that is safe to call before a project
 * is configured. Returns `null` when Sanity isn't set up or the request fails,
 * so every caller can fall back to the static seed content in `src/lib`.
 *
 * Automatically reads draft (unpublished) content when Next.js draft mode is
 * on — i.e. when editing through the Presentation tool in Studio.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  // draftMode() throws outside a request scope (e.g. generateStaticParams at build time).
  let isDraft = false;
  try {
    isDraft = (await draftMode()).isEnabled;
  } catch {
    isDraft = false;
  }
  const activeClient = isDraft && previewClient ? previewClient : client;
  if (!activeClient) return null;

  try {
    return await activeClient.fetch<T>(
      query,
      params,
      isDraft ? { cache: "no-store" } : { next: { revalidate: 60 } },
    );
  } catch (err) {
    console.error("[sanity] fetch failed:", err);
    return null;
  }
}
