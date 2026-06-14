---
layout: default
title: Git Notes
permalink: /git_notes/
---

# Git & GitHub — Master Reference Notes

---

## 1. Core Concepts

| Term | Definition |
|------|-----------|
| **Git** | Distributed version control system — tracks changes in source code, allows collaboration. |
| **GitHub** | Cloud platform to host Git repositories. Git = local tool; GitHub = remote host. |
| **Repository (Repo)** | A project folder tracked by Git. Contains code, docs, and full change history. Also called root/parent folder. |
| **HEAD** | Pointer to the latest commit on the current branch. Every new branch is created from HEAD. |
| **Origin** | Default name given to the remote repo from which your local repo was cloned or linked. |
| **Upstream / Downstream** | Any repo you clone from, pull from, or push to = Upstream. Your local repo = Downstream. |
| **SCM** | Software Configuration Management system — Git is one. |
| **Hash / SHA-1** | A unique ID (40-char hex) generated from file contents. Git uses it to identify every commit, blob, tree, and tag. Short 6–7 chars is enough in practice. |
| **Tree** | Git object representing a directory (names + hashes + permissions). |
| **Commit** | Git object representing a specific snapshot of the working tree. |
| **Fork** | A copy of a repo under your own GitHub account — for experimentation or contribution. Done on GitHub. |
| **Clone** | Downloads a full copy of a remote repo to your local machine. Done via terminal. |
| **Fork vs Clone** | Fork = independent GitHub copy. Clone = local working copy. Forking is on GitHub; cloning is on your machine. |
| **Gist** | GitHub's simplified code-snippet sharing. Each Gist is a full Git repo (forkable, cloneable). |
| **Markdown** | Lightweight markup language for documentation (`.md` files, READMEs). |

---

## 2. One-Time Setup (Per Machine)

```bash
git config --global user.email "you@gmail.com"
git config --global user.name "YourName"   # Use same name as your GitHub account
git config --list                           # Verify config
```

---

## 3. Core Workflow

### 3.1 Initialize a Repo

```bash
git init          # Creates hidden .git folder — turns folder into a Git repo
git status        # "not a git repository" → not init'd | "On branch master" → init'd
```

> **`.git` folder** = the repo's brain/database. Stores all versions, commits, history. Never manually edit it.

Branch doesn't register until first commit — that's why every repo needs an **initial commit**:
```bash
git add .
git commit -m "initial commit"
git branch        # now shows: master
```

---

### Git Flow (3 Areas)

```
Working Directory  →  Staging Area  →  Repository (.git)
   (you work here)    (snapshot zone)   (committed history)
```

1. **Working Directory** — where you create/modify files. Git watches but doesn't track yet.
2. **Staging Area** — you choose which files to snapshot (`git add`).
3. **Repository** — you save the snapshot permanently (`git commit`).

---

### 3.3 Add & Commit

```bash
git add filename.txt           # stage specific file
git add file1.txt file2.txt    # stage multiple
git add .                      # stage everything

git commit -m "ingest data"    # commit with message (use present-tense imperative)
```
---

### 3.4 Git Log

```bash
git log             # full history: hash, author, date, message
git log --oneline   # short hash + message — read bottom (oldest) to top (newest)
```

---

## 4. `.gitignore` & `.gitkeep`

### `.gitignore` — Exclude sensitive/unnecessary files
Create in repo root. List filenames or folders to ignore.

```
# .gitignore
.env
api_secrets.txt
bronze/          # ignore entire folder
*.csv            # ignore all CSVs (useful in data engineering)
```

> Commit `.gitignore` itself — it contains only names, not secrets.

> **🎯 Data engineering use case:** Ignore raw data files (bronze layer), API keys, connection strings, and large CSVs. Critical for repos storing pipeline code alongside data.

### `.gitkeep` — Track empty folders
Git doesn't track empty directories. To preserve folder structure (e.g., Bronze/Silver/Gold medallion layers):

---

## 5. Branching

**Why:**  Enables **parallel development** — multiple devs work independently. Each branch is isolated — master has zero knowledge of feature branch changes until merged

| Term | Meaning |
|------|---------|
| **master / main** | Default/parent branch |
| **Feature branch** | Isolated branch for a specific task |
| **Ancestor commit** | The commit from which a branch was forked |

```bash
git branch                  # list branches (* = active)
git switch master           # switch to master (post-2019 way)
git switch -c feature_one   # create + switch to new branch
git branch -m new_name      # rename current branch
```

