---
title: "Configure Time Variants"
audience: modeller
area: modelling
updated: 2026-04-23
---

## What this covers

A time variant is a derived form of a base measure that answers a time-intelligence question without forcing the modeller to write a separate measure. Examples are year-to-date revenue, prior-quarter order count, and 12-month trailing average. In Tessallite each variant you tick on a base measure becomes its own first-class measure row in the catalog, named `<base>_<variant>` (for example `revenue_ytd`). The variant row inherits the base measure's source column, format, data type, default aggregation, and additivity at creation. This article explains which variants exist, when they are admissible, and how to create them.

---

## Before you start

- The measure you want to extend must already exist. See [Define Measures](define-measures.md).
- The model must have at least one hierarchy whose level capabilities cover the variants you want — for example a hierarchy with a `period_to_date` capability at the year level enables `_ytd`.
- Period-aware variants (`_ytd`, `_qtd`, `_prior_year`, `_yoy_growth`, `_ytd_prior_year`, …) require a calendar table bound on the data source. See [Configure Calendar Table](configure-calendar-table.md).

---

## Available variants

| Variant | Family | Required time unit | Calendar required |
|---|---|---|---|
| `lag` | lag | (any) | No |
| `prior_year` | parallel_period | year | Yes |
| `prior_quarter` | parallel_period | quarter | Yes |
| `prior_month` | parallel_period | month | Yes |
| `prior_week` | parallel_period | week | Yes |
| `ytd` | period_to_date | year | Yes |
| `qtd` | period_to_date | quarter | Yes |
| `mtd` | period_to_date | month | Yes |
| `wtd` | period_to_date | week | Yes |
| `ytd_prior_year` | period_to_date | year | Yes |
| `yoy_growth` | parallel_period | year | Yes |
| `yoy_growth_pct` | parallel_period | year | Yes |
| `trailing_n` | moving_window | (any) | No |
| `moving_avg_n` | moving_window | (any) | No |

Default `n` for `trailing_n` is 12; default `n` for `moving_avg_n` is 30. Both can be overridden per measure.

---

## Admission rules

A variant can be ticked on a base measure only when **all** of the following are true for the measure's linked hierarchy:

1. The variant's family appears in at least one level's `allowed_time_calcs`.
2. The variant's required time unit (if any) is present as a level `time_unit` in the same hierarchy.
3. If the variant is period-aware, the data source has a bound calendar table.

Variants that fail any rule are not offered for selection in the drawer.

---

## Steps

1. Open the base measure in the Drawer (Toolbelt → Measures → click the measure name).
2. Under **Time variants**, tick the variants you want. For `trailing_n` and `moving_avg_n`, enter an `N` (defaults: 12 and 30).
3. Click **Save**. The catalog refreshes; each ticked variant appears as its own measure row beside the base, named `<base>_<variant>`.

To remove a variant, untick it and Save. The variant row is deleted; queries that referenced it will fail with an unknown-measure error.

To rename or re-format a variant row, open the variant directly. Source column, aggregation, and data type are inherited from the base and are not editable on the variant row — change them on the base.

---

## How variants are computed

Each variant is rewritten into a window function or correlated calendar lookup at query time. Postgres is the canonical authoring dialect; for BigQuery and Spark, Tessallite transpiles the canonical SQL via sqlglot. The variant row is metadata only — it does not duplicate the value in storage unless the AI optimiser proposes a per-variant aggregate.

> **Note:** If a variant query is slow, run the AI optimiser. The optimiser scores per-variant aggregates the same way it scores base-measure aggregates and proposes pre-aggregated tables when the cost-benefit is positive. See [Use the AI optimiser](use-the-ai-optimiser.md).

---

## Variants in pre-aggregates (limitation)

The optimiser materialises only **window-based** variants in CTAS pre-aggregate tables: `lag`, `trailing_n`, and `moving_avg_n`. These are computed inside the aggregate using a window function over the per-grain rows.

**Period-aware variants are not materialised.** Variants in this list always rewrite over the base measure's pre-aggregate (or the source) at query time:

- `prior_year`, `prior_quarter`, `prior_month`, `prior_week`
- `ytd`, `qtd`, `mtd`, `wtd`
- `ytd_prior_year`, `yoy_growth`, `yoy_growth_pct`

These variants depend on a calendar-table JOIN whose validity moves with the calendar contents. Baking that JOIN into a CTAS would couple the aggregate to a specific calendar snapshot, so Tessallite refuses the materialisation by design. They still execute correctly via the rewriter — only the *pre-aggregate* path is closed.

A window-based variant additionally requires the aggregate's grain to contain a time dimension (used for `ORDER BY` in the window). If you create an aggregate at a non-time grain, only base measures and non-variant aggregations are materialised.

---

## Related

- [Define Measures](define-measures.md)
- [Configure Calendar Table](configure-calendar-table.md)
- [Use the AI optimiser](use-the-ai-optimiser.md)

---

← [Define Measures](define-measures.md) | [Home](../index.md) | [Configure Calendar Table →](configure-calendar-table.md)
