import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Aktualita",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nadpis",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL adresa",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Datum zveřejnění",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Perex (krátký úvod)",
      type: "text",
      rows: 3,
      description: "Zobrazí se v přehledu aktualit a ve výpisu.",
    }),
    defineField({
      name: "coverImage",
      title: "Úvodní obrázek",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      title: "Obsah",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
    }),
  ],
  orderings: [
    {
      title: "Nejnovější",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "coverImage" },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle
        ? new Date(subtitle).toLocaleDateString("cs-CZ")
        : "Bez data",
      media,
    }),
  },
});
