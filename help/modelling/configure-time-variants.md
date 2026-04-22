---
title: "Configure Time Variants"
audience: modeller
area: modelling
updated: 2026-04-22
---

## What this covers

A time variant is a derived form of a base measure that answers a time-intelligence question without forcing the modeller to write a separate measure. Examples are year-to-date revenue, prior-quarter order count, and 12-month trailing average. Tessallite generates these as virtual measures that appear in the catalog alongside the base measure, named `<base>_<variant>` (for example `revenue_ytd`). This article explains which variants exist, when they are admissible, and how to enable them on a measure.

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

A variant is published in the catalog only when **all** of the following are true for the measure's linked hierarchy:

1. `time_variants_enabled` is true on the measure.
2. The variant's family appears in at least one level's `allowed_time_calcs`.
3. The variant's required time unit (if any) is present as a level `time_unit` in the same hierarchy.
4. If the variant is period-aware, the data source has a bound calendar table.

Variants that fail any rule are silently dropped — no query-time error and no validation error on measure save.

---

## Steps

1. Open the measure in the Drawer (Toolbelt → Measures → click the measure name).
2. Tick **Enable time variants**.
3. (Optional) Set **Trailing window N** to override the 12-period default for `trailing_n`.
4. (Optional) Set **Moving average N** to override the 30-period default for `moving_avg_n`.
5. Click **Save**. The catalog list refreshes; admissible variants now appear under the measure as virtual entries.

---

## How variants are computed

Each variant is rewritten into a window function or correlated calendar lookup at query time. Postgres is the canonical authoring dialect; for BigQuery and Spark, Tessallite transpiles the canonical SQL via sqlglot. The rewriter does not duplicate the variant in storage — it is computed live unless the AI optimiser proposes a per-variant aggregate.

> **Note:** If a variant query is slow, run the AI optimiser. The optimiser scores per-variant aggregates the same way it scores base-measure aggregates and proposes pre-aggregated tables when the cost-benefit is positive. See [Use the AI optimiser](use-the-ai-optimiser.md).

---

## Related

- [Define Measures](define-measures.md)
- [Configure Calendar Table](configure-calendar-table.md)
- [Use the AI optimiser](use-the-ai-optimiser.md)

---

← [Define Measures](define-measures.md) | [Home](../index.md) | [Configure Calendar Table →](configure-calendar-table.md)
