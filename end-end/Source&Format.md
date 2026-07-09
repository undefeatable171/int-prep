# Sources, File Formats & Ingetion — Notes

---

## Sources

### ADLS (Primary File Source)

In our project we used Unity Catalog configured with Storage Credentials and External Locations pointing to ADLS Gen2. Access files via UC Volumes — no direct mounts, no account keys. Structured data via managed Delta tables. Gives centralized governance, RBAC, secure access.

```python
df = spark.read.csv("/Volumes/catalog/schema/raw_files/customer.csv")
```

---

### database (Postgres)

Databricks connects to the on-prem PostgreSQL database using a JDBC connection. connection URL and credentials stored in Azure Key Vault, accessed through Databricks secret scope.

**Default problem:** By default, a JDBC read goes through a single executor — full table scan, single connection, major bottleneck for large tables like claims or encounters.

**Fix — Partitioned JDBC Read:** Pass `partitionColumn`, `lowerBound`, `upperBound`, `numPartitions` → Spark splits into parallel range queries, each executor pulls its own chunk independently.

- Always partition on numeric ID columns (`claim_id`, `encounter_id`) — distribute evenly
- Avoid timestamp columns (`updated_at`) as partition column — causes skew

```Python
#Get dynamic bounds first (separate JDBC query)
lower, upper = SELECT min(encounter_id), max(encounter_id) FROM encounters WHERE updated_at > '2026-06-02'

url = "jdbc:postgresql://host:port/db"
properties = {
    "user": "username",
    "password": "password",
    "driver": "org.postgresql.Driver"
}
query = "(SELECT * FROM schema.table WHERE updated_at > '2025-01-01') as t";
df = spark.read.jdbc(
            url=url,
            table=query,
            properties=properties
        ).option("partitionColumn", "id")
         .option("lowerBound", lower)
         .option("upperBound", upper)
         .option("numPartitions", "8")
         .load()
```

---

### REST API (Pattern — not used in current project)

- In our current project we don't ingest from REST APIs directly — our sources are PostgreSQL via JDBC and flat files on ADLS.
- But the pattern is straightforward — you call the endpoint using Python's requests library inside a Databricks notebook, authenticate using API keys or OAuth tokens stored in Secret Scopes, handle pagination and incremental extraction through watermark parameters, then load the JSON response into Spark DataFrames and persist it to Bronze Delta tables.

```python
all_records = []
page = 1
while True:
    response = requests.get(url, params={"_page": page, "_limit": 100})
    records = response.json()
    if not records:
        break
    all_records.extend(records)
    page += 1

df = spark.createDataFrame(all_records)
```

---

## Spark Abstractions — RDD vs DataFrame vs Dataset
An abstraction is a simplified way of interacting with something complex by hiding the implementation details.

**RDD** (Resilent Distributed dataset ) - The lowest-level abstraction in Spark, representing a distributed collection of objects. Gives full control over data processing but lacks built-in query optimizations, so it's generally slower for ETL.
**DataFrame** - A DataFrame is distributed colletion of data organized into named columns with schema, similar to a SQL table — but split across multiple Spark executor nodes. 
- It is schema-aware, support SQL operations, and benefit from Catalyst Optimizer and the Tungsten execution engine, making them much faster and more suitable for production ETL pipelines.

 **Dataset**  - RDD type-safety + DataFrame optimization. Scala/Java only — not available in PySpark.

**Why DataFrame:** Schema-aware, SQL-compatible, auto-optimized by Catalyst Optimizer and Tungsten Execution Engine. Faster execution, less code. Default choice in PySpark pipelines.

**DataFrame properties:** Immutable · Lazily evaluated · Fault tolerant · In-memory distributed object

---

## DataFrame Creation


| Approach                      | Code                                                               |
| ------------------------------- | -------------------------------------------------------------------- |
| List of Tuples + column names | `spark.createDataFrame([(1,"John")], ["id","name"])`               |
| List of Tuples + StructType   | `spark.createDataFrame([(1,"John")], schema)`                      |
| List of Dicts                 | `spark.createDataFrame([{"id":1,"name":"John"}])`                  |
| Row objects                   | `spark.createDataFrame([Row(id=1, name="John")])`                  |
| Pandas DataFrame              | `spark.createDataFrame(pdf)`                                       |
| Range                         | `spark.range(1, 6)`                                                |
| Parallelize                   | `spark.sparkContext.parallelize([(1,"John")]).toDF(["id","name"])` |

