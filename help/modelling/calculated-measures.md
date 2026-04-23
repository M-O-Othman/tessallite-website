---
title: "Calculated Measures"
audience: modeller
area: modelling
updated: 2026-04-23
---

## What this covers

A calculated measure is a measure whose value is an expression over other measures rather than an aggregation of a column. Use calculated measures to combine existing measures into ratios, margins, growth percentages, and other derived numerics without writing SQL in every BI tool.

This page covers the expression syntax, the aggregation-mode choice, validation rules, and what happens when a referenced measure is deleted or renamed.

---

## Before you start

- At least one standard measure must exist in the model. Calculated measures reference other measures by name.
- Decide whether the expression should be evaluated once at aggregation time (expression-as-written) or row-by-row and then aggregated (per-row-then-aggregate). The two can produce different values and are not interchangeable.

---

## Expression syntax

Calculated-measure expressions are a small DSL, not SQL. Supported constructs:

| Construct | Example | Notes |
|---|---|---|
| Reference another measure | `measure("sales")` | Use the measure's `name`, not `display_name`. |
| Safe division | `safe_div(measure("margin"), measure("sales"))` | Returns `NULL` when the denominator is zero; avoids divide-by-zero errors. |
| Safe ratio | `safe_ratio(measure("a"), measure("b"))` | Alias for `safe_div`. |
| Arithmetic | `measure("a") + measure("b")`, `measure("a") * 1.1` | Standard operators: `+`, `-`, `*`, `/`, unary minus, parentheses. |
| Numeric literals | `0.5`, `100`, `1e-3` | Only numeric literals; no string or date literals. |

Only measures may be referenced with `measure("…")`. Columns, dimensions, and UDAs are not referenced directly — wrap them in a plain measure first.

---

## Aggregation mode

Every calculated measure has a `calc_agg_mode`. It determines when the expression is evaluated relative to the `GROUP BY`:

| Mode | Meaning | Example |
|---|---|---|
| `expression_as_written` | Evaluate the expression once, using the aggregated values of the referenced measures. | `safe_div(SUM(margin), SUM(sales))` — the overall margin percentage. |
| `per_row_then_aggregate` | Evaluate the expression for every input row, then aggregate with the default aggregation. | `SUM(margin / sales)` — the sum of per-row margin ratios. |

The two modes usually produce different numbers. Pick the one that matches the business question; the mode is stored on the measure so the rewriter always uses the same evaluation strategy.

---

## Validation rules

- The expression is parsed when you save the measure. Unknown function names, unknown referenced measures, and syntax errors are reported inline.
- A calculated measure may reference other calculated measures. The validator detects cycles (`A → B → A`) and rejects them at save time.
- Deleting or renaming a referenced base measure marks every calculated measure that used it as `invalid`. Invalid measures are hidden from the catalogue; fix the reference and the measure re-enables automatically.
- A calculated measure does not have a single `source_column_id`, so [drill-through](drill-through.md) is disabled on calculated measures in v1. Drill on the underlying base measures instead.

---

## Steps

1. Open a model in Model Builder and click **Measures** in the Toolbelt.
2. Click **Add Measure** and set **Measure type** to **Calculated**.
3. Enter a **Name** and **Display name**.
4. Write the expression in the **Expression** field. The form validates as you type; referenced measures are shown as chips below the editor.
5. Choose a **Calc aggregation mode** — see the table above.
6. Optionally set a **Format** (for example `percent_2dp` for a ratio).
7. Click **Save**. The measure is available to the Query Router immediately.

---

## Related

- [Define Measures](define-measures.md)
- [Measure Query Panel](measure-query-panel.md)
- [Drill-through](drill-through.md)

---

← [Configure Calendar Table](configure-calendar-table.md) | [Home](../index.md) | [Measure Query Panel →](measure-query-panel.md)
