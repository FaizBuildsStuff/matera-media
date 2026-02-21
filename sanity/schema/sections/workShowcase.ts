import { defineField, defineType } from "sanity";

export const workItem = defineType({
  name: "workItem",
  title: "Work Item",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Ad Creatives", value: "Ad Creatives" },
          { title: "Organic Content / YouTube", value: "Organic Content" },
          { title: "SaaS Videos", value: "SaaS Videos" },
          { title: "Motion Graphics", value: "Motion Graphics" },
        ],
      },
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description: "Upload an image or leave empty if using video",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "YouTube video URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID). If provided, video will be shown instead of image.",
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
      description: "Optional link when clicking the work item",
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Work Item" };
    },
  },
});

export default defineType({
  name: "workShowcase",
  title: "Work Showcase",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "Selected Works",
    }),
    defineField({
      name: "highlightedWord",
      title: "Highlighted Word",
      type: "string",
      initialValue: "Works",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "items",
      title: "Work Items",
      type: "array",
      of: [{ type: "workItem" }],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: "Work Showcase",
        subtitle: title,
      };
    },
  },
});
