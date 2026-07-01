import { groq } from "next-sanity";

export const pricingPageQuery = groq`*[_type == "pricingPage"][0]{
  headerEyebrow, headerTitle, headerDescription,
  groups[]{ id, title, subtitle },
  packages[]{ name, price, group, badge, highlight, description, features },
  skidTitle, skidDescription, skidOptions[]{ label, price },
  instructorTitle, instructorDescription, instructorTiers[]{ label, price }, instructorNote,
  addOnsEyebrow, addOnsTitle, addOnsDescription, addOns[]{ label, price }, addOnsNote,
  faqEyebrow, faqTitle, faqDescription, faqs[]{ q, a }
}`;

export const aboutQuery = groq`*[_type == "homePage"][0]{
  aboutEyebrow, aboutTitle, aboutDescription, aboutPoints,
  aboutInstructorName, aboutInstructorRole,
  aboutHighlights[]{ value, label },
  aboutLicense,
  aboutExpertiseTitle, aboutExpertiseText, aboutExpertise,
  aboutEducationTitle, aboutEducation[]{ school, detail }
}`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  name, fullName, owner, phone, email, web, bankAccount,
  address{ street, city }, hours{ weekdays, weekend }, mapQuery
}`;

export const postsQuery = groq`*[_type == "post" && !(_id in path("drafts.**"))]
  | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    coverImage
  }`;

export const postSlugsQuery = groq`*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  coverImage,
  body
}`;
