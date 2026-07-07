import { site } from "@/lib/site";
import type { ResolvedSite } from "@/lib/content";
import type { Faq } from "@/lib/data";

/** Renders a schema.org JSON-LD block. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function drivingSchoolJsonLd(s: ResolvedSite) {
  return {
    "@context": "https://schema.org",
    "@type": "DrivingSchool",
    "@id": `${site.webHref}/#autoskola`,
    name: s.fullName,
    url: site.webHref,
    telephone: s.phoneHref.replace("tel:", ""),
    email: s.email,
    image: `${site.webHref}/images/hero.jpg`,
    priceRange: "17 999 Kč – 49 900 Kč",
    address: {
      "@type": "PostalAddress",
      streetAddress: s.address.street,
      addressLocality: s.address.city,
      addressCountry: "CZ",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "19:00",
      },
    ],
    founder: { "@type": "Person", name: s.owner },
    areaServed: "Liberec a okolí",
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleJsonLd(post: {
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  coverUrl?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    ...(post.coverUrl ? { image: [post.coverUrl] } : {}),
    url: `${site.webHref}/aktuality/${post.slug}`,
    author: { "@type": "Person", name: site.owner },
    publisher: { "@type": "Organization", name: site.fullName },
  };
}
