# Repository structure

## Prepared now

```text
beneath-the-code/
├── AGENTS.md
├── README.md
├── docs/
│   ├── architecture/     specification, feasibility, sources, target tree
│   ├── adr/              decisions and change template
│   ├── bootstrap/        manual Initializr handoff
│   ├── brand/            logo and design-system rules
│   ├── delivery/         GitHub, CI and operations plan
│   ├── planning/         plan.json, acceptance, sprints, risks, generated Gantt
│   ├── quality/          tests, accessibility and security gates
│   └── reference/        original supplied documents and logo
├── harness/
│   ├── current-state.md
│   ├── workflow.md
│   ├── evidence/         actual checks only
│   └── templates/        task and verification templates
└── scripts/              documentation/PM generation and validation only
```

## Added after the user's manual import and subsequent feature work

```text
.github/
  workflows/{ci,security}.yml
  CODEOWNERS
  dependabot.yml
  pull_request_template.md
.mvn/wrapper/
src/main/java/dev/beneaththecode/
  BeneathTheCodeApplication.java
  bootstrap/
  platform/
    configuration/
    observability/
    web/{assets,i18n,security,error}/
  tools/
    domain/
    application/
    adapter/in/web/
  learning/
    domain/
    application/port/out/
    adapter/{in/web,out/content}/
src/main/frontend/
  entries/{site,json-formatter}.ts
  design-system/
    styles/{tokens,base,layout}.css
    styles/components/
    components/{dialog,editor,tool-workspace}/
    assets/
  platform/i18n/
  tools/
    json/{processing.ts,processing.test.ts}
    json-formatter/{controller,worker,protocol}.ts
src/main/resources/
  application.yaml
  application-local.yaml
  application-prod.yaml
  i18n/{messages,messages_es,messages_fr}.properties
  templates/
    fragments/
    home.html
    tools/{index,json-formatter}.html
    learn/
    error/
  content/java-fundamentals/{en,es,fr}/
  static/                       authored public files only
src/test/
  java/dev/beneaththecode/{architecture,platform,tools,learning}/
  resources/
tests/e2e/
docker/README.md
compose.yaml
Dockerfile
.dockerignore
.editorconfig
.gitignore
.node-version
mvnw
mvnw.cmd
pom.xml
package.json
package-lock.json
tsconfig.json
vite.config.ts
vitest.config.ts
playwright.config.ts
eslint.config.js
CONTRIBUTING.md
SECURITY.md
target/                         ignored, generated
  frontend/
    static/assets/
    asset-manifest.json
```

No empty domain layers are mandatory. A package starts when its responsibility is real. Initializr may use `application.properties`; conversion is later and must preserve its contents. No code licence file is created until ownership chooses one.
