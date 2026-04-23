---
title: "Drill-through"
audience: modeller
area: modelling
updated: 2026-04-23
---

## What this covers

Drill-through returns the fact-table rows that contributed to a specific aggregated value. Tessallite exposes drill-through as a per-measure REST endpoint and as the cell-click action of the [Measure Query Panel](measure-query-panel.md).

This page covers the drill-through set configuration, what rows are returned, how pagination works, and the v1 limitations.

---

## How drill-through works

For every standard measure, Tessallite maintains a `drill_through_set` — a small configuration object that records:

- The **source fact table** the measure aggregates (derived from the measure's source column or UDA).
- The **detail columns** returned when drilling. If unset, every column of the fact table is returned.
- Optional **joined dimension ids** for including human-readable dimension values in the result (reserved).
- An optional **row-limit override**.

A set is created automatically when a measure is created; you do not need to configure it unless you want to restrict which columns are returned.

Drill-through is disabled on:

- **Calculated measures** — they have no single source column.
- **Composite or multi-fact measures** — v1 requires exactly one source column per measure.

---

## What you get back

A drill-through call returns:

- A `columns` array — the column names and data types in the result page.
- A `rows` array — each row is an array of values aligned with `columns`.
- A `page` object — `cursor`, `next_cursor`, and `has_more` for opaque offset-based pagination.
- The `fact_table` physical name for transparency.

Rows are ordered by the first column in the result for stable pagination. Literal filter values are never concatenated into SQL — they are bound positionally so the endpoint is safe against injection.

---

## Calling the endpoint

```
POST /api/v1/measures/{measure_id}/drill-through
{
  "filters": [
    { "column": "country", "op": "eq", "value": "DE" }
  ],
  "grouping_levels": [
    { "column": "quarter", "op": "eq", "value": "2024-Q2" }
  ],
  "cursor": null,
  "limit": 500
}
```

`filters` and `grouping_levels` are both translated into `WHERE` predicates. The distinction is semantic only — grouping levels carry the cell-position constraints (the dimension values that identify the pivot cell), and filters carry any additional global constraints.

Supported operators: `eq`, `neq`, `gt`, `gte`, `lt`, `lte`, `like`, `ilike`, `in`, `between`, `is_null`, `is_not_null`.

---

## Pagination

`cursor` and `next_cursor` are opaque strings. Pass the `next_cursor` from the previous response back as `cursor` on the next call. The server over-fetches by one row to detect `has_more`; `next_cursor` is `null` when the result set is exhausted.

---

## v1 limitations

| Limitation | Notes |
|---|---|
| PostgreSQL sources only | BigQuery and Spark drill-through is reserved for a future phase. |
| No multi-fact joins | The drilled rows come from a single source fact table. |
| No dimension joins in the result (v1) | Dimension values are returned only if the fact table stores them directly. |
| Per-page limit clamped to 10 000 rows | Default page size is 1 000. |

Errors return a stable `error_code` in the response body — for example `DrillThroughUnsupportedCalculated`, `DrillThroughUnsupportedComposite`, `DrillThroughUnknownColumn`, or `DrillThroughConnectorUnsupported`. Clients should branch on the code, not the human-readable message.

---

## Related

- [Measure Query Panel](measure-query-panel.md)
- [Calculated Measures](calculated-measures.md)

---

← [Live vs Aggregate](../querying/live-vs-aggregate.md) | [Home](../index.md) | [Set a Query Target →](set-a-query-target.md)
