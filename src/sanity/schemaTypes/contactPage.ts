import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Stránka Kontakt",
  type: "document",
  fields: [
    defineField({ name: "headerEyebrow", title: "Hlavička – eyebrow", type: "string" }),
    defineField({ name: "headerTitle", title: "Hlavička – nadpis", type: "string" }),
    defineField({ name: "headerDescription", title: "Hlavička – popis", type: "text", rows: 3 }),
    defineField({ name: "instructorImage", title: "Fotka lektora (za volantem)", type: "image", options: { hotspot: true } }),
    defineField({ name: "instructorName", title: "Jméno lektora", type: "string" }),
    defineField({ name: "instructorRole", title: "Role lektora", type: "string" }),
    defineField({ name: "infoSubtext", title: "Text pod názvem", type: "string" }),
    defineField({ name: "formHeading", title: "Formulář – nadpis", type: "string" }),
    defineField({ name: "formSubtext", title: "Formulář – text", type: "string" }),
    defineField({ name: "showroomEyebrow", title: "Učebna – eyebrow", type: "string" }),
    defineField({ name: "showroomTitle", title: "Učebna – nadpis", type: "string" }),
    defineField({ name: "showroomDescription", title: "Učebna – popis", type: "text", rows: 3 }),
    defineField({ name: "showroomImage", title: "Fotka učebny", type: "image", options: { hotspot: true } }),
  ],
  preview: { prepare: () => ({ title: "Stránka Kontakt" }) },
});
