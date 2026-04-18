# AI-Powered Claim Orchestrator (case study)

Next.js dashboard for the [AI-Powered Claim Orchestrator](https://www.notion.so/345b4c90a2f78044a417edca54bbae7b) brief: responsive claim timeline, polymorphic `processDetails`, dynamic notes/attachments, and simulated AI (explain + document check).

## How we built this (end-to-end)

Work proceeded in layers: **product source → structured plan → implementation → quality gates**.

1. **Skills pipeline (repo root)** — We added a [`skills/`](../skills/) folder with ordered markdown “skills” (system architecture, backend/frontend design, BI metrics, tradeoffs, testing strategy, MVP scope, etc.). These scripts define _what to produce_ and in _what order_, so the build stays traceable to the brief instead of ad-hoc coding.

2. **Notion as PRD** — The case study lives in Notion. We used the **Notion MCP** in Cursor to pull the **Case-Study** page (requirements, stack hints, sample payload, evaluation criteria) and keep implementation aligned with the source of truth.

3. **Architecture doc under `docs/`** — Following that pipeline, we captured the execution plan and Notion-derived summary in [`docs/notion-architecture-pipeline-plan.md`](../docs/notion-architecture-pipeline-plan.md): pipeline order, page UUID for `notion-fetch`, product summary table, and links back to the individual skill files. That file is the bridge between **PRD** and **this app**.

4. **UI architecture with HeroUI MCP** — The brief mentions a component library; we standardized on **HeroUI v3** for this codebase. The **HeroUI React MCP** was used to confirm v3 APIs, compound components, and Tailwind v4 expectations so layouts and interactions match current docs.

5. **Cursor Agent Skills** — Separately from the repo `skills/` folder, **Cursor Agent Skills** (e.g. create-rule, create-skill, canvas) helped keep conventions consistent: testing/coverage expectations, ESLint setup, and repeatable workflows inside the editor.

6. **Tests (non-negotiable)** — **Jest** + React Testing Library cover units and components (`*.test.tsx`, `*.spec.tsx`). **`npm run test:coverage`** enforces **global ≥ 70%** coverage. **Playwright** (`npm run test:e2e`, [`e2e/`](e2e/)) exercises critical dashboard flows against a real dev server. Failing tests or coverage are treated as blockers before calling the feature done.

7. **Lint (non-negotiable)** — **`npm run lint`** runs ESLint (flat config) including Jest-aware rules for test files. The project expects a **clean lint** run in normal development and CI-style checks before merge.

## Stack

- **Framework:** Next.js (App Router)
- **i18n:** [next-intl](https://next-intl-docs.vercel.app/) — locales `en` and `tr`; messages in [`messages/en.json`](messages/en.json) / [`messages/tr.json`](messages/tr.json)
- **UI:** [HeroUI v3](https://www.heroui.com/docs/react/getting-started/quick-start) (`@heroui/react`, `@heroui/styles`) with **Tailwind CSS v4**
- **Data:** TanStack React Query + `fetch` to `/api/claim`
- **Validation:** Zod (`lib/schemas/claim.ts`)
- **Client state:** Zustand (`store/claim-ui-store.ts`) for user-inserted nodes and modals

## Run locally

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — middleware redirects to `/en` (or use `/en` / `/tr` directly).

## Scripts

| Command                 | Purpose                                                                                                          |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `npm run lint`          | ESLint (flat config + Jest rules for tests)                                                                      |
| `npm test`              | Jest unit/component tests                                                                                        |
| `npm run test:coverage` | Jest with **global ≥ 70%** coverage thresholds                                                                   |
| `npm run test:e2e`      | Playwright specs in [`e2e/`](e2e/) (starts dev server; install browsers once: `npx playwright install chromium`) |

## Design decisions

1. **Registry pattern:** Step bodies are keyed by `title` in `components/claim-dashboard/step-registry.tsx` so new `processDetails` shapes do not require a growing central `switch`.
2. **HeroUI:** Interactive and layout primitives are HeroUI components (Card, Button, ButtonGroup, Chip, Alert, Modal, Tooltip, Separator, TextField, TextArea, Input, Spinner).
3. **Fast path:** One API round-trip returns the full claim JSON; React Query caches; Zod validates before render.
4. **AI (simulated):** “Explain with AI” uses [`lib/format-explain-step.ts`](lib/format-explain-step.ts) with next-intl `explain.*` strings. “AI document check” uses filename/PDF heuristics in the Zustand store.

## With more time

- Persist annotations via a real backend; wire a proper LLM with redaction for PII.
- Broader Playwright coverage (mobile viewports, file upload flows).

## AI tools

- **Notion MCP** — Fetch and ground work in the Case-Study PRD.
- **HeroUI React MCP** — v3 component APIs, patterns, and theming.
- **Cursor** — Agent Skills + chat for implementation, refactors, and keeping lint/tests green.
