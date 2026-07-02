import { sanityFetch } from "@/sanity/fetch";
import {
  pricingPageQuery,
  aboutQuery,
  homePageQuery,
  servicesPageQuery,
  contactPageQuery,
  siteSettingsQuery,
  postsQuery,
  postBySlugQuery,
  postSlugsQuery,
} from "@/sanity/queries";
import {
  packageGroups,
  packages,
  addOns,
  skidSchool,
  instructorTraining,
  faqs,
  testimonials,
  vehicleSpecs,
  consultingAreas,
  instructorHighlights,
  instructorLicense,
  instructorExpertise,
  instructorEducation,
  type PackageGroup,
  type Package,
  type AddOn,
  type Faq,
  type Education,
  type Testimonial,
} from "@/lib/data";
import { site } from "@/lib/site";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

/** Use the Sanity value only when it is actually present (non-empty). */
function pick<T>(value: T | null | undefined, fallback: T): T {
  if (value == null) return fallback;
  if (Array.isArray(value) && value.length === 0) return fallback;
  if (typeof value === "string" && value.trim() === "") return fallback;
  return value;
}

type PricingDoc = {
  headerEyebrow?: string;
  headerTitle?: string;
  headerDescription?: string;
  groups?: PackageGroup[];
  packages?: Package[];
  skidTitle?: string;
  skidDescription?: string;
  skidOptions?: AddOn[];
  instructorTitle?: string;
  instructorDescription?: string;
  instructorTiers?: AddOn[];
  instructorNote?: string;
  addOnsEyebrow?: string;
  addOnsTitle?: string;
  addOnsDescription?: string;
  addOns?: AddOn[];
  addOnsNote?: string;
  faqEyebrow?: string;
  faqTitle?: string;
  faqDescription?: string;
  faqs?: Faq[];
};

export async function getPricingContent() {
  const doc = await sanityFetch<PricingDoc>(pricingPageQuery);

  return {
    header: {
      eyebrow: pick(doc?.headerEyebrow, "Ceník"),
      title: pick(doc?.headerTitle, "Férové ceny, žádná překvapení"),
      description: pick(
        doc?.headerDescription,
        "Vyberte si balíček podle toho, kolik komfortu a rychlosti potřebujete. Všechny ceny lze rozložit do splátek bez navýšení.",
      ),
    },
    groups: pick(doc?.groups, packageGroups),
    packages: pick(doc?.packages, packages),
    skid: {
      title: pick(doc?.skidTitle, skidSchool.title),
      description: pick(doc?.skidDescription, skidSchool.description),
      options: pick(doc?.skidOptions, skidSchool.options),
    },
    instructorTraining: {
      title: pick(doc?.instructorTitle, instructorTraining.title),
      description: pick(doc?.instructorDescription, instructorTraining.description),
      tiers: pick(doc?.instructorTiers, instructorTraining.tiers),
      note: pick(doc?.instructorNote, instructorTraining.note),
    },
    addOns: {
      eyebrow: pick(doc?.addOnsEyebrow, "Doplňkové služby"),
      title: pick(doc?.addOnsTitle, "Jednotlivé jízdy a další služby"),
      description: pick(
        doc?.addOnsDescription,
        "Ceny za jednotlivé úkony nad rámec kurzu a samostatné služby.",
      ),
      items: pick(doc?.addOns, addOns),
      note: pick(
        doc?.addOnsNote,
        "Ceny jsou orientační. Konkrétní nabídku a podmínky splátek vám rádi potvrdíme na vyžádání.",
      ),
    },
    faq: {
      eyebrow: pick(doc?.faqEyebrow, "Časté dotazy"),
      title: pick(doc?.faqTitle, "Na co se nejčastěji ptáte"),
      description: pick(doc?.faqDescription, "Nenašli jste odpověď? Zavolejte nám, rádi poradíme."),
      items: pick(doc?.faqs, faqs),
    },
  };
}

type AboutDoc = {
  aboutEyebrow?: string;
  aboutTitle?: string;
  aboutDescription?: string;
  aboutPoints?: string[];
  aboutInstructorName?: string;
  aboutInstructorRole?: string;
  aboutHighlights?: { value: string; label: string }[];
  aboutLicense?: string;
  aboutExpertiseTitle?: string;
  aboutExpertiseText?: string;
  aboutExpertise?: string[];
  aboutEducationTitle?: string;
  aboutEducation?: Education[];
};

