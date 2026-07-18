---
layout: default
title: SDLC
permalink: /SDLC/
---
# SDLC, Agile, Scrum & DevOps Interview Notes

## 1. SDLC (Software Development Life Cycle)

**Definition**

SDLC is the overall process followed to build, test, deploy, and
maintain software.

### Phases


| Step                  | Purpose                                                      |
| ----------------------- | -------------------------------------------------------------- |
| Planning              | Define scope, timeline, and objectives.                      |
| Requirement Analysis | Gather and analyze detailed business requirements.           |
| Design                | Design architecture and technical solution.                  |
| Implementation        | Develop the application.                                     |
| Testing               | Find and fix defects until the software is stable.           |
| Deployment            | Stakeholders validate and approve the product & deploy       |
| Maintenance           | Support, monitor, and enhance the software after deployment. |

> **Interview Answer**
>
> SDLC is the structured process used to develop software. It includes
> Planning, Design, Development, Testing, Deployment, and Maintenance to
> deliver reliable software.

---

# 2. Software Development Methodologies

## Waterfall

### Characteristics

- Sequential approach
- One phase completes before the next starts
- Requirements are fixed
- Customer feedback mainly at the end

### Best suited for

- Banking
- Government
- Medical
- Aerospace
- Safety-critical systems

### Pros

- Simple
- Well documented
- Easy to manage

### Cons

- Difficult to accommodate changes
- Late feedback
- Expensive rework

---

## Agile

### Definition

Agile is a software development methodology/philosophy that delivers
software incrementally through short iterations with continuous
stakeholder feedback.

### Principles

- Iterative development
- Incremental delivery
- Customer collaboration
- Welcome changing requirements
- Working software over excessive documentation

### Sprint

Usually **1--4 weeks**

Each Sprint includes: - Sprint Planning - Development - Testing - Sprint
Review - Sprint Retrospective

### Deployment in Agile

A sprint produces a **potentially shippable increment**.

Deployment: - may happen after every sprint, - after multiple sprints, -
or whenever the business decides.

> **Agile does NOT require deployment after every sprint.**

---

## Scrum

### Definition

Scrum is the most popular **Agile framework**.

### Roles

- Product Owner
- Scrum Master
- Development Team

### Ceremonies

- Sprint Planning
- Daily Stand-up
- Sprint Review
- Sprint Retrospective
- Backlog Refinement

### Artifacts

- Product Backlog
- Sprint Backlog
- Product Increment

---

## DevOps

### Definition

DevOps is a culture and set of engineering practices that brings
Development and Operations together using automation, CI/CD, monitoring,
and collaboration.

### Goals

- Faster delivery
- Automation
- Reliable deployments
- Continuous feedback
- Improved collaboration

### DevOps Lifecycle

Planning → Code → Build → Test → Release → Deploy → Operate → Monitor →
Feedback → Planning

### Common Tools

  Phase             Examples

---

  Version Control   Git, Azure Repos
  Build             Maven, Gradle
  CI/CD             Jenkins, Azure DevOps
  Testing           Selenium
  Deployment        Docker, Kubernetes, Ansible
  Monitoring        Nagios, Prometheus, Grafana

---

# 3. Relationship Between Terms

```text
SDLC
│
├── Waterfall (Methodology)
│
└── Agile (Methodology)
      │
      ├── Scrum (Framework)
      ├── Kanban
      ├── XP
      └── Lean

DevOps
↳ Complements Agile by automating build, test, deployment and operations.
```

---

# 4. Agile Work Hierarchy

```text
Epic
 └── Feature
      └── User Story
            ├── Task(s)
            └── Bug(s)
```

## Epic

Large business objective spanning multiple sprints/releases.

Example: - Patient Data Platform

## Feature

Major functionality.

Example: - Incremental Patient Ingestion

## User Story

Format:

> As a `<user>`{=html}, I want `<feature>`{=html} so that
> `<benefit>`{=html}.

Example:

> As a Data Analyst, I want patient data loaded every 4 hours so reports
> stay current.

## Task

Technical work needed to complete a story.

Examples: - Create notebook - Develop PySpark logic - Configure
pipeline - Unit test - Code review

## Bug

Defect found during testing or production.

Example: - Watermark not updating after failed run.

---

# 5. Typical Timeline

  Item         Duration

---

  Epic         Months
  Feature      One or more releases
  User Story   One Sprint
  Task         Hours to Days
  Bug          Until fixed

---

# 6. What Our Project Used

- **Methodology:** Agile
- **Framework:** Scrum
- **Delivery Practices:** DevOps
- **Version Control:** Git / Azure Repos
- **CI/CD:** Azure DevOps Pipelines
- **Execution:** Databricks Workflows

Typical flow:

Sprint Planning → Development → Git Commit → CI Pipeline → Testing →
Deploy (Dev → QA/UAT → Prod) → Monitor → Feedback

---

# 7. Interview Cheat Sheet

### What is SDLC?

SDLC is the structured lifecycle used to plan, design, develop, test,
deploy, and maintain software.

### Waterfall vs Agile

- Waterfall is sequential with fixed requirements.
- Agile is iterative with continuous feedback.

### Agile vs Scrum

- Agile = methodology/philosophy.
- Scrum = framework that implements Agile.

### Agile vs DevOps

- Agile focuses on **how software is developed**.
- DevOps focuses on **how software is built, tested, deployed, and
  operated efficiently**.

### What is DevOps?

DevOps is a culture and set of practices that integrates Development and
Operations using automation, CI/CD, monitoring, and continuous feedback.

### Does Agile deploy after every sprint?

No. Every sprint produces a potentially shippable increment. Deployment
depends on the project's release strategy.

### Difference: Epic, Feature, User Story, Task, Bug

- Epic → Large business objective
- Feature → Major functionality
- User Story → Small business requirement
- Task → Technical work
- Bug → Defect

---

# 8. Key Takeaways

- SDLC is the lifecycle.
- Waterfall and Agile are development methodologies.
- Scrum is an Agile framework.
- DevOps complements Agile with automation and CI/CD.
- Every Scrum project is Agile, but not every Agile project uses
  Scrum.
- Agile does not mandate deployment after every sprint.
- Organize work as: Epic → Feature → User Story → Task/Bug.
