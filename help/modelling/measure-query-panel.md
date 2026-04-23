---
title: "Measure Query Panel"
audience: modeller
area: modelling
updated: 2026-04-23
---

## What this covers

The Measure Query Panel is a minimal in-app pivot surface for sanity-checking a measure against one or two dimensions without leaving Tessallite. It is not a full BI canvas — it is a one-measure, one-row-dimension, one-column-dimension grid. Cells are clickable and open the [drill-through](drill-through.md) drawer.

Use it to confirm that a newly defined measure aggregates correctly before exposing it to a BI tool.

---

## Before you start

- The model must have at least one deployed measure and, typically, at least one dimension.
- Calculated measures render in the picker but their cells cannot be drilled in v1.

---

## Steps

1. Open a model in Model Builder and click the **Measure Query** icon in the Toolbelt.
2. Pick a **Measure**.
3. Optionally pick a **Row dimension** and a **Column dimension**. Either may be left as `(none)` — the grid collapses to a single row, column, or cell accordingly.
4. Click **Run**. Tessallite synthesises the SQL, sends it through the Query Router, and renders the result as a pivot grid.
5. Click any cell to open the drill-through drawer with the fact rows that contributed to that cell.

---

## Scope and limitations

| Feature | v1 | Future |
|---|---|---|
| Single measure per view | Yes | Multi-measure layout deferred to the Phase 6 canvas. |
| One row dimension, one column dimension | Yes | Multi-dimension nesting is out of scope. |
| Global filters | No | Use the Query panel for ad-hoc WHERE clauses. |
| Subtotals and totals | No | Deferred. |
| CSV export | No | Separate concern. |
| Saved views | No | Deferred. |

---

## Related

- [Drill-through](drill-through.md)
- [Calculated measures](calculated-measures.md)

---

← [Calculated Measures](calculated-measures.md) | [Home](../index.md) | [Live vs Aggregate →](../querying/live-vs-aggregate.md)
