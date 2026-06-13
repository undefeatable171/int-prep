const cats = ["storage","ADF","key-vault","CI-CD","Scenario"];
const qs = [
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 

{
    cat:"storage",
    q:"What is azure storage ",
    answer:` 👉 Azure Storage is a cloud-based storage service provided by Microsoft Azure for storing and managing various types of data, such as files, images, videos, documents, backups, and application data.<br>

👉 It supports both structured and unstructured data and allows access through multiple methods, including REST APIs, SDKs, HTTPS, Azure Portal, CLI, and PowerShell. It is designed to be highly available, durable, secure, and scalable.`,
    children:[
{
    q:`What are the benefits of Azure Storage?`,
    a:`
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
    children:[],
}
              ],
},
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
{
    cat:"storage",
    q:`What is Azure Blob Storage?`,
    answer:`<p>Azure Blob Storage is Microsoft's object storage solution for storing massive amounts of unstructured data, such as:
    <br> - photos , videos , documents , csv files etc,..
    <br>Common use cases include: <br>- Data lakes for analytics. <br>-Backup and disaster recovery</p>`,
    children:[
        {
            q:`What is Azure Data Lake Storage Gen2 (ADLS Gen2)?`,
            a:`ADLS Gen2 is built on top of Azure Blob Storage. It provides all Blob Storage capabilities along with Hierarchical namespace (folders and directories) and  performance optimizations for big data analytics(Faster directory and file operations), making it the preferred storage option for Azure Databricks and modern data lake architectures.`,
            children:[{
                q:`The main factors affecting Azure Storage costs are`,
            a:`<p><strong>Answer:</strong></p>

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
        children:[],
    }
            ],},
            {
                q:`adls gen2 VS blob storage`,
                a:`Azure Blob Storage is a general-purpose object storage service used to store unstructured data such as images, videos, documents, backups, and log files.
<br> - 
ADLS Gen2 is built on top of Blob Storage and is optimized for big data analytics. The key difference is that it supports a Hierarchical Namespace (HNS), which provides a true folder structure(sub folders) and improves file operations like rename and move. It also supports fine-grained access control through POSIX ACLs and integrates well with Azure Databricks, Synapse Analytics, and Apache Spark.
<br> - 
I would use Blob Storage for general-purpose storage and ADLS Gen2 for Data Engineering and analytics workloads.`,
children:[],
            }
    ],},
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
{
    cat:"storage",
    q:`Q. Assume you are working as a Data Engineer. Reports are stored in Azure Blob Storage, and a third-party application needs access to these reports for only the next 7 days. How would you solve this?`,
    answer:`"I would use a SAS(shared access signature) token to provide the third-party application with secure, read-only access to the required blob or container for 7 days. <br>
    The token automatically expires after the specified period, eliminating manual intervention. <br>
    I would avoid using Storage Account Access Keys because they grant full access to the entire storage account and pose a security risk for temporary external access. Acees won't revoke automatically untill we change access keys`,
    children:[],
    tip:`we can usebroiler plate code for accessing blob storage in dbx using access token / sas token`
},
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
{
    cat:"storage",
    q:`Assume you want to provide read access to junior team members and read-write access to senior team members on an Azure Storage Account. Can you do this? If yes, how?`,
    answer:`Yes. I would use Azure RBAC to assign different roles based on user responsibilities. For example, junior members can have the Storage Blob Data Reader role, while senior members can have the Storage Blob Data Contributor role. Authentication is handled through Microsoft Entra ID (Azure AD)`,
children:[],
},
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
{
    cat:"storage",
    q:`Is it possible to automatically move data between Azure Blob Storage access tiers? If yes, why and how?`,
    answer:`Yes, Azure Blob Storage supports automatic movement of data between Hot, Cool, and Archive tiers using Lifecycle Management policies. This helps optimize storage costs by keeping frequently accessed data in the Hot tier and automatically moving older, less frequently accessed data to the Cool or Archive tiers based on predefined rules.
<br>
For example, recent data can stay in the Hot tier, data older than 30 days can move to the Cool tier, and older archival data can move to the Archive tier.
<br>
To configure this, I would go to the Storage Account → Lifecycle Management → Add Rule → define the scope and conditions (such as blob age or last modified date) → choose the action to move the data to Cool or Archive → save the policy. Azure then automatically manages the tier transitions without manual intervention`,
children:[
    {
        q:`use of blob life cycle managemnt policies`,
        a:`- Blob Storage lifecycle management helps automate the transition of blobs to
appropriate access tiers or deletion based on specified policies.<br>
● Define Rules: Set up rules that specify conditions (e.g., age of the blob) and actions
(e.g., move to Cool tier or delete).<br>
● Apply Policies: Implement these rules at the storage account level to manage the
lifecycle of your data efficiently.
`,
        children:[]
    }
],
},
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
{
    q:`How would you implement data security in Azure Blob
Storage?`,
answer:`● Enable Server-Side Encryption (SSE): Azure automatically encrypts data at
rest using 256-bit AES encryptio and use
HTTPS for data in transit.<br>
● Access Control: Utilize Azure Active Directory (AAD) for role-based access control
(RBAC) and Shared Access Signatures (SAS) for Temporary access.
`,
children:[],
},
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
{
    q:  `Describe a strategy to implement fine-grained access control for multiple applications accessing sensitive data stored in Azure Blob Storage.`,
    answer:`●I would implement fine-grained access control using a combination of Microsoft Entra ID (Azure AD), Azure RBAC, and SAS tokens.
<br>
● First, I would authenticate applications using Microsoft Entra ID and assign Azure RBAC roles based on the principle of least privilege. If different applications require different levels of access, I can assign appropriate roles such as Storage Blob Data Reader or Storage Blob Data Contributor.
<br>
●For temporary or external access to specific blobs or containers, I would use SAS tokens with limited permissions and expiry times. I can also restrict access by IP address if required.
<br>
● This approach ensures secure, granular, and controlled access to sensitive data while minimizing security risks."`,
children:[],
},

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
{
  cat:`CI-CD`,
  q:`What happens when you run <code>git push origin feature2</code> for the first time? -- new branch`,
  answer:`Git uploads the local commits and objects to the remote repository. If the remote branch does not exist, GitHub creates it. After the push, GitHub typically suggests creating a Pull Request so the feature branch can be reviewed and merged into the target branch, such as main.`,
  children:[
    {
      q:`github vs databricks`,
      a:`In a local Git environment such as VS Code(using github), creating a branch and committing changes are local operations. The remote repository is updated only after executing <code>git push origin main</code>. <br>In Databricks Repos, branch creation is integrated with the remote Git provider, so creating a branch through the Databricks UI typically creates the corresponding remote branch automatically. However, code changes and commits are not automatically reflected in the remote repository; they still need to be committed and synchronized (pushed) through the Databricks Git integration.`,
      children:[], 
    },
  ],

},
]
