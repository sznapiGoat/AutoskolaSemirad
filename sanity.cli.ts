import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "hd19qymi";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

/**
 * Config for the Sanity CLI (`npx sanity ...`).
 * Enables: `sanity cors add`, `sanity dataset export/import`,
 * `sanity documents`, `sanity users invite`, `sanity manage`, etc.
 * The embedded Studio itself is served by Next.js at /studio.
 */
export default defineCliConfig({
  api: { projectId, dataset },
  autoUpdates: true,
});
