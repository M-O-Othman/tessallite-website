---
title: "API Reference"
audience: modeller
area: Integrations
updated: 2026-04-17
---

## What this covers

REST API endpoint reference for Tessallite. All endpoints require HTTP Basic authentication unless stated otherwise. See [API Authentication](api-authentication.md) for credential and role details.

**Base URL**: `http://HOST:3000/api/v1`

> REST API endpoint paths are subject to change between major versions. Check release notes when upgrading across major versions.

---

## Health

| Method | Path | Auth required | Description |
|--------|------|---------------|-------------|
| `GET` | `/health` | No | Returns `{"status":"ok","db_migration":"N"}`. Use to verify the Frontend service is reachable. |

---

## Workspaces

System Admin only.

| Method | Path | Auth required | Description |
|--------|------|---------------|-------------|
| `GET` | `/workspaces` | System Admin | List all workspaces |
| `POST` | `/workspaces` | System Admin | Create a workspace. Body: `{"slug":"acme","display_name":"Acme Corp","admin_email":"admin@acme.com"}` |
| `GET` | `/workspaces/{slug}` | System Admin | Get workspace details |
| `DELETE` | `/workspaces/{slug}` | System Admin | Delete workspace (irreversible — removes all projects, models, and aggregates) |

---

## Projects

Tenant Admin or Modeller.

| Method | Path | Auth required | Description |
|--------|------|---------------|-------------|
| `GET` | `/workspaces/{slug}/projects` | Tenant Admin or Modeller | List all projects in the workspace |
| `POST` | `/workspaces/{slug}/projects` | Tenant Admin | Create a new project |
| `GET` | `/workspaces/{slug}/projects/{id}` | Tenant Admin or Modeller | Get project details |
| `DELETE` | `/workspaces/{slug}/projects/{id}` | Tenant Admin | Delete project and all its models and aggregates |

---

## Aggregates and diagnostics

Modeller or higher.

| Method | Path | Auth required | Description |
|--------|------|---------------|-------------|
| `GET` | `/workspaces/{slug}/projects/{id}/aggregates` | Modeller | List aggregates with status (Ready, Building, Stale, Error) |
| `POST` | `/workspaces/{slug}/projects/{id}/aggregates/{agg_id}/refresh` | Modeller | Trigger immediate aggregate refresh (async; poll GET aggregates to check status) |
| `GET` | `/workspaces/{slug}/projects/{id}/diagnostics` | Modeller | Get model health diagnostics (schema drift, permission errors, build failures) |

---

## Model definition

| Method | Path | Auth required | Description |
|--------|------|---------------|-------------|
| `GET` | `/workspaces/{slug}/projects/{id}/model` | Modeller | Get model definition: tables, joins, dimensions, measures |

---

## Related

- [API Authentication](api-authentication.md)
- [Supported Data Sources](supported-data-sources.md)
- [Common Errors](../troubleshooting/common-errors.md)

---

← [API Authentication](api-authentication.md) | [Home](../index.md) | [Excel Connection Problems →](../troubleshooting/excel-connection-problems.md)
