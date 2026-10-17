export const site = {
  name: "Royal Cars",
  fullName: "Autoškola Royal Cars Liberec",
  owner: "Mgr. Bc. Josef Semirád",
  phone: "775 444 443",
  phoneHref: "tel:+420775444443",
  email: "info@sumi-lbc.cz",
  web: "www.sumi-lbc.cz",
  webHref: "https://www.sumi-lbc.cz",
  bankAccount: "4174001044/5500",
  logoUrl: null as string | null,
  address: {
    street: "Hodkovická 102, Doubí",
    city: "463 12 Liberec",
  },
  hours: {
    weekdays: "7:00-19:00",
    weekend: "po dohodě",
  },
  mapQuery: "Hodkovická 102, 463 12 Liberec",
  /** Free text shown in the hero and on kontakt, editable in Sanity. */
  nextCourse: "ihned po domluvě",
};

export const nav = [
  { label: "Úvod", href: "/" },
  { label: "Služby", href: "/sluzby" },
  { label: "Ceník", href: "/cenik" },
  { label: "Aktuality", href: "/aktuality" },
  { label: "Kontakt", href: "/kontakt" },
];
