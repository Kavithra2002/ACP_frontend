# ACP Wealth Management — Frontend

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion · GSAP.
Frontend only. No backend connections, and all data is illustrative.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
npm run typecheck
```

Requires Node 20.9+.

## Design system (matched to acp-am.com)

| Token | Value | Use |
|---|---|---|
| `ink` | `#041f3f` | Primary text, dark sections, buttons |
| `ink-2` | `#052b56` | Dark section cards |
| `forest` | `#004a8f` | Italic headline emphasis, links |
| `cyan` | `#00aeef` | Accent on dark backgrounds |
| `sage` | `#6f9cc3` | Secondary accent |
| `paper` / `paper-2` / `snow` | `#f5f7f9` / `#eaf0f5` / `#fbfcfd` | Light section backgrounds |
| `abyss` | `#00152f` | Footer |

- **Type:** Georgia serif headlines (weight 400, tight tracking, *italic emphasis*); Arial body; 11px uppercase tracked labels (`.eyebrow`).
- **Shapes:** square corners, hairline `line` borders, `gap-px` grids for divided cards.
- **Pattern:** numbered section labels (`<SectionLabel index="01">`), CTAs with `↗`.
- Tokens live in `src/app/globals.css` under `@theme`.

## Pages

| Route | Purpose |
|---|---|
| `/` | Hero, stats, why ACP, segments, live price table, goals, featured funds, digital platform, how to invest, insights, appointment form |
| `/personal`, `/private-wealth`, `/institutional` | Client segment pages (shared `SegmentPage` template) |
| `/funds` | Price table with category tabs, fund range, offshore products |
| `/funds/[slug]` | Fund detail: prices, NAV chart (6M/1Y/3Y), returns, objective, allocation, key facts, documents |
| `/performance` | Animated return comparison and full performance table |
| `/calculators` | Lump sum, monthly plan and goal planner |
| `/invest-online` | Six-step account opening wizard with risk profiling |
| `/resources` | Searchable forms and downloads library, how to transact |
| `/taxation` | Unit trust taxation guide (placeholder rates) |
| `/faqs`, `/insights`, `/insights/[slug]`, `/about`, `/contact` | Help, articles, company story and timeline, contact |
| `/login` → `/portal` | Investor login UI and sample portfolio dashboard (invest, redeem and switch modals) |
| `/legal/[slug]` | Terms, privacy, disclaimer, complaints |

There is also a site-wide **Important notice** gate (`AccessGate`), modelled on ACP's. It is remembered in `localStorage`.

## Animation

- **Motion:** scroll reveals (`Reveal`, `RevealGroup`), tab indicators, accordions, wizard transitions, modals, bar growth, SVG line draw.
- **GSAP + ScrollTrigger:** stat count-ups (`CountUp`), hero illustration timeline (`HeroArt`), scroll-scrubbed timeline (`Timeline`), and an optional `Parallax` helper.
- All animation respects `prefers-reduced-motion`.

## Connecting a backend later

- `src/data/funds.ts`: replace the arrays with API calls. `navHistory()` generates sample charts.
- `src/data/insights.ts`: swap for a CMS.
- Forms (`ContactForm`, `OnlineApplication`, `LoginForm`, portal modals) contain `// TODO` markers where API calls go.

## Before launch: content to confirm with ACP

- Fund names, prices, returns, fees and AUM (all **sample**)
- Home page statistics
- Regulatory and licensing text (`site.regulatory` in `src/data/site.ts`), tax rates, legal pages
- Collection bank account details
- Official logo (`src/components/layout/Logo.tsx` is a text placeholder) and approved photography
