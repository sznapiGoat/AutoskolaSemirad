import type { SchemaTypeDefinition } from "sanity";
import { sharedObjects } from "./objects";
import { siteSettings } from "./siteSettings";
import { homePage } from "./homePage";
import { servicesPage } from "./servicesPage";
import { pricingPage } from "./pricingPage";
import { contactPage } from "./contactPage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettings,
    homePage,
    servicesPage,
    pricingPage,
    contactPage,
    ...sharedObjects,
  ],
};
