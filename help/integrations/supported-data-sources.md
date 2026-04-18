---
title: "Supported Data Sources"
audience: modeller
area: Integrations
updated: 2026-04-17
---

## What this covers

Tessallite connects to backend data sources to read raw data and write pre-aggregated summaries. This article lists the supported sources, their drivers, connection parameters, and permission requirements.

---

## Summary

| Data source | Driver included | Auth method | Notes |
|-------------|----------------|-------------|-------|
| PostgreSQL | Yes (bundled) | Username / password | Tested PostgreSQL 13+. Supports SSL. |
| BigQuery | No (must add) | Service account JSON key | Simba/Google BigQuery JDBC driver required. |
| Hadoop / Spark Thrift Server | Yes (bundled Hive driver) | None or Kerberos | Tested with Spark 3.x Thrift Server. |

---

## PostgreSQL

Driver bundled. No additional installation required.

| Parameter | Value |
|-----------|-------|
| Host | Hostname or IP of the PostgreSQL server |
| Port | `5432` (default) |
| Database | PostgreSQL database name |
| User | PostgreSQL user with read access to source schemas |
| Password | PostgreSQL user password |
| SSL | Optional. Append `sslmode=require` to connection parameters. |

**Compatible managed services**: AWS RDS for PostgreSQL, Azure Database for PostgreSQL, Google Cloud SQL for PostgreSQL.

**Permissions required**: `USAGE` on source schemas, `SELECT` on source tables. For aggregate writes: `CREATE TABLE`, `INSERT`, `DROP TABLE` on the target schema.

---

## BigQuery

Requires the Simba (Google) BigQuery JDBC driver — not bundled. Place the JAR in the Tessallite driver directory (`lib/jdbc/`) and restart the Model Service.

| Parameter | Value |
|-----------|-------|
| GCP project ID | Your Google Cloud project ID |
| Dataset name | BigQuery dataset containing source tables |
| Service account key | Path to the service account JSON key file on the Tessallite host |

**Permissions required**: Service account must have `bigquery.jobs.create` and `bigquery.tables.getData` IAM roles. For aggregate writes, add write access to the target BigQuery dataset.

**Query dialect**: Standard SQL.

> The BigQuery JDBC driver must be installed separately. Tessallite does not distribute it.

---

## Hadoop / Spark Thrift Server

Hive JDBC driver is bundled with Tessallite.

| Parameter | Value |
|-----------|-------|
| Host | Hostname or IP of the Spark Thrift Server |
| Port | `10000` (default) |
| Database | Hive/Spark database name |
| Authentication | None or Kerberos |

**Tested with**: Apache Spark 3.x Thrift Server.

**Kerberos**: Requires additional configuration (keytab path, principal). See the Tessallite deployment guide.

**Databricks SQL Warehouse**: Use the Databricks JDBC driver (not the Hive driver) and configure it as a custom JDBC source.

---

## Related

- [JDBC Connection Guide](jdbc-connection-guide.md)
- [API Authentication](api-authentication.md)
- [Aggregates Not Building](../troubleshooting/aggregates-not-building.md)
- [Common Errors](../troubleshooting/common-errors.md)

---

← [Power BI Connection Guide](powerbi-connection-guide.md) | [Home](../index.md) | [API Authentication →](api-authentication.md)
