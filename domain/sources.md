---
layout: default
title: Sources
permalink: /Sources/
---
## End Goal

We build a data pipeline for a US healthcare client on Azure Databricks. We pull clinical and financial data from PostgreSQL and flat files, process it through Medallion architecture — Bronze, Silver, Gold — and serve finance, clinical, and BI teams through Gold views refreshed every 4 hours. The outcome is faster visibility into claim denials,days in AR, prior Auth Approval rate etc — all from one trusted layer instead of teams querying raw databases.

# Data Sources Cheat Sheet — US Healthcare Project

---

## Source 1 — PostgreSQL (Client's Internal OLTP System)

**Ingestion:** Incremental via `updated_at` watermark | **Destination:** Bronze (Parquet) → Silver (Delta) → Gold (Delta)

| Table                       | Key Columns                                                                  | What It Means                                                             | Fact/Dim     | Frequency |
| --------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------ | --------- |
| `patients` / `members`  | patient_id, member_id, dob, insurance_plan_id, enrollment_start/end          | Master patient registry — demographics, insurance plan, enrollment dates | Dim (SCD2)   | On change |
| `encounters` / `visits` | encounter_id, patient_id, encounter_type, admission_date, drg_code, los_days | Every clinical visit — inpatient, outpatient, ER, telehealth             | Fact         | Daily     |
| `claims`                  | claim_id, encounter_id,patient_id, billed_amount, paid_amount, provider_npi  | Billing records the client submits to the payer (insurance company)       | Fact         | Daily     |
| `diagnoses`               | diagnosis_id, encounter_id, icd10_code, diagnosis_type                       | ICD-10 codes attached to each encounter                                   | Fact (child) | Daily     |
| `procedures`              | procedure_id, encounter_id, cpt_code, procedure_date                         | CPT codes — what procedures were done per visit                          | Fact (child) | Daily     |
| `providers`               | provider_id, npi, specialty_code, in_network_flag, contract_start/end        | Provider master — NPI, specialty, in-network status, contract dates      | Dim (SCD2)   | On change |

---

## Source 2 — CSV Files (ADLS Gen2 Landing Zone)

**Who sends them:** External parties — payers, clearinghouses | **Ingestion:** Filename date or ingest_date partition (no watermark)

| File                                 | Who Sends It                    | Key Columns                                                                        | What It Means                                                                                             | Fact/Dim  | Frequency            |
| ------------------------------------ | ------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------- | -------------------- |
| `payer_auth_response_YYYYMMDD.csv` | Payer/clearingHouse             | auth_id,auth_status,payer_id,claim_id,auth_start_date,auth_end_date, denial_reason | Payer's decision on prior authorization requests — approved or denied, units authorized, validity window | Fact      | Daily                |
| `claims_adjudication_YYYYMMDD.csv` | Clearinghouse / Payer           | claim_id, paid_amount, denial_code, claim_status, payment_date                     | Adjudication result — approved/denied, paid amount, denial codes. Updates Gold claims via MERGE          | Fact      | Daily                |
| `icd10_reference.csv`              | CMS (we download, drop to ADLS) | icd10_code, description                                                            | Code to description mapping for ICD-10 — 70K+ codes                                                      | Reference | Annual (full reload) |
| `cpt_reference.csv`                | CMS (we download, drop to ADLS) | cpt_code, description                                                              | Code to description mapping for CPT procedures — 10K+ codes                                              | Reference | Annual (full reload) |

---

## Source 3 — Excel Files (ADLS Gen2)

**Who sends them:** Internal business teams | **Ingestion:** Ad-hoc / scheduled uploads — not real-time