const defaultAboutPoints = [
  "Roky praxe a tisíce odjetých hodin výcviku",
  "Nadšenec do aut a motorsportu, řízení vás naučí s citem",
  "Individuální tempo a lidský přístup ke každému žákovi",
];

export async function getAboutContent() {
  const doc = await sanityFetch<AboutDoc>(aboutQuery);

  return {
    eyebrow: pick(doc?.aboutEyebrow, "Něco o mně"),
    title: pick(doc?.aboutTitle, "Za volantem i za katedrou jeden člověk"),
    description: pick(
      doc?.aboutDescription,
      `${site.owner} vede autoškolu s důrazem na osobní přístup. Žádný anonymní řetězec. Víte, s kým jezdíte, a tomu odpovídá i kvalita výuky.`,
    ),
    points: pick(doc?.aboutPoints, defaultAboutPoints),
    instructorName: pick(doc?.aboutInstructorName, site.owner),
    instructorRole: pick(
      doc?.aboutInstructorRole,
      `Zakladatel a lektor autoškoly ${site.name}`,
    ),
    highlights: pick(doc?.aboutHighlights, instructorHighlights),
    license: pick(doc?.aboutLicense, instructorLicense),
    expertiseTitle: pick(doc?.aboutExpertiseTitle, "Zkušenosti z oboru"),
    expertiseText: pick(
      doc?.aboutExpertiseText,
      "Přes tři desetiletí v autodopravě, státní správě i dohledu nad silničním provozem. Znalosti, které se přímo promítají do kvality výuky.",
    ),
    expertise: pick(doc?.aboutExpertise, instructorExpertise),
    educationTitle: pick(doc?.aboutEducationTitle, "Vzdělání"),
    education: pick(doc?.aboutEducation, instructorEducation),
  };
}

// ---------------------------------------------------------------------------
// Site settings (brand + contact), used across layout, footer, contact page
// ---------------------------------------------------------------------------

type SiteSettingsDoc = {
  name?: string;
  fullName?: string;
  owner?: string;
  phone?: string;
  email?: string;
  web?: string;
  bankAccount?: string;
  address?: { street?: string; city?: string };
  hours?: { weekdays?: string; weekend?: string };
  mapQuery?: string;
};

export type ResolvedSite = {
  name: string;
  fullName: string;
  owner: string;
  phone: string;
  phoneHref: string;
  email: string;
  web: string;
  webHref: string;
  bankAccount: string;
  address: { street: string; city: string };
  hours: { weekdays: string; weekend: string };
  mapQuery: string;
};

function telHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `tel:+${digits.length === 9 ? "420" + digits : digits}`;
}

export async function getSiteSettings(): Promise<ResolvedSite> {
  const doc = await sanityFetch<SiteSettingsDoc>(siteSettingsQuery);
  const phone = pick(doc?.phone, site.phone);
  const web = pick(doc?.web, site.web);

  return {
    name: pick(doc?.name, site.name),
    fullName: pick(doc?.fullName, site.fullName),
    owner: pick(doc?.owner, site.owner),
    phone,
    phoneHref: phone === site.phone ? site.phoneHref : telHref(phone),
    email: pick(doc?.email, site.email),
    web,
    webHref: web === site.web ? site.webHref : `https://${web}`,
    bankAccount: pick(doc?.bankAccount, site.bankAccount),
    address: {
      street: pick(doc?.address?.street, site.address.street),
      city: pick(doc?.address?.city, site.address.city),
    },
    hours: {
      weekdays: pick(doc?.hours?.weekdays, site.hours.weekdays),
      weekend: pick(doc?.hours?.weekend, site.hours.weekend),
    },
    mapQuery: pick(doc?.mapQuery, site.mapQuery),
  };
}

// ---------------------------------------------------------------------------
// Home page
// ---------------------------------------------------------------------------

export type IconCard = { iconKey?: string; title: string; text: string };
export type StatItem = { value: number; prefix?: string; suffix?: string; label: string };
export type CtaBand = { title: string; text: string; ctaLabel: string; ctaHref: string };

