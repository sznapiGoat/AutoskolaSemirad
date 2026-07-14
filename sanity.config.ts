"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool, defineLocations } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";

const previewOrigin =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

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
