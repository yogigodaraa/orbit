# CLAUDE.md

Guidance for Claude Code (and humans) working in this repo.

## What this is

Orbit: a Next.js 16 / React 19 app that analyses WhatsApp/Instagram chat exports with a
BYOK LLM (Anthropic or Google) and renders a 12-section relationship dashboard.
Full walkthrough: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). Data flow: [docs/PRIVACY.md](docs/PRIVACY.md).

## Commands

```bash
npm ci            # install (use the lockfile)
npm run dev       # http://localhost:3000
npm run lint      # ESLint (flat config, eslint.config.mjs)
npx tsc --noEmit  # typecheck
npm run build     # production build; CI runs lint + build
```

There is no test suite yet. `src/lib/analysis/` is pure TypeScript and the best place to start one.

## Layout

- `src/app/api/analyze/route.ts`: the only server code (validation, rate limit, provider calls)
- `src/lib/analysis/`: deterministic parsing + stats used to ground the LLM
- `src/data/relationships/`: one config per relationship type (prompt, copy, theme, demo)
- `src/components/DynamicDashboard.tsx`: renders the LLM JSON

## Conventions

- TypeScript strict; path alias `@/` → `src/`.
- Tailwind v4 utility classes; colours are inline hex values, matching existing components.
- New relationship type = new file in `src/data/relationships/` + entry in `registry.ts`.
- Keep the LLM JSON schema in sync between the system prompts and `DynamicDashboard.tsx`.

## Do not

- **Never log, persist or send chat text or API keys anywhere new.** No `console.log` of
  request bodies, no analytics events containing content, no new third-party calls.
  Update `docs/PRIVACY.md` if data flow changes at all.
- Never commit real chat exports, `.env*` files, or anything under `/chat_export/`.
- Don't change model ids or the response schema casually; the dashboard depends on the shape.
