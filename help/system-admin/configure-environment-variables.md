---
title: "Configure Environment Variables"
audience: system-admin
area: system-admin
updated: 2026-04-17
---

## What this covers

The complete reference for all environment variables accepted by Tessallite. Also covers how to set variables in Docker Compose and Cloud Run, and how to keep secrets out of source control.

---

## Variable reference

| Variable | Required | Default | Services | Description |
|---|---|---|---|---|
| `DB_HOST` | Yes | `postgres` | All except gateway | Hostname of the internal PostgreSQL instance. In Docker Compose, use the service name `postgres`. On GCP, use the Cloud SQL private IP or `127.0.0.1` with Auth Proxy. |
| `DB_PORT` | No | `5432` | All except gateway | Port of the internal PostgreSQL instance. |
| `DB_NAME` | No | `tessallite` | All except gateway | Database name in the internal PostgreSQL instance. |
| `DB_USER` | Yes | — | All except gateway | PostgreSQL username. |
| `DB_PASS` | Yes | — | All except gateway | PostgreSQL password. Do not commit to source control. |
| `ADMIN_USER` | Yes | — | frontend | System Admin username for initial login to the web UI. |
| `ADMIN_PASS` | Yes | — | frontend | System Admin password. |
| `SESSION_SECRET` | Yes | — | frontend | Random string used to sign session tokens. Minimum 32 characters. No default — service will not start without this set. |
| `GATEWAY_PORT_JDBC` | No | `5433` | gateway | Port on which gateway listens for JDBC connections. |
| `GATEWAY_PORT_XMLA` | No | `8080` | gateway | Port on which gateway listens for XMLA connections. |
| `FRONTEND_PORT` | No | `3000` | frontend | Port on which the web UI is served. |
| `OPTIMIZER_SCORE_THRESHOLD` | No | `50` | optimizer | Minimum ROI score required before optimizer surfaces a build recommendation. Integer, 0–100. |
| `SCHEDULER_MAX_CONCURRENT` | No | `3` | scheduler | Maximum number of aggregate build jobs running simultaneously. |
| `LOG_LEVEL` | No | `info` | All | Log verbosity. Accepted values: `debug`, `info`, `warn`, `error`. |

---

## Setting variables in Docker Compose

Create a `.env` file in the same directory as `docker-compose.yml`:

```
DB_HOST=postgres
DB_PORT=5432
DB_NAME=tessallite
DB_USER=tessallite
DB_PASS=changeme
ADMIN_USER=admin
ADMIN_PASS=changeme
SESSION_SECRET=your-random-secret-here
```

Docker Compose reads this file automatically. Alternatively, set variables in the `environment:` block of each service in `docker-compose.yml` for non-secret values.

---

## Setting variables in Cloud Run

Via the CLI:

```bash
gcloud run services update SERVICE_NAME \
  --region REGION \
  --set-env-vars LOG_LEVEL=info,OPTIMIZER_SCORE_THRESHOLD=50 \
  --update-secrets DB_PASS=tessallite-db-pass:latest,SESSION_SECRET=tessallite-session-secret:latest
```

Via the console: Open the Cloud Run service, select Edit and Deploy New Revision, then open the Variables and Secrets tab.

---

## Security

Never commit `DB_PASS`, `ADMIN_PASS`, or `SESSION_SECRET` to source control. Add `.env` to `.gitignore`. On GCP, use Secret Manager for all credential values rather than embedding them in the Cloud Run service definition.

---

## Related

- [Deploy Locally](deploy-local.md)
- [Deploy on GCP](deploy-gcp.md)
- [Service Reference](service-reference.md)

---

← [Deploy on GCP](deploy-gcp.md) | [Home](../index.md) | [System Configuration →](system-configuration.md)
