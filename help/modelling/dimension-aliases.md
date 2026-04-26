---
title: "Dimension Aliases"
audience: modeller
area: modelling
updated: 2026-04-26
---

## What this covers

A **dimension alias** lets the same physical dimension table appear in a model under more than one role. The classic case: an order has both a *merchant city* and a *payment city*, but both columns join to the same `cities` table. With aliases you register the table twice — once as `merchant_city`, once as `payment_city` — and joins, dimensions, and queries can target each role independently. This article explains what an alias is, how to create and edit one, and how aliases interact with the calendar and with time-variant measures.

---

## Before you start

- The source must already be added to the project. See [Add a data source](add-a-data-source.md).
- The physical table you want to alias must be added to the model at least once. See [Add tables to a model](add-tables-to-a-model.md).

---

## What an alias is

Every `ModelTable` in a model carries an `alias` field — a short, lowercase identifier such as `merchant_city`. The alias is the natural key the rest of the model uses to refer to that table. Two `ModelTable` rows can share the same `physical_name` but each must have a distinct alias, and joins, dimensions, and the catalog all key off the alias rather than the physical name.

If you only ever use a dimension once, the alias is just the table's display identifier. The mechanism becomes load-bearing only when you need the same physical table in two or more roles.

---

## Create a second alias

1. Open the **Sources** panel in Model Builder.
2. Expand the source whose dimension you want to reuse.
3. On the dimension row (any non-fact table), click the **Create alias** icon (the clone icon next to the edit icon).
4. Enter a new **Alias** — lowercase, digits, underscores; must be unique within the model. The default **Display name** mirrors the alias and is what BI tools show; edit it if you want a friendlier label.
5. Click **Create**. A new `ModelTable` row is added pointing at the same physical table.

Aliases are independent: each carries its own **display name**, **description**, and join configuration. The original table stays unchanged.

---

## Edit an existing alias

Click the **Edit** icon on any non-fact table row in the Sources panel to open **Edit table**. The dialog exposes:

- **Alias** — rename the alias. Downstream joins, dimensions, and measures keep working because they reference the row's id, not its alias string.
- **Display name** — the label shown to BI tools and in the Builder.
- **Type** — fact, dim_aggregate, or dim_detail.

Only changed fields are written; leaving a field untouched skips that update.

---

## Joining each alias independently

After creating a second alias, open the **Joins** panel. Each alias appears as its own node, picking up the alias label rather than the physical name. Add a join from the fact table to each alias, mapping the appropriate fact column — for example, `fact.merchant_city_id → merchant_city.city_id` and `fact.payment_city_id → payment_city.city_id`. Dimensions on each alias then group and filter independently in queries.

---

## How aliases appear in the catalog

The published catalog namespaces dimension and column names by alias, so a query that asks for `merchant_city.name` resolves only on the merchant role and a query that asks for `payment_city.name` resolves only on the payment role. This applies to the Measure Query panel, the Pivot grid, the Excel/JDBC interfaces, and aggregates.

---

## Calendar tables are also aliases

A calendar table is a `ModelTable` alias whose `calendar_table_id` is set. Auto-create or Bind on the Sources panel provisions both the calendar registration and a companion alias in one step. Multiple calendars per source are allowed — for instance, a fiscal calendar and a Gregorian calendar — and each lives as its own alias.

If a model has more than one calendar alias, each **time-variant measure** picks which one it uses. See the next section.

---

## Pinning a calendar on a time-variant measure

1. Open **Measures**, pick a base measure, and click **Edit**.
2. Scroll to **Time variants**. The section shows a **Calendar alias** picker listing every `ModelTable` in the model with a calendar binding.
3. Pick the alias the measure should use. Period-aware variants (`_ytd`, `_qtd`, `_mtd`, `_prior_year`, `_yoy_growth`, …) are required to have one — the picker is starred when any such variant is enabled.
4. Tick the variants you need and save. All variants of this measure inherit the same calendar alias from the base.

If no alias has a calendar binding the panel shows the *"Period-aware time variants need a calendar alias"* hint instead of the picker; provision a calendar from the Sources panel first.

---

## Naming conventions

- Use lowercase, digits, and underscores — same rules as snake_case identifiers. Avoid spaces and punctuation.
- Prefer role-prefixed names: `merchant_city`, `payment_city`, `order_date`, `ship_date`. Do not embed the physical table name in the alias.
- Calendar aliases are auto-sequenced: `calendar`, `calendar_2`, `calendar_fiscal`, etc. Override at create time if you want a domain-specific name.
- The **display name** is the human label — feel free to title-case it (`Merchant City`); the alias stays in snake_case.

---

## What happens when you delete an alias

Deleting a `ModelTable` alias removes only that role from the model. The underlying physical table is never altered, and other aliases of the same physical table remain. Joins, dimensions, and measures attached to the deleted alias are removed with it — open Health to confirm there are no orphaned references before you publish.

---

## Troubleshooting

- **"Alias must be unique"** — pick a name that is not already used by another `ModelTable` in this model.
- **Dim picker still shows one entry after creating an alias** — refresh the model; the catalog rebuilds on the next save.
- **Calendar picker is missing on a time-variant measure** — no `ModelTable` in the model has a calendar binding. Open the Sources panel and click the calendar icon to provision one.
- **Period-aware variant rejected on save** — the chosen calendar alias is missing one of the period columns the variant requires (e.g. `quarter_no` for `_qtd`). Edit the calendar's column mapping or pick a different alias.

---

## Related

- [Define Dimensions](define-dimensions.md)
- [Define Joins](define-joins.md)
- [Define Measures](define-measures.md)
- [Configure Calendar Table](configure-calendar-table.md)
- [Configure Time Variants](configure-time-variants.md)

---

← [Define Dimensions](define-dimensions.md) · [Home](../index.md) · [Define Measures](define-measures.md) →
