---
title: "Predictive Aggregates"
audience: modeller
area: modelling
updated: 2026-04-25
---

## What this covers

Predictive aggregates are aggregates Tessallite builds *before* any query is observed, using **table statistics** collected from the source — row counts, distinct counts, null ratios, top-N values, and join selectivity. This article explains how the predictor works, the four moving parts the modeller controls (storage budget, eviction policy, approval gate, feedback loop), and how predictive aggregates coexist with manual and demand-defined ones.

---

## When to use predictive aggregates

A new model has no observed workload — no query log, no miss patterns, nothing for the AI optimiser to learn from. The first BI user pays the cold-path cost against the source. Predictive aggregates close that gap: Tessallite samples the source on deploy, scores plausible aggregates by expected speed-up per unit of storage, and builds the top-K within the model's budget.

Predictive aggregates are **Postgres-only in v1**. BigQuery and Spark equivalents are deferred to Phase 9.x; non-Postgres models keep relying on demand-defined aggregates.

---

## The four moving parts

### 1. Source statistics

When you click **Deploy**, the optimiser samples each connected source and writes:

- `source_statistics` — per-table row count and last refresh timestamps
- `source_column_statistics` — per-column distinct count, null ratio, top-N values
- `source_join_statistics` — per-declared-join selectivity (rows out / rows in)

Probes are bounded — `INFORMATION_SCHEMA`, `pg_stats`, and small `TABLESAMPLE` queries on Postgres. No full table scans.

You can recompute on demand from the **Connections** page (per-source freshness chip + **Recompute** button) or set a per-source cadence (`daily` / `weekly` / `monthly`). The **Statistics inspector** tab in the OptimizerPanel shows the raw numbers — useful even outside the predictor for picking dimensions and naming display folders.

### 2. The scorer

`services/optimizer/src/advisor/predictive_scorer.py` is a pure function. Given the statistics + your model metadata (measures, hierarchies, declared joins), it ranks every plausible aggregate (measure × hierarchy level × optional top-N filter) by:

```
expected_hit_rate × row_reduction
─────────────────────────────────
   build_cost × storage_cost
```

Each candidate ships with a rationale string ("scores high because it cuts 100M rows to 5K and three measures share its grain"). No ML in v1 — composable with future ML later.

### 3. Auto-build on deploy (queued, async)

Top-K candidates within the storage budget enqueue as build tasks through the same CTAS path that manual and AI-optimiser aggregates use. The deploy click does not block on builds. Predicted aggregates are tagged `creation_reason='predictive'` so they remain visually distinct in every panel.

### 4. The feedback loop

A nightly sweep (`predictive_feedback_sweep`, runs at the configured `scheduler.predictive_feedback_hour`) walks every active tenant and does two things:

- **Validate.** Predictive aggregates that hit at least `predictive.validation_min_hits` queries in the last `predictive.evaluation_window_days` are stamped `predictive_validated_at = now` and emit a `validated` lifecycle event. The `creation_reason` is intentionally **not** changed — a validated predictive aggregate keeps its `predictive` label.
- **Retire.** Predictive aggregates older than `predictive.unused_retire_days` that have **never** hit a query are flipped to `status='retired'` and emit a `retired_unused` event.

Validated aggregates also influence eviction (see below).

---

## Storage budget

Each model carries a dual-axis budget in **Settings → Configuration**:

| Setting | Default | Notes |
|---|---|---|
| `predictive_storage_budget_bytes` | null (unlimited) | Hard cap on total bytes occupied by predictive aggregates for this model. |
| `predictive_storage_budget_count` | null (unlimited) | Hard cap on the number of predictive aggregates. |

Either or both may be null. The build orchestrator computes estimated bytes *before* DDL, not after, so the budget is enforced cleanly.

---

## Eviction policy

When a build pushes the model over budget, the per-model `predictive_eviction_policy` decides which aggregate to drop:

| Policy | Behaviour |
|---|---|
| `predicted_first` | Drop the oldest unvalidated predictive aggregate first. Validated ones survive longer. |
| `lru` | Drop the predictive aggregate that has gone the longest without a hit. |
| `validated_survives` | **Recommended default for production.** Never evict an aggregate that has been validated by the feedback loop. |
| `never_evict` | Refuse to build new predictive aggregates if the model is already at budget. The build worker fails the queued task with a clear reason. |

Manual and AI-optimiser aggregates are never touched by predictive eviction.

---

## Approval gate (what-if preview)

`predictive_requires_approval` defaults **true** on a fresh model. After a deploy, the **PreviewPanel** lists every candidate the scorer proposed with rank, score, rationale, and estimated bytes. The modeller approves, rejects, or defers each one. Only approved candidates spend storage.

Set the flag false to auto-approve everything within budget — appropriate once you trust the predictor on your model shape.

---

## How predictive interacts with demand and manual

| Path | Trigger | Tag | Eviction |
|---|---|---|---|
| Manual | Modeller clicks **New** in the Aggregates panel | `creation_reason='manual'` | Never auto-evicted |
| AI optimiser (demand) | Repeat miss pattern | `creation_reason='demand'` | Retired by AI optimiser when patterns shift |
| Predictive | Statistics-driven prediction at deploy | `creation_reason='predictive'` | Subject to per-model `predictive_eviction_policy` |
| Workload | Phase 3 training mode (postponed) | `creation_reason='workload'` | n/a |

The query router treats all four identically at match time — the tag is purely for governance, eviction, and reporting.

---

## Settings reference

| Key | Level | Default | Restart |
|---|---|---|---|
| `scheduler.predictive_feedback_hour` | system | `6` | yes |
| `predictive.evaluation_window_days` | system / tenant / model | `7` | no |
| `predictive.validation_min_hits` | system / tenant / model | `3` | no |
| `predictive.unused_retire_days` | system / tenant / model | `14` | no |

---

## Related

- [Configure Aggregates](configure-aggregates.md)
- [Aggregate Lifecycle](aggregate-lifecycle.md)
- [Cold-start Latency](cold-start-latency.md)
- [Aggregates (concept)](../concepts/aggregates.md)
- [Use the AI Optimiser](use-the-ai-optimiser.md)

---

← [Configure Aggregates](configure-aggregates.md) | [Home](../index.md) | [Aggregate Lifecycle →](aggregate-lifecycle.md)
