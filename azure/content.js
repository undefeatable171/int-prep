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
        q: `<p style="color:orange"> Pipeline ;  Linked service ; dataset ; ACtivity ; Integration Runtime ; Trigger ;  mapping DataFlow       
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

<h3 style="color:#368B79;">If Condition</h3>

<p>
  Evaluates a <strong>true/false expression</strong> and routes execution
  to different activity sets, similar to an <strong>if/else</strong> block.
</p>

<p>
  <strong style="color:#4BE48B;">Configure:</strong>
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
  DOn't Return a value or have more than two branches.
  For multiple branches, use <code>Switch</code>.
</p>
<img style="height:50% ; width:75%" src='../support/docs/adf/if.png'>

<hr>

<h3 style="color:#368B79;">Lookup</h3>

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
  <li>Get a single config value using <code>firstRow</code> when selected </li>
  <li><b> If using qury option then it will override schema and table options and we can Put as NA(leaving empty will error)<br>
  Inside query it will look and outside db option </b> </li>
</ul>

<p>
  <strong style="color:red;">Cannot:</strong>
  Loop through the results. Pair with <code>ForEach</code> to act on each row.
</p>
<img style="height:50% ; width:75%" src='../support/docs/adf/Lookup.png'>




<hr>

<h3 style="color:#738B36;">ForEach</h3>

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
  <strong style="color:red;">Output: Just give item().column_name as input that column_name is whatever from table</strong></p>
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

<p><strong style="color:violet">Output By selection:</strong>
  <strong>File:</strong>
    <code>exists</code> ·
    <code>size</code> ·
    <code>lastModified</code> ·
    <code>itemName</code> ·
    <code>itemType</code> ·
    <code>columnCount</code><br>
    <strong>Folder:</strong>
    <code>exists</code> ·
    <code>childItems</code> ·
    <code>itemName</code> ·
    <code>itemType</code> ·
    <code>lastModified</code>
</p>

<p><strong style="color:green">Use when:</strong></p>
<ul>
  <li>File should already be there</li>
  <li>Need to branch based on the result</li>
  <li>List files in a folder (<code>childItems</code> → <code>ForEach</code>)</li>
  <li>Validate that a file isn't empty (<code>size > 0</code>)</li>
<li> if we want to check files in a folder , fill params for container, directory . But for file use <code>@trim('')</code> because wecan't leave and can't put ''.</li>
</ul>

<p>
  <strong style="color:red">Cannot: </strong> Wait for a file. If the file isn't there, it returns
  <code>exists: false</code>, and you handle the result using an
  <code>If Condition</code>. <br>
  <b>Can't put dynamic file names with * in file option like copy. need to explicitly handle after foreach with if condition</b>
</p>
<img style="height:50% ; width:75%" src='../support/docs/adf/Get_metadat.png'>



<hr>

<h3 style="color:purple">Validation</h3>

<p>

Polls a known file/path until the file arrives or the timeout is reached.it simply <strong>passes or fails</strong>. and returns no metadata.
</p>
<p><strong style="color:violet">Configure:</strong></p>
<ul>
  <li><code>timeout</code> — maximum wait time</li>
  <li><code>sleep</code> — seconds between retries</li>
  <li><code>minimumSize</code> — optional; detects empty files</li>
</ul>

<p><strong style="color:green">Use when:</strong>  Validation is used when the file arrival time is uncertain but the expected file name is known.<br>
.It repeatedly checks for the file until the timeout is reached and can also verify that the file is non-empty using minimumSize <br>
Filename has a predictable dynamic value, e.g.:
<code>@concat('products_',formatDateTime(utcNow(),'ddMMyyyy'),'.csv')</code>
</p> <p><strong style="color:red;">Cannot:</strong> It provides a simple pass/fail flow, but it cannot dynamically discover unknown filenames or with random timestamps send by vendor like <code>products_24092026122309</code></p>
 <p><b> Important</b>: If the file doesn't arrive before timeout, <b>Validation fails and the pipeline fails</b>, even if you connect another activity using Upon Failure.<br><code>For dynamic filenames/ optional files, use Until + Get Metadata + Filter SO pipeline won't fail</code></p>
`,
      },
      {
        q: `Activities part 2`,
        a: `
<h3 style="color:#368B79;">Wait Activity</h3>
<p>   Pauses the pipeline execution for a <strong>specified duration</strong> before continuing.
</p>

<p><strong>Configure:</strong></p>
<ul>
  <li><code>waitTimeInSeconds</code> — duration to pause execution</li>
</ul>

<p><strong>Use when:</strong></p>
<ul>
  <li>Need to wait before retrying/checking a condition</li>
  <li>Commonly used inside <code>Until</code> for polling</li>
</ul>

<p>
  <strong>Example:</strong> <code>Wait 20 seconds → Get Metadata → Filter → repeat</code>
</p>
<hr>
<h3 style="color:purple;">Until Activity</h3>

<p>
  Repeats a set of activities <strong>until a condition becomes true</strong>
  or the timeout is reached.
</p>
<p style="color:orange;"> Expects: <code>expression</code> for validation and <Timeout> after which it fails</p>
<p><strong>Use when:</strong></p>

<ul>
  <li>Need to repeatedly check for a file or condition</li>
  <li>File arrival time is uncertain</li>
  <li>Filename is dynamic/unknown → <code>Get Metadata + Filter</code></li>
  <li>Need custom logic or multiple activities in each iteration</li>
  <li>EX: expression for evaluation: <code>@greater(length(activity('Filter1').output),0)</code></li>
</ul>

<p>
  <strong>Typical pattern:</strong> for checking dynamic file arriving uncertainly and need to poll for 2 hours after trigger
  <code>Until → Get Metadata → Filter → Wait → repeat</code>
</p>

<hr>

<h3 style="color:orange;"> Filter Activity </h3>
<p>
  Filters an <strong>array of items</strong> based on a condition and returns only the matching items.
</p>

<p><strong>Input:</strong></p>
<ul>
  <li>Requires an <strong>items</strong> array as the input.
  : <code> @activity('Get Metadata1').output.childItems  </code>
  <code> @activity('Lookup').output.value  </code>
  <ul><li>Common source: <code>Get Metadata → childItems / lookup-> value</code>.</li></ul>
  </li>
  
  <li> condition: for filtering
   <code> @and(startswith(item().name, concat('products_',formatDateTime(utcNow(),'ddMMyyyy') )), endswith(item().name,'.csv') )</code>.</li>
</ul>

<p><strong>Output:</strong></p>
<ul>
  <li><code>value</code> → array containing only the items that matched the condition. Firlds inside Value(name, Type)</li>
  <li>Can return <strong>zero, one, or multiple</strong> items.</li>
</ul>

<p><strong>Use when:</strong></p>
<ul>
  <li>Need to select specific files from <code>childItems</code></li>
  <li>Need to filter items based on a condition</li>
  <li>Need to identify files with a dynamic naming pattern</li>
</ul>

<p>
  <strong>Typical pattern:</strong>
  <code>Get Metadata (childItems) → Filter → ForEach / Until</code>
</p>
<img style="height:50% ; width:75%" src='../support/docs/adf/Filter.png'>


<hr>
        <h3 style="color:#4BE48B;">Databricks Notebook Activity</h3>

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

<h3 style="color:#368B79;">Execute Pipeline Activity</h3>

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
        children: [],
      },
      {
        q: `ADF process`,
        answer: ``,
        children: [
          {
            q: `How to connect with Azure sql database/ any sql`,
            a: ` In ADF, we create a Linked Service with the SQL connector, provide server and database details, and authenticate using Managed Identity — which is preferred in prod as it requires no credentials. Then grant the ADF managed identity access on the SQL DB side via T-SQL. `,
            children: []
          },
          {
            q:`add dynamic date with seconds and convert to ist`,
            a:`<h3 style="color:violet">Dynamic Date & Time → IST</h3>

<p><strong>Current UTC date/time:</strong></p>
<code>@utcNow()</code>

<p><strong>Dynamic date with seconds:</strong></p>
<code>@formatDateTime(utcNow(),'ddMMyyyy_HHmmss')</code>

<p><strong>Convert UTC → IST:</strong></p>
<code>@convertFromUtc(utcNow(),'India Standard Time')</code>

<p><strong>IST with date and seconds:</strong></p>
<code>@formatDateTime(convertFromUtc(utcNow(),'India Standard Time'),'ddMMyyyy_HHmmss')</code>

<p><strong>Use <code>concat()</code> to create dynamic filenames:</strong></p>
<code>@concat('products_', formatDateTime(convertFromUtc(utcNow(),'India Standard Time'),'ddMMyyyy_HHmmss'), '.csv')</code>

<p><strong>Example:</strong></p>
<code>products_24092026_194532.csv</code>

<p><strong>Need to add / subdates</strong></p>
<code>@formatDateTime(addDays(utcnow(),-1),'yyyy-MM-dd')</code>`,
            chldren:[],
          },
          {
            q:`how to create and use stored procedures`,
            a:`
            
<pre><code class="language-sql">
CREATE PROCEDURE usp_log_pipeline_error
    @table_name NVARCHAR(100),
    @error_message NVARCHAR(500),
    @run_id NVARCHAR(100),
    @pipeline_name NVARCHAR(100)
AS
BEGIN
    INSERT INTO pipeline_error_log 
    (table_name, error_message, run_id, pipeline_name, failed_at)
    VALUES 
    (@table_name, @error_message, @run_id, @pipeline_name, GETDATE())
END
</code></pre>
            `,
            children:[],
          }

        ],
      },
      ,

    ],
  },
  {
        cat: `ADF`,
        q: `ADF questions`,
        a: ``,
        children: [
{
  q:`How do you build a metadata-driven pipeline in ADF to process multiple vendor files from ADLS input folder to ADLS Bronze layer with Source file names dynamically changing with date?`,
  a:`
  <img style="width:50% ;height:60%" src="../support/docs/adf/copy_source.png" alt="Description">

  <h3 style="color:purple;">Dataset Parameters</h3><code>container</code></li>
    <code>folder</code>
    <code>file_name</code>


<p>Single ADLS CSV Dataset.</p>


<h3 style="color:purple;">SQL Control Table</h3>

<table border="1" cellpadding="6" cellspacing="0">
    <thead>
        <tr>
            <th>table_name</th>
            <th>src_folder</th>
            <th>tgt_folder</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>encounters</td>
            <td>vendor1</td>
            <td>encounters</td>
        </tr>
        <tr>
            <td>pharmacy</td>
            <td>vendor2</td>
            <td>pharmacy</td>
        </tr>
    </tbody>
</table>


<h3 style="color:purple;">Flow</h3>

<p>
    <strong>Lookup (SQL)</strong>
    →
    <strong>ForEach</strong>
    (<code>@activity('Lookup1').output.value</code>)
    →
    <strong>Copy</strong>
</p>


<h3 style="color:purple;">Source</h3>

<ul>
    <li>Container: <code>raw</code> <strong>(hardcoded)</strong></li>
    <li>File path type: <strong>Wildcard</strong></li>
    <li>Folder: <code>@item().src_folder</code></li>
    <li>
        File:
        <code>@concat(item().table_name,'_',formatDateTime(utcNow(),'ddMMyyyy'),'*.csv')</code>
    </li>
</ul>


<h3 style="color:purple;">Sink</h3>

<ul>
    <li>Container: <code>bronze</code> <strong>(hardcoded)</strong></li>
    <li>Folder: <code>@item().tgt_folder</code></li>
    <li>
        File:
        <code>@concat(item().table_name,'_',formatDateTime(utcNow(),'ddMMyyyy'),'.csv')</code>
    </li>
</ul>
  `,
  tip:`when Wildcard file path is selected in source, it overrides the folder and filename dataset parameters for that source tab only. But container must still be passed via parameter even with wildcard. The same dataset parameters work normally for sink — exact container, folder, and filename as usual.
<br>
Same dataset, container always parameterized, wildcard overrides folder+file for source only. Clean approach.`,
  children:[],
},
{
  q:`<span style="color:green">You have multiple tables in a source Azure SQL database that need to be loaded into a target Azure SQL database using a single metadata-driven ADF pipeline.<br>
  The control table contains the source/target database, schema, table name, active flag, load type (FULL/INCREMENTAL), and last_watermark.
Design the pipeline to perform the appropriate load and update last_watermark only after a successful copy.</span>`,
  a:`
  <h2 style="color:purple;">Linked Service</h2>
<p>
    <strong>SQL DB Linked Service</strong> — parameter:
    <code>DBname</code>
</p>
<h2 style="color:purple;">Dataset</h2>
<p>
    <strong>SQL DB Dataset</strong> — parameters:
</p>
<code>db</code>
   <code>schema</code>
    <code>table</code>

<p>
    Dataset parameter <code>db</code> is passed to Linked Service parameter
    <code>DBname</code>.
</p>


<h2 style="color:purple;">SQL Control Table</h2>

<table border="1" cellpadding="6" cellspacing="0">
    <thead>
        <tr>
            <th>table_name</th>
            <th>source_schema</th>
            <th>sink_schema</th>
            <th>source_db</th>
            <th>sink_db</th>
            <th>is_active</th>
            <th>load_type</th>
            <th>last_watermark</th>
        </tr>
    </thead>

    <tbody>
        <tr>
            <td>encounters</td>
            <td>dbo</td>
            <td>dbo</td>
            <td>srcdb</td>
            <td>sinkdb</td>
            <td>1</td>
            <td>INCREMENTAL</td>
            <td>2026-09-01</td>
        </tr>

        <tr>
            <td>pharmacy</td>
            <td>dbo</td>
            <td>dbo</td>
            <td>srcdb</td>
            <td>sinkdb</td>
            <td>1</td>
            <td>FULL</td>
            <td>NULL</td>
        </tr>
    </tbody>
</table>


<h2 style="color:purple;">Pipeline Flow</h2>

<h3 style="color:violet">Control Table → Full / Incremental Load</h3>

<pre>
Lookup Control Table
        ↓
     ForEach
        ↓
   If: FULL / INCREMENTAL
    ↙              ↘
 Full Copy      Incremental Copy
    ↘              ↙
      Lookup MAX(updated_at)
              ↓
       Stored Procedure
              ↓
       Update Watermark
</pre>

<p><strong>Lookup Query:</strong></p>
<code>SELECT * FROM control_table WHERE is_active = 1;</code>

<p><strong>ForEach items:</strong></p>
<code>@activity('Lookup1').output.value</code>

<p><strong>If Condition:</strong></p>
<code>@equals(item().load_type,'FULL')</code>

<p><strong>Incremental</strong></p>
Source Copy:

<ul>
    <li>Dataset: Same SQL DB Dataset</li>
    <li><code>db = @item().source_db</code></li>
    <li>Source option: <strong>Query</strong></li>
</ul>

<p><Dynamic Query:</p>
<code>@concat('SELECT * FROM ',item().source_schema,'.',item().table_name,' WHERE updated_at > ''',string(item().last_watermark),'''')</code>

SINK for both INCremental and full:
<ul>
    <li>Dataset: Same SQL DB Dataset</li>
    <li><code>db = @item().sink_db</code></li>
    <li><code>schema = @item().sink_schema</code></li>
    <li><code>table = @item().table_name</code></li>
    <li>Sink option: <strong>Table</strong></li>
</ul>

<p><strong>Full copy</strong></p>
SOurce Copy
<ul>
    <li>Dataset: Same SQL DB Dataset</li>
    <li><code>db = @item().source_db</code></li>
    <li><code>schema = @item().source_schema</code></li>
    <li><code>table = @item().table_name</code></li>
    <li>Source option: <strong>Table</strong></li>
</ul>

<p><strong>Lookup MAX(updated_at):</strong></p>
<code>@concat('SELECT MAX(updated_at) AS max_updated FROM ',item().sink_schema,'.',item().table_name)</code>

<pre><code>max_updated
-------------------
2026-09-17 10:30:00</code></pre>

<p><strong>Stored Procedure:</strong></p>
<code>usp_update_watermark</code>

<p><strong>Parameters:</strong></p>

<table border="1" cellpadding="6" cellspacing="0">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Value</th>
        </tr>
    </thead>

    <tbody>
        <tr>
            <td><code>table_name</code></td>
            <td><code>@item().table_name</code></td>
        </tr>

        <tr>
            <td><code>new_watermark</code></td>
            <td><code>@activity('LookupMax').output.firstRow.max_updated</code></td>
        </tr>
    </tbody>
</table>  
<img style="height:50% ; width:75%" src='../support/docs/adf/sql_sql.png'>

`,
tip:`<ul>
    <li>
        <strong>Query overrides table selection:</strong>
        When Query is selected in the Copy source, the query determines which
        table/data is read. The dataset doesn't need a fixed table for that query.
    </li>

    <li>
        <strong>Database parameterization:</strong>
        <code>item().source_db</code> →
        Dataset <code>db</code> →
        Linked Service <code>DBname</code>.
    </li>

    <li>
        <strong>Dynamic SQL quotes:</strong>
        <code>''</code> inside the ADF string represents an escaped
        single quote used to wrap the SQL datetime value.
    </li>

    <li>
        <strong>Single reusable dataset:</strong>
        The same SQL dataset is reused for all tables. Parameters determine
        the database, schema, and table at runtime.
    </li>

    <li>
        <strong>Watermark update:</strong>
        The watermark is updated only after the Copy succeeds.
    </li>

    <li>
        <strong>Incremental logic:</strong>
        Only records satisfying
        <code>updated_at &gt; last_watermark</code>
        are extracted.
    </li>
</ul>`,
  children:[],
},
{
  q:`<span style="color:violet"> ADF File polling   </span>`,
  a:`
  When to Use What
<table border="1" cellpadding="6" cellspacing="0">
<thead>
  <tr>
    <th>Scenario</th>
    <th>Activity</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>Fixed filename / predictable <code>name_date</code> (mandatory)</td>
    <td><strong>Validation → Copy</strong></td>
  </tr>
  <tr>
    <td>Dynamic filename / the file is
  <strong>optional and the pipeline should not fail</strong</td>
    <td><strong>Until → Get Metadata → Filter → Wait → If → Copy / Alert</strong></td>
  </tr>
  </tbody>
</table>


<h3 style="color:violet">Flow of  mandatory</h3>
<pre>
 ├── validation (3 hrs , sleep : 10 mins)
 ├── copy
</pre>
if no file till timedout , failure. So no other activities req
<br>
<hr>
<h3 style="color:violet">Flow of  Optional / Dynamic names</h3>
<pre>
Until
 ├── Get Metadata
 ├── Filter
 └── Wait 20 seconds
        ↓
   File found / Timeout
        ↓
   If Condition
   ├── True  → Copy
   └── False → Email via Web Activity → Logic App
</pre>

<p><strong>Until condition:</strong></p>

<code>@greater(length(activity('Filter1').output.value), 0)</code>

<p><strong>Filter condition:</strong></p>

<code>@and(startswith(item().name, concat('products_', formatDateTime(utcNow(),'ddMMyyyy'))), endswith(item().name, '.csv'))</code>

<p><strong>If Condition:</strong></p>

<code>@greater(length(activity('Filter1').output.value), 0)</code>

<img style="height:50% ; width:75%" src='../support/docs/adf/polling.png'>

  `,
  children:[],
},
{
  q:`<span style="color:#368B79">Folder contains CSV, TXT and folders; process only CSV`,
  a:`
<h3 style="color:violet">Folder → Multiple CSV Files</h3>

<pre>
Get Metadata
    ↓
ForEach
    ↓
If: File + .csv
    ↓
Copy
</pre>

<p><strong>ForEach items:</strong></p>
<code>@activity('Get Metadata1').output.childItems</code>

<p><strong>If Condition:</strong></p>
<code>@and(equals(item().type,'File'), endswith(item().name,'.csv'))</code>

<p><strong>Source filename:</strong></p>
<code>@item().name</code>

<span style="color:pink"> Second approach</span>
<pre>
Get Metadata
    ↓
Filter  File + .csv
    ↓
ForEach
    ↓
  Copy
</pre>

  `,
  children:[],
},
{
  q:`100 independent tables; some fail; others should continue and log`,
  a:`
 Same like multiple tables 2nd qustion , but add a sp after failure at each copy
  <pre>
 Copy data1
    │
    │ Upon Failure
    ↓
Stored procedure
    │
    ├── error_message → @activity('Copy_full').output.errors.message
    ├── pipeline_name → pipeline().Pipeline
    ├── run_id        → pipeline().RunId
    └── table_name    → claims
    </pre>
  `,
  tip:`
 IN <b>ForEach isSequential = true</b> processes one by one, and if one iteration fails → ForEach stops, remaining tables skipped. <br>
 So for 100 independent tables always use isSequential = false (parallel) + error logging on failure path — ensures all tables are attempted regardless of individual failures.
  `,
  children:[],
},
{
  q:`10 expected files arrive at different times; wait until all arrive`,
  a:``,
  children:[],
},
{
  q:`What if copy fails halfway`,
  a:`
  <strong> SQL_SQL / ANy source - sql</strong> 
  <ul>
<>Copy processes data in batches/parallel. If a SQL Copy fails halfway, some data may already be written to the target.</li>
<li><strong>Watermark:</strong> Update it <strong>only after Copy succeeds</strong>.</li>
<li> Retry does not guarantee resume from the failed point for SQL/tabular Copy; the resume feature is for supported binary file copies like large .zip / .mp4 files</li>
<li>Therefore, a retry may reprocess the same incremental range.</li>  
<li>WE need to Use an idempotent target strategy (MERGE/upsert) to prevent duplicates instead of blind inserts</li>
</ul>
  `,
  children:[],
},
{
  q:` SQL temporarily unavailable for 1–2 minutes`,
  ans:` If the source SQL database is temporarily unavailable for 1–2 minutes, I configure retries on the Copy activity with an appropriate retry interval. ADF retries the connection automatically. If the database becomes available within the retry window, the Copy succeeds; otherwise, the activity fails and I handle the failure through the failure path/alerting.`,
  children:[],
}

        ],
      }
]
