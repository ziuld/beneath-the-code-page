# F01 — Maven wrapper checksum verification

Date: 2026-10-09. Owner authorised adding and locally verifying the checksum identified during the post-merge audit. No commit, push or settings change is included in this step.

## Discovery and corrective scope

The F01 feature summary calls for Wrapper/checksum verification. Imported properties pinned Maven 3.10.0 but omitted distributionSha256Sum; earlier build and smoke evidence did not verify distribution checksum enforcement. This gap was discovered after PR #1 merged and is now corrected locally. Earlier passing builds are not retroactively represented as checksum tests.

The generated wrapper supports SHA-256 validation on fresh downloads, but its warm-cache path returns before that check. Tests use separate, initially absent MAVEN_USER_HOME directories. Maven 3.10.0, Wrapper 3.3.4, Java 25 and Spring Boot 4.1.1 are retained; no wrapper implementation, application source or dependency changed.

## Provenance and measured digest

Distribution URL: `https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.10.0/apache-maven-3.10.0-bin.zip`.
Published checksum URL: the same URL with `.sha512` appended.

The downloaded ZIP's computed SHA-512 matched the published value:

```text
22d31676d5b92ed53308c19ecded3245d0efd0cddfec51ec7bab62f4f13ad70ddddceff8e62940e0e8e2421f3cde8106737f4becec0aa034ffeff2a754e88337
```

The `.sha256` URL returned HTTP 404. SHA-256 was derived from the downloaded ZIP after the successful published SHA-512 comparison, not claimed as a published SHA-256 value:

```text
1f6d9909266510f039f59aa0e13dcd2c66da85f043e56276e41f2918f8bddaff
```

This value is pinned as distributionSha256Sum in `.mvn/wrapper/maven-wrapper.properties`.

## Exact executed commands and results

| Command | Actual result |
|---|---|
| `PYTHONDONTWRITEBYTECODE=1 python3 scripts/check-maven-wrapper.py --print-sha256` | Exit 0; ZIP matched published SHA-512; derived SHA-256 printed before pinning; Maven not executed in this mode |
| `PYTHONDONTWRITEBYTECODE=1 python3 scripts/check-maven-wrapper.py` | Exit 0; archive/pin verified; fresh valid cache installed/executed Maven 3.10.0 with wrapper exit 0; fresh invalid cache rejected before installation with wrapper exit 1 and explicit SHA-256 mismatch diagnostic |
| `PYTHONDONTWRITEBYTECODE=1 python3 scripts/verify-java-baseline.py` | Exit 0; Maven BUILD SUCCESS; 34 tests, 0 failures/errors, 8 explicit skips; all 24 non-empty architecture fixtures passed; executable JAR generated |

The script copies the real mvnw into two isolated workspaces. Each executes `./mvnw --version` with its own empty wrapper cache. The negative copy uses an all-zero checksum; real properties remain correct. Success requires the prescribed Maven version and an installed executable. Rejection requires the exact mismatch diagnostic and no installed executable. A download/network failure does not count as a successful rejection.

All downloaded ZIPs, copied wrappers, HOME/cache directories and temporary files stay beneath project target/ and are cleaned after testing. Inherited distribution overrides/credentials are cleared; HOME, MAVEN_USER_HOME, TMPDIR and Maven/JVM temporary paths are project-local. Existing user/global wrapper caches are not removed or modified by these enforcement tests.

Actual local toolchain: Arch Linux OpenJDK/java/javac 25.0.4.1; fresh Maven 3.10.0 (c43a36b8d67be7e0805a411bc0898af1a51f5472); Boot 4.1.1. Executed on Linux with unzip and sha256sum. Windows supports the same property by wrapper inspection, but Windows execution is not claimed. The ZIP pin requires unzip; the wrapper's tar.gz fallback is a different archive, not covered by this ZIP digest.

Warnings: missing Thymeleaf templates, development Security password (redacted), Mockito/Byte Buddy dynamic agent, JVM class sharing and eight deferred production architecture checks. None caused a final build failure. Incorrect-checksum exit 1 was the expected isolated negative test.

## Integration state and closure

PR [#1](https://github.com/ziuld/beneath-the-code-page/pull/1) was squash-merged with separate approval at 2026-10-09T16:50:33Z into main `4c6f64eb4e212a3dc52ca7171fa5e40d1f5e5278`. [Main CI 37962012176](https://github.com/ziuld/beneath-the-code-page/actions/runs/37962012176) passed (job 113926933305): 34 tests, no failures/errors, 8 skips, packaged health UP and planning checks. Merged and reviewed PR trees match; temporary failure sources are absent. These results predate this checksum correction; no remote checksum-revision result is claimed.

The checksum gap is resolved locally, but this correction is uncommitted/unpublished. F01 remains in_review; T05 must record the integrated correction and final acceptance before closure. Security-reporting contact, issue templates, dependency-update configuration, branch protection and action-runtime maintenance remain audit follow-ups requiring scope/owner decisions. No such settings or automation were created. F02 has not started.

Owner actual effort remains unreported; estimates and child/parent totals are preserved.

Planning checks after evidence updates: `python3 scripts/render-backlog.py` and `python3 scripts/render-roadmap.py` completed; `python3 scripts/check-planning.py` passed for all 17 features, evidence paths, prerequisites, generated views, hierarchy/coverage/closure rules and effort rollups; `python3 scripts/test-planning-rules.py` passed all 10 tests; `git diff --check` found no whitespace errors in tracked changes. No work-item status was prematurely closed; canonical changes only link the corrective evidence. Git status confirms the checksum, script, guidance/evidence/handoff and generated roadmap edits are local and uncommitted.

## Local commit handoff

The owner subsequently approved creating feature/F01-wrapper-checksum and committing the verified correction. `git switch -c feature/F01-wrapper-checksum` succeeded; planning validation and all 10 planning-rule tests passed again, and Git whitespace checks passed. The coherent commit's actual hash will be reported in the final handoff, avoiding recursive metadata. Remote branch publication remains a separate approval step; no push or PR creation is included in this local commit approval.
