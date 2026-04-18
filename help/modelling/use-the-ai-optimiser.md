---
title: "Use the AI Optimiser"
audience: modeller
area: Modelling
updated: 2026-04-17
---

![AI optimiser recommendations panel.](../assets/screencaps/ai-optimiser-recommendations.png)

## What this covers

The AI Optimiser analyzes query miss patterns against your model, scores potential aggregate configurations by estimated return on investment, and surfaces ranked recommendations. This article explains how to open the Optimiser, how to read the recommendation list, and how to act on each recommendation.

---

## How the Optimiser works

Every time a query reaches the Query Router and no suitable aggregate exists to answer it, the miss is recorded in the query miss log. The Optimiser reads this log, groups misses by grain (the combination of dimensions and measures requested), and scores each group by the estimated query time that could be saved if an aggregate existed for that grain. The result is a ranked list of candidates ordered from highest to lowest ROI.

The Optimiser requires data in the query miss log before it can make recommendations. At least some queries must have run against the model after it was published. If no queries have run yet, the recommendation list will be empty.

---

## Opening the AI Optimiser

1. Open your project in Model Builder.
2. In the Toolbelt on the right side of the screen, click **Optimiser**.
3. The AI Optimiser panel opens and displays the current recommendation list.

---

## Reading the recommendation list

| Column | Description |
|--------|-------------|
| Grain / Dimensions | The set of dimension columns defining this aggregate's level of detail. |
| Measures | The numeric columns the Optimiser recommends pre-aggregating for this grain. |
| Query hits | The number of times this pattern was missed. Higher values = more frequent. |
| ROI score | Combines query frequency and estimated time saved per query. |
| Action | Build, Schedule, or Dismiss. |

---

## Actions

**Build** — Queues the aggregate for immediate construction. The aggregate appears in Canvas as Building, then transitions to Ready when complete.

**Schedule** — Adds the aggregate to the regular build cycle without an immediate build. The workspace default refresh schedule is applied. Adjust it in the aggregate Drawer or Scheduler panel.

**Dismiss** — Removes the recommendation without creating an aggregate. If the same miss pattern recurs, the recommendation may reappear.

---

## Re-scoring after acting on a recommendation

After you Build, Schedule, or Dismiss, the Optimiser re-scores remaining candidates and updates the list. Aggregates already built or scheduled are excluded from future recommendations.

---

## Optimiser vs. manual configuration

Use the Optimiser when you do not know which queries are slow or which aggregates would have the most impact.

Use manual aggregate configuration when you know the exact grain you need and want direct control over the definition, refresh schedule, and partitioning.

Both approaches can be combined. The Optimiser handles opportunistic coverage; manual configuration handles known, critical queries.

---

## Related

- [View Diagnostics](view-diagnostics.md)
- [Manage Aggregate Schedules](manage-aggregate-schedules.md)
- [Configure Aggregates](configure-aggregates.md)
- [Aggregates (concepts)](../concepts/aggregates.md)

---

← [View Diagnostics](view-diagnostics.md) | [Home](../index.md) | [Manage Aggregate Schedules →](manage-aggregate-schedules.md)
