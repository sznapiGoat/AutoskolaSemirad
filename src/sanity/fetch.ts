import { client } from "./client";

/**
 * Thin wrapper around the Sanity client that is safe to call before a project
 * is configured. Returns `null` when Sanity isn't set up or the request fails,
 * so every caller can fall back to the static seed content in `src/lib`.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
  } catch (err) {
    console.error("[sanity] fetch failed:", err);
    return null;
  }
}
