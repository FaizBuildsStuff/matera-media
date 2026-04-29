import { defineField, defineType, defineArrayMember } from "sanity";

export const workItem = defineType({
  name: "workItem",
  title: "Work Item",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category Slug",
      type: "string",
      description: "Must match one of the categories defined in the Showcase section.",
    }),
    defineField({
      name: "videoSource",
      title: "Video Source",
      type: "string",
      options: {
        list: [
          { title: "UploadThing (Direct)", value: "uploadthing" },
          { title: "YouTube / URL", value: "youtube" },
          { title: "Sanity File", value: "file" },
          { title: "None (Static)", value: "none" },
        ],
      },
    }),
    defineField({
      name: "uploadThingUrl",
      title: "UploadThing URL",
      type: "string",
      description: "Direct URL from UploadThing.",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "string",
      description: "YouTube or direct MP4 link.",
    }),
    defineField({
      name: "videoFile",
      title: "Video File",
      type: "file",
      options: { accept: "video/*" },
    }),
    defineField({
      name: "image",
      title: "Thumbnail / Static Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});

export default defineType({
  name: "workShowcase",
  title: "Work Showcase",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Badge Label",
      type: "string",
      initialValue: "Portfolio",
    }),
    defineField({
      name: "title",
      title: "Headline Title",
      type: "text",
      rows: 2,
      initialValue: "Our Work",
      description: "Displayed as the heading above the reel cards (e.g. 'Our Work', 'Selected Reels')",
    }),
    defineField({
      name: "highlightedWord",
      title: "Highlighted Word",
      type: "text",
      rows: 2,
      initialValue: "Works",
    }),
    defineField({
      name: "description",
      title: "Subtitle / Tagline",
      type: "text",
      rows: 2,
      description: "Short italic tagline shown below the section title (e.g. 'High-converting SaaS video content.')",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          name: "categoryItem",
          title: "Category Item",
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "slug", title: "Slug", type: "string" },
          ],
        },
      ],
      description: "Define the categories available for filtering.",
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