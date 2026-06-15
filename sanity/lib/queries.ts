import { groq } from "next-sanity";

export const settingsQuery = groq`*[_type == "siteSettings"][0]`;

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id, title, slug, excerpt, icon, coverImage
  }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id, title, slug, excerpt, icon, coverImage, body, seoTitle, seoDescription
  }
`;

export const caseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(publishedAt desc) {
    _id, title, slug, client, sector, excerpt, coverImage, results, publishedAt
  }
`;

export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id, title, slug, client, sector, excerpt, coverImage, results, body, publishedAt,
    services[]->{ title, slug }
  }
`;

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, excerpt, coverImage, categories, publishedAt, author
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, excerpt, coverImage, categories, body, publishedAt, author,
    seoTitle, seoDescription
  }
`;

export const partnersQuery = groq`
  *[_type == "partner" && active == true] | order(order asc) {
    _id, name, url,
    logo { asset->{ url, metadata { dimensions } }, alt }
  }
`;

export const processPageQuery = groq`
  *[_type == "processPage"][0] {
    hero,
    steps[] {
      num, name, title, summary, details, outputs
    },
    models[] {
      title, desc, ideal, tags
    },
    faqs[] { question, answer },
    featuredCaseStudies[]-> {
      _id, title, slug, client, sector, excerpt, coverImage, results
    },
    seoTitle, seoDescription
  }
`;

export const domainsPageQuery = groq`
  *[_type == "domainsPage"][0] {
    hero,
    domains[] { title, description, useCases, tools, tags },
    seoTitle, seoDescription
  }
`;

export const modelsPageQuery = groq`
  *[_type == "modelsPage"][0] {
    hero,
    models[] { title, description, ideal, includes, notFor, tags },
    faqs[] { question, answer },
    seoTitle, seoDescription
  }
`;

export const enablementPageQuery = groq`
  *[_type == "enablementPage"][0] {
    hero, intro, sectors,
    programs[] { title, description, duration, format, outcomes },
    faqs[] { question, answer },
    seoTitle, seoDescription
  }
`;

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    hero, mission,
    values[] { title, desc },
    manifesto,
    seoTitle, seoDescription
  }
`;
