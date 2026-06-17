import { defineField, defineType } from "sanity";

/** Icon keys map to lucide-react icons in the components. */
const ICONS = [
  "users",
  "gauge",
  "shield-check",
  "sparkles",
  "car",
  "zap",
  "refresh",
  "badge-check",
  "graduation-cap",
  "truck",
  "scale",
  "snowflake",
  "star",
];

export const iconCard = defineType({
  name: "iconCard",
  title: "Karta se službou",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Ikona",
      type: "string",
      options: { list: ICONS },
    }),
    defineField({ name: "title", title: "Nadpis", type: "string" }),
    defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "title", subtitle: "text" } },
});

export const stat = defineType({
  name: "stat",
  title: "Statistika",
  type: "object",
  fields: [
    defineField({ name: "value", title: "Hodnota (číslo)", type: "number" }),
    defineField({ name: "prefix", title: "Předpona", type: "string" }),
    defineField({ name: "suffix", title: "Přípona", type: "string" }),
    defineField({ name: "label", title: "Popis", type: "string" }),
  ],
  preview: {
    select: { value: "value", label: "label" },
    prepare: ({ value, label }) => ({ title: `${value ?? ""} ${label ?? ""}` }),
  },
});

export const packageItem = defineType({
  name: "packageItem",
  title: "Balíček / kurz",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Název", type: "string", validation: (r) => r.required() }),
    defineField({ name: "price", title: "Cena (Kč)", type: "string" }),
    defineField({
      name: "group",
      title: "Skupina",
      type: "string",
      options: { list: [{ title: "Skupina B", value: "B" }, { title: "Skupina C, C+E a D", value: "D" }] },
    }),
    defineField({ name: "badge", title: "Štítek", type: "string" }),
    defineField({ name: "highlight", title: "Zvýraznit (tmavá karta)", type: "boolean" }),
    defineField({ name: "description", title: "Popis", type: "text", rows: 2 }),
    defineField({ name: "features", title: "Co je v ceně", type: "array", of: [{ type: "string" }] }),
  ],
  preview: {
    select: { title: "name", subtitle: "price" },
    prepare: ({ title, subtitle }) => ({ title, subtitle: subtitle ? `${subtitle} Kč` : "" }),
  },
});

export const priceRow = defineType({
  name: "priceRow",
  title: "Položka ceníku",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Položka", type: "string" }),
    defineField({ name: "price", title: "Cena", type: "string" }),
  ],
  preview: { select: { title: "label", subtitle: "price" } },
});

export const faqItem = defineType({
  name: "faqItem",
  title: "Dotaz",
  type: "object",
  fields: [
    defineField({ name: "q", title: "Otázka", type: "string" }),
    defineField({ name: "a", title: "Odpověď", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "q" } },
});

export const testimonialItem = defineType({
  name: "testimonialItem",
  title: "Reference",
  type: "object",
  fields: [
    defineField({ name: "quote", title: "Text reference", type: "text", rows: 3 }),
    defineField({ name: "name", title: "Jméno", type: "string" }),
    defineField({ name: "detail", title: "Detail (kurz, město)", type: "string" }),
  ],
  preview: { select: { title: "name", subtitle: "detail" } },
});

export const ctaBand = defineType({
  name: "ctaBand",
  title: "Závěrečná výzva",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Nadpis", type: "string" }),
    defineField({ name: "text", title: "Text", type: "text", rows: 2 }),
    defineField({ name: "ctaLabel", title: "Text tlačítka", type: "string" }),
    defineField({ name: "ctaHref", title: "Odkaz tlačítka", type: "string" }),
  ],
  preview: { select: { title: "title" } },
});

export const sharedObjects = [
  iconCard,
  stat,
  packageItem,
  priceRow,
  faqItem,
  testimonialItem,
  ctaBand,
];
