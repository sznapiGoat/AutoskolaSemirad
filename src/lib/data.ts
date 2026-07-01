export type PackageGroup = { id: "B" | "D"; title: string; subtitle: string };

export const packageGroups: PackageGroup[] = [
  { id: "B", title: "Skupina B", subtitle: "Osobní automobil, výcvik v BMW X2" },
  {
    id: "D",
    title: "Skupina C, C+E a D",
    subtitle: "Autobus MAN A20, akreditované školicí středisko",
  },
];

export type Package = {
  name: string;
  price: string;
  group: PackageGroup["id"];
  badge?: string;
  highlight?: boolean;
  description: string;
  features: string[];
};

export const packages: Package[] = [
  {
    name: "Základní sk. B",
    price: "17 999",
    group: "B",
    description: "Běžný standard autoškoly. Vhodný pro pokročilejší žáky i pro přezkoušení.",
    features: [
      "Minimální zákonný počet jízd",
      "Vhodný pro pokročilejší žáky",
      "Možnost přezkoušení",
      "Splátky bez navýšení",
    ],
  },
  {
    name: "Standardní sk. B",
    price: "20 999",
    group: "B",
    badge: "Nejoblíbenější",
    description: "Začátek výuky i jízd z centra města, z Barvířské ulice.",
    features: [
      "Začátek jízd i teorie z centra města",
      "Nástup z Barvířské ulice (100 m od Fügnerova)",
      "Kompletní výuka a výcvik",
      "Splátky bez navýšení",
    ],
  },
  {
    name: "VIP sk. B",
    price: "24 999",
    group: "B",
    badge: "Doporučujeme",
    description: "Přednostní plánování a rychlejší průběh celého kurzu.",
    features: [
      "Přednostní plánování výuky a výcviku",
      "Rychlejší průběh kurzu",
      "Plánování podle časových možností žáka",
      "Splátky bez navýšení",
    ],
  },
  {
    name: "VIP Royal Cars sk. B",
    price: "28 999",
    group: "B",
    badge: "34 hodin jízd",
    highlight: true,
    description: "Rozšířený kurz s jízdami na delší vzdálenost po dálnici.",
    features: [
      "34 hodin praktických jízd",
      "Jízdy na delší vzdálenost po dálnici",
      "Nácvik parkování všemi způsoby i asistentů",
      "Přednostní plánování",
    ],
  },
  {
    name: "VIP Royal Full Service",
    price: "29 999",
    group: "B",
    badge: "Vše v ceně",
    description: "Maximální pohodlí, odvoz z domu na učebnu a zpět i občerstvení.",
    features: [
      "Odvoz z domu na učebnu a zpět",
      "Drobné občerstvení na učebně",
      "Přednostní plánování výuky a výcviku",
      "Vše v rozsahu VIP kurzu",
    ],
  },
  {
    name: "VIP Individual",
    price: "36 999",
    group: "B",
    badge: "Maximální komfort",
    description: "Jen lektor a vy. Nejrychlejší cesta k řidičskému průkazu.",
    features: [
      "Pouze lektor a vy, žádná skupina",
      "Plánování 100 % podle vás",
      "Nejrychlejší možný průběh",
      "Přednostní plánování",
    ],
  },
  {
    name: "Standardní kurz sk. D",
    price: "39 500",
    group: "D",
    description: "Výcvik na autobus MAN A20 automat v akreditovaném středisku.",
    features: [
      "Autobus MAN A20 automat",
      "Kompletní výcvik a výuka",
      "Akreditované školicí středisko",
      "Závěrečná zkouška v ceně",
    ],
  },
  {
    name: "Kurz sk. D ze skupiny B",
    price: "49 900",
    group: "D",
    description: "Rozšíření na autobus pro stávající držitele skupiny B.",
    features: [
      "Pro držitele skupiny B",
      "Autobus MAN A20 automat",
      "Rozšíření na skupinu D",
      "Závěrečná zkouška v ceně",
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
];

export const skidSchool = {
  title: "Škola (ne)smyku",
  description:
    "Zdokonalovací kurz pro absolventy autoškoly i začínající a pokročilé řidiče. Jízdy na delší vzdálenost po dálnici, správné průjezdy zatáček, bezpečné připojování a odpojování, předjíždění, zipování, dodržování bezpečné vzdálenosti i bezchybné parkování a práce s asistenty.",
  options: [
    { label: "5 + 1 lekcí", price: "9 500 Kč" },
    { label: "3 lekce", price: "4 500 Kč" },
  ],
};

export const instructorTraining = {
  title: "Příprava budoucích učitelů autoškoly",
  description:
    "Připravíme vás na profesi učitele výuky a výcviku v autoškole, od kompletního oprávnění po rozšíření.",
  tiers: [
    { label: "Učitelské oprávnění (celé)", price: "od 30 000 Kč" },
    { label: "Učitelské oprávnění – praktický výcvik", price: "od 25 000 Kč" },
    { label: "Rozšíření", price: "od 20 000 Kč" },
  ],
  note: "Více žadatelů najednou: sleva 5 000 Kč.",
};

export const consultingAreas: string[] = [
  "Registrace a vyřazení vozidel z registru, změny na vozidlech",
  "Schvalování technické způsobilosti (dovoz ze zahraničí, stavby a přestavby)",
  "Historická vozidla",
  "Autoškoly",
  "Řešení dopravních přestupků a bodové hodnocení",
  "Dopravní nehody",
  "Zastupování ve správním řízení (alkohol, drogy, vysoké sankce, zákaz činnosti)",
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

export const instructorLicense = "A, B, C, D, B+E, C+E, D+E";

export const instructorHighlights = [
  { value: "35+", label: "let praxe v oboru" },
  { value: "A–D+E", label: "rozsah učitelského oprávnění" },
  { value: "24 let", label: "praxe zkušebního komisaře řidičů" },
];

export const instructorExpertise: string[] = [
  "Autoškoly a kontroly autoškol",
  "Dohled nad silničním provozem a řešení přestupků",
  "Schvalování technické způsobilosti vozidel",
  "Registrace a vyřazování vozidel",
  "Stanice technické kontroly a měření emisí",
  "Organizace zkoušek řidičů jako hlavní zkušební komisař",
  "Vedení dopravně správních agend a registru vozidel",
];

export type Education = { school: string; detail: string };

export const instructorEducation: Education[] = [
  {
    school: "Střední průmyslová škola automobilní, Teplice",
    detail: "Obor 37-44-06 Provoz a ekonomika automobilové dopravy",
  },
  { school: "Střední policejní škola, Praha", detail: "" },
  {
    school: "Technická univerzita v Liberci",
    detail: "Pedagogika, psychologie a právní aspekty",
  },
  {
    school: "Metropolitní univerzita Praha",
    detail: "Evropské správní právo a teorie veřejné správy",
  },
  {
    school: "Zkušební komisař řidičů",
    detail: "Kompletní rozsah A–D+E, praxe téměř 24 let",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Skvělý přístup od první jízdy. Lektor měl trpělivost a zkoušku jsem dala na první pokus. BMW X2 byla navíc paráda.",
    name: "Tereza K.",
    detail: "Skupina B, Liberec",
  },
  {
    quote:
      "Vybral jsem si rychlokurz a opravdu to bylo rychlé. Plánování jízd dle mě, žádné čekání týdny na termín.",
    name: "Martin V.",
    detail: "Rychlokurz sk. B",
  },
  {
    quote:
      "Po letech bez řízení jsem potřebovala obnovit jistotu. Kondiční jízdy mi vrátily klid za volantem.",
    name: "Jana P.",
    detail: "Kondiční jízdy",
  },
  {
    quote:
      "Profesionální jednání, férové ceny a možnost splátek. Doporučuji každému, kdo to s řidičákem myslí vážně.",
    name: "Ondřej S.",
    detail: "VIP balíček sk. B",
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Jak rychle můžu začít?",
    a: "Nástup je možný prakticky ihned. Ozvěte se nám telefonicky nebo přes formulář a domluvíme termín, který vám sedne.",
  },
  {
    q: "Dají se kurzy platit na splátky?",
    a: "Ano. Všechny balíčky lze rozložit do splátek bez navýšení. Konkrétní podmínky s vámi rádi projdeme předem.",
  },
  {
    q: "V jakém autě budu jezdit?",
    a: "Praktický výcvik probíhá v moderním BMW X2 s asistenčními systémy a možností video záznamu z každé jízdy.",
  },
  {
    q: "Co když u zkoušky neuspěji?",
    a: "Nic se neděje. Domluvíme opravný termín a v případě potřeby doplníme kondiční jízdy, abyste šli na zkoušku připravení.",
  },
  {
    q: "Kolik praktických jízd je v ceně?",
    a: "Standardní a VIP balíčky zahrnují 30 hodin praktických jízd, VIP Individual až 34 hodin. Základní balíček obsahuje minimální zákonný počet.",
  },
  {
    q: "Vyzvednete mě i z domu?",
    a: "U balíčku VIP Royal Full Service zajišťujeme odvoz z domu na učebnu a zpět včetně občerstvení na učebně.",
  },
];
