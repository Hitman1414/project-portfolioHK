# Dr. Harshita Kaushik — Academic & Research Portfolio

> A modern, futuristic, editorial academic research portfolio website and content management studio for **Dr. Harshita Kaushik** (Assistant Professor, Srinivas University; Ph.D. in Management, Tumkur University).

---

## 1. Project Overview

This project provides a premium digital experience combining:
- **Academic Credibility**: Factual precision based strictly on verified CV and LinkedIn records.
- **Research Storytelling**: Visual canvas mapping artificial intelligence, conversational interfaces, data privacy, and e-commerce engagement.
- **Editorial Design**: Sophisticated typography (Serif display, Grotesk body, Monospace metadata), generous whitespace, and responsive grid layouts.
- **Futuristic Technology Aesthetic**: Dark & light theme modes, glassmorphism panels, interactive nodes, and WCAG 2.2 AA accessibility.
- **Dual-World Architecture**: Independent public static website (Vercel) + local-only content editor studio (Localhost).

---

## 2. Architecture & Design Principles

```
  ┌─────────────────────────────────────────────────────────┐
  │ WORLD 1: LOCAL PORTFOLIO STUDIO (USER COMPUTER ONLY)    │
  │ Local Studio (localhost:3001) → Edit JSON Content       │
  │ → Validate Schema → Build Check → Git Commit & Push     │
  └──────────────────────────┬──────────────────────────────┘
                             │ (Git Version Control)
                             ▼
  ┌─────────────────────────────────────────────────────────┐
  │ WORLD 2: PUBLIC WEBSITE (INDEPENDENT STATIC PRODUCTION)  │
  │ GitHub Repository → Vercel Automatic SSG Build           │
  │ → Global Edge Network (Works 24/7 without local machine) │
  └─────────────────────────────────────────────────────────┘
```

The public website does **NOT** call localhost, depend on a database server, or require a runtime CMS backend.

---

## 3. Technology Stack

- **Framework**: Next.js (App Router, Server Components & Static Site Generation)
- **Language**: TypeScript (`strict: true`)
- **Styling**: Tailwind CSS + Custom CSS Variables + Dual Theme System (`next-themes`)
- **Animation**: Framer Motion
- **Validation**: Zod Schemas (`scripts/validate.js`)
- **Icons**: Lucide React
- **Hosting & Deployment**: GitHub + Vercel Integration

---

## 4. Folder Structure

```
/
├── app/                      # Next.js App Router Pages & API Routes
│   ├── (public pages)
│   │   ├── about/            # Academic Profile & Bio
│   │   ├── research/         # Research Network & Topic Details
│   │   ├── publications/     # Publications Archive with Filtering
│   │   ├── teaching/         # 10 Subject Teaching Index
│   │   ├── experience/       # Interactive Academic Timeline
│   │   ├── patents/          # IoT Micro-Node Innovation Patent
│   │   ├── cv/               # Official Academic CV Page
│   │   ├── contact/          # Inquiries & Contact
│   │   └── page.tsx          # Hero Experience & Research Map
│   ├── studio/               # Local Portfolio Studio Editor UI
│   ├── api/studio/           # Studio API Endpoints (Localhost only)
│   ├── globals.css           # Design System & Theme CSS
│   ├── layout.tsx            # Root Layout with ThemeProvider & Header
│   ├── sitemap.ts            # Dynamic SEO Sitemap
│   └── robots.ts             # Robots Configuration
├── components/               # Core Visual Components
│   ├── Header.tsx            # Editorial Header & Navigation Drawer
│   ├── Footer.tsx            # Footer & Academic Meta
│   ├── HeroExperience.tsx    # Hero Statement & Quick Links
│   ├── ResearchMap.tsx       # Interactive Visual Canvas & Nodes
│   ├── PublicationIndex.tsx  # Editorial Publications Archive
│   ├── AcademicTimeline.tsx   # Chronological Timeline
│   ├── TeachingIndex.tsx     # 10 Course Pedagogy Index
│   └── InnovationSection.tsx # Patent & Hardware-Software Tech
├── content/                  # Canonical Version-Controlled JSON Data
│   ├── profile.json          # Academic Profile, Ph.D. Info, NET/KSET
│   ├── research.json         # Research Topics & Canvas Nodes
│   ├── publications.json     # 9 Peer-Reviewed Papers
│   ├── experience.json       # Work History & Appointments
│   ├── education.json        # Degrees (Ph.D., MBA, B.Sc.)
│   ├── teaching.json         # 10 Subjects Handled
│   ├── patents.json          # IoT Micro-Node Patent
│   ├── projects.json         # Research Projects
│   └── site.json             # Site Title & SEO Config
├── lib/                      # Content Loaders & Zod Schemas
│   ├── content.ts            # Synchronous Content Helper Functions
│   └── schemas/content.ts    # Zod Validation Schemas
├── scripts/                  # Command Line Automation
│   ├── validate.js           # Content Schema Validator
│   └── publish.js            # Git Commit & Push Workflow
├── SOURCE_NOTES.md           # Factual Source Verification Log
├── package.json              # NPM Dependencies & Scripts
└── tsconfig.json             # TypeScript Configuration
```

