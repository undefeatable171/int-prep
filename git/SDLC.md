---
layout: default
title: SDLC
permalink: /SDLC/
---
# SDLC, Agile, Scrum & DevOps Interview Notes

## 1. SDLC

SDLC is the structured process used to develop software. It includes 7 phases :

> Planning ➜ Requirement Analysis ➜ Design ➜Development ➜Testing ➜ Deployment ➜Maintenance

---

# 2. Software Development Methodologies

## 2.1 Waterfall

 It follows Sequential approach where One phase completes before the next starts

- Requirements are fixed
- Customer feedback mainly at the end

##### Best suited for : Banking ,Government , Safety-critical systems

##### Pros : SImple , well-documented

##### Cons : Difficult to accommodate changes ,Late feedback , Expensive rework

---

## 2.2 Agile

Agile is a software development methodology that delivers software incrementally through short iterations with continuous
stakeholder feedback.

##### Sprint

A sprint produces a **potentially shippable increment**.

Usually **1--4 weeks**

Each Sprint includes: - Sprint Planning - Development - Testing - Sprint
Review - Sprint Retrospective

#### Deployment in Agile :  may happen after every sprint, - after multiple sprints, -

or whenever the business decides.

> **Agile does NOT require deployment after every sprint.**

---

## 2.2.A Scrum

### Definition

Scrum is the most popular **Agile framework**.

##### Roles : Product Owner , Scrum Master ,Development Team

##### Ceremonies: Backlog Refinement ; Sprint Planning ;Daily Stand-up ;Sprint Review ;Sprint Retrospective

###### Artifacts: Product Backlog; Sprint Backlog; Product Increment

---

## DevOps

↳ Complements Agile by automating build, test, deployment and operations
-------------------------------------------------------------------------

# 4. Agile Work Hierarchy

```text
Epic
 └── Feature
      └── User Story
            ├── Task(s)
            └── Bug(s)
```

## Agile Work Items and Timeline


| Item       | Definition                                                  | Example                                                                                        | Typical Duration     |
| ------------ | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------- |
| Epic       | Large business objective spanning multiple sprints/releases | Patient Data Platform                                                                          | Months               |
| Feature    | Major functionality                                         | Incremental Patient Ingestion                                                                  | One or more releases |
| User Story | Description of a software feature from a user's perspective | As a Data Analyst, I want patient data loaded every 4 hours so reports stay current.           | One Sprint           |
| Task       | Technical work needed to complete a story                   | Create notebook; Develop PySpark logic; Configure pipeline; Unit test; Code review; Test cases | Hours to Days        |
| Bug        | Code Defect found during testing or production              | Watermark not updating after failed run                                                        | Until fixed          |

USER STory has : Acceptance criteria , description , notes , severity and priority etc

---

# 6. What Our Project Used

- **Methodology:** Agile
- **Framework:** Scrum
- **Delivery Practices:** DevOps
- **Version Control:** Git / Azure Repos
- **CI/CD:** Azure DevOps Pipelines
- **Orchestration:** Databricks Workflows

---

---

---

---

# END-END PRocess

PI planning 3 months => 2 weeks => wed - wed. => backog refinement : monday => sprint planning ; wed => retro : tues => 1 point=1 day=8 hrs  => febonicgu series (1,2,3,5,8) =>

### pi planning: 3 months work , 2,3 days happens. dependency ,work planning

### 1. Business Requirement — Client Business Stakeholders

Business stakeholders identify the actual business need and communicate the requirement to the client Product Owner.

### 2. Product Owner — Client Side

- The Product Owner orders/prioritizes the Product Backlog in Azure DevOps Boards based on business value.
- The Scrum Team has access to the backlog, and during Sprint Planning, the **top-priority ready items are considered first.**

### 3. Business Analyst — Client Side

The BA works with business stakeholders/PO to detail the requirement, business rules, and acceptance criteria.

### 4. Onshore Lead — TCS Side

The onshore lead coordinates with the client BA/PO, understands the requirement, and adds the necessary project/technical context for the offshore team.

### 5. User Story — Azure DevOps

The requirement is captured as a User Story in Azure DevOps Boards, containing the description, acceptance criteria, relevant references, and required context/mapping docs if available. In our flow, the **onshore lead**typically creates/updates it based on the client requirement.

### 6. Product Backlog — Azure DevOps Boards

- A product backlog is a prioritized list of work items required for the product.
- It can contain new features, enhancements, defects, technical improvements and other work.
- The Product Owner is responsible for prioritizing the backlog based on business value

### 7. Backlog Refinement

