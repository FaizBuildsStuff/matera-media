import { defineField, defineType } from "sanity";

export default defineType({
  name: "calendlyWidget",
  title: "Calendly / Schedule",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "Let's Build Something Extraordinary",
    }),
    defineField({
      name: "highlightedWord",
      title: "Highlighted Word",
      type: "string",
      initialValue: "Extraordinary",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "calendlyUrl",
      title: "Calendly Embed URL",
      type: "url",
      description: "Your Calendly scheduling page URL. Leave empty to use default.",
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: "Calendly / Schedule",
        subtitle: title,
      };
    },
  },
});