---

## Read Modes

Applicable to **text-based formats only** (CSV, JSON, Text) — because they can contain malformed rows.
Parquet, ORC, Delta store typed structured data → no malformed-row handling needed at read time.


| Mode            | Behavior                                                                  |
| ----------------- | --------------------------------------------------------------------------- |
| `PERMISSIVE`    | Reads all rows; puts corrupt records in`_corrupt_record` column (default) |
| `DROPMALFORMED` | Silently drops bad rows                                                   |
| `FAILFAST`      | Throws exception on first bad row                                         |

---

## Write Modes


| Mode            | Behavior                                      |
| ----------------- | ----------------------------------------------- |
| `append`        | Adds new data to existing                     |
| `overwrite`     | Replaces existing data                        |
| `ignore`        | No-op if data already exists                  |
| `errorIfExists` | Throws error if data already exists (default) |

**Delta overwrite** is transactional — writes new files, commits via `_delta_log`, marks old files obsolete.
**CSV/Parquet overwrite** physically deletes existing files and rewrites.

---

## Schema Enforcement vs Schema Evolution

**Schema Enforcement** — write-time validation. Incoming data must match target schema. Incompatible columns or types → write rejected.

- Supported by: Delta Lake, Iceberg, Hudi
- Not supported by: CSV, JSON, Parquet (file formats have no enforcement mechanism)

**Schema Evolution** — controlled schema changes (add columns, widen types) without recreating the table. Existing files not rewritten — metadata updated. Reads return NULL for new columns missing in older files.

- Fully supported by: Delta Lake, Iceberg, Hudi
- Parquet: limited, engine-dependent only

> is parquet allows enforcement ?
Parquet stores schema in file footer metadata but does not enforce it during writes. Enforcement is a table-format concern, not a file-format concern.

---
---
---

## File Formats

### CSV

Text-based, comma-separated. Human-readable. No embedded schema.

```python
df = spark.read \
    .format("csv") \
    .option("header", "true") \
    .option("inferSchema", "false") \
    .schema(explicit_schema) \
    .option("sep", "|") \
    .option("quote", '"') \
    .load("path/to/file.csv")
```

- **`sep`** — column delimiter. Default comma. Use `|`, `;`, `\t` if file uses different separator. Wrong sep = entire row reads as one column.
- **`quote`** — enclosing character for fields containing delimiters. `1,John,"New York, USA"` without quote option splits into 3 columns incorrectly.
- Never use `inferSchema=True` in production — triggers full file scan, risk of type mismatches.

**Cons:** No data types (everything is text) · No compression · Full row scan — no column pruning · No schema enforcement

---

### JSON

Semi-structured, key-value. Supports nested and hierarchical data.

```python
df = spark.read \
    .schema(schema) \
    .option("multiLine", "true") \   # only if JSON spans multiple lines — kills parallelism
    .json("/path/input.json")
```

**JSON file vs JSON string column — critical distinction:**
| Method              | Used In                   | Purpose                                                          |
| ------------------- | ------------------------- | ---------------------------------------------------------------- |
| `response.json()`   | Python `requests` library | Converts an **HTTP API response** into a Python dictionary/list. |
| `spark.read.json()` | PySpark                   | Reads **JSON files** into a Spark DataFrame.                     |
| `from_json()`       | PySpark                   | Parses a **JSON string column** into a Struct/Array/Map.         |
| `to_json()`         | PySpark                   |  Spark struct to string (serialize)                             |


```python
# Parse JSON string column → Struct
df = df.withColumn("payload", from_json(col("payload"), schema))

# Access nested field
df.select("payload.address.city")

# Flatten struct
df.select("payload.*")

# Flatten array
df.select(explode("data").alias("emp")).select("emp.*")
```

- Default: one JSON object per line. `multiLine=true` → single partition, no parallelism.

