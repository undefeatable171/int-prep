const cats = ["Sources", "Read", "write", "spark", "DBX", "Optimizations", "Differences"];
const qs = [
  // * <pre><code class="language-python">
  // df.filter(col("status") == "A")
  // </code></pre> */
  // 
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  {
    cat: "Sources",
    q: `APIs`,
    answer: ``,
    children:
      [{
        q: `Why response.json() for APIs`,
        a: `Because the API sends data as a JSON string, but Python needs a dictionary/list object to work with it. response.json() parses the JSON response body and converts it into Python dictionaries or lists, making it easier to access fields and load the data into Spark DataFrames`,
        children: [],
      },
      {
        q: `why pagination required`,
        a: `Pagination splits large API responses into smaller chunks, making data transfer more efficient and reliable.
Without pagination, the API would try to return millions of records in a single response, which can lead to high memory usage, slow transfers, and request timeouts. If the request fails at 99%, the entire download has to be retried. Pagination breaks the data into smaller batches, so only the failed page needs to be retried.`,
        children: [],
      }
      ],
  },
  //////////////////////////////
  {
    cat: "Read",
    q: `ABstractions`,
    answer: ``,
    tip: `a DataFrame is built on top of RDDs internally. `,
    children: [
      {
        q: `RDD VS DF`,
        a: ` 💠 RDD (Resilient Distributed Dataset) is Spark's core data structure—a fault-tolerant, immutable, distributed collection of objects that can be processed in parallel across a cluster. It provides fault tolerance through lineage, allowing Spark to recompute lost partitions by replaying transformations. RDDs do not enforce a schema and provide fine-grained control over transformations, but they do not benefit from the automatic query optimizations available to DataFrames.
<br>
💠 A DataFrame is distributed colletion of data  organized into named columns with schema, similar to a SQL table. DF ofers an high level api than RDDS.  Like RDDs, DataFrames are immutable, lazily evaluated, and fault tolerant. Transformations build a logical plan, which is optimized by Catalyst engine and executed efficiently by the Tungsten engine( with better memory managemnt).
<br>
💠 DataFrames are generally preferred because they provide automatic query optimization and efficient memory management, resulting in better performance and lower resource usage than RDDs. In modern Spark and Databricks ETL pipelines, DataFrames are the standard choice, while RDDs are mainly used for specialized low-level processing or legacy applications.`,
        children: [{
          q: `how rdd/df acheives fault tolerence`,
          a: `💠 Spark achieves fault tolerance through lineage.<br>
   💠 Lineage tracks how Each RDD  were built from other RDDs   . 
   <br> 💠  If an executor fails and a partition is lost, Spark doesn't recompute the whole dataset — it just replays the lineage for that specific partition without running the whole job
<br>💠 This works even for unpartitioned tables/parquet files because Spark creates its own internal partitions for distributed processing(likep1,p2..), so fault tolerance depends on Spark partitions rather than database table partitions.`,
          children: [],
        },
        ],
      },
      {

        q: ` What's the difference between createDataFrame and parallelize().toDF()`,
        a: `
createDataFrame is the modern, high-level Spark SQL API. Internally it handles schema inference, type mapping, and DataFrame creation in one call.
parallelize().toDF() is the old RDD-based path. You manually create an RDD first via SparkContext, then convert it to a DataFrame.`,
        children: [],
      },
      {
        q: `When would you use a Pandas DataFrame over a PySpark DataFrame?`,
        a: `when the data fits comfortably on a single machine and you don't need distributed compute. EX: config tables , ref tables (in few MBs)`,
        children: [],
      },
    ],
  },
  ///////////////////////////////////////
  {
    cat: `Read`,
    q: `How spark paralleism works`,
    answer: `💠 When Spark reads data, it creates internal input partitions(chunks) for parallel processing.Each partition is assigned to one task running on one executor core, so all partitions process in parallel. <br>
  💠 The partitioning depends on the file format, file sizes, and configurations like 
<code>spark.sql.files.maxPartitionBytes = 134217728
</code> Default is 128 mb

<br>💠A large file may be split into multiple input partitions, while multiple small files may be combined into fewer partitions to reduce overhead.
<br> 💠 These Spark partitions are independent of database table partitions where they are used for primarily data prining()data skipping<br>
____________________________________________________
<img src="../support/docs/Readpartitions&Shufflepartitions.png" alt="Image" style="max-width: 100%; height: auto;">
`,
    children: [
      {
        q: `what about shuffle partitioning`,
        a: `After a shuffle operation like a join or groupBy, Spark repartitions the data based on <code>spark.sql.shuffle.partitions</code>, default 200. This partition count matters a lot for performance — too few means underutilized cores, too many means scheduling overhead`,
        children: [],
      },
    ],

  },
  ////////////////////////////////////////////////////////////////////////////////
  {
    cat: `Read`,
    q: `Schema changes while Read`,
    answer: ``,
    children: [
      {
        q: ` HOw do you read multiple csv,json,parquet files `,
        a: `
When reading multiple files, the approach depends on the format and whether schemas are consistent across files.
      <ol>
        <li>
 <span style="color:Violet;"><b>  For CSV and JSON </b></span> both are schema-less, so wildcard reads with inferSchema are unreliable in production. inferSchema samples only a subset of files — fields present in later files get missed, type inconsistencies go undetected.
 <ul><li>My default is define the target schema explicitly, read each file individually against it, normalize, then union using unionByName with allowMissingColumns=True — columns matched by name not position, missing columns fill as null.</li>
 <li> CSV has an additional positional risk — Spark reads columns by order not name, so a silent column order change across files corrupts data without any error. </li>
 <li> JSON doesn't have this since it's key-name based, but missing keys and nested field inconsistencies are still a real risk without explicit schema. </li></ul>
     <pre><code class="language-python">
  target_schema = StructType([...])  # explicit target

def normalize(df, source_name):
    for c in target_schema:
        if c not in df.columns:
            df = df.withColumn(c, lit(None))
    # Cast each column to the canonical type
    for c, t in target_schema.items():
        df = df.withColumn(c, col(c).cast(t))
    df = df.withColumn("source", lit(source_name))
    return df.select(*target_schema.keys(), "source")

    df=[normalize(spark.read.format("csv").option("header",true).load(f.path),f.name) for f  in dbutils.fs.ls("path")]

# Union all — safe because all conform to same schema
from functools import reduce
df_final = reduce(DataFrame.unionByName, df_list)
  </code></pre> 
     
 </li>
        <li>
 <span style="color:Violet;"><b>  For Parquet </b></span>  — schema is embedded in the file footer so wildcard reads are generally safe and reliable.
 <ul>
        <li>
  Two risks remain — schema evolution where a new column appears in later files, and type conflicts where the same column has different types across files
        </li>
        <li>
For evolution I enable  <span style="color:Green;"><b>  mergeSchema </b></span>  explicitly: This builds a superset schema — missing columns in older files fill as null. For type conflicts mergeSchema won't help — those need explicit schema definition and per-file validation before union.
<pre><code class="language-python">df = spark.read 
    .option("mergeSchema", "true") 
    .format("parquet") 
    .load("path/*.parquet")</code></pre>
        </li>
        </ul>
        </li>
<li>  <span style="color:Violet;"><b>  Delta</b></span>  Delta doesn't need manual file-level union — _delta_log manages all active files under a table path, so a single <code>spark.read.format("delta").load(path)</code> gives you everything. <code>unionByName</code> with reduce is only needed when merging separate Delta tables with schema differences.</li>
        </ol>
      `,
        children: [],
      },
      {
        q: `what does inferschema do while reading files`,
        a: `💠By default, when Spark reads a CSV file, all columns are treated as strings.<br>
  💠inferSchema tells Spark to automatically detect column names and data types by scanning the file. Internally it does two passes — one to sample and infer types, one to actually read the data. 
  <br> 💠 The problem is it can guess wrong, it's slower, and in production pipelines schema can drift silently. In my Bronze layer I always define an explicit schema — that way if the source sends an unexpected type, the job fails loudly rather than corrupting downstream Silver and Gold tables`,
        tip: `inferSchema is mainly used for schema-less formats like CSV and JSON, where Spark needs to determine column data types from the data itself. <br>Self-describing formats such as Parquet, ORC, Avro, and Delta already store schema metadata, so inferSchema is not required and has no meaningful effect. <br>Text files are read as a single string column, so schema inference does not apply.`,
        children: [],
      },
    ],
  },
  ////////////////////////////////////////////////////////
  {
    cat: `DBX`,
    q: `DBX`,
    a: ``,
    children: [
      {
        q: `spark vs pyspark vs dbx`,
        a: `<ul>
  <li> Apache Spark is an open-source distributed data processing engine and a set of libraries used for big data workloads. <br>It supports in-memory computation which makes it significantly faster than traditional Hadoop map-reducer.<br> It supports multiple programming languages such as Scala, Java, Python, and R.</li>
  <li>PySpark is simply the Python API for Apache Spark, allowing us to write Spark applications in Python.</li>
  <li>Databricks is a cloud-based data and AI platform built on top of the Apache Spark.  It gives you optimized DBX runtimes (DBR), notebooks, cluster management, Databricks Workflows for orchestration, Delta Lake for ACID storage, Unity Catalog for governance, and integrations with Azure/AWS/GCP</li>
  <li>In simple terms, Spark is the processing engine, PySpark is the Python interface to Spark, and Databricks is a managed platform that simplifies developing and running Spark workloads with additional enterprise features.</li></ul>`,
        tip: `spark is built in scala.`,
        children: [{
          q: `"Is PySpark slower than Scala?"`,
          a: `No for DataFrame/SQL — same Catalyst optimizer, same JVM execution.
→ Yes only for plain Python UDFs due to serialization. Fix: use pandas_udf or native Spark functions.`,

          children: [],
        }],
      },
      {
        q: `what are magic commands`,
        a: `Magic commands in Databricks are notebook-specific commands prefixed with % that provide functionality beyond standard Spark APIs.<br>
  Commonly used magic commands include %sql for querying data, %fs for Databricks file system operations, %run for notebook reuse, %sh for shell commands, and %md for documentation.</br>
  <code>%sql %python %scala %R  <br>
  % md -- for markdown <br><br>
  %fs ls /FileStore/ -- Databricks File System utilities.<br>
  %fs cp source destination <br>
  %fs rm path -r <br>
  %fs mkdirs /tmp/data</code>
  <br><br>
  <code> %run /Shared/CommonFunctions --- Execute another notebook(like helper functions ).</code>`,
        tip: `they are native to databicks notebooks , noy spark`,
        children: [],
      },
      {
        q: `What is PHoton engine and uses`,
        a: `
<ul>
<li>Photon is Databricks' native vectorized execution engine written in C++ that runs automatically on Databricks clusters without any code changes. 
</li>
<li>
Instead of the JVM's row-oriented execution, it processes columnar batches natively, which significantly reduces JVM object allocation and garbage collection overhead. This makes scans, joins, shuffles, and aggregations much faster.</li><li>
<span style="color:red">Does it replaces JVM:  </span>It doesn't replace Spark JVM entirely — driver, Catalyst Optimizer, and scheduling remain JVM — Photon only takes over supported operators <span style="color:violet"><b> inside executors</b></span>, handing back to JVM via PhotonColumnarToRow for unsupported ops like Python UDFs, which is why we prefer native Spark functions over UDFs in production.
</li>
</ul>
        `,
        children: [],
      },
      {
        q: `WHats DLt and why not used DLT but WFs`,
        a: `
        Delta Live Tables (DLT) is a Databricks <b>declarative ETL framework</b> for building, orchestrating, and managing reliable ETL pipelines using SQL or PySpark.
        <ul>
        <li>
        In Pytin we define datasets using <pre><code class="language-python">@dlt.table</code></pre>, and to read an upstream DLT table, we use <pre><code class="language-python"> dlt.read("table_name") or dlt.read_stream("table_name") </code></pre> for streaming data. DLT analyzes these references to automatically determine dependencies.
        </li>
        <li>
        For data quality, DLT provides built-in expectations:

<pre><code class="language-python"> @dlt.expect() #Logs invalid records</code>
@dlt.expect_or_fail() #Fails the pipeline if invalid data is found
@dlt.expect_or_drop() #Drops invalid records
</pre>
allowing developers to focus mainly on transformation logic
</li><li>
DLT also supports three dataset types:<br>

Streaming Table – for continuously arriving streaming or append-only data. <br>
Materialized View – for transformed datasets that are stored physically and refreshed automatically. <br>
View – for intermediate logical transformations without storing data.
</li>
        </ul>
        `,
        children: [
          {
            q: `have you used DLT ?`,
            a: `
        I haven't used Delta Live Tables in production. In my project, we used Databricks Workflows for orchestration
        <ul>
        <li>
        We chose Workflows over DLT because our pipeline has mixed sources — JDBC with custom watermark management, file-based CSVs, and periodic reference loads — each needing independent failure handling and retry logic
        </li>
        <li>
        DLT's declarative model abstracts away exactly the control points we needed to own explicitly. For a file-first pipeline with stable schemas and no custom state management, DLT would be the stronger choic
        </li>
        </ul>`,
            children: [],
          },
        ],
      },

    ],
  },
  //////////////////////////////////////////////////////////////////////////


  //////////////////////////////////////////////////////////////////////////////
  {
    cat: `spark`,
    q: `Spark`,
    a: ``,
    children: [
      {
        q: `what do you mean by lazy evaluation`,
        a: `Spark uses lazy evaluation — transformations like filter or select don't run immediately, they just build a logical plan. <br> Only when you call an action like count or write does Spark compile that plan, optimize it via Catalyst, and execute it across the cluster. This lets Spark optimize the entire pipeline end-to-end rather than step by step`,
        children: [],
      },
      {
        q: `What is shuffling`,
        a: `💠Shuffling happens when Spark needs to regroup data by a key across executors — like in a groupBy or join. Since matching keys can be on different nodes, Spark has to physically move data over the network. 
 <br> 💠It first writes shuffle data to disk on each executor, then other executors read it — so you pay both disk and network I/O cost. It's the heaviest operation in any Spark job. <br> 💠I've dealt with this directly — broadcast joins and Z-ORDER on Delta helped me cut runtime by 40–45% in my pipelines by reducing unnecessary shuffles.`,
        children: [],

      },
      {
        q: `What is broadcast variable and need for it ?`,
        a: `💠A broadcast variable is a read-only variable that Spark distributes to each executor only once, allowing all tasks on that executor to reuse the same copy.<br>
  💠Its main purpose is to reduce network communication and improve performance by avoiding repeated data transfers. A common use case is broadcasting a small lookup table during joins.
  <br>💠 Instead of shuffling large datasets across the cluster, Spark sends the small table to each executor and performs the join locally, resulting in a Broadcast Hash Join. Spark can also automatically broadcast small tables based on the <code>spark.sql.autoBroadcastJoinThreshold</code> configuration, which is 10 MB by default.`,
        tip: `<pre><code class="language-python">
x=df.join(broadcast(small_df),"dept_id","inner")
</code></pre>`,
        children: [],

      },
      {
        q: `whats spark sql`,
        a: `Spark SQL is a Spark module for processing structured and semi-structured data using SQL queries and the DataFrame AP<br>
  It provides a unified interface for reading and querying data from sources such as CSV, JSON, Parquet, Delta, Hive, and JDBC.
<br>Spark SQL uses the Catalyst Optimizer to generate optimized execution plans and the Tungsten engine for efficient memory management and execution, making it faster and more efficient than low-level RDD operations
<br>`,
        tip: `DataFrame use Spark SQL internally. Spark converts them into logical plans and optimizes them using Spark SQL<br>
<br><code>df.createOrReplaceTempView("employee")<br> <br>CREATE VIEW emp_view AS
SELECT * FROM employee;</code>`,
        children: [

          {
            q: `relation b//w spark sql and DF`,
            a: `DataFrames are the primary data abstraction provided by Spark SQL. Whether we write DataFrame operations or SQL queries, Spark SQL converts them into optimized logical and physical execution plans using Catalyst and Tungsten`,
            children: [],
          },],
      },
      {
        q: `what are  views &Types`,
        a: ` 
        A view is a virtual table that stores only the query definition, not the actual data. Whenever we query the view, Databricks executes the underlying query against the source tables.
<br>
        4 Types. Temp view , global temp view , permanent view <br>
      💠 A Temporary View is session-scoped and exists only for the current SparkSession.  
        <pre><code class="language-python">
  df.createOrReplaceTempView("temp_customers")
  # SELECT * FROM temp_customers;
  </code></pre> 
      <br> 💠 A Global Temporary View is shared across multiple SparkSessions within the same Spark application and is accessed through the global_temp database.
       <pre><code class="language-python">
  df.createOrReplaceGlobalTempView("customers")
  # SELECT * FROM global_temp.customers;
  </code></pre> 
      <br>
      💠A Permanent View is stored in the metastore and persists across sessions until explicitly dropped.
       <pre><code class="language-sql">
spark.sql("""
CREATE VIEW active_customers AS
SELECT *
FROM customers
WHERE status = 'ACTIVE'
""") 
-- NO pyspark equalavent
  </code></pre> <br>
💠 Materialized view: Materialized View stores the computed query results physically for faster access
 <pre><code class="language-sql">
 spark.sql("""CREATE MATERIALIZED VIEW daily_sales AS
SELECT order_date, SUM(amount) AS total_sales
FROM orders
GROUP BY order_date;""")
-- NO pyspark equalavent

  </code></pre> 
       <br>
       💠 Spark session = notebook or Spark application = cluster.<pre>
Cluster (= Spark Application)
│
├── SparkContext (1 per application, shared)
│
├── Notebook A → SparkSession A  ← temp view here = only A can see it
├── Notebook B → SparkSession B  ← temp view here = only B can see it
└── Notebook C → SparkSession C
         │
         └── global_temp  ← global views live here, any session can read
  </pre>`,
        children: [
          {
            q: `do  views store data physically`,
            a: ` No. Permanent/temp/global temp views store only the SQL definition in the metastore. The underlying data remains in the source tables. Materialized views are the ones that physically store computed results.`,
            children: [],
          },
          {
            q: `What's the difference between temp and global temp views?`,
            a: `A temporary view is visible only within the current session where it was created. A global temporary view is shared across sessions within the same Spark application and must be accessed using the global_temp database. `,
            children: [],
          },
          {
            q: `Why do we need a temp view if we already have a DataFrame?`,
            a: `A DataFrame can be manipulated using the DataFrame API, while a temp view allows the same data to be queried using SQL syntax. <br>Both operate on the same underlying data and benefit from Spark SQL's Catalyst optimizer.<br> so basically for convinience`,
            children: [],
          },
          {
            q: `where each view is stored`,
            a: ` 💠 Global temp views are stored as metadata in the reserved global_temp database of the Spark application's catalog.<br>
      💠 Temp: In the current SparkSession catalog in memory.
      💠 Permanent : In the metastore or Unity Catalog as metadata containing the SQL definition. data remains in underlying tables.
      💠 Materialized view : Catalog metadata + managed physical storage like a normal table.
      💠 Temp view : Current session; Global temp: untill cluster is UP; materialized/Permanent: untill dropped manually`,
            children: [],
          },
        ],
      },
    ],
  },
  ////////////////////////////////////////////////////////////////////////////////

  {
    cat: `Optimizations`,
    q: `Optimizations`,
    answer: ``,
    children: [
      {
        q: `PartitionBy`,
        a: ` <code>partitionBy()</code> physically stores data in separate folders based on column values during writes. When queries filter on the partition column, Spark uses partition pruning to read only the required folders instead of scanning the entire dataset, improving query performance.
      <pre><code  class="language-python"> /sales/
   country=US/
      part-0001.parquet
      part-0002.parquet

   country=IN/
      part-0003.parquet

   country=UK/
      part-0004.parquet</pre></code>`,
        children: [],
      },
      {
        q: `partition Pruning`,
        a: ` Partition pruning skips entire partition directories based on filters on partition columns. This avoids scanning unnecessary files and significantly reduces the amount of data read.<br>
      Spark uses the partition column in the WHERE clause to identify which folders to read.<br>
      💠 Partition Pruning → Works for all partitioned formats by skipping partition directories.(delta,parquet,csv,json) <br>
      <pre><code class='language-sql'>SELECT * FROM sales WHERE year = 2026 -- Here sales is partitioned by Year</pre></code>`,
        children: [],
      },
      {
        q: `Bucketing`,
        a: `<ol><li>Bucketing is a write-time optimization that divides data into a fixed number of buckets (files) based on the hash of a column (hash(col) % numBuckets).</li>
      <li>It's best used for large tables that are frequently joined on the same high-cardinality column.</li>
      <li> If both tables are bucketed on the same column with the same number of buckets, Spark can directly join corresponding buckets, reducing or eliminating shuffle and improving join performance. </li>
            <pre><code class='language-python'>df.write \
  .bucketBy(8, "user_id") \
  .saveAsTable("users")</pre></code>

      </ol>`,
        children: [
          {
            q: `How hashing works in general`,
            a: `
          <code class ="language-python"> 
           from pyspark.sql.functions import hash, col
df.withColumn("hash_value", hash(col("patient_id"))).show()
# Returns Murmur3 hash as integer</code>`,
            children: [],
          },
        ],
      },
      {
        q: `Column Pruning`,
        a: ` Column pruning is a Spark optimization that reads only the columns required by the query instead of the entire dataset. It reduces disk I/O, memory usage, and improves query performance.<br>
      <pre><code class='language-sql'>SELECT name FROM employee;</pre></code>`,
        children: [],
      },
      {
        q: `Predicate PushDown`,
        a: `Predicate pushdown pushes filter conditions to the underlying data sources, allowing formats like Parquet to skip irrelevant row groups using metadata like min/max statistics. This reduces disk reads and speeds up query execution.<br>
      It's most effective with columnar formats like Parquet, ORC, and Delta, but not with text formats like CSV or JSON.`,
        children: [],
      },
      {
        q: `Data Skipping in delta lake`,
        a: `Data skipping is a Delta Lake optimization that uses _delta_log maintained file level statistics like min/max and null count statistics to avoid reading entire Parquet files before they're even opened. <br>
      `,
        children: [
          {
            q: `data skipping VS Predicate pushdown`,
            a: ` Delta uses predicate pushdown on Parquet and additionally uses _delta_log file statistics for more aggressive file skipping.
         <pre><code class='language-sql'> SELECT * FROM claims WHERE age > 60;</pre></code>
        <br> 
        <ol><li> <code>data SKipping</code>Before opening Parquet files, Delta checks _delta_log statistics and skips entire files whose min/max values prove they cannot satisfy age > 60.</li>
        <li><code>Predicate Pushdown</code> Spark opens a Parquet file and uses its row-group metadata (min/max) to skip row groups that can't contain age > 60. </li></ol>
        <code> Predicate Pushdown → Skip inside a file (row groups/pages).<br>
Data Skipping → Skip the entire file.</code>`,
            children: [],
          },
        ],
      },
      {
        q: `(File Compaction)Optimize`,
        a: `<ol><li>Frequent writes, MERGEs, creates many small files, increasing task scheduling overhead, metadata lookups, and file-open costs, which slow down queries</li>
      <li> OPTIMIZE compacts many small Parquet files into fewer larger files, reducing task scheduling overhead, metadata operations, and file-open costs.</li>
      <li>Since it's an expensive rewrite operation, we schedule it periodically as a maintenance job rather than running it after every pipeline</li></ol>`,
        children: [],
      },
      {
        q: `Z-Order`,
        a: ` Z-ORDER physically co-locates (clusters) related data in the same files so Delta's data skipping can skip more files during the scan. 
      <br> When you Z-ORDER on a column, Delta stores min/max statistics for that column per file in transaction log<br>
When a query filters on that column, Delta checks the stats and skips files where the value can't exist — even without partitioning. <br>
So instead of reading 1000 files, Delta might only read 50 — still a scan, but a much smaller one.
      We typically run OPTIMIZE along with ZORDER BY as a scheduled maintenance job on large Delta tables. OPTIMIZE compacts small files, while Z-ORDER clusters frequently queried columns, improving data skipping and overall query performance
               <pre><code class='language-sql'> OPTIMIZE claims ZORDER BY (patient_id, provider_id) 
               -- There is no standalone zorder by. Must use along with Optimize</pre></code>


               
<pre><code class="language-text"> 
1. Spark UI — SQL Tab (most reliable)

Go to SQL tab → your query → physical plan. Look for:

FileScan delta
PartitionFilters: [...]
DataFilters: [claim_date = '2024-01-01']
NumFiles: 12 (out of 1000)

If NumFiles read is significantly less than total files — file skipping is working.
 Without Z-ORDER it would read all 1000.
</code></pre>
`,
        children: [],
      },
      {
        q: `caching`,
        a: `Caching stores a DataFrame's partitions in executor memory after the first action, allowing subsequent actions to reuse the cached data instead of recomputing the entire lineage.<br> It's useful when the same DataFrame is accessed multiple times, reducing execution time, but should be avoided for one-time use due to memory overhead.`,
        children: [],
      },
      {
        q: `Broadcast Join`,
        a: `Broadcast Join sends the entire small table to every executor, allowing each executor to join it locally with its partition of the large table without shuffling the large dataset.
      <br> By default, Spark automatically broadcasts tables up to 10 MB (spark.sql.autoBroadcastJoinThreshold), and this threshold is configurable.
      <br> It's ideal for joining large fact tables with small dimension or lookup tables, significantly reducing network I/O and improving performance.
      <br>We can override the optimizer using the broadcast() hint when we know broadcasting is beneficial."
      <code>df = fact.join(broadcast(dim), "id")</code>`,
        children: [],
      },
      {
        q: `AQE`,
        a: ` <code>AQE (Adaptive Query Execution) is a Spark SQL optimization introduced in Spark 3.0 that re-optimizes the physical execution plan at runtime using actual execution statistics.</code>
       <ol>
      <li> Before AQE, Spark used a static execution plan. It generated a logical plan, applied Catalyst optimizations such as column pruning and predicate pushdown, created a physical plan, and executed it without any changes during runtime.</li>
      <li> If the actual data size or distribution differed from the estimates, Spark could choose inefficient join strategies, create too many shuffle partitions, or suffer from data skew, leading to poor performance.</li>
      <li>AQE solves this by collecting runtime statistics after shuffle stages and dynamically re-optimizing the remaining execution plan. It can switch join strategies, coalesce shuffle partitions, and mitigate data skew, improving query performance automatically.</li>
      <li>For example, Spark may estimate that the filtered providers table is too large and choose a Sort Merge Join. During execution, it finds only 2 MB of matching data after the filter, so AQE switches to a Broadcast Join, eliminating the shuffle.</li>
      <code> Static optimization uses estimated statistics, whereas AQE uses actual runtime statistics to optimize the remaining execution plan.</code>

      </ol>`,
        children: [],
      },
      {
        q: `Coalesce`,
        a: `coalesce() reduces the number of partitions by merging existing partitions with minimal or no shuffle.<br> It's mainly used after filtering or before writing data to reduce the number of small output files, task scheduling overhead, and metadata operations.<br> Since it avoids a full shuffle, it's much more efficient than repartition() for decreasing partitions.
      <>               <pre><code class='language-python'> df.coalesce(10)
      df.rdd.getNumPartitions() -- check partitions</pre></code>`,
        children: [],

      },
      {
        q: `Repartition`,
        a: `repartition() redistributes data across the specified number of partitions by performing a full shuffle.
      <br>It's used to increase or decrease partitions, evenly distribute data, or repartition data by a key to improve parallelism.
      <br> It's commonly used before joins by repartitioning on the join key, ensuring matching records are colocated and workloads are balanced across executors.
      <br>Since it performs a full shuffle, it's relatively expensive and should be used only when redistribution is required.
      <br>
      <pre><code class='language-python'> df.repartition(10) 
       df.repartition("claim_id") 
       df.repartition(10,"claim_id") --Repartition by number + columns ⭐ Most common </pre></code>`,
        children: [
          {
            q: `When do you use Repartition and why`,
            a: `
          
          <div style="font-family: Arial, sans-serif; line-height:1.6;">

<p>
<code>repartition()</code> is used when I need to explicitly redistribute data across the cluster.
Since it always performs a full shuffle, I use it only when the benefit outweighs the shuffle cost.
</p>

<p>⭐ <b>Main Use Case – Increase Parallelism</b> If I observe in the Spark UI that only a few tasks are running while many executor cores are idle, it indicates the DataFrame has too few partitions.<br> I then use repartition() so Spark can create more tasks and better utilize the cluster.</p>
<p>⭐ Internally, it shuffles and redistributes the data across the specified number of partitions, trying to keep them approximately equal in size.
<br>💠 However, it does not solve key skew; for that I rely on AQE or techniques like salting.</p>


<h4>Project Experience</h4>

In our project, we used <code>repartition()</code> only when we needed explicit control over the number of partitions. If the goal was simply to reduce the number of partitions before writing data, we preferred <code>coalesce()</code> because it avoids a full shuffle.

</div>`,
            children: [
              {
                q: `when used in project`,
                a: `We didn't decide upfront. While monitoring the job in the Spark UI, if we notice that only a few tasks were running and many executor cores were idle. That indicated insufficient parallelism, so we need to increase the partition count using repartition().`,
                children: [
                  {
                    q: `why not AQE`,
                    a: `AQE can coalesce partitions, but it only reduces the number of partitions after a shuffle. It doesn't increase them. If the DataFrame has too few partitions to begin with, AQE won't help. In that case, we explicitly use repartition() to increase parallelism.`,
                    children: [],
                  },
                ],
              },
            ],
          },
        ],

      },

      {
        q: `Deep copy VS shallow copy`,
        a: `
        A shallow clone creates a new transaction log but only references the source table's existing data files, making it very fast and storage-efficient. Any new inserts or updates in the clone create new data files owned by the clone, while the source remains unchanged. <br>
         A deep clone copies both the transaction log and all data files, creating a fully independent copy that's typically used for backup, migration, or disaster recovery. 
         <br> One limitation of a shallow clone is that if the source deletes shared data files through VACUUM, the shallow clone can become unreadable
recursie ctes
 <pre><code class="language-sql">
 CREATE TABLE customers_backup
DEEP CLONE customers / Shallow clone customers;
  </code></pre> 
        `,
        children: [],


      },

    ],
  },
  ////////////////////////////////////////////////////////////////////////////////
  {
    cat: `Optimizations`,
    q: `Slow running`,
    a: ``,
    children: [
      {
        q: `Slow Delta table Reads`,
        a: ` 
If reading a Delta table is taking longer than expected, I first check the physical plan and Spark UI or Databricks Query Profile rather than immediately changing the cluster.        <ul>
        <li>
In the  <span style="color:Violet;"><b>  physical plan </b></span>  , I check whether partition pruning, predicate pushdown, and column pruning are happening, so we're not scanning unnecessary data
        </li>
        <li>
In the <span style="color:Violet;"><b>  Query Profile or Spark UI</b></span>  , I check stages => sort => long running stage => summery metric => Task count < executor cores or input Size / Records >200 MB indicates => All tasks huge (GBs each) → too few partitions, which usually goes along with spill. 
Task count >> cores (1000 vs 16 executors) or ach task < 10 MB, often < 1 MB => All tasks tiny (KB range) with hundreds of tasks → too many small partitions (overhead).
        </li>
<li>Based on what I find, I optimize accordingly. I select only required columns, apply filters as early as possible, and make sure queries use appropriate partition filters. If there are too many small files, I use OPTIMIZE for compaction. For frequently filtered columns, depending on the table design, I consider Z-ORDER or liquid clustering to improve data skipping.
</li>
<li>If reads are optimized but it's still slow, I check shuffles, skew, and spills before considering more compute
</li>
        </ul>
        `,
        children: [],
      },
    ],
  },
  {
    cat: `Optimizations`,
    q: `SHuffle/join  & Optimization`,
    answer: ``,
    children: [,
      {
        q: `How spark choose join strategy`,
        a: ` Spark picks join strategy based on data size, configuration, and available statistics: 
      <ul>
        <li>
               <span style="color:Violet;"><b>  Broadcast Hash Join (BHJ)  </b></span> → First Spark checks When one side is small enough to broadcast below autoBroadcastJoinThreshold (default 10MB).This will Avoids shuffling the large table and is usually the fastest option. 

        </li>
        <li>
         <span style="color:Violet;"><b>  Sort Merge Join (SMJ) </b></span>  → Common/default choice for large-to-large joins. Both sides are shuffled by join key and sorted, then merged.

        </li>
        <li>
         <span style="color:Violet;"><b> Shuffle Hash Join (SHJ) </b></span>  →  if SMJ disabled , both sides require shuffle and   smaller side can fits in memory .then Spark builds a hash table from the smaller side.

        </li>
        <li>  <span style="color:Violet;"><b>  AQE </b></span> → Can dynamically change the strategy at runtime based on actual data characteristics. If one side can fit in memory then chooses SHJ instead of SMJ
</li>
        </ul>
<hr>
WHY SMJ is default
<ul>
        <li> <span style="color:Violet;"><b>  Sort Merge Join (SMJ) </b></span> is generally safer and more scalable because sorting can spill to disk when memory is insufficient.
        </li>
        <li>
       <span style="color:Violet;"><b> Shuffle Hash Join (SHJ) </b></span>: Entire build-side partition must fit in memory as a hash table. unexpectedly large/skewed partitions can create memory pressure or failure. <br><b>EXAMPLE</b> Spark estimates build side = 4GB, actual after shuffle = 12GB → OOM at 2AM → job fails. 
        </li>
        <li>  <span style="color:Violet;"><b> KEY PRINCIPLE: </b></span> In production you can tolerate slower performance but cannot tolerate failed pipelines. SMJ is the right default for a general-purpose distributed compute engine. AQE gives best of both — starts with safe SMJ, optimizes to faster strategies when runtime conditions allow.</li>
        </ul>
      
      `,
        children: [],
      },
      {
        q: `how do you optimize joins/shuffle`,
        a: `
  I will start with
  <ul>
  <li>
    <span style="color:#1F4E79;"><b>broadcast </b></span>

    If one table is small (default <b>≤ 10 MB</b>, configurable via
    <code>spark.sql.autoBroadcastJoinThreshold</code>), use a
    <b>Broadcast Join</b> to eliminate shuffle. If required, force it using the
    <code>broadcast()</code> hint.
  </li>

  <li>
    <span style="color:#1F4E79;"><b>Filter data before the join.</b></span>
    Apply filters as early as possible to
    minimize the amount of data shuffled across the cluster.
  </li>
<li>
<span style="color:#1F4E79;"><b>Select only req cols</b></span> Reduce data transferred during shuffle.
</li>
  <li>
    <span style="color:#1F4E79;"><b>Keep Delta tables optimized.</b></span>
    Run <b>OPTIMIZE</b> to compact small files and <b>Z-ORDER</b> on frequently
    joined or filtered columns so Spark reads fewer files through better data
    skipping.
  </li>

  <li>
  <span style="color:#1F4E79;"><b>cache the reused Df</b></span> → Useful when the same expensive DataFrame is reused multiple times; don't cache everything.
  </li>

  <li>
    <span style="color:#1F4E79;"><b>Leverage AQE (Adaptive Query Execution).</b></span>
    Dynamically switch join strategies (e.g., <b>Sort Merge Join → Broadcast Join</b>),
    coalesce shuffle partitions, and mitigate data skew using runtime statistics.
  </li>

  <li>
    <span style="color:#1F4E79;"><b>Tune <code>spark.sql.shuffle.partitions</code>.</b></span>
    For shuffle-intensive operations like joins and aggregations, instead of
    always using the default value of <b>200</b>, size it based on the cluster's
    parallelism and shuffle data volume, typically targeting
    <b>128–256 MB per shuffle partition</b> while maintaining enough partitions
    (roughly <b>2–3× total executor cores</b>) for good parallelism. With AQE
    enabled, use this as a starting point and let Spark coalesce partitions if
    needed.
  </li>

  <li>
    <span style="color:#1F4E79;"><b>Handle severe data skew.</b></span>
    If AQE cannot fully resolve skew, use techniques such as
    <b>salting</b> for highly skewed keys to distribute the workload evenly
    across executors.
  </li>
</ul>
  `,
        children: []
      },
    ],
  },
  ////////////////////////////////////////////////////////////////////////////////

  {
    cat: `Optimizations`,
    q: `Skew & Salting`,
    a: ``,
    children: [
      {
        q: `What is data skew`,
        a: `Data skew occurs when the data is not evenly distributed across the cluster, causing some partitions to become significantly larger than others.
<br>This leads to long-running tasks, poor parallelism, and possible OOM errors.
<br>For example, in a join operation, if one key has a disproportionately large number of records (e.g., a popular product in an e-commerce application), all records for that key are sent to the same partition. That partition takes much longer to process than the others, slowing down the entire job while the remaining executors finish early and sit idle. This is known as <b>data skew</b>.
      <br> This leads to long-running tasks, poor parallelism, and possible OOM errors. `,
        children: [],
      },
      {
        q: `how do you handle skew`,
        a: `
      <ul>
  <li>
    <span style="color:#1F4E79;"><b>Identify skew.</b></span>
  For identifying Skew,   Use the <b>Spark UI</b> to identify  tasks  taking significantly longer than others. Spark UI → Stages tab → look for one task 10x longer than median
  </li>

  <li>
    <span style="color:#1F4E79;"><b>Profile the join key.</b></span>
    Run a <code>groupBy(join_key).count()</code> to identify highly skewed values responsible for the imbalance.
  </li>

  <li>
    <span style="color:#1F4E79;"><b>Reduce data before the join.</b></span>
    Apply filters early (where business logic permits) and select only the required columns to minimize the amount of data participating in the join.
  </li>

  <li>
    <span style="color:#1F4E79;"><b>Leverage AQE.</b></span>
    Enable <code>spark.sql.adaptive.skewJoin.enabled=true</code> so Spark can automatically detect and split skewed shuffle partitions at runtime.
  </li>

  <li>
    <span style="color:#1F4E79;"><b>Apply salting if AQE isn't sufficient.</b></span>
    Append a random salt to the skewed join key in the large table and explode (duplicate) the corresponding keys in the smaller table with the same salt range.
  </li>

  <li>
    <span style="color:#1F4E79;"><b>Join on the salted key.</b></span>
    This distributes the skewed records across multiple partitions, balancing the workload and improving parallelism.
  </li>

  <li>
    <span style="color:#1F4E79;"><b>Remove the temporary salt column.</b></span>
    After the join, drop the salt column since it is only used for balancing the workload.
  </li>
</ul>
      `,
        children: [],
      },
      {
        q: `What is salting`,
        a: `Salting is a manual preventative technique used to distribute a skewed join key across multiple partitions by appending a random value (salt) to the join key.

<br>At the same time, the corresponding keys in the non-skewed (smaller) table are exploded with the same range of salt values so that each salted key from the large table still finds a matching record during the join.
<br> Instead of sending all records with the same skewed key to a single partition, salting spreads them across multiple partitions, balancing the workload and improving parallelism.
<br>
<pre><code class="language-sql">
salt=3
salted_large_df = large_df.withColumn(
    "salted_key",
    concat(
        col("user_id"),
        lit("_"),
        (rand() * salt).cast("int")
    )
)
salted_large_df.show(30)

# Salt the small DataFrame
small_df.withColumn("array", array([lit(i) for i in range(salt)])) 
            .withColumn("exploded",explode("array")) 
            .withColumn("salted_key",concat(col("user_id"),lit("_"),col("exploded")))
            .drop("array","exploded").display()
salted_small_df.show(100)

# Join on salted_key
joined_df = salted_large_df.join(
    salted_small_df,
    on="salted_key",
    how="inner"
).drop("salted_key")

display(joined_df)</pre></code>

<pre><code>
BEFORE SALTING:
─────────────────────────────────────────────────
df_encounters (large):       df_patients (small):
patient_id | encounter_id    patient_id | name
9999       | E001            9999       | John
9999       | E002
9999       | E003
9999       | E004
9999       | E005
9999       | E006


AFTER SALTING / EXPLODE:
─────────────────────────────────────────────────
df_encounters_salted:        df_patients_exploded:
salted_key | encounter_id    salted_key | name
9999_2     | E001            9999_0     | John
9999_0     | E002            9999_1     | John
9999_1     | E003            9999_2     | John
9999_0     | E004
9999_2     | E005
9999_1     | E006


DURING JOIN (what happens on each executor):
─────────────────────────────────────────────────
Executor 1 → salted_key = 9999_0:
             E002 joins John
             E004 joins John

Executor 2 → salted_key = 9999_1:
             E003 joins John
             E006 joins John

Executor 3 → salted_key = 9999_2:
             E001 joins John
             E005 joins John

All 3 executors work in parallel — no straggler


AFTER JOIN (df_result):
─────────────────────────────────────────────────
encounter_id | patient_id | name
E001         | 9999       | John
E002         | 9999       | John
E003         | 9999       | John
E004         | 9999       | John
E005         | 9999       | John
E006         | 9999       | John

Same 6 rows. Correct result. No duplicates.
salted_key dropped — clean output.
</code></pre>
`

        ,
        children: [],
      }
    ],

  },
  ////////////////////////////////////////////////////////////////////////////////

  {
    cat: `Optimizations`,
    q: `--- How would you optimize a slow-running query? `,
    a: `  `,
    children: [],
  },
  {
    cat: `Differences`,
    q: `Differences`,
    answer: ``,
    children: [
      {
        q: `GroupBy VS Window`,
        a: `
        <ul>
        <li>
         <span style="color:Violet;"><b>  GroupBy</b></span> Aggregates rows into groups — one output row per group. Individual row detail is lost. used for summaries 
        </li>
        <li>
         <span style="color:Violet;"><b>  WIndow functions</b></span>  compute across rows without collapsing them. result added as a new column. Used when you need aggregation alongside row detail.
        </li>
        </ul>`,
        children: [
          {
            q: `performance`,
            a: `
 <span style="color:Orange;"><b>  Window</b></span> Window functions 	Shuffle → sort per partition O(n log n) → keep ordered state in memory, sort cost, higher memory, higher spill risk at scale — but avoid an extra join shuffle if full row is req , since it already holds full row. <br>
 <span style="color:Violet;"><b>  GroupBy</b></span> GROUP BY Shuffle → build hash map O(n) → no sorting lower memory — but needs a join back to the full table to retrieve full row detail, adding one extra shuffle <br>
 <b>EXample</b>: For dedup and top-N with full row detail I default to ROW_NUMBER window function — cleaner, no extra join. But on 100M+ row tables where sort overhead causes memory pressure or spill, GROUP BY with a join back to the full table scales better — hash aggregation is O(n) vs window sort O(n log n), and one extra shuffle is cheaper than sorting millions of rows per partition
            `,
            children: [],
          },
        ],
      },
      {
        q: ` Drop Vs Delete Vs Truncate`,
        a: `
 <span style="color:Violet;"><b>  Delete: </b></span>  DML operation; removes rows matching WHERE condition or all if no condition. Slower on large tables — scans rows, rewrites affected files, logs every change. In Delta, fully transactional via _delta_log — time travel preserved. <br>
  <span style="color:Violet;"><b>  Truncate: </b></span> metadata operation; ; removes all rows without WHERE. Fastest for clearing all data — deallocates storage rather than processing rows individually. In Delta, transactional — old files de-referenced in _delta_log, time travel preserved until VACUUM.
<br>
   <span style="color:Violet;"><b> Drop: </b></span> Metadata Ops;  removes entire table — data, structure, metadata. Fast — removes storage references, not individual rows. Managed tables lose data permanently. External tables lose metastore entry, data files stay on ADLS. No recovery — _delta_log gone.
        `,
        children: [],
      },
      {
        q: `cache vs Persistent`,
        a: `
        cache() and persist() are techniques for keeping intermediate computation results in memory or on disk within the Spark cluster to avoid costly recomputation and improve performance.
<br>💠cache() : Caches the DataFrame or RDD in memory only (default storage level is MEMORY_AND_DISK for DataFrame and MEMORY_ONLY for RDD).
<br>💠it is wrapper around persistent with default storage level for RDD and DF
<br>💠 while persist() offers more control, allowing you to choose different storage levels like memory-only, memory-and-disk, or disk-only.

        `,
        children: [],
      },


    ],


  },
]