# Matera Media | Frontend Architecture

Welcome to the frontend repository for the **Matera Media** agency website. This is a high-performance Next.js application built with a premium "Dark Cyber" aesthetic, featuring seamless GSAP animations, a highly dynamic component architecture, and a cutting-edge real-time visual editing experience.

## 🚀 Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: TailwindCSS
- **Animations**: GSAP (GreenSock Animation Platform)
- **Content Management**: Sanity (Decoupled & Standalone)
- **Payments**: Stripe (Checkout Sessions & Price IDs)
- **Media Management**: UploadThing

---

## 💎 Core Features & Architecture

### 1. The "Dark Cyber" Aesthetic
The platform has been completely overhauled to feature a sophisticated, high-contrast dark theme. 
- **Unified Base**: The entire application runs on an ultra-dark `bg-[#050505]` canvas.
- **Seamless Glow Bleeding**: We've eliminated harsh boundaries and `overflow-hidden` constraints across all landing page sections. This allows the subtle, multi-color ambient gradients (Cyan, Emerald, Blue, Purple) to naturally bleed and blend between components, creating a cohesive, immersive environment.

### 2. Decoupled Sanity CMS
The Sanity Studio has been fully extracted from this repository into its own standalone project folder (`/studio`). This separation of concerns keeps the Next.js frontend lightweight, prevents redundant git tracking, and streamlines the Vercel deployment pipeline.

### 3. "Triple-Tap" Visual Editing Engine
The frontend is equipped with a custom, mobile-first visual editing system that enables on-the-fly content updates without needing to open the Sanity Studio dashboard.
- **Hidden Authorization**: Administrators can access editing tools via a secure, hidden "triple-tap" sequence on the site's logo.
- **In-Place Editing**: Using custom `EditableText`, `EditableImage`, and `AddRemoveControls` components, authorized admins can directly modify copy, replace media, and reorganize lists (like FAQs or Work Showcases) right from the live page.
- **Real-Time Patching**: All edits made on the frontend are patched directly to the Sanity backend in real time, ensuring total synchronization.

### 4. Dynamic Section Rendering
The architecture is heavily modularized. A central `SectionRenderer` is responsible for mapping Sanity document schemas directly to Next.js React components. This allows the order, presence, and content of landing page sections (e.g., `Hero`, `WorkShowcase`, `Pricing`, `Testimonials`) to be completely controlled via the CMS.

### 5. Stripe Integration
The payment infrastructure has been migrated to **Stripe**, offering robust, production-ready checkout flows for all tiers, integrating seamlessly with Stripe Price IDs via API routes.

---

## 🛠 Getting Started

First, install the dependencies:

```bash
npm install
```

Set up your `.env.local` file with the required Sanity, Stripe, and UploadThing keys.

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Project Structure

- `/components`: Contains all modular UI components, including the dynamic sections rendered on the landing page.
- `/components/visual-editing`: Houses the custom interactive controls (`EditableText`, `TripleTapLogin`, etc.) used for the frontend CMS editing experience.
- `/app`: The Next.js App Router setup, including the main page layouts, API routes (e.g., Stripe checkouts), and global CSS (`index.css`).
