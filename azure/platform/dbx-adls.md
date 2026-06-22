## 0. Unity catalog

Unity Catalog is Databricks' centralized governance layer for all data and AI assets across your entire Databricks account.


---

## The Problem(before UC)

Before UC (old way):

- Each Databricks workspace had its own Hive Metastore
- No sharing between workspaces — team A can't see team B's tables
- Permissions were coarse — only table-level, no column/row security
- No data lineage, no audit logs
- ADLS access needed service principals hardcoded in notebooks

After UC:

- One metastore for the entire account (all workspaces share it)
- Fine-grained access — column-level, row-level security
- Data lineage — track where data came from, what transformed it
- Audit logs — who accessed what, when
- ADLS access via Access Connector — no credentials in code

Also 
- Data Lakes like ADLS is just a file system. No concept of tables, permissions, or organization. You can dump files anywhere. When 10 teams work on the same storage account — who owns what? Who can access what? How do you find anything?

Unity Catalog solves this with a 3-level namespace:

```
Catalog → Schema → Table / Volume
```

---

## 1.1 Catalog

Top-level container. Groups related schemas together. In our project, each catalog is for a different layer/domain.

```
ustechcentral    ← our project's catalog
healthcare_prod  ← another team's catalog
finance_dev      ← another env
```

**Why:** Broadest level of separation — by environment, business unit, or project.

---

## 1.2 Schema

Lives inside a catalog. Groups related tables and volumes together.

```
ustechcentral.bronze  ← raw ingested data
ustechcentral.silver  ← cleaned / conformed
ustechcentral.gold    ← business-ready aggregates
```

**Why:** Layer-level separation within a project. Permissions can be granted at schema level — e.g., data science team gets read on gold only.

---

## 1.3 Volume

A folder-like object inside a schema — but for **files**, not tables.

**Why:** UC tables are for structured Delta data. But you also deal with raw CSV, JSON, PDFs, images, Parquet files not yet registered as tables. Volume brings those files under UC governance.

Without volumes → you access `abfss://...` directly → bypasses UC permissions entirely.

```
/Volumes/ustechcentral/bronze/raw_files/claims.csv
```

---


## End-to-End Setup Flow

```
Azure Portal
├── Resource Group
│     ├── Databricks Workspace (DBX)
│     ├── ADLS Gen2
│     └── Access Connector
│           ├── IAM on Storage Account → Blob Contributor, Account Contributor, Queue Contributor
│           └── IAM on Resource Group  → EventGrid EventSubscription Contributor Databricks (UC)
├── Storage Credential  ← wraps Access Connector
├── External Location   ← ADLS path + Storage Credential → Test green ✅
├── Catalog             ← namespace, points to external location
├── Schema              ← namespace, can have its own MANAGED LOCATION
├── Volume              ← managed (inherits schema) or external (own path)
└── Table               ← managed (inherits location chain) or external (own path)
```


 
### Step 1 — Create Resources (Single Resource Group- DEV_RG)
 
| Resource | Notes |
|----------|-------|
| Azure Databricks Workspace | Any pricing tier |
| ADLS Gen2 | Enable hierarchical namespace |
| Access Connector for Azure Databricks | Managed identity resource |

## 1. Access Connector (Azure Resource)

> **What it is:** An Azure-managed identity resource that lets Unity Catalog talk to ADLS without hardcoding credentials.

**Create it:**
- Azure Portal → search "Access Connector for Azure Databricks" → Create
- Assign to your resource group, give it a name, pick region → Deploy

**Assign IAM Roles on the Storage Account:**

| Role | Purpose |
|------|---------|
| Storage Blob Data Contributor | Read / write / delete blobs |
| Storage Account Contributor | Manage storage account |
| Storage Queue Data Contributor | Queue access |

**Assign on Resource Group (for file-based triggers):**

| Role | Purpose |
|------|---------|
| EventGrid EventSubscription Contributor | File-based trigger access |

> **Remember:** Access Connector = Azure Resource. Storage Credential = Unity Catalog wrapper around it.

---

## 2. Storage Credential (Unity Catalog Object)

> **What it is:** The UC object that wraps the managed identity (Access Connector). Answers: **WHO** can access storage.

```sql
CREATE STORAGE CREDENTIAL med_cred
  ...  -- points to the Access Connector managed identity
```

---

## 3. External Location (Unity Catalog Object)

> **What it is:** Maps a specific ADLS path to a Storage Credential. Answers: **WHICH path** is accessible.

```sql
CREATE EXTERNAL LOCATION med_loc
  URL 'abfss://data@undefeatable.dfs.core.windows.net/medical/'
  WITH (STORAGE CREDENTIAL med_cred);
```

**Create via UI:**
- Catalog → Manage → External Locations → Create External Location
- Name, Storage Type: Azure, URL, Storage Credential → Create → **Test Location** (must be green)

**⚠️ Scope Warning:** If your external location is `abfss://data@undefeatable.dfs.core.windows.net/` (root of container), the credential can read **everything** inside. Most orgs scope it to a sub-path (e.g., `/medical/`).

**⚠️ If you skip this:** Databricks throws a read error on any container without a registered external location. Always register before accessing.

