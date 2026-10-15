import "../design-system/styles/base.css";

const workspace = document.querySelector<HTMLElement>(
  "[data-editor-workspace]",
);
if (workspace)
  void import("../design-system/components/editor-workspace").then((module) =>
    module.enhanceEditorWorkspace(workspace),
  );
