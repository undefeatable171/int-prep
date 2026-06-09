const cats = ["DBX","spark","SQL","Optimizations","Scenario"];
const qs = [
//* <pre><code class="language-python">
//df.filter(col("status") == "A")
//</code></pre> */
// 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
{
  cat:`DBX`,
  q:`spark vs pyspark vs dbx`,
  answer:`<ul>
  <li> Apache Spark is an open-source distributed data processing engine and a set of libraries used for big data workloads. <br>It supports in-memory computation which makes it significantly faster than traditional Hadoop map-reducer.<br> It supports multiple programming languages such as Scala, Java, Python, and R.</li>
  <li>PySpark is simply the Python API for Apache Spark, allowing us to write Spark applications in Python.</li>
  <li>Databricks is a cloud-based data and AI platform built on top of the Apache Spark.  It gives you optimized DBX runtimes (DBR), notebooks, cluster management, Databricks Workflows for orchestration, Delta Lake for ACID storage, Unity Catalog for governance, and integrations with Azure/AWS/GCP</li>
  <li>In simple terms, Spark is the processing engine, PySpark is the Python interface to Spark, and Databricks is a managed platform that simplifies developing and running Spark workloads with additional enterprise features.</li></ul>`,
  tip:`spark is built in scala.`,
  children:[{
    q:`"Is PySpark slower than Scala?"`,
    a:`No for DataFrame/SQL — same Catalyst optimizer, same JVM execution.
→ Yes only for plain Python UDFs due to serialization. Fix: use pandas_udf or native Spark functions.`,

children:[],
  }],
},
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
{
  cat:`spark`,
  q:`what do you mean by lazy evaluation`,
  answer:`Spark uses lazy evaluation — transformations like filter or select don't run immediately, they just build a logical plan. <br> Only when you call an action like count or write does Spark compile that plan, optimize it via Catalyst, and execute it across the cluster. This lets Spark optimize the entire pipeline end-to-end rather than step by step`,
  children:[],

},
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
{
  cat:`spark`,
  q:`How spark paralleism works`,
  answer:`💠 When Spark reads data, it creates internal input partitions(chunks) for parallel processing.Each partition is assigned to one task running on one executor core, so all partitions process in parallel. <br>
  💠 The partitioning depends on the file format, file sizes, and configurations like 
<code>spark.sql.files.maxPartitionBytes = 134217728
</code> Default is 128 mb

<br>💠A large file may be split into multiple input partitions, while multiple small files may be combined into fewer partitions to reduce overhead.
<br> 💠 These Spark partitions are independent of database table partitions where they are used for primarily data prining()data skipping
`,
  children:[
    {
      q:`what about shuffle partitioning`,
      a:`After a shuffle operation like a join or groupBy, Spark repartitions the data based on <code>spark.sql.shuffle.partitions</code>, default 200. This partition count matters a lot for performance — too few means underutilized cores, too many means scheduling overhead`,
      children:[],
    }
  ],

},
////////////////////////// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
{
  cat:`spark`,
  q:`<strong>Differences</strong>`,
  answer:` `,
  tip:`a DataFrame is built on top of RDDs internally. `,
  children:[
    {
      q:`RDD VS DF`,
      a:` 💠 RDD (Resilient Distributed Dataset) is Spark's core data structure—a fault-tolerant, immutable, distributed collection of objects that can be processed in parallel across a cluster. It provides fault tolerance through lineage, allowing Spark to recompute lost partitions by replaying transformations. RDDs do not enforce a schema and provide fine-grained control over transformations, but they do not benefit from the automatic query optimizations available to DataFrames.
<br>
💠 A DataFrame is distributed colletion of data  organized into named columns with schema, similar to a SQL table. DF ofers an high level api than RDDS.  Like RDDs, DataFrames are immutable, lazily evaluated, and fault tolerant. Transformations build a logical plan, which is optimized by Catalyst engine and executed efficiently by the Tungsten engine( with better memory managemnt).
<br>
💠 DataFrames are generally preferred because they provide automatic query optimization and efficient memory management, resulting in better performance and lower resource usage than RDDs. In modern Spark and Databricks ETL pipelines, DataFrames are the standard choice, while RDDs are mainly used for specialized low-level processing or legacy applications.`,
      children:[{
        q:`how rdd/df acheives fault tolerence`,
        a:`💠 Spark achieves fault tolerance through lineage.<br>
💠 Since RDDs and DataFrames are immutable, Spark tracks every transformation applied to create them. If an executor fails and a partition is lost, Spark doesn't recompute the whole dataset — it just replays the lineage for that specific partition.
<br>💠 This works even for unpartitioned tables/parquet files because Spark creates its own internal partitions for distributed processing(likep1,p2..), so fault tolerance depends on Spark partitions rather than database table partitions.`,
        children:[],
      }],
    },
  ],

},
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
{
  cat:`spark`,
  q:`What is shuffling`,
  answer:`💠Shuffling happens when Spark needs to regroup data by a key across executors — like in a groupBy or join. Since matching keys can be on different nodes, Spark has to physically move data over the network. 
 <br> 💠It first writes shuffle data to disk on each executor, then other executors read it — so you pay both disk and network I/O cost. It's the heaviest operation in any Spark job. <br> 💠I've dealt with this directly — broadcast joins and Z-ORDER on Delta helped me cut runtime by 40–45% in my pipelines by reducing unnecessary shuffles.`,
  children:[],

},
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
{
  cat:`spark`,
  q:`what does inferschema do while reading files`,
  answer:`💠By default, when Spark reads a CSV file, all columns are treated as strings.<br>
  💠inferSchema tells Spark to automatically detect column names and data types by scanning the file. Internally it does two passes — one to sample and infer types, one to actually read the data. 
  <br> 💠 The problem is it can guess wrong, it's slower, and in production pipelines schema can drift silently. In my Bronze layer I always define an explicit schema — that way if the source sends an unexpected type, the job fails loudly rather than corrupting downstream Silver and Gold tables`,
  tip:`inferSchema is mainly used for schema-less formats like CSV and JSON, where Spark needs to determine column data types from the data itself. <br>Self-describing formats such as Parquet, ORC, Avro, and Delta already store schema metadata, so inferSchema is not required and has no meaningful effect. <br>Text files are read as a single string column, so schema inference does not apply.`,
  children:[],

},
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
{
  cat:`spark`,
  q:`What is broadcast variable and need for it ?`,
  answer:`💠A broadcast variable is a read-only variable that Spark distributes to each executor only once, allowing all tasks on that executor to reuse the same copy.<br>
  💠Its main purpose is to reduce network communication and improve performance by avoiding repeated data transfers. A common use case is broadcasting a small lookup table during joins.
  <br>💠 Instead of shuffling large datasets across the cluster, Spark sends the small table to each executor and performs the join locally, resulting in a Broadcast Hash Join. Spark can also automatically broadcast small tables based on the <code>spark.sql.autoBroadcastJoinThreshold</code> configuration, which is 10 MB by default.`,
  tip:`<pre><code class="language-python">
x=df.join(broadcast(small_df),"dept_id","inner")
</code></pre>`,
  children:[],

},
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
{
  cat:`SQL`,
  q:`whats spark sql`,
  answer:`Spark SQL is a Spark module for processing structured and semi-structured data using SQL queries and the DataFrame AP<br>
  It provides a unified interface for reading and querying data from sources such as CSV, JSON, Parquet, Delta, Hive, and JDBC.
<br>Spark SQL uses the Catalyst Optimizer to generate optimized execution plans and the Tungsten engine for efficient memory management and execution, making it faster and more efficient than low-level RDD operations
<br>`,
tip:`DataFrame use Spark SQL internally. Spark converts them into logical plans and optimizes them using Spark SQL<br>
<br><code>df.createOrReplaceTempView("employee")<br> <br>CREATE VIEW emp_view AS
SELECT * FROM employee;</code>`,
  children:[

    {
      q:`relation b//w spark sql and DF`,
      a:`DataFrames are the primary data abstraction provided by Spark SQL. Whether we write DataFrame operations or SQL queries, Spark SQL converts them into optimized logical and physical execution plans using Catalyst and Tungsten`,
      children:[],
    },
    {
      q:`what are types of views`,
      a:` 3. Temp view , global temp view , permanent view <br>
      💠 A Temporary View is session-scoped and exists only for the current SparkSession
      <br> 💠 A Global Temporary View is shared across multiple SparkSessions within the same Spark application and is accessed through the global_temp database.<br>
      💠A Permanent View is stored in the metastore and persists across sessions until explicitly dropped.<br>
      💠All three are virtual and store only query definitions rather than the actual data, unlike tables which physically store data.<br>
       <br><pre>
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
      children:[
        {
          q:`do permanent views store data physically`,
          a:` No. Permanent views store only the SQL definition in the metastore. The underlying data remains in the source tables. Materialized views are the ones that physically store computed results.`,
          children:[],
        },
        {
          q:`What's the difference between temp and global temp views?`,
          a:`A temporary view is visible only within the current session where it was created. A global temporary view is shared across sessions within the same Spark application and must be accessed using the global_temp database. 
          <br>Neither stores data physically; they are just logical references to DataFrames.`,
          children:[],
        },
      ],
    },
    {
      q:`whats temp view`,
      a:`A temporary view is a session-scoped virtual table created from a DataFrame that allows you to query the DataFrame using Spark SQL.<br> It does not physically store data; it simply provides a SQL name for the DataFrame.<br>
      Once created using createOrReplaceTempView(), we can run SQL queries using spark.sql(). The view exists only for the lifetime of the SparkSession and is removed when the session ends. `,
      children:[{
        q:`Why do we need a temp view if we already have a DataFrame?`,
        a:`A DataFrame can be manipulated using the DataFrame API, while a temp view allows the same data to be queried using SQL syntax. <br>Both operate on the same underlying data and benefit from Spark SQL's Catalyst optimizer.<br> so basically for convinience`,
        children:[],
      },],
    },
    {
      q:`where each view is stored`,
      a:`Global temp views are stored as metadata in the reserved global_temp database of the Spark application's catalog.<br>
      💠 Temp: In the current SparkSession catalog in memory.
      💠 Permanent : In the metastore or Unity Catalog as metadata containing the SQL definition.`,
      children:[],
    },

  ],

},
{
  cat:`DBX`,
  q:`what are magic commands`,
  answer:`Magic commands in Databricks are notebook-specific commands prefixed with % that provide functionality beyond standard Spark APIs.<br>
  Commonly used magic commands include %sql for querying data, %fs for Databricks file system operations, %run for notebook reuse, %sh for shell commands, and %md for documentation.</br>
  <code>%sql %python %scala %R  <br>
  % md -- for markdown <br><br>
  %fs ls /FileStore/ -- Databricks File System utilities.<br>
  %fs cp source destination <br>
  %fs rm path -r <br>
  %fs mkdirs /tmp/data</code>
  <br><br>
  <code> %run /Shared/CommonFunctions --- Execute another notebook(like helper functions ).</code>`,
  tip:`they are native to databicks notebooks , noy spark`,
  children:[],
},
]
