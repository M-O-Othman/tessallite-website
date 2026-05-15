---
title: "Configure Time Variants"
audience: modeller
area: modelling
updated: 2026-05-06
---

## What this covers

A time variant is a derived form of a base measure that answers a time-intelligence question without forcing the modeller to write a separate measure. Examples are year-to-date revenue, prior-quarter order count, and 12-month trailing average. In Tessallite each variant you tick on a base measure becomes its own first-class measure row in the catalog, named `<base>_<variant>` (for example `revenue_ytd`). The variant row inherits the base measure's source column, format, data type, default aggregation, and additivity at creation. This article explains which variants exist, when they are admissible, and how to create them.

---

## Before you start — the prerequisite chain

Creating a time variant requires a chain of configuration steps to be completed first. If any step is missing, the variant will appear as "not eligible" with a reason explaining which prerequisite is absent. The full chain is:

### 1. Define the base measure

The measure you want to extend must already exist. See [Define Measures](define-measures.md).

### 2. Create a time hierarchy with a calendar type

A time hierarchy tells the system which time levels (year, quarter, month, week, day) are available, which time calculations are enabled at each level, and what calendar system governs period boundaries.

To create one:

1. Open the **Hierarchies** panel in the Toolbelt.
2. Create a new hierarchy. Set its dimension kind to **time**.
3. Set the **calendar type** to one of:
   - **standard** — Gregorian calendar, year starts January 1.
   - **fiscal** — Gregorian calendar with a shifted year start. Select the **fiscal year start month** (e.g. April for a UK fiscal year, July for Australian).
   - **hijri** — Islamic calendar, year starts 1 Muharram.
   - **iso** — ISO 8601 week-based year.
4. Add levels for each time granularity you need (e.g. year, quarter, month). On each level, set the **time unit** and enable the **allowed time calculations** for the variants you plan to use.
5. **Link the measure.** In the hierarchy's measure links section, add the base measure. This step is easy to miss — without it, the measure has no associated hierarchy and all variants will be ineligible.

Period boundaries (where a year, quarter, or month starts and ends) are computed automatically from the calendar type. A calendar table is not required — the system derives boundaries using date expressions. If a calendar table IS present in the model, the system uses it for backward compatibility.

### Prerequisite summary

| Variant group | Base measure | Time hierarchy with calendar type | Level capabilities | Measure linked to hierarchy |
|---|---|---|---|---|
| Period-to-date (`ytd`, `qtd`, `mtd`, `wtd`) | Required | Required | `period_to_date` | Required |
| Parallel period (`prior_year`, `prior_quarter`, etc.) | Required | Required | `parallel_period` | Required |
| Year-over-year (`yoy_growth`, `yoy_growth_pct`) | Required | Required | `parallel_period` | Required |
| Window (`lag`, `trailing_n`, `moving_avg_n`) | Required | Not required | `lag` or `moving_window` | Required |

---

## Available variants

| Variant | Family | Required time unit | Calendar type needed |
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
3. If the variant is period-aware, the linked hierarchy has a calendar type configured.

Variants that fail any rule are not offered for selection in the drawer.

---

## Creating variants — two paths

There are two ways to create time variants. Both produce the same result — a new measure row in the catalog.

### Path A: From the Measures panel (Toolbelt)

1. Open the base measure in the Drawer (Toolbelt → Measures → click the measure name).
2. Under **Time variants**, tick the variants you want. For `trailing_n` and `moving_avg_n`, enter an `N` (defaults: 12 and 30).
3. For period-boundary variants, select the **hierarchy** to use. The dropdown shows all hierarchies with matching capabilities. Different hierarchies point to different calendar tables (e.g. standard vs fiscal), so the choice determines which calendar system the variant uses.
4. Click **Save**. The catalog refreshes; each ticked variant appears as its own measure row beside the base, named `<base>_<variant>`.

### Path B: From the Measure Query Panel (pivot table)

This is a shortcut for when you are actively testing a measure and want to quickly add a variant without leaving the pivot context.

1. Open the **Measure Query Panel** from the Toolbelt.
2. Select a measure in the Measure dropdown.
3. Next to the measure dropdown, find the **variant button** — a small icon showing a function symbol (f) with a plus sign (+).
4. Click the button. A popover opens showing all 14 variant kinds.
5. Each variant shows its eligibility status:
   - **Eligible** variants display the suggested name (e.g. `base_amount_ytd`) and can be clicked to create immediately.
   - **Ineligible** variants show the specific reason they cannot be created and what needs to be configured. For example: "This measure is not linked to a time hierarchy. Go to the Hierarchies panel, create a time hierarchy with the required levels, then link this measure to it."
   - **Already added** variants are greyed out.
