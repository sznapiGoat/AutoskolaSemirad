import { sanityFetch } from "@/sanity/fetch";
import {
  pricingPageQuery,
  aboutQuery,
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
  instructorHighlights,
  instructorLicense,
  instructorExpertise,
  instructorEducation,
  type PackageGroup,
  type Package,
  type AddOn,
  type Faq,
  type Education,
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
