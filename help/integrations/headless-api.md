---
title: "Headless API"
audience: developer
area: integrations
updated: 2026-05-04
---

## What this covers

The headless API is a JSON-in, JSON-out query interface for non-SQL clients. It lets mobile apps, microservices, embedded analytics widgets, and custom integrations query the Tessallite semantic layer without writing SQL. Queries are expressed as lists of measure and dimension names with optional filters, and results come back as JSON arrays. This article covers authentication, the query and metadata endpoints, rate limiting, and worked examples.

---

## When to use headless API vs JDBC/XMLA

| Use case | Recommended interface |
|---|---|
| BI tools (Excel, Power BI, Tableau, DBeaver) | JDBC or XMLA |
| Mobile apps | Headless API |
| Microservice-to-microservice integration | Headless API |
| Embedded analytics in a web app | Headless API |
| Ad-hoc SQL exploration | JDBC |
| Automated reporting scripts | Either (headless is simpler if you don't need SQL) |

The headless API and JDBC/XMLA share the same semantic layer, the same aggregate routing, and the same security model. The difference is the query language: headless uses JSON measure/dimension names; JDBC/XMLA use SQL or DAX.

---

## Authentication

The headless API uses the same JWT tokens as the Tessallite SPA. Obtain a token via the login endpoint:

```bash
TOKEN=$(curl -s -X POST http://host:3000/api/v1/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"tenant_id":"acme-demo","email":"admin@acme-demo.com","password":"acme-demo"}' \
  | python3 -c 'import sys,json; print(json.load(sys.stdin)["access_token"])')
```

Include the token in all subsequent requests:

```
Authorization: Bearer $TOKEN
```

---

## Query endpoint

### POST /query-router/api/v1/headless/query

Resolves measure and dimension names against the semantic model, builds SQL via the routing pipeline (aggregate/pocket/source), executes, and returns rows.

**Request body:**

```json
{
  "project_id": "uuid",
  "model_id": "uuid",
  "measures": ["revenue", "order_count"],
  "dimensions": ["region", "order_date"],
  "filters": [
    {"dimension": "region", "operator": "eq", "value": "US"},
    {"dimension": "order_date", "operator": "between", "values": ["2025-01-01", "2025-12-31"]}
  ],
  "limit": 100,
  "offset": 0,
  "order_by": [{"field": "revenue", "direction": "desc"}]
}
```

**Required fields:** `project_id`, `model_id`, `measures` (at least one).

**Optional fields:** `dimensions`, `filters`, `limit`, `offset`, `order_by`.

**Filter operators:**

| Operator | Description | Value field |
|---|---|---|
| `eq` | Equals | `value` |
| `ne` | Not equals | `value` |
| `gt` | Greater than | `value` |
| `gte` | Greater than or equal | `value` |
| `lt` | Less than | `value` |
| `lte` | Less than or equal | `value` |
| `in` | In list | `values` (array) |
| `not_in` | Not in list | `values` (array) |
| `between` | Between (inclusive) | `values` (2-element array) |
| `like` | SQL LIKE pattern | `value` |
| `is_null` | Is NULL | (none) |
| `is_not_null` | Is not NULL | (none) |

**Response:**

```json
{
  "columns": ["region", "revenue", "order_count"],
  "rows": [
    {"region": "US", "revenue": 125000, "order_count": 430},
    {"region": "EU", "revenue": 98000, "order_count": 312}
  ],
  "total_rows": 2,
  "query_id": "a1b2c3d4e5f6g7h8"
}
```

---

## Metadata endpoints

### GET /query-router/api/v1/headless/models

Lists all models accessible to the authenticated user's tenant.

```json
[
  {
    "id": "uuid",
    "project_id": "uuid",
    "slug": "sales-model",
    "display_name": "Sales Model",
    "description": "Revenue and order metrics"
  }
]
```

### GET /query-router/api/v1/headless/models/{model_id}/measures

Lists all measures in the specified model.

```json
[
  {
    "id": "uuid",
    "name": "revenue",
    "display_name": "Revenue",
    "description": "Total revenue",
    "format": "$#,##0",
    "aggregation_type": "sum",
    "variant_kind": null
  }
]
```

### GET /query-router/api/v1/headless/models/{model_id}/dimensions

Lists all dimensions in the specified model.

```json
[
  {
    "id": "uuid",
    "name": "region",
    "display_name": "Region",
    "description": "Sales region",
    "is_time_dim": false
  }
]
```

---

## Rate limiting

The headless API enforces a per-tenant rate limit (default: 100 requests per minute). When the limit is exceeded, the API returns:

```
HTTP 429 Too Many Requests
```

Every response includes the `X-RateLimit-Remaining` header showing how many requests remain in the current window. Monitor this header to implement client-side throttling.

The rate limit is configurable via the `HEADLESS_RATE_LIMIT` environment variable.

---

## Worked example: curl

```bash
# 1. Authenticate
TOKEN=$(curl -s -X POST http://localhost:3000/api/v1/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"tenant_id":"acme-demo","email":"admin@acme-demo.com","password":"acme-demo"}' \
  | python3 -c 'import sys,json; print(json.load(sys.stdin)["access_token"])')

# 2. List models
curl -s http://localhost:3000/query-router/api/v1/headless/models \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool

# 3. List measures for a model
MODEL_ID="<model-uuid-from-step-2>"
curl -s "http://localhost:3000/query-router/api/v1/headless/models/$MODEL_ID/measures" \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool

# 4. Query
curl -s -X POST http://localhost:3000/query-router/api/v1/headless/query \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"project_id\": \"<project-uuid>\",
    \"model_id\": \"$MODEL_ID\",
    \"measures\": [\"revenue\"],
    \"dimensions\": [\"region\"],
    \"limit\": 10
  }" | python3 -m json.tool
```

---

## Pitfalls

- **Forgetting pagination.** Without `limit`, the API returns all matching rows. For large datasets, always set a limit.
- **Persona restrictions.** If the authenticated user's persona restricts certain columns, querying those measures or dimensions returns 403. Check the persona configuration if you get unexpected 403 errors.
- **Measure names are semantic names, not display names.** Use the metadata endpoint to discover the correct `name` field (e.g. `revenue`, not `Revenue`).

---

## Related

- [API Authentication](api-authentication.md)
- [API Reference](api-reference.md)
- [JDBC Connection Guide](jdbc-connection-guide.md)

---

← [API Reference](api-reference.md) | [Home](../index.md) | [Excel Connection Problems →](../troubleshooting/excel-connection-problems.md)
