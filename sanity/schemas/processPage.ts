import { defineField, defineType } from "sanity";

export const processPage = defineType({
  name: "processPage",
  title: "Pagina — Come lavoriamo",
  type: "document",
  fields: [
    /* ── Hero ── */
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "tag",      title: "Tag (es. 'Come lavoriamo')", type: "string" }),
        defineField({ name: "title",    title: "Titolo",    type: "string" }),
        defineField({ name: "subtitle", title: "Sottotitolo", type: "text", rows: 3 }),
      ],
    }),

    /* ── Steps ── */
    defineField({
      name: "steps",
      title: "Fasi del processo",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "num",     title: "Numero (es. 01)", type: "string" }),
          defineField({ name: "name",    title: "Nome fase",       type: "string" }),
          defineField({ name: "title",   title: "Titolo espanso",  type: "string" }),
          defineField({ name: "summary", title: "Descrizione breve", type: "text", rows: 2 }),
          defineField({
            name: "details",
            title: "Dettagli (corpo)",
            type: "array",
            of: [{ type: "block" }],
          }),
          defineField({
            name: "outputs",
            title: "Output della fase (lista)",
            type: "array",
            of: [{ type: "string" }],
          }),
        ],
        preview: { select: { title: "num", subtitle: "name" } },
      }],
    }),

    /* ── Engagement Models ── */
    defineField({
      name: "models",
      title: "Modelli di ingaggio",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title",   title: "Titolo",      type: "string" }),
          defineField({ name: "desc",    title: "Descrizione", type: "text", rows: 4 }),
          defineField({ name: "ideal",   title: "Ideale per",  type: "text", rows: 2 }),
          defineField({
            name: "tags",
            title: "Tag",
            type: "array",
            of: [{ type: "string" }],
          }),
        ],
        preview: { select: { title: "title" } },
      }],
    }),

    /* ── FAQ ── */
    defineField({
      name: "faqs",
      title: "FAQ",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "question", title: "Domanda", type: "string" }),
          defineField({ name: "answer",   title: "Risposta", type: "text", rows: 4 }),
        ],
        preview: { select: { title: "question" } },
      }],
    }),

    /* ── Case study in evidenza ── */
    defineField({
      name: "featuredCaseStudies",
      title: "Case study in evidenza",
      type: "array",
      of: [{ type: "reference", to: [{ type: "caseStudy" }] }],
      validation: (R) => R.max(3),
    }),

    /* ── SEO ── */
    defineField({ name: "seoTitle",       title: "Titolo SEO",       type: "string" }),
    defineField({ name: "seoDescription", title: "Descrizione SEO",  type: "text", rows: 3 }),
  ],

  preview: { prepare: () => ({ title: "Come lavoriamo" }) },
});
