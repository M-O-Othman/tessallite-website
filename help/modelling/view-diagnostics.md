---
title: "View Diagnostics"
audience: modeller
area: Modelling
updated: 2026-04-17
---

![Model Builder — Health tab.](../assets/screencaps/model-health-tab.png)

## What this covers

The Health tab in Model Builder surfaces errors and warnings about your model's structure. This article explains how to open the Health tab, what the severity levels mean, and how to interpret and resolve each type of issue.

---

## Opening the Health tab

1. Open your project in Model Builder.
2. Click the **Health** tab at the top of the Toolbelt panel on the right side of the screen.
3. The diagnostic list loads immediately. It reflects the current saved state of the model — unsaved Canvas changes are not included.

The Health tab is read-only. You make corrections in the Canvas, Drawer, or source schema, then return to the Health tab to confirm the issue has cleared.

---

## Severity levels

| Severity | Meaning | Effect on the model |
|----------|---------|---------------------|
| **Error** | A structural problem that prevents correct operation | Blocks aggregate build; affected aggregates cannot be built until resolved |
| **Warning** | A condition that degrades performance or correctness without fully blocking operation | Query routing may be impaired; aggregates may return stale or sub-optimal results |
| **Info** | An advisory observation with no immediate operational impact | No blocking effect; the model continues to function normally |

---

## Navigating to an affected object

Click any row in the diagnostic list. The Canvas scrolls to and highlights the affected table, join, dimension, or measure. The Drawer for that object opens automatically so you can inspect and edit its configuration.

---

## Diagnostic reference

| Issue | Severity | Cause | Resolution |
|-------|----------|-------|------------|
| Join column missing | Error | A column used in a join definition no longer exists in the source schema, typically because the source table was altered. | Open the join in the Drawer. Update the join to use a column that still exists, or remove the join if it is no longer needed. |
| Measure on non-numeric column | Error | A measure (sum, average, etc.) targets a column with a text or boolean data type. | Open the measure in the Drawer. Change the source column to a numeric column, or change the measure type to Count if counting rows is the intent. |
| Fact table missing | Error | No table in the model is designated as the fact table. | Open the relevant table's Drawer and change its Type to **Fact**. |
| Schema drift detected | Warning | The source table's column list has changed since the model was last synced. | Run a schema sync from the table Drawer or trigger a workspace-wide sync from workspace settings. |
| Aggregate refresh overdue | Warning | An aggregate has not been refreshed within its expected window. | Open the Scheduler panel, check the aggregate's last-refresh status, and re-run the refresh manually if needed. |
| Unused dimension | Info | A dimension is defined in the model but has never appeared in a query. | No immediate action required. Consider removing it to keep the model clean if it is not expected to be used. |

---

## Resolving errors before building aggregates

Any Error-severity diagnostic blocks the aggregate build process for the affected objects. Resolve all Errors first, save the model, then proceed to build or schedule aggregates.

---

## Related

- [View Model Lineage](view-model-lineage.md)
- [Use the AI Optimiser](use-the-ai-optimiser.md)
- [Model Health](../concepts/model-health.md)

---

← [View Model Lineage](view-model-lineage.md) | [Home](../index.md) | [Use the AI Optimiser →](use-the-ai-optimiser.md)
