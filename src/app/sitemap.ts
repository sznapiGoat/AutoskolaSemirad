import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getPosts } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.webHref;

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/sluzby`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/cenik`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/kondicni-jizdy`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/aktuality`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/kontakt`, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${base}/ochrana-osobnich-udaju`,
      changeFrequency: "yearly",
      priority: 0.1,
    },
  ];

  const posts = await getPosts();
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/aktuality/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticPages, ...postPages];
}
