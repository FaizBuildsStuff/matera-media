import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "headerLinks",
      title: "Header Navigation",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "href", type: "string", title: "Link (e.g. /ad-creatives)" },
          ],
        },
      ],
    }),
    defineField({
      name: "footerLinks",
      title: "Footer Navigation",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "href", type: "string", title: "Link" },
          ],
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { 
              name: "platform", 
              type: "string", 
              title: "Platform",
              options: {
                list: [
                  { title: "Twitter", value: "twitter" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Instagram", value: "instagram" },
                  { title: "YouTube", value: "youtube" },
                  { title: "Email", value: "email" },
                ]
              }
            },
            { name: "url", type: "string", title: "URL" },
          ],
        },
      ],
    }),
    defineField({
      name: "copyright",
      title: "Copyright Text",
      type: "string",
      initialValue: "MATERA MEDIA",
    }),
    defineField({
      name: "slogan",
      title: "Slogan",
      type: "string",
      initialValue: "Engineered for Attention & Revenue",
    }),
  ],
});