**Cons:** Slow parsing · Large file size · Poor analytical performance

---

### Excel

Binary format. Not natively supported by Spark — requires `spark-excel` third-party library on cluster.

```python
df = spark.read \
    .format("com.crealytics.spark.excel") \
    .option("header", "true") \
    .option("dataAddress", "'Sheet1'!A1") \
    .schema(explicit_schema) \
    .load("path/to/file.xlsx")
```

- **`dataAddress`** — specifies starting cell or range. Used to skip title/metadata rows or read a specific table within a sheet.
  - `'Sheet1'!A1` → full sheet from A1
  - `'Sheet1'!A3` → skip first 2 rows
  - `'Employees'!A14:D50` → specific range only

**Cons:** Third-party library dependency (must be on all cluster nodes) · Not splittable — single executor reads entire file · Not suitable at scale — practical only for small human-generated reports

---

### Parquet

Open-source, binary, columnar format optimized for analytical workloads.  It stores data column-wise instead of row-wise, allowing Spark to read only the required columns through column pruning and skip irrelevant Row Groups using predicate pushdown based on footer statistics.

```python
df = spark.read.format("parquet").load("abfss://container@storage.dfs.core.windows.net/bronze/patients/")
```

**Internal structure:** `File → Footer → Row Groups → Column Chunks → Pages`

- **Footer** — schema, row group locations, column statistics (min/max, null count), encoding, compression. Spark reads footer first to plan execution.
- **Row Group** — horizontal partition inside the file. Each independent → Spark reads multiple Row Groups in parallel (splittable).
- **Column Chunk** — each column stored separately within a Row Group → column pruning reads only needed columns.
- **Pages** — smallest unit inside a Column Chunk. Contains data + encoding + compression.

**Why high compression:** Similar values stored together column-wise → compression algorithms work more efficiently. Snappy by default.

**Predicate pushdown:** Spark reads footer stats → skips entire Row Groups where min/max cannot satisfy the filter → no file open, no I/O for skipped groups.

**Cons:** No schema enforcement (file format — not a table format) · No ACID · No versioning · No time travel

---

## What is Delta?

Open-source storage layer on top of Parquet. Adds ACID, versioning, and schema enforcement via the **_delta_log transaction log**.

```python
df = spark.read.format("delta").load("abfss://container@storage.dfs.core.windows.net/silver/patients/")
df_v5 = spark.read.format("delta").option("versionAsOf", 5).load(path)
df_ts = spark.read.format("delta").option("timestampAsOf", "2024-01-15").load(path)
```

---

## What is _delta_log?

Hidden folder inside every Delta table. Stores transaction log and metadata — making Parquet files behave like a database table.

- Every Delta table contains a _delta_log folder that maintains the table's transaction log and metadata. It consists of JSON commit files and checkpoint Parquet files.
- JSon Comit Files: Each successful operation (INSERT, UPDATE, DELETE, MERGE) creates a new JSON file containing actions like AddFile, RemoveFile, Metadata, Protocol, and CommitInfo.
- Checkpoint Files: Consolidated metadata-only snapshot of the transaction log at a specific version, stored as Parquet. Created for every 10 commits by default.

  - spark reads latest checkpoint → replays only JSON commits after it → skips full history replay
  - At version 100: 10 checkpoint files exist (v10, v20 ... v100), each independent — Spark uses only the latest

**Why `_delta_log` needed if data is already in Parquet?**
Parquet stores only data. `_delta_log` stores metadata, transaction history, schema, and file-level changes.

### To read current STATE:

Delta checks the _delta_log folder instead of directly scanning Parquet files. It loads the latest checkpoint and then reads any newer JSON commit files to reconstruct the latest table snapshot, including the schema and active data files. Using metadata and file statistics, Spark applies partition pruning, predicate pushdown, and column pruning to eliminate unnecessary data. Finally, it reads only the required Parquet files and returns the DataFrame, making Delta reads much more efficient than scanning all files

### How Delta Reads Current State

