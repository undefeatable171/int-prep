const cats = ["Self Introduction", "Project Ownership", "Production Support & Incident Handling", "Design Decisions", "Collaboration & Teamwork", "Behavioral", "Ownership & Decision Making", "Achievements", "Stakeholder Management", "Career & Motivation", "Company-Specific Questions", "Quick Revision Sheet"];
const qs = [
  {
    cat: `Self Introduction`,
    q: `Tell me about yourself`,
    answer: `  Hi, I'm Prathap Gorantla, and I have around 3 years of experience as a Data Engineer at TCS.I'm currently working on a US healthcare project,where we build and maintain a centralized data platform using Azure Databricks, pyspark , sql and python. I hold both the Databricks Certified Data Engineer Associate and Professional certifications, and coming to academics, I have completed my graduaction in Electronics and Communication Engineering from VR Siddhartha Engineering College, Vijayawada.`,
    children: [
      {
        q: ` Walk me through your career journey`,
        a: `I completed my graduation in 2023 and joined TCS as a Fresher. Over the past three years, I've worked on Azure-based data engineering projects using Databricks, PySpark, SQL. <br> Currently, I'm part of a US healthcare project where I develop and enhance batch ETL pipelines, implement incremental data ingestion, and build data transformations using the Medallion architecture.`,
        children: [],
      },
      {
        q: `what is your current role and responsibilities?`,
        a: `I am currently working as a Data Engineer in a US healthcare project. <br> My responsibilities include developing and maintaining batch ETL pipelines using PySpark and SQL.  <br> implementing incremental ingestion, transformation logic across Bronze, Silver, and Gold layers, Optimizing spark workloads, troubleshooting prod pipeline issues if any , and collaborating with downstream consumers, and other developers to deliver reliable data for downstream reporting and analytics..`,
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
        q: `What are your day-to-day responsibilities?`,
        a: `<ul><li>My day typically starts by monitoring the previous night's pipeline executions in Databricks Workflows and investigating any failed or delayed jobs. If there are production issues, I analyze the root cause, resolve them, and ensure successful reruns.</li>
        <li>The rest of my day involves developing new PySpark ETL pipelines or enhancing existing ones based on business requirements, implementing transformations, performing data validation, and optimizing Spark jobs whenever needed.</li>
        <li>I also participate in daily stand-ups, discuss progress and blockers with the team, work with BI and business teams to clarify requirements, and support code reviews and deployments as part of our sprint activities.</li>`,
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
        a: `I've had a good learning experience in my current role, where I've worked on building and maintaining production ETL pipelines using Azure Databricks, PySpark, and SQL<br> I'm now looking for an opportunity to work on more challenging data engineering problems, gain exposure to different business domains and contribute to impactful data solutions.`,
        children: [
          {
            q: `why now / specific reason for leaving?`,
            a: `I've been with TCS for about three years, and it's been a great learning experience. I feel this is the right time to take on new challenges and broaden my experience while building on the strong foundation I've gained.`,
            children: [],
          },
          {
            q: `why Infosys/ us?`,
            a: ` The role aligns well with my experience in Azure Databricks and data engineering, and I believe it offers opportunities to work on diverse projects and business domains.`,
            children: [],

          },
          {
            q: `Why should we hire you? / what makes you a good fit for this role?`,
            a: ` <ul><li>Based on the JD, I believe my technical skills and production experience align well with your requirements</li>
        <li>I have hands-on experience with Azure Databricks, PySpark, SQL, Delta Lake,  building end-to-end ETL pipelines.</li>
        <li>so I'm confident I can start contributing from day one while learning your domain and business processes.</li></ul> `,
            children: [],
          }
        ],
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
        q: `what is biggest challenging part of your projct?`,
        a: `The most challenging part is ensuring reliable incremental processing while maintaining data quality --  processing only new or changed records without duplicates or missing data, while handling schema changes, late-arriving files, and production failures, all with downstream reporting depending on it<br>
        To handle this we use Delta Lake's MERGE for upserts, watermark-based incremental loads to track what's been processed, and data quality checks at the Silver layer before anything reaches Gold. For schema changes ,We follow a fixed schema contract — if an unexpected schema change comes in, the pipeline fails fast. Any intentional change goes through a CR process and is updated before deployment.  <br>
        And another major challenge was Gold layer performance .....(project prep content )
        `,
        children: [],
      },
      {
        q: `---Tell me about a feature you built independently.`,
        a: ``,
        children: [],
      },
      {
        q: `---What production issue took the longest to resolve?`,
        a: `One production issue that took the longest to resolve involved a sudden increase in rejected claims during the Silver processing. Our pipeline itself was healthy, but many records started failing validation. We investigated the rejected records and found that the upstream application had started sending an unexpected value in one of the business-critical columns, which violated our validation rules. We coordinated with the upstream team to confirm the change, assessed its business impact, updated the transformation and validation logic after approval, reprocessed the affected data, and verified the downstream reports.`,
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
        q: ``,
        a: ``,
        children: [],
      },
      {
        q: ``,
        a: ``,
        children: [],
      },
    ],

  },////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  {
    cat: `Design Decisions`,
    q: `If you could redesign the project today, what would you improve?`,
    answer: ` <li>I would consider using Delta for the Bronze layer as well to benefit from schema enforcement and easier reprocessing</li>
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
           q:`Would you still keep the same design?`,
        a:`Yes. Based on our project's requirements, I think the design was appropriate. If the business later started receiving files continuously or required stronger schema governance in the raw layer, then I'd evaluate moving Bronze to Delta and using Auto Loader.<br> Architecture should evolve with changing requirements rather than adopting every available feature from the start." `,
        children:[],
          },
        ],
      },
    ],

  },////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  {
    cat: `Behavioral`,
    q: ``,
    answer: ``,
    children: [
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
      },
      {
        q: ``,
        a: ``,
        children: [],
      },
    ],

  },////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  {
    cat: ``,
    q: ``,
    answer: ``,
    children: [{
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
    },
    {
      q: ``,
      a: ``,
      children: [],
    },],

  },////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  {
    cat: ``,
    q: ``,
    answer: ``,
    children: [{
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
    },
    {
      q: ``,
      a: ``,
      children: [],
    },],

  },////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  {
    cat: ``,
    q: ``,
    answer: ``,
    children: [
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
      },
      {
        q: ``,
        a: ``,
        children: [],
      },
    ],

  },////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  {
    cat: ``,
    q: ``,
    answer: ``,
    children: [
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
      },
      {
        q: ``,
        a: ``,
        children: [],
      },
    ],

  },
]