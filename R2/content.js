const cats = ["Self Introduction", "Project Ownership", "Production Support & Incident Handling", "Design Decisions", "Collaboration & Teamwork", "Behavioral", "Ownership & Decision Making", "Achievements", "Stakeholder Management", "Career & Motivation", "Company-Specific Questions"];
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
        a: `I've had a good learning experience in my current role, where I've worked on building and maintaining production ETL pipelines using Azure Databricks, PySpark, and SQL<br> I'm now looking for an opportunity to work on more challenging projects, gain exposure to different business domains and broaden my technical exposure.`,
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
        <li>so I'm confident I can start contributing from day one while learning your domain and business processes.</li></ul> `,
        children: [],
      },
      { q:`Do you have any other concerns? / questions`,
a:`Yes, thank you. Could you tell me a bit about the team I'll be working with and the kind of projects they're currently handling? Also, what would you expect from someone in this role during the first few months?`,
        children:[],},



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
            q: `Would you still keep the same design?`,
            a: `Yes. Based on our project's requirements, I think the design was appropriate. If the business later started receiving files continuously or required stronger schema governance in the raw layer, then I'd evaluate moving Bronze to Delta and using Auto Loader.<br> Architecture should evolve with changing requirements rather than adopting every available feature from the start." `,
            children: [],
          },
        ],
      },
    ],

  },////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  {
    cat: `Behavioral`,
    q: `Behavioral`,
    answer: ``,
    children: [
      {
        q: ` Tell me about a time you improved performance.`,
        a: ` The major performance improvement done by me is Reducing the long running Gold layer pipeline runtime by 40–45% through Spark and Delta Lake optimizations — broadcast hints for small reference tables, OPTIMIZE for file compaction, and Z-ORDER to improve MERGE performance `,
        children: [],
      },
      {
        q: `Suppose another team is blocking your work. How do you handle it?`,
        a: `I first try to understand the reason for the dependency by discussing it directly with the concerned team. <br> If the blocker can't be removed immediately, I continue with independent work like developing transformations, testing with sample data, or preparing the remaining pipeline so my work doesn't stop. <br>  If it's impacting timelines and can't be resolved between teams, I escalate to my lead with clear context — what's blocked, the impact, and what I've already tried. I always come with a suggestion, not just the problem.`,
        children: [],
      },
      {
        q: ` How long would you take to develop a pipeline?`,
        a: ` It depends on the complexity, business rules, source systems and testing effort. <br> A straightforward ingestion pipeline with basic transformations — I can turn that around in 2 to 3 days. <br> For more complex pipelines, like the ones I worked on in our healthcare project involving the Medallion architecture, SCD Type 2 , development typically took a few weeks including testing and UAT. <br> . I always break it into phases — design, development, testing, and deployment — and give estimates per phase so stakeholders have visibility throughout."`,
        children: [],
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
        q: `--- How does the task get assigned to you?`,
        a: ` During sprint planning, user stories are discussed and estimated by the team. Based on sprint priorities, workload, and ownership, the Scrum Master or Technical Lead assigns tasks to developers. Once assigned, I analyze the requirements, estimate the effort, and begin development`,
        children: [],
      },
      {
        q: `--- Since how long have you been working on this project?`,
        a: ` I've been working on this healthcare project for around 1.5 years, where I've been involved in developing and enhancing multiple production data pipelines."`,
        children: [],
      },
      {
        q: `--- Is there any daily Scrum call? Who leads that?`,
        a: `Yes. We have a daily Scrum meeting every working day, usually for about 15 minutes. It is led by the Scrum Master. During the meeting, each team member shares what they completed yesterday, what they're working on today, and whether they have any blockers`,
        children: [],
      }
    ],

  },////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  {
    cat: `Stakeholder Management`,
    q: `Have you ever had direct interaction with the client?`,
    answer: `<ul><li>I haven't been the primary point of contact for the client. Most communication happens through our Business Analyst and onshore lead. </li>
    <li>That said, I've been part of requirement clarification sessions where technical inputs were needed, so I've had exposure to those conversations.</li>
    <li> My core responsibility has been on the implementation side — building the pipeline, optimizing performance,</li>
    <li>I'm comfortable engaging with clients on technical topics and I'm actively looking to take on more client-facing responsibilities as I grow in my career.</li></ul>`,
    children: [{
      q: `Have you ever attended a client interview?`,
      a: `Yes. I attended a client interview during the project onboarding process. <br> The discussion was mainly around my technical skills, project experience, communication, and understanding of the technologies required for the project. After clearing the interview, I was onboarded to the project.`,
      children: [
        {
          q: `who conducted`,
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
  {
    cat: `Ownership & Decision Making`,
    q: `What factors do you consider while developing a data pipeline?`,
    answer: ` 
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
    children: [{
      q: ` What do you know about good data engineering design principles?`,
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
    cat: `Collaboration & Teamwork`,
    q: ` where do you maintain version history`,
    answer: `
    We use Azure DevOps Repos with Git for version control. We create feature branches for our work, commit changes regularly, and raise Pull Requests for code review.<br> After the review and approval, the code is merged into the target branch, which gives us complete version history and traceability of every change.
    `,
    children: [
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
        q: `What is SLC`,
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
        q: `which methodology isused in your project`,
        a: ` We followed Agile using the Scrum framework. We worked in two-week sprints, participated in sprint planning, daily stand-ups, sprint reviews, and retrospectives. <br>Code was managed in Git and deployed through Azure DevOps CI/CD pipelines to different environments, while Databricks Workflows orchestrated our production jobs. `,
        children: [{
          q: `why not waterfall`,
          a: `Our requirements evolved based on business needs and data changes, so Agile allowed us to deliver pipeline enhancements incrementally and incorporate stakeholder feedback quickly. Waterfall is more suitable when requirements are fixed and changes are minimal.`,
          children: [],
        }],
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