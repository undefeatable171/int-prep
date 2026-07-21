const cats = ["Self Introduction", "Project Ownership", "Production Support & Incident Handling", "Design Decisions", "Collaboration & Teamwork", "Behavioral", "Stakeholder Management", "Company-Specific Questions"];
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
        a: `I am currently working as a Data Engineer in a US healthcare project. <br> In my current project, I'm responsible for developing and maintaining batch ETL pipelines on Azure Databricks. <br> I work across the full Medallion architecture — ingesting data from on-premises PostgreSQL and file-based sources like eligibility and claims files, applying transformations through Bronze, Silver, and Gold layers. I implement incremental ingestion using watermark-based logic, Delta Lake MERGE operations, SCD Type 2 for dimension tables, and data quality validations at each layer. <br> I collaborate with BI, analytics teams to understand downstream data requirements and ensure that our pipelines deliver reliable datasets`,
        children: [],
      },
      {
        q: `how do you ensure reliability and quality of data in your pipelines?`,
        a: `We ensure reliability by using incremental processing to avoid reprocessing data, Delta Lake transactions for consistent writes, and Databricks Workflows to monitor pipeline execution and retry failed jobs where applicable. 
      <br>For data quality, in the Silver layer we perform null checks, data type standardization, deduplication using window functions,  business rule validations before the data is made available for downstream consumption.`,
        children: [
          {
            q: `does reconciliation  done in your pipelines?`,
            a: `We don't have a dedicated reconciliation framework in our current project. Instead, we ensure data correctness through data quality validations in the Silver layer, such as null checks, data type standardization, deduplication, and business rule validations. <br> We also monitor pipeline execution and verify that the data has been processed successfully before it's made available to downstream consumers.`,
            children: [],
          },
          {
            q: `when reconciliation is typically used and how`,
            a: `Reconciliation is commonly used in critical domains like finance, banking  where it's essential to prove that all source records have been loaded correctly. <br> It typically involves comparing source and target record counts, aggregates, or business metrics to ensure data completeness and accuracy.
      <br> we perform source-to-target reconciliation by comparing the number of records extracted from the source with the records successfully loaded, accounting for any rejected or duplicate records. This validation is done before marking the pipeline as successful.

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
              {
                q: ` How does merge metrics works`,
                a: `Delta Lake records operation metrics in the transaction log. We can view them using <code>DESCRIBE HISTORY ustechcentral.datahub.hrmm</code>, which provides metrics like numTargetRowsInserted, numTargetRowsUpdated, and numTargetRowsDeleted. These metrics help us verify that the expected records were processed.`,
                children: [],
              },
            ],
          },

          ////

        ],

      },
      {
        q: `What are your day-to-day responsibilities? <span style="color:green;"><b>Q25</b></span>`,
        a: `<ul><li>My day starts with a standup — each team member shares what they completed yesterday, what they're working on today, and any blockers..</li>
        <li>Most of my time goes into developing or enhancing ETL pipelines in PySpark and SQL — transformations, incremental ingestion, data quality checks, or Spark optimization depending on the sprint.</li>
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
        q: `Why should we hire you? / what makes you a good fit for this role?`,
        a: ` <ul><li>Based on the JD, I believe my technical skills and production experience align well with your requirements</li>
        <li>I have hands-on experience with Azure Databricks, PySpark, SQL, Delta Lake,  building end-to-end ETL pipelines.</li>
        <li>I am a quick learner, and take ownership of my work. so I'm confident I can start contributing from day one while learning your domain and business processes.</li></ul> `,
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
        a: ` Most of my work is in the Silver and Gold layers, where I implement business transformations, data quality validations, and performance optimizations.<br> The work in our project is divided functionally, and I primarily work on the claims area. <br>I take end-to-end ownership of the claims-related processing—from implementing transformation logic and testing to deployment and troubleshooting. while collaborating with the rest of the team on the overall platform. `,
        children: [{
          q: `DO you own any pipeline`,
          a: `Our project has pipelines across Bronze, Silver, and Gold. Work is divided functionally rather than by individual pipelines — I own the claims domain within Silver and Gold. So rather than counting pipelines, I'd say I manage the end-to-end data flow for the claims domain.`,
          children: [],
        },],
      },
      {
        q: `Describe a time you took ownership.`,
        a: ` One example was when one of our daily pipeline executions started taking significantly longer than usual as data volume increased. <br>
        Although it wasn't assigned specifically to me, I investigated the issue using the Spark UI and execution plan. I identified inefficient joins and full table scans during merge operations. So (.... 40-45 %optimization )`,
        children: [],
      },

      {
        q: `How do you handle criticism`,
        a: ` "I see constructive criticism as an opportunity to improve. Whenever I receive feedback, I first try to understand the reason behind it instead of becoming defensive. <br> 
        For example, during a code review, I received feedback that one of my deduplication logic could be simplified and made more readable. I discussed the suggestions with the reviewer, updated the implementation, and adopted those coding practices in my future developments.
<br>
I believe good feedback improves both code quality and professional growth."
        `,
        children: [],
      },
      {
        q: `---Tell me about a feature you built independently.`,
        a: ``,
        children: [],
      },
      {
        q: ` What is the most difficult business logic you've written?`,
        a: `The most complex logic I've written was SCD Type 2 MERGE for the dimension table — handling new records, updates, and expirations in a single MERGE while maintaining history. The tricky part was getting the MERGE conditions right so updates correctly expired the old version, set the end date, flipped the current flag, and inserted the new version — all atomically without gaps or overlaps in the history.`,
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
        q: ` Your role in production issues / Do you have production support responsibilities? / What happens if prod job failed`,
        a: `our project has a dedicated Operations team that performs first-level monitoring of production jobs.<br>
        When a pipeline fails, the Operations team receives the failure alert and performs the initial investigation to determine whether it's an infrastructure, scheduling, or application issue.<br>If they identify a pipeline failure caused by application logic or data issues, they raise a ticket to our development team.<br> Then i will review the failed task logs in Databricks Workflow, understand the exception, and classify it — whether it's a source issue, Spark exception, schema change, or data quality problem. Then I fix the root cause and validate it in the appropriate environment, and support the deployment. After deployment, the Ops team reruns the pipeline and confirms successful execution.`,
        children: [],
      },
      {
        q: `First thing you do if a job fails? / howdo you investigate`,
        a: `When a pipeline fails, the Operations team receives the failure alert and performs the initial investigation to determine whether it's an infrastructure, scheduling, or application issue.<br>If they identify a pipeline failure caused by application logic or data issues, they raise a ticket to our development team.<br> Then i will review the failed task logs in Databricks Workflow, understand the exception, and classify it — whether it's a source issue, Spark exception, schema change, or data quality problem. <br>Then I fix the root cause and validate it in the appropriate environment, and support the deployment. After deployment, the Ops team reruns the pipeline and confirms successful execution.`,
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
            q: `--- How roll back is done`,
            a: ``,
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
        q: `What factors do you consider while developing a data pipeline?`,
        a: ` 
    <p>
There are a few key factors I consider while designing a data pipeline.
</p>

<ul>
    <li>
        <b style="color:#D32F2F;">Data Volume & Frequency</b>
        <ul>
            <li>Understand how much data is being ingested and how often.</li>
            <li>Helps decide partitioning strategy, cluster sizing, and whether we need batch or near-real-time processing..</li>
        </ul>
    </li>

    <li>
        <b style="color:#D32F2F;">Source System Characteristics</b>
        <ul>
            <li>I identify whether the source is a database or files, whether we should use full or incremental loads, and how to handle schema changes</li>
            <li>In my project, PostgreSQL uses <b>watermark-based incremental loading</b>, while reference data is ingested from ADLS files.</li>
        </ul>
    </li>

    <li>
        <b style="color:#D32F2F;"> Data Quality</b>
        <ul>
            <li> building in checks at each layer so bad data doesn't propagate downstream.</li>
            <li>n my pipeline, we handle nulls, duplicates, and schema mismatches in the Silver layer before anything hits Gold..</li>
        </ul>
    </li>

    <li>
        <b style="color:#D32F2F;">Performance & Scalability</b>
        <ul>
            <li>I focus on partitioning, minimizing shuffles, selecting appropriate join strategies, and optimizing Delta tables</li>
            <li>We  used broadcast joins for ref tables joining, OPTIMIZE and Z-ORDER, which improved some pipeline runtimes by around 40–45%.</li>
        </ul>
    </li>

    <li>
        <b style="color:#D32F2F;">Reliability</b>
        <ul>
            <li>I build pipelines to be idempotent, include proper logging and exception handling, and ensure rerunning a failed job doesn't create duplicate data.</li>
        </ul>
    </li>

    <li>
        <b style="color:#D32F2F;">Security & Governance</b>
        <ul>
            <li>Protect sensitive healthcare data using role-based access and column-level security.</li>
            <li>Use <b>Unity Catalog</b> for governance.</li>
        </ul>
    </li>

    <li>
        <b style="color:#D32F2F;" >Maintainability</b>
        <ul>
            <li>Write modular, reusable code with meaningful logging and documentation.</li>
            <li>This makes the pipeline easier to debug, enhance, and support.</li>
        </ul>
    </li>
</ul>
    `,
        children: [],
      },
      {
        q: `What do you know about good data engineering design principles?`,
        a: ` 
      <div style="padding: 1rem 0; display: flex; flex-direction: column; gap: 14px;">

  <div>
    <h2 style="font-size:15px; font-weight:500; color:#7F77DD; margin:0 0 4px;">Idempotency</h2>
    <p style="font-size:14px; color:#888; margin:0;">Reruns should produce the same result without duplicates or data loss. Critical for reliable batch pipelines.</p>
  </div>

  <div>
    <h2 style="font-size:15px; font-weight:500; color:#1D9E75; margin:0 0 4px;">Modularity</h2>
    <p style="font-size:14px; color:#888; margin:0;">Break pipelines into reusable, independently testable components rather than one monolithic job.</p>
  </div>

  <div>
    <h2 style="font-size:15px; font-weight:500; color:#378ADD; margin:0 0 4px;">Scalability</h2>
    <p style="font-size:14px; color:#888; margin:0;">Design for data growth from day one — right partitioning, file formats, and cluster sizing so it doesn't break at 10x volume.</p>
  </div>

  <div>
    <h2 style="font-size:15px; font-weight:500; color:#D85A30; margin:0 0 4px;">Data quality at the source</h2>
    <p style="font-size:14px; color:#888; margin:0;">Validate and cleanse early, ideally at the Bronze/Silver boundary, so bad data never reaches downstream consumers.</p>
  </div>

  <div>
    <h2 style="font-size:15px; font-weight:500; color:#D4537E; margin:0 0 4px;">Separation of concerns</h2>
    <p style="font-size:14px; color:#888; margin:0;">Keep ingestion, transformation, and serving layers distinct — medallion architecture enforces this naturally.</p>
  </div>

  <div>
    <h2 style="font-size:15px; font-weight:500; color:#BA7517; margin:0 0 4px;">Observability</h2>
    <p style="font-size:14px; color:#888; margin:0;">Proper logging, monitoring, and alerting so you know when something breaks, why it broke, and where.</p>
  </div>

  <div>
    <h2 style="font-size:15px; font-weight:500; color:#639922; margin:0 0 4px;">Security by design</h2>
    <p style="font-size:14px; color:#888; margin:0;">Access controls, PII masking, and audit trails built in from the start — not bolted on after the fact.</p>
  </div>

</div>
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
        In the next three years, I want to become a strong senior data engineer,  designing scalable data platforms, taking more technical ownership, and mentoring junior engineers. I also want to build expertise in AI-ready data platforms and modern cloud technologies.
<br>
In the next five years, I see myself leading data engineering initiatives, contributing to architecture decisions, and helping build scalable, AI-enabled data solutions while staying hands-on with technology.
        `,
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
        q: ``,
        a: ``,
        children: [],
      },
      {
        q: ``,
        a: ``,
        children: [],
      },
      {
        q: ``,
        a: ``,
        children: [],
      },],

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
            q: `which development methodology isused in your project`,
            a: ` We followed Agile using the Scrum framework with two-week sprints. <br>Sprint planning is done at the beginning of every sprint, where user stories are estimated and assigned. <br> Every day we attend a stand-up meeting to discuss what we completed yesterday, what we're working on today, and any blockers. At the end of the sprint, we participate in sprint review and retrospective meetings to demonstrate completed work, collect feedback, and identify process improvements. `,
            children: [{
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
    cat: `Company-Specific Questions`,
    q: `Company-Specific Questions`,
    answer: ``,
    children: [
      {
        q: ` Why do you want to join Infosys? `,
        a: ` The role directly matches my stack — Azure Databricks, PySpark, Delta Lake. Beyond the tech fit, Infosys Topaz is their AI-first platform focused on enterprise-scale data and AI transformation — making data AI-ready across engineering, governance, and GenAI. That's exactly the direction I want to grow in, and this role gives me that exposure across diverse domains and larger-scale engagements`,
        children: [],
      },
      {
        q: `will you leave US ater somtime ? how long you stay`,
        a: ` My focus is to contribute and continue growing. As long as I'm working on challenging projects, learn new technologies, and add value, I'd be happy to build a long-term career with the organization.`,
        children: [],
      },
      {
        q: `but Both TCS and Infosys are service-based companies.`,
        a: ` I agree, and my decision isn't based on the company type — it's about the opportunities available. Different organizations have different clients, projects, and technologies. <br> I feel this is the right time to broaden my experience in a new environment, take on more ownership, and work on diverse data engineering engagements.`,
        children: [],
      },
      {
        q: ``,
        a: ``,
        children: [],
      },
    ],

  },
]