```
User Query
     ↓
Locate _delta_log
     ↓
Read latest Checkpoint
     ↓
Read remaining JSON commits (after checkpoint)
     ↓
Build latest table snapshot → schema + active files
     ↓
Apply Partition Pruning
     ↓
Apply Predicate Pushdown / Data Skipping (per-file min/max stats)
     ↓
Apply Column Pruning
     ↓
Read only required Parquet files → Return DataFrame
```

---

## ACID in Delta


| Property        | How Delta delivers it                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Atomicity**   | New Parquet files written first; become visible only after atomic commit JSON appended to`_delta_log` — all or nothing |
| **Consistency** | Every write validated against table schema before commit — table always structurally valid                             |
| **Isolation**   | Snapshot isolation via OCC — each writer works on a consistent snapshot; conflicts fail at commit time                 |
| **Durability**  | Once`_delta_log` + data files written to ADLS/S3 — permanent; full table state rebuildable after crash                 |

---

## Snapshot Isolation:

- A mechanism where every transaction reads a consistent snapshot of the table.

---

## OCC — Optimistic Concurrency Control

Delta handles concurrent writes without locks. Conflicts validated only at commit time.

Each writer reads the latest snapshot, writes new Parquet files, validates for conflicts, and commits. If another transaction modified the same data, the commit fails and hence the job fails. The orchestration layer (e.g., Databricks Workflows) can retry the job.

### Write Flow

```
Read Snapshot
     ↓
Write new Parquet files
     ↓
Validate conflicts (OCC)
     ↓
Write Commit JSON → New Version Created → Transaction Visible
```

---
---
---
# Data Ingestion Patterns — Reference Notes

## 1. Ingestion Modes

| Mode | Description | Examples |
|---|---|---|
| **Batch** | Processes data periodically in chunks. Reliable and cost-effective, but trades off data freshness. | Hourly, daily, every 4 hours |
| **Streaming** | Continuously processes incoming data with very low latency. | Kafka, Event Hub |

## 2. Load Strategies / Patterns

### A. Full Load
Loads the entire source dataset every run, regardless of changes.

**When to use:** initial load, small datasets, reference/dimension data.

Two ways to implement it:
- **Overwrite** —  Delta's overwrite mode is transactional, preserves table structure, files  and Retains table history; supports time travel until `VACUUM` runs.
- **Drop and recreate** — Completely new table; schema can change freely. **Avoided** in practice because it destroys transaction history.

### B. Incremental Load
Loads only new or modified records since the previous successful run, using a checkpoint that stores the last successfully processed value.

| Technique | How it works | Notes |
|---|---|---|
| Timestamp watermark | `updated_at > last_run_time` | Most common; requires a reliable `updated_at` column maintained by the application |
| Sequence / ID-based | `id > last_max_id` | Requires a monotonically increasing key — new rows always have higher IDs |
| Offset-based | Tracks stream offsets | Used in Kafka / event streaming |

**Limitation:** incremental loading based on watermarks/IDs cannot detect deletes unless the source explicitly provides delete events.

### C. CDC (Change Data Capture)
An ingestion pattern used to identify changes in a source system — most commonly relational databases like PostgreSQL, MySQL, SQL Server, and Oracle. It captures inserts, updates, and deletes, so downstream systems process only the changed data instead of reprocessing entire tables.

