# Copilot instructions for Orbit

- **Stack:** Next.js 16 App Router, React 19, TypeScript (strict), Tailwind CSS v4, Recharts. npm with `package-lock.json`.
- **Run:** `npm ci`, `npm run dev`, `npm run lint`, `npx tsc --noEmit`, `npm run build`. No test runner yet; if you add one, prefer Vitest for `src/lib/analysis/`.
- **Architecture:** the only server code is `src/app/api/analyze/route.ts`. Deterministic stats live in `src/lib/analysis/`. Per-relationship prompts and copy live in `src/data/relationships/`. See `docs/ARCHITECTURE.md`.
- **Privacy is a hard requirement:** never log or persist chat text or API keys, and never add new outbound network calls. Data flow is documented in `docs/PRIVACY.md`, so keep it accurate.
- **Conventions:** `@/` import alias; one relationship type per file plus a `registry.ts` entry; keep the LLM JSON schema in sync with `DynamicDashboard.tsx`.
- **Don't touch:** `package-lock.json` by hand, `.env*` files, real chat exports.
- **When reviewing PRs:** flag any new `fetch` to a third party, any logging in `route.ts`, and schema changes that `DynamicDashboard.tsx` doesn't handle.
