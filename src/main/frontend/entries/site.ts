import "../design-system/styles/base.css";

const workspace = document.querySelector<HTMLElement>(
  "[data-editor-workspace]",
);
const formatter = document.querySelector<HTMLElement>(
  "[data-json-formatter], [data-json-validator], [data-json-minifier]",
);
const uuid = document.querySelector<HTMLElement>("[data-uuid]");
if (uuid)
  void import("../tools/uuid/workspace")
    .then((module) => module.enhanceUuid(uuid))
    .catch(() => {
      uuid.dataset.uuidReady = "false";
    });
const base64 = document.querySelector<HTMLElement>("[data-base64]");
if (base64)
  void import("../tools/base64/workspace")
    .then((module) => module.enhanceBase64(base64))
    .catch(() => {
      base64.dataset.base64Ready = "false";
    });
else if (formatter)
  void import("../tools/json/formatter-workspace")
    .then((module) => module.enhanceFormatter(formatter))
    .catch(() => {
      formatter.dataset.formatReady = "false";
    });
else if (workspace)
  void import("../design-system/components/editor-workspace").then((module) =>
    module.enhanceEditorWorkspace(workspace),
  );
