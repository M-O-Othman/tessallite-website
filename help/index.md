---
title: "Tessallite Help"
audience: all
area: getting-started
updated: 2026-04-17
---

## What this covers

This library documents Tessallite: how it works, how to connect BI tools, how to build models, and how to administer the platform. It covers all roles and all supported data sources.

---

## Who this library is for

### Analyst

An analyst connects a BI tool — Excel, Power BI, Tableau, DBeaver, or a custom application — to Tessallite using JDBC or XMLA credentials. The analyst writes queries and builds reports. Tessallite is transparent to the analyst: it looks like a standard database. This library explains how to connect, what to expect from query results, and how to interpret differences in behaviour.

### Modeller

A modeller defines the semantic layer: dimensions, measures, joins, and aggregation rules. Models determine what analysts can query and how Tessallite builds its pre-aggregated summaries. This library explains how to create and publish models, how aggregations are managed, and what model changes affect downstream queries.

### Tenant Admin

A tenant admin manages one workspace. This includes creating projects, managing users and roles, configuring data source connections, and monitoring usage within the workspace. This library explains workspace-level configuration, project management, and user administration.

### System Admin

A system admin manages the full Tessallite installation. This includes service configuration, multi-tenant provisioning, database management, scheduler control, and platform-level monitoring. This library explains installation, service startup, tenant provisioning, and system diagnostics.

---

## Sections

### Getting Started

Introduction to Tessallite, what it does, and how to connect a BI tool for the first time. Start here if you are new to the platform.

### Concepts

Explanations of the core ideas: the semantic model, aggregations, workspaces, tenants, projects, and roles. Read this section before building models or administering the platform.

### Modelling

Step-by-step guidance for creating models: defining dimensions and measures, configuring joins, setting aggregation rules, and publishing changes.

### Admin

Workspace and project management. Covers user administration, role assignment, data source connection, and workspace-level monitoring.

### System Admin

Platform-level operations. Covers installation, service configuration, tenant provisioning, and system diagnostics.

### Integrations

Guides for connecting specific BI tools and data sources: PostgreSQL, BigQuery, Hadoop/Spark Thrift Server, Excel, Power BI, Tableau, DBeaver, and psycopg2.

### Troubleshooting

Diagnostic guidance for common problems: connection failures, query errors, aggregation misses, model validation errors, and service health issues.

---

## Articles

### Getting Started

- [What is Tessallite](getting-started/what-is-tessallite.md)
- [How Tessallite works](getting-started/how-tessallite-works.md)
- [Connect a BI tool](getting-started/connect-a-bi-tool.md)
- [Your first query](getting-started/your-first-query.md)

### Concepts

- [Workspaces and tenants](concepts/workspaces-and-tenants.md)
- [Projects and models](concepts/projects-and-models.md)
- [Dimensions and measures](concepts/dimensions-and-measures.md)
- [Aggregations and summaries](concepts/aggregations-and-summaries.md)
- [Roles and permissions](concepts/roles-and-permissions.md)
- [Query routing](concepts/query-routing.md)

### Modelling

- [Create a model](modelling/create-a-model.md)
- [Define dimensions](modelling/define-dimensions.md)
- [Define measures](modelling/define-measures.md)
- [Configure joins](modelling/configure-joins.md)
- [Set aggregation rules](modelling/set-aggregation-rules.md)
- [Publish a model](modelling/publish-a-model.md)
- [Edit and version a model](modelling/edit-and-version-a-model.md)

### Admin

- [Create a project](admin/create-a-project.md)
- [Manage users and roles](admin/manage-users-and-roles.md)
- [Connect a data source](admin/connect-a-data-source.md)
- [Monitor workspace usage](admin/monitor-workspace-usage.md)

### System Admin

- [Install Tessallite](system-admin/install-tessallite.md)
- [Configure services](system-admin/configure-services.md)
- [Provision a tenant](system-admin/provision-a-tenant.md)
- [Manage the scheduler](system-admin/manage-the-scheduler.md)
- [Platform monitoring](system-admin/platform-monitoring.md)

### Integrations

- [Connect PostgreSQL](integrations/connect-postgresql.md)
- [Connect BigQuery](integrations/connect-bigquery.md)
- [Connect Hadoop / Spark Thrift Server](integrations/connect-hadoop-spark.md)
- [Connect Excel via XMLA](integrations/connect-excel-xmla.md)
- [Connect Power BI via XMLA](integrations/connect-powerbi-xmla.md)
- [Connect Tableau via JDBC](integrations/connect-tableau-jdbc.md)
- [Connect DBeaver via JDBC](integrations/connect-dbeaver-jdbc.md)
- [Connect psycopg2](integrations/connect-psycopg2.md)

### Troubleshooting

- [Connection failures](troubleshooting/connection-failures.md)
- [Query errors](troubleshooting/query-errors.md)
- [Aggregation misses](troubleshooting/aggregation-misses.md)
- [Model validation errors](troubleshooting/model-validation-errors.md)
- [Service health](troubleshooting/service-health.md)
