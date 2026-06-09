const cats = ["DBX","spark","SQL","Optimizations","Scenario"];
const qs = [

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
  tips:`spark is built in scala.`,
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
]