| File                          | Who Sends It       | Key Columns                                                    | What It Means                                                                                                                         | Fact/Dim  | Frequency |
| ----------------------------- | ------------------ | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------- | --------- |
| fee_schedule_YYYY.xlsx        | Finance team       | cpt_code, payer, allowed_amount, effective_date                | What each payer has contractually agreed to reimburse for each CPT code — used to compute expected vs actual reimbursement           | Reference | Annual    |
| provider_roster_MMM_YYYY.xlsx | Credentialing team | npi, specialty, contract_tier, in_network_flag, effective_date | Manual credentialing updates — contract tier and in-network status per provider, used to determine network status at time of service | Reference | Monthly   |

###### Key Definitions

**In-network flag:** Indicates whether a provider has a contract with a payer. In-network claims usually have predictable reimbursement and lower patient costs, while out-of-network claims have higher denial risk and less predictable payments. Used to analyze denials and reimbursements. |
**Contract tier:** The specific reimbursement level negotiated between a provider and payer,within-in-network flag. It varies by provider (NPI) based on factors like specialty, volume, and bargaining power, and is used to analyze reimbursement differences across providers and service lines.

**Why Excel is justified:** Both are low-frequency, human-managed internal business processes. No system generates fee schedules or credentialing rosters automatically. Annual/monthly cadence makes them operationally safe as Excel.

---

---

## Cadence Rationale — Defensible

| Source              | Cadence                         | Why                                                                                                                                                                            |
| ------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| PostgreSQL          | Every 4 hours                   | Clinical/claims data changes intraday. Finance/ops need same-day visibility into submissions, not just next-day. Not real-time — batch is appropriate, but daily is too slow. |
| CSV transactional   | Daily, fixed cutoff (e.g. 7 AM) | Payer/clearinghouse sends one batch file per day. Checking more often wastes compute — there's nothing to pull. CSV is exactly as fresh as the vendor allows.                 |
| CSV/Excel reference | Monthly or annual               | Matches business cycle — CMS publishes ICD-10 annually, finance renegotiates fee schedules annually, credentialing reviews rosters monthly.                                   |

**Mixed cadence is standard, not a flaw.** Each source refreshes based on when its data actually changes, not to match an artificial uniform schedule.

---

---

# Silver Layer — Quick Reference

## Common Steps Applied to Every Table

