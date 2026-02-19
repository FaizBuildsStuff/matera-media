# Sanity CMS Setup

Sanity is configured as your content management system. You can edit all page content and reorder sections from the Sanity dashboard.

## 1. Create a Sanity Project

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Create a new project (or use an existing one)
3. Note your **Project ID** and **Dataset** (usually `production`)
4. Create an API token: **API** → **Tokens** → **Add API token** (use **Editor** role for the seed script)

## 2. Configure Environment

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_with_editor_role
```

## 3. Seed Content from Your Components (One-Time)

Migrate your existing hardcoded content into Sanity:

```bash
npm install
npm run seed:sanity
```

This creates the Home page in Sanity with all your Hero, Work Showcase, How It Works, Pricing, FAQ, and Calendly content. Your site will immediately show this content from Sanity and you can edit it in real-time.

## 4. Access the Studio

**Option A – Embedded Studio (recommended)**

1. Run `npm run dev`
2. Open [http://localhost:3000/studio](http://localhost:3000/studio)

**Option B – Standalone Studio**

1. Run `npm run studio`
2. Open the URL shown in the terminal (usually `http://localhost:3333`)

## 5. Edit Content

If you ran the seed script, the Home page already has all sections. Otherwise, open **Home Page** in the studio and add sections manually.
- **Drag and drop** sections to reorder them
- Edit any field and **Publish** — changes appear on your site immediately

## 6. Section Types

- **Hero** – Headline, subheadline, CTAs, video label
- **Work Showcase** – Portfolio items with title, category, tags
- **How It Works** – Process steps
- **Pricing** – Pricing plans with features
- **FAQ** – Accordion questions and answers
- **Calendly** – Scheduling embed URL

Changes appear on the site as soon as you publish.
