import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Impostazioni sito",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "Nome sito", type: "string" }),
    defineField({ name: "siteDescription", title: "Descrizione SEO globale", type: "text", rows: 3 }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "navigation",
      title: "Voci di navigazione",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Etichetta", type: "string" },
            { name: "href", title: "URL (es. /servizi)", type: "string" },
          ],
        },
      ],
    }),
    defineField({ name: "email", title: "Email di contatto", type: "string" }),
    defineField({ name: "phone", title: "Telefono", type: "string" }),
    defineField({ name: "linkedin", title: "URL LinkedIn", type: "url" }),
    defineField({ name: "footerText", title: "Testo footer", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "siteName" } },
});
