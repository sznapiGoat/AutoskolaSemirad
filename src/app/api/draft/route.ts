import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { previewClient } from "@/sanity/client";

/**
 * Entry point the Presentation tool calls to turn on Next.js draft mode.
 *
 * Must use `previewClient`, not `client`: Sanity stores the one-time
 * `sanity.previewUrlSecret` document as a draft only, so a published-perspective
 * CDN-cached client never finds it and every request fails with
 * "Invalid secret" — leaving Presentation stuck on its loading spinner.
 */
export const { GET } = defineEnableDraftMode({
  client: previewClient!,
});
