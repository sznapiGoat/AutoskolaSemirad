"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool, defineLocations } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";

/**
 * Origin the Presentation tool loads in its preview iframe.
 *
 * `NEXT_PUBLIC_SITE_URL` wins when set, but the Studio is embedded at
 * `/studio` inside this same app, so its own origin is always the right
 * answer in the browser. That fallback keeps the preview working even when
 * the env var is missing or empty (an empty value in Vercel used to fall
 * through to localhost, which an https Studio blocks as mixed content).
 */
const previewOrigin =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (typeof window !== "undefined"
    ? window.location.origin
    : "http://localhost:3000");

const singletonPaths: Record<string, string> = {
  siteSettings: "/",
  homePage: "/",
  servicesPage: "/sluzby",
  pricingPage: "/cenik",
  contactPage: "/kontakt",
};

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        origin: previewOrigin,
        draftMode: { enable: "/api/draft" },
      },
      resolve: {
        locations: {
          ...Object.fromEntries(
            Object.entries(singletonPaths).map(([id, href]) => [
              id,
              { locations: [{ title: "Stránka", href }] },
            ]),
          ),
          post: defineLocations({
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) =>
              doc
                ? {
                    locations: [
                      {
                        title: doc.title || "Aktualita",
                        href: `/aktuality/${doc.slug}`,
                      },
                    ],
                  }
                : null,
          }),
        },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