> **`git switch` vs `git checkout`:** `switch` = branch operations only. `checkout` = multi-purpose (branches, files, commits). Prefer `switch` for clarity.

> **Best practice:** Always go to master first before creating a new branch — ensures branch starts from master's HEAD.

```bash
git switch master
git switch -c feature_one   # branch created from master's HEAD
```

---

## 6. Merging

### Fast-Forward Merge
Happens when master has **no new commits** after the branch was created. No extra merge commit — history stays linear.

```
master:  A → B → C
feature:           → D → E
merged:  A → B → C → D → E   (clean, linear)
```

```bash
git switch master
git merge feature_one         # auto fast-forward if no divergence
```

### Non-Fast-Forward (3-Way) Merge
Happens when master **also has new commits** after branching. Creates an explicit **merge commit**.

```bash
git switch master
git merge feature_one -m "merging feature one"
```

> **🎯 Interview angle:** Fast-forward = clean linear history. 3-way = preserves branch history with a merge commit. Rebase (Section 8) is used to force fast-forward even when diverged.

---

## 7. Merge Conflicts

**Occurs when:** Two branches modify the **same file/lines** — Git can't auto-resolve.


**Resolution options:**
- **VS Code Merge Editor:** Open file → "Resolve in Merge Editor" → Accept Current / Incoming / Both → "Complete Merge"
- **Manual:** Delete conflict markers, keep what you want, save.
- **Abort entirely and goes to pre-merge state:** `git merge --abort`

> ⚠️ You MUST run `git add` + `git commit` after resolving. The merge is not complete until committed.


---

## 8. Git Rebase

**What it does:** Shifts the base of a feature branch to the **latest commit of master** — making it appear the branch was always created from the latest master. Enables a clean fast-forward merge.

```
Before rebase:
master:   A → B → C → D
feature:        → X → Y

After rebase:
master:   A → B → C → D
feature:                → X' → Y'   (rebased on top of D)
```

```bash
git switch rebase_feature
git rebase master            # rebase feature onto master's latest
git switch master
git merge rebase_feature     # now fast-forward — no merge commit
```

**Conflicts during rebase:** Resolve same way as merge conflicts, then:
```bash
git add .
git rebase --continue
# or abort: git rebase --abort
```

> ⚠️ **Never rebase public/shared branches** — it rewrites commit history, causing problems for collaborators.

> **🎯 Merge vs Rebase:** Merge preserves full history with a merge commit. Rebase gives clean, linear history. Teams with strict clean-history policies (most data platform teams) prefer rebase + fast-forward.

---

## 9. Time Travel — Reflog, Reset, Diff

### `git reflog` vs `git log`

```bash
git log --oneline   # commit history of current branch
git reflog          # full HEAD movement history (incl. resets, rebases — your "undo" log)
```

`HEAD@{0}` = current | `HEAD@{1}` = one step back | `HEAD@{2}` = two steps back

### Reset to a Previous Commit

```bash
git reset --hard <commit_id>    # go to specific commit (recommended — use commit IDs)
git reset --hard HEAD~1         # go back 1 commit
git reset --hard HEAD~2         # go back 2 commits
```

### Unstage Files

```bash
git reset               # unstage all staged files (moves back to working directory)
git reset filename.txt  # unstage specific file
```

### Diff — Compare Changes

```bash
git diff                # working directory vs staging area
git diff --staged       # staging area vs last commit
git show <commit_id>    # show what changed in a specific commit
```

> ⚠️ If `git show` displays "Binary files differ" instead of line changes — the file is saved in UTF-16. Save in **UTF-8** to fix.

---

## 10. Cherry Pick

**What it does:** Applies specific commits from one branch onto another — without merging the whole branch. Gets a **new commit ID** on the target branch.

```
feature: A → BugFix → Dev → C
master:  X → Y → Z
after:   X → Y → Z → BugFix'   (new ID, only that commit)
```

```bash
git switch feature_branch
git log --oneline             # find the commit ID

git switch master
git cherry-pick a4ef7c5       # apply just that commit

git cherry-pick c1 c2 c3      # multiple commits — must be in chronological order (oldest first)
```

> ⚠️ Cherry-pick applies only the selected commit(s), not their parents. If the commit depends on earlier workon branch, conflicts or incomplete results may occur.

> **🎯 Data engineering use case:** You have a hotfix for a failing pipeline in dev. Cherry-pick just that fix to production branch — skip the full QA pipeline for an emergency fix. Classic prod incident scenario.

