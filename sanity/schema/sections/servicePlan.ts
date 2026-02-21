import { defineField, defineType } from "sanity";

export default defineType({
  name: "servicePlan",
  title: "Service Plan",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Plan Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "popular",
      title: "Most Popular",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { name: "name" },
    prepare({ name }) {
      return { title: name || "Plan" };
    },
  },
});
