---
title: "Model Health"
audience: modeller
area: concepts
updated: 2026-04-17
---

![Model Builder — Health tab.](../assets/screencaps/model-health-tab.png)

## What this covers

This article explains the Model Builder's Health tab: what it checks, the three severity levels, each specific issue and how to resolve it, and when health checks run.

---

## What model health means

The Health tab is a diagnostic panel inside the Model Builder. It runs a set of structural checks against the model definition and surfaces issues that would prevent correct query routing or aggregate building. Health checks are not runtime monitors — they inspect the model definition itself, not live query traffic.

An issue in the Health tab means something in the model configuration is inconsistent with the current state of the source schema, or the model is structurally incomplete. Until those issues are resolved, the affected parts of the model will not function correctly.

---

## Severity levels

| Severity | Effect | Action required |
|---|---|---|
| Error | Blocks aggregate builds or prevents correct routing for affected objects. | Required before aggregate builds will run or routing will be reliable. |
| Warning | Routing may be degraded — some queries may fall through to raw data more often than expected. | Recommended. |
| Info | Advisory only. No functional impact. | Optional. |

---

## Common issues and how to resolve them

### Join column not found

**Severity: Error**

A column referenced in a join definition no longer exists in the source schema. This happens when the source data warehouse has been modified since the model was last synced.

To resolve: open the join in the Model Builder Drawer, update the left or right column to a column that currently exists in the source, and save. If the join is no longer valid, remove it entirely. Then run a schema sync to confirm the model is consistent with the current source.

### Measure column not numeric

**Severity: Error**

A measure is defined using an aggregation function (SUM, AVG, MIN, MAX) that requires a numeric column, but the selected source column has a text or boolean type.

To resolve: open the measure definition in the Drawer and either select a numeric source column or change the aggregation type to COUNT or COUNT DISTINCT.

### Fact table missing

**Severity: Error**

The model contains no table designated as `fact`. Every model requires exactly one fact table. Without it, the Scheduler has no anchor point and cannot generate aggregate build SQL.

To resolve: open the table in the Canvas, select it, and use the Drawer to change its type to `fact`. If the model has multiple candidates, designate the primary transaction table and reclassify the others.

### Schema drift detected

**Severity: Error**

A source table's schema has changed since the model was last synced. Tessallite detected the drift during a scheduled schema sync.

To resolve: open the Model Builder and run a schema sync from the table's context menu. After syncing, review dimensions and joins that reference the changed table — any that reference a removed column will appear as additional errors.

Running a schema sync only refreshes the available column list. You must manually update any dimension, measure, or join definitions that reference columns that no longer exist.

### Aggregate refresh overdue

**Severity: Warning**

An aggregate has not been refreshed within the expected window defined by its refresh schedule. Queries may be served from stale data or may fall through to raw data.

To resolve: open the Scheduler job log for the model and look for the failed or skipped refresh job. Fix the underlying cause and trigger a manual refresh from the Model Builder.

### Dimension with no queries

**Severity: Info**

A dimension exists in the model but has not appeared in any query within the usage window. The dimension is valid but may be unused. Consider whether it is needed, or whether users are accessing the data through a different name.

---

## How to navigate to an issue

Each row in the Health tab identifies the affected object by name and type. Click a row to jump directly to that object in the Canvas. The object will be selected and the Drawer will open with its full definition, ready to edit.

---

## When health checks run

- After you save any change to the model definition.
- After a scheduled schema sync completes (by default, once per day).
- After an aggregate refresh job completes or fails.
- On demand, by clicking "Run health check" in the Health tab toolbar.

---

## Related

- [Query routing](query-routing.md)
- [Roles and permissions](roles-and-permissions.md)
- [View diagnostics](../modelling/view-diagnostics.md)
- [Aggregates](aggregates.md)

---

← [Query Routing](query-routing.md) | [Home](../index.md) | [Roles and Permissions →](roles-and-permissions.md)
