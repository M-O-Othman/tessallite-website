---
title: "Excel PivotTable Features"
audience: analyst
area: Integrations
updated: 2026-05-22
---

## What this covers

Once Excel is connected to Tessallite over XMLA, the PivotTable behaves like any Analysis Services cube. This page covers the advanced PivotTable features Tessallite supports — value and label filters, Show Values As, timelines, calculated fields, drill-through, and `GETPIVOTDATA` — and how each maps onto the semantic model. To connect in the first place, see [Connect Excel via XMLA](../getting-started/connect-excel.md).

---

## Show Values As

Right-click a value and choose **Show Values As** to display a measure as a percentage, running total, rank, or difference instead of the raw number. Tessallite supports % of Grand Total, % of Parent Row/Column, Difference From, % Difference From, Running Total, and Rank (largest or smallest). These are evaluated server-side as calculated members, so subtotals and grand totals stay consistent.

---

## Value filters and Top 10

Use **Value Filters** on a row or column field to keep only the members whose measure passes a test — for example *greater than*, *between*, or **Top 10**. Tessallite translates value tests to a `HAVING` clause and Top/Bottom-N to an `ORDER BY` with a `LIMIT`, so the filter runs in the database rather than in the workbook.

---

## Label filters

**Label Filters** (begins with, contains, ends with, and their negations) filter members by their caption. Tessallite maps these to SQL `LIKE` / `NOT LIKE` patterns with the wildcards escaped, so a search for a literal percent sign matches that character rather than everything.

---

## Timeline slicers

Insert a **Timeline** on a date hierarchy to filter the PivotTable to a date range with a drag handle. Tessallite exposes date dimensions with the metadata Excel needs to offer Year, Quarter, Month, and Day granularities, and translates the selected range into a date filter on the query. Combine a timeline with ordinary slicers to filter by date and by another dimension at the same time.

---

## Calculated fields

Excel's **Calculated Field** dialog lets you define a new measure as an arithmetic expression over existing measures (for example margin divided by revenue). Excel sends this as a session-scoped `WITH MEMBER` definition; Tessallite evaluates it after the query and preserves number formatting. The calculated field lives only in your workbook session — it does not change the published model.

---

## Drill-through to detail

Double-click a value cell to drill through to the fact rows behind it. Excel issues an XMLA `DRILLTHROUGH` statement and Tessallite returns the contributing rows on a new sheet, honouring the model's curated drill-through columns, row security, and your persona scope. The detail rows always reconcile to the cell you drilled from.

---

## GETPIVOTDATA

Reference a single PivotTable value from elsewhere in the workbook with `GETPIVOTDATA`. Tessallite resolves the function as a point query against the model, so a dashboard cell that uses `GETPIVOTDATA` stays correct when the PivotTable refreshes.

---

## Hierarchies and subtotals

Date, geography, and entity hierarchies appear in the field list with working expand/collapse. When you place more than one hierarchy on an axis, Tessallite computes the cross-product of subtotal levels so each subtotal and grand total is correct for additive measures. Non-additive measures (such as a ratio) show a dash in the total row instead of a misleading sum.

---

## Notes and limitations

- These features require an XMLA connection. SQL-based tools over JDBC see a flat relational view without PivotTable semantics.
- Calculated fields are session-scoped: they are not saved to the model and are not shared with other users.
- Power BI connects over the same XMLA endpoint but does not support XMLA drill-through natively.

---

## Related

- [Connect Excel via XMLA](../getting-started/connect-excel.md)
- [Tessallite Excel Add-in](excel-add-in.md)
- [Excel XMLA Connection Guide](excel-xmla-connection-guide.md)
- [Drill-through](../modelling/drill-through.md)

---

← [Excel XMLA Connection Guide](excel-xmla-connection-guide.md) | [Home](../index.md) | [Tessallite Excel Add-in →](excel-add-in.md)
