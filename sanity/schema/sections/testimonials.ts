import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonials",
  title: "Testimonials",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "Trusted by Brands & Creators",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      initialValue: "See why B2B brands and creators partner with us to grow with organic content and high-performance ad creatives.",
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: "Testimonials",
        subtitle: title,
      };
    },
  },
});
