---
title: "Deploy Locally"
audience: system-admin
area: system-admin
updated: 2026-04-17
---

![Terminal — `docker compose ps` showing all services healthy.](../assets/screencaps/deploy-local-docker-ps.png)

## What this covers

Detailed configuration reference for a local Docker Compose deployment. This complements the guided install article in Getting Started. It covers environment variable configuration, volume management, resource requirements, and debug logging.

---

## Requirements

- Docker Desktop 24 or later with Compose v2.
- Minimum 2 CPUs and 4 GB RAM for a development deployment. 4 CPUs and 8 GB RAM recommended for sustained use.
- Ports 5433, 8080, and 3000 free on the host.

---

## Starting and stopping

```bash
# Start all services in the background
docker compose up -d

# Check service status
docker compose ps

# Stream logs for a specific service
docker compose logs -f query-router

# Stop all services (data volumes preserved)
docker compose down
```

---

## Persistent data

Tessallite uses one named volume: `tessallite_pgdata` — stores workspace metadata, model definitions, aggregate build history, and the query miss log.

This volume persists across `docker compose down` and `docker compose up` cycles. To delete it and all Tessallite data, use `docker compose down -v`. See the Teardown article for details.

---

## Environment variable configuration

Create a `.env` file in the same directory as `docker-compose.yml`. Docker Compose reads this file automatically.

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

Never commit `.env` to source control. Add it to `.gitignore`. Change `DB_PASS`, `ADMIN_PASS`, and `SESSION_SECRET` from the example values before running in any shared environment.

---

## Environment variable reference

| Variable | Service | Required | Default | Description |
|---|---|---|---|---|
| `DB_HOST` | All except gateway | Yes | `postgres` | Hostname of internal PostgreSQL. |
| `DB_PORT` | All except gateway | No | `5432` | Port of internal PostgreSQL. |
| `DB_NAME` | All except gateway | No | `tessallite` | Database name. |
| `DB_USER` | All except gateway | Yes | — | PostgreSQL username. |
| `DB_PASS` | All except gateway | Yes | — | PostgreSQL password. |
| `ADMIN_USER` | frontend | Yes | — | System Admin username for the web UI. |
| `ADMIN_PASS` | frontend | Yes | — | System Admin password. |
| `SESSION_SECRET` | frontend | Yes | — | Random string for session signing. Min 32 chars. No default. |
| `GATEWAY_PORT_JDBC` | gateway | No | `5433` | Host port for the JDBC listener. |
| `GATEWAY_PORT_XMLA` | gateway | No | `8080` | Host port for the XMLA listener. |
| `FRONTEND_PORT` | frontend | No | `3000` | Host port for the web UI. |
| `OPTIMIZER_SCORE_THRESHOLD` | optimizer | No | `50` | Minimum ROI score to surface a recommendation. |
| `SCHEDULER_MAX_CONCURRENT` | scheduler | No | `3` | Max parallel aggregate builds. |
| `LOG_LEVEL` | All | No | `info` | One of: `debug`, `info`, `warn`, `error`. |

---

## Enabling debug logging

```
LOG_LEVEL=debug
```

Add this to your `.env` file. Debug output is high volume — use it for short-duration troubleshooting only.

---

## Related

- [Architecture Overview](architecture-overview.md)
- [Configure Environment Variables](configure-environment-variables.md)
- [Install Tessallite Locally](../getting-started/install-local.md)

---

← [Architecture Overview](architecture-overview.md) | [Home](../index.md) | [Deploy on GCP →](deploy-gcp.md)