**Purpose:** Authentication + Authorization + Governance + Secure ADLS access

---

## 4. Metastore

> Account-scoped (shared across workspaces in same region). One metastore per region.

- Created once → assigned to workspaces in that region
- Has its own default managed storage (auto-created by Databricks):
  ```
  abfss://unity-catalog-storage@dbstorageXXXX.dfs.core.windows.net/
  ```
  (lives in `databricks-rg-XXXXXXXX` managed resource group)

---

## 5. Catalog

> A namespace only. NOT "managed catalog" or "external catalog" — those terms don't exist in UC.

```sql
CREATE CATALOG medical
  MANAGED LOCATION 'abfss://data@undefeatable.dfs.core.windows.net/ustechcentral/';
```

`MANAGED LOCATION` = where managed tables inside this catalog are stored by default. Does NOT make the catalog "external."

**Via UI:** Catalog → Create Catalog → Name, Type: Standard, Location (pick external location) → optional sub-path

---

## 6. Schema

> A namespace only. NOT "managed schema" or "external schema" — those terms don't exist.

```sql
CREATE SCHEMA medical.bronze
  MANAGED LOCATION 'abfss://data@undefeatable.dfs.core.windows.net/ustechcentral/files/';
```

Schema storage can be completely different from the catalog's location. Fully flexible.

**Typical layout (example):**
```
gold   → abfss://data@.../dali/gold
silver → abfss://data@.../integrationmodel/silver
bronze → abfss://data@.../ustechcentral/files       (file-based sources)
         abfss://data@.../ustechcentral/postgres    (JDBC sources)
```

---

## 7. Managed vs External — Table & Volume

> This distinction **only exists at table and volume level.**

| Object  | Managed vs External? |
|---------|---------------------|
| Catalog | ❌ No |
| Schema  | ❌ No |
| Table   | ✅ Yes |
| Volume  | ✅ Yes |

### Managed Table

```sql
CREATE TABLE medical.bronze.claims (
  claim_id BIGINT
);
-- No LOCATION specified
```

- UC owns: metadata + data files + storage lifecycle
- `DROP TABLE` → deletes **metadata + data**
- Path registered under `_unitystorage` — **cannot** use `dbutils` to list/read transaction logs

### External Table

```sql
CREATE TABLE claims_ext
  USING DELTA
  LOCATION 'abfss://data@storage.dfs.core.windows.net/raw/claims/';
```

- UC owns: metadata only; ADLS owns data files
- `DROP TABLE` → deletes **metadata only**, data stays in ADLS
- **Can** use `dbutils` to list files / read transaction logs (since path is customer-managed)

### Managed Volume

Inherits schema's storage location.

### External Volume

```sql
CREATE EXTERNAL VOLUME ...
  LOCATION 'abfss://...';
```

Requires its own registered external location. Useful for file-based triggers or raw file read/write.

---

## 8. Storage Location Precedence

When UC decides where to store a managed table, most specific wins:

```
Table LOCATION (if specified)
      ↓
Schema MANAGED LOCATION
      ↓
Catalog MANAGED LOCATION
      ↓
Metastore default storage
```

---

## 9. Do You Always Need External Locations?

**No.**

Managed tables can store data in metastore's default storage (`unity-catalog-storage`) without any external location setup.

External locations are **required only** for:
- External tables (`LOCATION 'abfss://...'`)
- External volumes (`LOCATION 'abfss://...'`)
- Direct ADLS path access from notebooks

---

## 10. Hive Metastore vs Unity Catalog

| | Hive Metastore | Unity Catalog |
|--|--|--|
| Scope | Workspace-scoped | Account-scoped |
| Access control | Coarse (table-level) | Fine-grained (column/row-level) |
| Data lineage | ❌ No | ✅ Yes |
| Multi-workspace governance | ❌ No | ✅ Yes |
| Centralized governance | ❌ No | ✅ Yes |

---

## 11. Full Architecture Summary

```
[Managed Storage Path]
Unity Catalog → Metastore Storage → unity-catalog-storage → Managed Tables/Volumes

[Customer Storage Path]
Access Connector (Azure) → Storage Credential (UC) → External Location (UC) → Customer ADLS → External Tables/Volumes
```

---

## 12. Interview One-Liners

| Question | Answer |
|----------|--------|
| What is an Access Connector? | Azure managed identity resource; bridges UC to ADLS without code-level credentials |
| What is a Storage Credential? | UC object wrapping the managed identity — defines WHO can access storage |
| What is an External Location? | UC object mapping an ADLS path to a storage credential — defines WHICH path is accessible |
| Why does a read fail after UC setup? | Missing external location for that container; register it and retry |
| Can schemas have different storage than their catalog? | Yes — metastore, catalog, and each schema can all point to different paths |
| Managed vs External table difference? | Managed: UC owns data + metadata, DROP deletes both. External: UC owns metadata only, DROP keeps data |
| Hive vs Unity Catalog? | Hive = workspace-scoped, no fine-grained control. UC = account-scoped, column/row security, lineage, cross-workspace governance |
| How to set up UC from scratch? | Metastore → Access Connector (Azure) → IAM role on storage → Storage Credential (UC) → External Location → Catalog → Schema |

