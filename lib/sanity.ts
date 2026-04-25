import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = "2024-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  fetch: { cache: 'no-store' },
});

// Write client for server-side mutations
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Always disable CDN for writes
  token: process.env.SANITY_API_TOKEN,
});
