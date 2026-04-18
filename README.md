# Orbit

AI relationship & chat analysis. Upload a WhatsApp or Instagram export and get a deep breakdown of how two people actually relate — tuned to *who* the other person is.

## What it does

Analyzes chat exports between any two people and produces a 12-section dashboard: volume stats, love & affection tracking, reciprocity, conflict patterns, psychological patterns, 0–100 ratings across 8 dimensions, predictions, early warnings, word clouds, health timeline, and a blunt verdict.

Analysis is tuned per relationship type — a fight with your mom isn't a fight with your boss. Pick one of 9 presets before uploading: romantic partner, ex, situationship, best friend, friend, sibling, mother, father, professional. Each type has its own system prompt, copy, theme, and demo data.

## Bring your own API key

Paste a Claude or Gemini key into the UI — it's stored in your browser's `localStorage` and sent directly to the provider. No backend of ours touches it.

- **Claude (Anthropic)** — best quality, usually a few cents per run
- **Gemini 2.0 Flash** — free tier, 1M context, 1,500 requests/day
- **Try Demo** — no key required, shows fictional "Alex & Sam" sample

## Tech stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS v4
- Recharts for visualization
- TypeScript, ESLint

## Getting started

```bash
git clone https://github.com/yogigodaraa/orbit.git
cd orbit
npm install
npm run dev
```

Open <http://localhost:3000>. Optional `.env.local` (copy `.env.example`) for server-side key fallback.

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

Chat text goes from your browser directly to Anthropic or Google using the key you paste. Nothing is logged or stored by Orbit.

## License

MIT — see [LICENSE](./LICENSE).
