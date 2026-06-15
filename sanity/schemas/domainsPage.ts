import { defineField, defineType } from "sanity";

export const domainsPage = defineType({
  name: "domainsPage",
  title: "Pagina — Ambiti",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "tag",      title: "Tag",         type: "string" }),
        defineField({ name: "title",    title: "Titolo",      type: "string" }),
        defineField({ name: "subtitle", title: "Sottotitolo", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "domains",
      title: "Ambiti",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title",       title: "Titolo",               type: "string" }),
          defineField({ name: "description", title: "Descrizione espansa",  type: "text", rows: 5 }),
          defineField({
            name: "useCases",
            title: "Casi d'uso",
            type: "array",
            of: [{ type: "string" }],
          }),
          defineField({
            name: "tools",
            title: "Tool e tecnologie",
            type: "array",
            of: [{ type: "string" }],
          }),
          defineField({
            name: "tags",
            title: "Tag (etichette brevi)",
            type: "array",
            of: [{ type: "string" }],
          }),
        ],
        preview: { select: { title: "title" } },
      }],
    }),
    defineField({ name: "seoTitle",       title: "Titolo SEO",      type: "string" }),
    defineField({ name: "seoDescription", title: "Descrizione SEO", type: "text", rows: 3 }),
  ],
  preview: { prepare: () => ({ title: "Ambiti" }) },
});
