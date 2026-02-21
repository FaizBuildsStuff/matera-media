import { defineField, defineType } from "sanity";

export default defineType({
  name: "legalPage",
  title: "Legal Page",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Page",
      type: "string",
      initialValue: "privacy-policy",
      options: {
        list: [{ title: "Privacy Policy", value: "privacy-policy" }],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "Your privacy matters.",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 3,
      description: "Short intro below the title",
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "date",
      description: "Shown as 'Last updated: ...'",
    }),
    defineField({
      name: "content",
      title: "Policy Content",
      type: "array",
      of: [
        {
          type: "object",
          name: "policySection",
          title: "Section",
          fields: [
            { name: "heading", type: "string", title: "Heading", validation: (Rule: { required: () => any }) => Rule.required() },
            { name: "body", type: "text", title: "Body", rows: 6 },
          ],
          preview: {
            select: { heading: "heading" },
            prepare({ heading }: { heading?: string }) {
              return { title: heading || "Section" };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Legal Page" };
    },
  },
});