- Snake_case column standardization
- Type casting (dates, decimals, booleans) to enforce consistent schema
- Null value handling — drop rows with critical nulls (business key, foreign key, or required field) and log them for review
- Source-aligned cleaning only — no business logic here (that's Gold)

---

## Transactional Tables (MERGE Pattern)

| Table                   | Merge Key    | Critical Null Drop                 |
| ----------------------- | ------------ | ---------------------------------- |
| patients                | patient_id   | patient_id                         |
| providers               | npi          | npi                                |
| encounters              | encounter_id | encounter_id, patient_id           |
| claims                  | claim_id     | claim_id, patient_id, encounter_id |
| diagnoses               | diagnosis_id | diagnosis_id, icd10_code           |
| procedures              | procedure_id | procedure_id, cpt_code             |
| claims_adjudication     | claim_id     | claim_id                           |
| payer_auth_response     | auth_id      | auth_id, patient_id                |

---

## Reference Tables (Full Truncate-Reload Pattern — No Merge Key) Till silver Only

| Table           | Source         | Reload Trigger   | Notes                                      |
| --------------- | -------------- | ---------------- | ------------------------------------------ |
| icd10_reference | CSV, annual    | New file arrival | Controlled vocabulary, no null-drop needed |
| cpt_reference   | CSV, annual    | New file arrival | Controlled vocabulary, no null-drop needed |
| fee_schedule    | Excel, annual  | New file arrival | allowed_amount cast to Decimal(10,2)       |
| provider_roster | Excel, monthly | New file arrival | in_network_flag cast to boolean            |

---

## One-Line Rule to Remember

**Transactional tables → MERGE on business key, dedup via ROW_NUMBER() before merge.**
**Reference tables → full reload, no business key needed since the whole file is the complete dataset.**

---

---

## Gold Layer

---

## Dimension Tables — SCD Type 2 (Close-and-Insert MERGE)

| Table         | Pulled From      | Merge Key  | What Triggers New Version                         | Versioning Columns              |
| ------------- | ---------------- | ---------- | ------------------------------------------------- | ------------------------------- |
| dim_patients  | silver.patients  | patient_id | Change in insurance_plan_id, enrollment_start/end | start_date, end_date, is_active |
| dim_providers | silver.providers | npi        | Change in specialty_code, contract_start/end      | start_date, end_date, is_active |

**Context:** Kept single-source deliberately — dim_providers does NOT merge with provider_roster (that's a standalone reference table instead, see below). This avoids fragile multi-source SCD2 reconciliation logic.

---

## Fact Tables — Upsert MERGE (Latest State, Not Versioned)

| Table                    | Pulled From                | Joined To                                                                                                                                  | Merge Key    | Derived Columns                                                                                                            |
| ------------------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------- |
| fact_encounters          | silver.encounters          | dim_patients (patient_id), dim_providers (provider_npi)                                                                                    | encounter_id | None significant — pass-through with dimension context attached                                                           |
| fact_claims              | silver.claims              | dim_patients, dim_providers, ref_fee_schedule (cpt_code+payer_id), fact_claims_adjudication (claim_id), ref_provider_roster (provider_npi) | claim_id     | days_in_ar, ar_bucket, expected_reimbursement, actual_reimbursement, reimbursement_gap, underpayment_flag, in_network_flag |
| fact_diagnoses           | silver.diagnoses           | ref_icd10 (icd10_code<br />)                                                                                                               | diagnosis_id | diagnosis_description                                                                                                      |
| fact_procedures          | silver.procedures          | ref_cpt (cpt_code)                                                                                                                         | procedure_id | procedure_description                                                                                                      |
| fact_claims_adjudication | silver.claims_adjudication | fact_claims (claim_id)                                                                                                                     | claim_id     | denial_flag, denial_reason                                                                                                 |
| fact_payer_auth_response | silver.payer_auth_response | fact_encounters (patient_id+cpt_code, date range)                                                                                          | auth_id      | auth_match_flag, service_before_auth_flag, units_utilized                                                                  |

Gold Layer - Derived Business Columns

- **days_in_ar:** datediff(current_date, claim_submission_date) WHERE claim_status != 'PAID'
- **ar_bucket:** CASE on days_in_ar (0-30/31-60/61-90/90+)
- **expected_reimbursement:** pulled from ref_fee_schedule.allowed_amount via join
- **actual_reimbursement:** pulled from fact_claims_adjudication.paid_amount via join
- **reimbursement_gap:** expected_reimbursement - actual_reimbursement
- **underpayment_flag:** `1` if `reimbursement_gap > 0`, else `0`.
- **in_network_flag:** ref_provider_roster.in_network_flag
- **denial_flag:** `1` if the claim status is **DENIED**, else `0`.
- **auth_match_flag:** `1` if the encounter falls within an approved authorization period.
- **service_before_auth_flag:** `1` if the service occurred before the authorization start date.

## Reference Tables — Standalone (Full Reload, Joined Where Needed, No MERGE)

| Table               | Pulled From            | Used By (Joined Into)                                        |
| ------------------- | ---------------------- | ------------------------------------------------------------ |
| ref_icd10           | silver.icd10_reference | fact_diagnoses (code description)                            |
| ref_cpt             | silver.cpt_reference   | fact_procedures, fact_claims (code description, CPT context) |
| ref_fee_schedule    | silver.fee_schedule    | fact_claims (expected_reimbursement calc)                    |
| ref_provider_roster | silver.provider_roster | fact_claims (in_network_flag at time of claim)               |

**Context:** This is the deliberate simplification — provider_roster and fee_schedule are NOT merged into dimensions or fact tables directly. They sit as standalone lookup tables and get joined wherever needed. No SCD2, no MERGE complexity, easy to defend.

---

## Quick Reference — Gold Layer Treatment

| Category                 | Tables                                                        |
| ------------------------ | ------------------------------------------------------------- |
| SCD Type 2 (MERGE)       | patients, providers                |
| Upsert via MERGE         | encounters, claims, claims_adjudication                       |
| Full reload (reference)  | icd10_reference, cpt_reference, fee_schedule, provider_roster |
| PII / HIPAA sensitive    | patients (ssn_hash), Address, Phonenumber                     |

---

---

## Orchestration — 7 Databricks Workflow Jobs

### Job 1 — Bronze PostgreSQL

- **Trigger:** Every 4 hours, cron
- **Tasks:** 6 parallel, independent DAG nodes
- **Failure:** Retry 2x → pipeline fails → DE on-call → manual fix and rerun. Watermark unchanged, safe reprocessing.
- **Control table:** Writes SUCCESS or FAILED per table per run

### Job 2 — Bronze Daily CSV

- **Trigger:** Once daily, fixed cutoff time (e.g. 7 AM)
- **Tasks:** 2 parallel ( adjudication, auth_response)
- **File check:** Single existence check, no polling. Present → process. Absent → SKIPPED_FILE_NOT_FOUND, ops alert, continue.
- **Control table:** Writes SUCCESS or SKIPPED_FILE_NOT_FOUND per file

### Job 3 — Silver + Gold Core

- **Trigger:** After Job 1 completes (Workflows job dependency)
- **Runs:** Every 4 hours
- **Stage 1 — Silver (parallel):**
  - 8 transactional Silver tasks
  - CSV-backed tasks check control table first — if SKIPPED_FILE_NOT_FOUND → no-op, carry forward
  - Dedup → null handling → MERGE
- **Stage 2 — Gold Dims (after Silver):**
  - 2 tasks: dim_patients, dim_providers
  - SCD2 MERGE — no-op if nothing changed
- **Stage 3 — Gold Facts (parallel with Dims, after Silver):**
  - 6 tasks — join to dims + reference tables, derive business columns, upsert MERGE
  - CSV-backed fact tasks complete as no-op on cycles where Silver had no new data
- **No aggregation stage** — BI builds on top of enriched facts via views

### Jobs 4–7 — Reference Source Pipelines (Self-Contained E2E)

| Job                      | Schedule | Source | Pattern                                                        |
| ------------------------ | -------- | ------ | -------------------------------------------------------------- |
| Job 4 — icd10           | Annual   | CSV    | Bronze → Silver (reload) → Gold (reload ref_icd10)           |
| Job 5 — cpt             | Annual   | CSV    | Bronze → Silver (reload) → Gold (reload ref_cpt)             |
| Job 6 — fee_schedule    | Annual   | Excel  | Bronze → Silver (reload) → Gold (reload ref_fee_schedule)    |
| Job 7 — provider_roster | Monthly  | Excel  | Bronze → Silver (reload) → Gold (reload ref_provider_roster) |

Each job: 3 sequential tasks, linear dependency, fully independent of Jobs 1–3.

### Control Table — Single Mechanism Across All 7 Jobs

Delta table: `job_name | table_name | run_id | status | rows_written | timestamp`

| Column             | Type      | Purpose                                            |
| ------------------ | --------- | -------------------------------------------------- |
| `pipeline_name`  | STRING    | Bronze_Postgres, Bronze_CSV, Silver, Gold          |
| `source_name`    | STRING    | claims, patients, ==eligi==bility, provider_roster |
| `run_id`         | STRING    | Unique pipeline execution ID                       |
| `business_date`  | DATE      | Business date of the data/file                     |
| `file_name`      | STRING    | CSV/Excel filename (NULL for PostgreSQL)           |
| `status`         | STRING    | SUCCESS, FAILED, SKIPPED_FILE_NOT_FOUND            |
| `rows_processed` | BIGINT    | Number of records processed                        |
| `start_time`     | TIMESTAMP | Pipeline start time                                |
| `end_time`       | TIMESTAMP | Pipeline completion time                           |
| `error_message`  | STRING    | Error details if failed                            |

**PostgreSQL tasks also write to control table** — not for skip logic, but for audit trail and partial rerun efficiency (know which tables already succeeded if rerunning after a fix).

### Dependency Chain

```
Job 1: Bronze PostgreSQL (4hr)
    │
    ▼
Job 3: Silver + Gold Core (4hr)
    ├── Silver MERGE (all 8 transactional tables)
    ├── Gold Dims SCD2 (after Silver)
    └── Gold Facts upsert (after Silver, parallel with Dims)
 
Job 2: Bronze Daily CSV (daily 7AM)
    │ (writes to control table)
    └── Silver CSV tasks pick up status on next Job 3 cycle
 
Jobs 4-7: Reference E2E pipelines (own cron, fully independent)
    └── Gold reference tables updated, joined into facts on next Gold run
```

---

## Consumption

- **BI team:** Power BI connects to views on top of Gold Delta tables — never raw tables directly
- **Data science team:** Delta time travel on Gold facts for historical model training
- **Finance / ops teams:** Consume via BI views — claim denial patterns, days in AR, reimbursement gaps, prior auth compliance

---

## Senior Keywords — Say These Out Loud

`incremental watermark` · `idempotent` · `cumulative Delta table` · `MERGE on business key` · `dedup on incoming batch before MERGE` · `SCD Type 2 close-and-insert` · `full reload for reference data` · `pipeline control table` · `status-driven downstream processing` · `single file-presence check, no polling` · `Delta ACID atomic commit or rollback` · `graceful skip vs hard failure` · `task-level isolation in DAG` · `source-aligned Silver, consumption-aligned Gold` · `derived columns where business rules live` · `Delta time travel` · `Photon-enabled MERGE workloads`

---

## What Not to Say

- ~~"We build KPIs"~~ → say "we build the data layer that powers those metrics"
- ~~"We joined with stakeholders to define KPI formulas"~~ → say "we implement against specs from BI/business analysts"
- ~~"Silver does SCD Type 2"~~ → SCD2 is Gold only. Silver holds current state via MERGE upsert.
- ~~"Snowflake"~~ → not in this architecture. Don't mention it.
- ~~"CSV refreshes every 4 hours"~~ → CSV is daily, vendor sends once per day
- ~~"Daily census Excel"~~ → removed. Not in final design.
- ~~"Lab results CSV"~~ → removed. Didn't connect to any Gold output.

---

## cluster strategy

We use job clusters across all pipelines — DBR 16.4 LTS(spark 3.5.2 , scala 2/12), standard DS3_v2(14 gb memory,4cores) autoscaling on Silver and Gold(1 to 8), Photon enabled where MERGE and aggregations benefit. Pipeline processes 8 to 10 GB per run, 45 to 50 GB daily.

# Requirement Documents (Quick Revision)

## 1. Functional Requirements

**What to build**

- Business objective
- Features
- Refresh frequency
- High-level requirements

Example: Refresh claims data every 4 hours.

---

## 2. Mapping Document

**How to build**

- Source → Target mapping
- Data types
- Transformation rules
- Join keys

Example: patients.name → dim_patient.patient_name (Trim)

---

## 3. Required Fields

**What columns are needed**

- Mandatory output columns
- Target schema

Example: claim_id, patient_id, claim_status

---

## 4. Business Rules

**How data should behave**

- Validation
- Filtering
- Default values
- SCD/Derived logic

Example: NULL status → "PENDING"

---

## 5. Expected Output

**How to verify**

- Sample output
- Expected values
- Validation dataset

Used to compare actual vs expected results.

---

## Data Engineer Role

- Understand requirements
- Clarify ambiguities
- Implement transformations
- Validate output

