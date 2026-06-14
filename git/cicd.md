---
layout: default
title: Git Notes
permalink: /cicd/
---


# CI/CD Pipeline — Azure Databricks + Azure DevOps
### Complete Revision Notes (All 6 Parts)

---

## 🗺️ Big Picture — End-to-End Flow

```
Developer (Databricks feature branch)
        ↓ commit + push
PR → reviewer approves → merge to main (Azure DevOps)
        ↓ auto-trigger
CI Pipeline (Azure DevOps, Windows Agent):
  • authenticate via Service Connection
  • get Dev Databricks workspace info (ID + URL)
  • generate bearer token
  • copy notebook/ → /live/ (Dev Databricks workspace)
        ↓ CI success + depends_on satisfied
⏸ PAUSE — Approval Gate (email to tech lead / ops)
        ↓ approver reviews Dev, then approves
CD Pipeline:
  • same steps with Prod credentials
  • copy notebook/ → /live/ (Prod Databricks workspace)
        ↓
ADF Dev → Dev live/  ✅   |   ADF Prod → Prod live/  ✅
         Always latest approved code in both environments
```

---

## Part 1 — Repo & Workspace Setup

### Azure DevOps Project Setup
- `dev.azure.com/<org_name>` → New Project → name: `Databricks CI CD` → Private → Git
- Repos → New Repository → name: `Databricks CI CD Tutorial` → enable **Add README** → initializes `main` branch
- `main` branch = the only branch that triggers CI/CD

### Integrate DevOps Repo with Dev Databricks
- Databricks → Repos → Add Repo → paste HTTPS clone URL from DevOps
- Authentication: ✅ **AAD (Azure Active Directory)** — same user in both Databricks + DevOps, no token needed
- Enable "Create repo by cloning" → repo files copied into Databricks workspace
  
### Protect the Main Branch
- Repos → Branches → `main` → ⋯ → **Branch Policies**
- Enable: **"Require minimum number of reviewers"** → set to **1**
- Enable **"Allow requesters to approve their own changes"** → only for demo, NOT prod
- Once enabled → **direct commits to main are blocked**; changes must go via PR
- Real-world best practice: **tech lead / senior dev** reviews PRs, not the same person who raised it

### Key Concepts
| Concept | Reason |
|---------|--------|
| AAD over PAT | No token management; uses existing user identity |
| Protect main | Enforce code review; prevent accidental direct pushes |
| Feature branch from main | Gets exact copy of stable code |
| Delete branch after merge | Clean repo; avoids confusion |
| Commit ≠ synced to DevOps | Must explicitly commit + push |

---

## Part 2 — CI Pipeline: Concept & Repo Organization

### What the CI Pipeline Does
- Triggers **automatically** when changes merge to `main`
- Creates a `/live/` folder inside **Dev** Databricks workspace
- Copies latest `notebook/` folder from main branch → `/live/`
- ADF pipelines always point to `/live/` — never to repos location
- After CI completes → CD pipeline triggers → deploys `/live/` to **Prod**

### Why the `live/` Folder? (Key Interview Concept)

**Problem:** ADF notebook activities point to a specific user's repos path (e.g., `Mr.K/repos/...`). If another engineer merges changes to main, Mr.K's repos path won't reflect those changes until manually pulled. Also, **ADF cannot directly reference the main branch of an Azure DevOps repo**.

**Solution:**
```
Main Branch (DevOps)
      ↓ CI Pipeline copies
Live Folder (Dev Databricks)   ← ADF always points here
      ↓ CD Pipeline copies
Live Folder (Prod Databricks)  ← ADF always points here
```

### Organizing the Repo Before CI

Why: repo had mixed files (notebooks + README). CI should deploy **only notebooks**.

**Final repo structure:**
```
repo/
├── notebook/
│   ├── bronze_to_silver
│   ├── silver_to_gold
│   └── storage_mount
└── extra/
    └── README.md
```
> CI pipeline deploys **only `notebook/`** — `extra/` is never pushed to prod(weconfigured that way,else it will pushes).

