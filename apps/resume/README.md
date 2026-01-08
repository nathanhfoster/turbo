# AI Resume Builder

A Next.js 15 Progressive Web App (PWA) for building, editing, and customizing resumes with AI-powered assistance.

## Features

- **Progressive Web App (PWA)**
  - Offline support
  - Install prompt
  - Service worker with advanced caching

- **Resume Management**
  - Upload resume files (TXT, HTML, PDF, DOC, DOCX)
  - Create and edit resumes with inline editing
  - Save multiple resume versions
  - IndexedDB persistence for offline access

- **AI-Powered Features**
  - Improve resume content with AI
  - Tailor resumes for specific job descriptions
  - Generate suggestions for improvement
  - Create job-specific resume versions

- **Inline Editing**
  - ContentEditable interface for direct editing
  - HTML support for rich formatting
  - Auto-save functionality
  - Version tracking

## Tech Stack

- **Framework**: Next.js 16.1.1 with App Router
- **React**: 19.2.3
- **TypeScript**: 5.9.2
- **Styling**: Tailwind CSS 4.1.13
- **PWA**: @nathanhfoster/pwa
- **State Management**: @nathanhfoster/resurrection
- **UI Components**: @nathanhfoster/ui
- **Persistence**: @nathanhfoster/indexeddb
- **AI Integration**: @nathanhfoster/openai

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
cd apps/resume
pnpm dev
```

Open [http://localhost:3003](http://localhost:3003) to view it in your browser.

### Building

Build for production:

```bash
pnpm build
```

### Environment Variables

Create `.env.local` in the app directory:

```bash
NEXT_PUBLIC_OPENAI_API_KEY=your-openai-api-key
```

## Project Structure

```
apps/resume/
├── app/                   # Next.js App Router
│   ├── components/        # App-level components (Navbar, Footer, Body)
│   ├── settings/          # Settings page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main resume builder page
│   ├── manifest.ts        # PWA manifest
│   ├── robots.ts          # Robots.txt
│   └── sitemap.ts         # Sitemap
│
├── domains/               # Business domains (FSD)
│   └── Resume/            # Resume domain
│       ├── model/         # State management layer
│       │   ├── types.ts
│       │   ├── resumeSlice.ts
│       │   ├── selectors.ts
│       │   ├── repository.ts
│       │   └── resumeContext.tsx
│       ├── lib/           # Domain-specific utilities
│       │   ├── fileParser.ts
│       │   └── constants.ts
│       ├── hooks/         # Domain business logic
│       │   ├── useResume.ts
│       │   ├── useResumeEditor.ts
│       │   └── useResumeAI.ts
│       └── ui/            # Presentation components
│           ├── ResumeEditor/
│           ├── ResumeViewer/
│           └── ResumeList/
│
└── public/                # Static assets
```

## Architecture

This app follows the monorepo's FRONTEND_ARCHITECTURE.md principles:

- **Feature-Sliced Design (FSD)** - Domain organized by model/lib/hooks/ui
- **Container/Presentation Pattern** - Domain container orchestrates, UI components are pure
- **Top-Down Flow** - Dependencies flow from packages → core → domain → UI
- **Resurrection State Management** - Custom Redux-like state management
- **IndexedDB Persistence** - Offline-first data storage

## Multi-Zone Architecture

This app is part of a multi-zone architecture:

- Main app at root domain (`yoursite.com`)
- Resume app at `/resume` path (`yoursite.com/resume`)

The main app's `next.config.ts` includes rewrites to proxy `/resume/*` routes to this app.

## Usage

1. **Upload a Resume**: Use the file dropper to upload a resume file
2. **Edit Inline**: Click "Edit" to switch to HTML editing mode, or edit directly in the contentEditable view
3. **Improve with AI**: Click "Improve with AI" to enhance your resume
4. **Tailor for Job**: Enter a job description and click "Tailor for Job" to customize
5. **Save Versions**: Use "Save as Version" to create job-specific resume copies
6. **Manage Resumes**: View all your resumes in the list and switch between them

## Scripts

- `pnpm dev` - Start development server on port 3003
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm check-types` - Run TypeScript compiler
