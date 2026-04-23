---
title: "Configure Row Security"
audience: modeller
area: modelling
updated: 2026-04-23
---

## What this covers

Row security restricts which rows a user can see when they query a model. Rules are evaluated at query time by the Query Router: the planned SQL is wrapped in a security subquery that filters rows to the set the caller is authorised to see. This article covers the two rule shapes, how to author and test them, how the Router applies them at runtime, and the v1 limitations a modeller must know.

---

## When to use row security

Use row security when two or more audiences share the same model but must not see each other's rows. Typical cases:

- A regional sales model shared by regional managers, where each manager should only see their own region.
- A per-customer success model where every account-manager sees only their assigned accounts.
- A "self-service" model where the caller should only see rows tagged with their own user identity.

Row security is enforced by the Query Router for every read path — JDBC, XMLA, and REST — and cannot be bypassed by switching tool or query shape. The aggregate matcher and pocket matcher are disabled when any rule applies, so the filter always executes against the authoritative data.

---

## The two rule shapes

A rule is one of two shapes. A model can mix shapes freely; every enabled rule that matches the caller is ANDed together at query time.

### Role predicate

A rule authored in a small, restricted DSL, scoped to one or more named roles.

| Field | Meaning |
|---|---|
| `name` | Human label for the rule. |
| `dimension_path` | The model dimension the rule filters on, e.g. `region.region_code`. |
| `rule_type` | `role_predicate`. |
| `predicate_expression` | DSL string, e.g. `dimension_equals('region.region_code', 'NORTH')`. |
| `applies_to_roles` | List of role names. The rule fires only for callers whose JWT carries a matching `role` claim. |
| `is_enabled` | On/off switch. Disabled rules are ignored at query time. |

Supported DSL forms:

| Form | Meaning |
|---|---|
| `dimension_equals(path, value)` | Equality against one dimension column. |
| `in(path, v1, v2, …)` | Set membership on one dimension column. |
| `and(expr1, expr2, …)` | All children must hold. |
| `or(expr1, expr2, …)` | Any child must hold. |
| `not(expr)` | Negation. |

Anything outside this grammar is rejected at save time with a structured validation error — no free-form SQL can enter the predicate path.

### User mapping

A rule backed by a mapping table in the same model. The caller's user identity is looked up in the mapping table and the set of allowed values for the security dimension is derived per-request.

| Field | Meaning |
|---|---|
| `name` | Human label for the rule. |
| `dimension_path` | The model dimension the rule filters on. |
| `rule_type` | `user_mapping`. |
| `mapping_table_id` | A `ModelTable` in the same model holding `(user_identity, allowed_value)` rows. |
| `mapping_user_column` | Physical column on the mapping table that stores the user identity. |
| `mapping_value_column` | Physical column on the mapping table that stores the allowed dimension value. |
| `is_enabled` | On/off switch. |

Cross-model mapping tables are rejected at save time. This prevents a rule on model A from pulling allowed values out of a table that belongs to model B.

A user with multiple rows in the mapping table — e.g. one user mapped to two regions — sees the union of those values.

---

## Authoring workflow

1. Open the model in Model Builder.
2. Click **Row Security** in the Toolbelt.
3. Click **New Rule**. The drawer opens on a shape-adaptive form — picking `role_predicate` or `user_mapping` from the **Rule type** dropdown swaps the lower half of the form between the DSL editor + roles list and the mapping-table picker.
4. Fill in the fields and click **Save**. The server validates the DSL (for role predicates) or the mapping-table scope (for user-mapping rules) before accepting the rule.
5. Use **Simulate as user** to test the rule. Enter an email and a list of roles; the service compiles the rules against that principal and shows you the combined predicate that would be applied.
6. Toggle **Enabled** off to retire a rule without deleting it; queries ignore disabled rules.

Edit mode preserves the rule shape — the **Rule type** field is read-only after creation. If the shape needs to change, delete and recreate the rule.

---

## How the Router applies rules

For every read query, the Router:

1. Resolves the caller's `Principal` from the JWT: `user_identity` from `sub` / `email`, and `roles` from the `role` claim (a single string is treated as a frozenset of one).
2. Compiles every enabled rule on the model whose shape matches the principal — role predicates whose `applies_to_roles` intersects the principal's roles, and every user-mapping rule.
3. If at least one rule compiles, the planned SQL is wrapped:

   ```sql
   SELECT * FROM (<original planned SQL>) AS __ts_sec
   WHERE <combined predicate>
   ```

4. The aggregate matcher and pocket matcher are skipped — the wrap executes against the source so the predicate is never evaluated over a pre-aggregated rollup that may have dropped the security dimension.

When no rule matches the principal, the query runs as normal — the wrap is not applied and the aggregate / pocket fast paths remain available.

Callers with no JWT (internal service-to-service calls) pass `principal=None` and the wrap is not applied. Downstream gateway endpoints reject unauthenticated public traffic before it reaches the Router.

---

## v1 limitations

- **Inner SELECT must project the security dimension column.** The wrap references the dimension by its last path segment (e.g. `region.region_code` → `region_code`). If the inner query does not project that column, `is_query_compatible` returns false and the Router fails the query closed rather than emitting SQL that would reference an unprojected column. Workaround: ensure the model's `SELECT *` path for the fact table includes the security column, or add the column to the query grain.
- **Aggregate and pocket fast paths are bypassed when any rule fires.** Queries from audiences with active rules always execute against the source. If latency matters for those audiences, consider whether the rule can be expressed as a pre-filtered pocket owned per-audience instead.
- **Roles are strings carried on the JWT.** There is no central role registry in v1; the strings in `applies_to_roles` must match the exact `role` claim the IdP issues.
- **One security dimension per rule.** A rule filters on exactly one `dimension_path`. Compound rules are expressed by adding multiple rules, all ANDed together.

---

## Demo and simulation

The `acme-test` demo tenant seeds a working two-audience example out of the box:

- `alice.north@acme.test` — role `region_manager_north`, sees only `NORTH` rows via a role-predicate rule.
- `bob.south@acme.test` — role `region_manager_south`, sees only `SOUTH` rows via the same role-predicate pattern.
- A user-mapping rule backed by `demo_data.user_region_map` lets `carol.both@acme.test` see both `NORTH` and `SOUTH` (two mapping rows).

Running `scripts/seed_acme_test_demo.py` prints a 30-day JWT for each of the two role audiences. Paste the token into the Query panel's `Authorization: Bearer <token>` header to see the rule fire end-to-end.

---

## Related

- [Define dimensions](define-dimensions.md)
- [Configure aggregates](configure-aggregates.md)
- [Configure pocket tables](configure-pocket-tables.md)
- [View diagnostics](view-diagnostics.md)

---

← [Configure Pocket Tables](configure-pocket-tables.md) | [Home](../index.md) | [Run a Refresh →](run-a-refresh.md)
