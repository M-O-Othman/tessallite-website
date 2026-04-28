---
title: "Demo tenant: acme-demo"
audience: all
area: getting-started
updated: 2026-04-25
---

## What this covers

`acme-demo` is the comprehensive demo workspace shipped with Tessallite. It exercises every modelling feature against a self-contained dataset so new operators can explore a working install without authoring anything from scratch.

It supersedes the legacy `acme-test` fixture. `acme-test` scripts remain in `tessallite/scripts/` for backward compatibility, but new code should target `acme-demo`.

---

## What it contains

- One project (`project1`).
- Two models in that project:
  - `modelx` — small smoke model: one fact, three measures, one persona, one row-security rule.
  - `modely` — comprehensive model: two facts, snowflake dims, time + geo hierarchies, twelve measures (sum / avg / calculated / currency + percent formats / six time variants), three personas, two row-security rules (mapping + role predicate), two pocket tables, three predictive aggregates with one demand-driven, three lifecycle events, ten drill-through sets, five glossary entries.
- Source schema `acme_demo_src` and target schema `acme_demo_target` in `tessallite_system`. Both are recreated on every reseed.

---

## How it gets seeded

The deploy step seeds it automatically. On `tessallite/deploy/local/steps/06_sample_data.sh` (and the GCP equivalent in `09_sample_data.sh`), after the legacy `demo_data` load:

1. Source and target schemas are loaded from `deploy/Sample-db/acme-demo/*.sql`.
2. The acme-demo tenant is reset, the project + four connections are created, then both models are re-imported from the JSON bundles in `tessallite/seeds/acme-demo/`.

The seed is conditional on `SYSTEM_DATABASE_URL` and `CREDENTIAL_ENCRYPTION_KEY` being set. If the seed assets are missing, the deploy step prints a notice and continues.

---

## Rebuilding the seed locally

To rebuild the JSON bundles from a clean state:

```bash
bash scripts/regenerate-acme-demo-seeds.sh
```

This script orchestrates:

1. `tessallite/scripts/reset_acme_demo_tenant.py` — drops + recreates the tenant.
2. `tessallite/scripts/load_acme_demo_schemas.sh` — recreates `acme_demo_src` + `acme_demo_target`.
3. `tessallite/scripts/seed_acme_demo_project.py` — imports project + connection + models from the project export bundle.

Re-running against an unchanged codebase produces zero diff.

---

## Adding a new feature to modely

1. Modify `tessallite/scripts/bootstrap_acme_demo_models.py` to add the feature.
2. Run `bash scripts/regenerate-acme-demo-seeds.sh`.
3. Commit the changed `tessallite/seeds/acme-demo/{modelx,modely}.json` and `MANIFEST.sha256`.

The committed JSON is the source of truth. Container deploys re-import from those files; they do not re-run the bootstrap step.

---

## Test fixture

`tests/conftest.py` exposes the `acme_demo_seeded` session-scoped pytest fixture. It is opt-in: set `ACME_DEMO_FIXTURE_ENABLED=1` (and `SYSTEM_DATABASE_URL` + `CREDENTIAL_ENCRYPTION_KEY`) to enable. It is checksum-gated via `tessallite/seeds/acme-demo/.last_seeded_checksum` (gitignored), so unchanged seed inputs are a no-op (~0.01 s); a fresh reseed runs in roughly six seconds.

The comprehensive coverage suite is `tests/e2e/test_acme_demo_modely.py` — one or more tests per feature row in the modely matrix. Run it with:

```bash
ACME_DEMO_FIXTURE_ENABLED=1 \
SYSTEM_DATABASE_URL=postgresql+asyncpg://tessallite:<pw>@localhost:5432/tessallite_system \
CREDENTIAL_ENCRYPTION_KEY=<key> \
pytest tests/e2e/test_acme_demo_modely.py
```

---

## Related

- [Install Tessallite Locally](install-local.md)
- [First-time setup](first-time-setup.md)
- [Workspaces and tenants](../concepts/workspaces-and-tenants.md)

---

← [Connect Excel](connect-excel.md) | [Home](../index.md) | [Workspaces and Tenants →](../concepts/workspaces-and-tenants.md)
