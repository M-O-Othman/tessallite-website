---
title: "Configure Calendar Table"
audience: modeller
area: modelling
updated: 2026-04-26
---

## What this covers

A calendar table holds one row per date with denormalised period columns — year, quarter, month, week, day. Period-aware time variants (`_ytd`, `_prior_year`, `_yoy_growth`, …) compute their period boundaries by joining the fact table to the calendar, not by date arithmetic on the fact's own timestamp. This article explains how to bind a calendar table to a data source and how to provision one if you don't already have it.

---

## Before you start

- The data source must be added to the project. See [Add a data source](add-a-data-source.md).
- You need either: (a) write access on the source — opt in by setting `write_access: true` in the project connection's config, see [Auto-create requires write_access](#auto-create-requires-write_access) below — in which case Tessallite can run the DDL and auto-create the calendar; or (b) an existing calendar table on the source that follows the standard column shape below.
- Auto-create with in-process execution is wired for **PostgreSQL** sources today. BigQuery and Spark sources still emit the DDL on Generate but can't run it for you yet — use **Get script** + **Bind existing** for those.

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
2. On the data source row, click the **calendar icon** (📅). The icon shows blue once a calendar is bound.
3. Switch to the **Auto-create** tab.
4. Set **Table name** (e.g. `calendar`). If you leave the name unqualified, Tessallite prefixes it with the connection's `schema` setting — `acme_demo_src.calendar` rather than `public.calendar`. To pin a different schema, type it explicitly: `my_schema.calendar`.
5. Choose a **start date** and **end date** for the calendar range.
6. Click **Generate**. Tessallite emits the dialect-specific DDL (Postgres `generate_series`, BigQuery `GENERATE_DATE_ARRAY`, or Spark `sequence`/`explode`) and — for PostgreSQL — runs it against the source. The new table is registered with `autocreated = true` and bound automatically.

### Auto-create requires `write_access`

The Generate button only runs DDL when the project connection has `write_access: true` in its config. This is a deliberate opt-in so Tessallite can never write to a source the operator hasn't explicitly approved. If the flag is off, Generate returns the DDL in the error payload and asks you to use the script + bind path.

To flip the flag on a connection: edit it through **Connections → Edit** (when the UI control ships) or set it directly in the tenant DB:

```sql
UPDATE "<tenant-slug>_meta".project_connections
SET    config = config || '{"write_access": true}'::jsonb
WHERE  display_name = '<your source connection name>';
```

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

If your security policy disallows write access from Tessallite, switch to the **Get script** tab, click **Show DDL**, copy the output, and run it on your source. Then come back, switch to **Bind existing**, and bind the table. Same outcome as auto-create, with you in control of the write.

---

## Using the calendar in the model

Binding a calendar table doesn't change any measure on its own — it unlocks **period-aware time variants** on existing measures:

1. Open **Measures**, pick the base measure (e.g. `revenue`), and click **Edit**.
2. Scroll to the **Time variants** section. Toggle the variants you want — the period-aware ones (`_ytd`, `_qtd`, `_mtd`, `_prior_year`, `_yoy_growth`) need a calendar bound to the source the measure ultimately reads. Pure-window variants (`_lag_n`, `_trailing_n`, `_moving_avg_n`) do not.
3. Save. Each enabled variant becomes its own measure (`revenue_ytd`, `revenue_prior_year`, …) so client tools can reference them directly.

If a period-aware variant is greyed out or rejected on save, the binding is missing or one of the period columns the variant needs (e.g. `quarter_no` for `_qtd`) isn't mapped.

---

## Troubleshooting

- **"Calendar operation failed"** — the dialog used to swallow the server detail; recent builds surface the real reason inline. Common causes:
  - `write_access` is off on the connection (auto-create only). Set the flag or use the script + bind path.
  - Source is BigQuery / Spark — auto-create executor isn't wired yet. Use Get script + Bind existing.
  - DDL ran but the source rejected it (permissions, schema doesn't exist, name collision). The error message shows the underlying SQL exception.
- **Generate succeeded but a time variant still doesn't show** — check the variant uses a period column you actually have. `_yoy_growth` needs `year_no`; `_qtd` needs `quarter_no`; missing optional columns silently drop the variant from the catalog.
- **Calendar already exists with a different shape** — bind the existing table instead, then edit the column mapping inline (see Bind existing).

---

## Related

- [Configure Time Variants](configure-time-variants.md)
- [Add a data source](add-a-data-source.md)
- [Set a query target](set-a-query-target.md)

---

← [Configure Time Variants](configure-time-variants.md) | [Home](../index.md) | [Calculated Measures →](calculated-measures.md)
