---
title: "Add a Data Source"
audience: modeller
area: modelling
updated: 2026-04-17
---

![Model Builder — data source settings panel.](../assets/screencaps/data-source-settings.png)

## What this covers

Each Tessallite project connects to exactly one data source. This article explains how to view or change the data source connection from the project Settings panel, describes the connection parameters for each supported source type, and lists common connection failure causes and remedies.

---

## Steps

1. Open the project from the workspace dashboard.
2. Click the **Settings** tab at the top of the project page.
3. Locate the **Data Source** section. The current source type and connection parameters are shown.
4. To change the source type, select a new type from the **Source type** dropdown and fill in the parameters.
5. Click **Test Connection** to verify.
6. Click **Save** to apply the change.

> **Warning:** Changing the source type after tables have been added to the model will invalidate all table references. You must remove all existing tables and re-add them from the new source before the model can be used.

---

## Connection parameter reference

### PostgreSQL

| Parameter | Required | Notes |
|---|---|---|
| Host | Yes | Hostname or IP of the PostgreSQL server. |
| Port | Yes | Default is `5432`. |
| Database | Yes | The database name containing your schemas and tables. |
| User | Yes | Database user with SELECT access on the target schemas. |
| Password | Yes | Stored encrypted; never shown in plain text after saving. |

### BigQuery

| Parameter | Required | Notes |
|---|---|---|
| Project ID | Yes | The GCP project ID that owns the BigQuery dataset. |
| Dataset | Yes | The BigQuery dataset to expose. One dataset per project. |
| Service account JSON | Yes | Full JSON key file. Account must have `bigquery.dataViewer` and `bigquery.jobUser` roles. |

### Hadoop / Spark Thrift Server

| Parameter | Required | Notes |
|---|---|---|
| Thrift Server host | Yes | Hostname or IP of the HiveServer2 or Spark Thrift Server endpoint. |
| Port | Yes | Default is `10000` for HiveServer2, `10001` for Spark Thrift Server. |
| Database | Yes | The Hive or Spark database (schema) name. |

---

## What Test Connection checks

The test asks the gateway to authenticate against the source using the parameters you entered. It confirms:

- The host is reachable from the gateway's network.
- The port is open and the database service is listening.
- The credentials are accepted.
- For BigQuery: the service account JSON is valid and has sufficient permissions.

A successful test does not validate that specific schemas or tables exist.

---

## Common connection failures

| Error | Likely cause | Remedy |
|---|---|---|
| Connection timed out | Host not reachable; firewall or VPC block. | Allow the gateway's outbound IP through the source's firewall rules. |
| Connection refused | Database service not running on specified port, or wrong port. | Verify port number and confirm the database service is running. |
| Authentication failed | Wrong credentials or expired service account key. | Re-enter credentials. For BigQuery, generate a new key in the GCP console. |
| Database does not exist | Misspelled database name or user lacks access. | Confirm the database name and access grant. |
| Permission denied | User can connect but lacks SELECT on target schema. | Grant SELECT on the relevant schemas and tables. |

---

## Related

- [Create a Project](create-a-project.md)
- [Add Tables to a Model](add-tables-to-a-model.md)
- [Supported Data Sources](../integrations/supported-data-sources.md)

---

← [Create a Project](create-a-project.md) | [Home](../index.md) | [Add Tables to a Model →](add-tables-to-a-model.md)
