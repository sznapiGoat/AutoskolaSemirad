export type Package = {
  name: string;
  price: string;
  badge?: string;
  highlight?: boolean;
  description: string;
  features: string[];
};

export const packages: Package[] = [
  {
    name: "Základní sk. B",
    price: "17 999",
    description: "Minimální počet hodin, vhodný pro pokročilejší žáky.",
    features: [
      "Kompletní výuka a výcvik sk. B",
      "Minimální zákonný počet jízd",
      "Možnost splátek bez navýšení",
      "Závěrečná zkouška v ceně",
    ],
  },
  {
    name: "Standardní sk. B",
    price: "20 999",
    badge: "Nejoblíbenější",
    description: "Start z centra Liberce z Barvířské ulice, klasický komfort.",
    features: [
      "30 hodin praktických jízd",
      "Start z centra Liberce (Barvířská)",
      "Video záznam z každé jízdy",
      "Možnost splátek bez navýšení",
    ],
  },
  {
    name: "VIP sk. B",
    price: "24 999",
    badge: "Doporučujeme",
    highlight: true,
    description: "Přednostní plánování a rychlejší průběh celého kurzu.",
    features: [
      "Přednostní plánování jízd",
      "Rychlejší dokončení kurzu",
      "30 hodin praktických jízd",
      "Možnost splátek bez navýšení",
    ],
  },
  {
    name: "VIP Royal Full Service",
    price: "29 999",
    badge: "Vše v ceně",
    description: "Maximální pohodlí, odvoz z domu a zpět i občerstvení.",
    features: [
      "Odvoz z domu na učebnu a zpět",
      "Občerstvení na učebně",
      "Přednostní plánování jízd",
      "Video záznam z každé jízdy",
    ],
  },
  {
    name: "VIP Individual",
    price: "36 999",
    badge: "Maximální komfort",
    description: "Jen lektor a vy. Nejrychlejší cesta k řidičskému průkazu.",
    features: [
      "Pouze lektor a vy, žádná skupina",
      "34 hodin praktických jízd",
      "Plánování 100 % dle žáka",
      "Nejrychlejší možný průběh",
    ],
  },
];

export type AddOn = { label: string; price: string };

export const addOns: AddOn[] = [
  { label: "Kondiční jízda 45 min sk. B", price: "900 Kč" },
  { label: "Kondiční jízda 90 min sk. B", price: "1 400 Kč" },
  { label: "Kondiční jízda sk. D", price: "2 700 Kč" },
  { label: "Výcviková hodina nad rámec (45 min)", price: "600 Kč" },
  { label: "Výcviková hodina nad rámec (90 min)", price: "900 Kč" },
  { label: "Přistavení vozidla k opravné zkoušce", price: "400 Kč" },
  { label: "Zrušení jízdy v den termínu", price: "400 Kč" },
  { label: "Školení začínajících řidičů", price: "4 500 Kč" },
  { label: "Vrácení ŘP a 90 min kondiční jízdy", price: "4 000 Kč" },
  { label: "Kurz sk. D", price: "39 500 Kč" },
  { label: "Kurz sk. D ze sk. B", price: "49 900 Kč" },
];

export const vehicleSpecs: string[] = [
  "Dieselový BMW X2",
  "Výkon přes 210 HP",
  "Točivý moment přes 465 Nm",
  "Automatické udržování rychlosti s brzdnou funkcí",
  "Parkovací asistent pro samočinné podélné parkování",
  "BMW ConnectedDrive",
  "Možnost video záznamu z každé jízdy",
];

export const serviceOptions = [
  "Kurz sk. B",
  "Rychlokurz",
  "Kondiční jízdy",
  "Vrácení ŘP",
  "Školení řidičů",
  "Kurz sk. D",
  "Jiné",
];
