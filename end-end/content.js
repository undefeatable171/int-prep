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
  ],
},
]