---
title: "Query Panel"
audience: modeller
area: modelling
updated: 2026-05-15
---

## What this covers

The **Query** panel is a SQL workbench inside Model Builder. Paste a SQL statement, choose a dialect, validate it, explain the route, or execute it against the model. Use it when you need to test the query router directly instead of building a pivot in the Measure Query Panel.

---

## Main controls

| Control | Purpose |
|---|---|
| SQL editor | Holds the raw query sent to the router. |
| Dialect | Tells the validator how to parse the query: PostgreSQL, BigQuery, JDBC/Hadoop, or Spark SQL. |
| Force route | Optional override for source, aggregate, or pocket routing during investigation. |
| Persona | Runs the query as a selected persona so security and parameter filters can be checked. |
| Validate | Parses and checks the query without execution. |
| Explain | Shows the route and compiler trace without returning result rows. |
| Execute | Runs the query and displays rows, timing, route, and trace output. |

---

## When to use it

Use the Query panel to reproduce a BI-tool query, debug routing, compare forced routes, inspect generated SQL, and confirm row-security behavior for a persona. Use the Measure Query Panel when the question starts from one model measure and a few dimensions.

---

## Reading the route

The route trace explains whether Tessallite used an aggregate, a pocket table, or the live source. If the route is unexpected, run **Explain** first, then use **Force route** only for diagnosis. A forced route is not a model setting and should not be used to hide incomplete modelling.

---

## Related

- [Measure Query Panel](measure-query-panel.md)
- [Live vs Aggregate](../querying/live-vs-aggregate.md)
- [Configure Row Security](configure-row-security.md)

---

← [Measure Query Panel](measure-query-panel.md) | [Home](../index.md) | [Live vs Aggregate →](../querying/live-vs-aggregate.md)