### Key Concepts
| Concept | Detail |
|---------|--------|
| live/ folder | ADF's stable reference; always = latest main branch code |
| Why organize repo | Deploy only notebooks, not README or other files |
| CI triggers | Any merge to main branch |
| CD triggers | After CI succeeds |

---

## Part 3 — CI Pipeline: YAML Code Walkthrough

### File Structure
```
ci_cd/
├── scripts/
│   └── databricks_token.ps1      ← generates bearer token for Databricks auth
├── templates/
│   └── deploy_notebooks.yml      ← template: actual deployment logic (reused for dev + prod)
└── ci_cd_pipeline.yml            ← master file: entry point, triggers pipeline
```

**Call Chain:**
```
ci_cd_pipeline.yml (master)
        ↓ calls
deploy_notebooks.yml (template)
        ↓ calls
databricks_token.ps1 (PowerShell script)
```

### Master File — `ci_cd_pipeline.yml`
```yaml
trigger:
  - main                          # fires on every merge to main

variables:
  - group: dbw_cd_dev             # pulls from Azure DevOps variable group 

parameters:
  vm_image_name: windows-latest   # Windows compute agent
  notebooks_path: notebook        # only deploy files inside notebook/ folder

pool:
  vmImage: $(vm_image_name)

stages:
  - template: templates/deploy_notebooks.yml
    parameters:
      stage_id: deploy_to_dev_environment
      env: dev
      environment_name: $(environment_name)
      resource_group_name: $(dev_resource_group)
      service_connection: $(service_connection)
      notebooks_path: $(notebooks_path)
```

**Key points:**
- `trigger: main` → auto-fires on every merge, no manual trigger needed
- `notebooks_path: notebook` → only `notebook/` folder deployed
- All environment-specific values come from **variable groups** (not hardcoded)
- Master file calls template and **passes all params**

### Variable Groups (Azure DevOps Library)
**Why:** Dev and Prod have different workspace names, resource groups etc. Each environment gets its own variable group.

**How to create:** DevOps → Pipelines → Library → Variable Groups → New → add variables → Save

**Dev variable group** (`dbw_cd_dev`):
| Variable | Value |
|----------|-------|
| `environment_name` | `Dev Environment Databricks CI CD` |
| `dev_resource_group_name` | `org_data_engineering_project` |
| `service_connection` | `Dev Service Connection` |

### Environment (Azure DevOps)
- DevOps → Pipelines → Environments → Create
- Name: `Dev Environment Databricks CI CD` | Resource: **None**
- Purpose: Track all deployment history (success/failure) in one place
- YAML references: `environment: $(environment_name)`

### Service Connection (Most Important)
**Why needed:** CI/CD pipeline (Azure DevOps) needs access to Azure resources (Databricks workspace). Can't add Azure DevOps directly to resource group IAM.

**Solution:** Service Connection auto-creates a **Service Principal** → assigns it **Contributor access** to the resource group.

**How to create:**
- Project Settings → Service Connections → New
- Type: **Azure Resource Manager** | Auth: **Service Principal (Automatic)**
- Scope: Dev resource group → Name: `Dev Service Connection`
- ❌ Do NOT check "Grant access to all pipelines" (grant manually per pipeline)

### Key Concepts
| Concept | Detail |
|---------|--------|
| `trigger: main` | Pipeline fires on every merge to main |
| Variable Groups | Env-specific values — no hardcoding |
| Pool / Agent | Microsoft-hosted Windows VM runs the pipeline |
| Service Connection | Bridges Azure DevOps ↔ Azure resources via Service Principal |
| Service Principal | Auto-created; gets Contributor access to resource group |
| Bearer Token | Required to authenticate into Databricks workspace |
| `notebooks_path: notebook` | Only `notebook/` deployed — not README or extras |
| `depends_on: null` | Dev runs independently; Prod depends on Dev |
| Template reuse | Same `deploy_notebooks.yml` used for both Dev and Prod |
| Environment | Tracks deployment history per environment |