type HomeDoc = {
  heroTitleLine1?: string;
  heroTitleLine2?: string;
  heroSubtitle?: string;
  heroCtaLabel?: string;
  heroCtaHref?: string;
  stats?: StatItem[];
  whyEyebrow?: string;
  whyTitle?: string;
  whyDescription?: string;
  features?: { icon?: string; title: string; text: string }[];
  vehicleEyebrow?: string;
  vehicleTitle?: string;
  vehicleDescription?: string;
  vehicleSpecs?: string[];
  marquee?: string[];
  packagesEyebrow?: string;
  packagesTitle?: string;
  packagesDescription?: string;
  testimonialsEyebrow?: string;
  testimonialsTitle?: string;
  testimonialsDescription?: string;
  testimonials?: Testimonial[];
  faqEyebrow?: string;
  faqTitle?: string;
  faqDescription?: string;
  cta?: CtaBand;
};

const defaultMarquee = [
  "Výcvik v BMW X2",
  "Individuální přístup",
  "Splátky bez navýšení",
  "Vysoká úspěšnost",
  "Video záznam z jízd",
  "Přednostní plánování",
  "Liberec a okolí",
];

const defaultStats: StatItem[] = [
  { value: 30, suffix: "", label: "hodin praktických jízd ve standardu" },
  { value: 5, suffix: "", label: "balíčků kurzů na výběr" },
  { value: 17999, suffix: " Kč", prefix: "od ", label: "cena základního kurzu" },
  { value: 3, suffix: "", label: "splátky bez navýšení" },
];

const defaultFeatures: IconCard[] = [
  { iconKey: "users", title: "Individuální přístup", text: "Žádné přeplněné skupiny. Jeden lektor, jeden žák a tempo přizpůsobené vám." },
  { iconKey: "gauge", title: "Výcvik v BMW X2", text: "Trénujete v moderním voze s asistenčními systémy a možností video záznamu." },
  { iconKey: "shield-check", title: "Vysoká úspěšnost", text: "Důsledná příprava na zkoušky z provozu i testů. Jdete na zkoušku připraveni." },
  { iconKey: "sparkles", title: "Komfort navíc", text: "Splátky bez navýšení, přednostní plánování i odvoz z domu u VIP balíčků." },
];

function mapIconCards(
  items: { icon?: string; title: string; text: string }[] | undefined,
  fallback: IconCard[],
): IconCard[] {
  if (!items || items.length === 0) return fallback;
  return items.map((i) => ({ iconKey: i.icon, title: i.title, text: i.text }));
}

export async function getHomeContent() {
  const doc = await sanityFetch<HomeDoc>(homePageQuery);

  return {
    hero: {
      titleLine1: pick(doc?.heroTitleLine1, "Jiná liga."),
      titleLine2: pick(doc?.heroTitleLine2, "Autoškola v Liberci."),
      subtitle: pick(
        doc?.heroSubtitle,
        "Individuální přístup, výcvik v BMW X2 a vysoká úspěšnost u zkoušek. Začít můžete prakticky ihned.",
      ),
      ctaLabel: pick(doc?.heroCtaLabel, "Zjistit ceny"),
      ctaHref: pick(doc?.heroCtaHref, "/cenik"),
    },
    stats: pick(doc?.stats, defaultStats),
    why: {
      eyebrow: pick(doc?.whyEyebrow, "Proč Royal Cars"),
      title: pick(doc?.whyTitle, "Autoškola, která hraje jinou ligu"),
      description: pick(
        doc?.whyDescription,
        "Spojujeme moderní vůz, zkušené lektory a férové podmínky. Cílem je, abyste řídili s jistotou, ne jen prošli zkouškou.",
      ),
      features: mapIconCards(doc?.features, defaultFeatures),
    },
    vehicle: {
      eyebrow: pick(doc?.vehicleEyebrow, "Náš vůz"),
      title: pick(doc?.vehicleTitle, "Učte se v BMW X2"),
      description: pick(
        doc?.vehicleDescription,
        "Výcvikový vůz, který vás bude bavit. Výkon, asistenční systémy a komfort, na který se spolehnete od první jízdy.",
      ),
      specs: pick(doc?.vehicleSpecs, vehicleSpecs),
    },
    marquee: pick(doc?.marquee, defaultMarquee),
    packages: {
      eyebrow: pick(doc?.packagesEyebrow, "Ceník"),
      title: pick(doc?.packagesTitle, "Vyberte si svůj balíček"),
      description: pick(
        doc?.packagesDescription,
        "Od základního kurzu po plný VIP servis. Všechny balíčky lze rozložit do splátek bez navýšení.",
      ),
    },
    testimonials: {
      eyebrow: pick(doc?.testimonialsEyebrow, "Reference"),
      title: pick(doc?.testimonialsTitle, "Co říkají naši žáci"),
      description: pick(
        doc?.testimonialsDescription,
        "Zkušenosti lidí, kteří u nás získali řidičák nebo si obnovili jistotu za volantem.",
      ),
      items: pick(doc?.testimonials, testimonials),
    },
    faq: {
      eyebrow: pick(doc?.faqEyebrow, "Časté dotazy"),
      title: pick(doc?.faqTitle, "Na co se nejčastěji ptáte"),
      description: pick(doc?.faqDescription, "Nenašli jste odpověď? Zavolejte nám, rádi poradíme."),
    },
    cta: {
      title: pick(doc?.cta?.title, "Začněte s řidičákem ještě dnes"),
      text: pick(
        doc?.cta?.text,
        "Ozvěte se nám a domluvíme termín nástupu, který vám sedne. Bez front a zbytečného čekání.",
      ),
      ctaLabel: pick(doc?.cta?.ctaLabel, "Chci řidičák"),
      ctaHref: pick(doc?.cta?.ctaHref, "/kontakt"),
    },
  };
}

