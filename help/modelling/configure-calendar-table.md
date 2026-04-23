---
title: "Configure Calendar Table"
audience: modeller
area: modelling
updated: 2026-04-22
---

## What this covers

A calendar table holds one row per date with denormalised period columns — year, quarter, month, week, day. Period-aware time variants (`_ytd`, `_prior_year`, `_yoy_growth`, …) compute their period boundaries by joining the fact table to the calendar, not by date arithmetic on the fact's own timestamp. This article explains how to bind a calendar table to a data source and how to provision one if you don't already have it.

---

## Before you start

- The data source must be added to the project. See [Add a data source](add-a-data-source.md).
- You need either: (a) write access on the source, in which case Tessallite can auto-create the calendar table; or (b) an existing calendar table on the source that follows the standard column shape below.

---

## Standard column shape

| Period | Column name |
|---|---|
| Date | `date_key` |
| Year | `year_no` |
| Half | `half_no` |
| Quarter | `quarter_no` |
| Month | `month_no` |
| Week | `week_no` |
| Day of year | `day_no` |

`date_key` is the only required column. Period columns are optional but a variant that needs a missing period column will be silently dropped from the catalog.

---

## Steps — auto-create

1. Open the **Sources** panel in Model Builder.
2. Click the data source row, then **Calendar**.
3. Click **Auto-create**.
4. Choose a **start date** and **end date** for the calendar range.
5. Click **Generate**. Tessallite emits the dialect-specific DDL (Postgres `generate_series`, BigQuery `GENERATE_DATE_ARRAY`, or Spark `sequence`/`explode`) and runs it against the source. The new table is registered with `autocreated = true` and bound automatically.

---

## Steps — bind an existing table

1. Open **Sources → Calendar** as above.
2. Click **Bind existing**.
3. Enter the **table name** (schema-qualified if required by your source).
4. Confirm the column mapping. Tessallite probes the table for the standard column names; if any are missing or use different names, edit the mapping inline.
5. Click **Bind**. The catalog refreshes; period-aware variants on measures linked to this source's hierarchy now become admissible.

---

## Unbinding

Click **Unbind** in the Calendar panel. This removes the registration only — the physical table on the source is never dropped, even if Tessallite created it.

---

## Script-only mode

If your security policy disallows write access from Tessallite, click **Show DDL** instead of **Auto-create** or **Generate**. Tessallite emits the DDL as text, you run it manually on the source, then return and **Bind existing**.

---

## Related

- [Configure Time Variants](configure-time-variants.md)
- [Add a data source](add-a-data-source.md)
- [Set a query target](set-a-query-target.md)

---

← [Configure Time Variants](configure-time-variants.md) | [Home](../index.md) | [Calculated Measures →](calculated-measures.md)
