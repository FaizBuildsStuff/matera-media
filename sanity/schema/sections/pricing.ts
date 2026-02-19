import { defineField, defineType } from "sanity";

export const pricingPlan = defineType({
  name: "pricingPlan",
  title: "Pricing Plan",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Plan Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      description: "e.g. $2,500 or Custom",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "period",
      title: "Period",
      type: "string",
      description: "e.g. /project, /month, or leave empty",
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

export default defineType({
  name: "pricing",
  title: "Pricing",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Section Label",
      type: "string",
      initialValue: "Investment",
    }),
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "Transparent Pricing.",
    }),
    defineField({
      name: "highlightedWord",
      title: "Highlighted Word",
      type: "string",
      initialValue: "Pricing.",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "plans",
      title: "Pricing Plans",
      type: "array",
      of: [{ type: "pricingPlan" }],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: "Pricing",
        subtitle: title,
      };
    },
  },
});