---

## Part 4 — CI Pipeline: Creating & Testing


### Step 2: Create the Pipeline in Azure DevOps
- Pipelines → Create Pipeline → Source: **Azure Repos Git YAML**
- Repo: `Databricks CI CD Tutorial`
- Config: **Existing Azure Pipelines YAML file** → Branch: `main` → Path: `/ci_cd/ci_cd_pipeline.yml`
- Click **Save** (not Run yet)

### Step 3: Grant Pipeline Permissions (3 Mandatory Places)
> ⚠️ Pipeline will fail without ALL 3 permissions.

| Resource | Where to grant |
|----------|---------------|
| **Environment** | Pipelines → Environments → `Dev Environment...` → Security → Pipeline Permissions → add pipeline |
| **Variable Group** | Pipelines → Library → `dbw_cd_dev` → Pipeline Permissions → add pipeline |
| **Service Connection** | Project Settings → Service Connections → `Dev Service Connection` → Security → Pipeline Permissions → add pipeline |

### Step 4: Test the CI Pipeline
1. Create branch `testing_ci_pipeline` from main (in Databricks)
2. Inside `notebook/` → create `test_ci_notebook` → code: `print(1 + 1)`
3. Commit + push → PR → approve → merge to main → delete branch
4. Pipeline auto-triggers ✅ → monitor in Pipelines tab

### Step 5: Validate Results
- Databricks workspace → refresh → new `/live/` folder appears ✅
- Inside `/live/`: all 3 original notebooks + `test_ci_notebook` ✅
- Pipelines → Environments → `Dev Environment...` → shows deployment history ✅

### Step 6: Update ADF to Point to `live/`
- ADF Studio → pipeline → each notebook activity → Browse → select from `/live/` folder
- Publish ADF changes
- Now ADF always runs from `live/` = always latest code ✅

---

## Part 5 — CD Pipeline: Creating & Testing

### What CD Pipeline Does
- Triggers after CI pipeline completes successfully
- Copies latest `notebook/` from main branch → `/live/` in **Prod** Databricks workspace
- Result: Dev `live/` = Prod `live/` = exact copy of main branch


**Prod Variable Group** (`dbw_cd_prod`):
| Variable | Value |
|----------|-------|
| `environment_name` | `Prod Environment Databricks CI CD` |
| `prod_resource_group_name` | `org_data_engineering_project_prod` |
| `service_connection` | `Prod Service Connection` |

**Prod Environment:** Pipelines → Environments → New → `Prod Environment Databricks CI CD` → None → Create

**Prod Service Connection:**
- Project Settings → Service Connections → New → Azure Resource Manager → Service Principal (Automatic) → Scope: **Prod resource group** → Name: `Prod Service Connection`
- Auto-creates SP with Contributor access to Prod resource group ✅

**Grant Permissions (same 3 places, for Prod resources):**
- Prod Variable Group → Pipeline Permissions → add pipeline
- Prod Environment → Security → Pipeline Permissions → add pipeline
- Prod Service Connection → Security → Pipeline Permissions → add pipeline

### The `depends_on` Fix (Critical!)

**Problem:** Without `depends_on`, both Dev and Prod stages run **in parallel** — if Dev fails, Prod still runs. Dangerous!

**Fix in template file:**
```yaml
parameters:
  - depends_on: null    # default for dev stage (runs independently)

stages:
  - stage: ${{ parameters.stage_id }}
    dependsOn: ${{ parameters.depends_on }}
    # Dev stage  → dependsOn: null           (runs first, independently)
    # Prod stage → dependsOn: deploy_to_dev  (waits for dev success)
```

