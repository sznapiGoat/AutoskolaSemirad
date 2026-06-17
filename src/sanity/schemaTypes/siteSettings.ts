import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Nastavení webu",
  type: "document",
  groups: [
    { name: "brand", title: "Značka", default: true },
    { name: "contact", title: "Kontakt" },
  ],
  fields: [
    defineField({ name: "name", title: "Název (krátký)", type: "string", group: "brand" }),
    defineField({ name: "fullName", title: "Plný název", type: "string", group: "brand" }),
    defineField({ name: "owner", title: "Provozovatel", type: "string", group: "brand" }),
    defineField({
      name: "logo",
      title: "Logo (značka)",
      type: "image",
      group: "brand",
      options: { hotspot: true },
    }),
    defineField({ name: "phone", title: "Telefon", type: "string", group: "contact" }),
    defineField({ name: "email", title: "E-mail", type: "string", group: "contact" }),
    defineField({ name: "web", title: "Web", type: "string", group: "contact" }),
    defineField({ name: "bankAccount", title: "Bankovní účet", type: "string", group: "contact" }),
    defineField({
      name: "address",
      title: "Adresa",
      type: "object",
      group: "contact",
      fields: [
        defineField({ name: "street", title: "Ulice", type: "string" }),
        defineField({ name: "city", title: "Město a PSČ", type: "string" }),
      ],
    }),
    defineField({
      name: "hours",
      title: "Provozní doba",
      type: "object",
      group: "contact",
      fields: [
        defineField({ name: "weekdays", title: "Po–Pá", type: "string" }),
        defineField({ name: "weekend", title: "So–Ne", type: "string" }),
      ],
    }),
    defineField({ name: "mapQuery", title: "Adresa pro mapu", type: "string", group: "contact" }),
  ],
  preview: { prepare: () => ({ title: "Nastavení webu" }) },
});
