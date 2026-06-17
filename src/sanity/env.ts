export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";

/**
 * True once a real Sanity project is configured. Until then the site renders
 * from the static seed content in `src/lib/data.ts` and `src/lib/site.ts`,
 * so nothing breaks before the project exists. `placeholder` keeps the Studio
 * config valid for builds without pretending data is available.
 */
export const isSanityConfigured =
  projectId.length > 0 && projectId !== "placeholder";
