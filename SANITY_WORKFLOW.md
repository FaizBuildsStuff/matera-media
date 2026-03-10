## How to wire pages & components to Sanity (step‑by‑step)

This project is already connected to Sanity.  
Use this guide when you want to:

- **Update text / content** of an existing page via Sanity
- **Add a new page** that pulls content from Sanity
- **Add new fields** to control a component via Sanity

I’ll keep this in **plain, practical steps**.

---

## 0. Prerequisites (one‑time)

- You have **Sanity Studio** running:
  - In this repo: `npm run studio`
  - Or deployed studio somewhere else.
- You have the **environment variables** set (already done in this project):
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `SANITY_API_TOKEN` (for seeding / write scripts only)

You can see example values in `.env.example`.

---

## 1. Updating content of an existing page (easiest path)

### 1.1. Find which schema the page uses

Look at the page file in `app/` and see which query it uses:

- Home page: `app/page.tsx` → uses `pageQuery`
- Service pages: `app/ad-creatives/page.tsx`, `app/organic-content-youtube/page.tsx`, `app/saas-videos/page.tsx` → use `servicePageQuery`
- Privacy Policy: `app/privacy-policy/page.tsx` → uses `legalPageQuery`
- Book call page: `app/book/page.tsx` → uses `bookingPageQuery`

Then open the query in `lib/queries.ts` to see the **fields** being fetched.

Example (`servicePageQuery`):

```ts
export const servicePageQuery = `*[_type == "servicePage" && slug == $slug][0]{
  slug,
  sectionLabel,
  headlineTitle,
  ...
}`;
```

The schema for this will be in `sanity/schema/`:

- `servicePageQuery` → `sanity/schema/servicePage.ts`
- `pageQuery` → `sanity/schema/page.ts` + nested section schemas
- `legalPageQuery` → `sanity/schema/legalPage.ts`
- `bookingPageQuery` → `sanity/schema/bookingPage.ts`

### 1.2. Change the content in Studio

1. Run `npm run studio` and open the Studio (usually at `/studio`).
2. In the **left sidebar**, you’ll see structured entries:
   - **Home Page**
   - **Ad Creatives Page**
   - **Organic Content / YouTube Page**
   - **SaaS Videos Page**
   - **Book Strategy Call Page**
   - **Privacy Policy**
3. Click the document you want (for example, **“Ad Creatives Page”**).
4. Edit the fields (title, subtitle, problems, solutions, etc.).
5. Click **Publish**.

Next.js pages are already wired to read from Sanity, so after publish + refresh, you’ll see the update.

You do **not** need to touch code for content‑only changes.

---

## 2. Add a new field to an existing Sanity document

Example: You want to add `calendlyTitle` or a new label to the booking page.

### 2.1. Add the field to the schema

1. Open the schema file, e.g. `sanity/schema/bookingPage.ts`.
2. Add a new `defineField` entry inside `fields`:

```ts
defineField({
  name: "tagline",
  title: "Small Tagline Above Title",
  type: "string",
}),
```

3. Save the file.
4. Restart the Studio if needed (`npm run studio`) and refresh the browser.
5. You should now see a **“Small Tagline Above Title”** field in the Booking Page document.

### 2.2. Make the page query fetch the new field

1. Open `lib/queries.ts`.
2. Find the query for that schema, e.g. `bookingPageQuery`.
3. Add the new field to the selection:

```ts
export const bookingPageQuery = `*[_type == "bookingPage" && _id == "booking-page"][0]{
  title,
  subtitle,
  benefits,
  trustText,
  calendlyUrl,
  tagline    // ← new
}`;
```

### 2.3. Pass it into the React component

1. Open the **page** file, e.g. `app/book/page.tsx`.
2. Update the TypeScript type and mapping:

```ts
const data = await client.fetch<{
  title?: string;
  subtitle?: string;
  benefits?: string[];
  trustText?: string;
  calendlyUrl?: string;
  tagline?: string;   // new
} | null>(bookingPageQuery);

const content: BookingPageContent | undefined = data
  ? {
      title: data.title,
      subtitle: data.subtitle ?? undefined,
      benefits: data.benefits ?? undefined,
      trustText: data.trustText ?? undefined,
      calendlyUrl: data.calendlyUrl ?? undefined,
      tagline: data.tagline ?? undefined,    // new
    }
  : undefined;
```

3. Open the **component** that actually renders the UI, e.g. `components/BookCallPage.tsx`.
4. Extend its prop type and use the value:

```ts
export type BookingPageContent = {
  title?: string;
  subtitle?: string;
  benefits?: string[];
  trustText?: string;
  calendlyUrl?: string;
  tagline?: string;      // new
};

export function BookCallPage({ content }: { content?: BookingPageContent }) {
  const title = content?.title ?? "Book your strategy call";
  const tagline = content?.tagline ?? "Strategy Session"; // fallback
  // ...
}
```

5. Use `tagline` in the JSX where you want it.

Now the new field is fully wired: **Studio → query → page → component**.

---

## 3. Add a brand‑new page that uses Sanity

Let’s say you want a new route `/new-service` managed from Sanity.

There are **three big steps**:

1. **Create a schema** in Sanity.
2. **Create a query** and wiring in Next.js.
3. (Optional but recommended) **Add it to Studio structure** so it appears in the left menu.

