---
title: "Tessallite Help"
audience: all
area: getting-started
updated: 2026-04-22
---

## What this covers

This library documents Tessallite: how it works, how to connect BI tools, how to build models, and how to administer the platform. It covers all roles and all supported data sources.

---

## Who this library is for

### Analyst

Connects BI tools to Tessallite via JDBC or XMLA and queries data. Start with [What is Tessallite](getting-started/what-is-tessallite.md) and [Connect a BI tool](getting-started/connect-a-bi-tool.md).

### Modeller

Builds and maintains data models — defining dimensions, measures, joins, and aggregate policies. Start with [Projects and models](concepts/projects-and-models.md).

### Tenant Admin

Manages users, roles, and settings for one workspace. Start with [Workspaces and tenants](concepts/workspaces-and-tenants.md) and [Roles and permissions](concepts/roles-and-permissions.md).

### System Admin

Deploys and operates the Tessallite platform. Start with [Install locally](getting-started/install-local.md) or [Install on GCP](getting-started/install-gcp.md).

---

## Getting Started

- [What is Tessallite](getting-started/what-is-tessallite.md)
- [How Tessallite works](getting-started/how-tessallite-works.md)
- [Install locally](getting-started/install-local.md)
- [Install on GCP](getting-started/install-gcp.md)
- [First-time setup](getting-started/first-time-setup.md)
- [Connect a BI tool](getting-started/connect-a-bi-tool.md)
- [Connect Excel](getting-started/connect-excel.md)

## Concepts

- [Workspaces and tenants](concepts/workspaces-and-tenants.md)
- [Projects and models](concepts/projects-and-models.md)
- [Sources, tables, and joins](concepts/sources-tables-and-joins.md)
- [Dimensions and measures](concepts/dimensions-and-measures.md)
- [Aggregates](concepts/aggregates.md)
- [Query routing](concepts/query-routing.md)
- [Model health](concepts/model-health.md)
- [Roles and permissions](concepts/roles-and-permissions.md)

## Modelling

- [Create a project](modelling/create-a-project.md)
- [Add a data source](modelling/add-a-data-source.md)
- [Add tables to a model](modelling/add-tables-to-a-model.md)
- [Define joins](modelling/define-joins.md)
- [Define dimensions](modelling/define-dimensions.md)
- [Define measures](modelling/define-measures.md)
- [Configure time variants](modelling/configure-time-variants.md)
- [Configure calendar table](modelling/configure-calendar-table.md)
- [Calculated measures](modelling/calculated-measures.md)
- [Model canvas tour](modelling/model-canvas-tour.md)
- [Measure query panel](modelling/measure-query-panel.md)
- [Live vs aggregate (Route badge, Force Live)](querying/live-vs-aggregate.md)
- [Drill-through](modelling/drill-through.md)
- [Curate drill-through](modelling/curate-drill-through.md)
- [Set a query target](modelling/set-a-query-target.md)
- [Configure aggregates](modelling/configure-aggregates.md)
- [Configure pocket tables](modelling/configure-pocket-tables.md)
- [Configure row security](modelling/configure-row-security.md)
- [Configure personas](modelling/configure-personas.md)
- [Run a refresh](modelling/run-a-refresh.md)
- [View model lineage](modelling/view-model-lineage.md)
- [View diagnostics](modelling/view-diagnostics.md)
- [Use the AI optimiser](modelling/use-the-ai-optimiser.md)
- [Manage aggregate schedules](modelling/manage-aggregate-schedules.md)
- [Save and version a model](modelling/save-and-version-a-model.md)
- [Deploy a model](modelling/deploy-a-model.md)
- [Export and import a model](modelling/export-and-import-a-model.md)

## Admin

- [Create a workspace](admin/create-a-workspace.md)
- [Manage users](admin/manage-users.md)
- [Manage roles](admin/manage-roles.md)
- [Workspace settings](admin/workspace-settings.md)
- [Project settings](admin/project-settings.md)
- [Model configuration](admin/model-configuration.md)

## System Admin

- [Architecture overview](system-admin/architecture-overview.md)
- [Deploy locally (reference)](system-admin/deploy-local.md)
- [Deploy on GCP (reference)](system-admin/deploy-gcp.md)
- [Configure environment variables](system-admin/configure-environment-variables.md)
- [System configuration](system-admin/system-configuration.md)
- [Credentials and the .env file](system-admin/credentials-and-env.md)
- [Service reference](system-admin/service-reference.md)
- [Teardown](system-admin/teardown.md)
- [Upgrade](system-admin/upgrade.md)

## Integrations

- [JDBC connection guide](integrations/jdbc-connection-guide.md)
- [Excel XMLA connection guide](integrations/excel-xmla-connection-guide.md)
- [Power BI connection guide](integrations/powerbi-connection-guide.md)
- [Supported data sources](integrations/supported-data-sources.md)
- [API authentication](integrations/api-authentication.md)
- [API reference](integrations/api-reference.md)

## Troubleshooting

- [Excel connection problems](troubleshooting/excel-connection-problems.md)
- [Query returns wrong results](troubleshooting/query-returns-wrong-results.md)
- [Aggregates not building](troubleshooting/aggregates-not-building.md)
- [Service not starting](troubleshooting/service-not-starting.md)
- [Common errors](troubleshooting/common-errors.md)