---

## 5. Development & Execution Commands

Run commands using `npm run <command>` (or `cmd /c npm run <command>` on Windows PowerShell):

| Command | Description |
| :--- | :--- |
| `npm run dev` | Launch Next.js dev server for both Web & Studio |
| `npm run web` | Launch public website dev server (`localhost:3000`) |
| `npm run studio` | Launch Local Portfolio Studio (`localhost:3001`) |
| `npm run validate` | Run Zod validation schema check on `/content/*.json` |
| `npm run build` | Validate content and compile production static site |
| `npm run publish` | Validate content, test build, create Git commit & push |

---

## 6. How to Edit Content & Publish Updates

### Option A: Via Local Portfolio Studio (Recommended)
1. Run `npm run studio` or open `http://localhost:3000/studio`.
2. Select the content category (Publications, Research, Teaching, etc.).
3. Edit fields or click **Add Record**.
4. Click **Save** to write updates directly to `/content/*.json`.
5. Click **Validate Schema** to run Zod validation checks.
6. Click **Publish to GitHub / Vercel** to commit and deploy.

### Option B: Direct Version-Controlled JSON Editing
1. Open any JSON file inside `/content/` (e.g. `/content/publications.json`).
2. Make edits according to the schema.
3. Run `npm run validate` to check for missing required fields.
4. Run `npm run publish` to trigger deployment.

---

## 7. How Deployment Works (GitHub + Vercel)

1. **Push to GitHub**: Every publish action pushes version-controlled content to `main`.
2. **Vercel Build**: Vercel detects the push, runs `npm run build`, executes `scripts/validate.js`, and compiles static HTML pages.
3. **Global Edge Hosting**: The compiled static site is deployed to Vercel's global CDN.

---

## 8. Factual Source Log & Discrepancy Handling

All factual data is logged in [`SOURCE_NOTES.md`](file:///h:/Portfolio/Project-Portfolio/SOURCE_NOTES.md).
- **Current Position**: **Srinivas University** (Assistant Professor, Mangaluru, Aug 2026 – Present).
- **Ph.D. Topic**: *"Impact of Artificial Intelligence and Conversational Interfaces on E-Commerce companies- An evaluation of customer’s engagement in Bengaluru city"* (Tumkur University, Feb 2026).
- **Patent**: *"An integrated hardware-software system and iot-driven micro-node architecture for decentralized hyperlocal packet distribution and live inventory synchronization"*.

---

## 9. Accessibility & Performance Compliance

- **WCAG 2.2 AA Compliant**: High contrast typography, keyboard focus rings, semantic HTML5 elements.
- **Screen Reader Accessible**: Keyboard navigation for Research Map and Publications Archive.
- **Reduced Motion Support**: Respects `prefers-reduced-motion` browser settings.
- **SEO Ready**: Dynamic OpenGraph tags, JSON-LD structured data, XML sitemap (`/sitemap.xml`), and `robots.txt`.
