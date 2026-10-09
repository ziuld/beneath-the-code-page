# Primary sources and verification record

Research date: 2026-10-09. Versions can change; reconfirm patches before the first build. Documentation references are evidence for design choices, not a claim of application verification.

| Source | Evidence used |
|---|---|
| [Initializr live metadata](https://start.spring.io/metadata/client) | Read directly: Boot UI 4.1.1 (metadata ID 4.1.1.RELEASE), Java 25; dependency IDs `web`, `thymeleaf`, `security`, `validation`, `actuator` |
| [Spring Boot requirements](https://docs.spring.io/spring-boot/system-requirements.html) | Boot 4.1.1 documentation includes Java 25 compatibility |
| [Temurin 25 release](https://github.com/adoptium/temurin25-binaries/releases/tag/jdk-25.0.4.1+1) | Vendor build selected for baseline |
| [Java support roadmap](https://www.oracle.com/ae/java/technologies/java-se-support-roadmap.html) | Java 25 LTS designation; vendor support terms differ |
| [Maven download](https://maven.apache.org/download.cgi) | Stable Maven line; wrapper pin rechecked at import |
| [Node release schedule](https://github.com/nodejs/Release) | Node 24 LTS build-tool baseline |
| [Spring Security CSRF](https://docs.spring.io/spring-security/reference/servlet/exploits/csrf.html) | Cookie repository, default session repository, masked request token |
| [Spring Security headers](https://docs.spring.io/spring-security/reference/servlet/exploits/headers.html) | Protective headers and explicit CSP configuration |
| [Vite backend integration](https://vite.dev/guide/backend-integration) | Manifest-based server template asset integration |
| [CodeMirror reference](https://codemirror.net/docs/ref/) | cspNonce facet identified in indexed official reference; direct retrieval was blocked, so runtime behaviour still needs F05 proof |
| [Microsoft JSON parser](https://github.com/microsoft/node-jsonc-parser) | Syntax scanner and text formatting edits |
| [YAML library](https://eemeli.org/yaml/) | Parser options and alias controls |
| [ArchUnit guide](https://www.archunit.org/userguide/html/000_Index.html) | Dependency and cycle enforcement |
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Accessibility acceptance target |
| [OWASP ASVS](https://owasp.org/projects/asvs) | Security verification mapping; select exact release/control identifiers in F04 |
| [Official project instructions](https://learn.chatgpt.com/docs/agent-configuration/agents-md) | Repository AGENTS.md discovery; custom harness paths are ordinary project conventions |

The public GitHub page was not retrievable through the web reader. A direct successful `git ls-remote https://github.com/ziuld/beneath-the-code-page.git` returned no refs. Public visibility is supplied by the user; no repository settings were changed.