### Step 1 — Schema

1. Create a new file in `sanity/schema/`, e.g. `newServicePage.ts`:

```ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "newServicePage",
  title: "New Service Page",
  type: "document",
  fields: [
    defineField({ name: "slug", title: "Slug", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "subtitle", title: "Subtitle", type: "text", rows: 2 }),
    // add whatever else you need
  ],
});
```

2. Register it in `sanity/schema/index.ts`:

```ts
import newServicePage from "./newServicePage";

export const schemaTypes = [
  // ...
  newServicePage,
];
```

### Step 2 — Query + page

1. In `lib/queries.ts`, add a query:

```ts
export const newServicePageQuery = `*[_type == "newServicePage" && slug == $slug][0]{
  slug,
  title,
  subtitle
  // more fields
}`;
```

2. Create the route file `app/new-service/page.tsx`:

```ts
import { client } from "@/lib/sanity";
import { newServicePageQuery } from "@/lib/queries";

export const revalidate = 60;

export default async function NewServicePage() {
  const data = await client.fetch<{
    title?: string;
    subtitle?: string;
  } | null>(newServicePageQuery, { slug: "new-service" });

  const title = data?.title ?? "Default title";
  const subtitle = data?.subtitle ?? "Default subtitle";

  return (
    <main className="min-h-screen bg-[#05180D] text-white px-6 py-24">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          {title}
        </h1>
        <p className="text-white/70 text-lg">{subtitle}</p>
      </div>
    </main>
  );
}
```

Now `/new-service` exists and is reading from Sanity.

### Step 3 — Add it to the Studio sidebar (optional but nice)

1. Open `sanity/structure.ts`.
2. Add a new list item where you want it:

```ts
S.listItem()
  .title("New Service Page")
  .child(
    S.document()
      .schemaType("newServicePage")
      .documentId("new-service-page")
      .title("New Service Page"),
  ),
```

3. In the Studio, open **New Service Page**, set `slug` to `"new-service"` and fill in fields.
4. Publish.

---

## 4. How this pattern looks in pages you already have

You can copy patterns from existing pages:

- **Service pages** (`/ad-creatives`, `/organic-content-youtube`, `/saas-videos`):
  - Schema: `sanity/schema/servicePage.ts`
  - Query: `servicePageQuery` in `lib/queries.ts`
  - Pages: `app/ad-creatives/page.tsx`, etc.
  - They read from Sanity and fall back to hard‑coded defaults when fields are empty.

- **Book page** (`/book`):

  - Schema: `sanity/schema/bookingPage.ts`
  - Query: `bookingPageQuery` in `lib/queries.ts`
  - Page: `app/book/page.tsx` (server component – fetches from Sanity)
  - UI: `components/BookCallPage.tsx` (client component – Calendly & animations)

This gives you working examples for:

- Simple document → simple page (`/book`)
- Document with nested arrays / sections → rich page (`/ad-creatives`)

---

## 5. Seeding default content (optional)

If you add new schemas and want **starter content**:

1. Open `scripts/seed-sanity.ts`.
2. Copy the pattern used for `servicePageAdCreatives`, `servicePageOrganic`, etc.
3. Create a new object for your schema:

```ts
const bookingPage = {
  _id: "booking-page",
  _type: "bookingPage",
  title: "Book your strategy call",
  subtitle: "Let's discuss your growth goals...",
  benefits: [...],
  trustText: "🔒 Your information stays private.",
  calendlyUrl: "https://calendly.com/...",
};
```

4. Add it to the `client.createOrReplace` calls at the bottom.
5. Run:

```bash
npm run seed:sanity
```

This will push those documents into your Sanity dataset.

---

## 6. Quick checklist when “wiring to Sanity”

When you connect anything to Sanity, go through this list:

1. **Schema** added in `sanity/schema/…` and exported in `sanity/schema/index.ts`.
2. (Optional but recommended) **Structure item** added in `sanity/structure.ts` so it’s easy to find in Studio.
3. **Query** added in `lib/queries.ts` for that document type.
4. **Page** (or API route) calls `client.fetch(query, params)` and maps fields into a clean props object.
5. **Component** receives that props object and:
   - Uses **Sanity values if present**.
   - Has **good fallbacks** if Sanity is empty.
6. Test:
   - Run `npm run dev` and open the page.
   - Edit in Studio and **Publish**.
   - Refresh the page and confirm the change shows up.

If you follow these steps, you can confidently:

- Add new pages
- Add new editable fields
- Keep your components clean and design‑driven while Sanity only controls the content. 


## Please provide the code for the following:

1. sanity/schema/index.ts
I need to see this to properly register the new career schema type so it shows up in your database.

2. lib/queries.ts
I need to add the career query here so the frontend knows how to fetch the label, title, highlighted word, and the list of job roles.

3. The file where SectionRenderer is located
(Usually components/SectionRenderer.tsx or similar). I need to update the TypeScript types and the mapping logic so it passes the Sanity data into the CareersSection component instead of just rendering the default version.

4. sanity/structure.ts (Optional but Recommended)
If you want the "Careers Section" to appear in the left-hand sidebar of your Sanity Studio (like "Home Page" or "Ad Creatives"), I'll need this file to add the menu item.