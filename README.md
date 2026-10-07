# Orbit

[![CI](https://github.com/yogigodaraa/orbit/actions/workflows/ci.yml/badge.svg)](https://github.com/yogigodaraa/orbit/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Status: maintenance](https://img.shields.io/badge/status-maintenance%20only-lightgrey)

> **Status: complete — maintenance only.** This project works and stays online, but no new features are planned. Security updates are still applied.

AI relationship & chat analysis. Upload a WhatsApp or Instagram export and get a deep breakdown of how two people actually relate — tuned to *who* the other person is.

## What it does

Analyzes chat exports between any two people and produces a 12-section dashboard: volume stats, love & affection tracking, reciprocity, conflict patterns, psychological patterns, 0–100 ratings across 8 dimensions, predictions, early warnings, word clouds, health timeline, and a blunt verdict.

Analysis is tuned per relationship type — a fight with your mom isn't a fight with your boss. Pick one of 9 presets before uploading: romantic partner, ex, situationship, best friend, friend, sibling, mother, father, professional. Each type has its own system prompt, copy, theme, and demo data.

## Bring your own API key

Paste a Claude or Gemini key into the UI. It's stored in your browser's `localStorage` and sent with each analysis to Orbit's `/api/analyze` route, which forwards it to the provider and never stores or logs it. See [docs/PRIVACY.md](docs/PRIVACY.md).

- **Claude (Anthropic)** — best quality, usually a few cents per run
- **Gemini 2.0 Flash** — free tier, 1M context, 1,500 requests/day
- **Try Demo** — no key required, shows fictional "Alex & Sam" sample

**Live demo:** <https://orbit-theta-one.vercel.app>

## Screenshots

<!-- TODO: add a screenshot of the dashboard (demo data only, never a real chat) -->
_Screenshot coming soon. Click **Try Demo** on the live site to see the dashboard with fictional data._

## Tech stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS v4
- Recharts for visualization
- TypeScript, ESLint
- Vercel Web Analytics (anonymous page views)

## Getting started

```bash
git clone https://github.com/yogigodaraa/orbit.git
cd orbit
npm install
npm run dev
```

Open <http://localhost:3000>. Optional `.env.local` (copy `.env.example`) for server-side key fallback. Only use that on a private instance, because public deployments would spend your key for everyone.

### Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

There's no automated test suite yet (see the roadmap).

## Exporting a chat

- **WhatsApp** — chat → `⋯` → More → Export chat → *Without media*
- **Instagram** — Settings → Accounts Center → Download your information → Messages

## Project layout

```
src/
  app/
    page.tsx                  landing
    analyze/page.tsx          upload + BYOK + selector
    api/analyze/route.ts      provider-agnostic endpoint
  components/
    DynamicDashboard.tsx      12-section dashboard
    RelationshipSelector.tsx  9-type picker
  data/
    demo.ts                   fictional sample
    relationships/            per-type configs + registry
```

## Rate limiting

`/api/analyze` has an in-memory rate limit (10 req / 10 min per IP). For multi-instance production, swap in [Upstash Ratelimit](https://upstash.com/docs/redis/sdks/ratelimit-ts/overview).

## Privacy

Your chat and key go to Orbit's `/api/analyze` route, which forwards them to Anthropic **or** Google and returns the result. Nothing is stored or logged by Orbit. Full details, including what to watch out for when self-hosting: [docs/PRIVACY.md](docs/PRIVACY.md).

How the code fits together: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Project status

Active. A working MVP, deployed on Vercel.

## Roadmap

- [ ] Unit tests for `src/lib/analysis/` (parser, stats, Gottman ratio)
- [ ] Shared rate limiting (e.g. Upstash) for multi-instance deployments
- [ ] Validate the LLM JSON response against a schema before rendering
<!-- TODO(yogi): add your own product roadmap items -->

## License

MIT — see [LICENSE](./LICENSE).
