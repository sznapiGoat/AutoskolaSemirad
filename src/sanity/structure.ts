import type { StructureResolver } from "sanity/structure";

const SINGLETONS: { id: string; title: string }[] = [
  { id: "siteSettings", title: "Nastavení webu" },
  { id: "homePage", title: "Úvodní stránka" },
  { id: "servicesPage", title: "Stránka Služby" },
  { id: "pricingPage", title: "Stránka Ceník" },
  { id: "contactPage", title: "Stránka Kontakt" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Obsah webu")
    .items([
      ...SINGLETONS.map(({ id, title }) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(S.document().schemaType(id).documentId(id)),
      ),
      S.divider(),
      S.documentTypeListItem("post").title("Aktuality"),
    ]);
