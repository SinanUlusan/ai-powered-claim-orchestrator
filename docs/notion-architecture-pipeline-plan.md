# Notion-sourced architecture pipeline plan

This document records the **execution order** and **inputs/outputs** for the skills pipeline, grounded in the Notion page **Case-Study** (AI-Powered Claim Orchestrator).

**Notion source:** [Case-Study](https://www.notion.so/345b4c90a2f78044a417edca54bbae7b)  
**Page UUID (for MCP `notion-fetch`):** `345b4c90-a2f7-8044-a417-edca54bbae7b`  
**Entry skill:** [`skills/run_full_pipeline.md`](../skills/run_full_pipeline.md)

---

## Product summary (from Notion)

| Area | Summary |
|------|---------|
| **Domain** | Insurance claim tracking as a proactive, self-service digital experience; reduce repetitive status calls. |
| **UX SLA** | Dashboard should answer within **~3 seconds**: claim number and current stage, estimated remaining time, and **what the user must do now**. |
| **Responsive** | Mobile-first; intentional layout shifts (stacked mobile, grid/sidebar desktop); touch-friendly actions and node interactions. |
| **Dynamic nodes** | Users insert/remove **Information Notes** and **Additional Attachments** between steps. |
| **Polymorphic data** | `processDetails[]` has **heterogeneous** objects per step (`title` / status drives shape). Use a **registry / strategy** pattern—avoid large if/else trees. |
| **AI** | Per-step **Explain with AI**; **AI document analyzer** (e.g. Occupational Certificate)—case study allows **simulated** analyzer for the challenge. |
| **Client stack** | React (Vite or Next.js), TanStack React Query, Zod, Zustand, Tailwind CSS, shadcn/ui, TypeScript. |
| **Sample payload** | Top-level: `title`, `fileNo`, `estimatedRemainingTime`, `currentStatus`, `processDetails` (Towing, Claim Notification, Appraisal, etc.). |
| **Evaluation** | Design/responsiveness, complexity management for JSON shapes, code quality; optional **2-hour** submission timebox for the challenge. |

**MVP timebox note:** The case study mentions a **2-hour** submission window; the skill [`skills/define_mvp_scope.md`](../skills/define_mvp_scope.md) expects a buildable MVP in **7–14 days**. When running the pipeline, keep both explicit: **challenge/demo slice** vs **production MVP**.

---

## Pipeline steps (strict order)

Run **only** skills under [`skills/`](../skills/). **Do not skip or reorder.**

| Step | Skill | Input | Output (artifact) |
|------|--------|--------|-------------------|
| 1 | [`generate_system_architecture.md`](../skills/generate_system_architecture.md) | Notion product description + assumptions (users, scale, compliance) | Product overview, requirements, high-level architecture, services breakdown, data flow, tech stack, scalability, risks |
| 2 | [`design_backend_services.md`](../skills/design_backend_services.md) | Step 1 + Notion features | Services list, API design, DB schema, auth, background jobs, events, error handling |
| 3 | [`design_frontend_architecture.md`](../skills/design_frontend_architecture.md) | Notion features + Step 2 API shape | Stack, folders, state, API layer, components, routing, performance (align with 3s UX + prescribed stack) |
| 4 | [`define_bi_metrics.md`](../skills/define_bi_metrics.md) | Product goals + architecture context | North star, KPI tree, event table, data pipeline, dashboards, tools |
| 5 | [`analyze_architecture_tradeoffs.md`](../skills/analyze_architecture_tradeoffs.md) | Steps 1–4 | Monolith vs microservices, SQL vs NoSQL, REST vs GraphQL, sync vs async, caching, cost/performance, risks |
| 6 | [`design_testing_strategy.md`](../skills/design_testing_strategy.md) | Steps 1–5 | Unit, integration, E2E, load, mocking, CI/CD testing |
| 7 | [`define_mvp_scope.md`](../skills/define_mvp_scope.md) | Steps 1–6 + Notion constraints | Must-have, nice-to-have, cut scope, MVP architecture, build order; reconcile 2h vs 7–14d |
| 8 | [`generate_full_product_spec.md`](../skills/generate_full_product_spec.md) | Notion idea + outputs 1–7 | **Single** consolidated document: sections 1–10 (overview, architecture, backend, frontend, database, BI, testing, deployment, MVP, future) |

---

## Consistency checks (between steps)

Before moving to the next skill, validate against prior outputs:

1. **Stack:** React / Query / Zod / Zustand / Tailwind / shadcn / TypeScript—no drift unless Step 5 documents a deliberate tradeoff.
2. **Polymorphism:** Same **discriminator** story (e.g. step `title` or normalized `stepKey`) in backend (Step 2), frontend registry (Step 3), and tests (Step 6).
3. **AI:** Agreement on sync vs async (e.g. explain vs document job), failure modes, and **PII** handling for insurance data.
4. **Performance:** Sub-**3 second** path reflected in architecture, frontend, tradeoffs, and load-testing intent.
5. **BI:** Events map to real actions (views, uploads, annotations, AI usage).
6. **MVP:** One coherent story for demo slice vs production MVP in the final spec (Step 8).

---

## Optional: refresh from Notion

To re-sync requirements, call MCP tool **`notion-fetch`** with:

```text
id: 345b4c90-a2f7-8044-a417-edca54bbae7b
```

Update this plan’s **Product summary** table if the page content changes materially.