## Access Control
 
### The Full Grant Chain
 
All three must be granted — missing any one = access denied.
 
```
GRANT USE CATALOG ON CATALOG ustechcentral     ← can see the catalog
        ↓
GRANT USE SCHEMA ON SCHEMA ustechcentral.gold  ← can see the schema
        ↓
GRANT SELECT ON TABLE ustechcentral.gold.claims ← can read the table
```
 
### Common Privileges
 
| Privilege | Applies To | What It Allows |
|-----------|-----------|----------------|
| `USE CATALOG` | Catalog | Navigate into catalog |
| `USE SCHEMA` | Schema | Navigate into schema |
| `SELECT` | Table / View / Volume | Read data |
| `MODIFY` | Table | Insert / update / delete |
| `CREATE TABLE` | Schema | Create tables inside schema |
| `CREATE VOLUME` | Schema | Create volumes inside schema |
| `ALL PRIVILEGES` | Any | Everything |
 
### Granting to Azure AD Groups (via SCIM)
 
Groups are managed in **Azure Active Directory** and synced into Databricks via **SCIM**.
 
```
Azure AD
  └── Group: ops / dev / analyst
          ↓  SCIM sync
Databricks Account Console
  └── Same groups — usable in GRANT statements
```
 
When someone joins/leaves a group in AAD → reflects in Databricks automatically. No manual user management in DBX needed.
 
```sql
-- Grant to AAD group (synced via SCIM)
GRANT USE CATALOG ON CATALOG ustechcentral TO `dev`;
GRANT USE SCHEMA ON SCHEMA ustechcentral.gold TO `dev`;
GRANT SELECT ON SCHEMA ustechcentral.gold TO `dev`;
 
-- ops team gets full access on bronze
GRANT USE CATALOG ON CATALOG ustechcentral TO `ops`;
GRANT USE SCHEMA ON SCHEMA ustechcentral.bronze TO `ops`;
GRANT ALL PRIVILEGES ON SCHEMA ustechcentral.bronze TO `ops`;
```
 
Always grant to **groups**, not individual users — manage membership in AAD, not in DBX.
 
### View / Revoke
 
```sql
SHOW GRANTS ON TABLE ustechcentral.gold.claims;
SHOW GRANTS ON SCHEMA ustechcentral.gold;
 
REVOKE SELECT ON TABLE ustechcentral.gold.claims FROM `analyst`;
```
 
---
 
## Row & Column Level Security
 
### Column Mask — control what value is seen
 
```sql
-- Create masking function
CREATE FUNCTION ustechcentral.gold.mask_ssn(ssn STRING)
RETURN CASE
  WHEN IS_ACCOUNT_GROUP_MEMBER('ops') THEN ssn
  ELSE '***-**-****'
END;
 
-- Apply to column
ALTER TABLE ustechcentral.gold.members
ALTER COLUMN ssn
SET MASK ustechcentral.gold.mask_ssn;
```
 
`ops` group → sees real SSN. Everyone else → sees masked value. Same table, same query.
 
### Row Filter — control which rows are seen
 
```sql
-- Create filter function
CREATE FUNCTION ustechcentral.gold.filter_region(region STRING)
RETURN CASE
  WHEN IS_ACCOUNT_GROUP_MEMBER('dev') THEN region = 'US'
  WHEN IS_ACCOUNT_GROUP_MEMBER('ops') THEN TRUE  -- sees all rows
  ELSE FALSE
END;
 
-- Apply to table
ALTER TABLE ustechcentral.gold.claims
SET ROW FILTER ustechcentral.gold.filter_region ON (region);
```
 
`dev` → US rows only. `ops` → all rows. Others → nothing. Invisible at query time.
 
| | Row Filter | Column Mask |
|--|--|--|
| Controls | Which rows you see | What value you see |
| Applied on | Table | Column |
| Bypass possible | ❌ No | ❌ No |
 
UC enforces both at query time — notebooks, BI tools, APIs — no exceptions.
 
---
 
## Full Architecture
 
```
Azure Portal (Single Resource Group)
├── Databricks Workspace
├── ADLS Gen2
└── Access Connector
      ├── IAM on Storage → Blob Contributor, Account Contributor, Queue Contributor
      └── IAM on RG     → EventGrid EventSubscription Contributor
 
Azure AD
└── Groups: ops, dev, analyst
        ↓ SCIM sync
Databricks Account Console
└── Same groups usable in GRANT
 
Databricks Unity Catalog
├── Storage Credential  ← wraps Access Connector (WHO)
├── External Location   ← ADLS path + credential, Test green ✅ (WHICH path)
├── Catalog             ← top-level namespace (ustechcentral)
├── Schema              ← layer namespace (bronze / silver / gold)
├── Volume              ← raw files, UC governed (/Volumes/... path)
└── Table               ← structured Delta, managed or external
      ├── GRANT chain   ← USE CATALOG → USE SCHEMA → SELECT
      ├── Row Filter    ← which rows per group
      └── Column Mask   ← which values per group
```
 
