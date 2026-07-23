const cats = ["Self Introduction", "Project Ownership", "Production Support & Incident Handling", "Design Decisions", "Collaboration & Teamwork", "Behavioral", "Stakeholder Management", "HR, Career & Company Fit"];
const qs = [
  {
    cat: `Self Introduction`,
    q: `Tell me about yourself <span style="color:green;"><b>Q25</b></span>`,
    answer: `
    <p><strong> Thank you for the opportunity.</strong></p>

<p>
My name is <strong>Prathap Gorantla</strong>, and I have around <strong>3 years of experience</strong> as a Data Engineer at <strong>Tata Consultancy Services</strong>.
</p>
<p>
Currently, I'm working on a <strong>US healthcare project</strong> where we built a centralized data platform on <strong>Azure Databricks</strong> using the <strong>Medallion architecture</strong>. My primary responsibility is developing and maintaining batch ETL pipelines using <strong>PySpark</strong> and <strong>SQL</strong>. I work on ingesting data from PostgreSQL databases and file-based sources, transforming it across the <strong>Bronze, Silver, and Gold</strong> layers, and delivering curated datasets for downstream analytics.
</p>
<br>
<p>
As part of my work, I've implemented <strong>incremental data processing</strong> using watermark-based ingestion, <strong>Delta Lake MERGE</strong> operations, and <strong>SCD Type 2</strong> for dimension tables. I've also optimized Spark workloads using techniques like <strong>partitioning, broadcast joins, caching</strong>, and Delta optimizations such as <strong>OPTIMIZE, Z-ORDER, and VACUUM</strong>, which reduced a critical pipeline's runtime by around <strong>40–45%</strong>.
</p>
<br>
<p>
I also collaborate closely with <strong>BI, analytics teams</strong> to ensure reliable and timely data delivery. Along the way, I've earned both the <strong>Databricks Data Engineer Associate</strong> and <strong>Professional</strong> certifications, which strengthened my understanding of Spark and Delta Lake.
</p>

<p>
 I'm now looking for an opportunity to work on more challenging projects, gain exposure to different business domains and broaden my technical exposure.</p>
    
    `,
    children: [
      {
        q: ` Walk me through your career journey`,
        a: `I completed my graduation in 2023 and joined TCS as a Fresher. Over the past three years, I've worked on Azure-based data engineering projects using Databricks, PySpark, SQL. <br> Currently, I'm part of a US healthcare project where I develop and enhance batch ETL pipelines, implement incremental data ingestion, and build data transformations using the Medallion architecture.`,
        children: [],
      },
      {
        q: `what is your current role and responsibilities? <span style="color:green;"><b>Q25</b></span>`,
        a: `I am currently working as a Data Engineer in a US healthcare project. <br> In my current project, I'm responsible for developing and maintaining batch ETL pipelines on Azure Databricks. <br> I work across the full Medallion architecture — ingesting data from on-premises PostgreSQL and file-based sources like eligibility and claims files, applying transformations through Bronze, Silver, and Gold layers.implementing water mark based incremental ingetion , applying data transformations and data quality validations, optimizing Spark workloads. <br> I collaborate with BI, analytics teams to understand downstream data requirements and ensure that our pipelines deliver reliable datasets `,
        children: [],
      },
      {
        q: `how do you ensure reliability and quality of data in your pipelines?`,
        a: `We ensure reliability by using incremental processing to avoid reprocessing data, Delta Lake transactions for consistent writes, and Databricks Workflows to monitor pipeline execution and retry failed jobs where applicable. 
      <br>For data quality, in the Silver layer we perform null schema validations ,null checks, data type standardization, deduplication using window functions.  <br>In the Gold layer, we perform business validations rather than technical validations. For example, we ensure every claim has valid patient and provider records, verify ICD/CPT codes against reference data, check patient eligibility on the service date, and validate that claim amounts paid  does not exceed the allowed amount as per the fee schedule brfore reporting reporting. (SEE Domain Gold data quality validations) <br>
before the data is made available for downstream consumption.`,
        children: [
          {
            q: `does reconciliation  done in your pipelines?`,
            a: `We don't have a dedicated reconciliation framework in our current project. Instead, we ensure data correctness through data quality validations in the Silver layer, such as null checks, data type standardization, deduplication, and business rule validations. <br> We also monitor pipeline execution and verify that the data has been processed successfully before it's made available to downstream consumers.`,
            children: [],
          },
          {
            q: `when reconciliation is typically used and how`,
            a: `Reconciliation is commonly used in critical domains like finance, banking  where it's essential to prove that all source records have been loaded correctly. <br> It typically involves comparing source and target record counts, business metrics to ensure data completeness and accuracy.
      <br> we perform source-to-target reconciliation by comparing the number of records extracted from the source with the records successfully loaded, accounting for any rejected or duplicate records. This validation is done before marking the pipeline as successful.
<br> we can use DL Operation metrics for calculating the no.of records processed .Delta Lake records operation metrics in the transaction log. We can view them using <code>DESCRIBE HISTORY ustechcentral.datahub.hrmm</code>, which provides metrics like numTargetRowsInserted, numTargetRowsUpdated, and numTargetRowsDeleted. These metrics help us verify that the expected records were processed,

      <pre><code class="language-python">latest = spark.sql("describe history workspace.silver.orders limit 1")
latest = latest.withColumn("Inserted", col("operationMetrics.numTargetRowsInserted"))
\
.withColumn("updated", col("operationMetrics.numTargetRowsUpdated"))
 \
.withColumn("deleted", col("operationMetrics.numTargetRowsDeleted"))

updated=latest.collect()[1]["updated"]
print("updated count:" ,updated)
</code></pre>
      `,
            children: [

            ],
          },

          ////

        ],

      },
      {
        q: `What are your day-to-day responsibilities? <span style="color:green;"><b>Q25</b></span>`,
        a: `<ul><li>My day starts with a standup — each team member shares what they completed yesterday, what they're working on today, and any blockers..</li>
        <li>Most of my time goes into developing or enhancing ETL pipelines in PySpark and SQL —  implementing water mark based incremental ingetion , applying data transformations and data quality validations, optimizing Spark workloads. I collaborate with BI, analytics teams to understand downstream data requirements and ensure that our pipelines deliver reliable datasets</li>
        <li>I also work with BI and business teams to clarify requirements, and support code reviews and deployments as part of our sprint activities.</li>`,
        children: [
          {
            q: `what you discuss in your daily standups?`,
            a: `During our daily stand-up, each team member gives a quick update on the work completed the previous day, the tasks planned for the current day, and any blockers. <br>We discuss the status of ongoing user stories, production issues if any pipelines failed, upcoming deployments, and dependencies on other teams like QA or BI. <br>If a discussion requires more detail, we usually take it offline after the stand-up so the meeting stays brief.`,
            children: [],
          }
        ],
      },
      {
        q: `What technologies do you work with?`,
        a: `My primary technologies are Azure Databricks, PySpark, SQL, Delta Lake, ADLS Gen2, and Git. I also work with Databricks Workflows for orchestration and Unity Catalog for data governance.`,
        children: [],
      },
      {
        q: `What is your primary area of expertise?`,
        a: `My primary expertise is building and optimizing batch ETL pipelines using PySpark and Azure Databricks. <br> I have hands-on experience with incremental data processing, Delta Lake, Spark optimization, Medallion architecture`,
        children: [],
      },
      {
        q: `what do you like most about your current role?`,
        a: `What I enjoy most is building and optimizing ETL pipelines—taking a business requirement and translating it into an efficient and scalable PySpark solution.<br> implementing data transformations and continuously improving pipeline performance whenever opportunities arise. <br>It's rewarding to see the data I work on deliver clean, reliable information that supports reporting and analytics for business users `,
        children: [],
      },
      {
        q: `What motivates you?`,
        a: ` "I enjoy solving technical problems, optimizing data pipelines, and learning new technologies. Seeing a solution successfully deployed and used by downstream teams is very motivating." `,
        children: [],
      },
      {
        q: `hobbies`,
        a: `
        My hobbies include playing badminton , table tennis with friends.From last few months i started going to the gym regularly. It helps me stay disciplined and maintain a healthy routine.<br>

        `,
        children: [],
      },
      {
        q: `Do you have any other concerns? / questions`,
        a: `Yes, thank you. Could you tell me a bit about the team I'll be working with and the kind of projects they're currently handling? Also, what would you expect from someone in this role during the first few months?`,
        children: [],
      },



      ////
    ],

  },////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  {
    cat: `Project Ownership`,
    q: `Ownership of the projects`,
    answer: ``,
    children: [
      {
        q: `What exactly is your role in the project?`,
        a: `I work as a Data Engineer on a US healthcare project. My role involves developing, enhancing, and maintaining batch ETL pipelines on Azure Databricks, implementing data transformations, optimizing Spark workloads, and collaborating with downstream consumers, and other developers to deliver reliable data for downstream reporting and analytics `,
        children: [],
      },
      {
        q: `which part of project do you own`,
        a: ` The work in our project is divided functionally, and I primarily work on the claims area. <br>I take end-to-end ownership of the claims-related processing—from implementing transformation logic and testing to deployment and troubleshooting. while collaborating with the rest of the team on the overall platform. `,
        children: [{
          q: `DO you own any pipeline`,
          a: `Our project has pipelines across Bronze, Silver, and Gold. Work is divided functionally rather than by individual pipelines — I own the claims domain within Silver and Gold. So rather than counting pipelines, I'd say I manage the end-to-end data flow for the claims domain.`,
          children: [],
        },],
      },
      {
        q: `What does ownership mean to you?`,
        a: ` 
        To me, ownership means taking responsibility for a task from start to finish. It includes understanding the requirement, delivering a well-tested solution, communicating risks early, and staying accountable until the issue is fully resolved. I ensure the outcome is reliable and meets the expected quality."
        `,
        children: [],
      },
      {
        q: `How do you balance speed and quality?`,
        a: ` "I balance speed and quality by focusing on the core requirement first, then validating it properly before moving on.<br>
         I avoid over-engineering early, but I never skip  data validation to save time <br> 
        The one place I don't compromise is validation — skipping data checks to save time always costs more time later when bad data reaches downstream.
        `,
        children: [],
      },
      {
        q: `Describe a time you took ownership./ Tell me about a decision you made independently.`,
        a: ` One example was when one of our daily pipeline executions started taking significantly longer than usual as data volume increased. <br>
        Although it wasn't assigned specifically to me, I investigated the issue using the Spark UI and execution plan. I identified inefficient joins and full table scans during merge operations. So (.... 40-45 %optimization )`,
        children: [],
      },
      {
        q: `If you become a Lead in the future, what would your priorities be?`,
        a: ` "If I become a Lead, my priorities would be to ensure the team delivers quality work on time, remove blockers quickly, and create an environment where everyone can perform effectively.<br> I'd focus on clear communication with stakeholders, maintaining high coding and data quality standards, and helping team members grow by sharing knowledge and providing guidance `,
        children: [],
      },
      {
        q: `How do you make technical decisions?`,
        a: ` I first understand the business requirement, then evaluate different approaches based on correctness, performance, maintainability, and project standards. If the impact is significant, I discuss the options with my lead before implementation.`,
        children: [],
      },
      {
        q: `How do you ensure quality before deployment?`,
        a: ` "Before deployment, I ensure the code meets both functional and quality standards. I perform unit testing, validate source-to-target data counts, null handling, duplicates, and business rules. <br>I also test edge cases, verify pipeline execution, and ensure existing functionality isn't impacted. <br> Finally, I raise a pull request, address code review comments, and once the changes are cross-tested and approved, they are deployed through our CI/CD pipeline.`,
        children: [],
      },
      {
        q: `How do you handle ownership?`,
        a: ` I take ownership by understanding the requirement, delivering a well-tested solution, and following it through until completion. If I encounter any issues or risks, I communicate them early, work on the root cause, and ensure they're resolved."`,
        children: [],
      },
      {
        q: ` What if your lead is unavailable?`,
        a: ` 
        "If my lead is unavailable, I first try to resolve the issue independently by checking the logs, reviewing the code, and identifying the root cause.If it's within my scope, I implement the fix and document my actions<br>
For high-impact decisions, such as a rollback or schema change, I involve the next available senior team member or Scrum Master rather than making the decision alone. I keep my lead informed as soon as they're available.
        `,
        children: [],
      },

      {
        q: ` What is the most difficult business logic you've written?`,
        a: `The most complex logic I've written was SCD Type 2 MERGE for the dimension table — handling new records, updates, and expirations in a single MERGE while maintaining history. The tricky part was getting the MERGE conditions right so updates correctly expired the old version, set the end date, flipped the current flag, and inserted the new version — all atomically without gaps or overlaps in the history.`,
        children: [],
      },
      {
        q: `--- Describe a difficult bug.`,
        a: ``,
        children: [],
      },
      {
        q: ` --- What happens after your work is completed?`,
        a: `Once the Gold layer is refreshed, the curated data becomes available for downstream consumers such as finance, operations, BI, and data science teams.
<br>
The BI team builds dashboards and KPIs on top of the Gold tables, while our responsibility is ensuring the underlying data platform remains accurate, reliable, and availabl`,
        children: [],
      },
      {
        q: `Which part of the project would stop if you were on leave?`,
        a: `The project wouldn't stop because we maintain proper documentation, code reviews, and knowledge sharing. <br>However, my teammates would probably need some support for claims-related enhancements and production issues since that's the functional area I primarily work on. <br>The team can still continue the work, but I usually help with troubleshooting and implementing business changes in that area.`,
        children: [],
      },
      {
        q: `Which pipeline are you most confident about?`,
        a: ` I'm most confident with the claims processing part, especially the Silver and Gold transformations.<br> I've worked on implementing business rules, incremental processing, data quality validations, performance improvements for that area. Because I've handled multiple enhancements and production issues there, I understand both the technical implementation and the business logic quite well.`,
        children: [],
      },
      {
        q: ` If I joined your team tomorrow, what work would you assign me first?`,
        a: ` I'd start with a relatively low-risk enhancement or support task. First, I'd walk you through the project architecture, Medallion layers, metadata framework, and deployment process. 
        <br> Then I'd assign a small enhancement or bug fix  so you can understand the codebase, data flow, and business rules. Once you're comfortable with the pipeline and development process, I'd gradually assign larger features 
        `,
        children: [],
      },
      {
        q: `How do you validate data in your project? / what DQ checks are performed <span style="color:green;"><b>Q25</b></span>`,
        a: ` 
        Data validation is critical because inaccurate data directly impacts downstream analytics. So i validate data quality in each step:
        <ul>
        <li> For incremental pipelines, I verify that only new or updated records are processed based on watermark logic, with no historical records missed. </li>
        <li><b>IN bronze</b> I perform source-to-target reconciliation by comparing record counts between the source and the target datasets to ensure that all expected records have been processed. </li>
        <li><b>in Silver</b> we check for mandatory columns, null values in critical fields, duplicate records, datatype consistency </li>
        <li><b>In gold</b> our focus shifts to business validations. We ensure every claim is linked to a valid patient and provider , verify procedures , diagnoses against the reference icd, cpt-10 datasets, check that the patient's service date falls within the eligibility period, </li>
        <li> Records failing critical validations are written to an exception table with the failure reason. The issue is then analyzed to determine whether it's a source data problem or an ETL issue. After the necessary corrections and reprocessing, only validated data is made available for downstream reporting and analytics. </li>
        </ul>

        <table border="1" cellspacing="0" cellpadding="8">
    <thead>
        <tr>
            <th>Validation</th>
            <th>How It's Implemented</th>
            <th>If Validation Fails</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Patient Validation</strong></td>
            <td>
                Join <code>Claims</code> with <code>dim_patient</code> using
                <code>patient_id</code> to ensure every claim is associated with a valid patient.
            </td>
            <td>
                If no matching patient is found, the record is written to the
                <strong>Exception Table</strong> with the validation reason.
            </td>
        </tr>

        <tr>
            <td><strong>Provider Validation</strong></td>
            <td>
                Join <code>Claims</code> with <code>dim_provider</code> using
                <code>provider_id</code> to verify that every claim has a valid provider.
            </td>
            <td>
                Unmatched records are written to the
                <strong>Exception Table</strong>.
            </td>
        </tr>

        <tr>
            <td><strong>ICD Validation</strong></td>
            <td>
                Validate the diagnosis code by joining it with the
                <code>dim_icd</code> reference table.
            </td>
            <td>
                Invalid or unmapped ICD codes are written to the
                <strong>Exception Table</strong>.
            </td>
        </tr>

        <tr>
            <td><strong>CPT Validation</strong></td>
            <td>
                Validate the procedure code by joining it with the
                <code>dim_cpt</code> reference table.
            </td>
            <td>
                Invalid or unmapped CPT codes are written to the
                <strong>Exception Table</strong>.
            </td>
        </tr>

        <tr>
            <td><strong>Eligibility Validation</strong></td>
            <td>
                Join the Claims data with the <code>Eligibility</code> dataset using
                <code>patient_id</code> and verify that the
                <code>service_date</code> falls between
                <code>effective_date</code> and
                <code>termination_date</code>.
            </td>
            <td>
                Claims outside the coverage period are flagged and written to the
                <strong>Exception Table</strong>.
            </td>
        </tr>

    </tbody>
</table>
        `,
        children: [],
      }
    ],

  },////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  {
    cat: `Production Support & Incident Handling`,
    q: `Support and INC handling`,
    answer: ``,
    children: [
      {
        q: ` Your role in production issues / Do you have production support responsibilities? / What happens if prod job failed / First thing you do if a job fails? / howdo you investigate`,
        a: `our project has a dedicated Operations team that performs first-level monitoring of production jobs.<br>
        When a pipeline fails, the Operations team receives the failure alert and performs the initial investigation to determine whether it's an infrastructure, scheduling, or application issue.<br>If they identify a pipeline failure caused by application logic or data issues, they raise a ticket to our development team.<br> Then i will review the failed task logs in Databricks Workflow, understand the exception, and classify it — whether it's a source issue, Spark exception, schema change, or data quality problem. Then I fix the root cause and validate it in the appropriate environment, and support the deployment. After deployment, the Ops team reruns the pipeline and confirms successful execution.`,
        children: [],
      },
      {
        q: `What would you do if production failed after deployment?`,
        a: `
        The first priority is to understand the impact and restore service safely. If it's severe and impactig downstreams, initiate a rollback immediately using the previous deployment. <br>
I would review the job logs, Spark logs, and error messages to identify the root cause. <br> Once service is restored, I would perform root cause analysis, fix the issue in a lower environment, validate the solution thoroughly, and redeploy through the normal release process.
<br> Finally, I'd document the RCA and identify preventive measures, such as adding additional validations or automated tests, to reduce the chance of similar issues in the future.
        `,
        children: [
          {
            q: `How roll back is done`,
            a: ` Our CI/CD pipeline stores build artifacts. If a release fails or causes production issues, the release team can redeploy the previous successful artifact instead of the latest one. <br> This quickly restores the application to a stable state while we investigate the issue. <br> The Ops team handled the production deployment and rollback activities. My responsibility was to analyze the issue, identify the root cause, prepare the fix, test it in the lower environments, and hand it over for the next deployment."`,
            children: [],
          }
        ],
      },
      {
        q: `What production issue took the longest to resolve / Tell me about a production issue you resolved.? <span style="color:green;"><b>Q25</b></span>`,
        a: `(One production issue that took the longest to resolve involved a)/Once there is a  sudden increase in rejected procedures during the Silver processing. Our pipeline itself was healthy, but many records started failing validation. We investigated the rejected records and found that the upstream application had started sending an unexpected value in one of the business-critical columns, which violated our validation rules. We coordinated with the upstream team to confirm the change, assessed its business impact, updated the transformation and validation logic after approval, reprocessed the affected data, and verified the downstream reports.`,
        children: [],
      },
    ],

  },////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  {
    cat: `Design Decisions`,
    q: `Design Decisions`,
    answer: ``,
    children: [
      {
        q: `If you could redesign the project today, what would you improve?`,
        a: ` <li>I would consider using Delta for the Bronze layer as well to benefit from schema enforcement and easier reprocessing</li>
    <li>I would also evaluate Auto Loader for file ingestion to simplify handling of new files and schema evolution. Apart from these improvements, the current architecture has been stable and scalable for our workload </li> `,
        children: [
          {
            q: `If Delta Bronze and Auto Loader are better, why didn't you implement them?`,
            a: `
        <li>Those are good improvements, but every design decision depends on the project requirements.</li>
        <li>In our project, Bronze was only a raw landing layer where we stored immutable source data without any updates or deletes. Since we didn't need ACID transactions or MERGE operations at that stage, Parquet was sufficient and kept storage and processing lightweight.</li>
        <li>Similarly, our file sources were delivered on a fixed schedule—typically one file per day—so a scheduled batch ingestion met the business requirement. Auto Loader is more beneficial when you're continuously receiving large numbers of files or dealing with frequent schema evolution. Given our volume and delivery pattern, the additional complexity wasn't justified </li>   
        `,
            children: [
              {
                q: `Would you still keep the same design?`,
                a: `Yes. Based on our project's requirements, I think the design was appropriate. If the business later started receiving files continuously or required stronger schema governance in the raw layer, then I'd evaluate moving Bronze to Delta and using Auto Loader.<br> Architecture should evolve with changing requirements rather than adopting every available feature from the start." `,
                children: [],
              },
            ],
          },
        ],
      },
      {
        q: `What factors do you consider while developing a data pipeline? / What do you know about good data engineering design principles?`,
        a: ` 
    <p>
There are a few key factors I consider while designing a data pipeline.
</p>

<ul>
    <li><b>Business Requirement</b><br>
    I first understand the business objective, expected outputs, refresh frequency, and SLA so the pipeline is designed to meet business needs.</li>

    <li>
        <b style="color:#D32F2F;">Data Volume & Frequency</b> First I understand how much data is coming in and how often. This will help deciding cluster sizing, and decision to go with batch processing or streaming
        
    </li>

    <li>
        <b style="color:#D32F2F;">Source System Characteristics</b> I identify the source type — whether it's a database, files, or an API — whether we need full or incremental loads, and how schema changes will be handled.
       
    </li>

    <li>
        <b style="color:#D32F2F;"> Data Quality</b>
        <ul>
            <li> building DQ checks at each layer so bad data doesn't propagate downstream.</li>
            <li>in my pipeline, we handle nulls, duplicates, and schema mismatches in the Silver layer before anything hits Gold..</li>
        </ul>
    </li>

    <li>
        <b style="color:#D32F2F;">Performance & Scalability</b>
    For small reference datasets like provider roster and fee schedule, I used broadcast joins to avoid large shuffle operations . I also scheduled <b>OPTIMIZE</b> with <b>Z-ORDER</b> on frequently queried Delta tables to reduce small files and improve data skipping.
    </li>

    <li>
        <b style="color:#D32F2F;">Reliability</b>
        I build pipelines to be idempotent, include proper logging and exception handling, and ensure rerunning a failed job doesn't create duplicate data.
        
    </li>
     <li>
        <b style="color:#D32F2F;" >Maintainability</b>We follow a modular approach — each transformation is a separate function, making it easy to unit test and reuse across layer          
        
    </li>

    <li>
        <b style="color:#D32F2F;">Security & Governance</b>
            In healthcare, PHI protection is critical — we use Unity Catalog with column masking on sensitive fields like SSN, address, and enforce RBAC at the catalog level            
    </li>

   
</ul>
    `,
        children: [],
      },
     
    ],

  },////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  {
    cat: `Behavioral`,
    q: `Behavioral`,
    answer: ``,
    children: [
      {
        q: `<span style="color:green;"> <b>STress / Presure / deadline / Tight deadline / missed deadline</b></span>  `,
        a: ``,
        children: [
          {
            q: `how do you handle stress / presure / handle tight deadline <span style="color:green;"><b>Q25</b></span>`,
            a: ` "I handle stress / handle tight deadline by staying organized and breaking the work into smaller, manageable tasks rather than looking at it as one large problem.  That helps me identify the actual blocker instead of feeling overwhelmed. <br> I focus on one task at a time rather than multitasking under presure. If I see a risk of missing a deadline, I communicate it early with my lead so we can reprioritize or get support if needed. And if I'm stuck on a problem, I take a short break and come back with a fresh perspective, which often helps me solve it faster. 
        `,
            children: [],
          },
          {
            q: `Tell me about a time you missed a deadline.`,
            a: `Fortunately, I haven't missed any major project deadlines. However, there was one instance where I had to delay my originally assigned development task because the source team introduced changes to one of our incoming reference files just before a planned release.<br> Since the new requirement was business-critical, I discussed the priorities with my lead, temporarily paused my current task, updated the ingestion and transformation logic and got it reviewed and deployed before the release and delivered the urgent change on time.
        <br> Once it was completed, I resumed my original task. By planning and prioritizing my work, and communicating proactively with my lead, we delivered the change on time without affecting the overall sprint. <br> The experience taught me the importance of communicating  early and reprioritizing work when business needs change
        `, children: [],
          },
          {
            q: `Tell me about a tight deadline you worked`,
            a: ` 
        One tight deadline I handled was when the source team introduced changes to one of our incoming reference files just before a planned release. <br> The changes would affect our ingestion and downstream transformations. At the same time, I was already working on another development task.
        <br> I discussed the priorities with my lead, temporarily deprioritized my current task, updated the ingestion and transformation logic, completed  data validation, and got it reviewed and deployed before the release. <br> Once it was completed, I resumed my original task. By planning and prioritizing my work, and communicating proactively with my lead, we delivered the change on time without affecting the overall sprint. <br> The experience taught me the importance of communicating  early and reprioritizing work when business needs change
        `,
            children: [
              {
                q: `What changes were made to the file?"`,
                a: ` The source team added a few new fields and updated some existing column names. I updated the mapping and downstream transformation logic to ensure the new schema was processed correctly without affecting existing business rules `,
                children: [],
              }
            ],
          },
          {
            q: `How do you communicate if you cannot meet an SLA?
`,
            a: ` 
        If I know we're at risk of missing an SLA, I communicate it as early as possible rather than waiting until the deadline. I explain the issue, its impact, what i am doing to resolve it, and provide an estimated timeline if it's available.
        If I need help, I discuss it with my teammates, share the tasks. <br>
        I never wait until the last minute hoping it resolves itself — early communication gives the team and stakeholders time to react and manage expectations on their side."`,
            children: [],
          },

        ],
      },
      {
        q: `<span style="color:green;"> <b>challenges,mistakes , learning,ownership,improvements</b></span>  `,
        a: ``,
        children: [
          {
            q: `Tell me about a time you learned something quickly`,
            a: `"Early in the project, I was asked to ingest data from an Excel file into the pipeline. My first instinct was to use Spark's native reader — I wrote the code, ran it, and it failed. <br> That's when I realized Spark doesn't natively support Excel in older Databricks runtimes — native Excel reading was only introduced in DBR 16.2. We were on 14.3 LTS at the time. <br> researched the error, found that we needed the com.crealytics spark-excel library, figured out how to add it as a Maven dependency in the Databricks cluster, and got the ingestion working. <br> Small thing, but it taught me to always check runtime compatibility and library support before assuming something works natively."
        `,
            children: [],
          },
          {
            q: `Tell me about a mistake you made and how you handled it.<span style="color:green;"><b>Q25</b></span>`,
            a: `
        Early in the project, while developing a Silver layer transformation, I used a hardcoded date filter for testing and accidentally forgot to remove it.
        <br> During integration testing, a teammate noticed the record count was lower than expected. I identified the issue, removed the filter, reran the pipeline, and validated the output <br>
        Although it only delayed testing by a few hours, it taught me to always perform a final code review. Since then, I follow a checklist before every PR to remove test code, verify filters, and validate record counts.
        `,
            children: [],
          },
          {
            q: `what is biggest challenging part of your projct? <span style="color:green;"><b>Q25</b></span>`,
            a: `The most challenging part is ensuring reliable incremental processing while maintaining data quality --  processing only new or changed records without duplicates or missing data, while handling schema changes, late-arriving files, and production failures, all with downstream reporting depending on it<br>
        To handle this we use Delta Lake's MERGE for upserts, watermark-based incremental loads to track what's been processed, and data quality checks at the Silver layer before anything reaches Gold. For schema changes ,We follow a fixed schema contract — if an unexpected schema change comes in, the pipeline fails fast. Any intentional change goes through a CR process and is updated before deployment.  <br>
        And another major challenge was Gold layer performance as the volume grows .....(project prep content )
        `,
            children: [],
          },
          {
            q: `Tell me about a challenging situation you handled. <span style="color:green;"><b>Q25</b></span>`,
            a: ` One challenging situation was when one of our daily Databricks pipelines started taking much longer to complete as data volume increased. <br>
        Since it was impacting the downstream reporting schedule, I investigated the issue using the Spark UI and execution plan. I found 3 things: (45 % optimization)`,
            children: [],
          },
          {
            q: ` Tell me about a time you improved performance.`,
            a: ` The major performance improvement done by me is Reducing the long running Gold layer pipeline runtime by 40–45% through Spark and Delta Lake optimizations — broadcast hints for small reference tables, OPTIMIZE for file compaction, and Z-ORDER to improve MERGE performance `,
            children: [],
          },
          {
            q: `How do you keep yourself updated with new technologies? <span style="color:green;"><b>Q25</b></span> `,
            a: ` Since data engineering technologies evolve quickly:
        <br> I stay updated through Databricks release notes, official docs, and blogs. One thing I track closely is runtime versions — currently DBR 17.3 LTS is the stable production runtime based on Spark 4.0, DBR 18 runs on Spark 4.1, and DBR 19 Beta is on Spark 4.2. In production, most teams stick with LTS for stability and evaluate newer runtimes in lower environments first. <br>
       <br> Completing the Databricks Data Engineer Associate and Professional certifications also helped me strengthen my understanding of Spark and Delta Lake beyond my day-to-day project work.
                `,
            children: [
              {
                q: `whats new features/ news`,
                a: ` One feature I found interesting in Spark 4.0 is the VARIANT data type — it simplifies working with semi-structured JSON. Earlier we had to use from_json() with a predefined schema, but now nested fields can be accessed directly without explicit parsing. 
        <br>DBR 18 also introduced Real-Time Mode for Structured Streaming, enabling millisecond-latency workloads.
      <pre><code class="language-python">df = df.withColumn("patient", from_json("json_col", schema))
                      df.select(col("patient.name"), col("patient.age")).show()
                      ##new
                      df.select(col("patient")["name"], col("patient")["age"]).show()
              </code></pre>`
                ,
                children: [],
              },
              {
                q: `whats dbr`,
                a: ` Databricks Runtime (DBR) is the optimized execution environment provided by Databricks. It includes Apache Spark plus Databricks-specific enhancements like Delta Lake, Photon, Unity Catalog integration, security patches, and performance optimizations.`,
                children: [],
              },
              {
                q: `Difference between Databricks Runtime (DBR) versions`,
                a: `Each new DBR version bundles a newer Spark version along with improvements in performance, security, bug fixes, Delta Lake, ML libraries, and new Databricks features. Upgrading gives access to new capabilities while maintaining compatibility. `,
                children: [],
              }
            ],
          },
          {
            q: `handle multiple tasks / prioritize multiple tasks`,
            a: `
        I first identify production issues, since they have the highest business impact. Next, I work on committed development tasks and then lower-priority enhancements. If priorities change, I confirm them with my lead before adjusting my plan.
        `,
            children: [],
          },



        ],

      },
      {
        q: `What would you do if you didn't know how to solve a problem?`,
        a: ` "I first try to understand the problem by reviewing the code, and documentation. If I can't resolve it within a reasonable time, I discuss it with my Team Lead or an experienced teammate, implement the solution, and make sure I understand the root cause so I can handle similar issues independently in the future.`,
        children: [],
      },
      {
        q: `<span style="color:green;"> <b>critisism , failure, feedback</b></span>  `,
        a: ``,
        children: [
          {
            q: `How do you handle criticism`,
            a: ` "I see constructive criticism as an opportunity to improve. Whenever I receive feedback, I first try to understand the reason behind it instead of becoming defensive. <br> 
        For example, during a code review, I received feedback that one of my join logic could be simplified(joined all at once) and made more readable. I discussed the suggestions with the reviewer, updated the implementation, and adopted those coding practices in my future developments.
<br>
I believe good feedback improves both code quality and professional growth."
        `,
            children: [],
          },
          {
            q: `difficult feedback`,
            a: ` During a code review, I received feedback that my join implementation could be simplified and made more maintainable. I discussed the suggestions with the reviewer, updated the code, and adopted those practices in later tasks." `,
            children: [],
          },
          {
            q: ` Tell me about a failure.`,
            a: `Early in the project, I developed a transformation that worked correctly but took much longer than expected with production-sized data. 
        <br> I analyzed the Spark UI and found that the same DataFrame was being reused across multiple transformations, causing it to be recomputed repeatedly.
        <br> cached that DataFrame, which significantly reduced the runtime. That experience taught me that validating functionality alone isn't enough—I also need to evaluate performance and scalability before considering a task complete.`,
            children: [],
          },
          {
            q: `
How do you recover from failure?`,
            a: `
        I recover from failure by first accepting it, understanding the root cause, and focusing on the solution rather than the mistake.<br>

If I need help, I discuss it with my teammates, fix the issue, and validate the solution thoroughly and document any key learnings to avoid repeating the same mistake. <br> I see failures as opportunities to improve, and I make sure I come back with a better approach the next time.
        `,
            children: [],
          },
        ],
      },

      {
        q: `Suppose another team is blocking your work. How do you handle it? conflicts <span style="color:green;"><b>Q25</b></span>`,
        a: `I first try to understand the reason for the dependency by discussing it directly with the concerned team. <br> If the blocker can't be removed immediately, I continue with independent work like developing transformations, testing with sample data, or preparing the remaining pipeline so my work doesn't stop. <br>  If it's impacting timelines and can't be resolved between teams, I escalate to my lead with clear context — what's blocked, the impact, and what I've already tried. I always come with a suggestion, not just the problem.`,
        children: [
          {
            q: `common blockers`,
            a: ` Waiting for business clarification from the BA. <br>
Waiting for PR/code review approval. <br>
Waiting for an upstream pipeline or source data. <br>
Waiting for UAT/business validation.`,
            children: [],
          },
        ],
      },

      {
        q: `Where do you see yourself in the next 3 years and 5 years? <span style="color:green;"><b>Q25</b></span>`,
        a: ` 
In three years I see myself in a senior data engineer  — owning end-to-end architecture decisions, mentoring junior engineers, and working on larger-scale engagements<br>
"In five years I'd like to move into a solution architect — driving data strategy for clients, evaluating and recommending the right technologies, and contributing beyond just implementation        `,
        children: [],
      },
      {
        q: ` Are you okay working in different time zones? <span style="color:green;"><b>Q25</b></span>`,
        a: ` Absolutely — I already work with a US-based healthcare client, so overlap hours are part of my routine. I'm comfortable adjusting my schedule based on project needs.`,
        children: [],
      },
      {
        q: `Have you read the Job Description? <span style="color:green;"><b>Q25</b></span>`,
        a: ` Yes, I went through it carefully. The role aligns well with my stack — Azure Databricks, PySpark, Delta Lake — and what excites me is the opportunity to work on more complex, large-scale engagements with greater architectural ownership, which is exactly what I'm looking for at this stage."  `,
        children: [],
      },
      {
        q: `--- How do you prioritize your work? <span style="color:green;"><b>Q25</b></span>`,
        a: `
        I prioritize my work based on business impact, production urgency, and sprint commitments. Production issues or any task impacting downstream processes always come first, followed by sprint stories, and then enhancement or low-priority tasks.
<br>
At the start of the day, I review my assigned tasks and any dependencies, such as pending code reviews, business clarifications, or upstream data availability. If I identify a blocker or multiple urgent tasks, I discuss them with my lead during the daily stand-up to align on priorities. I also try to complete complex tasks earlier in the day when my focus is highest.
        `,
        children: [],

      },
      {
        q: `If I call your previous manager, what would they say about you? <span style="color:green;"><b>Q25</b></span>`,
        a: ` I believe my manager would describe me as dependable, collaborative, and someone who takes ownership of assigned work. They'd say I'm reliable — I deliver what I commit to and flag early when something is at risk.`,
        children: [],
      },
      {
        q: ` How long would you take to develop a pipeline?`,
        a: ` It depends on the complexity, business rules, source systems and testing effort. <br> A straightforward ingestion pipeline with basic transformations — I can turn that around in 2 to 3 days. <br> For more complex pipelines, like the ones I worked on in our healthcare project involving the Medallion architecture, SCD Type 2 , development typically took a few weeks including testing and UAT. <br> . I always break it into phases — design, development, testing, and deployment — and give estimates per phase so stakeholders have visibility throughout."`,
        children: [],
      },
      {
        q: `How do you estimate your work?`,
        a: ` I estimate my work by first understanding the requirement, identifying the development tasks, testing effort, and any dependencies. <br>
        I also consider code review and validation before giving an estimate. If I discover additional complexity during implementation, I communicate it early to my Scrum Master and Team Lead so expectations can be adjusted
        `,
        children: [],
      },
      {
        q: `What if you realize you'll miss a deadline?`,
        a: ` I communicate the risk as early as possible, explain the reason, provide a revised estimate, and discuss options such as reducing scope or getting additional support. Early communication helps the team plan effectively `,
        children: [],
      },
      {
        q: `--- Since how long have you been working on this project?`,
        a: ` I've been working on this healthcare project for around 1.5 years, where I've been involved in developing and enhancing multiple production data pipelines."`,
        children: [],
      },
      {
        q: ` Strengths & WEakness <span style="color:green;"><b>Q25</b></span>`,
        a: ` 
        One of my strengths is problem-solving — I prefer to analyze the root cause rather than applying a quick fix. when our Spark jobs started degrading as data volumes grew, I used Spark UI to identify inefficient joins and full table scans , and resolved it through broadcast join tuning, Z-ORDER, optimize on Delta tables — which brought runtime down by 40-45%. I also take full ownership of my work and ensure everything is thoroughly tested before deployment. <br>
        On the weakness side — I used to spend too much time perfecting an implementation before calling it done. Over time, I've learned to prioritize business value first, deliver within timelines, and then continuously improve the solution based on feedback. That approach has made me more efficient without compromising quality.
        `,
        children: [],
      },

    ],

  },////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  {
    cat: `Stakeholder Management`,
    q: `Stakeholder Management`,
    answer: ``,
    children: [
      {
        q: `Have you ever had direct interaction with the client?`,
        a: `<ul><li>I haven't been the primary point of contact for the client. Most communication happens through our Business Analyst and onshore lead. </li>
    <li>That said, I've been part of requirement clarification sessions where technical inputs were needed, so I've had exposure to those conversations.</li>
    <li> My core responsibility has been on the implementation side — building the pipeline, optimizing performance,</li>
    <li>I'm comfortable engaging with clients on technical topics and I'm actively looking to take on more client-facing responsibilities as I grow in my career.</li></ul>`,
        children: [{
          q: `Have you ever attended a client interview?`,
          a: `Yes. I attended a client interview during the project onboarding process. <br> The discussion was mainly around my technical skills, project experience, communication, and understanding of the technologies required for the project. After clearing the interview, I was onboarded to the project.`,
          children: [],
        },
        {
          q: `who conducted client interview`,
          a: `It was conducted by the client-side technical lead and project manager as part of the project onboarding process.`,
          children: [],
        },
        ],
      },
      {
        q: ` BI team says a report shows incorrect data. What do you do? / reports less or more revenue / duplicates <span style="color:green;"><b>🚨</b></span>`,
        a: `
        "First, I'd ask the BI team to be specific—which report, metrics  are incorrect, and what they expected versus what they're seeing. <br>
Since we own the data platform and they own the dashboards, I'd start by reproducing the issue using the same filters or date range the BI report uses, then query the Gold table directly and compare values <br>
If Gold is matching with expected values, I'd share my findings so they can investigate their report logic. <br>
If Gold is wrong, I'd trace backwards — Gold to Silver to Bronze — checking business transformations, joins, SCD Type 2 logic,<br>
I'd also verify that the relevant pipeline completed successfully and check whether any recent code changes could have affected the dataset. <br>
Once the root cause is identified, I'd implement or coordinate the fix, validate the corrected data, communicate the resolution to stakeholders, and document the RCA to prevent similar issues in the future
        `,
        children: [
          {
            q: `What if the pipeline completed successfully but the data is still incorrect?`,
            a: `
        A successful run doesn't guarantee correct data — it just means the job didn't fail. <br>
        I'd first validate the source data to see whether the incorrect values already existed there. Then I'd verify the transformation logic in Silver and Gold, including joins, filters, deduplication, MERGE logic, and any business rules. <br>
        Once the root cause is identified, I'd implement or coordinate the fix, validate the corrected data, communicate the resolution to stakeholders, and document the RCA to prevent similar issues in the future

        `,
            children: [],
          },
          {
            q: `What if the incorrect data has already been consumed by business users?`,
            a: ` 
        First, I'd assess the impact by identifying which datasets, reports, and business users were affected and over what time period. <br>
        I'd inform my lead and coordinate with the team so they're aware of the issue. After identifying the root cause, I'd fix the pipeline or data issue and regenerate the affected Gold data if required. <br>
                Once the root cause is identified, I'd implement or coordinate the fix, validate the corrected data, communicate the resolution to stakeholders, and document the RCA to prevent similar issues in the future

        `,
            children: [],
          },
          {
            q: `can you give an example of a data quality issue you investigated?"`,
            a: `
        I haven't personally handled a major production data quality incident yet. Most of our pipelines were stable, and our Ops team usually monitored production. <br>
        However, we did implement data quality checks like schema validation, null handling, datatype validation, and deduplication in the Silver layer. <br>
        If a data issue was escalated to our team, my approach would be to trace the data from Gold to Silver to Bronze, identify the root cause, fix it, validate the data, and document the RCA."
        `,
            children: [],
          },
        ],
      },
      {
        q: `A stakeholder says yesterday's numbers don't match today's report. / KPI suddenly drops by X % today. How do you investigate?`,
        a: `
        My first step would be to understand exactly what changed. I'd ask the stakeholder which report they're referring to, which metric doesn't match, and whether they're comparing the same reporting period and filters <br>
        Then I'd check if yesterday's pipeline ran successfully and completed within SLA. If there was a failed or delayed run, that's likely the cause. <br>
        If the pipeline ran fine, I'd query the Gold table directly for yesterday's date and compare the values. I'd also use Delta time travel to check if the Gold table data changed between yesterday and today<br>
        If the data itself hasn't changed, the issue is likely in the report filter or calculation logic on the BI side
        `,
        children: [],
      },
      {
        q: `The dashboard is showing blank values for one region. What steps would you take?`,
        a: ` I'd first determine whether the issue is limited to the dashboard or whether the missing values are already present in the Gold tables <br>
        If the Gold data contains the values, I'd inform the BI team to review their report filters or logic <br>
        If the values are missing from Gold, I'd trace the data through Silver and Bronze to identify whether the records were filtered out, failed validation, or never arrived from the source.<br>
        I'd also check the pipeline execution status and input data for that region before fixing the issue and validating the results. `,
        children: [],
      },
      {
        q: `Some records are missing from the report. How would you troubleshoot?`,
        a: `
        I'd identify a few missing records and trace them through each layer.<br>
        First, I'd check whether they exist in the Gold table. If not, I'd verify whether they were present in Silver and Bronze.<br>
        If they're missing from Bronze, I'd investigate whether the source data was received correctly or whether the ingestion job failed. <br>
        If they're present in Bronze but not in later layers, I'd review the transformation logic, joins, filters, or validation rules that may have excluded them. After fixing the issue, I'd validate the complete data flow and rerun the affected pipeline if necessary
        `,
        children: [],
      },
      {
        q: `How do you explain a production issue to a non-technical stakeholder?
`,
        a: `I keep it simple and focus on the business impact and resolution rather than the technical details <br>
        example, instead of saying, 'the Spark job failed due to executor OOM caused by partition skew,' I'd say, 'our data processing pipeline encountered an issue, which delayed yesterday's report. We've identified the root cause, we're implementing the fix, and the corrected data will be available by 2 PM <br>
        I explain what happened, how it impacts the business, what we're doing to resolve it, and when they can expect the next update. I avoid technical jargon unless they're interested in the technical details."
        `,
        children: [],
      },

    ],

  },////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  {
    cat: `Collaboration & Teamwork`,
    q: `Collaboration & Teamwork`,
    answer: ``,
    children: [
      {
        q: `have you lead a team / team leader <span style="color:green;"><b>Q25</b></span>`,
        a: ` I haven't been an official team lead, but Whenever new team members joined the project, I helped them get familiar with our Databricks environment, project architecture, data flow. <br>
        I also assisted them in understanding our healthcare datasets and answered technical questions whenever they needed support.
        <br>I'm ready to take on formal leadership responsibility in a senior role.`,
        children: [],
      },
      {
        q: `How do you deal with ambiguity? `,
        a: ` When requirements are unclear, I avoid making assumptions. I first review the available documentation, discuss the requirement with the business analyst or lead, and clarify any missing details before starting development. <br>
        If there are multiple implementation options, I evaluate them based on business requirements, performance, and maintainability, and confirm the approach with the team before proceeding.
<br>
This helps avoid rework and ensures everyone has the same understanding.`,
        children: [],
      },
      {
        q: `Have you ever helped a teammate?`,
        a: ` Yes. Whenever teammates faced issues with SQL queries, Spark transformations, or understanding an existing pipeline, I shared my approach and helped them troubleshoot. We regularly collaborated through code reviews and technical discussions.`,
        children: [],
      },
      {
        q: `SDLC & Devops`,
        a: ``,
        children: [
          {
            q: ` where do you maintain version history`,
            a: `
    We use Azure DevOps Repos with Git for version control. We create feature branches for our work, commit changes regularly, and raise Pull Requests for code review.<br> After the review and approval, the code is merged into the target branch, which gives us complete version history and traceability of every change.
    `,
            children: [],
          },
          {
            q: `What is Azure DevOps used for?`,
            a: ` Azure DevOps is an ALM (Application Lifecycle Management.) platform that helps manage the complete software development lifecycle.<br> In our project we use : <br><li> Azure Boards to manage user stories, tasks, and bugs</li><li> Azure Repos provides Git-based version control, and Azure Pipelines handles our CI/CD deployments.</li> In my role, I primarily work with Azure Repos by creating feature branches, committing code, and raising Pull Requests for review before merging into the target branch`,
            children: [],
          },
          {
            q: `Have you deployed your pipelines?`,
            a: ` Yes. We use Azure DevOps-based CI/CD pipelines for deployments. My responsibility is to raise pull requests, complete code reviews, resolve comments and support deployment activities while the release process is handled through the pipeline.`,
            children: [],
          },
          {
            q: `What is SDLC`,
            a: ` SDLC stands for Software Development Life Cycle.it is the structured process used to develop software. It consists of Planning, Analysis, Design, Development, Testing, Acceptance, and Maintenance to ensure software is delivered with quality and meets business requirements.`,
            children: [],
          },
          {
            q: `What are different software development methodologies?`,
            a: ` The common approaches are Waterfall and Agile. In modern projects, Agile is often combined with DevOps practices, where Agile manages the development process and DevOps automates building, testing, deployment, and operations through CI/CD`,
            children: [],
          },
          {
            q: `Difference between Waterfall, Agile, and DevOps?`,
            a: ` Waterfall follows a sequential approach with fixed requirements. Agile develops software in short iterations with continuous customer feedback, while DevOps extends Agile by automating build, testing, deployment, and monitoring to enable faster and more frequent releases.`,
            children: [],
          },
          {
            q: `which development methodology is used in your project`,
            a: ` We followed Agile using the Scrum framework with two-week sprints. `,
            children: [
              {
                q: `why not waterfall`,
                a: `Our requirements evolved based on business needs and data changes, so Agile allowed us to deliver pipeline enhancements incrementally and incorporate stakeholder feedback quickly. Waterfall is more suitable when requirements are fixed and changes are minimal.`,
                children: [],
              }],
          },

          {
            q: ` HOw do you track tasks <span style="color:green;"><b>Q25</b></span>`,
            a: `
        We follow Agile methodology with two-week sprints, and Azure DevOps Boards is our primary tool for tracking work.

<br>Every task starts as a User Story, Bug, or Task, where the business requirements, acceptance criteria, and priority are defined. During sprint planning, work items are estimated and assigned to team members.
<br>
In our daily stand-up, we discuss completed work, today's plan, and any blockers. I regularly update the status of my assigned work items in Azure DevOps so the team has visibility into the sprint progress.
<br>
Along with Azure DevOps, I maintain a personal task list to prioritize development, testing, code reviews, and deployment activities based on sprint priorities.
        `,
            children: [],
          },
        ],

      },
      {
        q: `How do you work with your team?`,
        a: ` 
      We followed Agile using the Scrum framework with two-week sprints, with daily stand-ups, sprint planning, reviews, and retrospectives. I discuss progress, raise blockers early, participate in code reviews, and collaborate with teammates to ensure timely delivery
        `,
        children: [],
      },
      {
        q: `How do you coordinate with your Team Lead?`,
        a: ` 
        We follow an Agile Scrum process. I coordinate with the Scrum Master during sprint planning, daily stand-ups, and backlog discussions to provide updates on my tasks, dependencies, and any blockers. <br>
        For technical decisions, requirement clarifications, and code reviews, I work closely with my Team Lead. I also communicate proactively if I foresee any risks or delays so we can address them early and keep the sprint on track.
        `,
        children: [],
      },
      {
        q: ` How do you interact with QA?`,
        a: `
        We don't have a dedicated QA team. We follow cross-testing, where another developer tests the feature before it's moved further. Before handing over my changes, I perform unit testing and data validation. <br>
        During cross-testing, if any issues are found, I analyze the root cause, fix them, and ask the team member to verify the changes. This helps us catch issues early and maintain code quality before deployment
        `,
        children: [],
      },
      {
        q: `--- Walk me through how a requirement gets delivered / end-end flow of your project (business perspective)`,
        a: `<ul><li>The flow starts with the client sharing business requirements with the Business Analyst. The BA documents the requirements and prepares user stories, which are discussed during backlog refinement and sprint planning. Based on priority, the Scrum Master and Technical Lead assign tasks to the developers.</li><li> Before starting development, we review the requirements, clarify any doubts with the BA or Technical Lead, and then begin implementation. After development, we perform unit testing and peer or cross-testing, where another developer validates the changes.</li> <li> We then raise a Pull Request in Azure DevOps for code review by the Technical Lead. Once approved, the changes are deployed through the Azure DevOps CI/CD pipeline. If any change requests come after deployment, they follow the same process </li> </ul> `,
        children: [
          {
            q: `Who tells you the requirements`,
            a: ` The Business Analyst explains the business requirements. If we need any technical clarification, we discuss it with the BA or our Technical Lead before starting development `,
            children: [],
          },
        ],
      },
      {
        q: `how many members in your team`,
        a: ` Our core development team consisted of 6 members—4 Data Engineers, including me, 1 Technical Lead, and 1 Scrum Master. We worked collaboratively during each sprint. The Technical Lead provided technical guidance and reviewed our code, while the Scrum Master facilitated sprint planning, daily stand-ups <br> 💠 <b>DOn't mention but remember:</b> Business Analyst were part of the larger project team`,
        children: [

          {
            q: ` What was your role among the 4 developers? `,
            a: ` I was one of the Data Engineers responsible for developing and maintaining data pipelines, implementing business transformations in PySpark, optimizing Spark jobs, fixing production defects, participating in code reviews, and performing testing before deployment`,
            children: [],
          },
          {
            q: `Do you have a separate QA team?`,
            a: ` No. We don't have a dedicated QA within our development team. We follow peer or cross-testing, where another developer validates the changes before deployment. This helps us catch issues early and ensures the pipeline works as expected before it's released.`,
            children: [],
          },
          {
            q: `How exactly do you test?`,
            a: ` After completing my development, another developer performs cross-testing by validating the business logic, record counts, and expected outputs. Similarly, I test other developers' changes. This peer validation, along with unit testing and code reviews, helps us maintain quality before deployment. `,
            children: [],
          },
        ],
      },
      {
        q: `How do you handle requirement changes?`,
        a: `
        I handle requirement changes by first understanding the impact on the current sprint, the upstream source, and the downstream transformations. If the change is small, I adjust the logic, retest, and move forward.<br>
        If it impacts scope or timeline, I discuss it with my Scrum Master and Team Lead, confirm the priority, and then update the plan so the team stays aligned.
        `,
        children: [],
      },
      {
        q: `--- How does the task get assigned to you?`,
        a: ` During sprint planning, user stories are discussed and estimated by the team. Based on sprint priorities, workload, and ownership, the Scrum Master or Technical Lead assigns tasks to developers. Once assigned, I analyze the requirements, estimate the effort, and begin development`,
        children: [],
      },
      {
        q: `--- Is there any daily Scrum call? Who leads that?`,
        a: `Yes. We have a daily Scrum meeting every working day, usually for about 15 minutes. It is led by the Scrum Master. During the meeting, each team member shares what they completed yesterday, what they're working on today, and whether they have any blockers`,
        children: [],
      },
      {
        q: `Do you prefer individual work or team work? <span style="color:green;"><b>Q25</b></span>`,
        a: ` 
        I'm comfortable working both independently and as part of a team <br>
        Individual work helps me focus on development tasks,debugging, while teamwork is valuable for design discussions, code reviews, knowledge sharing, and resolving issues faster as different perspectives catch gaps you'd miss alone.
        <br> In my current project, most development happens collaboratively, so I enjoy working with  team while also taking ownership of my assigned tasks`,
        children: [],
      },
      {
        q: `How do you perform code reviews?`,
        a: `
        When reviewing someone's code, I look at a few things — first, correctness: does the logic actually solve the requirement, are edge cases handled, are there any null or duplicate risks. <br>
        Then performance: are there unnecessary shuffles, is the partitioning strategy sensible, any broadcast join opportunities being missed <br>
        I also check for hardcoded values, proper use of Delta Lake operations like MERGE versus overwrite, and whether the transformation is idempotent.<br>
        Finally readability — is the code clean, well-commented, and easy for someone else to maintain. I try to give specific, actionable comments rather than just flagging something as wrong — I explain why and suggest an alternative
        `,
        children: [],
      },
      {
        q: `How do you receive code review comments?`,
        a: ` 
        I take them as an opportunity to improve. My first instinct is to understand the reasoning behind the comment rather than defending my approach. <br>
       If I have a different approach, I explain my reasoning and we agree on the best solution.<br>        
        The goal is to improve the quality of the code and learn from the review process`,
        children: [],
      },
      {
        q: `How do you ensure good communication?`,
        a: `
        "I ensure good communication by keeping stakeholders informed about my progress, raising blockers early, and asking for clarification whenever requirements are unclear instead of making assumptions. <br>
        I also provide timely updates during stand-ups and collaborate closely with my Team Lead and teammates so everyone stays aligned and there are no surprises."
        `,
        children: [],
      },
      {
        q: `Suppose a teammate is delayed. What would you do?`,
        a: ` If a teammate is delayed, I first understand the reason and whether they're blocked or simply need more time.<br>
        If I can help by taking a small task, reviewing code, or assisting with an issue, I do that based on my bandwidth.<br>
        . If the delay could affect the sprint or delivery, I communicate it early to the Team Lead or Scrum Master so the team can replan if needed <br>
        The priority is to keep the project on track while supporting the teammate."
        `,
        children: [],
      },
      {
        q: `What if the business changes the requirement after development?`,
        a: ` Requirement changes are common in Agile projects.  . First I'd assess the impact — how much of what's already built needs to change, does it affect other layers or downstream consumers, and what's the timeline. <br>
        Then I discuss the updated requirement with the Business Analyst, Team Lead, or Scrum Master to ensure everyone has the same understanding before making any changes.<br>
        If the change significantly affects the sprint scope, I communicate it early so the work can be reprioritized. <br>
        Once aligned, I implement the changes, perform thorough testing and data validation, and ensure the updated solution meets the new business requirement without affecting existing functionality."`,
        children: [],
      },
      {
        q: ` How do you ensure knowledge sharing?`,
        a: ` I believe knowledge sharing should be part of regular work. Whenever I work on a new feature or resolve a complex issue, I document the solution and share it with the team. <br>
        I also participate in code reviews, explain my approach when needed, and help teammates if they have questions <br>
        This reduces dependency on individuals and helps the whole team work more effectively.
        `,
        children: [],
      },
      {
        q: `  How do you handle conflicts within the team? <span style="color:green;"><b>Q25</b></span>`,
        a: `
        I try to resolve technical disagreements at the team level first by understanding the other person's perspective and the reasoning behind their approach. Then we evaluate both options based on factors like performance, maintainability, and business requirements.
        <br> If needed, I'll support the discussion with data,or a small proof of concept rather than debating opinions. If we're still unable to reach a decision, we involve our lead or architect to make the final call.
        My focus is always on finding the best solution for the project, not proving that my approach is right.`,
        children: [
          {
            q: `Example`,
            a: ` We had a discussion on whether to repartition the data before writing to Delta. One approach was to keep the existing partitions to avoid an extra shuffle, while the other was to repartition for more balanced output files. We tested both approaches and compared execution time and file sizes. Based on the results, we chose repartitioning because it produced more balanced files and improved downstream performance.`,
            children: [],
          },
        ],
      },
    ],
  },////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  {
    cat: `HR, Career & Company Fit`,
    q: `HR, Career & Company Fit`,
    answer: ``,
    children: [
      {
        q: `salary expectation`,
        a: `
        I'm looking for a compensation that's in line with my experience, skills, and market standards. I'm open to discussing the complete compensation package.
        `,
        children: [],
      },
      {
        q: `INFY`,
        a: ``,
        children: [
          {
            q: ` Why do you want to join Infosys? `,
            a: ` The role directly matches my stack — Azure Databricks, PySpark, Delta Lake. <br>Beyond the tech fit, Infosys Topaz is their AI-first platform focused on enterprise-scale data and AI transformation — making data AI-ready across engineering, governance, and GenAI. <br> That's exactly the direction I want to grow in, and this role gives me that exposure across diverse domains and larger-scale engagements`,
            children: [],
          },
                {
 q:`What do you know about INfosys`,
        a:` Infosys is a global IT services and consulting company headquartered in Bengaluru, India, founded in 1981 by N. R. Narayana Murthy and six other co-founders.
<br>It provides services in digital transformation, cloud, AI, data analytics, cybersecurity, enterprise applications, and software development to clients across industries such as healthcare, banking, retail, manufacturing, and telecom.`,
        children:[],
      },    
          {
            q: `but Both TCS and Infosys are service-based companies.`,
            a: ` I agree, and my decision isn't based on the company type — it's about the opportunities available. Different organizations have different clients, projects, and technologies. <br> I feel this is the right time to broaden my experience in a new environment, take on more ownership, and work on diverse data engineering engagements.`,
            children: [],
          },
        ],
      },
      {
        q: `What type of work environment do you prefer?`,
        a: `
        I prefer a collaborative environment where team members openly share knowledge, discuss ideas, and focus on delivering high-quality solutions
        `,
        children: [],
      },
      {
        q: `why leave your current role?`,
        a: `I've had a good learning experience in my current role, where I've worked on building and maintaining production ETL pipelines using Azure Databricks, PySpark, and SQL<br> I'm now looking for an opportunity to work on more challenging projects, gain exposure to different business domains and broaden my technical exposure. This role aligns well with those goals, which is why I'm interested in making a change.`,
        children: [
          {
            q: `why now / specific reason for leaving?`,
            a: `My current project is coming to an end, so I saw this as the right time to make a planned career move. I'm now looking for new challenges, broader project exposure, and continued professional growth.`,
            children: [],
          },


        ],
      },
      {
        q: `will you leave US ater somtime ? how long you stay`,
        a: ` My focus is to contribute and continue growing. As long as I'm working on challenging projects, learn new technologies, and add value, I'd be happy to build a long-term career with the organization.`,
        children: [],
      },

      {
        q: `Why should we hire you? / what makes you a good fit for this role?`,
        a: ` <ul><li>Based on the JD, I believe my technical skills and production experience align well with your requirements</li>
        <li>I have hands-on experience with Azure Databricks, PySpark, SQL, Delta Lake,  building end-to-end ETL pipelines.</li>
        <li>I am a quick learner, and take ownership of my work. so I'm confident I can start contributing from day one while learning your domain and business processes.</li></ul> `,
        children: [],
      },
      {
        q: `What distinguishes you from other candidates?`,
        a: ` 
        What sets me apart is that I combine hands-on Databricks development with a strong focus on reliability and performance.<br>
        In my current healthcare project, I’ve worked on production-grade Azure Databricks pipelines handling 45–50 GB of data daily, with incremental ingestion, Delta MERGE, validation checks, and Spark optimization that reduced runtime by 40–45%. <br>
I focus on delivering solutions that are accurate, reliable, and ready for production
        `,
        children: [],
      },

      {
        q: ` Why should I trust you with production work?`,
        a: ` I understand the importance of production stability, especially in healthcare , where data accuracy and reliability are critical <br>
      I follow coding standards, perform thorough unit and data validation, participate in code reviews, and support production issues when required.<br>
       I don't rush changes—I ensure they're properly tested and validated before deployment, and I communicate proactively with my team if I identify any risks.
        `,
        children: [],
      },
      {
        q: `Why should I select you over someone with more experience?`,
        a: ` 
        Experience is important, but I believe the ability to learn quickly, adapt, and consistently deliver quality work is equally valuable.<br> Over the past three years, I've built production-grade Azure Databricks pipelines, optimized Spark jobs, supported production issues, and continuously expanded my technical skills. I'm confident I can contribute effectively while continuing to grow.
        `,
        children: [],
      },
    ],

  },
]