# Main Portfolio & Consultancy App

A Next.js 15 Progressive Web App (PWA) for showcasing portfolio, blog posts, and consultancy services.

## Features

- **Progressive Web App (PWA)**
  - Offline support
  - Install prompt
  - Push notifications
  - Service worker with advanced caching

- **Blog System**
  - MDX support for blog posts
  - Categories and tags
  - Search functionality
  - RSS feed ready

- **Portfolio**
  - Project showcase
  - Case studies
  - Live demos

- **Contact & Services**
  - Contact forms
  - Booking system
  - Services page

## Tech Stack

- **Framework**: Next.js 15.5.0 with App Router
- **React**: 19.1.0
- **TypeScript**: 5.9.2
- **Styling**: Tailwind CSS 4.1.13
- **PWA**: next-pwa 5.6.0
- **State Management**: @nathanhfoster/resurrection
- **UI Components**: @nathanhfoster/ui

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 9.0.0+

### Installation

From the monorepo root:

```bash
pnpm install
```

### Development

Run the development server:

```bash
cd apps/main
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Building

Build for production:

```bash
pnpm build
```

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

**Required for Push Notifications:**

Generate VAPID keys:

```bash
npx web-push generate-vapid-keys
```

Add the generated keys to `.env.local`:

```
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your-public-key
VAPID_PRIVATE_KEY=your-private-key
VAPID_EMAIL=mailto:your-email@example.com
```

## Project Structure

```
apps/main/
├── app/                   # Next.js App Router
│   ├── blog/              # Blog pages and MDX posts
│   ├── portfolio/         # Portfolio pages
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
│
├── core/                  # App-specific cross-domain features
│   └── pwa/               # PWA contexts and components
│
├── domains/               # Business domains (FSD)
│   └── Blog/              # Blog domain
│       ├── model/         # Types and state
│       ├── lib/           # MDX utilities
│       ├── hooks/         # Business logic hooks
│       └── ui/            # Presentation components
│
└── public/                # Static assets
    ├── manifest.json      # PWA manifest
    ├── offline.html       # Offline fallback
    └── icons/             # PWA icons
```

## Writing Blog Posts

Create a new MDX file in `app/blog/posts/`:

```mdx
---
title: "Your Post Title"
description: "Post description"
date: "2026-01-03"
author: "Your Name"
categories: ["Category 1", "Category 2"]
tags: ["tag1", "tag2"]
readingTime: "5 min read"
---

# Your content here

Write your blog post using Markdown and React components.
```

## PWA Icons

Generate PWA icons using:

```bash
npx pwa-asset-generator [source-logo.png] public/icons \
  --background "#FFE500" \
  --favicon \
  --type png
```

See `public/icons/README.md` for more details.

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Configure build settings:
   - **Framework**: Next.js
   - **Root Directory**: `apps/main`
   - **Build Command**: `cd ../.. && pnpm turbo build --filter=main`
   - **Output Directory**: `.next`
3. Add environment variables (VAPID keys)
4. Deploy!

### Multizone Architecture

This app is configured for multizone architecture:

- Main app at root domain (`yoursite.com`)
- Other apps at subpaths (`yoursite.com/web`, etc.)

Configure rewrites in `vercel.json` for routing between apps.

## Scripts

- `pnpm dev` - Start development server on port 3000
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm check-types` - Run TypeScript compiler

## Architecture

This app follows the monorepo's FRONTEND_ARCHITECTURE.md principles:

- **Atomic Design** in `packages/ui` only
- **Feature-Sliced Design (FSD)** for domains
- **Container/Presentation** pattern with hooks
- **Top-down dependency flow**

## License

Private - All rights reserved