- The onshore lead walks the team through upcoming stories →  team clarifies requirements →  During Backlog Refinement, we estimate the **story points using Voting and febonachy series(1, 3, 5, 8, 13). If estimates differ, we discuss and agree on the final story point.
- Client BA/PO is involved when business clarification is required.

### 8. Story Ready for Sprint

Once the requirement and acceptance criteria are clear, dependencies are understood, and estimation is completed, we consider the story ready for Sprint Planning.

### 9. Sprint Planning

- PBIs are selected from the Product Backlog based on business priority, team capacity, historical velocity, and dependencies.; selected PBIs become part of the Sprint Backlog.
- Our TL coordinates story ownership based on developer capacity and technical expertise, and the selected story is assigned to the respective developer in Azure DevOps

### 10. Tasks

- We create tasks like req anlysis , development , unit testing , documentation, test case prep

### 11.

Development → **Unit Testing**(Developer validates the implemented logic)
→ PR → **Code Review by TL**(Comments → Fix → Re-review -> Approval)
→ Merge →**deployed with CI/CD Lower Environment** → **Testing**(cross testing - Validate affected pipelines,data layers and dependencies)
→ **UAT**(Business users validate against requirements / acceptance criteria) (Defects → Fix → Retest -> Approval)
→ UAT Sign-off → Production → **Post Deployment Validation**(wf running successfull/not , expected functionality) → Ops Monitoring

## Scrum events

- **Sprint Planning** : Select top-priority PBIs from the Product Backlog based on priority, velocity, capacity, and dependencies to form the Sprint Backlog.
- **Daily Scrum**:  daily meeting to discuss progress, today's work, and blockers (15-30 mins).
- **Sprint Review** : Review/demo the completed work with stakeholders and collect feedback.
- **Retrospective** : A sprint retrospective is a meeting held at the end of the sprint where the team
  discusses what went well, what didn't go well and what improvements should be made in the
  next sprin **EX** For example, if deployment issues repeatedly delayed our sprint, the team could discuss
  the root cause and agree on an improvement such as earlier testing or better deployment
  validation



## Questions

##### PBI VS PB

- Product Backlog = the complete ordered list of work.
- PBI = an individual item in the Product Backlog. A User Story can be a PBI.

##### velocity (past delivery) :

how many story points the team typically completes per Sprint, based on previous Sprints.

##### capacity ( current availability ):

 how much the team is available in the current Sprint, considering team size, leaves, holidays, etc.

##### How many sp per sprint

##### On what basis you take sp in a sprint

- We use historical velocity and current team capacity to decide how many story points we can realistically take into the Sprint
- **EX**: if the team normally completes around 30 story points per sprint, that velocity is used as a reference. During Sprint Planning, the team considers roughly that amount of work, then adjusts for current availability, holidays, dependencies, etc.

#Story points are a relative estimation of the effort required to complete a user story. They don't represent a fixed number of hours. They consider factors such as complexity, effort, uncertainty and dependencies.

### Example:

```text
Simple requirement â†’ 2 points
Moderate requirement â†’ 5 points
Complex requirement â†’ 8 points
Very complex â†’ 13 points
```

The exact scale depends on the team's estimation approach.

### How is the duration of each user story defined?

- We don't directly map story points to a fixed number of days.
- During refinement or planning, the team estimates the story based on complexity, effort,dependencies and uncertainty.
- Based on the team's historical velocity and available capacity for the sprint, we determine how many stories can realistically be completed
- The actual duration can also depend on dependencies, testing, reviews and external teams.

## END to END

We follow an Agile Scrum methodology.

> Requirements are maintained in the product backlog and prioritized by the Product Owner.
>
> During backlog refinement, the team discusses the requirements, clarifies questions and
> estimates the stories using story points.
>
> During sprint planning, the team selects stories based on priority, capacity and
> previous velocity.
>
> During the sprint, we work on development, testing and code reviews. We have daily
> stand-ups where we discuss progress, plans and blockers.
>
> At the end of the sprint, completed work is demonstrated during the sprint review. Then
> we conduct a retrospective to discuss what went well, what could be improved and what
> actions we should take in the next sprint
>

# 8. Key Takeaways

- SDLC is the lifecycle.
- Waterfall and Agile are development methodologies.
- Agile is methodology ;Scrum is an Agile framework.
- Agile focuses on **how software is developed**.
- DevOps focuses on **how software is built, tested, deployed, and operated efficiently**.
- Every Scrum project is Agile, but not every Agile project uses
  Scrum.
- Agile does not mandate deployment after every sprint.
- Organize work as: Epic → Feature → User Story → Task/Bug.
