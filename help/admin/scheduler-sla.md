---
title: "Scheduler SLA Declarations"
audience: tenant_admin
area: admin
updated: 2026-05-02
---

## What this covers

Scheduler SLA declarations let you set a maximum allowed duration for aggregate refresh jobs. When a refresh exceeds the declared duration, the SLA monitor records a breach and can fire a webhook. This page explains how to define SLAs, what the monitor measures, and how to respond to breaches.

## Why SLA declarations matter

Refresh jobs run on a schedule and are mostly unattended. Without declared SLAs, a job that takes 4 hours instead of 30 minutes will not surface any alert. Users discover the problem only when dashboards show stale data.

An SLA declaration adds a policy layer: "this job should complete in under N minutes; if it does not, notify the on-call channel." The scheduler monitors all active jobs and fires the configured webhook as soon as a breach is detected.

## Defining an SLA

SLAs are managed in the Scheduler panel under the SLA Declarations tab.

To create an SLA:

1. Open the Scheduler panel.
2. Switch to the **SLA Declarations** tab.
3. Click **Add SLA**.
4. Fill in:
   - **Schedule name** — which refresh schedule this SLA applies to.
   - **Max duration (minutes)** — the maximum time a refresh job may run before being flagged as a breach.
   - **Webhook URL** — the endpoint to call when a breach is detected (optional).
5. Save.

Or via API:

```
POST /api/v1/scheduler/sla
{
  "schedule_id": "<uuid>",
  "max_duration_minutes": 30,
  "webhook_url": "https://hooks.example.com/sla-breach"
}
```

## How the monitor works

The SLA monitor runs as an hourly sweep job. On each run it:

1. Finds all refresh jobs with `status=running` or `status=completed` within the last 24 hours.
2. For each job with an associated SLA declaration, checks `started_at + max_duration_minutes`.
3. If the current time exceeds the deadline and the job is still running, or if the job completed after the deadline, it records a breach.
4. If a webhook URL is configured, it sends a POST with the breach details as JSON.

## Breach webhook payload

```json
{
  "event": "sla_breach",
  "schedule_id": "<uuid>",
  "schedule_name": "Daily main refresh",
  "sla_id": "<uuid>",
  "max_duration_minutes": 30,
  "actual_duration_minutes": 47,
  "started_at": "2026-05-02T03:00:00Z",
  "detected_at": "2026-05-02T04:00:00Z"
}
```

## Retry behaviour

If the webhook call fails (non-2xx response or network error), the monitor retries up to 3 times with exponential backoff. Failed deliveries are visible in the SLA Declarations tab under **Webhook delivery log**.

## Updating and deleting SLAs

SLAs can be updated via PATCH and deleted via DELETE. Deleting an SLA does not affect in-flight jobs; breach detection stops from the next sweep cycle.

## Limits

- One SLA per schedule. A second SLA on the same schedule overwrites the first.
- The monitor sweep runs hourly. Breaches detected between sweep runs will be recorded on the next run.
- Webhook delivery is best-effort; it is not a guaranteed delivery channel.

---

## Related

- [Manage Aggregate Schedules](../modelling/manage-aggregate-schedules.md)
- [Run a Refresh](../modelling/run-a-refresh.md)
- [Webhooks](webhooks.md)

---

← [Security Audit Trail](security-audit-trail.md) | [Home](../index.md) | [Architecture Overview →](../system-admin/architecture-overview.md)
