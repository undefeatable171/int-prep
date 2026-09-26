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
    answer: `ADF is Azure's loud-based data integration and orchestration service used to extract, transform, and load data between different sources and destinations.<br>
<ul><li>Used to build and schedule ETL/ELT pipelines.</li>
<span style="color:#70C2E9">ADF VS DBX</span>ADF is primarily an orchestration and data integration tool, whereas Databricks is a data processing platform. In a project, I would typically use ADF to orchestrate the pipeline and Databricks to perform complex transformations.

<h3 style="color:#93DB0A"> Integration RunTime </h3> Integration Runtime (IR) is the compute - infrastructure used by ADF to execute activities and provide connectivity between ADF and data sources.
<br><b>ADF = Orchestrator ; 
IR = Engine that executes/connects</b>
<p style="color:#93CB0A">Three types</p>
<ul>
<li><strong>Azure IR:</strong> <ul><li>Fully managed by Azure,Serverless;Auto scales<li> mainly used for <strong>cloud-to-cloud</strong> data movement. (e.g. Blob → ADLS, Snowflake → ADLS) </li><li> <strong>Use when:</strong> both source and destination are cloud-based and public</li></ul>
<li>
  <strong>Self-Hosted IR (SHIR):</strong>
  <ul>
    <li>Software agent (Microsoft Integration Runtime) installed on a VM or on-prem machine , which allows ADF to communicate with and access the data source</li>
    <li>Used to access <strong>on-prem or private network</strong> sources (SQL Server, Oracle, SAP).</li>
    <li>We manage the machine, patching, and availability.</li>
    <li> <strong>Use when:</strong> source is on-prem or behind a firewall/private network </li>
  </ul>
</li>
<li>
  <strong>Azure-SSIS IR:</strong>
  <ul>
    <li>Managed cluster in Azure to run existing <strong>SSIS packages (.dtsx)</strong> natively</li>
    <li>SSIS(sql serer int service) = Microsoft's old on-prem ETL tool. Package (.dtsx) = equivalent of an ADF pipeline.</li>
    <li>Used for <strong>lift & shift</strong> existing SSIS workloads without rewriting as adf pipelines , when migrating on-prem SSIS jobs to cloud</li>
  </ul>
</li>

`,
    children: [
      {
        q: `<p ><span style="color:orange">Components</span>  Pipeline ;  Linked service ; dataset ; ACtivity ; Integration Runtime ; Trigger ;  mapping DataFlow       
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
    <td>Pipeline is a logical grouping of activities that together perform a data integration task. It controls the sequence and flow of tasks.</td>
    <td>Use it to orchestrate an ETL/ELT workflow from source to target.</td>
  </tr>

  <tr>
    <td><b>Linked Service</b></td>
    <td>A linked service contains the connection information required to connect ADF to a data store or compute service. It holds the endpoint and auth details</td>
    <td>Use it whenever ADF needs to connect to a source, target, or compute environment.</td>
  </tr>

  <tr>
    <td><b>Dataset</b></td>
    <td>A dataset represents the data structure and location of the data that an ADF activity reads from or writes to — it defines what data (file, table, container)  the Linked Service points to</td>
    <td> LS → where & how to connect. Dataset → what data at that connection.</td>
  </tr>

  <tr>
    <td><b>Activity</b></td>
    <td>Activity is a single step inside a pipeline that performs a specific action — it's the unit of work in ADF.<br> ADF activities are broadly categorized into three types:                <span style="color:yellow">Data Movement activities</span><br>
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
<li> if we want to check files in a folder , fill params for container, directory . But for file use <code>@trim()</code> because wecan't leave and can't put .</li>
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
        q: `<span style="color:#A5BF5E">Activities part 2</span>`,
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

<h3 style="color:#C4817B;">Web Activity VS WEbhooh</h3>

<ul><li><strong tyle="color:#93DB0A">Web Activity</strong >
Calls an HTTP endpoint, waits for an immediate HTTP response (200/400/500), then moves on. Doesn't care if the underlying job finishes. Timeout → fails.
Use for: notifications, quick API calls, Azure Functions.</li>

<li><strong tyle="color:#93DB0A">Webhook Activity</strong>
Calls an HTTP endpoint, ADF passes a callbackUrl in the request body. External system starts the job, may return a 202 Accepted immediately — but ADF doesn't proceed on that. ADF only moves forward when the external system POSTs back to the callbackUrl with success/failure after job completes. External system must be specifically built to extract and call back that URL. Timeout with no callback → fails.
Use for: long-running external jobs (ML training, approval workflows).</li></ul>
</p>

<p>
  <strong style="color:blue;">Configure:</strong>
  URL · Method (GET, POST, PUT) · Headers · Body (JSON payload)
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
        q: `<span style="color:#93D40A">ADF PRocess</span>`,
        answer: ``,
        children: [
          {
            q: `How to connect with Azure sql database/ any sql`,
            a: ` In ADF, we create a Linked Service with the SQL connector, provide server and database details, and authenticate using Managed Identity — which is preferred in prod as it requires no credentials. Then grant the ADF managed identity access on the SQL DB side via T-SQL. `,
            children: []
          },
          {
            q: `add dynamic date with seconds and convert to ist`,
            a: `<h3 style="color:violet">Dynamic Date & Time → IST</h3>

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
            chldren: [],
          },
          {
            q: `how to create and use stored procedures`,
            a: `
            
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
            children: [],
          }

        ],
      },
      {
        q: `<span style="color:#BFA85E">Learning points<span>`,
        a: ` 
<ul>
  <li><strong style="color:#5CBAF9">Validation VS Untill </strong>
    <ul>
      <li>Both Validation and Until can poll/retry until a condition is met with a defined timeout; if they time out, the activity fails and eventually the pipeline fails. Upon Failure can be used for alerts, logging, or cleanup. </li>
      <li>Until: An inner activity failure does not immediately fail Until; it continues iterating, and the final Until status depends on how the loop eventually ends—condition met → success, timeout → failure.</li>
    </ul>
  </li>

</ul>
<ul >
  <li> <strong style="color:#F95C6B">ForEach </strong>
        <ul>
            <li> <b>Sequential ForEach:</b> runs iterations one by one, but an inner activity failure does not automatically stop the ForEach. It continues processing the remaining items and the ForEach ultimately fails because an iteration failed.</li>
            <li> <b>Non Seq (parallel)</b> processes iterations concurrently(at max 50 parallel ), so other iterations continue as well; the ForEach ultimately fails if an iteration fails. </li>
        </ul>
  </li>

</ul>

</ul>
<ul <strong style="color:#93DB0A"> </strong>>
  <li>
        <ul>
            <li>
            </li>
        </ul>
  </li>

</ul>
        
        `,
        children: [],

      },{
        q:`Connecting ADF and DBX`,
        a:`
<ul>
  <li>Create an Azure Databricks Linked Service in ADF and authenticate using Managed Identity.</li>
  <li>Create an ADF pipeline, add the Databricks Job activity, select the Linked Service and Job.</li>
  <li>Pass the required parameters from ADF to the Databricks Job.</li>
  <li>Ensure the ADF Managed Identity has <b>Can Run</b> permission on the Databricks Job.</li>
</ul>

  <p style="color:#93DB0A">For a Databricks Job with multiple tasks, ADF can pass job-level parameters, while task-specific parameters are generally configured at the Databricks task level.</p>
        `,
        children:[],
      },
      {
        q:` <span style="color:#93DB0A">Triggers</span>`,
        a:`

<ul>
  <li><strong style="color:#70C2E9" >Schedule Trigger:</strong> Automatically starts an ADF pipeline at a pre defined time or regular interval, like every 15 minutes, hourly, or daily..</li>
  <ul><li><strong>Stateless:</strong>  Doesn't Tracks triggered pipeline execution status and can't backfill missed occurrences.</li>
  <li><strong>Multiple pipelines:</strong> One Schedule Trigger can trigger multiple pipelines.</li></ul>

  <li><strong style="color:#70C2E9" >Tumbling Window Trigger:</strong> triggers the pipeline for fixed, non-overlapping time windows and is useful for <strong>historical backfilling</strong>.</li>
  <ul><li><strong>Stateful:</strong> Tracks each window's execution status.</li>
  <li><strong>Window time:</strong> Provides <code>windowStartTime</code> and <code>windowEndTime</code>, which can be passed to the pipeline for incremental/time-based processing.</li>
  <li><strong>Max Concurrency:</strong> Controls how many windows can run in parallel. Default is <strong>1</strong>.</li>
  <li><strong>Dependencies:</strong> A window can depend on a previous window or another tumbling-window trigger.</li>
  <li><strong>One pipeline:</strong> A Tumbling Window Trigger is associated with <strong>one pipeline</strong>.</li>
  <li><strong>Failure &amp; Recovery:</strong> Need to Fix the issue manually → rerun the failed window → once successful, pending windows can continue according to the configured concurrency/dependencies.</li></ul>

<li><strong style="color:#70C2E9" >Event-Based Trigger:</strong> Fires when an event occurs in ADLS Gen2 or Blob Storage, such as a <strong>blob/file created or deleted</strong>.</li>
  <ul><li>Uses <strong>Azure Event Grid</strong> to detect the event and trigger the ADF pipeline.</li>
  <li><strong>Best suited:</strong> When file arrival time is <strong>unpredictable</strong>.</li>
  <li><strong>Example:</strong> Whenever a vendor uploads a file to ADLS, the pipeline automatically starts processing it.</li></ul>
</ul>

<hr>
<span style="color:#93DB0A">Tumbling Example: backfill and incremental loading everyday , sql db to files</span> 
<ul> <li><strong>Pipeline parameters:</strong> <ul> <li><code>pstartts</code> → Start time of the window</li> <li><code>pendts</code> → End time of the window</li> </ul> </li> <li><strong>Copy Activity:</strong> Passes these parameters to the SQL stored procedure: <ul> <li><code>startts = @pipeline().parameters.pstartts</code></li> <li><code>endts = @pipeline().parameters.pendts</code></li> </ul> </li> <li><strong>Example:</strong> For a 1-day window, ADF passes <code>Mar 1 00:00</code> as <code>pstartts</code> and <code>Mar 2 00:00</code> as <code>pendts</code>.</li> <li>The stored procedure <code>usp_select</code> uses these values to fetch only the data between those timestamps.</li> <li><strong>Flow:</strong> Tumbling Window → Start/End Time → Pipeline Parameters → Stored Procedure → ADLS.</li> </ul>
    <img style="width:100% ;height:80%" src="../support/docs/adf/Tumbling.png" alt="Description">
      
        `,
        tip:`Schedule Trigger   = Stateless + Regular schedule + No backfill <br>
Tumbling Window    = Stateful + Fixed windows + Backfill + Dependencies`,
        children:[],
      }


    ],
  },
  {
    cat: `ADF`,
    q: `ADF questions`,
    a: ``,
    children: [
      {
        q: `How do you build a metadata-driven pipeline in ADF to process multiple vendor files from ADLS input folder to ADLS Bronze layer with Source file names dynamically changing with date?`,
        a: `
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
        tip: `when Wildcard file path is selected in source, it overrides the folder and filename dataset parameters for that source tab only. But container must still be passed via parameter even with wildcard. The same dataset parameters work normally for sink — exact container, folder, and filename as usual.
<br>
Same dataset, container always parameterized, wildcard overrides folder+file for source only. Clean approach.`,
        children: [],
      },
      {
        q: `<span style="color:green">You have multiple tables in a source Azure SQL database that need to be loaded into a target Azure SQL database using a single metadata-driven ADF pipeline.<br>
  The control table contains the source/target database, schema, table name, active flag, load type (FULL/INCREMENTAL), and last_watermark.
Design the pipeline to perform the appropriate load and update last_watermark only after a successful copy.</span>`,
        a: `
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
<code>@concat('SELECT * FROM ',item().source_schema,'.',item().table_name,' WHERE updated_at > ',string(item().last_watermark),)</code>

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
        tip: `<ul>
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
        <code></code> inside the ADF string represents an escaped
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
        children: [],
      },
      {
        q: `<span style="color:violet"> ADF File polling   </span>`,
        a: `
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
 ├── copy (on SUCCESS)
 ├── lOGS (on FAILURE)(WEb ACTIVITY => AZURE LOGIC APPS / SP AND UPDATE CONTROL TABLE )
</pre>
Pipeline would fail anyway if timedout even ading SP/WEb activity , these are just for logging /alert purpose
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

Pipeline would fail anyway if timedout even ading SP/WEb activity , these are just for logging /alert purpose

<img style="height:50% ; width:75%" src='../support/docs/adf/polling.png'>

  `,
        children: [],
      },
      {
        q: `<span style="color:#368B79">Folder contains CSV, TXT and folders; process only CSV`,
        a: `
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
        children: [],
      },
      {
        q: `100 independent tables; some fail; others should continue and log`,
        a: `
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
  <img style="width:50% ;height:60%" src="../support/docs/adf/failure.png" alt="Description">

  `,
        tip: `
 For 100 independent tables in ForEach always use isSequential = false (parallel) + error logging on failure path — ensures all tables are attempted regardless of individual failures.
  `,
        children: [],
      },
      {
        q: `<strong style="color:#93DB0A">Poll an ADLS folder until all expected files arrive like a list of 8, even when the filenames contain dynamic suffixes such as timestamps or unique IDs.</strong>`,
        a: `<pre>Lookup
  ↓
Until
  ├── Get Metadata → childItems
  ├── Filter → matching files
  └── Wait 5 seconds
       ↺ repeat until all expected files are found
  ↓
If Condition
  ↓
Execute Child Pipeline
  ↓
ForEach → Copy each file</pre>

<p><strong> Lookup Activity</strong></p>
<code language ='sql'>select string_agg(table_name, ',') as names from dbo.pipeline_control where is_active = 1</code> <br>
<strong>result:</strong> :  "customers,products,orders,claims" 
<br>

<br>

<p><strong> filter</strong></p>
<code>@and( equals(item().type,'File'),contains(
    split(activity('Lookup1').output.value[0].names,','), split(item().name,'_')[0])
)</code>
<p> extracts the dynamic filename prefix. : <code>split(item().name,'_')[0]</code> </p>
<p> checks whether that prefix exists in the expected list from lookup. : <code>contains(...)</code> </p>
<br>

<p><strong> until</strong></p>
<code>@greaterOrEquals( length(activity('Filter1').output.value),
length(split(activity('Lookup1').output.value[0].names,',')))</code>
<p>The loop stops when the number of matching files found is greater than or equal to the number of expected files.</p>

<p><strong> Wait Activity</strong></p>

<p>Waits 5 seconds after each check before the next polling iteration. This prevents continuously querying the storage location without an interval</p>

<pre>Until
 ├── Succeeded → If Condition → Execute Child Pipeline -> foreach ->Copy
 │
 └── Failed/Timeout → SP / Logic app</pre>

<p> Parent → Child Pipeline</p>
<p>The parent uses Execute Pipeline to invoke <code>pl_for_each_copy</code>.</p>
<p>The child receives the filtered files through:</p>
<code>pl_file_names = @activity('Filter1').output.value</code>
<p>The child can then use a ForEach to process each file.</p>

<img style="height:50% ; width:75%" src='../support/docs/adf/file_all.png'>

        
        `,
        children: [],
      },
      {
        q: `What if copy fails halfway`,
        a: `
  <strong> SQL_SQL / ANy source - sql</strong> 
  <ul>
<>Copy processes data in batches/parallel. If a SQL Copy fails halfway, some data may already be written to the target.</li>
<li><strong>Watermark:</strong> Update it <strong>only after Copy succeeds</strong>.</li>
<li> Retry does not guarantee resume from the failed point for SQL/tabular Copy; the resume feature is for supported binary file copies like large .zip / .mp4 files</li>
<li>Therefore, a retry may reprocess the same incremental range.</li>  
<li>WE need to Use an idempotent target strategy (MERGE/upsert) to prevent duplicates instead of blind inserts</li>
</ul>
  `,
        children: [],
      },
      {
        q: ` SQL temporarily unavailable for 1–2 minutes`,
        a: ` If the source SQL database is temporarily unavailable for 1–2 minutes, I configure retries on the Copy activity with an appropriate retry interval. ADF retries the connection automatically. If the database becomes available within the retry window, the Copy succeeds; otherwise, the activity fails and I handle the failure through the failure path/alerting.`,
        children: [],
      }

    ],
  }
]
