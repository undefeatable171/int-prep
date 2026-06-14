---
layout: default
title: Git Notes
permalink: /git_questions/
---

# Git Interview Questions and Answers for Data Engineers

## 1. What is Git?

**Answer:** Git is a distributed version control system used to track
changes in source code and collaborate with multiple developers.

## 2. Difference between Git and GitHub?

-   Git: Version control system.
-   GitHub: Cloud platform for hosting Git repositories.

## 3. What is a repository?

**Answer:** A repository stores project files and their complete version
history.

## 4. What is a commit?

**Answer:**  A commit is a snapshot of changes at a specific point in time.
saved to the repository with a unique commit ID (hash), author info,
timestamp, and a message.

- Every commit captures **what changed, who changed it, and when** —
  making the full project history traceable.
- Commits are the backbone of version control — they allow you to
  **revert to any previous state**, compare differences across versions,
  and debug issues precisely.

**Example:**
In my healthcare pipeline at TCS, if a bad transformation logic was
pushed to the Silver layer, we could use `git log --oneline` to find
the exact commit that introduced the bug and `git reset --hard
<commit_id>` to revert — without affecting any other files or branches.

**Without commits:** you'd only ever have the latest version of every
file — no history, no rollback, no accountability.
``` bash
git commit -m "Add Spark transformation"
```

## 5. Difference between git add and git commit?

-   `git add`: Stages changes.
-   `git commit`: Saves staged changes.
** why add if we can use commit? **
- git add moves selected changes from the working directory to the staging area, and git commit saves only those staged changes.
- if we use commit directly , all unfinished changes also would be commited and creates issues for tracking.
- In my TCS pipeline, I was halfway through fixing a bug in bronze_ingestion.py — not ready to commit. My lead suddenly asked me to fix an urgent issue in silver_transform.py. With staging:
bashgit add silver_transform.py
``` bash
git commit -m "fix urgent silver transformation bug"
```
# bronze_ingestion.py stays safely in working dir — untouched
Without staging, I'd have to either commit broken bronze code or lose my silver fix — both are bad in production.

## 6. What is HEAD?

**Answer:** HEAD is a pointer to  the latest
commit on the active branch.

## 7. What is a branch?

**Answer:** A branch is an independent line of development. Developers create separate branches for independently working on features


## 8. Why use branches?

-   Feature development
-   Bug fixes
-   Parallel work
-   Experimentation

## 9. Merge vs Rebase?

**Merge:** Preserves history and creates a merge commit. **Rebase:**
Rewrites history for a cleaner commit graph.

## 10. What is git fetch?

**Answer:** Downloads remote changes without merging.

## 11. What is git pull?

**Answer:** Downloads and integrates remote changes. Equivalent to:

``` bash
git fetch
git merge
```

## 12. Clone vs Pull?

-  git clone is used to create a local copy of a remote repository for the first time. It downloads the entire repository, sets up the remote connection, and checks out the default branch. 
- git pull is used to update an existing local repository by fetching and integrating changes from the remote repository into the current branch.


## 13. What is git push?

**Answer:** Uploads local commits to a remote repository.

## 14. What is a non-fast-forward error?

**Answer:** A fast-forward merge occurs when the target branch has no new commits, so Git simply moves the branch pointer forward without creating a merge commit 
- A non-fast-forward merge occurs when both branches have new commits, requiring Git to create a merge commit to combine their histories. 
- Fast-forward keeps history linear, while non-fast-forward preserves branch structure.

- ** error occurs when The remote has commits not present locally. Pull and integrate changes before pushing. **

## 15. What is cherry-pick? 

**Answer:** Applies specific commits from one branch to another.

## 16. Can you cherry-pick only the second commit?

**Answer:** Yes. Only the selected commit is applied, though
dependencies may cause conflicts.

## 17. What is a merge conflict?

**Answer:** Occurs when Git cannot automatically combine changes.

## 18. What is git stash?

**Answer:** Temporarily stores uncommitted changes.

``` bash
git stash
git stash pop
```

## 19. Reset vs Revert?

-   Reset: Rewrites history.
-   Revert: Creates a new commit that undoes changes.

## 20. Soft, Mixed, Hard Reset

-   Soft: Move HEAD only.
-   Mixed: Reset staging.
-   Hard: Reset everything.

## 21. Origin vs Upstream?

-   Origin: Default remote.
-   Upstream: Original repository in a fork workflow.

## 22. What does git status do?

Shows branch, staged, unstaged, and untracked files.

## 23. What does git log do?

Displays commit history.

``` bash
git log --oneline
git log --graph
```

## 24. Local vs Remote Repository?

-   Local: On your machine.
-   Remote: Hosted on GitHub/GitLab/Azure DevOps.

## 25. Production Git Workflow?

Feature branch → Commit → Push → Pull Request → Code Review → Merge.

## 26. Production Best Practices

-   Avoid direct commits to main.
-   Use feature branches.
-   Use PRs.
-   Keep branches updated.
-   Protect main.

## 27. What happens during git clone?

Downloads the repository, history, configures origin, and checks out the
default branch.

## 28. Why are text files sometimes treated as binary?

UTF-16 or binary-like encodings may cause Git to classify them as
binary. UTF-8 avoids this.

## 29. What is git diff?

Compares changes between commits, branches, or working tree states.

## 30. Fetch vs Pull?

-   Fetch: Download only.
-   Pull: Download and integrate.

# Top 10 Most Common Git Interview Questions
~
1.  Git vs GitHub
2.  Repository and Commit
3.  Branches
4.  git add vs git commit
5.  git fetch vs git pull
6.  git clone vs git pull
7.  Merge vs Rebase
8.  Cherry-pick
9.  Merge conflicts
10. Production Git workflow
