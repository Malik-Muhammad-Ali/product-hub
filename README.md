# BroCommerce

An editorial-luxury blog for BroCommerce — an ecommerce journal covering the products, makers, and ideas worth shopping. Built with Next.js (App Router, TypeScript), Tailwind CSS v4, shadcn/ui, and Framer Motion.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4** — theme tokens defined in `app/globals.css` via `@theme`
- **shadcn/ui** (Base UI primitives) — `components/ui/`
- **Framer Motion** (`motion` package) — scroll reveals, stagger grids, page transitions

## Content

Blog posts are mock data in `data/posts.json`, typed via `types/blog.ts`. All reads go through `lib/posts.ts`, which exposes async functions (`getAllPosts`, `getPostBySlug`, `getFeaturedPosts`, etc.) so a future Supabase-backed admin panel can replace the JSON-backed implementation without touching any components.

Images currently come from [Picsum Photos](https://picsum.photos) placeholders — swap in real product/editorial photography before launch.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build (also runs TypeScript checks)
- `npm run start` — serve the production build
- `npm run lint` — ESLint