---

## 11. Git Stash

**What it does:** Temporarily shelves uncommitted, incomplete work so you can switch branches without losing it.

**When to use:** Mid-development, urgent bug comes in — code isn't ready to commit but you need to switch branches.

```bash
git stash push -m "pipeline dev paused"    # stash current work, clean working dir
git stash list                              # view all stashes (stack — LIFO)
# stash@{0} = latest | stash@{1} = older
```

Switch, fix, come back:
```bash
git switch master
# fix the bug, add, commit
git switch dev_one

git stash apply "stash@{0}"   # restore stash, keep it in list
git stash pop                  # restore + remove from list (most common)
git stash drop                 # remove without applying
```

After restoring — commit as usual:
```bash
git add .
git commit -m "pipeline feature done"
```

> Stash is **repo-wide** — accessible from any branch, not just where it was created.

---

## 12. Push to GitHub (Local → Remote)

```bash
# Step 1: Set remote destination
git remote add origin https://github.com/username/repo.git
git remote -v               # verify

# Step 2: Rename branch if needed
git branch -m main          # rename master → main (matches GitHub default)

# Step 3: If remote repo already has commits (e.g., README), pull first
git pull origin main --allow-unrelated-histories

# Step 4: Push
git push origin main
```

---

## 13. Clone & Pull Request — Industry Standard Workflow

```bash
# 1. Clone remote repo (auto-sets origin, lands on main)
git clone https://github.com/username/repo.git
cd repo-name

# 2. Push feature branch to GitHub
git push origin feature_one
```

> **`git clone` vs `git pull`:** `clone` = first-time full download, sets up remote connection. `pull` = updates existing local repo with latest remote changes.

> **Production best practice:** Never work directly on main. Create feature branches, sync regularly with `git fetch` / `git pull --rebase`, submit changes through PRs. Protected branches + CI/CD pipelines maintain code quality.

---

## 14. Quick Reference — All Commands

```bash
# ── Config ──────────────────────────────────────────────────────────
git config --global user.email "email"
git config --global user.name "name"
git config --list

# ── Init & Status ───────────────────────────────────────────────────
git init
git status

# ── Staging & Committing ────────────────────────────────────────────
git add filename.txt / git add .
git commit -m "message"

# ── Log ─────────────────────────────────────────────────────────────
git log
git log --oneline
git reflog
git show <commit_id>  #explains fidd b//w connit_id vs previous commit

# ── Branching ───────────────────────────────────────────────────────
git branch
git switch branch_name
git switch -c new_branch         # create + switch
git checkout -b new_branch       # old way
git branch -m new_name           # rename

# ── Merging ─────────────────────────────────────────────────────────
git merge branch_name -m "message"
git merge --abort

# ── Rebase ──────────────────────────────────────────────────────────
git rebase master                # run from feature branch
git rebase --continue            # after resolving conflict
git rebase --abort

# ── Time Travel ─────────────────────────────────────────────────────
git reset --hard <commit_id>
git reset --hard HEAD~1
git reset                        # unstage only
git diff
git diff --staged

# ── Cherry Pick ─────────────────────────────────────────────────────
git cherry-pick <commit_id>
git cherry-pick c1 c2 c3         # oldest → newest order

# ── Stash ───────────────────────────────────────────────────────────
git stash push -m "message"
git stash list
git stash apply "stash@{0}"
git stash pop
git stash drop

# ── Remote ──────────────────────────────────────────────────────────
git remote add origin <url>
git remote -v
git push origin branch_name
git pull origin branch_name
git pull origin main --allow-unrelated-histories
git clone <url>
```

---

## 15. Key Comparisons (Interview Cheat Sheet)

| Topic | A | B |
|-------|---|---|
| **Merge vs Rebase** | Merge: preserves history, creates merge commit | Rebase: rewrites history, clean linear log |
| **Fast-forward vs Non-FF** | FF: master had no new commits → no merge commit | Non-FF: master diverged → merge commit created |
| **Clone vs Pull** | Clone: first-time full download + sets up remote | Pull: updates existing local repo from remote |
| **Fork vs Clone** | Fork: independent copy on GitHub for contribution | Clone: local working copy for development |
| **stash apply vs pop** | apply: restores, keeps stash in list | pop: restores + removes from list |
| **git diff vs git diff --staged** | `diff`: working dir vs staging | `--staged`: staging vs last commit |
| **git log vs git reflog** | log: branch commit history | reflog: all HEAD movements (incl. resets) |

---