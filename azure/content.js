const cats = ["storage", "ADF", "key-vault", "CI-CD", "Scenario", "UC"];
const qs = [
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 

  {
    cat: "storage",
    q: "What is azure storage ",
    answer: ` 👉 Azure Storage is a cloud-based storage service provided by Microsoft Azure for storing and managing various types of data, such as files, images, videos, documents, backups, and application data.<br>

👉 It supports both structured and unstructured data and allows access through multiple methods, including REST APIs, SDKs, HTTPS, Azure Portal, CLI, and PowerShell. It is designed to be highly available, durable, secure, and scalable.`,
    children: [
      {
        q: `What are the benefits of Azure Storage?`,
        a: `
<p>The key benefits of Azure Storage are:</p>

<ol>
  <li>
    <strong>Durability</strong>
    <ul>
      <li>Azure automatically replicates data across multiple storage devices and, depending on the replication option, across regions to minimize data loss.</li>
    </ul>
  </li>

  <li>
    <strong>Security</strong>
    <ul>
      <li>Data is encrypted both at rest and in transit.</li>
      <li>Supports Azure AD, Shared Access Signatures (SAS), and RBAC for access control.</li>
      <li>At rest : AES 256 encryptionand managed keys , HTTPS during transit. </li>
    </ul>
  </li>

  <li>
    <strong>Scalability</strong>
    <ul>
      <li>Storage capacity can grow or shrink based on business needs without hardware limitations.</li>
    </ul>
  </li>

  <li>
    <strong>Managed Service</strong>
    <ul>
      <li>Microsoft handles infrastructure maintenance, patching, and hardware management.</li>
    </ul>
  </li>

  <li>
    <strong>High Availability</strong>
    <ul>
      <li>Data replication ensures high availability even during hardware failures.</li>
    </ul>
  </li>

  <li>
    <strong>Accessibility</strong>
    <ul>
      <li>Data can be accessed through REST APIs, SDKs, Azure Portal, CLI, PowerShell, and HTTPS.</li>
    </ul>
  </li>
</ol>`,
        children: [],
      }
    ],
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  {
    cat: "storage",
    q: `What is Azure Blob Storage?`,
    answer: `<p>Azure Blob Storage is Microsoft's object storage solution for storing massive amounts of unstructured data, such as:
    <br> - photos , videos , documents , csv files etc,..
    <br>Common use cases include: <br>- Data lakes for analytics. <br>-Backup and disaster recovery</p>`,
    children: [
      {
        q: `What is Azure Data Lake Storage Gen2 (ADLS Gen2)?`,
        a: `ADLS Gen2 is built on top of Azure Blob Storage. It provides all Blob Storage capabilities along with Hierarchical namespace (folders and directories) and  performance optimizations for big data analytics(Faster directory and file operations), making it the preferred storage option for Azure Databricks and modern data lake architectures.`,
        children: [{
          q: `The main factors affecting Azure Storage costs are`,
          a: `<p><strong>Answer:</strong></p>

<p>
The main factors affecting Azure Storage costs are:
</p>

<ol>
  <li>
    <strong>Storage Region</strong> – Pricing varies by region, and it is generally best to store data close to the application or users to reduce latency and potentially lower costs.
  </li>

  <li>
    <strong>Storage Account Type</strong> – Standard Storage is cost-effective for general workloads, while Premium Storage offers lower latency and higher performance at a higher cost.
  </li>

  <li>
    <strong>Access Tier</strong> – weneed to decide based on access frequency
    <ul>
      <li>Hot: Frequently accessed data</li>
      <li>Cool: Infrequently accessed data with more than 30 days</li>
      <li>Archive: Rarely accessed long-term data with mre than 180 days</li>
    </ul>
    Choosing the right tier can significantly reduce costs.<br> We can use life cycle managemnt policies to automate the access tiers, etc,. set condition like if not used for more than 30 days then cold etc,..
  </li>

  <li>
    <strong>Replication Strategy</strong> – Options like LRS, ZRS, GRS, and GZRS provide different levels of durability and availability. Higher redundancy results in higher costs.
  </li>

  <li>
    <strong>Storage Transactions</strong> – Read, write, list, and delete operations are charged, so workloads with frequent access incur higher transaction costs.
  </li>

  <li>
    <strong>Data Egress</strong> – Data ingress into Azure is generally free, but outbound data transfer, especially across regions or to the internet, incurs charges.
  </li>
</ol>

<p>
<strong>Cost Optimization:</strong> Choose the appropriate storage tier and replication option based on business requirements, minimize unnecessary transactions, and reduce cross-region or outbound data transfers.
</p>`,
          children: [],
        }
        ],
      },
      {
        q: `adls gen2 VS blob storage`,
        a: `Azure Blob Storage is a general-purpose object storage service used to store unstructured data such as images, videos, documents, backups, and log files.
<br> - 
ADLS Gen2 is built on top of Blob Storage and is optimized for big data analytics. The key difference is that it supports a Hierarchical Namespace (HNS), which provides a true folder structure(sub folders) and improves file operations like rename and move. It also supports fine-grained access control through POSIX ACLs and integrates well with Azure Databricks, Synapse Analytics, and Apache Spark.
<br> - 
I would use Blob Storage for general-purpose storage and ADLS Gen2 for Data Engineering and analytics workloads.`,
        children: [],
      }
    ],
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
  {
    cat: "storage",
    q: `Q. Assume you are working as a Data Engineer. Reports are stored in Azure Blob Storage, and a third-party application needs access to these reports for only the next 7 days. How would you solve this?`,
    answer: `"I would use a SAS(shared access signature) token to provide the third-party application with secure, read-only access to the required blob or container for 7 days. <br>
    The token automatically expires after the specified period, eliminating manual intervention. <br>
    I would avoid using Storage Account Access Keys because they grant full access to the entire storage account and pose a security risk for temporary external access. Acees won't revoke automatically untill we change access keys`,
    children: [],
    tip: `we can usebroiler plate code for accessing blob storage in dbx using access token / sas token`
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  {
    cat: "storage",
    q: `Assume you want to provide read access to junior team members and read-write access to senior team members on an Azure Storage Account. Can you do this? If yes, how?`,
    answer: `Yes. I would use Azure RBAC to assign different roles based on user responsibilities. For example, junior members can have the Storage Blob Data Reader role, while senior members can have the Storage Blob Data Contributor role. Authentication is handled through Microsoft Entra ID (Azure AD)`,
    children: [],
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  {
    cat: "storage",
    q: `Is it possible to automatically move data between Azure Blob Storage access tiers? If yes, why and how?`,
    answer: `Yes, Azure Blob Storage supports automatic movement of data between Hot, Cool, and Archive tiers using Lifecycle Management policies. This helps optimize storage costs by keeping frequently accessed data in the Hot tier and automatically moving older, less frequently accessed data to the Cool or Archive tiers based on predefined rules.
<br>
For example, recent data can stay in the Hot tier, data older than 30 days can move to the Cool tier, and older archival data can move to the Archive tier.
<br>
To configure this, I would go to the Storage Account → Lifecycle Management → Add Rule → define the scope and conditions (such as blob age or last modified date) → choose the action to move the data to Cool or Archive → save the policy. Azure then automatically manages the tier transitions without manual intervention`,
    children: [
      {
        q: `use of blob life cycle managemnt policies`,
        a: `- Blob Storage lifecycle management helps automate the transition of blobs to
appropriate access tiers or deletion based on specified policies.<br>
● Define Rules: Set up rules that specify conditions (e.g., age of the blob) and actions
(e.g., move to Cool tier or delete).<br>
● Apply Policies: Implement these rules at the storage account level to manage the
lifecycle of your data efficiently.
`,
        children: []
      }
    ],
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  {
    q: `How would you implement data security in Azure Blob
Storage?`,
    answer: `● Enable Server-Side Encryption (SSE): Azure automatically encrypts data at
rest using 256-bit AES encryptio and use
HTTPS for data in transit.<br>
● Access Control: Utilize Azure Active Directory (AAD) for role-based access control
(RBAC) and Shared Access Signatures (SAS) for Temporary access.
`,
    children: [],
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  {
    q: `Describe a strategy to implement fine-grained access control for multiple applications accessing sensitive data stored in Azure Blob Storage.`,
    answer: `●I would implement fine-grained access control using a combination of Microsoft Entra ID (Azure AD), Azure RBAC, and SAS tokens.
<br>
● First, I would authenticate applications using Microsoft Entra ID and assign Azure RBAC roles based on the principle of least privilege. If different applications require different levels of access, I can assign appropriate roles such as Storage Blob Data Reader or Storage Blob Data Contributor.
<br>
●For temporary or external access to specific blobs or containers, I would use SAS tokens with limited permissions and expiry times. I can also restrict access by IP address if required.
<br>
● This approach ensures secure, granular, and controlled access to sensitive data while minimizing security risks."`,
    children: [],
  },

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  {
    cat: `CI-CD`,
    q: `What happens when you run <code>git push origin feature2</code> for the first time? -- new branch`,
    answer: `Git uploads the local commits and objects to the remote repository. If the remote branch does not exist, GitHub creates it. After the push, GitHub typically suggests creating a Pull Request so the feature branch can be reviewed and merged into the target branch, such as main.`,
    children: [
      {
        q: `github vs databricks`,
        a: `In a local Git environment such as VS Code(using github), creating a branch and committing changes are local operations. The remote repository is updated only after executing <code>git push origin main</code>. <br>In Databricks Repos, branch creation is integrated with the remote Git provider, so creating a branch through the Databricks UI typically creates the corresponding remote branch automatically. However, code changes and commits are not automatically reflected in the remote repository; they still need to be committed and synchronized (pushed) through the Databricks Git integration.`,
        children: [],
      },
    ],

  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  {
    cat: `UC`,
    q: `What is Unity Catalog & Have you used ?`,
    answer: ` 💠 Unity Catalog is a unified data governance solution for Databricks that provides centralized metadata management, lineage tracking, and compliance capabilities.
  <br> 💠 Yes, I've worked with Unity Catalog in my current project at TCS 
  <br> 💠 In our project, Unity Catalog is used as the centralized governance layer for ADLS Gen2. Storage access is managed through Storage Credentials and External Locations, allowing secure and governed access to data lake paths.
  <br> 💠 We organize data using the 3 level namespace i.e,. Catalog → Schema → Table hierarchy. <s>For example, schemas are aligned to Bronze, Silver, and Gold layers of our Medallion architecture</s>. We also use Volumes for governing raw files such as CSV and Excel files.
  <br>💠 Compared to Hive Metastore which is workspace scoped, Unity Catalog provides whole account scoped centralized governance, fine-grained access control, lineage, and auditing across workspaces.`,
    children: [
      {
        q: `Unity Catalog vs Hive Metastore`,
        a: `Hive Metastore is workspace-scoped — each workspace has its own isolated metastore, so tables can't be shared across teams without duplicating data. Access control is coarse (table-level only), there's no lineage or audit logging, and ADLS access requires service principals hardcoded in notebooks.
<br> 💠 Unity Catalog is account-scoped — one metastore shared across all workspaces, enabling cross-team data sharing without duplication. It adds fine-grained access control (column and row level), built-in data lineage, audit logs, and ADLS connectivity via Access Connector — no credentials in code.`,
        children: [],
      },
      {
        q: `Storage credentials vs External locations`,
        a: `A Storage Credential is a UC object which  defines how Databricks authenticates to cloud storage(ADLS), typically through a managed identity (Access Connector).
      <br> 💠 An External Location maps a storage path with a Storage Credential, allowing Unity Catalog to securely govern access to that path.`,
        children: [],
      },
      {
        q: `managed vs external tables/volumes`,
        a: ` Managed tables are fully owned by Unity Catalog means both metadata + data files. so dropping the table removes both metadata and data <b>Managed tables are stored in the metastore-managed storage location.</b>.
        <br> 💠 External tables store metadata in Unity Catalog but keep data in a user-managed ADLS location; dropping the table removes only metadata while the underlying files remain. `,
        children: [],
      },
      {
        q: `what is a volume`,
        a: `Volumes allow governance of non-tabular files such as CSV, Excel, JSON, PDFs, and images under Unity Catalog without registering them as tables.`,
        children: [],
      },
      {
        q: `Why direct storage access not given to users / what happens`,
        a: ` In our project, end users are not given direct ADLS access. If a user has direct access to the storage account, they can bypass Unity Catalog completely and read the raw files as-is . That means sensitive fields such as SSN, member identifiers, or PII data would be visible in their original form.
      <br> 💠 So only the Access Connector managed identity holds the IAM roles on the storage account. Every data request flows through Databricks and UC — governance is enforced consistently across notebooks, BI tools, and APIs`,
        children: [],
      },
      {
        q: `HOw &who permissions are managed`,
        a: ` In our project, permissions are managed by the platform and governance teams through Azure AD groups that are synchronized into Databricks. Permissions are assigned to groups rather than individual users, making access management scalable and easier to govern.
      <br> 💠 Storage access is handled through Storage Credentials backed by a Managed Identity, and users consume data through Unity Catalog objects rather than directly through ADLS.
<br> 💠 Overall, the principle followed is least privilege access, where each role receives only the permissions required to perform its responsibilities.
    <pre><code class="language-sql">-- To a group (recommended — manage membership, not individual grants)
        GRANT SELECT ON TABLE ustechcentral.gold.claims TO "analyst_team";
        -- To a specific user (not recommended)
        GRANT SELECT ON TABLE ustechcentral.gold.claims TO "prathap@company.com"
    </code></pre>`,
        children: [
          {
            q: ` do you have access to sensitive data like SSN, DOB, MemberID, ProviderID?`,
            a: `In our project, sensitive fields like SSN and home address are handled at the source level itself — data comes from the client's PostgreSQL system already tokenized  before landing in our pipeline. 
<br> 💠 we work with business identifiers like MemberID, SubscriberID, ClaimID for all ETL operations since they are not considered hard PIIs. <s>DOB only use year for age based analytics</s> Raw PII visibility is restricted to the client's compliance team — we don't interact with it at any layer of our Medallion pipeline.`,
            children: [],
          }
        ],
      },

    ],

  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  {
    cat: `ADF`,
    q: ` ADF BASICS components`,
    answer: `ADF is Azure's cloud-based ETL and data integration service. <br>
 It is used to ingest data from multiple sources, orchestrate transformations via Databricks or Data Flows, and load it into our data lake or warehouse. 
<br>Its a orchestration layer — it doesn't store data, it moves and transforms it.  
        `,
    children: [
      {
        q: `<p style="color:orange"> Pipeline <br> Lisnked service <br> dataset <br> ACtivity <br> Integration Runtime <br> Trigger <br mapping DataFlow>       
        </p>`,
        a: ` 
 <table border="1" cellpadding="8" cellspacing="0">
  <tr>
    <th>Topic</th>
    <th>Interview Answer</th>
    <th>When to Use</th>
  </tr>

  <tr>
    <td><b>Pipeline</b></td>
    <td>A pipeline is a logical grouping of activities that defines an end-to-end data workflow.It controls the sequence and flow of data-processing tasks.</td>
    <td>Use it to orchestrate an ETL/ELT workflow from source to target.</td>
  </tr>

  <tr>
    <td><b>Linked Service</b></td>
    <td>A linked service contains the connection information required to connect ADF to a data store or compute service.</td>
    <td>Use it whenever ADF needs to connect to a source, target, or compute environment.</td>
  </tr>

  <tr>
    <td><b>Dataset</b></td>
    <td>Datasets represent data structures within data stores — they point to or reference the data you want to use in your activities as inputs or outputs. such as a table, file, or folder.</td>
    <td>Use it to identify the specific data an activity reads from or writes to.</td>
  </tr>

  <tr>
    <td><b>Activity</b></td>
    <td>An activity is an individual processing or control step inside a pipeline. <br> ADF activities are broadly categorized into three types:                <span style="color:yellow">Data Movement activities</span><br>
 , such as Copy Data,                <span style="color:yellow"> Data Transformation activities
 </span>
, such as Mapping Data Flow and Databricks Notebook, and <span style="color:yellow"> Control Flow activities</span>, such as If Condition, ForEach, and Execute Pipeline</td>
    <td> Every step inside a pipeline is an activity. Copy Activity for raw ingestion. Databricks Activity when you need PySpark. Data Flow for no-code transforms..</td>
  </tr>

  <tr>
    <td><b>Integration Runtime</b></td>
    <td>Integration Runtime is the compute infrastructure used by ADF to move data, execute activities, and connect to different environments.
    <br><b style="color:orange">Three types:</b>
<ul><li>Azure IR — default, fully managed, for cloud-to-cloud</li>
<li>Self-hosted IR — for on-premises or private network sources</li>
<li>Azure-SSIS IR — for running SSIS packages in cloud</li></ul>
    </td>
    <td>Use Azure IR for cloud sources and Self-hosted IR for on-premises/private-network sources.</td>
  </tr>

  <tr>
    <td><b>Trigger</b></td>
    <td>A trigger defines when and how a pipeline should start, such as on a schedule, event, or tumbling window.</td>
    <td><b style="color:orange">Three types:</b>
<ul><li>Schedule trigger — cron-based, e.g. daily at 2 AM</li>
<li>Tumbling window — fixed intervals with backfill support</li>
<li>Event-based — fires when a file lands in ADLS/Blob</li></ul>.</td>
  </tr>
  <tr>
    <td><b>dataFlow</b></td>
    <td> Mapping Data Flow is a visual, code-free transformation feature in ADF that allows us to build  transformations such as joins, aggregations, filtering, derived columns, and column mapping <br> It runs on ADF-managed Spark compute through Integration Runtime, so we don't need to write Spark code or manage the cluster ourselves.  </td>
    <td>Use it when you need moderate to complex transformations within ADF without managing a separate Databricks notebook. For highly complex transformations, custom Spark logic, or heavy data processing, Databricks Activity is generally a better choice.</td>
  </tr>
</table>  
        `,
        children: [],
      },
//       {
//         q: `<p style="color:violet">ACtivities</p>`,
//         a: `<table border="1" cellpadding="8" cellspacing="0">
//   <tr>
//     <th>Activity</th>
//     <th>Interview Answer</th>
//     <th>When to Use</th>
//   </tr>

//   <tr>
//     <td><b>Copy Data</b></td>
//     <td>Copies data from a source to a destination.</td>
//     <td>Use for ingesting or moving data between systems.</td>
//   </tr>

//   <tr>
//     <td><b>Mapping Data Flow</b></td>
//     <td>Visual, code-free transformation that runs on ADF-managed Spark compute.</td>
//     <td>Use for joins, aggregations, filters, derived columns, and other transformations.</td>
//   </tr>

//   <tr>
//     <td><b>Databricks Notebook</b></td>
//     <td>Executes a Databricks notebook from an ADF pipeline.</td>
//     <td>Use for complex PySpark/Spark transformations and heavy processing.</td>
//   </tr>

//   <tr>
//     <td><b>Stored Procedure</b></td>
//     <td>Executes a stored procedure in a supported database.</td>
//     <td>Use when database-side logic or transformations already exist.</td>
//   </tr>

//   <tr>
//     <td><b>Lookup</b></td>
//     <td>Retrieves data or configuration values from a source.</td>
//     <td>Use to read control/configuration values such as file names, paths, or parameters.</td>
//   </tr>

//   <tr>
//     <td><b>Get Metadata</b></td>
//     <td>Retrieves metadata about a file, folder, or dataset.</td>
//     <td>Use to check file existence, size, last modified time, child items, etc.</td>
//   </tr>

//   <tr>
//     <td><b>ForEach</b></td>
//     <td>Iterates over a collection and executes activities for each item.</td>
//     <td>Use to process multiple files, tables, or records dynamically.</td>
//   </tr>

//   <tr>
//     <td><b>If Condition</b></td>
//     <td>Executes different activities based on a Boolean condition.</td>
//     <td>Use for conditional branching, such as checking whether a file exists.</td>
//   </tr>

//   <tr>
//     <td><b>Switch</b></td>
//     <td>Routes pipeline execution to different branches based on an expression value.</td>
//     <td>Use when there are multiple possible execution paths.</td>
//   </tr>

//   <tr>
//     <td><b>Execute Pipeline</b></td>
//     <td>Invokes another pipeline from the current pipeline.</td>
//     <td>Use to create modular and reusable pipelines.</td>
//   </tr>

//   <tr>
//     <td><b>Web Activity</b></td>
//     <td>Calls a REST API or web endpoint from the pipeline.</td>
//     <td>Use to trigger APIs or interact with external services.</td>
//   </tr>

//   <tr>
//     <td><b>Set Variable</b></td>
//     <td>Assigns a value to a pipeline variable.</td>
//     <td>Use to store temporary values during pipeline execution.</td>
//   </tr>

//   <tr>
//     <td><b>Wait</b></td>
//     <td>Pauses pipeline execution for a specified duration.</td>
//     <td>Use when a delay is required between activities.</td>
//   </tr>

//   <tr>
//     <td><b>Until</b></td>
//     <td>Repeatedly executes activities until a specified condition becomes true.</td>
//     <td>Use for polling or waiting until a condition is met.</td>
//   </tr>
// </table>`,
//         children: [],
//       },
      {
        q: `Activities`,
        a: `

<h3 style="color:purple;">Copy Activity</h3>

<p>
  Moves data from <strong>source to sink</strong>. It is the most commonly used
  activity in ADF.
</p>

<p>
  <strong style="color:blue;">Configure:</strong>
  Source LS + DS · Sink LS + DS · Format (CSV, Parquet, Delta) ·
  Write behavior (overwrite, append) · Column mapping ·
  Fault tolerance (skip bad rows)
</p>

<p>
  <strong style="color:green;">Use When:</strong>
</p>
<ul>
  <li>Raw ingestion to Bronze</li>
  <li>Move data between two data stores</li>
  <li>File format conversion (CSV → Parquet)</li>
  <li>On-premises to cloud via Self-hosted IR</li>
</ul>

<p>
  <strong style="color:red;">Cannot:</strong>
  Transform data — it is primarily a data movement activity.
  For transformations, chain it with a Notebook or Data Flow.
</p>




<hr>

<h3 style="color:purple;">If Condition</h3>

<p>
  Evaluates a <strong>true/false expression</strong> and routes execution
  to different activity sets, similar to an <strong>if/else</strong> block.
</p>

<p>
  <strong style="color:blue;">Configure:</strong>
</p>
<ul>
  <li>
    <code>expression</code> → must resolve to true/false,
    e.g. <code>@equals(activity('GetMetadata').output.exists, true)</code>
  </li>
  <li><code>ifTrue</code> → activities executed when true</li>
  <li><code>ifFalse</code> → activities executed when false</li>
</ul>

<p>
  <strong style="color:green;">Use When:</strong>
</p>
<ul>
  <li>Branch based on Get Metadata result</li>
  <li>Skip or fail if file is missing</li>
  <li>Route logic based on row count or file size</li>
  <li>Handle success/failure paths differently</li>
</ul>

<p>
  <strong style="color:red;">Cannot:</strong>
  Return a value or have more than two branches.
  For multiple branches, use <code>Switch</code>.
</p>
<hr>

<h3 style="color:purple;">Lookup</h3>

<p>
  Runs a query against a source (SQL table, file, pipeline) <strong>once</strong>,
  and returns the result as a JSON array of rows.
</p>

<p>
  <strong style="color:blue;">Returns:</strong>
  <code>output.value</code> → array of rows ·
  <code>output.firstRow</code> → first row ·
  <code>output.count</code> → number of rows
</p>

<p>
  <strong style="color:green;">Use When:</strong>
</p>
<ul>
  <li>Fetch a list of tables/files to process</li>
  <li>Read a config/control table</li>
  <li>Get a watermark value for incremental load</li>
  <li>Get a single config value using <code>firstRow</code></li>
</ul>

<p>
  <strong style="color:red;">Cannot:</strong>
  Loop through the results. Pair with <code>ForEach</code> to act on each row.
</p>




<hr>

<h3 style="color:purple;">ForEach</h3>

<p>
  Iterates over a collection and executes inner activities for each item,
  similar to a <strong>for loop</strong>.
</p>

<p>
  <strong style="color:blue;">Configure:</strong>
</p>
<ul>
  <li><code>items</code> → input array, usually <code>@activity('Lookup').output.value</code></li>
  <li><code>batchCount</code> → parallel iterations, maximum 50</li>
  <li><code>isSequential</code> → <code>true</code> = one by one, <code>false</code> = parallel</li>
</ul>

<p>
  <strong style="color:green;">Use When:</strong>
</p>
<ul>
  <li>Process multiple tables/files dynamically</li>
  <li>Run Copy or Notebook for each item</li>
  <li>Execute repeating logic over a list</li>
</ul>

<p>
  <strong style="color:red;">Cannot:</strong>
  Work alone — it needs a collection to iterate.
  Use <code>@item().columnName</code> to reference the current item.
</p>



<hr>

        <h3 style="color:purple">Get Metadata</h3>

<p>
  Checks file/folder properties <strong>once</strong>, returns them, and moves on.
  <strong>Cannot wait.</strong>
</p>

<p><strong style="color:violet">Returns:</strong>
  <code>exists</code> ·
  <code>size</code> ·
  <code>lastModified</code> ·
  <code>childItems</code> ·
  <code>itemName</code> ·
  <code>itemType</code>
</p>

<p><strong style="color:green">Use when:</strong></p>
<ul>
  <li>File should already be there</li>
  <li>Need to branch based on the result</li>
  <li>List files in a folder (<code>childItems</code> → <code>ForEach</code>)</li>
  <li>Validate that a file isn't empty (<code>size &gt; 0</code>)</li>
</ul>

<p>
  <strong style="color:red">Cannot: </strong> Wait for a file. If the file isn't there, it returns
  <code>exists: false</code>, and you handle the result using an
  <code>If Condition</code>.
</p>



<hr>

<h3 style="color:purple">Validation</h3>

<p>
  Polls a path repeatedly until the file appears or the timeout is reached.
  Returns nothing — it simply <strong>passes or fails</strong>.
</p>

<p><strong style="color:violet">Configure:</strong></p>
<ul>
  <li><code>timeout</code> — maximum wait time</li>
  <li><code>sleep</code> — seconds between retries</li>
  <li><code>minimumSize</code> — optional; detects empty files</li>
</ul>

<p><strong style="color:green">Use when:</strong></p>
<ul>
  <li>File arrival time is uncertain</li>
  <li>Want the pipeline to wait automatically</li>
  <li>Need to ensure the file is non-empty (<code>minimumSize</code>)</li>
  <li>Want a simple linear flow without branching</li>
</ul>

<p>
  <strong style="color:red">Cannot:</strong> Return file properties or branch based on the result.
  It only passes or fails. On timeout, the activity automatically fails and the
  pipeline errors out.
</p>

        `,
      },
      {
        q:`Activities part 2`,
        a:`
        <h3 style="color:purple;">Databricks Notebook Activity</h3>

<p>
  Triggers a notebook in a Databricks workspace using the configured
  Databricks compute.
</p>

<p>
  <strong style="color:blue;">Configure:</strong>
  Linked Service (Databricks) · Notebook path ·
  Base parameters (e.g. <code>run_date</code>, <code>table_name</code>)
</p>

<p>
  <strong style="color:green;">Use When:</strong>
</p>
<ul>
  <li>Heavy PySpark transformations</li>
  <li>Bronze → Silver → Gold processing</li>
  <li>Delta Lake processing and writes</li>
  <li>Complex business logic requiring Spark</li>
</ul>

<p>
  <strong style="color:red;">Cannot:</strong>
  Execute without Databricks compute. Cluster startup can add latency,
  so job clusters are generally preferred for production workloads.
</p>




<hr>

<h3 style="color:purple;">Execute Pipeline Activity</h3>

<p>
  Calls another pipeline from within the current pipeline, following a
  <strong>Parent → Child</strong> pattern.
</p>

<p>
  <strong style="color:blue;">Configure:</strong>
  Child pipeline reference · Parameters to pass ·
  Wait on completion
</p>

<p>
  <strong style="color:green;">Use When:</strong>
</p>
<ul>
  <li>Break large pipelines into modular child pipelines</li>
  <li>Master pipeline calls Bronze, Silver, and Gold pipelines</li>
  <li>Reuse common pipeline logic</li>
  <li>Pass parameters from parent to child pipeline</li>
</ul>

<p>
  <strong style="color:red;">Cannot:</strong>
  Directly access a child pipeline's individual activity outputs from the
  parent. Use parameters or other mechanisms when values need to be passed
  between pipelines.
</p>




<hr>

<h3 style="color:purple;">Web Activity</h3>

<p>
  Makes an <strong>HTTP/REST call</strong> to an endpoint from within the
  pipeline.
</p>

<p>
  <strong style="color:blue;">Configure:</strong>
  URL · Method (GET, POST, PUT) · Headers · Body (JSON payload)
</p>

<p>
  <strong style="color:green;">Use When:</strong>
</p>
<ul>
  <li>Call a REST API</li>
  <li>Trigger an Azure Function or Logic App</li>
  <li>Send notifications to an external system</li>
  <li>Call an API to retrieve or submit information</li>
</ul>

<p>
  <strong style="color:red;">Cannot:</strong>
  Replace a full API integration layer. Complex authentication or business
  logic may require Azure Function, Logic App, or another suitable service.
</p>




<hr>

<h3 style="color:purple;">Stored Procedure Activity</h3>

<p>
  Executes a stored procedure in Azure SQL Database, Azure Synapse, or
  SQL Server.
</p>

<p>
  <strong style="color:blue;">Configure:</strong>
  Linked Service (SQL) · Stored Procedure name · Parameters
</p>

<p>
  <strong style="color:green;">Use When:</strong>
</p>
<ul>
  <li>Update audit/control tables after a load</li>
  <li>Perform data quality checks in SQL</li>
  <li>Execute existing database logic after Copy</li>
  <li>Update watermark after an incremental load</li>
</ul>

<p>
  <strong style="color:red;">Cannot:</strong>
  Run arbitrary Spark or non-SQL workloads. It is used to execute stored
  procedures on supported SQL-based systems.
</p>
        `,
        children:[],
      }

    ],
  },
]
