import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Úvodní stránka",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "stats", title: "Čísla" },
    { name: "why", title: "Proč my" },
    { name: "about", title: "Lektor" },
    { name: "vehicle", title: "Vůz" },
    { name: "rest", title: "Balíčky, reference, FAQ, výzva" },
  ],
  fields: [
    // Hero
    defineField({ name: "heroTitleLine1", title: "Nadpis – řádek 1", type: "string", group: "hero" }),
    defineField({ name: "heroTitleLine2", title: "Nadpis – řádek 2 (červený)", type: "string", group: "hero" }),
    defineField({ name: "heroSubtitle", title: "Podnadpis", type: "text", rows: 2, group: "hero" }),
    defineField({ name: "heroCtaLabel", title: "Text tlačítka", type: "string", group: "hero" }),
    defineField({ name: "heroCtaHref", title: "Odkaz tlačítka", type: "string", group: "hero" }),
    defineField({ name: "heroImage", title: "Fotka v hero", type: "image", options: { hotspot: true }, group: "hero" }),
    defineField({
      name: "heroTrust",
      title: "Důvěryhodnostní body",
      type: "array",
      group: "hero",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "icon", title: "Ikona", type: "string" }),
            defineField({ name: "label", title: "Text", type: "string" }),
          ],
          preview: { select: { title: "label" } },
        },
      ],
    }),
    // Stats
    defineField({ name: "stats", title: "Čísla", type: "array", of: [{ type: "stat" }], group: "stats" }),
    // Why
    defineField({ name: "whyEyebrow", title: "Eyebrow", type: "string", group: "why" }),
    defineField({ name: "whyTitle", title: "Nadpis", type: "string", group: "why" }),
    defineField({ name: "whyDescription", title: "Popis", type: "text", rows: 3, group: "why" }),
    defineField({ name: "features", title: "Karty", type: "array", of: [{ type: "iconCard" }], group: "why" }),
    // About
    defineField({ name: "aboutEyebrow", title: "Eyebrow", type: "string", group: "about" }),
    defineField({ name: "aboutTitle", title: "Nadpis", type: "string", group: "about" }),
    defineField({ name: "aboutDescription", title: "Popis", type: "text", rows: 3, group: "about" }),
    defineField({ name: "aboutPoints", title: "Body", type: "array", of: [{ type: "string" }], group: "about" }),
    defineField({ name: "aboutInstructorName", title: "Jméno lektora", type: "string", group: "about" }),
    defineField({ name: "aboutInstructorRole", title: "Role lektora", type: "string", group: "about" }),
    defineField({ name: "aboutImage", title: "Fotka lektora", type: "image", options: { hotspot: true }, group: "about" }),
    // Vehicle
    defineField({ name: "vehicleEyebrow", title: "Eyebrow", type: "string", group: "vehicle" }),
    defineField({ name: "vehicleTitle", title: "Nadpis", type: "string", group: "vehicle" }),
    defineField({ name: "vehicleDescription", title: "Popis", type: "text", rows: 3, group: "vehicle" }),
    defineField({ name: "vehicleSpecs", title: "Výbava vozu", type: "array", of: [{ type: "string" }], group: "vehicle" }),
    defineField({ name: "vehicleImage", title: "Exteriér", type: "image", options: { hotspot: true }, group: "vehicle" }),
    defineField({ name: "vehicleInteriorImage", title: "Interiér", type: "image", options: { hotspot: true }, group: "vehicle" }),
    // Rest
    defineField({ name: "marquee", title: "Běžící pruh", type: "array", of: [{ type: "string" }], group: "rest" }),
    defineField({ name: "packagesEyebrow", title: "Balíčky – eyebrow", type: "string", group: "rest" }),
    defineField({ name: "packagesTitle", title: "Balíčky – nadpis", type: "string", group: "rest" }),
    defineField({ name: "packagesDescription", title: "Balíčky – popis", type: "text", rows: 2, group: "rest" }),
    defineField({ name: "testimonialsEyebrow", title: "Reference – eyebrow", type: "string", group: "rest" }),
    defineField({ name: "testimonialsTitle", title: "Reference – nadpis", type: "string", group: "rest" }),
    defineField({ name: "testimonialsDescription", title: "Reference – popis", type: "text", rows: 2, group: "rest" }),
    defineField({ name: "testimonials", title: "Reference", type: "array", of: [{ type: "testimonialItem" }], group: "rest" }),
    defineField({ name: "faqEyebrow", title: "FAQ – eyebrow", type: "string", group: "rest" }),
    defineField({ name: "faqTitle", title: "FAQ – nadpis", type: "string", group: "rest" }),
    defineField({ name: "faqDescription", title: "FAQ – popis", type: "text", rows: 2, group: "rest" }),
    defineField({ name: "cta", title: "Závěrečná výzva", type: "ctaBand", group: "rest" }),
  ],
  preview: { prepare: () => ({ title: "Úvodní stránka" }) },
});
