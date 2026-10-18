import "../design-system/styles/base.css";

const workspace = document.querySelector<HTMLElement>(
  "[data-editor-workspace]",
);
const formatter = document.querySelector<HTMLElement>(
  "[data-json-formatter], [data-json-validator], [data-json-minifier]",
);
if (formatter)
  void import("../tools/json/formatter-workspace")
    .then((module) => module.enhanceFormatter(formatter))
    .catch(() => {
      formatter.dataset.formatReady = "false";
    });
else if (workspace)
  void import("../design-system/components/editor-workspace").then((module) =>
    module.enhanceEditorWorkspace(workspace),
  );
