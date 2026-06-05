# Healthcare Claims Domain — Interview Preparation Notes
> Data Engineering Context 

---

## Table of Contents
1. [Key Players](#1-key-players-in-us-healthcare)
2. [Four Major Data Sources](#2-four-major-healthcare-data-sources)
3. [Basic Healthcare Concepts](#3-Basic-Healthcare-Concepts)
4. [Patient Cost-Sharing Terms](#3-patient-cost-sharing-terms)
5. [Medical Code Systems](#4-medical-code-systems)
6. [EDI — Electronic Data Interchange](#5-edi--electronic-data-interchange)
7. [Claims](#7-Claims)
8. [Healthcare Claim Lifecycle](#6-healthcare-claim-lifecycle)
9. [Medicare & Medicaid](#7-medicare--medicaid)
10. [HIPAA — Data Privacy & Security](#8-hipaa--data-privacy--security)
11. [Claims Data in Your Medallion Pipeline](#9-claims-data-in-your-medallion-pipeline)
12. [Quick-Reference Cheat Sheet](#10-quick-reference-cheat-sheet)

---

## 1. Key Players in U.S. Healthcare

| Player | Who They Are | Example |
|---|---|---|
| **Provider** | Entities providing medical services like physicians, nurses, hospitals, pharmacies, and laboratories |  Mayo Clinic |
| **Payer / Insurer** | Insurance company that pays the claim after adjudication | Aetna, Cigna, UHC |
| **Member / Subscriber** | The person enrolled in a health plan | Patient / Employee |
| **Purchaser / Employer** | Organization or individual buying insurance and paying premiums | IBM, Government |
| **Clearinghouse** | Intermediary that validates and forwards claims from provider to payer. Checks: invalid codes, missing data, formatting issues | Change Healthcare |
| **Agent / Broker** | Middlemen between payers and members; facilitate enrollment | Insurance agents |

---

## 2. Four Major Healthcare Data Sources

### EHR (Electronic Health Records)
- Contains: patient demographics, diagnoses, lab results, medications
- **Purpose:** Clinical care and patient treatment

### Claims Data ⭐ *(Primary focus for data engineering)*
- Generated when providers submit reimbursement requests to insurers or Medicare
- **Purpose:** Billing, reimbursement, and cost analysis

### Disease Registry
- Specialized databases tracking patients with specific diseases (e.g., cancer registry tracks treatments and survival outcomes)
- **Purpose:** Outcome tracking, benchmarking, quality improvement

### External Reporting Data
- Data submitted to government agencies and regulatory organizations
- **Purpose:** Regulatory compliance, audits, public quality reporting

---
# 3. Basic Healthcare Concepts

## Primary Care Physician (PCP)

A general physician responsible for routine healthcare, preventive care, and the initial evaluation of medical conditions. PCPs often coordinate patient care and provide referrals to specialists when needed.

## Specialist

A physician who focuses on a specific area of medicine.

**Examples:**
* Cardiologist (Heart)
* Oncologist (Cancer)
* Neurologist (Nervous System)

## Outpatient Services

Medical services provided without requiring an overnight hospital stay or admission.

**Examples:**
* Doctor consultations
* Diagnostic tests
* Preventive care visits

## Ancillary Services

Supportive healthcare services that assist in diagnosis, treatment, and patient care.

**Examples:**
* Laboratory Services
* Pharmacy Services
* Radiology/Imaging
* Physical Therapy
* Ambulance Services

---

## 4. Patient Cost-Sharing Terms

| Term | Definition | Example |
|---|---|---|
| **Deductible** | Out-of-pocket amount paid before insurance kicks in | $1,000 deductible → you pay first $1,000 |
| **Copay** | Fixed flat fee paid for a specific service at time of care | $20 for a doctor visit regardless of total bill |
| **Coinsurance** | % of costs split between patient and insurer after deductible | You pay 20%, insurer pays 80% |
| **Premium** | Monthly amount paid to maintain insurance coverage | Paid by employer or individual monthly |
| **EOB** | Explanation of Benefits — outlines what was covered and patient balance | Sent to both patient and provider post-adjudication |

---

## 5. Medical Code Systems

### ICD Codes (International Classification of Diseases)
- Classifies diseases and health conditions — explains **WHY** the patient was treated
- Managed by **WHO**; US currently uses **ICD-10**, latest global version is **ICD-11**
- Format: 3–7 alphanumeric characters, stored as **string fields**
- Example: `E11.9` = Type 2 Diabetes

### CPT Codes (Current Procedural Terminology)
- Standardized **5-digit codes** — explains **WHAT** service or treatment was performed
- Managed by the **American Medical Association (AMA)**
- Stored as **string fields**
- Example: `99213` = Office consultation; covers blood tests, X-rays, surgeries

### ICD vs CPT — The Key Interview Point

| Code | Answers | Example |
|---|---|---|
| **ICD-10** | WHY — what condition/diagnosis | `E11.9` = Type 2 Diabetes |
| **CPT** | WHAT — what procedure/service was done | `99213` = Office consultation |
| **NPI** | WHO — unique identifier for the provider | 10-digit ID assigned to each provider |
| **HCPCS** | WHAT (extended) — supplies, drugs, equipment not in CPT | Used for Medicare/Medicaid billing |

> 💡 **Interview tip:** ICD + CPT must logically match. Diabetes (ICD) + consultation (CPT) ✅. Diabetes (ICD) + eye surgery (CPT) ❌ — flags as a data quality issue.

---

## 6. EDI — Electronic Data Interchange

Standardized format for exchanging healthcare data electronically. Defines structure, mandatory fields, and meaning. Security is handled via **SFTP** or **AS2** transmission protocols — not by EDI itself.

### EDI File Types

| EDI File | Direction | Purpose |
|---|---|---|
| **834** | Employer/Government → Payer | Member enrollment — who is covered under which plan |
| **837** | Provider → Payer | Healthcare claim submission (the bill) |
| **835** | Payer → Provider | Claim payment + remittance advice (the receipt) |
| **277CA** | Payer → Provider | Claim status — acknowledgement of 837 receipt |
| **999** | Payer → Provider | Confirms format of submitted 837 file |

> **Key analogy:** 837 = the bill you send. 835 = the receipt you get back.

### Core Fields in an 837 Claim *(standard across all insurers)*

| Field | Description |
|---|---|
| Claim ID | Unique identifier for the claim |
| Member / Beneficiary ID | Identifies the patient covered under the plan |
| Provider ID (NPI) | 10-digit National Provider Identifier |
| Service Date | Date the medical service was rendered |
| Diagnosis Code (ICD) | Why the patient was treated |
| Procedure Code (CPT/HCPCS) | What service was performed |
| Claim Amount | Total billed amount for the service |
| Claim Line Number | Line-level granularity within a single claim |

---
# 7. Claims

## What is a Claim?

A claim is a bill submitted by a healthcare provider to an insurance company requesting reimbursement for healthcare services provided to a patient.

## Common Claim Fields

* Claim ID
* Member ID / Beneficiary ID
* Provider ID
* Service Date
* Diagnosis Code (ICD)
* Procedure Code (CPT/HCPCS)
* Claim Amount
* Paid Amount

## Interview Answer

> A healthcare claim is a reimbursement request submitted by a provider to an insurance company after delivering medical services. Claims typically contain member information, provider information, diagnosis codes, procedure codes, service dates, and billing amounts, which are used by payers to determine reimbursement.

---
## 8. Healthcare Claim Lifecycle

> Know this end-to-end — very likely to be asked in domain follow-up.

```
Patient Visit
    → [1] Eligibility Verification
    → [2] Prior Authorization (if needed)
    → [3] Claim Submission (837 via Clearinghouse)
    → [4] Payer Adjudication
    → [5] Payment Posting (835 + EOB)
    → [6] Follow-up / Appeals (if denied)
```

| Stage | What Happens | Key Data Points |
|---|---|---|
| **1. Eligibility Verification** | Check if patient is covered on date of service, plan details, copay/deductible | Member ID, plan effective dates, coverage limits |
| **2. Prior Authorization** | Pre-approval from payer for costly/special treatments or surgeries | Auth code, approved procedure, valid date range |
| **3. Claim Submission (837)** | Provider sends 837 to Clearinghouse; clearinghouse validates format, ICD/CPT codes, then forwards to payer | Claim ID, ICD, CPT, NPI, service date, billed amount |
| **4. Payer Adjudication** | Payer verifies codes, coverage, calculates reimbursement → approves, denies, or requests more info | Allowed amount, denial reason code, adjustment codes |
| **5. Payment Posting (835)** | Payer sends 835 (remittance) to provider; EOB sent to patient | Paid amount, patient responsibility, adjustment |
| **6. Follow-up / Appeals** | If denied or partial, provider corrects errors, submits additional docs, or appeals | Denial code, corrected claim, appeal outcome |

---

## 9. Medicare & Medicaid

### Medicare
U.S. federal health insurance for individuals **65+**, people with **disabilities**, and **End-Stage Renal Disease (ESRD)** patients.

| Part | Covers | Cost |
|---|---|---|
| **Part A** — Hospital Insurance | Inpatient care, skilled nursing, hospice | Premium-free for most |
| **Part B** — Medical Insurance | Outpatient services, doctor visits, preventive care, equipment | Monthly premium required |
| **Part C** — Medicare Advantage | Private insurance alternative combining A+B; may include dental/vision/Rx | Varies by plan |
| **Part D** — Prescription Drugs | Prescription drug coverage through private insurers | Monthly premium required |

### Medicaid
- Healthcare program for **low-income individuals and families**
- Eligibility based on income; also covers children, pregnant women, elderly with low income, disabled
- Jointly funded by **federal and state governments**
- Generally **free or low-cost** for eligible individuals

### Dual Eligible Beneficiaries
Individuals who qualify for **both Medicare and Medicaid**.
- Medicare = primary payer
- Medicaid = covers remaining costs (premiums, deductibles, services Medicare doesn't fully cover)

---

## 10. HIPAA — Data Privacy & Security

**Health Insurance Portability and Accountability Act** — U.S. regulation governing how healthcare organizations must store, access, transmit, and secure sensitive patient data.

### PHI (Protected Health Information)
Any information that can **identify a patient** AND relates to their **health condition, treatment, or payment**.

**Examples of PHI:**
- Patient Name, Address, Phone, Email
- Date of Birth, Social Security Number
- Medical Record Number, Medicare Beneficiary ID
- Diagnosis Information, Treatment Information
- Insurance Information, Claim Details

### HIPAA Key Principles

| Principle | Meaning | Engineering Implication |
|---|---|---|
| **Privacy** | Only authorized people access patient data | RBAC in Unity Catalog |
| **Security** | Protect data from breaches, unauthorized access, cyberattacks | Encryption at rest and in transit, authentication |
| **Confidentiality** | PHI must not be exposed to unauthorized users | No PHI in unsecured emails or logs |
| **Integrity** | Data must remain accurate and unaltered | Audit trails, Delta Lake history |
| **Availability** | Authorized users must access data when needed | DR/HA design, SLAs |

> 💡 **Interview tip:** In Databricks, HIPAA compliance is enforced through Unity Catalog column-level security, row filters, and audit logs.

---

## 11. Claims Data in Your Medallion Pipeline

> Use this framing when asked "walk me through your project."

| Layer | What You Did | Domain Context |
|---|---|---|
| **Bronze** | Raw 837 claim files landed as-is (CSV/EDI format) | Member ID, Provider NPI, Service Dates, ICD codes, CPT codes, billed amounts — raw, unvalidated |
| **Silver** | Deduplicated on Claim ID, null handling on ICD/CPT, joined member + provider + claim tables | One row per claim line item. Validated ICD-CPT matches, cleaned NPI references |
| **Gold** | Aggregated metrics for reporting | Total billed vs paid per member, denial rate by provider, cost per diagnosis — fed into Power BI dashboards |

### Deduplication SQL (Silver Layer)
```sql
WITH cte AS (
  SELECT *,
    ROW_NUMBER() OVER (PARTITION BY claim_id ORDER BY service_date DESC) AS rn
  FROM claims_silver
)
SELECT * FROM cte WHERE rn = 1;
```

### Likely Follow-up Questions

| Question | Strong Answer |
|---|---|
| What was the grain of your fact table? | One row per claim line item (Claim ID + Claim Line Number as composite key) |
| Primary keys in your claims table? | Claim ID + Claim Line Number |
| How did you handle duplicate claims? | ROW_NUMBER() OVER (PARTITION BY claim_id ORDER BY service_date DESC) — keep row 1 |
| What aggregations in Gold? | Total billed amount, paid amount, denial rate by provider, cost per ICD code |
| Did you work with member eligibility? | Eligibility = whether member was covered on the date of service |
| How was ICD-CPT validated? | Cross-reference lookup table; flag mismatches as data quality issues in Silver |

---

## 12. Quick-Reference Cheat Sheet

### Claims Flow (One Line)
```
Patient Visit → Provider submits 837 → Clearinghouse validates
→ Payer adjudicates → 835 sent back → EOB to patient → Provider reconciles
```

### Key Acronyms

| Acronym | Full Form | One-line Meaning |
|---|---|---|
| EHR | Electronic Health Record | Patient clinical data |
| EOB | Explanation of Benefits | What insurance paid vs what patient owes |
| EDI | Electronic Data Interchange | Standardized format for healthcare data exchange |
| ICD | International Classification of Diseases | Diagnosis code — WHY treated |
| CPT | Current Procedural Terminology | Procedure code — WHAT was done |
| NPI | National Provider Identifier | Unique 10-digit ID for every provider: doctors, hospitals, laboratories,clinics, pharmacies |
| HCPCS | Healthcare Common Procedure Coding System | Extended codes for supplies, drugs, equipment |
| DRG | Diagnosis-Related Group | Categorizes inpatient hospital cases for billing |
| PHI | Protected Health Information | Any patient-identifiable health data — HIPAA protected |
| PCP | Primary Care Physician | General practitioner; gateway to specialist referrals |
| FHIR | Fast Healthcare Interoperability Resources | Modern API-based standard for healthcare data exchange |
| ERA | Electronic Remittance Advice | Another name for the 835 file |
| RCM | Revenue Cycle Management | End-to-end process of managing claims and payments |

---

*Last updated: June 2026 |*
