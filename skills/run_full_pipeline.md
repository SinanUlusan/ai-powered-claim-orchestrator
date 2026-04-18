# Skill: Run Full Architecture Pipeline

## Purpose

Acts as the entry point for all skills.

## Input

- Notion MCP product description

## Execution Order

You MUST run skills in this exact order:

1. generate_system_architecture.md
2. design_backend_services.md
3. design_frontend_architecture.md
4. define_bi_metrics.md
5. analyze_architecture_tradeoffs.md
6. design_testing_strategy.md
7. define_mvp_scope.md
8. generate_full_product_spec.md

---

## Rules

- Do NOT skip steps
- Do NOT generate code
- Each step builds on previous output
- Final output must be a single unified technical document

---

## Output

A full system design document including:

- architecture
- backend
- frontend
- BI
- testing
- MVP scope