- **How it works:** It typically works by reading database transaction logs (e.g., PostgreSQL WAL, MySQL Binlog, SQL Server Transaction Log and Tools like Debezium, Azure Data Factory CDC, AWS DMS, Oracle GoldenGate captures the changes generate CDC events. 
- In Databricks, CDC events are typically applied to Delta tables via `MERGE`.
- **Benefits:** This reduces load on the source system, minimizes data movement, enables efficient incremental pipelines.
- **File format:** CDC files in ADLS contain only changed records (not the full table), stored as JSON, Avro, Parquet, or Delta. Each event carries the operation type (INSERT/UPDATE/DELETE), key, changed data, and metadata such as timestamps.

##### C.1 Delta Change Data Feed (CDF)
A Delta Lake feature that records row-level changes (inserts, updates, deletes) made to a Delta table. Downstream pipelines read only the changed rows between table versions via `table_changes()`, instead of scanning the entire table.

Workflow: enable CDF on the source Delta table → read changed rows between two versions → apply changes to the target via `MERGE`.

```sql
-- Read only changed rows from Silver
cdf_df = spark.sql("""
  SELECT * FROM table_changes('silver.claims', 10, 15)
""")

cdf_df.createOrReplaceTempView("cdc")

-- Apply changes to Gold
spark.sql("""
MERGE INTO gold.claims t
USING cdc s
ON t.claim_id = s.claim_id

WHEN MATCHED AND s._change_type = 'delete'
  THEN DELETE

WHEN MATCHED AND s._change_type = 'update_postimage'
  THEN UPDATE SET *

WHEN NOT MATCHED AND s._change_type = 'insert'
  THEN INSERT *
""")
```

The returned DataFrame includes change metadata columns `_change_type` and `_commit_version`.

## 3. File Ingestion Mechanisms

| Mechanism | Description | Best for |
|---|---|---|
| **Direct Spark file read** | `spark.read.csv`, `spark.read.json`, etc. | Simplest option, ad-hoc / one-off loads |
| **COPY INTO** | SQL command to load files from cloud storage into Delta tables. Tracks processed files internally via the Delta log, so re-runs are safe (idempotent) by default. | Scheduled batch file loads, simple SQL-based ingestion |
| **Auto Loader** | Databricks feature for incrementally ingesting new files from cloud storage, avoiding a full folder rescan on every run. | Continuously/frequently arriving files needing scalable, incremental ingestion with schema evolution |

**COPY INTO example:**
```sql
COPY INTO bronze.claims
FROM 'abfss://landing/claims/'
FILEFORMAT = CSV;
```

**Auto Loader example:**
```python
df = spark.readStream \
    .format("cloudFiles") \
    .option("cloudFiles.format", "csv") \
    .option("cloudFiles.schemaLocation", "abfss://container@storage/checkpoints/schema/") \
    .schema(explicit_schema) \
    .load("abfss://container@storage/landing/eligibility/")

df.writeStream \
    .format("delta") \
    .option("checkpointLocation", "abfss://container@storage/checkpoints/eligibility/") \
    .trigger(availableNow=True) \
    .toTable("bronze.eligibility")
```

Auto Loader maintains a checkpoint with metadata of processed files. On each run it checks the checkpoint and ingests only new files, giving incremental, exactly-once file processing.

**File discovery modes:**
- **Directory listing** (default) — lists all files, compares against the processed list. Simple, works everywhere.
- **File notification** (production) — Azure Event Grid triggers on each new file arrival. Near real-time, no polling overhead, scales to millions of files.

**Trigger modes:**
- `trigger(availableNow=True)` — processes all pending files then stops (batch-like behavior).
- `trigger(processingTime="1 hour")` — fixed-interval micro-batch.

**Rule of thumb:** use Auto Loader when files arrive continuously/frequently and you need scalable, incremental ingestion with schema evolution. Use COPY INTO for scheduled batch loads where you want simple, idempotent SQL-based ingestion straight into Delta.

## 4. Write Strategies

| Strategy | Behavior | Best for |
|---|---|---|
| **Append** | Only inserts new rows; fast, writes new files only | Immutable/raw data (typically Bronze) |
| **Overwrite** | Transactional, replaces the entire table with new data; preserves table structure and handles deletions cleanly | Full reloads of reference/dimension tables |
| **Merge** | Upserts (INSERT + UPDATE + DELETE) based on a key; reads existing data and rewrites affected files | Mutable/curated data (typically Silver/Gold) |
| **Replace Where** | Overwrites only the partitions/rows matching a predicate, leaving the rest of the table untouched | Partition-level reprocessing/backfills |

## 5. Summary Matrix

| Ingestion Strategy | Processing Mode | Write Strategy | Example |
|---|---|---|---|
| Full Load | Batch | Overwrite | Reload reference table |
| Incremental | Batch | Append | Immutable event/log data (Bronze) |
| Incremental | Batch | Merge | Mutable tables with updates (Silver/Gold) |
| CDC | Streaming/Batch | Merge | Apply inserts, updates, deletes |
