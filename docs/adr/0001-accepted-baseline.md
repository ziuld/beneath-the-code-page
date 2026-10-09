# ADR 0001 — accepted Phase 1 architecture

Status: accepted by the user in the planning conversation, 2026-10-09.

Context: public browser-local tools and software education, ten owner hours/week with AI assistance, local-first development and future evolution.

Decision: one Java 25 / Spring Boot / MVC / Thymeleaf application, TypeScript for browser processing, one Maven module with architectural checks, shared BTC Design System, EN/ES/FR, no database/accounts/cloud/microservices in Phase 1. Public remote `ziuld/beneath-the-code-page`; local directory `beneath-the-code`. User performs Initializr import manually.

Consequences: low deployment complexity, no backend payload handling, explicit worker/editor testing, content translation effort and dependency-boundary enforcement. The plan preserves future extraction options without implementing them now.

Clarifications: source is the approved B logo; Initializr entry class remains at root initially; JSON transformation preserves tokens; generated frontend assets stay under target. See the feasibility review for rationale and pending proofs.
