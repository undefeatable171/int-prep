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

**Who sends them:** External parties — payers, lab vendors, clearinghouses | **Ingestion:** Filename date or ingest_date partition (no watermark)

| File                                 | Who Sends It                     | Key Columns                                                                                               | What It Means                                                                                    | Fact/Dim  | Frequency            |
| ------------------------------------ | -------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | --------- | -------------------- |
| `eligibility_extract_YYYYMMDD.csv` | Payer (insurance company)        | member_id, plan_id, effective_date, termination_date                                                      | Payer's version of member enrollment                                                             | Dim       | Daily                |
| `lab_results_YYYYMMDD.csv`         | Lab vendor (Quest/LabCorp style) | patient_id,encounter_id, order_id(lab internal), loinc_code, result_value, abnormal_flag, collection_date | Test results per patient — LOINC codes(what test done), result values, abnormal flags           | Fact      | Daily                |
| `claims_adjudication_YYYYMMDD.csv` | Clearinghouse / Payer            | claim_id, paid_amount, denial_code, claim_status, payment_date                                            | Adjudication result — approved/denied, paid amount, denial codes. Updates Gold claims via MERGE | Fact      | Daily                |
| `icd10_reference.csv`              | CMS (we download, drop to ADLS)  | icd10_code, description                                                                                   | Code to description mapping for ICD-10 — 70K+ codes                                             | Reference | Annual (full reload) |
| `cpt_reference.csv`                | CMS (we download, drop to ADLS)  | cpt_code, description                                                                                     | Code to description mapping for CPT procedures — 10K+ codes                                     | Reference | Annual (full reload) |

---

## Source 3 — Excel Files (ADLS Gen2)

**Who sends them:** Internal business teams | **Ingestion:** Ad-hoc / scheduled uploads — not real-time

| File                                 | Who Sends It                | Key Columns                                                                       | What It Means                                                                                      | Fact/Dim | Frequency |
| ------------------------------------ | --------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------- | --------- |
| `prior_auth_tracker_YYYYMMDD.xlsx` | Utilization management team | auth_id, patient_id, cpt_code, payer_id, auth_status, approved_units, expiry_date | Insurance pre-approvals needed before procedures — was auth in place before service was rendered? | Fact     | Daily     |
| `daily_census_YYYYMMDD.xlsx`       | Facility operations team    | facility_id, unit, date, total_beds, occupied_beds, discharges, admissions        | Daily bed occupancy snapshot per facility/unit — feeds capacity and throughput KPIs in Gold       | Fact     | Daily     |

---

### Monthly / Annual (Reference — slow changing)

| File                              | Who Sends It                   | Key Columns                                                    | What It Means                                                                                   | Fact/Dim   | Frequency |
| --------------------------------- | ------------------------------ | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------- | --------- |
| `provider_roster_MMM_YYYY.xlsx` | Credentialing / Contracts team | npi, specialty, contract_tier, in_network_flag, effective_date | Manual provider updates — contract tier, in-network status. Merged into Provider Dim via MERGE | Dim (SCD2) | Monthly   |
| `fee_schedule_YYYY.xlsx`        | Finance team                   | cpt_code, payer, allowed_amount, effective_date                | What each payer reimburses per CPT code — used to compute expected vs actual reimbursement     | Reference  | Annual    |

---

## Quick Reference — Gold Layer Treatment

| Category                 | Tables                                                           |
| ------------------------ | ---------------------------------------------------------------- |
| SCD Type 2 (MERGE)       | patients, providers, eligibility_extract                         |
| Upsert via MERGE         | encounters, claims, claims_adjudication                          |
| Full reload (reference)  | icd10_reference, cpt_reference, fee_schedule, quality_benchmarks |
| PII / HIPAA sensitive    | patients (ssn_hash), lab_results, eligibility                    |
| Watermark-driven         | All 7 PostgreSQL tables via`updated_at`                        |
| Drop-zone (no watermark) | All CSV + Excel — filename date or ingest_date partition        |

---

## Pipeline Architecture — 8 Pipelines Total

### Bronze Layer (3 Pipelines)

One parameterized notebook per pipeline. Each table/file runs as a parallel task with different parameters.
Postgres =>7 parallel tasks
Excel=> 2 parallel tasks
csv=> 5 parallel task

### Silver Layer (1 Pipeline)

One parameterized notebook, ~18 parallel tasks — one per Bronze table.

### Gold Layer (3 Pipelines)

| Pipeline             | What It Does                                                                            |
| -------------------- | --------------------------------------------------------------------------------------- |
| Gold — Dims         | SCD Type 2 MERGE on patients, providers, eligibility, provider roster                   |
| Gold — Facts        | MERGE upsert on encounters, claims, lab results, adjudication, prior auth, availability |
| Gold — Aggregations | KPI summary tables on top of facts                                                      |

## cluster strategy

We use job clusters across all pipelines — DBR 16.4 LTS(spark 3.5.2 , scala 2/12), standard DS3_v2(14 gb memory,4cores) autoscaling on Silver and Gold(1 to 8), Photon enabled where MERGE and aggregations benefit. Pipeline processes 8 to 10 GB per run, 45 to 50 GB daily.

#### KPIs — Gold Layer

| KPI                             | What It Means                                           | Team                    |
| ------------------------------- | ------------------------------------------------------- | ----------------------- |
| Claim Denial Rate               | % of claims denied by payer                             | Finance                 |
| Days in AR(Accounts Receivable) | Average days from claim submission to payment per payer | Finance                 |
| Denial Rate by CPT Code         | Which procedures get denied most                        | Finance / Revenue Cycle |
| Bed Occupancy Rate              | % of beds occupied per facility per day                 | Operations              |
| Prior Auth Approval Rate        | % of pre-authorizations approved by payer               | Utilization Management  |