// ---------------------------------------------------------------------------
// Services page
// ---------------------------------------------------------------------------

type ServicesDoc = {
  headerEyebrow?: string;
  headerTitle?: string;
  headerDescription?: string;
  services?: { icon?: string; title: string; text: string }[];
  vehicleEyebrow?: string;
  vehicleTitle?: string;
  vehicleDescription?: string;
  vehicleSpecs?: string[];
  consultingEyebrow?: string;
  consultingTitle?: string;
  consultingDescription?: string;
  consultingAreas?: string[];
  stepsEyebrow?: string;
  stepsTitle?: string;
  steps?: { n: string; title: string; text: string }[];
  cta?: CtaBand;
};

const defaultServices: IconCard[] = [
  { iconKey: "car", title: "Kurz skupiny B", text: "Kompletní výuka teorie a praktický výcvik v moderním BMW X2. Připravíme vás na obě části zkoušky." },
  { iconKey: "zap", title: "Rychlokurz", text: "Potřebujete řidičák co nejdříve? Přednostní plánování jízd a maximální tempo bez čekání." },
  { iconKey: "refresh", title: "Kondiční jízdy", text: "Pro řidiče, kteří si chtějí obnovit jistotu za volantem. Jízdy 45 i 90 minut dle potřeby." },
  { iconKey: "badge-check", title: "Vrácení řidičského průkazu", text: "Pomůžeme vám zpět do provozu, přezkoušení i kondiční jízdy v jednom balíčku." },
  { iconKey: "graduation-cap", title: "Školení řidičů", text: "Školení začínajících řidičů i profesní příprava. Bezpečná a sebejistá jízda v praxi." },
  { iconKey: "truck", title: "Kurz skupiny D", text: "Rozšíření na autobus, samostatně i ze skupiny B. Pro ty, kdo to s řízením myslí profesionálně." },
];

const defaultSteps = [
  { n: "01", title: "Přihlášení", text: "Ozvěte se telefonicky nebo přes formulář. Domluvíme termín nástupu." },
  { n: "02", title: "Teorie", text: "Projdeme pravidla provozu, zdravovědu i techniku vozidla." },
  { n: "03", title: "Praktické jízdy", text: "Sednete za volant BMW X2 a pod vedením lektora získáte jistotu." },
  { n: "04", title: "Zkoušky", text: "Připraveni jdete na test i jízdu. A pak už jen pro řidičák." },
];

