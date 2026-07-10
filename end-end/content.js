const cats = ["Sources","Read","write","Optimizations"];
const qs = [
//* <pre><code class="language-python">
//df.filter(col("status") == "A")
//</code></pre> */
// 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
{
    cat:"Sources",
    q:`APIs`,
    answer:``,
    children:
    [{
    q:`Why response.json() for APIs`,
    a:`Because the API sends data as a JSON string, but Python needs a dictionary/list object to work with it. response.json() parses the JSON response body and converts it into Python dictionaries or lists, making it easier to access fields and load the data into Spark DataFrames`,
    children:[],
    },
    {
        q:`why pagination required`,
        a:`Pagination splits large API responses into smaller chunks, making data transfer more efficient and reliable.
Without pagination, the API would try to return millions of records in a single response, which can lead to high memory usage, slow transfers, and request timeouts. If the request fails at 99%, the entire download has to be retried. Pagination breaks the data into smaller batches, so only the failed page needs to be retried.`,
children:[],
    }
],
},
//////////////////////////////
{
    cat:"Read",
    q:`ABstractions`,
    answer:``,
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
      },
    ],},
        {

            q:` What's the difference between createDataFrame and parallelize().toDF()`,
            a:`
createDataFrame is the modern, high-level Spark SQL API. Internally it handles schema inference, type mapping, and DataFrame creation in one call.
parallelize().toDF() is the old RDD-based path. You manually create an RDD first via SparkContext, then convert it to a DataFrame.`,
children:[],
        },
        {
            q:`When would you use a Pandas DataFrame over a PySpark DataFrame?`,
            a:`when the data fits comfortably on a single machine and you don't need distributed compute. EX: config tables , ref tables (in few MBs)`,
            children:[],
        },
    ],
},
///////////////////////////////////////
{
  cat:`Read`,
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
    },
  ],

},
////////////////////////////////////////////////////////////////////////////////
{
  cat:`Read`,
  q:`what does inferschema do while reading files`,
  answer:`💠By default, when Spark reads a CSV file, all columns are treated as strings.<br>
  💠inferSchema tells Spark to automatically detect column names and data types by scanning the file. Internally it does two passes — one to sample and infer types, one to actually read the data. 
  <br> 💠 The problem is it can guess wrong, it's slower, and in production pipelines schema can drift silently. In my Bronze layer I always define an explicit schema — that way if the source sends an unexpected type, the job fails loudly rather than corrupting downstream Silver and Gold tables`,
  tip:`inferSchema is mainly used for schema-less formats like CSV and JSON, where Spark needs to determine column data types from the data itself. <br>Self-describing formats such as Parquet, ORC, Avro, and Delta already store schema metadata, so inferSchema is not required and has no meaningful effect. <br>Text files are read as a single string column, so schema inference does not apply.`,
  children:[],

},
////////////////////////////////////////////////////////
{
  cat:`Optimizations`,
  q:`Optimizations`,
  answer:``,
  children:[
    {
      q:`PartitionBy`,
      a:` <code>partitionBy()</code> physically stores data in separate folders based on column values during writes. When queries filter on the partition column, Spark uses partition pruning to read only the required folders instead of scanning the entire dataset, improving query performance.
      <pre><code  class="language-python"> /sales/
   country=US/
      part-0001.parquet
      part-0002.parquet

   country=IN/
      part-0003.parquet

   country=UK/
      part-0004.parquet</pre></code>`,
      children:[],
    },
    {
      q:`partition Pruning`,
      a:` Partition pruning skips entire partition directories based on filters on partition columns. This avoids scanning unnecessary files and significantly reduces the amount of data read.<br>
      Spark uses the partition column in the WHERE clause to identify which folders to read.<br>
      💠 Partition Pruning → Works for all partitioned formats by skipping partition directories.(delta,parquet,csv,json) <br>
      <pre><code class='language-sql'>SELECT * FROM sales WHERE year = 2026 -- Here sales is partitioned by Year</pre></code>`,
      children:[],
    },
    {
      q:`Bucketing`,
      a:`<ol><li>Bucketing is a write-time optimization that divides data into a fixed number of buckets (files) based on the hash of a column (hash(col) % numBuckets).</li>
      <li>It's best used for large tables that are frequently joined on the same high-cardinality column.</li>
      <li> If both tables are bucketed on the same column with the same number of buckets, Spark can directly join corresponding buckets, reducing or eliminating shuffle and improving join performance. </li>
            <pre><code class='language-python'>df.write \
  .bucketBy(8, "user_id") \
  .saveAsTable("users")</pre></code>

      </ol>`,
      children:[
        {
          q:`How hashing works in general`,
          a:`
          <code class ="language-python"> 
           from pyspark.sql.functions import hash, col
df.withColumn("hash_value", hash(col("patient_id"))).show()
# Returns Murmur3 hash as integer</code>`,
          children:[],
        },
      ],
    },
    {
      q:`Column Pruning`,
      a:` Column pruning is a Spark optimization that reads only the columns required by the query instead of the entire dataset. It reduces disk I/O, memory usage, and improves query performance.<br>
      <pre><code class='language-sql'>SELECT name FROM employee;</pre></code>`,
      children:[],
    },
    {
      q:`Predicate PushDown`,
      a:`Predicate pushdown pushes filter conditions to the underlying data sources, allowing formats like Parquet to skip irrelevant row groups using metadata like min/max statistics. This reduces disk reads and speeds up query execution.<br>
      It's most effective with columnar formats like Parquet, ORC, and Delta, but not with text formats like CSV or JSON.`,
      children:[],
    },
    {
      q:`Data Skipping in delta lake`,
      a:`Data skipping is a Delta Lake optimization that uses _delta_log maintained file level statistics like min/max and null count statistics to avoid reading entire Parquet files before they're even opened. <br>
      `,
      children:[
        {
        q:`data skipping VS Predicate pushdown`,
        a:` Delta uses predicate pushdown on Parquet and additionally uses _delta_log file statistics for more aggressive file skipping.
         <pre><code class='language-sql'> SELECT * FROM claims WHERE age > 60;</pre></code>
        <br> 
        <ol><li> <code>data SKipping</code>Before opening Parquet files, Delta checks _delta_log statistics and skips entire files whose min/max values prove they cannot satisfy age > 60.</li>
        <li><code>Predicate Pushdown</code> Spark opens a Parquet file and uses its row-group metadata (min/max) to skip row groups that can't contain age > 60. </li></ol>
        <code> Predicate Pushdown → Skip inside a file (row groups/pages).<br>
Data Skipping → Skip the entire file.</code>`,
        children:[],
        },
      ],
    },
    {
      q:`(File Compaction)Optimize`,
      a:`<ol><li>Frequent writes, MERGEs, creates many small files, increasing task scheduling overhead, metadata lookups, and file-open costs, which slow down queries</li>
      <li> OPTIMIZE compacts many small Parquet files into fewer larger files, reducing task scheduling overhead, metadata operations, and file-open costs.</li>
      <li>Since it's an expensive rewrite operation, we schedule it periodically as a maintenance job rather than running it after every pipeline</li></ol>`,
      children:[],
    },
    {
      q:`Z-Order`,
      a:` Z-ORDER physically co-locates (clusters) similar values of frequently queried columns into the same Parquet files. This creates tighter file-level statistics, making Delta's data skipping more effective by eliminating more files before reading them<br>
      We typically run OPTIMIZE along with ZORDER BY as a scheduled maintenance job on large Delta tables. OPTIMIZE compacts small files, while Z-ORDER clusters frequently queried columns, improving data skipping and overall query performance
               <pre><code class='language-sql'> OPTIMIZE claims ZORDER BY (patient_id, provider_id) 
               -- There is no standalone zorder by. Must use along with Optimize</pre></code>
`,
      children:[],
    },
    {
      q:`caching`,
      a:`Caching stores a DataFrame's partitions in executor memory after the first action, allowing subsequent actions to reuse the cached data instead of recomputing the entire lineage.<br> It's useful when the same DataFrame is accessed multiple times, reducing execution time, but should be avoided for one-time use due to memory overhead.`,
      children:[],
    },
    {
      q:`Broadcast Join`,
      a:`Broadcast Join sends the entire small table to every executor, allowing each executor to join it locally with its partition of the large table without shuffling the large dataset.
      <br> By default, Spark automatically broadcasts tables up to 10 MB (spark.sql.autoBroadcastJoinThreshold), and this threshold is configurable.
      <br> It's ideal for joining large fact tables with small dimension or lookup tables, significantly reducing network I/O and improving performance.
      <br>We can override the optimizer using the broadcast() hint when we know broadcasting is beneficial."
      <code>df = fact.join(broadcast(dim), "id")</code>`,
      children:[],
    },
    {
      q:`AQE`,
      a:` <code>AQE (Adaptive Query Execution) is a Spark SQL optimization introduced in Spark 3.0 that re-optimizes the physical execution plan at runtime using actual execution statistics.</code>
       <ol>
      <li> Before AQE, Spark used a static execution plan. It generated a logical plan, applied Catalyst optimizations such as column pruning and predicate pushdown, created a physical plan, and executed it without any changes during runtime.</li>
      <li> If the actual data size or distribution differed from the estimates, Spark could choose inefficient join strategies, create too many shuffle partitions, or suffer from data skew, leading to poor performance.</li>
      <li>AQE solves this by collecting runtime statistics after shuffle stages and dynamically re-optimizing the remaining execution plan. It can switch join strategies, coalesce shuffle partitions, and mitigate data skew, improving query performance automatically.</li>
      <li>For example, Spark may estimate that the filtered providers table is too large and choose a Sort Merge Join. During execution, it finds only 2 MB of matching data after the filter, so AQE switches to a Broadcast Join, eliminating the shuffle.</li>
      <code> Static optimization uses estimated statistics, whereas AQE uses actual runtime statistics to optimize the remaining execution plan.</code>

      </ol>`,
      children:[],
    },
    {
      q:`Coalesce`,
      a:`coalesce() reduces the number of partitions by merging existing partitions with minimal or no shuffle.<br> It's mainly used after filtering or before writing data to reduce the number of small output files, task scheduling overhead, and metadata operations.<br> Since it avoids a full shuffle, it's much more efficient than repartition() for decreasing partitions.
      <>               <pre><code class='language-python'> df.coalesce(10)
      df.rdd.getNumPartitions() -- check partitions</pre></code>`,
      children:[],

    },
    {
      q:`Repartition`,
      a:`repartition() redistributes data across the specified number of partitions by performing a full shuffle.
      <br>It's used to increase or decrease partitions, evenly distribute data, or repartition data by a key to improve parallelism.
      <br> It's commonly used before joins by repartitioning on the join key, ensuring matching records are colocated and workloads are balanced across executors.
      <br>Since it performs a full shuffle, it's relatively expensive and should be used only when redistribution is required.
      <br>
      <pre><code class='language-python'> df.repartition(10) 
       df.repartition("claim_id") 
       df.repartition(10,"claim_id") --Repartition by number + columns ⭐ Most common </pre></code>`,
      children:[],

    },
    
  ],
},
{
  cat:`Optimizations`,
  q:`SHuffle/join Optimization`,
  answer:`
  I will start with
  <ul>
  <li>
    <span style="color:#1F4E79;"><b>Choosing the right join strategy.</b></span>
    If one table is small (default <b>≤ 10 MB</b>, configurable via
    <code>spark.sql.autoBroadcastJoinThreshold</code>), use a
    <b>Broadcast Join</b> to eliminate shuffle. If required, force it using the
    <code>broadcast()</code> hint.
  </li>

  <li>
    <span style="color:#1F4E79;"><b>Reduce data before the join.</b></span>
    Apply filters as early as possible and select only the required columns to
    minimize the amount of data shuffled across the cluster.
  </li>

  <li>
    <span style="color:#1F4E79;"><b>Keep Delta tables optimized.</b></span>
    Run <b>OPTIMIZE</b> to compact small files and <b>Z-ORDER</b> on frequently
    joined or filtered columns so Spark reads fewer files through better data
    skipping.
  </li>

  <li>
    <span style="color:#1F4E79;"><b>Repartition large tables carefully.</b></span>
    Repartition on the join key only when redistribution is required to balance
    partitions and reduce skew. Since <code>repartition()</code> performs a full
    shuffle, use it only when redistribution is necessary..
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
  children:[]
},
{
  cat:`Optimization`,
  q:`Skew & Salting`,
  a:``,
  children:[
    {
      q:`What is data skew`,
      a:`Data skew occurs when the data is not evenly distributed across the cluster, causing some partitions to become significantly larger than others.
<br>This leads to long-running tasks, poor parallelism, and possible OOM errors.
<br>For example, in a join operation, if one key has a disproportionately large number of records (e.g., a popular product in an e-commerce application), all records for that key are sent to the same partition. That partition takes much longer to process than the others, slowing down the entire job while the remaining executors finish early and sit idle. This is known as <b>data skew</b>.
      <br> This leads to long-running tasks, poor parallelism, and possible OOM errors. `,
children:[],
    },
    {
      q:`how do you handle skew`,
      a:`
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
      children:[],
    },
    {
      q:`What is salting`,
      a:`Salting is a manual preventative technique used to distribute a skewed join key across multiple partitions by appending a random value (salt) to the join key.

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
children:[],
    }
  ],

},
]