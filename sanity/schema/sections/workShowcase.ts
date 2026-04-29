import { defineField, defineType } from "sanity";

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
      title: "Category",
      type: "string",
      description: "Category name (should match one of the defined categories)",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "image",
      title: "Thumbnail / Cover Image",
      type: "image",
      options: { hotspot: true },
      description: "This shows as the preview or if no video is provided.",
    }),
    defineField({
      name: "videoSource",
      title: "Video Source",
      type: "string",
      options: {
        list: [
          { title: "Direct Upload (UploadThing)", value: "uploadthing" },
          { title: "YouTube URL", value: "youtube" },
          { title: "Upload Video (Sanity File)", value: "file" },
          { title: "None (Image Only)", value: "none" },
        ],
        layout: "radio",
      },
      initialValue: "uploadthing",
    }),
    defineField({
      name: "uploadThingUrl",
      title: "UploadThing Video URL",
      type: "string",
      description: "The URL from UploadThing.",
      hidden: ({ parent }) => parent?.videoSource !== "uploadthing",
    }),
    defineField({
      name: "videoFile",
      title: "Sanity Video Upload",
      type: "file",
      description: "Upload MP4/WebM videos directly to Sanity.",
      options: {
        accept: "video/*",
      },
      hidden: ({ parent }) => parent?.videoSource !== "file",
    }),
    defineField({
      name: "videoUrl",
      title: "YouTube URL",
      type: "url",
      description: "e.g., https://www.youtube.com/watch?v=...",
      hidden: ({ parent }) => parent?.videoSource !== "youtube",
    }),
    defineField({
      name: "link",
      title: "External Link",
      type: "url",
      description: "Optional link when clicking the item",
    }),
  ],
  preview: {
    select: { title: "title", media: "image" },
    prepare({ title, media }) {
      return { 
        title: title || "Work Item",
        media: media 
      };
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
        defineType({
          name: "categoryItem",
          title: "Category Item",
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "slug", title: "Slug", type: "string" },
          ],
        }),
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