**Result:**
```
Dev Stage (runs first)
        ↓ only if success
Prod Stage (runs after)  ✅
        (if dev fails → prod never runs)
```

### Key Concepts
| Concept | Detail |
|---------|--------|
| CD changes are minimal | Same template reused, just prod params passed |
| `depends_on: null` | Dev stage — runs independently |
| `depends_on: deploy_to_dev` | Prod stage — waits for dev success |
| Parallel vs sequential | Before fix = parallel (risky), after fix = sequential (safe) |

---

## Part 6 — Environment Protection & Final E2E Testing

### Problem with Current Setup (Before This Part)
- After Dev stage completes → Prod stage starts **immediately**
- Real projects need:
  - Change request raised and approved
  - Deployment only after office hours (e.g., after 5 PM)
  - Approval from tech lead / ops team
- Previous setup had none of this → **not production-ready**

### Solution: Approval Gate on Prod Environment

**What it does:**
- Dev stage completes → pipeline **pauses**
- Approver receives **email from Azure DevOps**
- Prod stage runs **only after manual approval**
- Approver can also **reject** to block deployment

**How to configure:**
- DevOps → Pipelines → Environments → `Prod Environment Databricks CI CD`
- Approvals and Checks → `+` → **Approvals** → add approver (tech lead / ops)
- Click **Create**

> ✅ Only configure on **Prod** — Dev deploys instantly, no gate needed.

### Key Concepts — Interview Ready
| Concept | Detail |
|---------|--------|
| Why approval gate? | Prod deployments need planning/approval — not instant |
| Who approves? | Tech lead / ops team — **not** the developer |
| What if rejected? | Pipeline stops — prod not deployed |
| Pipeline waits how long? | Until approved or rejected — no timeout by default |
| `depends_on` + approval gate | **Two layers** of prod protection |
| Dev live/ vs Prod live/ | Both = exact copy of main branch after respective stages |
| ADF always points to live/ | Never repos — ensures always latest approved code |
| Review button visibility | Only visible to **configured approvers** |
| Real-world parallel | Change request process in organizations |

---
## ⚡ Quick Reference — Cheat Sheet

### Branching Rules
- Always create feature branch **from main**
- Never push directly to main (protected)
- Delete feature branches after merge

### 3 Mandatory Pipeline Permissions
1. Environment → Security → Pipeline Permissions
2. Variable Group → Pipeline Permissions
3. Service Connection → Security → Pipeline Permissions

### Order of Operations (Always)
1. Write YAML code in VS Code (feature branch)
2. PR → merge to main
3. Create / update pipeline in Azure DevOps
4. Grant permissions
5. Test (create notebook → PR → merge → watch pipeline)

### Key Files
| File | Role |
|------|------|
| `ci_cd_pipeline.yml` | Master — entry point, trigger, variable groups, calls template |
| `deploy_notebooks.yml` | Template — reused for dev + prod stages |
| `databricks_token.ps1` | PowerShell — generates bearer token for Databricks auth |

### Key Variables per Environment
| Variable | Dev | Prod |
|----------|-----|------|
| Variable Group | `dbw_cd_dev` | `dbw_cd_prod` |
| Environment Name | `Dev Environment Databricks CI CD` | `Prod Environment Databricks CI CD` |
| `depends_on` | `null` | `deploy_to_dev_environment` |
| Approval Gate | ❌ None | ✅ Required |

### Common Mistakes to Avoid
| Mistake | Correct Approach |
|---------|-----------------|
| Create pipeline before merging YAML | Merge first, then create pipeline |
| Allow requestors to approve own PRs | Have a different reviewer (only OK in demo) |
| Hardcode env values in YAML | Use variable groups |
| ADF pointing to repos location | ADF must point to `/live/` folder |
| Both stages run in parallel | Use `depends_on` for sequential execution |
| Prod deploys without approval | Configure approval gate on Prod environment |
| Grant all pipelines access to service connection | Grant per-pipeline manually |
