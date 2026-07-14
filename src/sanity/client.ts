import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, token, isSanityConfigured } from "./env";

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;

/**
 * Used only inside draft mode (Presentation tool / "Preview" in Studio) to
 * read unpublished changes. Requires SANITY_API_READ_TOKEN.
 */
export const previewClient =
  isSanityConfigured && token
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
        perspective: "drafts",
        token,
      })
    : null;
