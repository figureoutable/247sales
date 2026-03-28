# Figures — Oddly Satisfying Accounting

Professional website for Figures, a UK-based accounting and advisory firm. Built with Next.js, TypeScript, Tailwind CSS, Sanity CMS, and [Kokonut UI](https://kokonutui.com/).

## Tech stack

- **Next.js 16** (App Router) with TypeScript
- **Tailwind CSS** for styling
- **Kokonut UI** + **shadcn/ui** for components (Shape Hero, Card Flip, Accordion)
- **Sanity CMS** for blog posts
- Any **Next.js-compatible host** for production deployment

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in:

- **Sanity**: Create a project at [sanity.io](https://sanity.io), then set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`. The blog will show “No posts yet” until you add content in Sanity Studio.
- **Contact form**: To send form submissions by email, add a [Resend](https://resend.com) API key as `RESEND_API_KEY` and optionally `RESEND_FROM`. Without these, submissions are logged to the server only.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Deploy to production

- Push to your Git remote and deploy with your hosting provider’s Next.js workflow.
- Add the same environment variables in the host’s project settings.

## Sanity Studio (blog)

The site reads blog posts from Sanity via GROQ. To manage content:

1. Create a Sanity project and add the project ID to `.env.local`.
2. In your Sanity project, create a **post** type with: `title`, `slug`, `category` (reference), `publishedAt`, `mainImage`, `excerpt`, `body` (block content).
3. Optionally run [Sanity Studio](https://www.sanity.io/docs/getting-started-with-sanity-studio) in a separate repo or embed it in this one, and deploy it to manage posts.

Schema reference is in `src/sanity/schema.ts`.

## Pages

- **Home** — Hero, services overview, why Figures, testimonials, about teaser, blog preview, FAQ, CTA
- **Services** — Full list with descriptions and “who it’s for”
- **About** — Josh’s background, engagements, Figures story, mission
- **Blog** — Grid of posts from Sanity; each post has its own page
- **Contact** — Form (to `joshua@tryfigures.com` via Resend) and Cal.com link

## Customisation

- **Copy**: Testimonials and FAQ text are in `src/lib/constants.ts`. Replace with your final copy when ready.
- **Cal.com**: All “Schedule a call” links use `https://cal.com/figures/discovery`. Update `CAL_LINK` in `src/lib/constants.ts` if your link changes.
- **Social links**: Edit `SOCIAL_LINKS` in `src/lib/constants.ts` (YouTube, TikTok, Instagram, LinkedIn).
- **Colours & font**: Brand colours and Plus Jakarta Sans are in `src/app/globals.css` and `src/app/layout.tsx`.

## Scripts

- `npm run dev` — Development server
- `npm run build` — Production build
- `npm run start` — Run production build locally
- `npm run lint` — ESLint

### Blog post generator (`scripts/generate-blog-post.mjs`)

Requires `OPENAI_API_KEY`. Each run writes a body file, updates `generated-posts.ts`, and saves a **hero image prompt** under `scripts/hero-image-prompts/local-{id}.txt`. The model is instructed to propose **colourful, high-contrast** scenes and to **avoid beige / cream-only / grey-washed stock** aesthetics; the same rules are prepended to every saved prompt so future images stay on-brand visually.
