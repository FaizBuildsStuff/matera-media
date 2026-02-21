# Matera Media — Project Context for AI

**Copy and paste this file when you need an AI (or human) to understand this codebase quickly.**

---

## 1. Project Overview

**Matera Media** is a marketing website for a B2B growth and YouTube production agency. The site showcases services (Ad Creatives, Organic Content/YouTube, SaaS Videos), portfolio work, pricing, FAQs, and booking via Calendly.

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **CMS:** Sanity (headless) for all pages — Home, Ad Creatives, Organic Content/YouTube, SaaS Videos, Privacy Policy
- **Animations:** GSAP + ScrollTrigger
- **Theme:** Dark green (#05180D base), emerald accents

---

## 2. Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16, React 19 |
| Styling | Tailwind CSS v4 |
| CMS | Sanity v5 |
| Animations | GSAP, ScrollTrigger |
| UI Primitives | Radix UI, shadcn/ui |
| Fonts | Geist, Instrument Sans, Instrument Serif |
| Smooth Scroll | Lenis |

---

## 3. Folder Structure

```
matera-media/
├── app/
│   ├── layout.tsx          # Root layout (Header, fonts, SmoothScroll)
│   ├── page.tsx            # Home (Sanity-driven sections)
│   ├── ad-creatives/       # Service page: Ad Creatives
│   ├── organic-content-youtube/
│   ├── saas-videos/
│   ├── privacy-policy/
│   └── studio/[[...tool]]/ # Sanity Studio at /studio
├── components/
│   ├── Header.tsx          # Fixed nav: logo left, links (Privacy, Ad Creatives, etc.)
│   ├── Footer.tsx          # CTA, menu links, legal
│   ├── SectionRenderer.tsx # Maps Sanity sections → React components
│   ├── SectionMerge.tsx    # Gradient overlay for section color transitions
│   ├── Hero.tsx
│   ├── WorkShowcase.tsx    # Category filter + reel grid, GSAP animations
│   ├── HowItWorks.tsx
│   ├── pricing.tsx
│   ├── testimonials.tsx
│   ├── FAQ.tsx
│   ├── CalendlyWidget.tsx
│   ├── SmoothScroll.tsx
│   └── ui/                 # shadcn components
├── lib/
│   ├── sanity.ts           # Sanity client
│   └── queries.ts          # GROQ page query
├── sanity/
│   ├── schema/             # Sanity schemas (hero, workShowcase, pricing, etc.)
│   └── sanity.config.ts
├── theme/
│   └── colors.ts           # Brand colors, backgrounds, effects
├── scripts/
│   └── seed-sanity.ts      # Seed Sanity with default content
└── PROJECT.md              # This file
```

---

## 4. Pages & Routes

| Route | Type | Content |
|-------|------|---------|
| `/` | Home | Sanity-driven sections via SectionRenderer |
| `/ad-creatives` | Service | Headline, Book a Call, Our Work, Problems, Solutions, Results, Plans, Calendly, FAQs |
| `/organic-content-youtube` | Service | Same structure, different copy |
| `/saas-videos` | Service | Same structure, different copy |
| `/privacy-policy` | Legal | Written privacy policy |
| `/studio` | Sanity | CMS studio |

---

## 5. Section Color Merging

Sections use alternating backgrounds (`#05180D` base, `#062017` secondary) with `SectionMerge` gradient overlays so each section visually blends into the next.

- **SectionMerge** is placed at the bottom of each section.
- `toColor` = the next section’s background.
- Used on: ad-creatives, organic-content-youtube, saas-videos, privacy-policy.

---

## 6. Key Components

### SectionRenderer
- Receives `sections` from Sanity (or null).
- Maps `_type` to components: hero, workShowcase, howItWorks, pricing, faq, calendlyWidget, testimonials.
- If no sections, renders `DefaultSections` (hardcoded order).

### WorkShowcase
- Left: category filter (Ad Creatives, Organic Content/YouTube, SaaS Videos, Motion Graphics).
- Right: 9:16 reel cards with GSAP scroll/category-switch animations.
- Props: `content` (Sanity), `initialCategory` (for service pages).

### Pricing
- Accepts optional `content` with `label`, `title`, `subtitle`, `plans[]`.
- Plans: `name`, `description`, `features[]`, `popular`.

### CalendlyWidget
- Embeds Calendly iframe.
- Props: `content` with `title`, `subtitle`, `calendlyUrl`.

### FAQ
- Accordion. Props: `content` with `label`, `title`, `highlightedWord`, `items[]` (question, answer).

---

## 7. Sanity CMS — Managing All Content

- **Studio:** `/studio` — edit all site content from one place.
- **Home:** `pageQuery` + slug `"home"` → sections (hero, workShowcase, howItWorks, pricing, faq, calendlyWidget, testimonials).
- **Service pages:** `servicePageQuery` + slug `"ad-creatives"` | `"organic-content-youtube"` | `"saas-videos"` → headline, book a call, problems, solutions, results, plans, calendly, FAQ.
- **Legal:** `legalPageQuery` + slug `"privacy-policy"` → title, subtitle, lastUpdated, content (heading + body sections).
- **Structure (Studio sidebar):** Home Page, Ad Creatives Page, Organic Content/YouTube Page, SaaS Videos Page, Privacy Policy. Each opens the corresponding document.
- **Seed:** `npm run seed:sanity` — creates/overwrites Home + all three service pages + Privacy Policy with default copy (requires `SANITY_API_TOKEN` in `.env`).
- **Env:** `.env.example` lists `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`.

---

## 8. Theme Colors (theme/colors.ts)

- **Base:** `#05180D`
- **Secondary:** `#062017`
- **Tertiary:** `#0A2A1B`
- **Primary:** `#10B981` (emerald)
- **Accent:** `#0D9488` (turquoise)

---

## 9. Adding a New Section

1. Create Sanity schema in `sanity/schema/sections/`.
2. Add section type to `SectionRenderer` (SectionBlock union + switch case).
3. Create or reuse a React component.
4. Register in Sanity structure if needed.

---

## 10. Adding a New Page

1. Create `app/[route]/page.tsx`.
2. Add link in `Header.tsx` and `Footer.tsx`.
3. Use `SectionMerge` between sections for color blending.
4. Reuse: WorkShowcase, Pricing, CalendlyWidget, FAQ with page-specific `content`.

---

## 11. Scripts

```bash
npm run dev        # Next.js dev server
npm run build      # Production build
npm run studio     # Sanity Studio (separate process)
npm run seed:sanity # Seed Sanity (needs SANITY_API_TOKEN)
```

---

## 12. Environment Variables

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN` (for seed script)

---

## 13. Conventions

- **Client components:** `"use client"` for GSAP, state, interactivity.
- **Server components:** Default for pages; fetch Sanity server-side.
- **Keys:** Use `_key` from Sanity or `plan.name` / `index` for lists.
- **IDs:** Section IDs like `#work`, `#schedule`, `#faq`, `#pricing` for anchor links.