6. For parametric variants (`trailing_n`, `moving_avg_n`), a text field appears where you can enter the window size `N`.
7. Click an eligible variant to create it. The new measure is added to the catalog and becomes available in the pivot table's measure dropdown.

### Managing variants

To remove a variant, untick it in the Measures panel Drawer and Save. The variant row is deleted; queries that referenced it will fail with an unknown-measure error.

To rename or re-format a variant row, open the variant directly. Source column, aggregation, and data type are inherited from the base and are not editable on the variant row — change them on the base.

### Multiple variants with different calendars

You can create the same variant type multiple times on the same base measure, each with a different hierarchy:

- `revenue_ytd` — year-to-date using the standard calendar hierarchy
- `revenue_ytd_fiscal` — year-to-date using the fiscal calendar hierarchy

Each produces a separate measure row with distinct period boundaries. BI tools see them as independent measures and can place them side by side in the same pivot table.

### What happens when you delete a hierarchy

If you delete a hierarchy that a variant depends on, the variant loses its period-boundary capability. The base measure still works, but the variant row becomes invalid and is marked with a warning. Either re-create the hierarchy or remove the variant.

---

## How variants are computed

Each variant is rewritten into a window function at query time. Period boundaries are computed using SQL expressions derived from the hierarchy's calendar type — for example, `EXTRACT(YEAR FROM date)` for a standard calendar or a fiscal-year CASE expression for fiscal calendars. If a calendar table is present in the model, the system uses it instead of expressions for backward compatibility. Postgres is the canonical authoring dialect; for BigQuery and Spark, Tessallite transpiles the canonical SQL via sqlglot. The variant row is metadata only — it does not duplicate the value in storage unless the AI optimiser proposes a per-variant aggregate.

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

## Troubleshooting

| Message | Meaning | What to do |
|---|---|---|
| "This measure is not linked to a time hierarchy." | The measure has no hierarchy association. Without this link, the system cannot determine which time levels and calculations are available. | Go to the Hierarchies panel. Create a time hierarchy if one does not exist, add levels with the correct time units and allowed time calculations, then link this measure to the hierarchy. |
| "The linked time hierarchy does not declare the '...' capability on any level." | The hierarchy exists and is linked, but none of its levels have the required time calculation enabled. | Edit the linked hierarchy. On the appropriate level, enable the missing calculation (e.g. `period_to_date` for YTD, `parallel_period` for prior year). |
| "The linked time hierarchy has no '...'-grain level." | The hierarchy is linked and has the right calculation, but is missing a level at the required granularity (e.g. no year-level for YTD). | Edit the linked hierarchy and add a level with the missing time unit. |
| "The linked time hierarchy has no calendar type configured." | Period-aware variants need a calendar type on the hierarchy. | Edit the linked hierarchy and set a calendar type (standard, fiscal, hijri, or iso). |
| "A measure named '...' already exists in this model." | A variant with this name was previously created, or another measure uses the same name. | Delete or rename the conflicting measure, then try again. |

---

## Pitfalls

- **Creating a period-boundary variant without a calendar type.** The variant will be marked as ineligible. Edit the hierarchy and set a calendar type before enabling period-boundary variants.
- **Mixing calendars in the same pivot query.** Querying `revenue_ytd` (standard) and `revenue_ytd_fiscal` (fiscal) in the same pivot with a single date dimension produces meaningless cross-calendar numbers. Use one calendar system per query context.
- **Assuming all variants need a calendar type.** Window variants (`lag`, `trailing_n`, `moving_avg_n`) work without any calendar configuration — they only need a date dimension in the query grain.

---

## Related

- [Define Measures](define-measures.md)
- [Configure Calendar Table](configure-calendar-table.md)
- [Associate Calendar with Dimensions](associate-calendar-with-dimensions.md)
- [Calendar Types](../concepts/calendar-types.md)
- [Use the AI optimiser](use-the-ai-optimiser.md)

---

← [Calculated Measures](calculated-measures.md) | [Home](../index.md) | [Configure Calendar Table →](configure-calendar-table.md)