export async function getServicesContent() {
  const doc = await sanityFetch<ServicesDoc>(servicesPageQuery);

  return {
    header: {
      eyebrow: pick(doc?.headerEyebrow, "Naše služby"),
      title: pick(doc?.headerTitle, "Vše pro váš řidičák na jednom místě"),
      description: pick(
        doc?.headerDescription,
        "Od prvního sednutí za volant po vrácení řidičáku. Vyberte si službu, která vám sedne, o zbytek se postaráme my.",
      ),
    },
    services: mapIconCards(doc?.services, defaultServices),
    vehicle: {
      eyebrow: pick(doc?.vehicleEyebrow, "Výcvikový vůz"),
      title: pick(doc?.vehicleTitle, "BMW X2, ve kterém se učíte"),
      description: pick(
        doc?.vehicleDescription,
        "Moderní vůz s asistenčními systémy, který vám usnadní začátky a zároveň vás naučí pracovat s technikou, kterou potkáte v praxi.",
      ),
      specs: pick(doc?.vehicleSpecs, vehicleSpecs),
    },
    consulting: {
      eyebrow: pick(doc?.consultingEyebrow, "Poradenství"),
      title: pick(doc?.consultingTitle, "Poradenství a zastupování"),
      description: pick(
        doc?.consultingDescription,
        "Nabízíme pomoc, konzultace i zastoupení jako obecný zmocněnec v oblastech dopravy a vozidel. Dopravní přestupky řešíme i ve správním řízení, včetně případů, kde hrozí vysoké sankce nebo zákaz činnosti.",
      ),
      areas: pick(doc?.consultingAreas, consultingAreas),
    },
    steps: {
      eyebrow: pick(doc?.stepsEyebrow, "Jak to probíhá"),
      title: pick(doc?.stepsTitle, "Čtyři kroky k řidičáku"),
      items: pick(doc?.steps, defaultSteps),
    },
    cta: {
      title: pick(doc?.cta?.title, "Nevíte, co si vybrat?"),
      text: pick(
        doc?.cta?.text,
        "Zavolejte nám nebo napište, poradíme vám s výběrem služby i termínem nástupu.",
      ),
      ctaLabel: pick(doc?.cta?.ctaLabel, "Kontaktovat autoškolu"),
      ctaHref: pick(doc?.cta?.ctaHref, "/kontakt"),
    },
  };
}

// ---------------------------------------------------------------------------
// Contact page
// ---------------------------------------------------------------------------

type ContactDoc = {
  headerEyebrow?: string;
  headerTitle?: string;
  headerDescription?: string;
  instructorName?: string;
  instructorRole?: string;
  infoSubtext?: string;
  formHeading?: string;
  formSubtext?: string;
  showroomEyebrow?: string;
  showroomTitle?: string;
  showroomDescription?: string;
};

export async function getContactContent() {
  const doc = await sanityFetch<ContactDoc>(contactPageQuery);

  return {
    header: {
      eyebrow: pick(doc?.headerEyebrow, "Kontakt"),
      title: pick(doc?.headerTitle, "Domluvme se na nástupu"),
      description: pick(
        doc?.headerDescription,
        "Zavolejte, napište nebo vyplňte formulář. Ozveme se vám co nejdříve a probereme termín i vhodný balíček.",
      ),
    },
    instructorName: pick(doc?.instructorName, site.owner),
    instructorRole: pick(doc?.instructorRole, `Zakladatel a lektor autoškoly ${site.name}`),
    infoSubtext: pick(doc?.infoSubtext, "Těšíme se na vás v naší učebně v Liberci."),
    formHeading: pick(doc?.formHeading, "Nezávazná poptávka"),
    formSubtext: pick(doc?.formSubtext, "Vyplňte formulář a my se vám ozveme."),
    showroom: {
      eyebrow: pick(doc?.showroomEyebrow, "Kde nás najdete"),
      title: pick(doc?.showroomTitle, "Naše učebna v Liberci"),
      description: pick(
        doc?.showroomDescription,
        "Zastavte se u nás v moderní učebně v Doubí. Rádi vám vše ukážeme a probereme termín nástupu.",
      ),
    },
  };
}

export type PostSummary = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  coverImage?: SanityImageSource;
};

export type PostDetail = PostSummary & {
  body?: PortableTextBlock[];
};

export async function getPosts(): Promise<PostSummary[]> {
  return (await sanityFetch<PostSummary[]>(postsQuery)) ?? [];
}

export async function getPostSlugs(): Promise<string[]> {
  const rows = await sanityFetch<{ slug: string }[]>(postSlugsQuery);
  return (rows ?? []).map((r) => r.slug).filter(Boolean);
}

export async function getPost(slug: string): Promise<PostDetail | null> {
  return await sanityFetch<PostDetail>(postBySlugQuery, { slug });
}
