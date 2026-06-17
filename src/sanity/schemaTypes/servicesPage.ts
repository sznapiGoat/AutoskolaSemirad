import { defineField, defineType } from "sanity";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Stránka Služby",
  type: "document",
  fields: [
    defineField({ name: "headerEyebrow", title: "Hlavička – eyebrow", type: "string" }),
    defineField({ name: "headerTitle", title: "Hlavička – nadpis", type: "string" }),
    defineField({ name: "headerDescription", title: "Hlavička – popis", type: "text", rows: 3 }),
    defineField({ name: "services", title: "Služby", type: "array", of: [{ type: "iconCard" }] }),
    defineField({ name: "vehicleEyebrow", title: "Vůz – eyebrow", type: "string" }),
    defineField({ name: "vehicleTitle", title: "Vůz – nadpis", type: "string" }),
    defineField({ name: "vehicleDescription", title: "Vůz – popis", type: "text", rows: 3 }),
    defineField({ name: "vehicleSpecs", title: "Výbava vozu", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "vehicleImage", title: "Fotka vozu", type: "image", options: { hotspot: true } }),
    defineField({ name: "consultingEyebrow", title: "Poradenství – eyebrow", type: "string" }),
    defineField({ name: "consultingTitle", title: "Poradenství – nadpis", type: "string" }),
    defineField({ name: "consultingDescription", title: "Poradenství – popis", type: "text", rows: 3 }),
    defineField({ name: "consultingAreas", title: "Oblasti poradenství", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "stepsEyebrow", title: "Postup – eyebrow", type: "string" }),
    defineField({ name: "stepsTitle", title: "Postup – nadpis", type: "string" }),
    defineField({
      name: "steps",
      title: "Kroky",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "n", title: "Číslo", type: "string" }),
            defineField({ name: "title", title: "Nadpis", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "n" } },
        },
      ],
    }),
    defineField({ name: "cta", title: "Závěrečná výzva", type: "ctaBand" }),
  ],
  preview: { prepare: () => ({ title: "Stránka Služby" }) },
});
