---
title: "Deploy on GCP"
audience: system-admin
area: system-admin
updated: 2026-04-17
---

## What this covers

GCP-specific architecture for a production Tessallite deployment: Cloud Run services, Cloud SQL, load balancers, service account permissions, health check configuration, and instance scaling recommendations.

---

## Architecture on GCP

Each Tessallite service runs as a separate Cloud Run service. The internal PostgreSQL database is replaced by a Cloud SQL for PostgreSQL instance. Two load balancers handle external traffic:

- An HTTPS Load Balancer terminates SSL and routes port 8080 (XMLA) and port 3000 (frontend) traffic to the corresponding Cloud Run services.
- A TCP Load Balancer (or proxy arrangement — see below) handles port 5433 JDBC traffic for gateway.

---

## JDBC and port 5433 on Cloud Run

Cloud Run natively serves HTTP and HTTPS. It does not natively accept raw TCP connections on arbitrary ports such as 5433. Two options exist:

- **Option A (recommended for production):** Deploy gateway to a Compute Engine VM or GKE node pool instead of Cloud Run. This gives a stable TCP endpoint on port 5433 with no protocol translation overhead.
- **Option B (experimental):** Use Cloud Run with a TCP proxy forwarding rule. Not supported in all regions and carries no SLA from Google. Verify regional availability before adopting.

The XMLA endpoint (port 8080) does not have this limitation and runs on Cloud Run without modification.

---

## Environment variable differences from local

- `DB_HOST`: Set to the Cloud SQL private IP, or to `127.0.0.1` if using the Cloud SQL Auth Proxy sidecar.
- `SESSION_SECRET`: Must be set. Store in GCP Secret Manager and mount as an environment variable in Cloud Run.
- `DB_PASS`: Store in GCP Secret Manager. Mount via the Variables and Secrets tab in Cloud Run.

---

## Cloud SQL connection

- **Cloud SQL Auth Proxy sidecar:** Add the proxy as a sidecar container. Set `DB_HOST=127.0.0.1`. The proxy handles authentication and encryption.
- **Private IP:** Connect Cloud Run to a VPC using Direct VPC Egress or Serverless VPC Access. Set `DB_HOST` to the Cloud SQL private IP. Requires a private IP assigned to the Cloud SQL instance.

---

## Service account permissions

| Role | Required by | Purpose |
|---|---|---|
| `roles/cloudsql.client` | All except gateway | Authenticate to Cloud SQL |
| `roles/run.invoker` | All services | Allow inter-service HTTP calls within Cloud Run |
| `roles/artifactregistry.reader` | All services | Pull images from Artifact Registry |
| `roles/secretmanager.secretAccessor` | frontend, services using secrets | Read secrets from Secret Manager at startup |

---

## Health checks

Each service exposes `GET /api/health` on its HTTP port. A healthy response returns HTTP 200 with `{"status":"ok"}`. Configure the Cloud Run readiness probe with an initial delay of 10 seconds and a period of 30 seconds.

---

## Minimum instances

- **gateway:** Set `--min-instances=1`. JDBC clients hold long-lived connections and cannot tolerate cold-start delays.
- **All other services:** Can run at minimum 0 for cost savings.

---

## Estimated cost

For light usage (development or small team): Cloud SQL `db-f1-micro` plus Cloud Run on-demand pricing runs approximately $30–60 per month.

---

## Related

- [Deploy Locally](deploy-local.md)
- [Configure Environment Variables](configure-environment-variables.md)
- [Install on GCP](../getting-started/install-gcp.md)

---

← [Deploy Locally](deploy-local.md) | [Home](../index.md) | [Configure Environment Variables →](configure-environment-variables.md)
