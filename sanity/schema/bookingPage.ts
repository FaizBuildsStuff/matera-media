import { defineType, defineField } from "sanity";

export default defineType({
  name: "bookingPage",
  title: "Booking Page",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),

    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 2,
    }),

    defineField({
      name: "benefits",
      title: "Benefits",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "trustText",
      title: "Trust Text",
      type: "string",
    }),

    defineField({
      name: "calendlyUrl",
      title: "Calendly URL",
      type: "url",
    }),
  ],
});