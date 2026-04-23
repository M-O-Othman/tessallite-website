---
title: "Live vs Aggregate"
audience: modeller
area: querying
updated: 2026-04-23
---

## What this covers

Every query you execute from the Query Panel or the Measure Query Panel takes one of three paths. This page explains what the paths are, how the Route badge identifies the one that served your query, and when to use the Force Live toggle to bypass the matchers.

---

## The three routes

- **aggregate** — the query was served from a pre-computed aggregate. Fast; suitable for dashboards and summary views.
- **pocket** — the query was matched against a pocket table (a curator-registered derived table). Used when the shape of the query matches a known derived result.
- **live (source)** — the query ran directly against the source fact table. Used when no aggregate or pocket matches, or when Force Live is on.

The route is chosen by the query router. The routing conditions are covered in [Query Routing](../concepts/query-routing.md).

---

## The Route badge

Every executed query shows a Route badge above the result grid. The badge text names the route. Hover the badge to see the routing reason — the same explanation the `/explain` endpoint returns — so you do not need a second request to understand why a particular path was chosen.

Three chips sit next to the Route badge:

- **rows** — the number of rows returned.
- **ms** — end-to-end execution time.
- **bytes** — bytes scanned, when the executor reports it.

The badge, its tooltip, and the three chips appear on both the Query Panel and the Measure Query Panel so the information is consistent across the two surfaces.

---

## The Force Live toggle

The **Force Live** toggle, next to the Execute button, forces the next query to skip aggregate and pocket matching and run directly against the source. Use it when you need to:

- Verify that the raw source agrees with a pre-computed aggregate.
- Compare a recent source change against the aggregate that has not yet been refreshed.
- Reproduce a reported discrepancy by running the same query both ways.

Force Live is a per-query flag. It resets to off on panel reload; it never becomes the default for a model.

**Row security is always enforced.** Force Live changes which table the query reads from, not which rows the caller is allowed to see. Every live query is still wrapped with the same row-security predicate that applies to aggregate and pocket routes.

---

## When to use which

| Goal | Use |
|---|---|
| Build a dashboard that reads a known slice | let the router pick; aggregate is preferred |
| Investigate a single value that looks wrong | run the query with Force Live; compare the Route badge reason against the aggregate route |
| Confirm a pocket table is doing its job | run the query normally, check the badge reads `pocket` |
| Test behaviour of a query before aggregates exist | Force Live; the miss will be logged and the Optimizer may propose an aggregate |

---

## Related

- [Query Routing](../concepts/query-routing.md)
- [Measure Query Panel](../modelling/measure-query-panel.md)
- [Drill-through](../modelling/drill-through.md)

---

← [Measure Query Panel](../modelling/measure-query-panel.md) | [Home](../index.md) | [Drill-through →](../modelling/drill-through.md)
